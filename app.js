const messageBr = document.querySelector('.messageBr')
const messageEl = document.querySelector('.messageEl')
const dealBtn = document.getElementById('deal')

let dealerbox = document.querySelector('.dealer')
let playerbox = document.querySelector('.player')

const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs']
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const deck = [];
let bankRoll = 100
let credit = 20
let turn = true

let player = {
    value: 0,
    hand: [],
    count: 1
}

let dealer = {
    value: 0,
    hand: [],
    count: 1
}
startGame()

function startGame() {
    createDeck()
    shuffle()
    deal()
}

eventBtn = document.querySelector('.buttons')

eventBtn.addEventListener('click', handleClick)

messageBr.textContent = `$ ${bankRoll}`


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
    bankRoll -= 20
    getImage(dealer)
    getImage(player)
}

function checkBlackJack(player, dealer) {
    if (player.value === 21 && dealer.value !== 21) {
        console.log("BlackJack Player Won 1.5")
        messageEl.textContent = "BlackJack Player Won 1.5"
        return bankRoll += 55
    } else if (dealer.value === 21 && player.value !== 21) {
        console.log("BlackJack Dealer")
        messageEl.textContent = "BlackJack Dealer"
        return
    } else if (dealer.value === 21 && player.value === 21) {
        console.log("BJ Push")
        messageEl.textContent = 'BlackJack, Push'
        return
    }

}

function hit() {

    if(turn === true) {

    let newCard = player.hand.push(deck.pop())
    console.log(`You got ${player.hand[newCard - 1]}`)
    console.log(` Current hand :${player.hand}`)
    bankRoll -= 20
    checkValue(player)


    player.count += 1;
    let card = document.createElement('img')
    card.src = `images/${player.hand[player.count]}.svg`
    card.classList.add('card')
    playerbox.append(card)
    }
    else return


}

function choosingWinner(player, dealer) {
    if (player > dealer && player <= 21) {
        console.log('Player has won')
        messageEl.textContent = 'Player Won'
        return bankRoll += 40
    }

    else if (dealer > player && dealer <= 21) {
        console.log('Dealer has won')
        messageEl.textContent = 'Dealer Won'
        return

    }

    else if (dealer === 21 && player !== 21) {
        console.log('Dealer won')
        messageEl.textContent = 'Dealer Won'
        return
    }
    else if (player === 21 && dealer !== 21) {
        console.log('Player won')
        messageEl.textContent = 'Player Won'
        return bankRoll += 40
    }
    else if (dealer === player) {
        console.log('Push')
        messageEl.textContent = 'Push'

        return bankRoll += 20
    }
    else if (dealer > 21 && player < 21) {
        console.log('Dealer busted')
        messageEl.textContent = 'Dealer Bust'
        return bankRoll += 40
    }
    return bankRoll
}

function handleClick(e) {
    let buttonClicked = e.target.id
    if ('stand' === buttonClicked) {
        console.log('Player Stands')
        turn = false
        dealerTurn()
    }
    if ('hit' === buttonClicked) {
        hit()

    }
    if ('double' === buttonClicked) {
        console.log('User doubled')
        hit()
        turn = false
        dealerTurn()
    }
    if ('surrender' === buttonClicked)
        turn = false
        return bankRoll += 10
}

function dealerTurn() {
    checkValue(dealer)
    while (dealer.value <= 16) {
        dealer.hand.push(deck.pop())
        checkValue(dealer)
        dealer.count += 1;
        let card = document.createElement('img')
        card.src = `images/${dealer.hand[dealer.count]}.svg`
        card.classList.add('card')
        dealerbox.append(card)
    
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


