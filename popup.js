const $configForm = document.querySelector("#config-form");

$configForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const config = Object.fromEntries(formData);
  chrome.storage.sync.set(config, () => {
    console.log("[MKRF] 설정이 저장되었습니다.", config);
  });
});

chrome.storage.sync.get(["font-family"], (config) => {
  $configForm["font-family"].value = config["font-family"] ?? "";
  console.log("[MKRF] 설정이 복원되었습니다.", config);
});
