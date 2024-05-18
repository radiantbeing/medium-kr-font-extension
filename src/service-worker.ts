import { getSettings, setSettings } from "./libs/settings";

/**
 * 확장 프로그램 설치 시 설정 객체를 초기화합니다.
 */
chrome.runtime.onInstalled.addListener(async () => {
  const settings = await getSettings();
  if (!settings.hasOwnProperty("font-family")) {
    await setSettings({ "font-family": "" });
  }
});
