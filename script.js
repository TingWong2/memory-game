class MemoryGame {

    constructor(cards) {
        this.cards = cards;
        this.pickedCards = []; 
        this.pairsClicked = 0;
        this.pairsGuessed = 0;

        // randomize the cards
        this.shuffleCards()

        this.time = 120;

        this.timerId = setInterval(_ => {
            this.time--;
            if(this.time === 0) {
                document.getElementById('timer-text').innerText = `Game Over`  
                alert(`Game Over`)
                clearInterval(this.timerId)
                window.reload()
                return
            }
            document.getElementById('timer-text').innerText = `Remaining time: ${this.time} s`
        }, 1000)
 }   

    shuffleCards() {
    	// 1. créer une copie
    	let cardsCopy = [...this.cards];
        cardsCopy.sort(_ => Math.random() - 0.5) // <-- randomize the cards
        console.log("cardsCopy", cardsCopy);
        return this.cards = cardsCopy;
    }

    checkIfPair(card1, card2) {

        console.log('@@ checkIfPair', card1, card2)
        this.pairsClicked += 1;
        document.getElementById('pairs-clicked').innerText = `${this.pairsClicked}`

        if (card1.name !== card2.name) {

            alert('Sorry! Try again');
            return false;
        } else {

            this.pairsGuessed = this.pairsGuessed + 1;
            document.getElementById('pairs-guessed').innerText = `${this.pairsGuessed}`
            alert('Good job!');
            return true;
        }
    }
   
    checkIfFinished() {
     return this.pairsGuessed === this.cards.length/2;
    }

}       

  
  