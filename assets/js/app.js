const miJuego = (() => {
    `use strict`;

    let dec = [];
    const types = ['C', 'D', 'H', 'S'],
        speciales = ['J', 'Q', 'K', 'A'];

    let playersPoints = [];
    // referencias html
    const btnAskCard = document.querySelector('#btnAskCard'),
        btnDeal = document.querySelector('#btnDeal'),
        btnNewGame = document.querySelector('#btnNewGame');

    const printMsg = document.querySelector('.msg'),
        divPlayerCards = document.querySelectorAll('.cardConteiner'),
        pointHtml = document.querySelectorAll('small');

    // iniciamos el juego
    const startTheGame = (playerNumber = 2) => {
        dec = newDec();

        playersPoints = [];
        for (let i = 0; i < playerNumber; i++) {
            playersPoints.push(0);
        }
        printMsg.innerHTML = '';
        pointHtml.forEach(elem => elem.innerText = 0);
        divPlayerCards.forEach(elem => elem.innerHTML = '');

        btnAskCard.disabled = false;
        btnDeal.disabled = false;
    }

    // esta funciton crea la baraja
    const newDec = () => {

        dec = [];
        for (let i = 2; i <= 10; i++) {
            for (let type of types) {
                dec.push(i + type)
            }
        }
        for (let type of types) {
            for (let special of speciales) {
                dec.push(special + type)
            }
        }
        return _.shuffle(dec);
    }

    // function to ask the card
    const askCart = () => {
        if (dec.length === 0) {
            throw 'No hay cartas en la baraja'
        }
        return dec.pop();
    }
    // sacamos el valor de una carta
    const cardValue = (card) => {
        const valor = card.substring(0, card.length - 1) // cojemos valor del string desde posicion 0 hasta largo menos 1 caracter
        return (isNaN(valor)) ?
            ((valor === 'A') ? 11 : 10)
            : valor * 1;
    }

    // turn: 0 = primer player, Last one is computer;
    const getPoints = (card, turn) => {
        playersPoints[turn] = playersPoints[turn] + cardValue(card);
        pointHtml[turn].innerText = playersPoints[turn];
        return playersPoints[turn];
    }

    const createCard = (card, turn) => {

        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${card}.png`;
        imgCard.classList.add('carta');
        divPlayerCards[turn].append(imgCard)
    }
    // who win
    const whoWin = () => {

        const [minPoints, compPoints] = playersPoints;

        setTimeout(() => {
            if (compPoints === minPoints) {
                printMsg.innerHTML = "<span>DRAW</span>"
            } else if (minPoints > 21) {
                printMsg.innerHTML = "<span>Comp Win!</span>"
            } else if (compPoints > 21) {
                printMsg.innerHTML = "<span>Player Win!</span>"
            } else {
                printMsg.innerHTML = "<span>Comp Win!</span>"
            }
        }, 100);
    }

    // comp turn 
    const compGame = (minPoints) => {

        let compPoints = 0;

        do {
            const card = askCart();
            compPoints = getPoints(card, playersPoints.length - 1);
            createCard(card, playersPoints.length - 1);

        } while ((compPoints < minPoints) && (minPoints <= 21));

        whoWin();
    }

    //eventos
    btnAskCard.addEventListener('click', () => {

        const card = askCart();
        const playerPoints = getPoints(card, 0);

        createCard(card, 0);

        if (playerPoints > 21) {

            btnAskCard.disabled = true;
            btnDeal.disabled = true;
            compGame(playerPoints);

        } else if (playerPoints === 21) {

            btnAskCard.disabled = true;
            btnDeal.disabled = true;
            compGame(playerPoints);
        }

    });

    btnDeal.addEventListener('click', () => {
        btnAskCard.disabled = true;
        btnDeal.disabled = true;
        compGame(playersPoints[0]);
    });

    btnNewGame.addEventListener('click', () => {
        startTheGame();
    })

    printMsg.addEventListener('click', () => {
        printMsg.innerHTML = "";
    })
    return {
        newGame: startTheGame()
    };
})();