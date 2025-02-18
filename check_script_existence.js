const scriptExists = (() => {
  let scriptExists = false;
  document.querySelectorAll("script").forEach((script) => {
    if (
      script.src.includes(
        "https://cdn.jsdelivr.net/gh/melpi-eg/test-repo@main/script.js"
      )
    ) {
      scriptExists = true;
    }
  });

  return scriptExists;
})();

if (scriptExists) {
  console.log("Script exists on the page");
} else {
  console.log("Script does not exist on the page");
}
