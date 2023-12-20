const suits = ['Clubs', 'Diamonds', 'Spades', 'Hearts']
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const deck = []
const playerHand = []
const dealerHand = []

createDeck()
shuffle()
deal()



function createDeck() {
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push(`${value} ${suit}`)
        })
    })
}

function shuffle() {
    for (let i = deck.length - 1; i > 0; i--) {
        let randomCard = Math.floor(Math.random() * deck.length)
        let temporaryCard = deck[i]
        deck[i] = deck[randomCard]
        deck[randomCard] = temporaryCard
    }
    return deck
}

console.log(deck)

function deal() {
    playerHand.push(deck.pop())
    dealerHand.push(deck.pop())
    playerHand.push(deck.pop())
    dealerHand.push(deck.pop())
    console.log(`Player: ${playerHand[0]}, ${playerHand[1]}`)
    console.log(`dealer: ${dealerHand[0]}, ${dealerHand[1]}`)
    console.log(`remaining cards: ${deck.length}`)

}



