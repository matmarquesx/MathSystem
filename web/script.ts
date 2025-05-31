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

// Array para armazenar o histórico
const historico: RegistroHistorico[] = [];

// Elementos do DOM
const operacaoSelect = document.getElementById('operacao') as HTMLSelectElement;
const numero1Container = document.getElementById('numero1-container') as HTMLDivElement;
const numero2Container = document.getElementById('numero2-container') as HTMLDivElement;
const bhaskaraContainer = document.getElementById('bhaskara-container') as HTMLDivElement;
const mediaContainer = document.getElementById('media-container') as HTMLDivElement;

const numero1Input = document.getElementById('numero1') as HTMLInputElement;
const numero2Input = document.getElementById('numero2') as HTMLInputElement;
const coefAInput = document.getElementById('coef-a') as HTMLInputElement;
const coefBInput = document.getElementById('coef-b') as HTMLInputElement;
const coefCInput = document.getElementById('coef-c') as HTMLInputElement;
const num1Input = document.getElementById('num1') as HTMLInputElement;
const num2Input = document.getElementById('num2') as HTMLInputElement;
const num3Input = document.getElementById('num3') as HTMLInputElement;
const num4Input = document.getElementById('num4') as HTMLInputElement;

const calcularBtn = document.getElementById('calcular') as HTMLButtonElement;
const limparBtn = document.getElementById('limpar') as HTMLButtonElement;
const resultadoElement = document.getElementById('resultado') as HTMLParagraphElement;
const resultadoContainer = document.getElementById('resultado-container') as HTMLDivElement;
const historicoContainer = document.getElementById('historico-container') as HTMLDivElement;

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

// Função para atualizar a visibilidade dos campos de entrada
function atualizarVisibilidadeCampos(): void {
    const operacao = operacaoSelect.value;
    
    // Esconder todos os containers primeiro
    numero1Container.classList.remove('hidden');
    numero2Container.classList.remove('hidden');
    bhaskaraContainer.classList.add('hidden');
    mediaContainer.classList.add('hidden');
    
    // Mostrar os containers apropriados baseado na operação
    switch (operacao) {
        case 'soma':
        case 'subtracao':
        case 'multiplicacao':
        case 'divisao':
        case 'potencia':
            numero1Container.classList.remove('hidden');
            numero2Container.classList.remove('hidden');
            break;
            
        case 'raiz':
        case 'dobro':
        case 'triplo':
        case 'quadruplo':
        case 'quintuplo':
        case 'sextuplo':
        case 'quadrado':
        case 'cubo':
        case 'quarta_potencia':
        case 'quinta_potencia':
        case 'sexta_potencia':
        case 'par_impar':
            numero1Container.classList.remove('hidden');
            numero2Container.classList.add('hidden');
            break;
            
        case 'bhaskara':
            numero1Container.classList.add('hidden');
            numero2Container.classList.add('hidden');
            bhaskaraContainer.classList.remove('hidden');
            break;
            
        case 'media_aritmetica':
            numero1Container.classList.add('hidden');
            numero2Container.classList.add('hidden');
            mediaContainer.classList.remove('hidden');
            break;
    }
}

// Função para calcular o resultado
function calcular(): void {
    try {
        const operacao = operacaoSelect.value as Operacao;
        let resultado: number | string | { x1: number, x2: number } | null = null;
        let numeros: number[] = [];
        let operacaoTexto: string;
        
        switch (operacao) {
            case 'soma': {
                const a = parseFloat(numero1Input.value);
                const b = parseFloat(numero2Input.value);
                
                if (isNaN(a) || isNaN(b)) {
                    throw new Error('Por favor, digite números válidos.');
                }
                
                resultado = soma(a, b);
                operacaoTexto = 'Soma';
                numeros = [a, b];
                break;
            }
            case 'subtracao': {
                const a = parseFloat(numero1Input.value);
                const b = parseFloat(numero2Input.value);
                
                if (isNaN(a) || isNaN(b)) {
                    throw new Error('Por favor, digite números válidos.');
                }
                
                resultado = subtracao(a, b);
                operacaoTexto = 'Subtração';
                numeros = [a, b];
                break;
            }
            case 'multiplicacao': {
                const a = parseFloat(numero1Input.value);
                const b = parseFloat(numero2Input.value);
                
                if (isNaN(a) || isNaN(b)) {
                    throw new Error('Por favor, digite números válidos.');
                }
                
                resultado = multiplicacao(a, b);
                operacaoTexto = 'Multiplicação';
                numeros = [a, b];
                break;
            }
            case 'divisao': {
                const a = parseFloat(numero1Input.value);
                const b = parseFloat(numero2Input.value);
                
                if (isNaN(a) || isNaN(b)) {
                    throw new Error('Por favor, digite números válidos.');
                }
                
                resultado = divisao(a, b);
                operacaoTexto = 'Divisão';
                numeros = [a, b];
                break;
            }
            case 'potencia': {
                const base = parseFloat(numero1Input.value);
                const expoente = parseFloat(numero2Input.value);
                
                if (isNaN(base) || isNaN(expoente)) {
                    throw new Error('Por favor, digite números válidos.');
                }
                
                resultado = potencia(base, expoente);
                operacaoTexto = 'Potência';
                numeros = [base, expoente];
                break;
            }
            case 'raiz': {
                const numero = parseFloat(numero1Input.value);
                
                if (isNaN(numero)) {
                    throw new Error('Por favor, digite um número válido.');
                }
                
                resultado = raizQuadrada(numero);
                operacaoTexto = 'Raiz Quadrada';
                numeros = [numero];
                break;
            }
            case 'dobro': {
                const numero = parseFloat(numero1Input.value);
                
                if (isNaN(numero)) {
                    throw new Error('Por favor, digite um número válido.');
                }
                
                resultado = dobro(numero);
                operacaoTexto = 'Dobro';
                numeros = [numero];
                break;
            }
            case 'triplo': {
                const numero = parseFloat(numero1Input.value);
                
                if (isNaN(numero)) {
                    throw new Error('Por favor, digite um número válido.');
                }
                
                resultado = triplo(numero);
                operacaoTexto = 'Triplo';
                numeros = [numero];
                break;
            }
            case 'quadruplo': {
                const numero = parseFloat(numero1Input.value);
                
                if (isNaN(numero)) {
                    throw new Error('Por favor, digite um número válido.');
                }
                
                resultado = quadruplo(numero);
                operacaoTexto = 'Quádruplo';
                numeros = [numero];
                break;
            }
            case 'quintuplo': {
                const numero = parseFloat(numero1Input.value);
                
                if (isNaN(numero)) {
                    throw new Error('Por favor, digite um número válido.');
                }
                
                resultado = quintuplo(numero);
                operacaoTexto = 'Quíntuplo';
                numeros = [numero];
                break;
            }
            case 'sextuplo': {
                const numero = parseFloat(numero1Input.value);
                
                if (isNaN(numero)) {
                    throw new Error('Por favor, digite um número válido.');
                }
                
                resultado = sextuplo(numero);
                operacaoTexto = 'Sêxtuplo';
                numeros = [numero];
                break;
            }
            case 'quadrado': {
                const numero = parseFloat(numero1Input.value);
                
                if (isNaN(numero)) {
                    throw new Error('Por favor, digite um número válido.');
                }
                
                resultado = quadrado(numero);
                operacaoTexto = 'Quadrado';
                numeros = [numero];
                break;
            }
            case 'cubo': {
                const numero = parseFloat(numero1Input.value);
                
                if (isNaN(numero)) {
                    throw new Error('Por favor, digite um número válido.');
                }
                
                resultado = cubo(numero);
                operacaoTexto = 'Cubo';
                numeros = [numero];
                break;
            }
            case 'quarta_potencia': {
                const numero = parseFloat(numero1Input.value);
                
                if (isNaN(numero)) {
                    throw new Error('Por favor, digite um número válido.');
                }
                
                resultado = quartaPotencia(numero);
                operacaoTexto = 'Quarta Potência';
                numeros = [numero];
                break;
            }
            case 'quinta_potencia': {
                const numero = parseFloat(numero1Input.value);
                
                if (isNaN(numero)) {
                    throw new Error('Por favor, digite um número válido.');
                }
                
                resultado = quintaPotencia(numero);
                operacaoTexto = 'Quinta Potência';
                numeros = [numero];
                break;
            }
            case 'sexta_potencia': {
                const numero = parseFloat(numero1Input.value);
                
                if (isNaN(numero)) {
                    throw new Error('Por favor, digite um número válido.');
                }
                
                resultado = sextaPotencia(numero);
                operacaoTexto = 'Sexta Potência';
                numeros = [numero];
                break;
            }
            case 'bhaskara': {
                const a = parseFloat(coefAInput.value);
                const b = parseFloat(coefBInput.value);
                const c = parseFloat(coefCInput.value);
                
                if (isNaN(a) || isNaN(b) || isNaN(c)) {
                    throw new Error('Por favor, digite coeficientes válidos.');
                }
                
                resultado = bhaskara(a, b, c);
                operacaoTexto = 'Bhaskara';
                numeros = [a, b, c];
                break;
            }
            case 'media_aritmetica': {
                const n1 = parseFloat(num1Input.value);
                const n2 = parseFloat(num2Input.value);
                const n3 = parseFloat(num3Input.value);
                const n4 = parseFloat(num4Input.value);
                
                if (isNaN(n1) || isNaN(n2) || isNaN(n3) || isNaN(n4)) {
                    throw new Error('Por favor, digite quatro números válidos.');
                }
                
                resultado = mediaAritmetica(n1, n2, n3, n4);
                operacaoTexto = 'Média Aritmética';
                numeros = [n1, n2, n3, n4];
                break;
            }
            case 'par_impar': {
                const numero = parseFloat(numero1Input.value);
                
                if (isNaN(numero)) {
                    throw new Error('Por favor, digite um número válido.');
                }
                
                resultado = verificarParImpar(numero);
                operacaoTexto = 'Verificação Par/Ímpar';
                numeros = [numero];
                break;
            }
            default:
                throw new Error('Operação inválida!');
        }
        
        // Exibir o resultado
        if (resultado === null) {
            resultadoElement.textContent = 'Sem solução real';
        } else if (typeof resultado === 'object' && 'x1' in resultado) {
            resultadoContainer.innerHTML = `
                <div class="bhaskara-result">
                    <p>x₁ = ${resultado.x1.toFixed(2)}</p>
                    <p>x₂ = ${resultado.x2.toFixed(2)}</p>
                </div>
            `;
        } else {
            resultadoElement.textContent = resultado.toString();
        }
        
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
    coefAInput.value = '';
    coefBInput.value = '';
    coefCInput.value = '';
    num1Input.value = '';
    num2Input.value = '';
    num3Input.value = '';
    num4Input.value = '';
    resultadoElement.textContent = '-';
    resultadoContainer.innerHTML = '<p id="resultado">-</p>';
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
        
        // Formatar a descrição da operação
        let operacaoDescricao = '';
        switch (registro.operacao) {
            case 'Raiz Quadrada':
            case 'Dobro':
            case 'Triplo':
            case 'Quádruplo':
            case 'Quíntuplo':
            case 'Sêxtuplo':
            case 'Quadrado':
            case 'Cubo':
            case 'Quarta Potência':
            case 'Quinta Potência':
            case 'Sexta Potência':
                operacaoDescricao = `${registro.operacao} de ${registro.numeros[0]}`;
                break;
            case 'Verificação Par/Ímpar':
                operacaoDescricao = `${registro.operacao}: ${registro.numeros[0]}`;
                break;
            case 'Bhaskara':
                operacaoDescricao = `${registro.operacao}: ${registro.numeros[0]}x² + ${registro.numeros[1]}x + ${registro.numeros[2]} = 0`;
                break;
            case 'Média Aritmética':
                operacaoDescricao = `${registro.operacao}: ${registro.numeros.join(', ')}`;
                break;
            default:
                operacaoDescricao = `${registro.operacao}: ${registro.numeros.join(' e ')}`;
        }
        
        operacaoElement.textContent = operacaoDescricao;
        
        const resultadoItemElement = document.createElement('div');
        resultadoItemElement.className = 'result';
        
        // Formatar a exibição do resultado
        let resultadoTexto = '';
        if (registro.resultado === null) {
            resultadoTexto = 'Sem solução real';
        } else if (typeof registro.resultado === 'object' && 'x1' in registro.resultado) {
            resultadoTexto = `x₁ = ${registro.resultado.x1.toFixed(2)}, x₂ = ${registro.resultado.x2.toFixed(2)}`;
        } else {
            resultadoTexto = `Resultado: ${registro.resultado}`;
        }
        
        resultadoItemElement.textContent = resultadoTexto;
        
        historicoItem.appendChild(dataElement);
        historicoItem.appendChild(operacaoElement);
        historicoItem.appendChild(resultadoItemElement);
        
        historicoContainer.appendChild(historicoItem);
    }
}

// Event Listeners
operacaoSelect.addEventListener('change', atualizarVisibilidadeCampos);
calcularBtn.addEventListener('click', calcular);
limparBtn.addEventListener('click', limpar);

// Inicialização
atualizarVisibilidadeCampos();
atualizarHistorico();
