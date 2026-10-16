import csv

def carregar_perguntas(caminho):
    perguntas = []
    with open(caminho, encoding="utf-8", newline="") as arquivo:
        leitor = csv.DictReader(arquivo, delimiter=";")
        for linha in leitor:
            texto = (
                f"{linha['pergunta']}\n"
                f" A) {linha['A']}\n"
                f" B) {linha['B']}\n"
                f" C) {linha['C']}\n"
                f" D) {linha['D']}\n"
            )
            perguntas.append((texto, linha["correta"]))
    return perguntas