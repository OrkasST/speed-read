const loader = document.getElementById("fileLoad");
const progressbar = document.getElementById("progressbar");
const percent = document.getElementById("percent");
const display = document.getElementById("display");

const parceBtn = document.getElementById("parceFile");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const setBtn = document.getElementById("setBtn");

const speedInput = document.getElementById("speedInput");
const scrollAmmountInput = document.getElementById("scrollAmmount");

const scrollDistanceDisplay = document.getElementById("scrollDistance");
const scrollSpeed = document.getElementById("scrollSpeed");

let file = null;
let reader = new FileReader();
let scrollTimer = null,
  mainTimer = null;
let scrollAmmount = localStorage.getItem("scrollAmmount") || 0;
let currentTime = localStorage.getItem("currentTime") || 5000;
let scrollDistance = 64;

function displayData() {
  scrollDistanceDisplay.innerText = scrollDistance;
  scrollSpeed.innerText = currentTime;

  scrollAmmountInput.placeholder = scrollAmmount;
  speedInput.placeholder = currentTime;
}
displayData();

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
    percent.style.width = "2%";
  };
  reader.onprogress = (e) => {
    percent.style.width = (e.loaded / e.total) * 100 + "%";
  };
  reader.onload = (e) => {
    percent.style.width = "100%";
    console.log("percent.style.width: ", percent.style.width);
    console.log("Done");
    let bookText = reader.result.split("<binary")[0];
    display.innerHTML = bookText;
    startBtn.disabled = false;
    setTimeout(() => progressbar.classList.add("_hidden"), 100);
  };
});

// >>> 1 control buttons

startBtn.addEventListener("click", () => {
  display.scroll({ top: scrollAmmountInput.value * scrollDistance });
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

// <<< 1
// >>> 2 Timers

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
  displayData();
  scrollTimer = setInterval(() => {
    console.log("scroll");
    display.scroll({ top: scrollDistance * scrollAmmount });
    scrollAmmount++;

    localStorage.setItem("scrollAmmount", scrollAmmount + "");
    localStorage.setItem("currentTime", currentTime + "");
  }, time);
}
// <<< 2

// >>> 3 options

setBtn.addEventListener("click", () => {
  scrollAmmountInput.value.length > 0
    ? localStorage.setItem("scrollAmmount", scrollAmmountInput.value + "")
    : localStorage.setItem("scrollAmmount", scrollAmmount);
  speedInput.value.length > 0
    ? localStorage.setItem("currentTime", speedInput.value + "")
    : localStorage.setItem("currentTime", currentTime);
  scrollAmmount = scrollAmmountInput.value;
  scrollAmmountInput.placeholder = scrollAmmountInput.value;
  scrollAmmountInput.value = "";
  speedInput.placeholder = speedInput.value;
  speedInput.value = "";
  setBtn.disabled = true;
});

speedInput.addEventListener("focusout", () => {
  if (speedInput.value.length === 0) return;
  currentTime = speedInput.value;
  displayData();
  setBtn.disabled = false;
});

scrollAmmountInput.addEventListener("input", () => {
  console.log(scrollAmmountInput.value);
  display.scroll({ top: scrollAmmountInput.value * scrollDistance });
  setBtn.disabled = false;
});

// <<< 3
