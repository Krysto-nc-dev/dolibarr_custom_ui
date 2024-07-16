const presentations = [
  {
    title: 'Présentation sur le Recyclage du Plastique',
    description: "Une présentation sur l'importance du recyclage du plastique.",
    cover: 'tortue_plastic.jpeg',
    slides: [
      {
        title: 'Introduction au Recyclage',
        subtitle: 'Comprendre le processus de recyclage',
        image: 'recycling_intro.jpg',
        paragraphs: [
          'Le recyclage du plastique joue un rôle crucial dans la réduction des déchets.',
          "Il permet de préserver les ressources naturelles et de protéger l'environnement.",
        ],
        template: 'template1',
      },
      {
        title: 'Types de Plastique',
        subtitle: 'Connaître les différents types de plastique',
        image: 'plasticType.jpg',
        paragraphs: [
          'Il existe plusieurs types de plastique, chacun ayant des propriétés différentes.',
          "Certains types sont plus faciles à recycler que d'autres.",
        ],
        template: 'template2',
      },
      {
        title: "Impact du Plastique sur l'Environnement",
        subtitle: "Analyse de l'impact environnemental du plastique",
        image: 'pollutionMer.jpeg',
        paragraphs: [
          'Le plastique non recyclé peut avoir un impact dévastateur sur la faune et la flore.',
          'Le recyclage aide à réduire la pollution plastique dans les océans.',
        ],
        template: 'template3',
      },
    ],
  },
  {
    title: 'Présentation sur les Initiatives de Recyclage Locales',
    description:
      'Une présentation sur les initiatives de recyclage locales à Nouméa.',
    cover: 'PileOfPlastic.jpg',
    slides: [
      {
        title: 'Collecte de Plastique 2024',
        subtitle: 'Campagne de collecte de plastique pour le recyclage en 2024',
        image: 'collecte2024.jpeg',
        paragraphs: [
          "L'objectif de cette campagne est de sensibiliser et d'encourager la population à recycler le plastique.",
          'Elle vise à augmenter le taux de recyclage dans la région de Nouméa.',
        ],
        template: 'template1',
      },
      {
        title: 'Recyclage dans les Écoles',
        subtitle: 'Programme de recyclage dans les écoles de Nouméa',
        image: 'recycling_school.png',
        paragraphs: [
          'Les écoles participent activement au recyclage du plastique.',
          "Les élèves apprennent l'importance de réduire les déchets plastiques.",
        ],
        template: 'template2',
      },
    ],
  },
  {
    title: 'Mission plastique',
    description:
      "Partons à la découverte d'un trésor précieux et apprenons tout sur ses origines, ses particularités et son recyclage !",
    cover: 'mision_plastique.jpeg',
    slides: [
      {
        title: "Plasti'quizz",
        subtitle:
          "Pourras-tu trouver les réponses à ces questions sur l'origine et l'histoire de ce materiaux ?",
        template: 'quiz',
        questions: [
          {
            questionText: 'Quand le premier plastique a-t-il été inventé ?',
            type: 'qcm',
            options: ['1907', '1920', '1945'],
            correctAnswer: '1907',
          },
          {
            questionText: 'A partir de quoi est produit le plastique ?',
            type: 'open',
            correctAnswer: 'Pétrole',
          },
          {
            questionText:
              "Quelle quantité de plastique a déjà été produite par l'homme depuis son invention ?",
            type: 'qcm',
            options: [
              '8.3 milliards de tonnes',
              '5 milliards de tonnes',
              '10 milliards de tonnes',
            ],
            correctAnswer: '8.3 milliards de tonnes',
          },
        ],
      },
      {
        title: 'Les différents polymères',
        subtitle:
          "Tu as un peut de mal a visualiser comment naît le plastique ? Tu vas voir, c'est un jeux d'enfants !",
        image: 'recycling_school.png',
        paragraphs: [
          'On part du naphta',
          'Puis on procéde au craquage',
          'On obtient des monoméres !',
        ],
        template: 'template3',
      },
    ],
  },
]

export default presentations
