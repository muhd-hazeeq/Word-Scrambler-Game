const input = document.getElementById("input");
const checkBtn = document.getElementById("check");
const startBtn = document.getElementById("start");
const hint = document.getElementById("hint");
const time = document.getElementById("time");
const result = document.getElementById("result");
const word = document.getElementById("word-id");
const box = document.getElementById("box");
const secondsDisplay = document.getElementById("seconds");
const score = document.getElementById("score");
let seconds = 30;
let milliseconds = 100;
let interval = null;
let wordArr = ["MRAW", "YLIHOAD", "CYIBCEL", "FEOCFE", "SPHETELAN",
"SMUBLAAENC", "ALLUERMB", "NTOOLMHGI", "YGTRIAV", "TEETNNIE"];
let ansArr = ["WARM", "HOLIDAY", "BICYCLE", "COFFEE", "ELEPHANTS",
"AMBULANCES", "UMBRELLA", "MOONLIGHT", "GRAVITY", "INTERNET"];
let hintArr = [`Something With-Arm...`, 
`The malls are as packed as themeparks`, 
`The ones with a bell are the best`,
`I had an extra shot while writing this`,
`Their ancestors were super woolly`,
`They carry lots of patien(ce)`,
`Rihanna`,
`An effect of nature's mirror`,
`We knows of it because of an apple`,
`You are on it right now`];
let i = 0;
let scoreCount = 0;
let tryCount = 0;

score.style.paddingLeft = `0.2em`;
score.textContent = 0;
word.textContent = `SMLCRABE`;
hint.textContent = `Hint : To put things such as words or letters in the wrong order so that they do not make sense`;
secondsDisplay.textContent = `What is infinity?`;

checkBtn.addEventListener("click", function () {
  if (tryCount===2){
    noPoint(1);
    tryCount = 0;
  }
  else if (input.value.toUpperCase() === ansArr[i]) {
    tryCount = 0;
    scoreCount++;
    score.textContent = scoreCount;
    result.textContent = "Correct!";
    word.textContent = `${ansArr[i]}`;
    input.style.display = "none";
    hint.style.display = "none";
    time.style.display = "none";
    checkBtn.style.display = "none";
    document.body.style.backgroundColor = "#32CD32";
    i = i+1;
    renderWord(i);
  } else {
    result.textContent = "Wrong!";
    tryCount++;
  }
  input.value = "";
});

startBtn.addEventListener("click", function () {
  startBtn.style.display = "none";
  input.style.display = "inline";
  checkBtn.style.display = "inline";
  secondsDisplay.textContent = `30`;
  word.textContent = wordArr[i];
  hint.textContent = `Hint : ${hintArr[i]}`;
  if (interval != null) {
    clearInterval(interval);
  }
  interval = setInterval(displayTime, 100);
});

function renderWord(index) {
  if(index === wordArr.length){
    if(scoreCount >= 0 && scoreCount < 5) result.textContent = "BETTER LUCK NEXT TIME";
    else if(scoreCount >= 5 && scoreCount < 7) result.textContent = "WE GOT A SMART ONE";
    else if(scoreCount >= 8 && scoreCount < 9) result.textContent = "ALMOST PERFECT!";
    else if(scoreCount === 10) result.textContent = "BRUCE WAYNE?";
    word.textContent = `THANKS FOR PLAYING!`;
    input.style.display = "none";
    hint.style.display = "none";
    time.style.display = "none";
    checkBtn.style.display = "none";
    document.body.style.backgroundColor = "#32CD32";
    if (interval != null) {
      clearInterval(interval);
    }
  }
  else{
    setTimeout(function(){
      input.style.display = "inline";
      hint.style.display = "block";
      time.style.display = "block";
      checkBtn.style.display = "block";
      secondsDisplay.textContent = `30`;
      document.body.style.backgroundColor = "rgb(64, 138, 223)";
      word.textContent = wordArr[index];
      hint.textContent = `Hint : ${hintArr[index]}`;
      result.textContent = "";
      milliseconds = 100;
      seconds = 30;
      if (interval != null) {
        clearInterval(interval);
      }
      interval = setInterval(displayTime, 100);
    }, 3000);
  }
}

function displayTime() {
  milliseconds -= 10;
  if (milliseconds === 0) {
    milliseconds = 100;
    seconds--;
  }
  if (seconds === 0 && milliseconds === 10) {
    clearInterval(interval);
    seconds = 0;
    noPoint(2);
  }
  secondsDisplay.textContent = seconds;
}

function noPoint(x){
  if(x===1) result.textContent = "Out Of Try!";
  else if(x===2) result.textContent = "Out Of Time!";
  word.textContent = `${ansArr[i]}`;
  input.style.display = "none";
  hint.style.display = "none";
  time.style.display = "none";
  checkBtn.style.display = "none";
  document.body.style.backgroundColor = "red";
  i = i+1;
  renderWord(i);
}