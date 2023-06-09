const bgColorInput = document.getElementById("bgColorInput");
const textColorInput = document.getElementById("textColorInput");

bgColorInput.addEventListener("input", () => {
  document.body.style.background = bgColorInput.value;
});
textColorInput.addEventListener("input", () => {
  document.body.style.color = textColorInput.value;
});
