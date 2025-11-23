# 🤖 Lógica IA Web

Lógica IA Web é um Agente de IA para Web capaz de traduzir sentenças em Linguagem Natural (Português) para fórmulas no Cálculo Proposicional Clássico (CPC), e vice-versa. O projeto visa promover a compreensão dos fundamentos da lógica formal e suas aplicações em IA de forma interativa e moderna.

#

> O Lógica IA Web é uma ferramenta educacional e de experimentação projetada para preencher a lacuna entre a linguagem humana e a lógica formal. Utilizando o poder das LLMs orquestradas pelo Genkit, este agente inteligente oferece dois modos principais de operação:

- Modo 1: NL → CPC
  O agente recebe frases simples em português (ex: "Se chover, então a grama ficará molhada.") e as converte para a fórmula correspondente em lógica proposicional (ex: P → Q, com um léxico definido).

- Modo 2: CPC → NL
  O agente recebe uma fórmula lógica (ex: (P ∧ Q) → R) e a traduz para uma frase coerente em português (ex: "Se chover e fizer frio, então a aula será cancelada.").

O objetivo é criar uma aplicação web interativa que não apenas realiza a tradução, mas também auxilia o usuário a definir e entender as proposições envolvidas.

## Principais Funcionalidades

- NL para CPC: Traduz sentenças em português para fórmulas em Lógica Proposicional Clássica.

- CPC para NL: Traduz fórmulas em Lógica Proposicional Clássica para sentenças em português.

- Definição de Proposições: Permite que o usuário defina os significados das proposições (P, Q, R) ou use sugestões do sistema.

- Sugestão de Proposições: A LLM usa sua capacidade de raciocínio para gerar sugestões de significados para as proposições, auxiliando o usuário na criação das sentenças e fórmulas.

- Suporte a Conectivos: Suporta os conectivos lógicos fundamentais:

- ∧ (e / conjunção)

- ∨ (ou / disjunção)

- ¬ (não / negação)

- → (implica / condicional)

- ↔ (se e somente se / bicondicional)

- Suporte a Frases Compostas: Processa frases lógicas complexas e com negação, garantindo a correta conversão e tradução.
- Interface Web Interativa: Uma interface de usuário moderna e responsiva construída com Next.js (App Router), Tailwind CSS e shadcn/ui.

## Stack

Este projeto utiliza um conjunto de tecnologias modernas para criar uma experiência fluida e inteligente:

- TypeScript

- Next.js (App Router)

- Tailwind CSS

- shadcn/ui

- Framer Motion

- Genkit (para orquestrar e gerenciar os fluxos de IA)

## Começando

Siga estas instruções para obter uma cópia local do projeto em funcionamento para desenvolvimento e testes.

### Pré-requisitos

Você precisará ter o Node.js (v18 ou superior) e o npm, yarn ou pnpm instalados em sua máquina.

### Instalação

1. Clone o repositório:

```bash
git clone [https://github.com/igordmouraa/logical-translator](https://github.com/igordmouraa/logical-translator)
cd logica-ia-web
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente: Crie um arquivo .env.local na raiz do projeto e adicione suas chaves de API para o Genkit (ex: Google AI Studio).

```
# Chave da API da LLM 
GOOGLE_API_KEY=SUA_GOOGLE_API_KEY
```

4. Rode o servidor de desenvolvimento:

```bash
npm run dev
```

Abra http://localhost:9002 no seu navegador para ver a aplicação em funcionamento.

## Uso

Após iniciar a aplicação, você poderá interagir com o agente:

1. Escolha o Modo: Selecione "Linguagem Natural para CPC" ou "CPC para Linguagem Natural".

2. Defina seu Léxico: Na área de proposições, defina o que cada variável (P, Q, R...) significa.

- Ex: P = "O servidor está online"

- Ex: Q = "O usuário está autenticado"

3. Insira a Sentença/Fórmula:

- No modo NL → CPC, digite uma frase como: "O servidor está online e o usuário está autenticado".

- No modo CPC → NL, digite uma fórmula como: P ∧ Q.

4. Traduza: Clique em "Traduzir" para que o Genkit processe a entrada e retorne o resultado correspondente.


## Autor

Este projeto foi desenvolvido por:

Igor de Moura
