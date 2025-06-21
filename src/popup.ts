import {Font, fonts} from "./libs/fonts";
import {log} from "./libs/log";
import {Settings, getSettings, setSettings} from "./libs/settings";

/**
 * 현재 탭이 Medium인지 확인합니다.
 * @returns Medium URL 일치 여부
 */
const isMediumDomain = async () => {
    const tabs = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    });
    const currentTab = tabs[0];
    return currentTab.url.includes("medium.com");
};

/**
 * `root` 요소에 팝업 UI를 렌더링합니다.
 */
const render = async () => {
    const generateOptions = (style: Font["style"]) =>
        fonts
            .filter((font) => font.style === style)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(
                ({value, name}) =>
                    /* HTML */ `<option value="${value}">${name}</option>`
            );
    const version = chrome.runtime.getManifest().version;
    const isMedium = await isMediumDomain();
    const helperText = isMedium ? "" : "접속 중인 사이트는 Medium이 아닙니다.";
    const _root = document.getElementById("root");
    const _sansSerifOptions = generateOptions("sans-serif");
    const _serifOptions = generateOptions("serif");

    _root.innerHTML = /* HTML */ `
        <main>
            <header>
                <img src="/images/logo.svg" alt="Medium KR Font" />
                <h1>Medium KR Font</h1>
            </header>
            <form>
                <fieldset>
                    <legend>환경 설정</legend>
                    <label>
                        글꼴
                        <select name="font-family">
                            <option value="">설정 안 함</option>
                            <optgroup label="시스템 기본값">
                                <option value="sans-serif">Sans Serif</option>
                                <option value="serif">Serif</option>
                            </optgroup>
                            <optgroup label="Sans Serif">
                                ${_sansSerifOptions}
                            </optgroup>
                            <optgroup label="Serif">${_serifOptions}</optgroup>
                        </select>
                    </label>
                </fieldset>
                <input type="submit" value="적용" />
            </form>
            <p>${helperText}</p>
            <footer>
                <span>v${version}</span>
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

/**
 * 양식 제출 이벤트 핸들러를 추가합니다.
 */
const addFormSubmitHandler = async (): Promise<void> => {
    const _form = document.querySelector("form");

    _form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const settings = Object.fromEntries(
            formData as unknown as [string, string][]
        );
        await setSettings(settings);
        log.info("설정이 저장되었습니다.", settings);
    });
};

/**
 * Storage에 저장된 설정으로부터 양식 값을 복원합니다.
 */
const restoreFormValue = async (): Promise<void> => {
    const _form = document.querySelector("form");
    const settings = await getSettings();
    const isEmpty = Object.keys(settings).length === 0;

    if (isEmpty) {
        log.info("저장된 설정이 없습니다.", settings);
        return;
    }
    for (const key in settings) {
        const formKey = key as keyof Settings;
        _form[formKey].value = settings[formKey];
    }
    log.info("설정이 복원되었습니다.", settings);
};

/**
 * 팝업을 초기화합니다.
 */
const initialize = async () => {
    await render();
    await addFormSubmitHandler();
    await restoreFormValue();
};

initialize();
