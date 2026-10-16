import random
def pergunta(resposta_certa):
    while True:
        resposta = input("\nDigite a letra da resposta correta: ").strip().upper()
        if resposta in ("A","B","C","D"):
            break
        print("Inválido")
    if resposta == resposta_certa:
        print("Correto!")
        return 100
    else:
        print("Errado")
        return 0
    
def jogar(lista_de_perguntas):
    pontos = 0
    sorteadas = random.sample(lista_de_perguntas, min(10, len(lista_de_perguntas)))
    for numero, (texto, certa) in enumerate(sorteadas, start=1):
        print(f"Pergunta {numero}: {texto} ")
        pontos += pergunta(certa)
    total = len(sorteadas)*100
    print(f"\nPontuação: {pontos} de {total}")

    if pontos == total:
        print("Perfeito, você acertou tudo!")
    elif pontos >= total*0.8:
        print("Muito bom!")
    elif pontos >= total*0.6:
        print("Parabéns!")
    elif pontos >= total*0.4:
        print("Dá para melhorar, tente de novo!")
    else:
        print("Estude mais um pouco e volte!")

