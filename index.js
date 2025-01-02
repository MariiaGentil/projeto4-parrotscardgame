
const btnInicioConfirmar = document.querySelector(".btn-inicio-confirmar")
const inputInicio = document.querySelector(".input-inicio")
const divSelecaoDeCartas = document.querySelector(".selecao-de-cartas")
const mensagemInicio = document.querySelector(".mensagem-inicio")
const main = document.querySelector(".main")
const segundosJogados = document.querySelector(".segundos-jogados")
let intervaloSegundos = null
let arrDeIdices = []
let arrDeParrots = ['bobrossparrot', 'bobrossparrot', 'explodyparrot', 'explodyparrot', 'fiestaparrot', 'fiestaparrot', 'metalparrot', 'metalparrot', 'revertitparrot', 'revertitparrot', 'tripletsparrot', 'tripletsparrot', 'unicornparrot', 'unicornparrot']
let indexSegundos = 1


btnInicioConfirmar.addEventListener("click", function () {
    let inputInicioValue = parseFloat(inputInicio.value)
    if (inputInicioValue === '' || inputInicioValue % 2 !== 0 || inputInicioValue > 14 || inputInicioValue < 4) {
        mensagemInicio.classList.remove("disabled")
        inputInicioValue = null
    } else {
        segundosJogados.classList.remove("disabled")
        divSelecaoDeCartas.classList.add("disabled")
        for (let i = 0; i < inputInicioValue; i++) {
            main.innerHTML += `<div class="card-main" onclick="selecionarCarta(this,${[i]})"><div>`
        }
        let numRandom = parseInt(Math.random() * inputInicio.value)
        while (arrDeIdices.length < inputInicioValue) {
            if (!arrDeIdices.includes(numRandom)) {
                arrDeIdices.push(numRandom)
            }
            numRandom = parseInt(Math.random() * inputInicio.value)
        }
        intervaloSegundos = setInterval(function(){
            
            segundosJogados.innerHTML = `${indexSegundos}s`
            indexSegundos++
        }, 1000)

    }
})

inputInicio.addEventListener("focus", function () {
    if (!mensagemInicio.classList.contains("disabled")) {
        mensagemInicio.classList.add("disabled")
    }
})

let indexDasCartas = 0
let indexVencedor = 0
let card1 = null
let card2 = null
let arrAux = []


function selecionarCarta(elem, indice) {
    if (indexDasCartas < 1) {
        if (card1 === null && (elem.style.backgroundImage === `` || elem.style.backgroundImage === `url("images/parrot.png")`)) {
            card1 = elem
        }else if (card2 === null && (elem.style.backgroundImage === `` || elem.style.backgroundImage === `url("images/parrot.png")`)) {
            card2 = elem
        }
        elem.style.backgroundImage = `url(images/${arrDeParrots[arrDeIdices[indice]]}.gif)`
        elem.style.transform = 'rotateY(180deg)'
        elem.style.transformStyle = 'preserve-3d'
        elem.style.transition = 'all .5s'

        if (card1.style.backgroundImage !== card2.style.backgroundImage && card2 !== null) {
            setTimeout(function () {
                card1.style.backgroundImage = `url(images/parrot.png)`
                card1.style.transform = 'rotateY(0deg)'
                card2.style.backgroundImage = `url(images/parrot.png)`
                card2.style.transform = 'rotateY(0deg)'
                
                indexDasCartas = 0
                card1 = null
                card2 = null
            }, 500)
            
        } else {
            setTimeout(function () {
                if(arrAux.includes(arrDeParrots[arrDeIdices[indice]])){
                    indexDasCartas = 0
                    card1 = null
                    card2 = null
                }else {
                    indexVencedor += 2
                    arrAux.push(arrDeParrots[arrDeIdices[indice]])
                    indexDasCartas = 0
                    card1 = null
                    card2 = null
                }

                if (indexVencedor === parseFloat(inputInicio.value)) {
                    const vencedor = document.querySelector(".vencedor")
                    const btnJogarNovamente = document.querySelector(".jogar-novamente")

                    main.innerHTML = ''
                    vencedor.classList.remove("disabled")
                    clearInterval(intervaloSegundos)
                    segundosJogados.innerHTML = `Você venceu em ${indexSegundos - 1} segundos!`
                    btnJogarNovamente.addEventListener("click", function(){
                        vencedor.classList.add("disabled")
                        segundosJogados.innerHTML = ''
                        divSelecaoDeCartas.classList.remove("disabled")
                        segundosJogados.classList.add("disabled")
                        indexVencedor = 0
                        inputInicio.value = null
                        indexSegundos = 1
                        arrDeIdices = []
                    })
                }
            }, 500)
        }
    }
    indexDasCartas++
}