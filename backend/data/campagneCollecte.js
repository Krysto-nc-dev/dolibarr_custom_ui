const campagnesCollecte = [
  {
    title: 'Collecte de Plastique 2024',
    description: 'Campagne de collecte de plastique pour le recyclage en 2024.',
    dollibarTierId: '40',
    collectionType: 'Particulier',
    contract: 'collecte_contract.pdf',
    recurring: true,
    frequency: 'Mensuelle',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    status: 'Actif',
    address: '123 Rue Principale, Nouméa, Nouvelle-Calédonie',
    collectes: [
      {
        dateCollecte: new Date('2024-01-15'),
        PlasticWeightKg: 500,
        PlasticType: '737a3694e5fc335f796a4943', // Remplacez par un ID valide
        PlasticColor: '737a3694e5fc336f796a413b', // Remplacez par un ID valide
        collectedBy: '6686899f7f0f7be0d5780336', // Remplacez par un ID utilisateur valide
      },
      {
        dateCollecte: new Date('2024-02-15'),
        PlasticWeightKg: 450,
        PlasticType: '737a3694e5fc335f796a4949', // Remplacez par un ID valide
        PlasticColor: '737a3694e5fc336f796a413b', // Remplacez par un ID valide
        collectedBy: '6686899f7f0f7be0d5780336', // Remplacez par un ID utilisateur valide
      },
    ],
  },
  {
    title: 'Collecte de Déchets Plastiques des Entreprises',
    description:
      'Collecte mensuelle des déchets plastiques des entreprises locales.',
    dollibarTierId: '22',
    collectionType: 'Professionnel',
    contract: 'collecte_contract.pdf',
    recurring: true,
    frequency: 'Mensuelle',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    status: 'Actif',
    address: 'Zone Industrielle, Nouméa, Nouvelle-Calédonie',
    collectes: [
      {
        dateCollecte: new Date('2024-01-20'),
        PlasticWeightKg: 800,
        PlasticType: '737a3694e5fc335f796a4947', // Remplacez par un ID valide
        PlasticColor: '737a3694e5fc335f796a4921', // Remplacez par un ID valide
        collectedBy: '6686899f7f0f7be0d5780336', // Remplacez par un ID utilisateur valide
      },
      {
        dateCollecte: new Date('2024-02-20'),
        PlasticWeightKg: 750,
        PlasticType: '737a3694e5fc335f796a4947', // Remplacez par un ID valide
        PlasticColor: '737a3694e5fc335f796a4921', // Remplacez par un ID valide
        collectedBy: '6686899f7f0f7be0d5780336', // Remplacez par un ID utilisateur valide
      },
    ],
  },
  {
    title: 'Collecte Scolaire de Plastique',
    description: 'Campagne de collecte de plastique dans les écoles de Nouméa.',
    dollibarTierId: '9',
    collectionType: 'Particulier',
    contract: 'collecte_contract.pdf',
    recurring: false,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-31'),
    status: 'Actif',
    address: 'Écoles de Nouméa, Nouvelle-Calédonie',
    collectes: [
      {
        dateCollecte: new Date('2024-03-15'),
        PlasticWeightKg: 300,
        PlasticType: '737a3694e5fc335f796a4946', // Remplacez par un ID valide
        PlasticColor: '737a3694e5fc336f796a413b', // Remplacez par un ID valide
        collectedBy: '6686899f7f0f7be0d5780336', // Remplacez par un ID utilisateur valide
      },
    ],
  },
]

export default campagnesCollecte
