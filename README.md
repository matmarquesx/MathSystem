# MathSystem

# 🧮 Calculadora TypeScript

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)

Uma calculadora matemática completa implementada em TypeScript, disponível tanto em versão de linha de comando (CLI) quanto em interface web interativa. Este projeto demonstra a aplicação de conceitos de TypeScript, manipulação do DOM e boas práticas de desenvolvimento.

<img src="https://i.imgur.com/1JK9SIp.png" alt="Calculadora Preview" width="650">

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Demonstração](#-demonstração)
- [Aprendizados](#-aprendizados)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## ✨ Funcionalidades

### Operações Matemáticas
- ➕ Soma
- ➖ Subtração
- ✖️ Multiplicação
- ➗ Divisão
- 🔢 Potência (ex: 2³)
- √ Raiz Quadrada

### Recursos Adicionais
- 📝 Histórico completo de operações
- 🕒 Registro de data e hora das operações
- 🔄 Interface responsiva para dispositivos móveis e desktop
- 🛡️ Tratamento de erros (divisão por zero, raiz de número negativo)
- 🎨 Design moderno e intuitivo

## 🛠️ Tecnologias Utilizadas

- **TypeScript**: Tipagem estática para JavaScript
- **Node.js**: Ambiente de execução JavaScript
- **readline-sync**: Biblioteca para entrada de dados no terminal
- **HTML5/CSS3**: Estrutura e estilização da interface web
- **DOM API**: Manipulação dinâmica da interface

## 📁 Estrutura do Projeto

```
MathSystem/
├── src/
│   ├── index.ts       # Código fonte da calculadora CLI com histórico
│   └── index.js       # Código compilado JavaScript
├── web/
│   ├── index.html     # Interface HTML da calculadora web
│   ├── script.ts      # Código TypeScript para a versão web
│   ├── script.js      # Código compilado JavaScript para web
│   └── tsconfig.json  # Configuração TypeScript para web
├── package.json       # Configuração do projeto Node.js
└── tsconfig.json      # Configuração TypeScript principal
```

## 📥 Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/MathSystem.git
   cd MathSystem
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Compile o TypeScript:
   ```bash
   npx tsc
   ```

## 🚀 Como Usar

### Versão CLI

1. Execute a aplicação no terminal:
   ```bash
   node src/index.js
   ```

2. Siga as instruções no terminal:
   - Escolha uma operação (1-6)
   - Insira os números solicitados
   - Visualize o resultado
   - Acesse o histórico de operações (opção 7)

### Versão Web

1. Abra o arquivo `web/index.html` em qualquer navegador moderno

2. Use a interface para:
   - Selecionar a operação desejada no menu dropdown
   - Inserir os números nos campos apropriados
   - Clicar em "Calcular" para obter o resultado
   - Visualizar o histórico de operações na seção direita

### Versão CLI
```
=== Calculadora TypeScript com Histórico ===

Escolha uma operação:
1 - Soma
2 - Subtração
3 - Multiplicação
4 - Divisão
5 - Potência
6 - Raiz Quadrada
7 - Exibir Histórico
0 - Sair

Digite sua opção: 1
Digite o primeiro número: 10
Digite o segundo número: 5
Resultado: 15
```

### Versão Web
A interface web apresenta um design moderno com:
- Seletor de operações
- Campos de entrada para números
- Área de resultado destacada
- Histórico de operações em tempo real

## 📚 Aprendizados

Este projeto demonstra vários conceitos importantes:

- **Tipagem em TypeScript**: Uso de interfaces e tipos para garantir segurança de tipos
- **Adaptação entre ambientes**: Mesma lógica implementada em CLI e web
- **Manipulação do DOM**: Interação dinâmica com elementos HTML
- **Tratamento de erros**: Validação de entradas e operações inválidas
- **Design responsivo**: Interface adaptável a diferentes tamanhos de tela

---

Desenvolvido como parte do curso de Análise e Desenvolvimento de Sistemas.

⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!
