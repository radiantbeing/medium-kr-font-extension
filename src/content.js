const appendFontFamilyStyleElement = (fontFamily) => {
  const _style = document.createElement("style");
  _style.id = "mkrf-font-family-style";
  _style.textContent = /* CSS */ `
    * {
        font-family: ${fontFamily} !important; 
    }
    pre *, 
    code {
        font-family: source-code-pro, Menlo, Monaco, "Courier New", Courier, monospace !important; 
    }
  `;
  document.head.appendChild(_style);
};

const removeFontFamilyStyleElement = () => {
  const _style = document.getElementById("mkrf-font-family-style");
  if (_style) {
    _style.remove();
  }
};

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

applyStoredFontFamily();

chrome.storage.onChanged.addListener((changes, area) => {
  for (const key in changes) {
    const { oldValue, newValue } = changes[key];
    if (key === "font-family") {
      if (newValue === "") {
        window.alert(
          "기본값으로 변경되었습니다. 페이지를 새로고침하시겠습니까?"
        );
        window.location.reload();
      } else {
        removeFontFamilyStyleElement();
        appendFontFamilyStyleElement(newValue);
      }
    }
  }
});
