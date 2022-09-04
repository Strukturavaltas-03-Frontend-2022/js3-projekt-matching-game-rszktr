import {
 elapsedTime, startInterval, startTimer, showTime, modifyImportVariable
} from './timer.js'


// Játék
const cardContainer = document.querySelectorAll('.card__container')
const cardFronts = document.querySelectorAll('.card__front')

let firstCard = 0;
let secondCard = 0;
let clickCounter = 0;
let matchCounter = 0;


// Játék előkészítése
const symbols = ['mushroom', 'star', 'flower', 'leaf', 'up'];
const defaultOrder = symbols.flatMap(item => [item, item]);
let shuffledOrder = defaultOrder.sort(() => Math.random() - 0.5);

for (let i = 0; i < cardFronts.length; i++) {
  cardFronts[i].classList.add(shuffledOrder[i])
}

const activateCards = () => {
  cardContainer.forEach(item => {
    item.addEventListener('click', flipCard)
  })
}

activateCards()

const silenceCards = () => {
  cardContainer.forEach(item => {
    item.removeEventListener('click', flipCard)
  })
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

// Játék működése
function flipCard() {
  clickCounter += 1
  if (clickCounter === 1) {
    startTimer();
  }
  this.classList.add('flip')
  if (firstCard == 0) {
    firstCard = this;
    firstCard.removeEventListener('click', flipCard)
  } else {
    secondCard = this;
    silenceCards();
    checkMatch() ? yesMatch() : delay(2000).then(() => noMatch())
  }
  if (matchCounter === 5) {
    clearInterval(startInterval)
    delay(5000).then(() => resetGame())
  }
}

const checkMatch = () => {
  let firstCardClass = firstCard.querySelector('.card__front').classList.value
  let secondCardClass = secondCard.querySelector('.card__front').classList.value
  return firstCardClass === secondCardClass ? true : false;
}

const yesMatch = () => {
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)
  firstCard = 0;
  secondCard = 0;
  activateCards();
  matchCounter += 1
}

const noMatch = () => {
  firstCard.classList.remove('flip')
  secondCard.classList.remove('flip')
  firstCard = 0;
  secondCard = 0;
  activateCards();
}

const resetGame = () => {
  cardContainer.forEach(item => item.classList.remove('flip'))
  delay(1000).then(() => shuffleCards())
  activateCards();
  clickCounter = 0;
  matchCounter = 0;
  modifyImportVariable(elapsedTime, new Date(0));
  showTime(elapsedTime)
}

const shuffleCards = () => {
  cardFronts.forEach(item => item.removeAttribute('class'))
  cardFronts.forEach(item => item.classList.add('card__front'))
  shuffledOrder = defaultOrder.sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < cardFronts.length; i++) {
  cardFronts[i].classList.add(shuffledOrder[i])
  };
}