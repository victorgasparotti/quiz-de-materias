from carregador import carregar_perguntas

lista = carregar_perguntas("materias/geografia.csv")
print(len(lista))
print(lista[0][0])
print(lista[0][1])