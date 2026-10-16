from carregador import carregar_perguntas
from jogo import jogar
from carregador import carregar_perguntas

print("Seja bem-vindo ao quiz")
while True:
    iniciar = input("Quer começar? (S/N): ").strip().upper()
    if iniciar in ("S","N"):
        break
    print("Opção inválida")
if iniciar.upper() == 'N':
    print("Cancelando...")
    quit()
    
materias = {
    "1": carregar_perguntas("materias/geografia.csv"),
    "2": carregar_perguntas("materias/portugues.csv"),
    "3": carregar_perguntas("materias/matematica.csv"),
    "4": carregar_perguntas("materias/historia.csv"),
    "5": carregar_perguntas("materias/biologia.csv"),
    "6": carregar_perguntas("materias/quimica.csv"),
}
while True:
    while True:
        materia_escolhida = input("""
        ESCOLHA A MATÉRIA:
        1- GEOGRAFIA
        2- PORTUGUÊS
        3- MATEMÁTICA
        4- HISTÓRIA
        5- BIOLOGIA
        6- QUÍMICA

        """).strip()
        if materia_escolhida in materias:
            break
        print("\nOpção inválida")

    jogar(materias[materia_escolhida])

    jogar_de_novo = input("Jogar outra matéria? (S/N): ").strip().upper()

    if jogar_de_novo == "N":
        break






