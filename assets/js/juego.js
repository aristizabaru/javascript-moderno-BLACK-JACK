/**
 * Patrón Módulo
 * 
 * Para evitar problemas de seguridad con el código se usa el patrón módulo, el cual
 * crea un nuevo scope por medio de una función anónima autoinvocada, el cual se
 * hace imposible alcanzar en principio desde consola, encapsulando el código
 */

(() => {
    'use strict'

    const tipos = ['C', 'D', 'H', 'S']
    const especiales = ['A', 'J', 'Q', 'K']

    let puntosJugador = 0,
        puntosComputadora = 0

    const imgLink = 'http://127.0.0.1:5500/02-backjack/assets/cartas/10C.png'

    // Referencias HTLM
    const btnPedir = document.querySelector('#btnPedir')
    const btnNuevo = document.querySelector('#btnNuevo')
    const btnDetener = document.querySelector('#btnDetener')
    const puntosHTLM = document.querySelectorAll('small')
    const divCartasJugador = document.querySelector('#jugador-cartas')
    const divCartasComputadora = document.querySelector('#computadora-cartas')

    const crearDeck = () => {
        let deck = []

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(`${i}${tipo}`)
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(`${esp}${tipo}`)
            }
        }

        return deck

    }

    const shuffleDeck = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]
        }
        return array
    }

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck'
        }
        return deck.pop()
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1)

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1
    }

    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta()
            puntosComputadora += valorCarta(carta)
            puntosHTLM[1].innerText = puntosComputadora
            const imgCarta = document.createElement('img')
            imgCarta.classList.add('carta')
            imgCarta.src = `./assets/cartas/${carta}.png`
            divCartasComputadora.append(imgCarta)

            if (puntosMinimos > 21) break

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21))

        setTimeout(() => {
            mostrarGanador()
        }, 100)
    }

    function desactivarBotones() {
        btnPedir.disabled = true
        btnDetener.disabled = true
    }

    function activarBotones() {
        btnPedir.disabled = false
        btnDetener.disabled = false
    }

    function mostrarGanador() {
        if (puntosComputadora === puntosJugador) {
            alert('Nadie gana')
        } else if (puntosJugador > 21) {
            alert('Computadora gana')
        } else if (puntosComputadora > 21) {
            alert('Jugador gana')
        } else {
            alert('Computadora gana')
        }
    }

    // Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta()
        puntosJugador += valorCarta(carta)
        puntosHTLM[0].innerText = puntosJugador
        const imgCarta = document.createElement('img')
        imgCarta.classList.add('carta')
        imgCarta.src = `./assets/cartas/${carta}.png`
        divCartasJugador.append(imgCarta)

        if (puntosJugador >= 21) {
            desactivarBotones()
            turnoComputadora(puntosJugador)
        }

    })

    btnDetener.addEventListener('click', () => {
        desactivarBotones()
        turnoComputadora(puntosJugador)
    })

    btnNuevo.addEventListener('click', () => {
        puntosHTLM[0].innerText = 0
        puntosHTLM[1].innerText = 0
        puntosJugador = 0
        puntosComputadora = 0
        divCartasJugador.innerHTML = ''
        divCartasComputadora.innerHTML = ''
        deck = shuffleDeck(crearDeck())
        activarBotones()
    })

    const deck = shuffleDeck(crearDeck())

})()

