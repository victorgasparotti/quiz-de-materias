def pergunta(resposta_certa):
    while True:
        resposta = input("Digite a letra da resposta correta: ").strip().upper()
        if resposta in ("A","B","C","D"):
            break
        print("Inválido")
    if resposta == resposta_certa:
        print("Correto!")
        return 100
    else:
        print("Errado")
        return 0

print("Seja bem-vindo ao quiz")
while True:
    iniciar = input("Quer começar? (S/N): ").strip().upper()
    if iniciar in ("S","N"):
        break
    print("Opção inválida")

if iniciar.upper() == 'N':
    print("Cancelando...")
    quit()


if iniciar.upper() == 'S':
    pontos = 0
    print("Iniciando...")


    print("Pergunta 1: Qual é a capital da França?\n A) Paris\n B) Londres\n C) Berlim\n D) Madrid\n")
    pontos += pergunta("A")

    print("Pergunta 2: Quantos estados tem o Brasil?\n A) 22\n B) 19\n C) 26\n D) 28\n")
    pontos += pergunta("C")

    print("Pergunta 3: Qual é o maior país do mundo em área?\n A) Canadá\n B) China\n C) Rússia\n D) Estados Unidos\n")
    pontos += pergunta("C")

    print("Pergunta 4: Qual é o maior oceano do planeta?\n A) Atlântico\n B) Índico\n C) Pacífico\n D) Ártico\n")
    pontos += pergunta("C")

    print("Pergunta 5: Qual é a capital do Brasil?\n A) Rio de Janeiro\n B) Brasília\n C) São Paulo\n D) Salvador\n")
    pontos += pergunta("B")

    print("Pergunta 6: Qual é o maior deserto quente do mundo?\n A) Gobi\n B) Saara\n C) Atacama\n D) Kalahari\n")
    pontos += pergunta("B")

    print("Pergunta 7: Qual é a capital do Japão?\n A) Seul\n B) Pequim\n C) Osaka\n D) Tóquio\n")
    pontos += pergunta("D")

    print("Pergunta 8: Qual país tem o formato de uma bota?\n A) Itália\n B) Grécia\n C) Portugal\n D) Espanha\n")
    pontos += pergunta("A")

    print("Pergunta 9: Qual é a capital da Argentina?\n A) Santiago\n B) Montevidéu\n C) Lima\n D) Buenos Aires\n")
    pontos += pergunta("D")

    print("Pergunta 10: Qual é o menor país do mundo em área?\n A) Mônaco\n B) Vaticano\n C) Malta\n D) San Marino\n")
    pontos += pergunta("B")


    print(f"Pontuação: {pontos} de 1000")
    if pontos == 1000:
        print("Perfeito, você é expert em Geografia!")
    elif pontos >= 800:
        print("Muito bom!")
    elif pontos >= 600:
        print("Parabéns!")
    elif pontos >= 400:
        print("Dá para melhorar, tente de novo!")
    else:
        print("Estude mais um pouco e volte!")

