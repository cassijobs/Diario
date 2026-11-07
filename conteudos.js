/* Textos originais em linguagem simples. */
(function(root){
const conteudos = [
  {
    "dia": 1,
    "titulo": "Faça a sua parte",
    "tema": "Suas escolhas",
    "texto": "Você não pode decidir tudo. Não pode escolher o que outra pessoa pensa ou faz. Mas pode escolher como agir agora. Cuide da parte que está nas suas mãos, mesmo que seja pequena.",
    "pratica": "Escolha uma preocupação e escreva uma coisa que você pode fazer a respeito.",
    "manha": "O que eu posso fazer hoje?",
    "noite": "Com o que me preocupei sem poder mudar?"
  },
  {
    "dia": 2,
    "titulo": "Olhe antes de concluir",
    "tema": "Atenção",
    "texto": "Uma pessoa demorou para responder. Isso quer dizer que ela está brava? Talvez não. Às vezes a gente imagina uma explicação antes de saber o que aconteceu. Espere um pouco e procure entender.",
    "pratica": "Pense em algo que incomodou você. Separe o que aconteceu do que você imaginou.",
    "manha": "O que eu preciso entender melhor?",
    "noite": "Tirei alguma conclusão cedo demais?"
  },
  {
    "dia": 3,
    "titulo": "Pare um pouco antes de responder",
    "tema": "Calma",
    "texto": "Quando estamos com raiva, podemos falar algo que machuca. Parar um pouco não é fugir da conversa. É dar tempo para escolher melhor as palavras.",
    "pratica": "Antes de responder a algo difícil, respire e leia sua mensagem de novo.",
    "manha": "Em qual conversa quero ter mais calma?",
    "noite": "Consegui pensar antes de responder?"
  },
  {
    "dia": 4,
    "titulo": "Comece com pouco",
    "tema": "Primeiro passo",
    "texto": "Uma tarefa grande pode dar vontade de desistir antes de começar. Você não precisa fazer tudo de uma vez. Cinco minutos já podem ajudar a sair do lugar.",
    "pratica": "Faça por cinco minutos algo que você vem deixando para depois.",
    "manha": "Qual pequeno passo posso dar hoje?",
    "noite": "O que consegui começar?"
  },
  {
    "dia": 5,
    "titulo": "Saiba quando parar",
    "tema": "Equilíbrio",
    "texto": "Sempre vai existir algo a mais para fazer ou comprar. Por isso, ajuda escolher um limite. Descansar depois de fazer o necessário também faz parte do cuidado com a vida.",
    "pratica": "Escolha uma tarefa e decida quando vai parar.",
    "manha": "O que será suficiente por hoje?",
    "noite": "Respeitei algum limite que escolhi?"
  },
  {
    "dia": 6,
    "titulo": "Ouça até o fim",
    "tema": "Conversa",
    "texto": "Às vezes a gente prepara uma resposta enquanto a outra pessoa ainda fala. Assim, pode deixar de ouvir algo importante. Escutar não é concordar com tudo. É tentar entender antes de responder.",
    "pratica": "Deixe alguém terminar de falar. Depois, faça uma pergunta para entender melhor.",
    "manha": "Quem eu quero ouvir com atenção?",
    "noite": "O que entendi melhor depois de escutar?"
  },
  {
    "dia": 7,
    "titulo": "Um erro não define você",
    "tema": "Aprender",
    "texto": "Você fez algo errado. Isso não quer dizer que tudo em você está errado. Olhe para o que aconteceu, veja o que pode consertar e escolha um próximo passo. Tratar a si mesmo com respeito ajuda a aprender.",
    "pratica": "Escreva um erro sem se ofender. Depois, anote como pode corrigir.",
    "manha": "O que posso corrigir sem me tratar mal?",
    "noite": "O que aprendi com um erro?"
  },
  {
    "dia": 8,
    "titulo": "Faça o certo mesmo sem elogios",
    "tema": "Honestidade",
    "texto": "Algumas boas atitudes passam despercebidas. Cumprir um combinado ou reconhecer a ajuda de alguém pode não trazer elogios. Mesmo assim, essas escolhas mostram como você quer viver.",
    "pratica": "Cumpra um pequeno combinado, mesmo que ninguém perceba.",
    "manha": "Que coisa boa posso fazer sem esperar elogios?",
    "noite": "Fiz algo de acordo com o que acredito?"
  },
  {
    "dia": 9,
    "titulo": "Tente outro caminho",
    "tema": "Mudança de planos",
    "texto": "Seu plano pode não dar certo. Isso não significa que você precisa desistir do que importa. Veja o que ainda é possível e tente um caminho diferente.",
    "pratica": "Pense em outra maneira de fazer algo que ficou difícil.",
    "manha": "O que posso fazer de outro jeito?",
    "noite": "Que mudança me ajudou hoje?"
  },
  {
    "dia": 10,
    "titulo": "Não se meça pela vida dos outros",
    "tema": "Seu caminho",
    "texto": "Você vê uma parte da vida dos outros. Da sua, conhece também as dificuldades. Comparar essas duas coisas pode ser injusto com você. Procure aprender com alguém sem diminuir o seu próprio caminho.",
    "pratica": "Pense em algo que admira em alguém e escolha uma coisa que pode aprender.",
    "manha": "O que gostaria de aprender?",
    "noite": "Consegui olhar para mim com mais respeito?"
  },
  {
    "dia": 11,
    "titulo": "Você pode dizer não",
    "tema": "Seus limites",
    "texto": "Dizer sim a tudo pode deixar você sem tempo e sem energia. Uma recusa clara e respeitosa ajuda a cuidar dos compromissos que já tem. Você não precisa tratar mal ninguém para colocar um limite.",
    "pratica": "Se precisar recusar um pedido, explique de forma curta e educada.",
    "manha": "A que preciso dizer não hoje?",
    "noite": "Consegui falar com clareza sobre meus limites?"
  },
  {
    "dia": 12,
    "titulo": "Volte para este momento",
    "tema": "Presença",
    "texto": "Pensar no amanhã ajuda a fazer planos. Mas pensar sem parar pode tirar sua atenção do que está acontecendo agora. Volte para a tarefa ou para a pessoa que está diante de você.",
    "pratica": "Faça uma coisa por dez minutos sem olhar outra tela.",
    "manha": "O que precisa da minha atenção agora?",
    "noite": "Em que momento consegui estar mais presente?"
  },
  {
    "dia": 13,
    "titulo": "Dê um passo com medo mesmo",
    "tema": "Coragem",
    "texto": "Você não precisa se sentir totalmente seguro para dar um passo importante. Às vezes coragem é pedir ajuda, fazer uma pergunta ou ter uma conversa difícil. Escolha um passo que seja possível e seguro.",
    "pratica": "Faça uma pequena coisa importante que o medo vem adiando.",
    "manha": "Que passo posso dar, mesmo com receio?",
    "noite": "O que consegui fazer apesar do medo?"
  },
  {
    "dia": 14,
    "titulo": "Cuide do básico",
    "tema": "Seu corpo",
    "texto": "Fome, cansaço e sono podem mudar a forma como você reage. Isso não é falta de força. Seu corpo precisa de cuidado. Descansar e se alimentar também ajudam você a fazer boas escolhas.",
    "pratica": "Escolha um cuidado possível: beber água, comer, descansar ou fazer uma pausa.",
    "manha": "De que cuidado preciso hoje?",
    "noite": "Como meu corpo estava e como isso afetou meu dia?"
  },
  {
    "dia": 15,
    "titulo": "Perceba quem ajuda você",
    "tema": "Agradecer",
    "texto": "Muita coisa no seu dia acontece com a ajuda de alguém. Perceber isso não apaga os problemas. Apenas lembra que você também recebe cuidado. Um agradecimento pode mostrar que você viu essa ajuda.",
    "pratica": "Agradeça a alguém e diga pelo que está agradecendo.",
    "manha": "Que ajuda costumo receber sem perceber?",
    "noite": "A quem consegui agradecer hoje?"
  },
  {
    "dia": 16,
    "titulo": "Você pode mudar de ideia",
    "tema": "Aprender",
    "texto": "Uma opinião pode parecer certa só porque você a repete há muito tempo. Ouvir algo novo pode ajudar a ver o que faltava. Mudar de ideia depois de aprender não é vergonha.",
    "pratica": "Ouça uma explicação diferente da sua antes de decidir.",
    "manha": "Sobre o que posso estar enganado?",
    "noite": "Aprendi algo que mudou minha opinião?"
  },
  {
    "dia": 17,
    "titulo": "Espere antes de agir",
    "tema": "Seus desejos",
    "texto": "Querer alguma coisa não significa que você precisa agir na mesma hora. Dê um tempo. Talvez a vontade continue e faça sentido. Talvez passe. Essa pausa pode ajudar você a escolher melhor.",
    "pratica": "Espere um pouco antes de uma compra ou resposta que não seja urgente.",
    "manha": "O que eu quero e por quê?",
    "noite": "Minha vontade mudou depois de esperar?"
  },
  {
    "dia": 18,
    "titulo": "Seja firme sem machucar",
    "tema": "Respeito",
    "texto": "Você pode dizer que uma atitude foi ruim sem dizer que a pessoa inteira é ruim. Fale sobre o que aconteceu e sobre o limite que precisa colocar. Respeito e firmeza podem andar juntos.",
    "pratica": "Ao falar de um problema, descreva a atitude sem ofender a pessoa.",
    "manha": "Como posso ser firme e respeitoso?",
    "noite": "Tratei alguém como gostaria de ser tratado?"
  },
  {
    "dia": 19,
    "titulo": "Dê tempo ao que importa",
    "tema": "Seu tempo",
    "texto": "O tempo de hoje não pode ser guardado para amanhã. Você não precisa encher cada minuto de tarefas. Descansar e estar com alguém também podem ser boas escolhas. Veja o que merece espaço no seu dia.",
    "pratica": "Separe um pouco de tempo para algo importante para você.",
    "manha": "Para o que quero reservar tempo hoje?",
    "noite": "Dei atenção ao que mais importa para mim?"
  },
  {
    "dia": 20,
    "titulo": "Tente consertar",
    "tema": "Responsabilidade",
    "texto": "Uma boa intenção não apaga a dor que uma atitude causou. Se você machucou alguém, procure ouvir e reconhecer o que fez. Quando for possível, ofereça uma forma de consertar, sem cobrar uma resposta.",
    "pratica": "Pense em um erro seu e em algo que pode fazer para reparar.",
    "manha": "Há algo que preciso tentar consertar?",
    "noite": "Assumi minha parte sem buscar desculpas?"
  },
  {
    "dia": 21,
    "titulo": "Faça um plano simples",
    "tema": "Preparo",
    "texto": "Pensar no que pode dar errado ajuda quando leva a uma ação. Mas repetir os mesmos medos não prepara você melhor. Escolha um problema provável, pense numa alternativa e siga o dia.",
    "pratica": "Prepare uma alternativa para um imprevisto que pode acontecer.",
    "manha": "O que posso preparar hoje?",
    "noite": "Meu plano ajudou ou só aumentou minha preocupação?"
  },
  {
    "dia": 22,
    "titulo": "Uma tarefa pequena ajuda",
    "tema": "Cuidado com os outros",
    "texto": "Lavar, arrumar e consertar podem parecer coisas pequenas. Mas essas tarefas ajudam a vida de todos. Fazer sua parte pode aliviar o dia de alguém.",
    "pratica": "Faça uma tarefa da casa ou do trabalho que seja sua responsabilidade.",
    "manha": "Que tarefa pode tornar o dia de alguém mais leve?",
    "noite": "Como minha ajuda fez diferença?"
  },
  {
    "dia": 23,
    "titulo": "Dê nome ao que sente",
    "tema": "Seus sentimentos",
    "texto": "Raiva, tristeza e medo fazem parte da vida. Sentir não obriga você a agir na mesma hora. Tente dizer o que está sentindo e do que precisa. Isso pode ajudar a escolher o próximo passo.",
    "pratica": "Escreva o nome de um sentimento e o que pode estar por trás dele.",
    "manha": "O que estou sentindo agora?",
    "noite": "Como cuidei do que estava sentindo?"
  },
  {
    "dia": 24,
    "titulo": "Você pode voltar",
    "tema": "Recomeço",
    "texto": "Ficar um dia sem fazer algo não precisa virar desistência. Você pode retomar aos poucos. Veja o que atrapalhou e escolha um jeito mais fácil de voltar. Recomeçar também é seguir em frente.",
    "pratica": "Retome por poucos minutos algo importante que ficou parado.",
    "manha": "O que posso retomar hoje?",
    "noite": "O que me ajudou a recomeçar?"
  },
  {
    "dia": 25,
    "titulo": "Nem sempre o mais fácil ajuda",
    "tema": "Suas escolhas",
    "texto": "O conforto pode fazer bem. Mas, às vezes, escolher sempre o mais fácil deixa algo importante para trás. Você não precisa buscar sofrimento. Apenas veja se um pequeno esforço pode valer a pena.",
    "pratica": "Faça um esforço pequeno e seguro por algo que importa para você.",
    "manha": "Que pequeno esforço vale a pena hoje?",
    "noite": "Foi tão difícil quanto eu imaginava?"
  },
  {
    "dia": 26,
    "titulo": "Esteja na conversa",
    "tema": "Atenção às pessoas",
    "texto": "Estar perto de alguém não é o mesmo que dar atenção. Guardar o celular e ouvir com calma são formas simples de mostrar cuidado. Mesmo uma conversa curta pode fazer bem.",
    "pratica": "Se a outra pessoa quiser conversar, escute por alguns minutos sem distrações.",
    "manha": "Como posso dar mais atenção a alguém?",
    "noite": "Em qual conversa consegui estar presente?"
  },
  {
    "dia": 27,
    "titulo": "Olhe também para o seu esforço",
    "tema": "Suas decisões",
    "texto": "Você pode agir com cuidado e, mesmo assim, ter um resultado ruim. Também pode dar sorte depois de escolher sem pensar. Para aprender, olhe para o resultado e para o jeito como decidiu.",
    "pratica": "Pense em uma decisão e no que você sabia quando a tomou.",
    "manha": "O que preciso levar em conta antes de decidir?",
    "noite": "O que faria igual e o que faria diferente?"
  },
  {
    "dia": 28,
    "titulo": "Nem tudo precisa ser do seu jeito",
    "tema": "Conviver",
    "texto": "As pessoas têm gostos e ritmos diferentes. Algumas diferenças precisam de conversa. Outras podem apenas existir. Antes de pedir uma mudança, veja se há um problema real ou só uma preferência sua.",
    "pratica": "Pense em algo que incomodou você. Era uma necessidade ou um gosto pessoal?",
    "manha": "Que diferença posso respeitar hoje?",
    "noite": "Consegui fazer um acordo sem impor minha vontade?"
  },
  {
    "dia": 29,
    "titulo": "Veja o que ainda faz sentido",
    "tema": "Mudar",
    "texto": "Algo que ajudou antes pode não ajudar mais. Você pode reconhecer o que aprendeu e escolher outro caminho. Não precisa continuar fazendo tudo do mesmo jeito só porque sempre fez assim.",
    "pratica": "Escolha um compromisso e pense se ele precisa mudar.",
    "manha": "O que faço só por costume?",
    "noite": "Que mudança combina melhor com minha vida hoje?"
  },
  {
    "dia": 30,
    "titulo": "Cuide do que você valoriza",
    "tema": "O que importa",
    "texto": "Pessoas, lugares e momentos mudam. Lembrar disso pode ajudar você a cuidar melhor do que tem hoje. Não é preciso fazer algo grandioso. Uma ligação, uma visita ou um pouco de atenção podem bastar.",
    "pratica": "Dê atenção a uma pessoa ou atividade importante para você.",
    "manha": "O que não quero deixar sempre para depois?",
    "noite": "Que atitude mostrou o que eu valorizo?"
  },
  {
    "dia": 31,
    "titulo": "Leve um aprendizado com você",
    "tema": "Fim do mês",
    "texto": "Você não precisa terminar o mês com tudo resolvido. Olhe para o que aprendeu, reconheça um pequeno avanço e escolha algo para ajustar. O próximo mês pode começar com um passo simples.",
    "pratica": "Anote um aprendizado e uma coisa que quer tentar no próximo mês.",
    "manha": "O que quero levar para o próximo mês?",
    "noite": "O que aprendi e quero colocar em prática?"
  }
];
if(typeof module!=="undefined") module.exports=conteudos; else root.conteudosDiario=conteudos;
})(typeof window!=="undefined"?window:globalThis);
