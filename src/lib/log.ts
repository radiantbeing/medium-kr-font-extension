function logError(message?: unknown, ...optionalParams: unknown[]): void {
    console.log("%c[MKRF]", "color: #ff5c33", message, ...optionalParams);
}

function logInfo(message?: unknown, ...optionalParams: unknown[]): void {
    console.log("%c[MKRF]", "color: #4c80f1", message, ...optionalParams);
}

/**
 * @deprecated default export 객체 사용을 권장합니다.
 */

export const log = {
    error: logError,
    info: logInfo
};
export default Object.freeze({
    error: logError,
    info: logInfo
});
