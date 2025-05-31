import * as readline from 'readline-sync';

// Definição dos tipos
type Operacao = 'soma' | 'subtracao' | 'multiplicacao' | 'divisao' | 'potencia' | 'raiz' | 
                'dobro' | 'triplo' | 'quadruplo' | 'quintuplo' | 'sextuplo' |
                'quadrado' | 'cubo' | 'quarta_potencia' | 'quinta_potencia' | 'sexta_potencia' |
                'bhaskara' | 'media_aritmetica' | 'par_impar';

// Interface para o histórico
interface RegistroHistorico {
    data: Date;
    operacao: string;
    numeros: number[];
    resultado: number | string | { x1: number, x2: number } | null;
}

// Funções de cálculo básicas
function soma(a: number, b: number): number {
    return a + b;
}

function subtracao(a: number, b: number): number {
    return a - b;
}

function multiplicacao(a: number, b: number): number {
    return a * b;
}

function divisao(a: number, b: number): number {
    if (b === 0) {
        throw new Error('Não é possível dividir por zero!');
    }
    return a / b;
}

function potencia(base: number, expoente: number): number {
    return Math.pow(base, expoente);
}

function raizQuadrada(numero: number): number {
    if (numero < 0) {
        throw new Error('Não é possível calcular a raiz quadrada de um número negativo!');
    }
    return Math.sqrt(numero);
}

// Funções extras - Multiplicadores
function dobro(numero: number): number {
    return numero * 2;
}

function triplo(numero: number): number {
    return numero * 3;
}

function quadruplo(numero: number): number {
    return numero * 4;
}

function quintuplo(numero: number): number {
    return numero * 5;
}

function sextuplo(numero: number): number {
    return numero * 6;
}

// Funções extras - Potências específicas
function quadrado(numero: number): number {
    return Math.pow(numero, 2);
}

function cubo(numero: number): number {
    return Math.pow(numero, 3);
}

function quartaPotencia(numero: number): number {
    return Math.pow(numero, 4);
}

function quintaPotencia(numero: number): number {
    return Math.pow(numero, 5);
}

function sextaPotencia(numero: number): number {
    return Math.pow(numero, 6);
}

// Função de Bhaskara
function bhaskara(a: number, b: number, c: number): { x1: number, x2: number } | null {
    const delta = b * b - 4 * a * c;
    
    if (delta < 0) {
        throw new Error('Delta negativo. A equação não possui raízes reais.');
    }
    
    if (a === 0) {
        throw new Error('O valor de "a" não pode ser zero. Não é uma equação do segundo grau.');
    }
    
    const x1 = (-b + Math.sqrt(delta)) / (2 * a);
    const x2 = (-b - Math.sqrt(delta)) / (2 * a);
    
    return { x1, x2 };
}

// Função de média aritmética entre 4 números
function mediaAritmetica(n1: number, n2: number, n3: number, n4: number): number {
    return (n1 + n2 + n3 + n4) / 4;
}

// Função para verificar se um número é par ou ímpar
function verificarParImpar(numero: number): string {
    return numero % 2 === 0 ? 'Par' : 'Ímpar';
}

// Função para exibir o histórico
function exibirHistorico(historico: RegistroHistorico[]): void {
    if (historico.length === 0) {
        console.log('Histórico vazio!');
        return;
    }

    console.log('\n=== Histórico de Operações ===');
    historico.forEach((registro, index) => {
        const dataFormatada = `${registro.data.getDate()}/${registro.data.getMonth() + 1}/${registro.data.getFullYear()} ${registro.data.getHours()}:${registro.data.getMinutes()}:${registro.data.getSeconds()}`;
        
        let resultadoStr: string;
        if (registro.resultado === null) {
            resultadoStr = 'Sem solução real';
        } else if (typeof registro.resultado === 'object' && 'x1' in registro.resultado) {
            resultadoStr = `x1 = ${registro.resultado.x1}, x2 = ${registro.resultado.x2}`;
        } else {
            resultadoStr = String(registro.resultado);
        }
        
        console.log(`${index + 1}. [${dataFormatada}] ${registro.operacao}: ${registro.numeros.join(', ')} = ${resultadoStr}`);
    });
}

// Função principal
function main(): void {
    console.log('=== Calculadora TypeScript com Histórico ===');
    
    let continuar = true;
    const historico: RegistroHistorico[] = [];
    
    while (continuar) {
        console.log('\nEscolha uma operação:');
        console.log('1 - Soma');
        console.log('2 - Subtração');
        console.log('3 - Multiplicação');
        console.log('4 - Divisão');
        console.log('5 - Potência');
        console.log('6 - Raiz Quadrada');
        console.log('7 - Dobro');
        console.log('8 - Triplo');
        console.log('9 - Quádruplo');
        console.log('10 - Quíntuplo');
        console.log('11 - Sêxtuplo');
        console.log('12 - Quadrado');
        console.log('13 - Cubo');
        console.log('14 - Quarta Potência');
        console.log('15 - Quinta Potência');
        console.log('16 - Sexta Potência');
        console.log('17 - Bhaskara');
        console.log('18 - Média Aritmética (4 números)');
        console.log('19 - Verificar Par ou Ímpar');
        console.log('20 - Exibir Histórico');
        console.log('0 - Sair');
        
        const opcao = readline.question('Digite sua opção: ');
        
        if (opcao === '0') {
            console.log('Encerrando a calculadora...');
            continuar = false;
            continue;
        }

        if (opcao === '20') {
            exibirHistorico(historico);
            continue;
        }
        
        try {
            let resultado: number | string | { x1: number, x2: number } | null = null;
            let operacao: string;
            let numeros: number[] = [];

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
                case '7': {
                    const numero = parseFloat(readline.question('Digite o número: '));
                    resultado = dobro(numero);
                    operacao = 'Dobro';
                    numeros = [numero];
                    console.log(`Resultado: ${resultado}`);
                    break;
                }
                case '8': {
                    const numero = parseFloat(readline.question('Digite o número: '));
                    resultado = triplo(numero);
                    operacao = 'Triplo';
                    numeros = [numero];
                    console.log(`Resultado: ${resultado}`);
                    break;
                }
                case '9': {
                    const numero = parseFloat(readline.question('Digite o número: '));
                    resultado = quadruplo(numero);
                    operacao = 'Quádruplo';
                    numeros = [numero];
                    console.log(`Resultado: ${resultado}`);
                    break;
                }
                case '10': {
                    const numero = parseFloat(readline.question('Digite o número: '));
                    resultado = quintuplo(numero);
                    operacao = 'Quíntuplo';
                    numeros = [numero];
                    console.log(`Resultado: ${resultado}`);
                    break;
                }
                case '11': {
                    const numero = parseFloat(readline.question('Digite o número: '));
                    resultado = sextuplo(numero);
                    operacao = 'Sêxtuplo';
                    numeros = [numero];
                    console.log(`Resultado: ${resultado}`);
                    break;
                }
                case '12': {
                    const numero = parseFloat(readline.question('Digite o número: '));
                    resultado = quadrado(numero);
                    operacao = 'Quadrado';
                    numeros = [numero];
                    console.log(`Resultado: ${resultado}`);
                    break;
                }
                case '13': {
                    const numero = parseFloat(readline.question('Digite o número: '));
                    resultado = cubo(numero);
                    operacao = 'Cubo';
                    numeros = [numero];
                    console.log(`Resultado: ${resultado}`);
                    break;
                }
                case '14': {
                    const numero = parseFloat(readline.question('Digite o número: '));
                    resultado = quartaPotencia(numero);
                    operacao = 'Quarta Potência';
                    numeros = [numero];
                    console.log(`Resultado: ${resultado}`);
                    break;
                }
                case '15': {
                    const numero = parseFloat(readline.question('Digite o número: '));
                    resultado = quintaPotencia(numero);
                    operacao = 'Quinta Potência';
                    numeros = [numero];
                    console.log(`Resultado: ${resultado}`);
                    break;
                }
                case '16': {
                    const numero = parseFloat(readline.question('Digite o número: '));
                    resultado = sextaPotencia(numero);
                    operacao = 'Sexta Potência';
                    numeros = [numero];
                    console.log(`Resultado: ${resultado}`);
                    break;
                }
                case '17': {
                    console.log('Equação do segundo grau: ax² + bx + c = 0');
                    const a = parseFloat(readline.question('Digite o valor de a: '));
                    const b = parseFloat(readline.question('Digite o valor de b: '));
                    const c = parseFloat(readline.question('Digite o valor de c: '));
                    resultado = bhaskara(a, b, c);
                    operacao = 'Bhaskara';
                    numeros = [a, b, c];
                    if (resultado) {
                        console.log(`Resultado: x1 = ${resultado.x1}, x2 = ${resultado.x2}`);
                    }
                    break;
                }
                case '18': {
                    const n1 = parseFloat(readline.question('Digite o primeiro número: '));
                    const n2 = parseFloat(readline.question('Digite o segundo número: '));
                    const n3 = parseFloat(readline.question('Digite o terceiro número: '));
                    const n4 = parseFloat(readline.question('Digite o quarto número: '));
                    resultado = mediaAritmetica(n1, n2, n3, n4);
                    operacao = 'Média Aritmética';
                    numeros = [n1, n2, n3, n4];
                    console.log(`Resultado: ${resultado}`);
                    break;
                }
                case '19': {
                    const numero = parseFloat(readline.question('Digite o número: '));
                    resultado = verificarParImpar(numero);
                    operacao = 'Verificação Par/Ímpar';
                    numeros = [numero];
                    console.log(`Resultado: O número ${numero} é ${resultado}`);
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

        } catch (error) {
            if (error instanceof Error) {
                console.log(`Erro: ${error.message}`);
            } else {
                console.log('Ocorreu um erro desconhecido.');
            }
        }
    }
}

// Iniciar a aplicação
main();
