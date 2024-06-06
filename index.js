const gridContainer = document.querySelector(".grid-container");
let cards = [
  {
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/AlbertusMagnus.jpg/512px-AlbertusMagnus.jpg",
      "name": "Alberto Magno"
  },
  {
      "image": "https://www.alejandradeargos.com/images/articulos/Iker/San_Agustin_.jpg",
      "name": "Agustin"
  },
  {
      "image": "https://www.philosophica.info/voces/aquino/Aquino.jpg",
      "name": "Aquino"
  },
  {
      "image": "https://www.alejandradeargos.com/images/articulos/Cuartango/Guillermo-de-Ockham.jpg",
      "name": "Guillermo de Ockham"
  },
  {
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Scoto_%28Duns_Scoto%29_-_Studiolo_di_Federico_da_Montefeltro.jpg/512px-Scoto_%28Duns_Scoto%29_-_Studiolo_di_Federico_da_Montefeltro.jpg",
      "name": "Duns Scoto"
  },
  {
      "image": "https://www.sigueme.es/docs/autores/anselmo-de-canterbury-grabado-s-xvi-.jpg",
      "name": "Anselmo"
  },
  {
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Boethius_initial_consolation_philosophy.jpg/512px-Boethius_initial_consolation_philosophy.jpg",
      "name": "Boecio"
  },
  {
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Francisco_de_Zurbar%C3%A1n_-_The_Prayer_of_St._Bonaventura_about_the_Selection_of_the_New_Pope_-_Google_Art_Project.jpg/512px-Francisco_de_Zurbar%C3%A1n_-_The_Prayer_of_St._Bonaventura_about_the_Selection_of_the_New_Pope_-_Google_Art_Project.jpg",
      "name": "San Buenaventura"
  },
  {
      "image": "https://upload.wikimedia.org/wikipedia/commons/0/04/Ramon_Llull.jpg",
      "name": "Romon Llull"
  },{
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/AlbertusMagnus.jpg/512px-AlbertusMagnus.jpg",
    "name": "Alberto Magno"
},
{
    "image": "https://www.alejandradeargos.com/images/articulos/Iker/San_Agustin_.jpg",
    "name": "Agustin"
},
{
    "image": "https://www.philosophica.info/voces/aquino/Aquino.jpg",
    "name": "Aquino"
},
{
    "image": "https://www.alejandradeargos.com/images/articulos/Cuartango/Guillermo-de-Ockham.jpg",
    "name": "Guillermo de Ockham"
},
{
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Scoto_%28Duns_Scoto%29_-_Studiolo_di_Federico_da_Montefeltro.jpg/512px-Scoto_%28Duns_Scoto%29_-_Studiolo_di_Federico_da_Montefeltro.jpg",
    "name": "Duns Scoto"
},
{
    "image": "https://www.sigueme.es/docs/autores/anselmo-de-canterbury-grabado-s-xvi-.jpg",
    "name": "Anselmo"
},
{
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Boethius_initial_consolation_philosophy.jpg/512px-Boethius_initial_consolation_philosophy.jpg",
    "name": "Boecio"
},
{
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Francisco_de_Zurbar%C3%A1n_-_The_Prayer_of_St._Bonaventura_about_the_Selection_of_the_New_Pope_-_Google_Art_Project.jpg/512px-Francisco_de_Zurbar%C3%A1n_-_The_Prayer_of_St._Bonaventura_about_the_Selection_of_the_New_Pope_-_Google_Art_Project.jpg",
    "name": "San Buenaventura"
},
{
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/04/Ramon_Llull.jpg",
    "name": "Romon Llull"
}
];

let firstCard, secondCard;
let lockBoard = false;
let score = 0;

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}


shuffleCards();
generateCards();