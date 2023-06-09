const bgColorInput = document.getElementById("bgColorInput");
const textColorInput = document.getElementById("textColorInput");
const clearBtn = document.getElementById("clear");

let bgColor = localStorage.getItem("bgColor") || "#FFFFFF";
let textColor = localStorage.getItem("textColor") || "#000000";

bgColorInput.value = bgColor;
textColorInput.value = textColor;
document.body.style.background = bgColor;
document.body.style.color = textColor;

bgColorInput.addEventListener("input", () => {
  document.body.style.background = bgColorInput.value;
  bgColor = bgColorInput.value;
  localStorage.setItem("bgColor", bgColor);
});
textColorInput.addEventListener("input", () => {
  document.body.style.color = textColorInput.value;
  textColor = textColorInput.value;
  localStorage.setItem("textColor", textColor);
});

clearBtn.addEventListener("click", clearVisual);

function clearVisual() {
  document.body.style.background = "#FFFFFF";
  bgColor = "#FFFFFF";
  localStorage.setItem("bgColor", "#FFFFFF");

  document.body.style.color = "#000000";
  textColor = "#000000";
  localStorage.setItem("textColor", "#000000");

  bgColorInput.value = bgColor;
  textColorInput.value = textColor;
}
