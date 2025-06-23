import extensionSettings from "./lib/settings";

/**
 * 확장 프로그램 설치 시 설정 객체를 초기화합니다.
 */

chrome.runtime.onInstalled.addListener(async function () {
    const settings = await extensionSettings.getAll();
    if (!("font-family" in settings)) {
        await extensionSettings.set("font-family", "");
    }
});
