import dom from "./lib/dom";
import font, {Font} from "./lib/font";
import {getSettings} from "./lib/settings";

/**
 * 글꼴 스타일 요소를 문서 헤드에 추가합니다.
 * @param value 글꼴 값
 */
const appendFontFamilyStyleElement = (value: Font["value"]) => {
    const _style = document.createElement("style");
    _style.id = "mkrf-font-family-style";
    _style.textContent = /* CSS */ `
    * {
        font-family: ${value} !important;
    }
    pre *,
    code {
        font-family: "JetBrains Mono", "D2Coding", monospace !important;
    }
  `;
    document.head.appendChild(_style);
};

/**
 * 글꼴 스타일 요소를 문서 헤드에서 제거합니다.
 */
const removeFontFamilyStyleElement = () => {
    const _style = document.getElementById("mkrf-font-family-style");
    if (_style) {
        _style.remove();
    }
};

/**
 * 저장된 글꼴을 적용합니다.
 */
const applyStoredFontFamily = async () => {
    const config = await getSettings();
    for (const key in config) {
        if (key === "font-family") {
            const fontFamily = config[key];
            if (fontFamily) {
                appendFontFamilyStyleElement(fontFamily);
            }
        }
    }
};

async function insertFontCSSs(): Promise<void> {
    const fonts = await font.getAll();
    const cssPaths = fonts.map((font) => font.cssPath);
    const cssContents = await Promise.all(
        cssPaths.map(async function (path) {
            const response = await fetch(chrome.runtime.getURL(path));
            return await response.text();
        })
    );
    cssContents.forEach((css) => dom.insertCSS(css));
}

// Event Handlers:

chrome.storage.onChanged.addListener((changes) => {
    for (const key in changes) {
        const {newValue} = changes[key];
        if (key === "font-family") {
            if (newValue === "") {
                removeFontFamilyStyleElement();
            } else {
                removeFontFamilyStyleElement();
                appendFontFamilyStyleElement(newValue);
            }
        }
    }
});

// Main:

(async function main() {
    await insertFontCSSs();
    applyStoredFontFamily();
})();
