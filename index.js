const cards = [
    {name: "horse" , img:"./images/horse.png"},
    {name: "cat" , img:"./images/cat.png"},
    {name: "dog", img:"./images/dog.png"},
    {name: "bird" , img:"./images/bird.png"},
    {name: "sheep" , img:"./images/sheep.png"},
    {name: "cow" , img:"./images/cow.png"},
    {name: "chicken" , img:"./images/chicken.png"},
    {name: "monkey" , img:"./images/monkey.png"},
    {name: "snake" , img:"./images/snake.png"},
    {name: "pig", img:"./images/pig.png"},
    {name: "rat" , img:"./images/rat.png"},
    {name: "donkey" , img:"./images/donkey.png"},
    {name: "horse" , img:"./images/horse-word.png"},
    {name: "cat" , img:"./images/cat-word.png"},
    {name: "dog", img:"./images/dog-word.png"},
    {name: "bird" , img:"./images/bird-word.png"},
    {name: "sheep" , img:"./images/sheep-word.png"},
    {name: "cow" , img:"./images/cow-word.png"},
    {name: "chicken" , img:"./images/chicken-word.png"},
    {name: "monkey" , img:"./images/monkey-word.png"},
    {name: "snake" , img:"./images/snake-word.png"},
    {name: "pig", img:"./images/pig-word.png"},
    {name: "rat" , img:"./images/rat-word.png"},
    {name: "donkey" , img:"./images/donkey-word.png"},
]

const memoryGame = new MemoryGame(cards);

/*const pairsClickedElt= document.querySelector('#pairs-clicked span');
console.log("$$$ pairsClickedElt", pairsClickedElt, pairsClickedElt.innerHTML);
this.pairsClickedElt = Number(pairsClickedElt.innerHTML)+1;
const pairsGuessed= document.querySelector('#pairs-guessed span');
console.log("$$$ pairs-guessed", pairs-guessed, pairs-guessed.innerHTML);
const countpairsClicked = Number(pairs-guessed.innerHTML)
*/

function createCardDiv () {

	const memoryBoard = document.getElementById("memory-board");

	for (let i = 0; i < memoryGame.cards.length; i++) {

			let newBox = document.createElement("div");
			memoryBoard.appendChild(newBox);

			newBox.classList.add("card");

			let cardSide = document.createElement("div")
			cardSide.innerHTML = `<img src="${ memoryGame.cards[i].img }">`

			newBox.appendChild(cardSide);
			newBox.classList.add("back-side");

			//cardSide.classList.add("front-side");
	}
}

createCardDiv();

function flipCard (card) {
    card.classList.toggle('front-side');
    card.classList.toggle('back-side'); 
}

let prevCard;
let secondCard = false;
document.querySelectorAll('.card').forEach((card) => {
    
    card.addEventListener('click', () => {

				flipCard(card)

        if(!secondCard) {
            
            prevCard = card
            secondCard = true

        } else {

            const shownCards = document.querySelectorAll(".front-side:not(.locked)");
            let prevImage = '.' + prevCard.querySelector("img").src.slice(21);
            let currentImage ='.' + card.querySelector("img").src.slice(21);
            //console.log("this image", prevImage, currentImage);
            let firstCard = memoryGame.cards.find((card) => card.img === prevImage);
            let currentCard = memoryGame.cards.find((card) => card.img === currentImage);
            setTimeout(_ => {

                console.log('@@ firstCard, currentCard', firstCard, currentCard)
                if (memoryGame.checkIfPair(firstCard, currentCard)){
                    shownCards[0].classList.add('locked');
                    shownCards[1].classList.add('locked');
                } else {
                    flipCard(shownCards[0]);
                    flipCard(shownCards[1]);
                }
							}, 500);

            secondCard = false;
        }
    })
  }
);