import { typefaces } from "./lib/typefaces.js";

/**
 * `root` 요소에 팝업 UI를 렌더링합니다.
 */
const render = () => {
  const generateOptions = (fontStyle) =>
    typefaces
      .filter(({ style }) => style === fontStyle)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(
        ({ name, value }) =>
          /* HTML */ `<option value="${value}">${name}</option>`
      );
  const _root = document.getElementById("root");
  const _sansSerifOptions = generateOptions("sans-serif");
  const _serifOptions = generateOptions("serif");

  _root.innerHTML = /* HTML */ `
    <main>
      <header>
        <img src="images/logo.svg" alt="Medium KR Font" />
        <h1>Medium KR Font</h1>
      </header>
      <form>
        <fieldset>
          <legend>환경 설정</legend>
          <label>
            서체
            <select name="font-family">
              <option value="">설정 안 함</option>
              <optgroup label="시스템 기본값">
                <option value="sans-serif">Sans Serif</option>
                <option value="serif">Serif</option>
              </optgroup>
              <optgroup label="Sans Serif">${_sansSerifOptions}</optgroup>
              <optgroup label="Serif">${_serifOptions}</optgroup>
            </select>
          </label>
        </fieldset>
        <input type="submit" value="적용" />
      </form>
      <footer>
        <span>버전 ${chrome.runtime.getManifest().version}</span>
        <a
          href="https://github.com/radiantbeing/medium-kr-font-extension"
          target="_blank"
          rel="noopener noreferrer"
          >소스 코드</a
        >
      </footer>
    </main>
  `;
};

render();

/**
 * 양식 제출 이벤트 핸들러를 추가합니다.
 */
const addFormSubmitHandler = async () => {
  const _form = document.querySelector("form");

  _form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const config = Object.fromEntries(formData);
    await chrome.storage.sync.set(config);
    console.log("[MKRF] 설정이 저장되었습니다.", config);
  });
};

await addFormSubmitHandler();

/**
 * Storage에 저장된 설정으로부터 양식 값을 복원합니다.
 * @returns {Promise<void>}
 */
const restoreFormValue = async () => {
  const _form = document.querySelector("form");
  const config = await chrome.storage.sync.get();
  const isEmpty = Object.keys(config).length === 0;

  if (isEmpty) {
    console.log("[MKRF] 저장된 설정이 없습니다.", config);
    return;
  }
  for (const key in config) {
    _form[key].value = config[key];
  }
  console.log("[MKRF] 설정이 복원되었습니다.", config);
};

await restoreFormValue();
