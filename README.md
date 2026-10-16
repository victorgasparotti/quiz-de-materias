# Quiz de Matérias

Quiz de múltipla escolha com 6 matérias: Geografia, Português, Matemática, História, Biologia e Química. O projeto tem duas versões que usam as mesmas perguntas:

- **Versão web** (HTML, CSS e JavaScript puro), que funciona em computador, tablet e celular.
- **Versão no terminal** (Python).

A cada rodada são sorteadas 10 perguntas da matéria escolhida, com 4 alternativas (A, B, C, D). Cada acerto vale 100 pontos.

## Estrutura do projeto

```
quiz-geografia/
├── index.html          # página do quiz (versão web)
├── styles/
│   └── style.css       # visual, cores e responsividade
├── js/
│   └── script.js       # lógica do quiz na versão web
├── materias/           # perguntas de cada matéria (arquivos .csv)
│   ├── geografia.csv
│   ├── portugues.csv
│   ├── matematica.csv
│   ├── historia.csv
│   ├── biologia.csv
│   └── quimica.csv
├── main.py             # versão terminal: menu e escolha da matéria
├── carregador.py       # lê os arquivos .csv
└── jogo.py             # regras do jogo e pontuação
```

## Como rodar a versão web

O JavaScript lê os arquivos `.csv` da pasta `materias/`. Por isso **não abra o `index.html` com dois cliques**: o navegador bloqueia a leitura dos arquivos nesse modo. Use um servidor local, de uma destas formas:

**Opção 1: Live Server (VS Code)**

Clique com o botão direito no `index.html` e escolha "Open with Live Server".

**Opção 2: servidor do Python**

Na pasta do projeto, rode:

```bash
python -m http.server
```

Depois acesse `http://localhost:8000` no navegador.

### Testando no celular

Com o servidor do Python rodando no computador, abra no celular (conectado na mesma rede Wi-Fi) o endereço `http://IP-DO-SEU-COMPUTADOR:8000`.

## Como rodar a versão no terminal

É preciso ter o Python 3 instalado. Não há nada para instalar além disso. Na pasta do projeto, rode:

```bash
python main.py
```

Siga o menu: confirme que quer começar, escolha a matéria e responda digitando a letra da alternativa.

## Como funciona

1. **Escolha da matéria:** o quiz mostra as 6 matérias disponíveis.
2. **Perguntas:** são sorteadas 10 perguntas, mostradas uma de cada vez. Na versão web, a alternativa certa fica verde e a errada fica vermelha, e as teclas `A` a `D` (ou `1` a `4`) também respondem.
3. **Resultado:** mostra a pontuação total e uma mensagem conforme o desempenho:

| Desempenho | Mensagem |
| --- | --- |
| 100% | Perfeito, você acertou tudo! |
| 80% ou mais | Muito bom! |
| 60% ou mais | Parabéns! |
| 40% ou mais | Dá para melhorar, tente de novo! |
| Menos de 40% | Estude mais um pouco e volte! |

Na versão web, o resultado também mostra um gabarito com uma bolinha por pergunta (verde se acertou, vermelha se errou).

## Como editar as perguntas

As perguntas ficam nos arquivos `.csv` da pasta `materias/`. Os dois lados (web e Python) leem os mesmos arquivos, então basta editar em um lugar.

O arquivo usa **ponto e vírgula** (`;`) como separador, codificação **UTF-8**, e a primeira linha é o cabeçalho:

```
pergunta;A;B;C;D;correta
Qual é a capital da França?;Paris;Londres;Berlim;Madrid;A
```

- `pergunta`: o enunciado.
- `A`, `B`, `C`, `D`: as quatro alternativas.
- `correta`: a **letra** da resposta certa (`A`, `B`, `C` ou `D`).

Para adicionar uma pergunta, acrescente uma linha no final do arquivo da matéria.

## Como adicionar uma matéria nova

1. Crie o arquivo na pasta `materias/` (por exemplo, `ingles.csv`) seguindo o formato acima.
2. **Versão web:** no começo do `js/script.js`, acrescente uma linha na lista `MATERIAS`:

   ```js
   { nome: "Inglês", arquivo: "materias/ingles.csv" },
   ```

3. **Versão terminal:** em `main.py`, acrescente a matéria no dicionário `materias` e uma linha no menu de escolha.

## Como mudar o visual

No começo do `styles/style.css` há variáveis de cor dentro de `:root`. Trocando esses valores, as cores mudam em toda a página:

```css
:root {
  --primaria: #243b9c;
  --certo: #1c8a58;
  --errado: #c7372f;
}
```

A página se adapta ao tamanho da tela (celular, tablet e computador) e ao modo escuro do sistema.

## Ideias para o futuro

- Tempo limite por pergunta
- Ranking de pontuações
- Escolher quantas perguntas por rodada
- Mostrar a resposta certa de todas as perguntas no final

## Tecnologias

- HTML, CSS e JavaScript (sem bibliotecas)
- Python 3 (bibliotecas padrão `csv` e `random`)
