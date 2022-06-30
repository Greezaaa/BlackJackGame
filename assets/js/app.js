/* 

2C = 2 treboles
2D = 2 diamantes
2H = 2 corazones
2S = 2 espadas


*/

// variables
let dec = [];
let playerPoints = 0;
let compPoints = 0;

// constantes
const types = ['C', 'D', 'H', 'S']
const speciales = ['J', 'Q', 'K', 'A']


// referencias html
const btnAskCard = document.querySelector('#btnAskCard');
const btnDeal = document.querySelector('#btnDeal')
const btnNewGame = document.querySelector('#btnNewGame')

const printMsg = document.querySelector('.msg');
const printCardPlayer = document.querySelector('#playerCards');
const printCardComp = document.querySelector('#compCards');
const pointHtml = document.querySelectorAll('small');

// creamos una nueva baraja 
const creatDeck = () => {
    // añadimos cartas a la baraja de 2 a 10
    for (let i = 2; i <= 10; i++) {
        // por cada carta de 2 a 10 añadimos TYPE de carta, selecionando de TYPES
        for (let type of types) {
            // añadimos resultado al objeto DEC
            dec.push(i + type)
        }
    }
    for (let type of types) {
        for (let special of speciales) {
            dec.push(special + type)
        }
    }
    dec = _.shuffle(dec);
    return dec;
}
// creamos baraja
creatDeck();

// function to ask the card
const askCart = () => {
    // si no quedan cartas paramas la app con THROW
    if (dec.length === 0) {
        throw 'No quedan cartas en la baraja'
    }
    const card = dec.pop();
    return card;
}
// sacamos el valor de una carta
const cardValue = (card) => {

    const valor = card.substring(0, card.length - 1) // cojemos valor del string desde posicion 0 hasta largo menos 1 caracter
    return (isNaN(valor)) ?
        ((valor === 'A') ? 11 : 10)
        : valor * 1;
}
const points = cardValue(askCart());

//comp turn AI time 
const compTurn = (minPoints) => {

    do {
        const card = askCart();
        compPoints = compPoints + cardValue(card);
        pointHtml[1].innerText = `${compPoints}`;

        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${card}.png`;
        imgCard.classList.add('carta');
        printCardComp.append(imgCard);

        if (minPoints > 21) { break; }

    } while ((compPoints < minPoints) && (minPoints <= 21));

    setTimeout(() => {

        if (compPoints === minPoints) {
            printMsg.innerHTML = "<span>Impate!</span>"
        } else if (minPoints > 21) {
            printMsg.innerHTML = "<span>Comp Win!</span>"
        } else if (compPoints > 21) {
            printMsg.innerHTML = "<span>Player Win!</span>"
        } else if (compPoints < playerPoints) {
            printMsg.innerHTML = "<span>Player Win!</span>"
        } else {
            printMsg.innerHTML = "<span>Comp Win!</span>"
        }
    }, 100);
}

//eventos
btnAskCard.addEventListener('click', () => {
    const card = askCart();
    playerPoints = playerPoints + cardValue(card);
    pointHtml[0].innerHTML = `${playerPoints}`;

    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add('carta');
    printCardPlayer.append(imgCard);

    if (playerPoints > 21) {

        btnAskCard.disabled = true;
        btnDeal.disabled = true;

        compTurn(playerPoints);
    } else if (playerPoints === 21) {
        btnAskCard.disabled = true;
        btnDeal.disabled = true;
        compTurn(playerPoints);
    }
});

btnDeal.addEventListener('click', () => {
    btnAskCard.disabled = true;
    btnDeal.disabled = true;
    compTurn(playerPoints);
});

btnNewGame.addEventListener('click', () => {
    dec = [];
    dec = creatDeck();

    playerPoints = 0;
    compPoints = 0;
    pointHtml[0].innerText = 0;
    pointHtml[1].innerText = 0;

    printCardComp.innerHTML = "";
    printCardPlayer.innerHTML = "";
    printMsg.innerHTML = "";

    btnAskCard.disabled = false;
    btnDeal.disabled = false;
})

