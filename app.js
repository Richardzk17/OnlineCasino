const suits = ['Clubs', 'Diamonds', 'Spades', 'Hearts']
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const deck = []
const playerHand = []
const dealerHand = []
let playerValue = 0

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


function deal() {
    playerHand.push(deck.pop())
    dealerHand.push(deck.pop())
    playerHand.push(deck.pop())
    dealerHand.push(deck.pop())
    console.log(`Player: ${playerHand[0]} , ${playerHand[1]}`)
    console.log(`Dealer: ${dealerHand[0]} , ${dealerHand[1]}`)
    console.log(`Remaining cards: ${deck.length}`)

}

function hit() {
    let newCard = playerHand.push(deck.pop())
    console.log(`Your new card is : ${playerHand[newCard - 1]}`)
    console.log(`Player hand: ${playerHand}`)
}

function checkValue() {
    playerValue = 0

    playerHand.forEach((card) => {
        let number = parseInt(card[0])

        if (card.includes('J') || card.includes('Q') || card.includes('K') || card.includes('10')) {
            playerValue += 10
        }
        if (card.includes('A')) {
            if (playerValue <= 21) {
                playerValue += 11
            } else {
                playerValue += 1
            }
        }
        if (number >= 2 && number <= 9) {
            playerValue += number
        }
    })
}

console.log(deck)


