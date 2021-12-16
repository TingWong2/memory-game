const cards = [
    {name: "horse" , img:"./images/horse.png", sound: "./audio/horse.mp3"},
    {name: "cat" , img:"./images/cat.png", sound: "./audio/cat.mp3"},
    {name: "dog", img:"./images/dog.png", sound: "./audio/dog.mp3"},
    {name: "bird" , img:"./images/bird.png", sound: "./audio/bird.mp3"},
    {name: "sheep" , img:"./images/sheep.png", sound: "./audio/sheep.mp3"},
    {name: "cow" , img:"./images/cow.png", sound: "./audio/cow.mp3"},
    {name: "chicken" , img:"./images/chicken.png", sound: "./audio/chicken.mp3"},
    {name: "monkey" , img:"./images/monkey.png", sound: "./audio/monkey.mp3"},
    {name: "snake" , img:"./images/snake.png", sound: "./audio/snake.mp3"},
    {name: "pig", img:"./images/pig.png", sound: "./audio/pig.mp3"},
    {name: "rat" , img:"./images/rat.png", sound: "./audio/rat.mp3"},
    {name: "donkey" , img:"./images/donkey.png", sound: "./audio/donkey.mp3"},
    {name: "horse" , img:"./images/horse-word.png", sound: "./audio/horse.mp3"},
    {name: "cat" , img:"./images/cat-word.png", sound: "./audio/cat.mp3"},
    {name: "dog", img:"./images/dog-word.png", sound: "./audio/dog.mp3"},
    {name: "bird" , img:"./images/bird-word.png", sound: "./audio/bird.mp3"},
    {name: "sheep" , img:"./images/sheep-word.png", sound: "./audio/sheep.mp3"},
    {name: "cow" , img:"./images/cow-word.png", sound: "./audio/cow.mp3"},
    {name: "chicken" , img:"./images/chicken-word.png", sound: "./audio/chicken.mp3"},
    {name: "monkey" , img:"./images/monkey-word.png", sound: "./audio/monkey.mp3"},
    {name: "snake" , img:"./images/snake-word.png", sound: "./audio/snake.mp3"},
    {name: "pig", img:"./images/pig-word.png", sound: "./audio/pig.mp3"},
    {name: "rat" , img:"./images/rat-word.png", sound: "./audio/rat.mp3"},
    {name: "donkey" , img:"./images/donkey-word.png", sound: "./audio/donkey.mp3"},
]

const memoryGame = new MemoryGame(cards);

function createCardDiv () {

	const memoryBoard = document.getElementById("memory-board");

	for (let i = 0; i < memoryGame.cards.length; i++) {

			let newBox = document.createElement("div");
            newBox.setAttribute('id', memoryGame.cards[i].name)
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

// https://stackoverflow.com/questions/9419263/how-to-play-audio
function playSound(file) {
    const sound = new Audio(file);
    sound.play()
}

function flipCard (card) {
    card.classList.toggle('front-side');
    card.classList.toggle('back-side'); 
}

let prevCard;
let secondCard = false;
document.querySelectorAll('.card').forEach((card) => {
    
    card.addEventListener('click', () => {

        flipCard(card)

        const cardId = card.getAttribute('id') ;
        const cardElement = cards.find(card => card.name === cardId);
        if(cardElement) {
            playSound(cardElement.sound)
        }

        if(secondCard === false) { // si il nya pas encore 2 cards retournes
            
            prevCard = card
            secondCard = true

        } else { // on a deja clique sur une card

            const shownCards = document.querySelectorAll(".front-side:not(.locked)"); // quelles sont les 2 cards qui sont retournes ?
            let prevImage = '.' + prevCard.querySelector("img").src.slice(21); // extract img name
            let currentImage ='.' + card.querySelector("img").src.slice(21); // // extract img name
            //console.log("this image", prevImage, currentImage);
            let firstCard = memoryGame.cards.find((card) => card.img === prevImage);
            let currentCard = memoryGame.cards.find((card) => card.img === currentImage);
            
            setTimeout(_ => { // test 2 cards are equal ?

                console.log('@@ firstCard, currentCard', firstCard, currentCard)
                if (memoryGame.checkIfPair(firstCard, currentCard)){ // <---- TEST
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