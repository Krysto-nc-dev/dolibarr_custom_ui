const collectes = [
  {
    title: 'Collecte de Plastique Particulier',
    description: 'Collecte hebdomadaire de plastique pour les particuliers',
    dollibarTierId: '9',
    collectionType: 'Particulier',
    contract: 'collecte_contract.pdf',
    recurring: true,
    frequency: 'Hebdomadaire',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    status: 'En attente',
    address: '1 rue Anatole France, 98800 Nouméa, Nouvelle-Calédonie',
    createdBy: '6686899f7f0f7be0d5780336',
  },
  {
    title: 'Collecte de Plastique Professionnel',
    description: 'Collecte mensuelle de plastique pour les entreprises',
    dollibarTierId: '22',
    collectionType: 'Professionnel',
    contract: 'collecte_contract.pdf',
    recurring: true,
    frequency: 'Mensuelle',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-12-31'),
    status: 'En cours',
    address: '6 rue tourville, 98800 Noumèa, Nouvelle-Calédonie',
    createdBy: '6686899f7f0f7be0d5780336',
  },
  {
    title: 'Collecte Unique de Plastique',
    description: 'Collecte unique de plastique pour un événement spécial',
    dollibarTierId: '143',
    contract: 'collecte_contract.pdf',
    collectionType: 'Particulier',
    recurring: false,
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-15'),
    status: 'Terminée',
    address: "65 Route de l' Anse Vata Trianon, 98800, Nouméa, New Caledonia",
    createdBy: '6686899f7f0f7be0d5780336',
  },
]

export default collectes