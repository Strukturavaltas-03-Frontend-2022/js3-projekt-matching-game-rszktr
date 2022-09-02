const cardContainer = document.querySelectorAll('.card__container')
const cardBacks = document.querySelectorAll('.card__back')
const cardFronts = document.querySelectorAll('.card__front')

let firstCard = 0;
let secondCard = 0;
let clickCounter = 0;

// Játék előkészítése
const symbols = ['mushroom','star','flower','leaf','up']
const defaultOrder = ['mushroom', 'mushroom', 'star', 'star', 'flower', 'flower', 'leaf', 'leaf', 'up', 'up']
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

function flipCard() {
  clickCounter += 1
  if (clickCounter === 1) {
    //startTimer
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
}

const checkMatch = () => {
  let firstCardClass = firstCard.querySelector('.card__front').classList.value
  let secondCardClass = secondCard.querySelector('.card__front').classList.value
  return firstCardClass === secondCardClass ? true : false;
}

const yesMatch = () => {
  firstCard = 0;
  secondCard = 0;
  activateCards();
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)
}

const noMatch = () => {
  firstCard.classList.remove('flip')
  secondCard.classList.remove('flip')
  firstCard = 0;
  secondCard = 0;
  activateCards();
}