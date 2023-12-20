const suits = ['Clubs', 'Diamonds','Spades', 'Hearts']
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ]
const deck = []

createDeck()
shuffle(deck)


function createDeck() {
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push(`${suit} ${value}`)
        })
    })
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let randomCard = Math.floor(Math.random() * deck.length)
        let temporaryCard = deck[i]
        deck[i] = deck[randomCard]
        deck[randomCard] = temporaryCard
    }
}

console.log(deck)