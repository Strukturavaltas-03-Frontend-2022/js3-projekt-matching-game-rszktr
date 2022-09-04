const clockDisplay = document.querySelector('.timer')

let startTime = 0;
let presentTime = 0;
let elapsedTime = new Date(0);
let startInterval = 0
let arrayOfDigits = [];

const setStartTime = () => startTime = new Date();
const setPresentTime = () => presentTime = new Date();
const countMilliseconds = () => elapsedTime.setMilliseconds(presentTime - startTime)

const turnTimeToString = (time) => {
  return time.toLocaleTimeString([], {
    hourCycle: 'h23',
    minute: '2-digit',
    second: '2-digit'
  });
};

const clockWork = () => {
  setPresentTime();
  countMilliseconds();
  showTime();
  elapsedTime = new Date(0);
}

const startTimer = () => {
  setStartTime();
  startInterval = setInterval(clockWork, 1000)
}

// Monospace megoldása
const timeDigitClasses = [
  ".minutesFirstDigit",
  ".minutesSecondDigit",
  ".secondsFirstDigit",
  ".secondsSecondDigit"
];

const createSeparateCharacters = (timeAsString) => {
  return arrayOfDigits = [
    timeAsString[0],
    timeAsString[1],
    timeAsString[3],
    timeAsString[4],
  ]
};

function showTime() {
  createSeparateCharacters(turnTimeToString(elapsedTime))
  for (let i = 0; i < arrayOfDigits.length; i++) {
    document.querySelector(timeDigitClasses[i]).innerHTML = arrayOfDigits[i];
  }
};

const modifyImportVariable = (variable, value) =>  variable = value; 


export {
elapsedTime,
startInterval,
startTimer,
showTime,
modifyImportVariable 
}