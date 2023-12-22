



const suits = ['Clubs', 'Diamonds', 'Spades', 'Hearts']
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']



let deck = []
const playerHand = []
const dealerHand = []
let winner
let playerValue
let dealerValue

startGame()

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
    return
}

function deal() {
    playerHand.push(deck.pop())
    dealerHand.push(deck.pop())
    playerHand.push(deck.pop())
    dealerHand.push(deck.pop())
    console.log(`Player: ${playerHand[0]} , ${playerHand[1]}`)
    console.log(`Dealer: ${dealerHand[0]} , ${dealerHand[1]}`)

    let player = checkValue(playerHand)
    let dealer = checkValue(dealerHand)

    if (dealer < 16) {
        hit(dealerHand, 'Dealer Hand')
    }
}



function startGame() {
    createDeck()
    shuffle()
    deal()
}

function hit(userHit, actualUser) {
    let newCard = userHit.push(deck.pop())
    console.log(`Your new card is : ${userHit[newCard - 1]}`)
    console.log(`${actualUser} ${userHit}`)
    return newCard
}

function checkValue(userHand) {
    let userValue = 0

    userHand?.forEach((card) => {
        let cardOrNum = card.split(" ")?.[0]

        if (cardOrNum === 'Q' || cardOrNum === 'J' || cardOrNum === 'K') {
            userValue += 10
        } 
        
        if (Number(cardOrNum) >= 2 && Number(cardOrNum) <= 10) {
            userValue += Number(cardOrNum)
        } 
        
        if (cardOrNum === 'A') {
            userValue += userValue >= 11 ? 10 : 1
        }
    })

    return userValue
}

function choosingWinner(player, dealer) {
    if (player > dealer && player <= 21) {
        console.log('Player has won')
    }

    if (dealer > player && dealer <= 21) {
        console.log('Dealer has won')
    }

    if (dealer === 21 && player !== 21) {
        console.log('Dealer won')
    }

    if (player === 21 && dealer !== 21) {
        console.log('Player won')
    }

    if (dealer === player) {
        console.log('Draw')
    }
}

