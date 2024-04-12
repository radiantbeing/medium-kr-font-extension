const fontFamilies = {
  sansSerif: [
    "Apple SD Gothic Neo",
    "IBM Plex Sans KR",
    "Noto Sans KR",
    "Pretendard Variable",
    "Spoqa Han Sans Neo",
  ],
  serif: ["Noto Serif KR", "RIDIBatang"],
};

const render = () => {
  const _root = document.querySelector("#root");

  _root.innerHTML = /* HTML */ `
    <main>
      <header>
        <img src="icon-outline.svg" alt="Medium KR Font" />
        <h1>Medium KR Font</h1>
      </header>
      <form>
        <fieldset>
          <legend>환경 설정</legend>
          <label>
            Font Family
            <select name="font-family">
              <option value="">기본값</option>
              <optgroup label="Sans Serif">
                ${fontFamilies.sansSerif.map(
                  (fontFamily) => /* HTML */ `<option value="${fontFamily}">
                    ${fontFamily}
                  </option>`
                )}
              </optgroup>
              <optgroup label="Serif">
                ${fontFamilies.serif.map(
                  (fontFamily) => /* HTML */ `<option value="${fontFamily}">
                    ${fontFamily}
                  </option>`
                )}
              </optgroup>
            </select>
          </label>
        </fieldset>
        <input type="submit" value="적용" />
      </form>
    </main>
  `;
};

const initializeForm = async () => {
  const _form = document.querySelector("form");

  _form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const config = Object.fromEntries(formData);
    await chrome.storage.sync.set(config);
    console.log("[MKRF] 설정이 저장되었습니다.", config);
  });

  const config = await chrome.storage.sync.get(["font-family"]);
  for (const key in config) {
    _form[key].value = config[key];
  }
  console.log("[MKRF] 설정이 복원되었습니다.", config);
};

render();
await initializeForm();
