/**
 * 확장 프로그램의 환경 설정 객체 타입입니다.
 */

type Settings = {
    "font-family"?: string;
};

async function getSettings(): Promise<Settings> {
    return await chrome.storage.sync.get();
}

async function getSetting<K extends keyof Settings>(
    name: K
): Promise<Settings[K]> {
    return (await chrome.storage.sync.get(name))[name];
}

async function setSettingsV2<K extends keyof Settings>(
    name: K,
    value: Settings[K]
): Promise<Settings[K]> {
    await chrome.storage.sync.set({[name]: value});
    return getSetting(name);
}

export {type Settings};
export default Object.freeze({
    get: getSetting,
    getAll: getSettings,
    set: setSettingsV2
});
