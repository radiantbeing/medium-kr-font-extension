function insertCSS(css: string): void {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = css;
    document.head.append(styleElement);
}

export default Object.freeze({
    insertCSS
});
