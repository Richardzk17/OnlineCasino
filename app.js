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
    checkBlackJack(player,dealer)
}

function checkBlackJack(player,dealer) {
    if (player.value === 21 && dealer.value !== 21) {
        console.log("BlackJack Player Won 1.5")
    } else if (dealer.value === 21 && player.value !== 21 ) {
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

// let dealerbox = document.querySelector('.dealer')


// let img = document.createElement('img')
// img.src = 'https://www.hollywoodreporter.com/wp-content/uploads/2012/12/img_logo_blue.jpg'
// img.style.height = '100px'
// img.style.width = '100px'


// function handleClick() {
//     dealerbox.append(img)
// }





// const suits = ['Clubs', 'Diamonds', 'Spades', 'Hearts']
// const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']



// let deck = []
// const playerHand = []
// const dealerHand = []
// let winner, player, dealer

// startGame()

// function createDeck() {
//     suits.forEach(suit => {
//         values.forEach(value => {
//             deck.push(`${value} ${suit}`)
//         })
//     })
// }

// function shuffle() {
//     for (let i = deck.length - 1; i > 0; i--) {
//         let randomCard = Math.floor(Math.random() * deck.length)
//         let temporaryCard = deck[i]
//         deck[i] = deck[randomCard]
//         deck[randomCard] = temporaryCard
//     }
//     return
// }

// function deal() {
//     playerHand.push(deck.pop())
//     dealerHand.push(deck.pop())
//     playerHand.push(deck.pop())
//     dealerHand.push(deck.pop())
//     console.log(`Player: ${playerHand[0]} , ${playerHand[1]}`)
//     console.log(`Dealer: ${dealerHand[0]} , ${dealerHand[1]}`)

//     player = checkValue(playerHand)
//     dealer = checkValue(dealerHand)


//     userPrompt()


// }



// function startGame() {
//     createDeck()
//     shuffle()
//     deal()
// }

// function hit(userHit, actualUser) {
//     console.log(userHit)

//     let newCard = userHit.push(deck.pop())
//     console.log(`Your new card is : ${userHit[newCard - 1]}`)
//     console.log(`${actualUser} ${userHit}`)
//     return newCard
// }

// function checkValue(userHand) {
//     let userValue = 0

//     userHand?.forEach((card) => {
//         let cardOrNum = card.split(" ")?.[0]

//         if (cardOrNum === 'Q' || cardOrNum === 'J' || cardOrNum === 'K') {
//             userValue += 10
//         }

//         if (Number(cardOrNum) >= 2 && Number(cardOrNum) <= 10) {
//             userValue += Number(cardOrNum)
//         }

//         if (cardOrNum === 'A') {
//             userValue += userValue >= 11 ? 10 : 1
//         }
//     })

//     return userValue
// }

// function choosingWinner(player, dealer) {
//     if (player > dealer && player <= 21) {
//         console.log('Player has won')
//     }

//     else if (dealer > player && dealer <= 21) {
//         console.log('Dealer has won')
//     }

//     else if (dealer === 21 && player !== 21) {
//         console.log('Dealer won')
//     }

//     else if (player === 21 && dealer !== 21) {
//         console.log('Player won')
//     }

//     else if (dealer === player) {
//         console.log('Draw')
//     }

// }

// function userPrompt() {
//     let x = prompt('(S)tand     (H)it     (X)plit     (D)ouble')

//     if (x === 'S') {
//         console.log('User Stands')
//         if (dealer < 16) {
//             hit(dealerHand, 'Dealer Hand')
//         }
//         choosingWinner(player, dealer)
//     }
//     if (x === 'H') {
//         hit(playerHand, 'Player: ')
//         userPrompt()
//     }
// }