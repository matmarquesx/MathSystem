"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline-sync"));
// Funções de cálculo
function soma(a, b) {
    return a + b;
}
function subtracao(a, b) {
    return a - b;
}
function multiplicacao(a, b) {
    return a * b;
}
function divisao(a, b) {
    if (b === 0) {
        throw new Error('Não é possível dividir por zero!');
    }
    return a / b;
}
function potencia(base, expoente) {
    return Math.pow(base, expoente);
}
function raizQuadrada(numero) {
    if (numero < 0) {
        throw new Error('Não é possível calcular a raiz quadrada de um número negativo!');
    }
    return Math.sqrt(numero);
}
// Função para exibir o histórico
function exibirHistorico(historico) {
    if (historico.length === 0) {
        console.log('Histórico vazio!');
        return;
    }
    console.log('\n=== Histórico de Operações ===');
    historico.forEach((registro, index) => {
        const dataFormatada = `${registro.data.getDate()}/${registro.data.getMonth() + 1}/${registro.data.getFullYear()} ${registro.data.getHours()}:${registro.data.getMinutes()}:${registro.data.getSeconds()}`;
        console.log(`${index + 1}. [${dataFormatada}] ${registro.operacao}: ${registro.numeros.join(', ')} = ${registro.resultado}`);
    });
}
// Função principal
function main() {
    console.log('=== Calculadora TypeScript com Histórico ===');
    let continuar = true;
    const historico = [];
    while (continuar) {
        console.log('\nEscolha uma operação:');
        console.log('1 - Soma');
        console.log('2 - Subtração');
        console.log('3 - Multiplicação');
        console.log('4 - Divisão');
        console.log('5 - Potência');
        console.log('6 - Raiz Quadrada');
        console.log('7 - Exibir Histórico');
        console.log('0 - Sair');
        const opcao = readline.question('Digite sua opção: ');
        if (opcao === '0') {
            console.log('Encerrando a calculadora...');
            continuar = false;
            continue;
        }
        if (opcao === '7') {
            exibirHistorico(historico);
            continue;
        }
        try {
            let resultado;
            let operacao;
            let numeros = [];
            switch (opcao) {
                case '1': {
                    const a = parseFloat(readline.question('Digite o primeiro número: '));
                    const b = parseFloat(readline.question('Digite o segundo número: '));
                    resultado = soma(a, b);
                    operacao = 'Soma';
                    numeros = [a, b];
                    console.log(`Resultado: ${resultado}`);
                    break;
                }
                case '2': {
                    const a = parseFloat(readline.question('Digite o primeiro número: '));
                    const b = parseFloat(readline.question('Digite o segundo número: '));
                    resultado = subtracao(a, b);
                    operacao = 'Subtração';
                    numeros = [a, b];
                    console.log(`Resultado: ${resultado}`);
                    break;
                }
                case '3': {
                    const a = parseFloat(readline.question('Digite o primeiro número: '));
                    const b = parseFloat(readline.question('Digite o segundo número: '));
                    resultado = multiplicacao(a, b);
                    operacao = 'Multiplicação';
                    numeros = [a, b];
                    console.log(`Resultado: ${resultado}`);
                    break;
                }
                case '4': {
                    const a = parseFloat(readline.question('Digite o primeiro número: '));
                    const b = parseFloat(readline.question('Digite o segundo número: '));
                    resultado = divisao(a, b);
                    operacao = 'Divisão';
                    numeros = [a, b];
                    console.log(`Resultado: ${resultado}`);
                    break;
                }
                case '5': {
                    const base = parseFloat(readline.question('Digite a base: '));
                    const expoente = parseFloat(readline.question('Digite o expoente: '));
                    resultado = potencia(base, expoente);
                    operacao = 'Potência';
                    numeros = [base, expoente];
                    console.log(`Resultado: ${resultado}`);
                    break;
                }
                case '6': {
                    const numero = parseFloat(readline.question('Digite o número: '));
                    resultado = raizQuadrada(numero);
                    operacao = 'Raiz Quadrada';
                    numeros = [numero];
                    console.log(`Resultado: ${resultado}`);
                    break;
                }
                default:
                    console.log('Opção inválida!');
                    continue;
            }
            // Registrar no histórico
            historico.push({
                data: new Date(),
                operacao,
                numeros,
                resultado
            });
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Erro: ${error.message}`);
            }
            else {
                console.log('Ocorreu um erro desconhecido.');
            }
        }
    }
}
// Iniciar a aplicação
main();