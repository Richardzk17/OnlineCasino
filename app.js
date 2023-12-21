const suits = ['Clubs', 'Diamonds', 'Spades', 'Hearts']
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const deck = []
const playerHand = []
const dealerHand = []
let winner = false
let tie = false
let lose = false
let playerValue = 0
let dealerValue = 0

createDeck()
shuffle()
deal()
choosingWinner()
console.log(deck)


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
    console.log(`Player hand: ${dealerHand}`)

    checkValue()
    bust()
}

function checkValue() {
    playerValue = 0

    playerHand.forEach((card) => {
        let number = parseInt(card[0])

        if (card.includes('J') || card.includes('Q') || card.includes('K') || card.includes('10')) {
            playerValue += 10
        } else if (number >= 2 && number <= 9) {
            playerValue += number
        } else if (card.includes('A')) {
            playerValue += (playerValue + 11 > 21) ? 1 : 11
        }
    })
    return console.log(`current hand is ${playerValue}`)
}

function choosingWinner(){ 
    if (playerValue === dealerValue) {
        console.log('push')
    } else if (playerValue > dealerValue && playerValue <= 21){
        console.log('player wins')
    } else if (dealerValue > playerValue && dealerValue <= 21) {
        console.log('dealer wins ')
    } else if (playerValue > 21) {
        console.log('bust, dealer wins')
    } else if (dealerValue > 21) {
        console.log('bust, player wins')
    } else if (dealervalue > 21 && playerValue > 21 ) {
        console.log('bust, dealer wins')
    }
}

function dealerHit() {
    if (dealerValue <= 16) {
        dealerHand.push(deck.pop())
    } if (dealerValue > 21) {
        console.log('bust') 
    }
}