# Desafio Técnico - Abrigo de Animais

_Solução para o desafio técnico de lógica de programação para o processo seletivo da DB de 2025._

Este projeto contém um algoritmo em JavaScript que determina a alocação de animais de um abrigo para duas pessoas candidatas, com base em um conjunto de regras predefinidas.

---

## 🚀 O Desafio

O objetivo era criar uma função que recebe os brinquedos de duas pessoas e uma lista de animais a serem considerados. A função deve processar uma série de regras de adoção para decidir se um animal vai para a Pessoa 1, Pessoa 2 ou se permanece no abrigo.

### 📜 Regras de Adoção Implementadas

O algoritmo implementado segue as seguintes regras de negócio:

-   **Ordem dos Brinquedos:** Um animal só é adotado se a pessoa apresentar todos os seus brinquedos favoritos na ordem correta (outros brinquedos podem estar intercalados).
-   **Regra dos Gatos:** Gatos são exigentes e não "dividem" brinquedos. A solução interpreta que a pessoa deve ter *exatamente* a lista de brinquedos do gato, na ordem correta.
-   **Empates:** Se ambas as pessoas forem aptas a adotar o mesmo animal, ele permanece no abrigo para evitar conflitos.
-   **Limite de Adoção:** Uma pessoa não pode adotar mais de três animais.
-   **Regra do Loco:** O jabuti Loco não se importa com a ordem de seus brinquedos, desde que haja outro animal sendo considerado para adoção no mesmo processo.
-   **Validação:** O sistema valida as entradas para garantir que não há animais ou brinquedos duplicados ou inválidos.

---

## 🛠️ Tecnologias Utilizadas

-   **JavaScript:** Linguagem principal da solução.
-   **Node.js:** Ambiente de execução para o JavaScript.
-   **Jest:** Framework utilizado para os testes unitários e validação da lógica.

---

## ⚙️ Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto em sua máquina local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) 
-   [Git](https://git-scm.com/)

### Instalação

1.  Clone o repositório:
    ```bash
     git clone [https://github.com/DarcMary/desafio-DarcMary-2025.git](https://github.com/DarcMary/desafio-DarcMary-2025.git)
     ```

2.  Navegue até o diretório do projeto:
    ```bash
    cd desafio-DarcMary-20afio-DarcMary-2025
    ```

3.  Instale as dependências:
    ```bash
    npm install
    ```

---

## 🚀 Como Usar a Solução

A lógica principal está encapsulada na classe `AbrigoAnimais`. Para obter um resultado, você pode instanciar a classe e chamar o método `encontraPessoas`, como no exemplo abaixo:

```javascript
import { AbrigoAnimais } from './src/abrigo-animais.js';

const abrigo = new AbrigoAnimais();

// Exemplo de chamada
const brinquedosPessoa1 = 'RATO,BOLA';
const brinquedosPessoa2 = 'RATO,NOVELO';
const animaisConsiderados = 'Rexcão,Fofogato';

const resultado = abrigo.encontraPessoas(
  brinquedosPessoa1,
  brinquedosPessoa2,
  animaisConsiderados
);

console.log(resultado);
// Saída esperada: { lista: ['Fofogato - abrigo', 'Rexcão - pessoa 1'] }
```

---

## 🧪 Como Rodar os Testes

Para garantir que a solução está funcionando corretamente e cobrindo todos os cenários, você pode executar a suíte de testes automatizados.

Execute o seguinte comando na raiz do projeto:

```bash
npm test
```

Os testes irão validar as regras de negócio, os casos de erro e os exemplos fornecidos no desafio.

---

## 👤 Autor

Desenvolvido por **Darc Mary**.
