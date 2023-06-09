const functionalMenu = document.getElementById("functional");
const visualMenu = document.getElementById("visual");
const funcTitle = document.getElementById("funcTitle");
const visualTitle = document.getElementById("visualTitle");

let visualIsOpened = false,
  functionalIsOpened = false;

functionalMenu.addEventListener("click", () => {
  visualMenu.style.height = "3rem";
  functionalMenu.style.height = "16rem";
  functionalIsOpened = true;
});
visualMenu.addEventListener("click", () => {
  functionalMenu.style.height = "3rem";
  visualMenu.style.height = "16rem";
  visualIsOpened = true;
});
funcTitle.addEventListener("click", (e) => {
  if (!functionalIsOpened) return;
  e.stopPropagation();
  functionalMenu.style.height = "3rem";
  functionalIsOpened = false;
});
visualTitle.addEventListener("click", (e) => {
  if (!visualIsOpened) return;
  e.stopPropagation();
  visualMenu.style.height = "3rem";
  visualIsOpened = false;
});
