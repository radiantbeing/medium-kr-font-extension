import { Typeface } from "./libs/typefaces";

/**
 * 서체 스타일 요소를 문서 헤드에 추가합니다.
 * @param value 서체 값
 */
const appendFontFamilyStyleElement = (value: Typeface["value"]) => {
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
 * 서체 스타일 요소를 문서 헤드에서 제거합니다.
 */
const removeFontFamilyStyleElement = () => {
  const _style = document.getElementById("mkrf-font-family-style");
  if (_style) {
    _style.remove();
  }
};

/**
 * 저장된 서체를 적용합니다.
 */
const applyStoredFontFamily = async () => {
  const config = await chrome.storage.sync.get();
  for (const key in config) {
    if (key === "font-family") {
      const fontFamily = config[key];
      if (fontFamily) {
        appendFontFamilyStyleElement(fontFamily);
      }
    }
  }
};

chrome.storage.onChanged.addListener((changes, area) => {
  for (const key in changes) {
    const { oldValue, newValue } = changes[key];
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

applyStoredFontFamily();
