import dom from "./lib/dom";
import font, {type Font} from "./lib/font";
import settings from "./lib/settings";

const FONT_CSS_ID = "mkrf-font-family-style";

function insertFontCSS(font: Font["value"]): void {
    const css = `
    * {
        font-family: ${font} !important;
    }
    pre *,
    code {
        font-family: "JetBrains Mono", "D2Coding", monospace !important;
    }
  `;
    dom.insertCSS(css, FONT_CSS_ID);
}

function removeFontCSS(): void {
    dom.removeCSS(FONT_CSS_ID);
}

async function insertFontFaceCSSs(): Promise<void> {
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

// 이벤트 핸들러:

chrome.storage.onChanged.addListener(function (changes) {
    Object.entries(changes).forEach(function ([key, values]) {
        switch (key) {
            case "font-family": {
                const newFont = values.newValue;
                if (newFont === undefined || newFont === "") {
                    removeFontCSS();
                } else {
                    removeFontCSS();
                    insertFontCSS(newFont);
                }
            }
        }
    });
});

// 메인 함수:

(async function main() {
    await insertFontFaceCSSs();

    // 팝업에서 적용할 글꼴을 `설정 안 함`으로 설정했을 경우 Medium에서 사용할 폰트를 변경하는
    // CSS를 삽입하지 않습니다.

    const font = await settings.get("font-family");
    if (font !== undefined && font !== "") {
        insertFontCSS(font);
    }
})();
