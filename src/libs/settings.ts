/**
 * 스토리지에 저장되는 설정 객체의 타입입니다.
 */
export type Settings = {
  "font-family"?: string;
};

/**
 * 스토리지에서 설정 객체를 가져옵니다.
 * @returns {Promise<Settings>} 설정 객체
 */
export const getSettings = (): Promise<Settings> => {
  return chrome.storage.sync.get() as Promise<Settings>;
};

/**
 * 스토리지에 새로운 설정 객체를 저장합니다.
 * @param settings 새로운 설정 객체
 * @returns {Promise<Settings>} 갱신된 설정 객체
 */
export const setSettings = async (settings: Settings): Promise<Settings> => {
  await chrome.storage.sync.set(settings);
  return await getSettings();
};
