const parceBtn = document.getElementById("parceFile");
const loader = document.getElementById("fileLoad");
const progressbar = document.getElementById("progressbar");
const percent = document.getElementById("percent");
const display = document.getElementById("display");
const speedInput = document.getElementById("speedInput");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const setBtn = document.getElementById("setBtn");
const scrollAmmountInput = document.getElementById("scrollAmmount");

let file = null;
let reader = new FileReader();
let scrollTimer = null,
  mainTimer = null;
let scrollAmmount = localStorage.getItem("scrollAmmount") || 0;
let currentTime = localStorage.getItem("currentTime") || 5000;
let scrollDistance = 64;

parceBtn.addEventListener("click", (e) => {
  e.preventDefault();
  file = loader.files[0];
  if (!file) {
    alert("NO file!");
    return;
  }
  reader.readAsText(file);
  reader.onloadstart = (e) => {
    progressbar.classList.remove("_hidden");
  };
  reader.onprogress = (e) => {
    percent.style.width = (e.loaded / e.total) * 100 + "%";
  };
  reader.onload = (e) => {
    progressbar.classList.add("_hidden");
    console.log("Done");
    let bookText = reader.result.split("<binary")[0];
    display.innerHTML = bookText;
    startBtn.disabled = false;
  };
});

startBtn.addEventListener("click", () => {
  pauseBtn.disabled = false;
  startBtn.disabled = true;
  setMainTimer(210000);
});

pauseBtn.addEventListener("click", () => {
  pauseBtn.disabled = true;
  startBtn.disabled = false;
  clearInterval(mainTimer);
  clearInterval(scrollTimer);
  localStorage.setItem("scrollAmmount", scrollAmmount + "");
  localStorage.setItem("currentTime", currentTime + "");
});

setBtn.addEventListener("click", () => {
  localStorage.setItem("scrollAmmount", scrollAmmountInput.value + "");
  localStorage.setItem("currentTime", speedInput.value + "");
});

function setMainTimer(time = 2000) {
  if (!!mainTimer) clearInterval(mainTimer);
  setTimer(--currentTime);
  mainTimer = setInterval(() => {
    setTimer(--currentTime);
    console.log("TimerSet", currentTime);
    if (currentTime === 1) clearInterval(mainTimer);
  }, time);
}

function setTimer(time = 200) {
  if (!!scrollTimer) clearInterval(scrollTimer);
  currentTime = time;
  scrollTimer = setInterval(() => {
    console.log("scroll");
    display.scroll({ top: scrollDistance * scrollAmmount });
    scrollAmmount++;

    localStorage.setItem("scrollAmmount", scrollAmmount + "");
    localStorage.setItem("currentTime", currentTime + "");
  }, time);
}

speedInput.addEventListener("focusout", () => {
  setTimer(speedInput.value);
});

scrollAmmountInput.addEventListener("input", () => {
  console.log(scrollAmmountInput.value);
  display.scroll({ top: scrollAmmountInput.value * scrollDistance });
});
