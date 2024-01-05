const messageBr = document.getElementById('messageBr')
const messageEl = document.querySelector('.messageEl')
const dealBtn = document.getElementById('deal')
const resetBtn = document.querySelector('.resetBtn')
const eventBtn = document.querySelector('.buttons')
let dealerbox = document.querySelector('.dealer')
let playerbox = document.querySelector('.player')

dealBtn.addEventListener('click', deal)
eventBtn.addEventListener('click', handleClick)
resetBtn.addEventListener('click', reset)

const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs']
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const deck = [];
let bankRoll = 100
let credit = 20
let turn = true
let dealt = false
let doubled = false
let surrender = false
let stood = false

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

function render(user) {
    user.value = 0
    user.hand = []
    user.count = 1
}

init()

function init() {
    createDeck()
    shuffle()
}

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
            if (user.value + 11 <= 21) {
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

    if (bankRoll > credit) {

        credit = 20
        bankRoll -= credit
        messageBr.innerText = bankRoll.toString()
        doubled = false
        turn = true
        surrender = false
        stood = false

        if (dealt === false) {
            render(dealer)
            render(player)
            while (playerbox.firstChild) {
                playerbox.removeChild(playerbox.firstChild);
            }
            while (dealerbox.firstChild) {
                dealerbox.removeChild(dealerbox.firstChild);
            }
            dealt = true

            player.hand.push(deck.pop())
            dealer.hand.push(deck.pop())
            player.hand.push(deck.pop())
            dealer.hand.push(deck.pop())
            checkValue(player)
            checkValue(dealer)
            checkBlackJack(player, dealer)
            getImage(dealer)
            getImage(player)
        }
    }
    else {
        let reset = document.createElement('button')
    }
}

function checkBlackJack(player, dealer) {
    if (player.value === 21 && dealer.value !== 21) {
        messageEl.textContent = "BlackJack Player Won"
        bankRoll += credit * 2.5
        messageBr.innerText = bankRoll.toString()
        dealt = false
        return

    } else if (dealer.value === 21 && player.value !== 21) {
        messageEl.textContent = "BlackJack Dealer"
        dealt = false
        return
    } else if (dealer.value === 21 && player.value === 21) {
        messageEl.textContent = "BlackJack, Push"
        dealt = false
        return
    }

}

function hit() {

    if (turn === true && player.value < 21) {
        let newCard = player.hand.push(deck.pop())
        bankRoll -= credit
        checkValue(player)

        player.count += 1;
        let card = document.createElement('img')
        card.src = `images/${player.hand[player.count]}.svg`
        card.classList.add('card')
        playerbox.append(card)
    }
    else {
        return
    }
}

function choosingWinner(player, dealer) {
    turn = false
    if (doubled === true) {
        credit = credit * 2
    }

    if (player > dealer && player <= 21) {
        messageEl.textContent = "Player Won"
        bankRoll += credit + 20
        messageBr.innerText = bankRoll.toString()
        return

    }
    else if (dealer > player && dealer <= 21) {
        messageEl.textContent = "Dealer Won"
        return
    }
    else if (dealer === 21 && player !== 21) {
        messageEl.textContent = "Dealer Won"
        return
    }
    else if (player === 21 && dealer !== 21) {
        messageEl.textContent = "Player Won"
        bankRoll += credit + 20
        messageBr.innerText = bankRoll.toString()
        return
    }
    else if (dealer === player) {
        messageEl.textContent = "Push"
        bankRoll += credit + 20
        messageBr.innerText = bankRoll.toString()
        return
    }
    else if (dealer > 21 && player < 21) {
        messageEl.textContent = "Dealer Bust"
        bankRoll += credit + 20
        messageBr.innerText = bankRoll.toString()
        return
    }
}

function handleClick(e) {
    let buttonClicked = e.target.id
    if ('stand' === buttonClicked && !stood) {
        dealerTurn()
        choosingWinner(player.value)
        dealt = false
        turn = false
        stood = true
    }
    if ('hit' === buttonClicked) {
        hit()
        if (player.value > 21) {
            choosingWinner(player.value)
        }
        dealt = false
    }
    if ('double' === buttonClicked && turn) {
        hit()
        doubled = true
        turn = false
        dealt = false
        stood = true
        dealerTurn()

    }
    if ('surrender' === buttonClicked && turn) {
        if (surrender === false) {
            bankRoll += credit - 10
            messageBr.innerText = bankRoll.toString()
            turn = false
            dealt = false
            surrender = true
            clean()
        }
    }
    return
}

function dealerTurn() {

    dealerbox.removeChild(dealerbox.childNodes[1])

    let secondCard = document.createElement('img')
    secondCard.src = `images/${dealer.hand[1]}.svg`
    secondCard.classList.add('card')

    dealerbox.append(secondCard)
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

function getImage(user) {
    let img = document.createElement('img')
    let img2 = document.createElement('img')
    img.src = `images/${user.hand[0]}.svg`
    img2.src = `images/${user.hand[1]}.svg`
    img.classList.add('card')
    img2.classList.add('card')

    if (user === dealer) {
        dealerbox.append(img)


        let hiddenCard = document.createElement('img')
        hiddenCard.src = `images/backs/tot.png`
        hiddenCard.classList.add('card')

        dealerbox.append(hiddenCard)

    }
    if (user === player) {
        playerbox.append(img)
        playerbox.append(img2)
    }
}


function clean() {
    while (playerbox.firstChild) {
        playerbox.removeChild(playerbox.firstChild);
    }
    while (dealerbox.firstChild) {
        dealerbox.removeChild(dealerbox.firstChild);
    }
}


function reset() {
    bankRoll = 100
    messageBr.textContent = '100'
    render(player)
    render(dealer)
    clean()
}
