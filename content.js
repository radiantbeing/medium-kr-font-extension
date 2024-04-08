function generateStyleElement(fontFamily) {
  const $style = document.createElement("style");
  $style.id = "medium-kr-font";
  $style.textContent =
    /* css */
    `* { font-family: ${fontFamily} !important; } 
    pre *, 
    code { 
      font-family: source-code-pro, Menlo, Monaco, "Courier New", Courier, monospace !important; 
    }`;
  return $style;
}

function generateAndAppendStyleElement(fontFamily) {
  const $style = generateStyleElement(fontFamily);
  document.head.appendChild($style);
}

function removeExistingStyleElement() {
  const $style = document.getElementById("medium-kr-font");
  if ($style) {
    $style.remove();
  }
}

chrome.storage.onChanged.addListener((changes, area) => {
  const fontFamily = changes["font-family"]?.newValue;
  if (fontFamily) {
    removeExistingStyleElement();
    generateAndAppendStyleElement(fontFamily);
  } else {
    const shouldReload = window.confirm(
      "기본값으로 변경되었습니다. 페이지를 새로고침하시겠습니까?"
    );
    if (shouldReload) {
      window.location.reload();
    }
  }
});

chrome.storage.sync.get(["font-family"], (config) => {
  const fontFamily = config["font-family"];
  if (fontFamily) {
    removeExistingStyleElement();
    generateAndAppendStyleElement(fontFamily);
  }
});
