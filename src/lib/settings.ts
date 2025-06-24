type Settings = {
    "font-family"?: string;
};

async function getAllSettings(): Promise<Settings> {
    return await chrome.storage.sync.get();
}

async function getSetting<K extends keyof Settings>(
    name: K
): Promise<Settings[K]> {
    return (await chrome.storage.sync.get(name))[name];
}

async function setSetting<K extends keyof Settings>(
    name: K,
    value: Settings[K]
): Promise<Settings[K]> {
    await chrome.storage.sync.set({[name]: value});
    return getSetting(name);
}

export {type Settings, getSetting, getAllSettings, setSetting};
export default Object.freeze({
    get: getSetting,
    getAll: getAllSettings,
    set: setSetting
});
