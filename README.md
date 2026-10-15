# Quiz de Geografia

Quiz de geografia que roda direto no navegador, feito com HTML, CSS e JavaScript puro. Tem 10 perguntas de múltipla escolha, e cada acerto vale 100 pontos.

## Como rodar

Não precisa instalar nada. Deixe os três arquivos na mesma pasta e abra o `index.html` no navegador (dois cliques no arquivo, ou clique direito e "Abrir com" o navegador).

No VS Code, também dá para usar a extensão **Live Server**: clique direito no `index.html` e escolha "Open with Live Server".

## Estrutura do projeto

```
quiz/
├── index.html    # estrutura da página (tela inicial, perguntas e resultado)
├── style.css     # aparência: cores, cartão, botões e responsividade
└── script.js     # lógica: perguntas, pontuação e troca de telas
```

## Como funciona

1. **Tela inicial:** botão "Começar".
2. **Perguntas:** uma por vez, com 4 alternativas (A, B, C, D). Ao clicar, a resposta certa fica verde e, se errar, a escolhida fica vermelha, com a resposta correta indicada.
3. **Tela final:** mostra a pontuação total e uma mensagem conforme o desempenho, com a opção de jogar novamente.

A barra no topo mostra o progresso, e a pontuação é atualizada a cada acerto.

## Como editar as perguntas

As perguntas ficam no começo do `script.js`, numa lista chamada `perguntas`:

```js
{
  texto: "Qual é a capital da França?",
  alternativas: ["Paris", "Londres", "Berlim", "Madrid"],
  correta: 0
}
```

- `texto`: o enunciado da pergunta.
- `alternativas`: as 4 opções, na ordem A, B, C, D.
- `correta`: o índice da resposta certa, começando em 0 (`0` = A, `1` = B, `2` = C, `3` = D).

Para adicionar uma pergunta, copie um bloco, cole no final da lista (com vírgula entre eles) e troque os textos. O quiz se ajusta sozinho ao número de perguntas e à pontuação máxima.

## Como mudar o visual

No começo do `style.css` há variáveis de cor dentro de `:root`:

```css
:root {
  --primaria: #2563eb;
  --certo: #16a34a;
  --errado: #dc2626;
}
```

Trocando esses valores, as cores mudam em toda a página. O visual também se adapta ao celular e ao modo escuro do sistema.

## Ideias para o futuro

- Perguntas em ordem aleatória
- Ranking de pontuações
- Tempo limite por pergunta
- Várias matérias e vários quizzes, com abas
