const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs']
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const deck = [];
// const playerHand = [];
// const dealerHand = [];
// let playerValue = 0;
// let dealerValue = 0;


let player = {
    value: 0,
    hand: []
}

let dealer = {
    value: 0,
    hand: []
}


function startGame() {
    createDeck();
    shuffle()
    deal()
}


eventBtn = document.querySelector('.buttons')

eventBtn.addEventListener('click', handleClick)




function createDeck() {
    suits.forEach(suit => {
        values.forEach((value) => {
            deck.push(`${value} ${suit}`)
        })
    });
}

function checkValue(user) {
    user.value = 0;
    user.hand.forEach((card) => {

        let number = parseInt(card[0])

        if (card.includes('A')) {
            if (user.value + 11 < 21) {
                user.value += 11
            }
            else {
                user.value += 1
            }
        }

        if (card.includes('J') || card.includes('Q') || card.includes('K') || card.includes('10')) {
            user.value += 10;
        }

        if (number >= 2 && number <= 9) {
            user.value += number
        }



    })
    return user.value
}


function shuffle() {
    for (let i = 0; i < deck.length; i++) {
        let randomIndex = Math.floor(Math.random() * deck.length)
        let temp = deck[i];
        deck[i] = deck[randomIndex];
        deck[randomIndex] = temp;
    }
    return deck;
}

function deal() {
    player.hand.push(deck.pop())
    dealer.hand.push(deck.pop())
    player.hand.push(deck.pop())
    dealer.hand.push(deck.pop())
    console.log(`P : ${player.hand}`)
    console.log(`D : ${dealer.hand[0]} , other card is Hidden`)
    console.log(`Remaining cards : ${deck.length}`)
    checkValue(player)
    checkValue(dealer)
    checkBlackJack(player, dealer)
}

function checkBlackJack(player, dealer) {
    if (player.value === 21 && dealer.value !== 21) {
        console.log("BlackJack Player Won 1.5")
    } else if (dealer.value === 21 && player.value !== 21) {
        console.log("BlackJack Dealer")

    } else if (dealer.value === 21 && player.value === 21) {
        console.log("BJ Push")
    }

}

function hit() {
    let newCard = player.hand.push(deck.pop())
    console.log(`You got ${player.hand[newCard - 1]}`)
    console.log(` Current hand :${player.hand}`)
    checkValue(player)
}

function choosingWinner(player, dealer) {
    ø
    if (player > dealer && player <= 21) {
        console.log('Player has won')
    }

    else if (dealer > player && dealer <= 21) {
        console.log('Dealer has won')
    }

    else if (dealer === 21 && player !== 21) {
        console.log('Dealer won')
    }

    else if (player === 21 && dealer !== 21) {
        console.log('Player won')
    }

    else if (dealer === player) {
        console.log('Push')
    }
    else if (dealer > 21 && player < 21) {
        console.log('Dealer busted')
    }

}

function handleClick(e) {
    let buttonClicked = e.target.id

    if ('stand' === buttonClicked) {
        console.log('Player Stands')
        dealerTurn()
    }
    if ('hit' === buttonClicked) {
        hit()

    }
    if ('double' === buttonClicked) {
        console.log('User doubled')
        hit()
        dealerTurn()
    }
    if ('surrender' === buttonClicked)
        console.log('player surrendered returned half the money')
}

function dealerTurn() {
    checkValue(dealer)
    while (dealer.value <= 16) {
        dealer.hand.push(deck.pop())
        checkValue(dealer)
    }
    return choosingWinner(player.value, dealer.value)

}


// testing img rendering 
function getImage(user) {
    let img = document.createElement('img')
    let img2 = document.createElement('img')
    img.src = `images/${user.hand[0]}.svg`
    img2.src = `images/${user.hand[1]}.svg`
    img.classList.add('card')
    img2.classList.add('card')

    if (user === dealer) {
        dealerbox.append(img)
        dealerbox.append(img2)
    }
    if (user === player) {
        playerbox.append(img)
        playerbox.append(img2)
    }
}

let dealerbox = document.querySelector('.dealer')
let playerbox = document.querySelector('.player')