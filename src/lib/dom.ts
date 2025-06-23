import log from "./log";

function insertCSS(css: string, id?: string): void {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = css;
    if (id !== undefined) {
        styleElement.id = id;
    }
    document.head.append(styleElement);
}

function removeCSS(id: string): void {
    const styleElement = document.getElementById(id);
    if (!(styleElement instanceof HTMLStyleElement)) {
        log.error("<style> 요소가 아니므로 제거할 수 없습니다: ", styleElement);
        return;
    }
    styleElement.remove();
}

export default Object.freeze({
    insertCSS,
    removeCSS
});
