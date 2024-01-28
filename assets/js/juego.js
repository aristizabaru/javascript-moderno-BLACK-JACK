/**
 * Patrón Módulo
 * 
 * Para evitar problemas de seguridad con el código se usa el patrón módulo, el cual
 * crea un nuevo scope por medio de una función anónima autoinvocada, el cual se
 * hace imposible alcanzar en principio desde consola, encapsulando el código
 */

const moduloJuego = (() => {
    'use strict'

    let deck = []

    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K']

    let puntosJugadores = []

    // Referencias HTLM
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener')

    const puntosHTLM = document.querySelectorAll('small'),
        divCartaJugadores = document.querySelectorAll('.divCartas')

    const inicializarJuego = (numJugadores = 2) => {
        crearDeck()
        deck = shuffleDeck(deck)

        puntosJugadores = []
        for (let index = 0; index < numJugadores; index++) {
            puntosJugadores.push(0)
            puntosHTLM[index].innerText = 0
            divCartaJugadores[index].innerHTML = ''
        }

        activarBotones()
    }

    const crearDeck = () => {
        deck = []

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

    // Último indice del array es el turno de la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta)
        puntosHTLM[turno].innerText = puntosJugadores[turno]

        return puntosJugadores[turno]
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img')
        imgCarta.classList.add('carta')
        imgCarta.src = `./assets/cartas/${carta}.png`
        divCartaJugadores[turno].append(imgCarta)
    }

    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0

        do {
            const carta = pedirCarta()
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)
            crearCarta(carta, puntosJugadores.length - 1)

            if (puntosMinimos > 21) break

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21))

        setTimeout(() => {
            determinarGanador()
        }, 100)
    }

    function determinarGanador() {

        const [puntosJugador, puntosComputadora] = puntosJugadores

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

    function desactivarBotones() {
        btnPedir.disabled = true
        btnDetener.disabled = true
    }

    function activarBotones() {
        btnPedir.disabled = false
        btnDetener.disabled = false
    }

    // Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta()
        const puntosJugador = acumularPuntos(carta, 0)
        crearCarta(carta, 0)

        if (puntosJugador >= 21) {
            desactivarBotones()
            turnoComputadora(puntosJugadores[0])
        }

    })

    btnDetener.addEventListener('click', () => {
        desactivarBotones()
        turnoComputadora(puntosJugadores[0])
    })


    return {
        nuevoJuego: inicializarJuego
    }
})()

