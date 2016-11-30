f1 = open('dictionaryEasy.txt','w')
f2 = open('dictionaryMed.txt','w')
f3 = open('dictionaryHard.txt','w')

with open('dictionary.txt') as fp:
	for line in fp:
		for word in line.split():
			l = len(word)
			if l>=4 and l<=6:
				f1.write(word + '\n')
			elif l>=7 and l<=8:
				f2.write(word + '\n')
			elif l>=9 and l<=10:
				f3.write(word + '\n')

f1.close()
f2.close()
f3.close()
