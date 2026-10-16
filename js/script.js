// =========================================================
// Quiz de matérias
// Lê os mesmos arquivos .csv da pasta "materias/" que o Python usa
// (colunas: pergunta;A;B;C;D;correta  -  separador ponto e vírgula).
// =========================================================

// ---------- configurações ----------
const PERGUNTAS_POR_RODADA = 10;
const PONTOS_POR_ACERTO = 100;
const LETRAS = ["A", "B", "C", "D"];

// Para adicionar uma matéria nova: crie o .csv e coloque uma linha aqui.
const MATERIAS = [
  { nome: "Geografia",  arquivo: "materias/geografia.csv" },
  { nome: "Português",  arquivo: "materias/portugues.csv" },
  { nome: "Matemática", arquivo: "materias/matematica.csv" },
  { nome: "História",   arquivo: "materias/historia.csv" },
  { nome: "Biologia",   arquivo: "materias/biologia.csv" },
  { nome: "Química",    arquivo: "materias/quimica.csv" },
];

// ---------- elementos da página ----------
const telaInicio = document.getElementById("tela-inicio");
const telaQuiz = document.getElementById("tela-quiz");
const telaResultado = document.getElementById("tela-resultado");

const listaMaterias = document.getElementById("lista-materias");
const erroCarregar = document.getElementById("erro-carregar");

const pontosEl = document.getElementById("pontos");
const barraEl = document.getElementById("barra");
const barraWrap = document.querySelector(".progresso");
const contadorEl = document.getElementById("contador");
const enunciadoEl = document.getElementById("enunciado");
const alternativasEl = document.getElementById("alternativas");
const feedbackEl = document.getElementById("feedback");
const btnProxima = document.getElementById("btn-proxima");
const btnSair = document.getElementById("btn-sair");

const resultadoMateria = document.getElementById("resultado-materia");
const resultadoPontos = document.getElementById("resultado-pontos");
const resultadoTotal = document.getElementById("resultado-total");
const resultadoMensagem = document.getElementById("resultado-mensagem");
const gabaritoEl = document.getElementById("gabarito");
const btnRepetir = document.getElementById("btn-repetir");
const btnOutra = document.getElementById("btn-outra");

// ---------- estado do jogo ----------
let materiaAtual = null;   // matéria escolhida
let perguntas = [];        // perguntas sorteadas da rodada
let indice = 0;            // pergunta atual
let pontos = 0;
let respondida = false;    // já clicou numa alternativa?
let resultados = [];       // true/false de cada pergunta (para o gabarito)

// =========================================================
// Leitura do CSV
// =========================================================

// Transforma o texto do CSV em uma lista de linhas, cada uma uma lista de colunas.
// Aceita campos entre aspas e quebras de linha do Windows (\r\n).
function lerCSV(texto, separador = ";") {
  const linhas = [];
  let linha = [];
  let campo = "";
  let dentroDeAspas = false;

  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];

    if (dentroDeAspas) {
      if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++; }
      else if (c === '"') { dentroDeAspas = false; }
      else { campo += c; }
    } else if (c === '"') {
      dentroDeAspas = true;
    } else if (c === separador) {
      linha.push(campo); campo = "";
    } else if (c === "\n") {
      linha.push(campo); linhas.push(linha);
      linha = []; campo = "";
    } else if (c !== "\r") {
      campo += c;
    }
  }
  // última linha (se o arquivo não terminar com quebra de linha)
  if (campo !== "" || linha.length > 0) { linha.push(campo); linhas.push(linha); }

  return linhas;
}

// Busca o arquivo e devolve uma lista de objetos:
// { texto, alternativas: [A, B, C, D], correta: 0..3 }
async function carregarPerguntas(caminho) {
  const resposta = await fetch(caminho);
  if (!resposta.ok) throw new Error("Não foi possível abrir " + caminho);

  const texto = (await resposta.text()).replace(/^\uFEFF/, ""); // tira o BOM, se tiver
  const linhas = lerCSV(texto).filter(l => l.some(col => col.trim() !== ""));

  const cabecalho = linhas[0].map(h => h.trim());
  const col = nome => cabecalho.indexOf(nome);

  const lista = [];
  for (const l of linhas.slice(1)) {
    const letra = (l[col("correta")] || "").trim().toUpperCase();
    const certa = LETRAS.indexOf(letra);
    if (certa === -1) continue; // ignora linha com resposta inválida

    lista.push({
      texto: (l[col("pergunta")] || "").trim(),
      alternativas: LETRAS.map(L => (l[col(L)] || "").trim()),
      correta: certa,
    });
  }
  return lista;
}

// =========================================================
// Sorteio (mesma ideia do random.sample do Python)
// =========================================================
function sortear(lista, quantidade) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia.slice(0, Math.min(quantidade, copia.length));
}

// =========================================================
// Troca de telas
// =========================================================
function mostrarTela(tela) {
  for (const t of [telaInicio, telaQuiz, telaResultado]) t.hidden = true;
  tela.hidden = false;
  window.scrollTo({ top: 0 });
}

// =========================================================
// Tela inicial
// =========================================================
function montarMaterias() {
  listaMaterias.innerHTML = "";
  for (const materia of MATERIAS) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "materia";
    botao.textContent = materia.nome;
    botao.addEventListener("click", () => iniciarMateria(materia, botao));
    listaMaterias.appendChild(botao);
  }
}

async function iniciarMateria(materia, botao) {
  erroCarregar.hidden = true;
  botao.disabled = true;

  try {
    const todas = await carregarPerguntas(materia.arquivo);
    if (todas.length === 0) throw new Error("Nenhuma pergunta válida em " + materia.arquivo);

    materiaAtual = { ...materia, todas };
    comecarRodada();
  } catch (erro) {
    console.error(erro);
    erroCarregar.textContent =
      "Não consegui carregar as perguntas. Abra o projeto por um servidor local " +
      "(Live Server no VS Code, ou rode 'python -m http.server' na pasta do projeto) " +
      "e confira se a pasta 'materias' está junto do index.html.";
    erroCarregar.hidden = false;
  } finally {
    botao.disabled = false;
  }
}

// =========================================================
// Rodada
// =========================================================
function comecarRodada() {
  perguntas = sortear(materiaAtual.todas, PERGUNTAS_POR_RODADA);
  indice = 0;
  pontos = 0;
  resultados = [];
  atualizarPontos();
  mostrarTela(telaQuiz);
  mostrarPergunta();
}

function atualizarPontos() {
  pontosEl.textContent = pontos;
}

function mostrarPergunta() {
  const p = perguntas[indice];
  respondida = false;
  window.scrollTo({ top: 0 }); // no celular, volta ao topo a cada pergunta nova

  contadorEl.textContent =
    materiaAtual.nome + " · pergunta " + (indice + 1) + " de " + perguntas.length;
  enunciadoEl.textContent = p.texto;

  // progresso: mostra quantas já foram respondidas
  barraEl.style.width = (indice / perguntas.length) * 100 + "%";
  barraWrap.setAttribute("aria-valuemax", perguntas.length);
  barraWrap.setAttribute("aria-valuenow", indice);

  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  btnProxima.hidden = true;
  btnProxima.textContent = indice === perguntas.length - 1 ? "Ver resultado" : "Próxima pergunta";

  alternativasEl.innerHTML = "";
  p.alternativas.forEach((texto, i) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "alternativa";
    botao.innerHTML = '<span class="bolinha"></span><span class="texto-alt"></span>';
    botao.querySelector(".bolinha").textContent = LETRAS[i];
    botao.querySelector(".texto-alt").textContent = texto;
    botao.addEventListener("click", () => responder(i));
    alternativasEl.appendChild(botao);
  });
}

function responder(escolhida) {
  if (respondida) return;
  respondida = true;

  const p = perguntas[indice];
  const botoes = alternativasEl.querySelectorAll(".alternativa");
  const acertou = escolhida === p.correta;

  botoes.forEach(b => (b.disabled = true));
  botoes[p.correta].classList.add("certa");

  if (acertou) {
    pontos += PONTOS_POR_ACERTO;
    atualizarPontos();
    feedbackEl.textContent = "Correto! +" + PONTOS_POR_ACERTO + " pontos";
    feedbackEl.classList.add("ok");
  } else {
    botoes[escolhida].classList.add("errada");
    feedbackEl.textContent = "Errado. A resposta certa é a letra " + LETRAS[p.correta] + ".";
    feedbackEl.classList.add("erro-resp");
  }

  resultados.push(acertou);
  btnProxima.hidden = false;
  btnProxima.focus();
}

function proxima() {
  if (indice < perguntas.length - 1) {
    indice++;
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

// =========================================================
// Resultado
// =========================================================
function mensagemDoResultado(pts, total) {
  // mesmas faixas do jogo.py
  if (pts === total) return "Perfeito, você acertou tudo!";
  if (pts >= total * 0.8) return "Muito bom!";
  if (pts >= total * 0.6) return "Parabéns!";
  if (pts >= total * 0.4) return "Dá para melhorar, tente de novo!";
  return "Estude mais um pouco e volte!";
}

function mostrarResultado() {
  const total = perguntas.length * PONTOS_POR_ACERTO;

  resultadoMateria.textContent = materiaAtual.nome;
  resultadoPontos.textContent = pontos;
  resultadoTotal.textContent = total;
  resultadoMensagem.textContent = mensagemDoResultado(pontos, total);

  // gabarito: uma bolinha por pergunta (verde = acertou, vermelha = errou)
  gabaritoEl.innerHTML = "";
  resultados.forEach((acertou, i) => {
    const b = document.createElement("span");
    b.className = "bolinha " + (acertou ? "acertou" : "errou");
    b.textContent = i + 1;
    b.title = "Pergunta " + (i + 1) + ": " + (acertou ? "acertou" : "errou");
    gabaritoEl.appendChild(b);
  });

  mostrarTela(telaResultado);
  btnRepetir.focus();
}

// =========================================================
// Eventos
// =========================================================
btnProxima.addEventListener("click", proxima);
btnRepetir.addEventListener("click", comecarRodada);
btnOutra.addEventListener("click", () => mostrarTela(telaInicio));
btnSair.addEventListener("click", () => mostrarTela(telaInicio));

// Atalhos: teclas A-D ou 1-4 respondem, Enter vai para a próxima
document.addEventListener("keydown", (e) => {
  if (telaQuiz.hidden) return;

  const tecla = e.key.toUpperCase();
  let i = LETRAS.indexOf(tecla);
  if (i === -1 && ["1", "2", "3", "4"].includes(tecla)) i = Number(tecla) - 1;

  if (i !== -1 && !respondida) {
    responder(i);
  } else if (e.key === "Enter" && respondida && document.activeElement !== btnProxima) {
    proxima();
  }
});

// ---------- início ----------
montarMaterias();
mostrarTela(telaInicio);
