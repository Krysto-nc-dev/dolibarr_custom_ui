const recipes = [
  {
    title: 'Lune Tachetée',
    description:
      'Une plaque marbrée majoritairement blanche avec de légères touches de noir, évoquant la surface mystérieuse de la lune.',
    source: 'Les Recycleurs Fous',
    plasticType: '737a3694e5fc335f796a4946',
    colors: [
      { colorId: '737a3694e5fc335f796a4921', percentage: 95 }, // Blanc
      { colorId: '737a3694e5fc335f796a4922', percentage: 5 }, // Noir
    ],
    productionType: 'compression',
    user: '6686899f7f0f7be0d5780336',
    images: ['sheet1.png'],
  },
  {
    title: "Nuage d'Encre",
    description:
      "Un mélange subtil de blanc et de noir, rappelant un nuage enveloppé d'une brume noire.",
    source: 'Les Recycleurs Fous',
    plasticType: '737a3694e5fc335f796a4946',
    colors: [
      { colorId: '737a3694e5fc335f796a4921', percentage: 90 }, // Blanc
      { colorId: '737a3694e5fc335f796a4922', percentage: 10 }, // Noir
    ],
    productionType: 'compression',
    user: '6686899f7f0f7be0d5780336',
    images: ['sheet2.png'],
  },
  {
    title: 'Aube Ombreuse',
    description:
      "Une plaque où le blanc domine mais le noir commence à prendre plus de place, semblable aux premières lueurs de l'aube.",
    source: 'Les Recycleurs Fous',
    plasticType: '737a3694e5fc335f796a4946',
    colors: [
      { colorId: '737a3694e5fc335f796a4921', percentage: 75 }, // Blanc
      { colorId: '737a3694e5fc335f796a4922', percentage: 25 }, // Noir
    ],
    productionType: 'compression',
    user: '6686899f7f0f7be0d5780336',
    images: ['sheet3.png'],
  },
  {
    title: 'Marbre Nocturne',
    description:
      'Un équilibre parfait entre le blanc et le noir, créant une apparence marbrée sophistiquée.',
    source: 'Les Recycleurs Fous',
    plasticType: '737a3694e5fc335f796a4946',
    colors: [
      { colorId: '737a3694e5fc335f796a4921', percentage: 50 }, // Blanc
      { colorId: '737a3694e5fc335f796a4922', percentage: 50 }, // Noir
    ],
    productionType: 'compression',
    user: '6686899f7f0f7be0d5780336',
    images: ['sheet4.png'],
  },
  {
    title: 'Marbre Fumé',
    description:
      "Principalement noire avec des motifs blancs, cette plaque rappelle la fumée dans l'obscurité.",
    source: 'Les Recycleurs Fous',
    plasticType: '737a3694e5fc335f796a4946',
    colors: [
      { colorId: '737a3694e5fc335f796a4921', percentage: 25 }, // Blanc
      { colorId: '737a3694e5fc335f796a4922', percentage: 75 }, // Noir
    ],
    productionType: 'compression',
    user: '6686899f7f0f7be0d5780336',
    images: ['sheet5.png'],
  },
  {
    title: 'Nuit Brumeuse',
    description:
      'Une plaque majoritairement noire avec des nuances de blanc, évoquant une nuit enveloppée de brume.',
    source: 'Les Recycleurs Fous',
    plasticType: '737a3694e5fc335f796a4946',
    colors: [
      { colorId: '737a3694e5fc335f796a4921', percentage: 15 }, // Blanc
      { colorId: '737a3694e5fc335f796a4922', percentage: 85 }, // Noir
    ],
    productionType: 'compression',
    user: '6686899f7f0f7be0d5780336',
    images: ['sheet6.png'],
  },
  {
    title: 'Ébène Pâle',
    description:
      "Une plaque quasiment noire avec des touches très subtiles de blanc, semblable à l'ébène.",
    source: 'Les Recycleurs Fous',
    plasticType: '737a3694e5fc335f796a4946',
    colors: [
      { colorId: '737a3694e5fc335f796a4921', percentage: 5 }, // Blanc
      { colorId: '737a3694e5fc335f796a4922', percentage: 95 }, // Noir
    ],
    productionType: 'compression',
    user: '6686899f7f0f7be0d5780336',
    images: ['sheet7.png'],
  },
  {
    title: 'Solar Flare',
    description:
      "Cette plaque, vibrant de 90% de jaune éclatant avec des touches de rouge intense et un léger marbré noir, capture l'essence d'une éruption solaire. Le mélange produit un effet visuel unique, rappelant les nuances de l'orange brûlant et les ombres profondes des flammes solaires.",
    source: 'Krysto',
    plasticType: '737a3694e5fc335f796a4946',
    colors: [
      { colorId: '737a3694e5fc335f796a4923', percentage: 5 }, // Rouge
      { colorId: '737a3694e5fc335f796a4927', percentage: 90 }, // Jaune
      { colorId: '737a3694e5fc335f796a4922', percentage: 5 }, // Noir
    ],
    productionType: 'injection',
    user: '6686899f7f0f7be0d5780336',
    images: ['solarFlare.jpg'],
  },
  {
    title: 'Mélodie des Fleurs',
    description:
      "Cette plaque présente une harmonie captivante de couleurs pastel, rappelant un champ de fleurs en pleine floraison. Avec 30% de lilas et 30% de violet, elle crée une base riche et profonde, tandis que les touches de bleu et de rose ajoutent une douceur apaisante. De légères nuances de noir et de blanc, ainsi qu'une touche subtile de vert, viennent enrichir cette composition, donnant une impression de délicatesse et de beauté naturelle.",
    source: 'Precious Plastic',
    colors: [
      { colorId: '737a3694e5fc336f796a412b', percentage: 30 }, // Lilas
      { colorId: '737a3694e5fc335f796a492a', percentage: 30 }, // Violet
      { colorId: '737a3694e5fc335f796a4924', percentage: 15 }, // Bleu
      { colorId: '737a3694e5fc335f796a492b', percentage: 15 }, // Rose
      { colorId: '737a3694e5fc335f796a4922', percentage: 2 }, // Noir
      { colorId: '737a3694e5fc335f796a4922', percentage: 2 }, // Blanc
      { colorId: '737a3694e5fc335f796a4928', percentage: 1 }, // Vert
    ],
    productionType: 'compression',
    user: '6686899f7f0f7be0d5780336',
    images: ['sheetPE_1.jpg'],
  },
]

export default recipes
