const reel1 = document.getElementById('reel1')
const reel2 = document.getElementById('reel2')
const reel3 = document.getElementById('reel3')

spinBtn = document.getElementById('spin')
resetBtn = document.getElementById('reset')
messageEl = document.getElementById('message')

let symbols = ['🍎', '🍋', '🍒', '💎', '🍊', '🔔', '🍀', '🍇']
let credit = 1
let bankRoll = 50

spinBtn.addEventListener('click', handleClick)
resetBtn.addEventListener('click', render)

function randomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)]
}

function spin() {
    slots = []
    bankRoll -= 1
    
    reel1.style.background = 'white'
    reel2.style.background = 'white'
    reel3.style.background = 'white'
    for (let i = 0; i < 3; i++) {
        slots.push(randomSymbol())
    }
    winCombo()
    messageEl.textContent = `$ ${bankRoll}`
    console.log(slots)
    console.log(bankRoll)
}

function winCombo() {
    reel1.textContent = slots[0]
    reel2.textContent = slots[1]
    reel3.textContent = slots[2]

    if (slots[0] === slots[1] && slots[0] !== slots[2]) {
        reel1.style.background = 'gold'
        reel2.style.background = 'gold'
       return bankRoll += credit * (symbols.indexOf(slots[0]) * 2 ) 
    } else if (slots[0] === slots[1] && slots[0] === slots[2]) {
        reel1.style.background = 'gold'
        reel2.style.background = 'gold'
        reel3.style.background = 'gold'
        return bankRoll += credit * (symbols.indexOf(slots[0]) * 5 ) 
    } 

}

function handleClick() {
    if (bankRoll > 50) {
        messageEl.style.color = 'green'
    } if (bankRoll <= 25){
        messageEl.style.color = 'orange'
    } if (bankRoll <= 0) {
        messageEl.style.color = 'red'
        return 
    } 
    spin()
}

function render() {
    bankRoll = 50
    messageEl.textContent = '$ 50'
}