// "correta" é o índice da resposta certa (0 = A, 1 = B, 2 = C, 3 = D)
const perguntas = [
  { texto: "Qual é a capital da França?", alternativas: ["Paris", "Londres", "Berlim", "Madrid"], correta: 0 },
  { texto: "Quantos estados tem o Brasil?", alternativas: ["22", "19", "26", "28"], correta: 2 },
  { texto: "Qual é o maior país do mundo em área?", alternativas: ["Canadá", "China", "Rússia", "Estados Unidos"], correta: 2 },
  { texto: "Qual é o maior oceano do planeta?", alternativas: ["Atlântico", "Índico", "Pacífico", "Ártico"], correta: 2 },
  { texto: "Qual é a capital do Brasil?", alternativas: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"], correta: 1 },
  { texto: "Qual é o maior deserto quente do mundo?", alternativas: ["Gobi", "Saara", "Atacama", "Kalahari"], correta: 1 },
  { texto: "Qual é a capital do Japão?", alternativas: ["Seul", "Pequim", "Osaka", "Tóquio"], correta: 3 },
  { texto: "Qual país tem o formato de uma bota?", alternativas: ["Itália", "Grécia", "Portugal", "Espanha"], correta: 0 },
  { texto: "Qual é a capital da Argentina?", alternativas: ["Santiago", "Montevidéu", "Lima", "Buenos Aires"], correta: 3 },
  { texto: "Qual é o menor país do mundo em área?", alternativas: ["Mônaco", "Vaticano", "Malta", "San Marino"], correta: 1 },
];

const PONTOS_POR_ACERTO = 100;
const LETRAS = ["A", "B", "C", "D"];

let indice = 0;
let pontos = 0;

const telaInicio = document.getElementById("tela-inicio");
const telaPergunta = document.getElementById("tela-pergunta");
const telaFinal = document.getElementById("tela-final");

const progresso = document.getElementById("progresso");
const pontosEl = document.getElementById("pontos");
const barra = document.getElementById("barra-preenchida");
const enunciado = document.getElementById("enunciado");
const alternativasEl = document.getElementById("alternativas");
const feedback = document.getElementById("feedback");
const btnProxima = document.getElementById("btn-proxima");
const resultado = document.getElementById("resultado");
const mensagemFinal = document.getElementById("mensagem-final");

function mostrarTela(tela) {
  [telaInicio, telaPergunta, telaFinal].forEach((t) => (t.hidden = true));
  tela.hidden = false;
}

function iniciar() {
  indice = 0;
  pontos = 0;
  mostrarTela(telaPergunta);
  mostrarPergunta();
}

function mostrarPergunta() {
  const p = perguntas[indice];

  progresso.textContent = `Pergunta ${indice + 1} de ${perguntas.length}`;
  pontosEl.textContent = `${pontos} pontos`;
  barra.style.width = `${(indice / perguntas.length) * 100}%`;
  enunciado.textContent = p.texto;
  feedback.textContent = "";
  feedback.className = "feedback";
  btnProxima.hidden = true;
  alternativasEl.innerHTML = "";

  p.alternativas.forEach((texto, i) => {
    const botao = document.createElement("button");
    botao.className = "alternativa";
    botao.textContent = `${LETRAS[i]}) ${texto}`;
    botao.addEventListener("click", () => responder(i));
    alternativasEl.appendChild(botao);
  });
}

function responder(escolha) {
  const p = perguntas[indice];
  const botoes = alternativasEl.querySelectorAll(".alternativa");

  botoes.forEach((b) => (b.disabled = true));
  botoes[p.correta].classList.add("correta");

  if (escolha === p.correta) {
    pontos += PONTOS_POR_ACERTO;
    feedback.textContent = "Correto!";
    feedback.classList.add("certo");
  } else {
    botoes[escolha].classList.add("errada");
    feedback.textContent = `Errado! A resposta certa era: ${p.alternativas[p.correta]}`;
    feedback.classList.add("errado");
  }

  pontosEl.textContent = `${pontos} pontos`;
  btnProxima.textContent = indice === perguntas.length - 1 ? "Ver resultado" : "Próxima";
  btnProxima.hidden = false;
}

function proxima() {
  indice++;
  if (indice < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  const total = perguntas.length * PONTOS_POR_ACERTO;
  resultado.textContent = `${pontos} de ${total}`;

  if (pontos === total) {
    mensagemFinal.textContent = "Perfeito! Você é um expert em geografia!";
  } else if (pontos >= total * 0.6) {
    mensagemFinal.textContent = "Muito bom!";
  } else if (pontos >= total * 0.3) {
    mensagemFinal.textContent = "Dá para melhorar, tente de novo!";
  } else {
    mensagemFinal.textContent = "Estude mais um pouco e volte!";
  }

  mostrarTela(telaFinal);
}

document.getElementById("btn-iniciar").addEventListener("click", iniciar);
document.getElementById("btn-reiniciar").addEventListener("click", iniciar);
btnProxima.addEventListener("click", proxima);
