import font, {type Font} from "./lib/font";
import log from "./lib/log";
import extensionSettings, {type Settings} from "./lib/settings";

/**
 * 현재 탭이 Medium인지 확인합니다.
 * @returns Medium URL 일치 여부
 */

async function isMediumDomain(): Promise<boolean> {
    const tabs = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    });
    const currentTab = tabs[0];
    return currentTab.url === undefined
        ? false
        : currentTab.url.includes("medium.com");
}

/**
 * 글꼴 <select> 요소에 포함될 <option> 문자열 배열을 반환합니다.
 */

async function generateOptions(
    fonts: Font[],
    style: Font["style"]
): Promise<string[]> {
    return fonts
        .filter((f) => f.style === style)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(
            ({value, name}) =>
                /* HTML */ `<option value="${value}">${name}</option>`
        );
}

/**
 * `root` 요소에 팝업 UI를 렌더링합니다.
 */

async function render(): Promise<void> {
    const version = chrome.runtime.getManifest().version;
    const isMedium = await isMediumDomain();
    const helperText = isMedium ? "" : "접속 중인 사이트는 Medium이 아닙니다.";
    const fonts = await font.getAll();
    const _root = document.getElementById("root");
    const _sansSerifOptions = await generateOptions(fonts, "sans-serif");
    const _serifOptions = await generateOptions(fonts, "serif");

    if (_root === null) {
        return;
    }
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
}

/**
 * 양식 제출 이벤트 핸들러를 추가합니다.
 */

async function addFormSubmitHandler(): Promise<void> {
    const _form = document.querySelector("form");

    if (_form === null) {
        return;
    }
    _form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const settings = Object.fromEntries(formData) as Settings;
        Object.entries(settings).forEach(
            async ([key, value]) =>
                await extensionSettings.set(key as keyof Settings, value)
        );
        log.info("설정이 저장되었습니다.", settings);
    });
}

/**
 * Storage에 저장된 설정으로부터 양식 값을 복원합니다.
 */

async function restoreFormValue(): Promise<void> {
    const _form = document.querySelector("form");
    const settings = await extensionSettings.getAll();
    const isEmpty = Object.keys(settings).length === 0;

    if (_form === null) {
        return;
    }
    if (isEmpty) {
        log.info("저장된 설정이 없습니다.", settings);
        return;
    }
    for (const key in settings) {
        const formKey = key as keyof Settings;
        _form[formKey].value = settings[formKey];
    }
    log.info("설정이 복원되었습니다.", settings);
}

/**
 * 팝업을 초기화합니다.
 */

(async function main() {
    await render();
    await addFormSubmitHandler();
    await restoreFormValue();
})();
