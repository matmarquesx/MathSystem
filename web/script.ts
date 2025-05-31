// Definição dos tipos
type Operacao = 'soma' | 'subtracao' | 'multiplicacao' | 'divisao' | 'potencia' | 'raiz';

// Interface para o histórico
interface RegistroHistorico {
    data: Date;
    operacao: string;
    numeros: number[];
    resultado: number;
}

// Array para armazenar o histórico
const historico: RegistroHistorico[] = [];

// Elementos do DOM
const operacaoSelect = document.getElementById('operacao') as HTMLSelectElement;
const numero1Input = document.getElementById('numero1') as HTMLInputElement;
const numero2Input = document.getElementById('numero2') as HTMLInputElement;
const calcularBtn = document.getElementById('calcular') as HTMLButtonElement;
const limparBtn = document.getElementById('limpar') as HTMLButtonElement;
const resultadoElement = document.getElementById('resultado') as HTMLParagraphElement;
const historicoContainer = document.getElementById('historico-container') as HTMLDivElement;
const segundoNumeroContainer = document.querySelector('.second-number-container') as HTMLDivElement;

// Funções de cálculo
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

// Função para formatar a data
function formatarData(data: Date): string {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    const hora = data.getHours().toString().padStart(2, '0');
    const minuto = data.getMinutes().toString().padStart(2, '0');
    const segundo = data.getSeconds().toString().padStart(2, '0');
    
    return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
}

// Função para atualizar a visibilidade do segundo número
function atualizarVisibilidadeSegundoNumero(): void {
    const operacao = operacaoSelect.value;
    
    if (operacao === 'raiz') {
        segundoNumeroContainer.style.display = 'none';
    } else {
        segundoNumeroContainer.style.display = 'block';
    }
}

// Função para calcular o resultado
function calcular(): void {
    try {
        const operacao = operacaoSelect.value as Operacao;
        const numero1 = parseFloat(numero1Input.value);
        
        if (isNaN(numero1)) {
            throw new Error('Por favor, digite um número válido no primeiro campo.');
        }
        
        let resultado: number;
        let numeros: number[] = [numero1];
        let operacaoTexto: string;
        
        switch (operacao) {
            case 'soma': {
                const numero2 = parseFloat(numero2Input.value);
                if (isNaN(numero2)) {
                    throw new Error('Por favor, digite um número válido no segundo campo.');
                }
                resultado = soma(numero1, numero2);
                numeros.push(numero2);
                operacaoTexto = 'Soma';
                break;
            }
            case 'subtracao': {
                const numero2 = parseFloat(numero2Input.value);
                if (isNaN(numero2)) {
                    throw new Error('Por favor, digite um número válido no segundo campo.');
                }
                resultado = subtracao(numero1, numero2);
                numeros.push(numero2);
                operacaoTexto = 'Subtração';
                break;
            }
            case 'multiplicacao': {
                const numero2 = parseFloat(numero2Input.value);
                if (isNaN(numero2)) {
                    throw new Error('Por favor, digite um número válido no segundo campo.');
                }
                resultado = multiplicacao(numero1, numero2);
                numeros.push(numero2);
                operacaoTexto = 'Multiplicação';
                break;
            }
            case 'divisao': {
                const numero2 = parseFloat(numero2Input.value);
                if (isNaN(numero2)) {
                    throw new Error('Por favor, digite um número válido no segundo campo.');
                }
                resultado = divisao(numero1, numero2);
                numeros.push(numero2);
                operacaoTexto = 'Divisão';
                break;
            }
            case 'potencia': {
                const numero2 = parseFloat(numero2Input.value);
                if (isNaN(numero2)) {
                    throw new Error('Por favor, digite um número válido no segundo campo.');
                }
                resultado = potencia(numero1, numero2);
                numeros.push(numero2);
                operacaoTexto = 'Potência';
                break;
            }
            case 'raiz': {
                resultado = raizQuadrada(numero1);
                operacaoTexto = 'Raiz Quadrada';
                break;
            }
            default:
                throw new Error('Operação inválida!');
        }
        
        // Exibir o resultado
        resultadoElement.textContent = resultado.toString();
        
        // Registrar no histórico
        const registro: RegistroHistorico = {
            data: new Date(),
            operacao: operacaoTexto,
            numeros,
            resultado
        };
        
        historico.push(registro);
        
        // Atualizar a exibição do histórico
        atualizarHistorico();
        
    } catch (error) {
        if (error instanceof Error) {
            alert(`Erro: ${error.message}`);
        } else {
            alert('Ocorreu um erro desconhecido.');
        }
    }
}

// Função para limpar os campos
function limpar(): void {
    numero1Input.value = '';
    numero2Input.value = '';
    resultadoElement.textContent = '-';
}

// Função para atualizar a exibição do histórico
function atualizarHistorico(): void {
    historicoContainer.innerHTML = '';
    
    if (historico.length === 0) {
        historicoContainer.innerHTML = '<p>Nenhuma operação realizada ainda.</p>';
        return;
    }
    
    // Exibir do mais recente para o mais antigo
    for (let i = historico.length - 1; i >= 0; i--) {
        const registro = historico[i];
        const historicoItem = document.createElement('div');
        historicoItem.className = 'history-item';
        
        const dataElement = document.createElement('div');
        dataElement.className = 'date';
        dataElement.textContent = formatarData(registro.data);
        
        const operacaoElement = document.createElement('div');
        operacaoElement.className = 'operation';
        
        if (registro.operacao === 'Raiz Quadrada') {
            operacaoElement.textContent = `${registro.operacao} de ${registro.numeros[0]}`;
        } else {
            operacaoElement.textContent = `${registro.operacao}: ${registro.numeros.join(' e ')}`;
        }
        
        const resultadoItemElement = document.createElement('div');
        resultadoItemElement.className = 'result';
        resultadoItemElement.textContent = `Resultado: ${registro.resultado}`;
        
        historicoItem.appendChild(dataElement);
        historicoItem.appendChild(operacaoElement);
        historicoItem.appendChild(resultadoItemElement);
        
        historicoContainer.appendChild(historicoItem);
    }
}

// Event Listeners
operacaoSelect.addEventListener('change', atualizarVisibilidadeSegundoNumero);
calcularBtn.addEventListener('click', calcular);
limparBtn.addEventListener('click', limpar);

// Inicialização
atualizarVisibilidadeSegundoNumero();
atualizarHistorico();
