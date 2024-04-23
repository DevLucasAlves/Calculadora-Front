let campoCalculos = document.querySelector('.input_box_calculos') /* Campo que recebe os numeros e sinais */
campoCalculos.value = 0

/* Armazena os numeros digitados depois do click em uma operação matematica */
let armazeNumbers = []
/* Campo que armazena os calculos previos antes do click no = */
const calculoPrevio = document.querySelector('.box_calculos_previos')

let armazeneStringsResult = ['']/* Armazena o valor do calculoPrevio em forma de string */

let armazenaResultadoFinal = []

/* Button de delete */

const numbers = document.querySelectorAll('.number')
/* Função para ao clicar, selecionar o numero correspondente ao quadrado clicado */
numbers.forEach(number => {
    number.addEventListener('click', () => {
        const VerificarSinalIgual = calculoPrevio.value
        if (VerificarSinalIgual.includes('=')) {
            calculoPrevio.value = ''
            campoCalculos.value = 0
            campoCalculos.value = number.textContent
        } else if (campoCalculos.value < 1) {
            campoCalculos.value = number.textContent
        } else {
            campoCalculos.value = campoCalculos.value + number.textContent
        }
    })
})


/* Operações da parte de prévia de calculo */
const operators = document.querySelectorAll('.operadores')
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        const campoPrevioVerificacaoSinalIgual = calculoPrevio.value
        if (operator.textContent === '+') { /* Soma */
            if (campoPrevioVerificacaoSinalIgual.includes('=')) {
                armazeNumbers = []
                armazeNumbers.push(Number(campoCalculos.value))
                const somaPosSinalIgual = armazeNumbers.reduce((a, b) => a + b, 0)
                calculoPrevio.value = `${somaPosSinalIgual} +`
                armazeneStringsResult.push(calculoPrevio.value)
                campoCalculos.value = 0
            } else {
                armazeNumbers.push(Number(campoCalculos.value))
                const soma = armazeNumbers.reduce((a, b) => a + b, 0)
                calculoPrevio.value = ` ${soma} + `
                armazeneStringsResult.push(calculoPrevio.value)
                campoCalculos.value = 0
            }

        } else if (operator.textContent === '-') { /* Subtração */
            if (campoPrevioVerificacaoSinalIgual.includes('=')) {
                armazeNumbers = []
                armazeNumbers.push(Number(campoCalculos.value))
                const subtracaoPosSinalIgual = armazeNumbers.reduce((a, b) => a + b, 0)
                calculoPrevio.value = `${subtracaoPosSinalIgual} -`
                armazeneStringsResult.push(calculoPrevio.value)
                campoCalculos.value = 0
            } else if (armazeNumbers.length > 0) {
                const somaReduce = armazeNumbers.reduce((a, b) => a + b, 0)
                let subtracao = somaReduce - Number(campoCalculos.value)
                armazeNumbers = [subtracao]
                calculoPrevio.value = `${subtracao} -`
                armazeneStringsResult.push(calculoPrevio.value)
                campoCalculos.value = 0
            } else {
                armazeNumbers.push(Number(campoCalculos.value))
                calculoPrevio.value = `${campoCalculos.value} -`
                armazeneStringsResult.push(calculoPrevio.value)
                campoCalculos.value = 0
            }
        } else if (operator.textContent === 'x') {/* Multiplicação */
            if (campoPrevioVerificacaoSinalIgual.includes('=')) {
                armazeNumbers = []
                armazeNumbers.push(Number(campoCalculos.value))
                const multiplicacaoPosSinalIgual = armazeNumbers.reduce((a, b) => a + b, 0)
                calculoPrevio.value = `${multiplicacaoPosSinalIgual} x`
                armazeneStringsResult.push(calculoPrevio.value)
                campoCalculos.value = 0
            } else if (campoCalculos.value > 0) {
                calculoPrevio.value = `${Number(campoCalculos.value)} x`
                armazeneStringsResult.push(calculoPrevio.value)
                campoCalculos.value = 0
            } else {
                armazeNumbers.push(Number(campoCalculos.value))
                calculoPrevio.value = `${calculoPrevio.value.replace(/[+\-x÷]/g, 'x')}`
                armazeneStringsResult.push(calculoPrevio.value)
                campoCalculos.value = 0
            }
        } else if (operator.textContent === '÷') {/* Divisão */
            if (campoPrevioVerificacaoSinalIgual.includes('=')) {
                armazeNumbers = []
                armazeNumbers.push(Number(campoCalculos.value))
                const divisaoPosSinal = armazeNumbers.reduce((a, b) => a + b, 0)
                calculoPrevio.value = `${divisaoPosSinal} ÷`
                armazeneStringsResult.push(calculoPrevio.value)
                campoCalculos.value = 0
            } else if (campoCalculos.value > 0) {
                calculoPrevio.value = `${Number(campoCalculos.value)} ÷`
                armazeneStringsResult.push(calculoPrevio.value)
                campoCalculos.value = 0
            } else {
                armazeNumbers.push(Number(campoCalculos.value))
                calculoPrevio.value = `${calculoPrevio.value.replace(/[+\-x]/g, '÷')}`
                armazeneStringsResult.push(calculoPrevio.value)
                campoCalculos.value = 0
            }
        }
    })
})

/* Chamando a função apos o click do sinal de = */
const resultado = document.querySelector('.result')
resultado.addEventListener('click', () => {
    const numeroPrevia = armazeneStringsResult[armazeneStringsResult.length - 1]
    if (numeroPrevia.includes('+')) {
        const numeroPreviaCalculo = Number(numeroPrevia.replace('+', ''))
        armazenaResultadoFinal.push(Number(campoCalculos.value))
        const ultimoDadoCampoCalculo = armazenaResultadoFinal[armazenaResultadoFinal.length - 1]
        campoCalculos.value = numeroPreviaCalculo + Number(campoCalculos.value)
        calculoPrevio.value = `${numeroPreviaCalculo} + ${ultimoDadoCampoCalculo} =`
        const valorFianl = parseFloat(campoCalculos.value)
        campoCalculos.value = valorFianl.toFixed(2)
        armazeNumbers = []
    } else if (numeroPrevia.includes('-')) {
        const numeroPreviaCalculo = Number(numeroPrevia.replace('-', ''))
        armazenaResultadoFinal.push(Number(campoCalculos.value))
        calculoPrevio.value = `${numeroPreviaCalculo} - ${campoCalculos.value} =`
        campoCalculos.value = numeroPreviaCalculo - Number(campoCalculos.value)
        const valorFianl = parseFloat(campoCalculos.value)
        campoCalculos.value = valorFianl.toFixed(2)
        armazeNumbers = []
    } else if (numeroPrevia.includes('x')) {
        const numeroPreviaCalculo = Number(numeroPrevia.replace('x', ''))
        armazenaResultadoFinal.push(Number(campoCalculos.value))
        calculoPrevio.value = `${numeroPreviaCalculo} x ${campoCalculos.value} =`
        campoCalculos.value = numeroPreviaCalculo * Number(campoCalculos.value)
        const valorFianl = parseFloat(campoCalculos.value)
        campoCalculos.value = valorFianl.toFixed(2)
        armazeNumbers = []
    } else if (numeroPrevia.includes('÷')) {
        const numeroPreviaCalculo = Number(numeroPrevia.replace('÷', ''))
        armazenaResultadoFinal.push(Number(campoCalculos.value))
        calculoPrevio.value = `${numeroPreviaCalculo} ÷ ${campoCalculos.value} =`
        campoCalculos.value = numeroPreviaCalculo / Number(campoCalculos.value)
        const valorFianl = parseFloat(campoCalculos.value)
        campoCalculos.value = valorFianl.toFixed(2)
        armazeNumbers = []
    } else {
        console.log('erro foda fds');
    }

})



