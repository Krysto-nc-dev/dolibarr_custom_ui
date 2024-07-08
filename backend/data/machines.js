import mongoose from 'mongoose'

const generateBarcode = () => {
  return Math.floor(1000000000000 + Math.random() * 9000000000000).toString()
}

const machines = [
  {
    name: 'Arbour press injection',
    description: 'Machine injection Arbour press',
    category: 'Machine',
    type: 'injection',
    user: '6686899f7f0f7be0d5780336',
    images: ['injection.png'],
    status: 'Operationel',
    operatingHours: 1200,
    buyDate: new Date('2023-01-15'),
    orderDate: new Date('2022-12-01'),
    receptionDate: new Date('2023-01-10'),
    serviceDate: new Date('2023-01-20'),
    barcode: generateBarcode(),
    tierId: '1',
    totalCoast: 700,
    provenanceCountry: 'Royaume-Uni',
    maintenances: [
      {
        date: new Date('2023-06-15'),
        type: 'Maintenance',
        description: 'Changement du filtre',
        cost: 50,
        technician: '1', // Remplacez par un ID utilisateur valide
        notes: 'RAS',
        recurrence: {
          frequency: 'Mensuel',
          interval: 1,
          endDate: new Date('2024-06-15'),
        },
      },
    ],
    usageProcedures: [
      {
        title: 'Procédure d’utilisation standard',
        steps: [
          { stepNumber: 1, description: 'Allumer la machine' },
          {
            stepNumber: 2,
            description: 'Régler les paramètres de température',
          },
          { stepNumber: 3, description: 'Lancer la production' },
        ],
      },
    ],
  },
  {
    name: 'Basic Shredder',
    description: 'Machine broyage de plastique',
    category: 'Machine',
    type: 'Broyeur',
    user: '6686899f7f0f7be0d5780336',
    images: ['shredder.png'],
    status: 'En Maintenance',
    operatingHours: 850,
    buyDate: new Date('2023-02-15'),
    orderDate: new Date('2022-11-20'),
    receptionDate: new Date('2023-01-05'),
    serviceDate: new Date('2023-01-15'),
    barcode: generateBarcode(),
    tierId: '1',
    totalCoast: 700,
    provenanceCountry: 'Royaume-Uni',
    maintenances: [
      {
        date: new Date('2023-07-01'),
        type: 'Réparation',
        description: 'Réparation de la courroie de transmission',
        cost: 200,
        technician: '1', // Remplacez par un ID utilisateur valide
        notes: 'Courroie remplacée',
        recurrence: {
          frequency: 'Mensuel',
          interval: 1,
          endDate: new Date('2024-07-01'),
        },
      },
    ],
    usageProcedures: [
      {
        title: 'Procédure d’utilisation pour l’extrusion',
        steps: [
          { stepNumber: 1, description: 'Allumer la machine' },
          { stepNumber: 2, description: 'Charger le matériau' },
          { stepNumber: 3, description: 'Régler la vitesse d’extrusion' },
        ],
      },
    ],
  },
  {
    name: 'Moule Bagues',
    description:
      'Moule de compression utilisé pour la fabrication de pièces moulées en plastique.',
    category: 'Moule',
    type: 'injection',
    user: '6686899f7f0f7be0d5780336',
    images: ['mold.png'],
    status: 'Operationel',
    operatingHours: 500,
    buyDate: new Date('2023-03-10'),
    orderDate: new Date('2022-12-15'),
    receptionDate: new Date('2023-02-01'),
    serviceDate: new Date('2023-02-10'),
    barcode: generateBarcode(),
    tierId: '1',
    totalCoast: 700,
    provenanceCountry: 'Royaume-Uni',
    maintenances: [
      {
        date: new Date('2023-05-20'),
        type: 'Maintenance',
        description: 'Nettoyage du moule',
        cost: 30,
        notes: 'Moule nettoyé et graissé',
        recurrence: {
          frequency: 'Mensuel',
          interval: 1,
          endDate: new Date('2024-05-20'),
        },
      },
    ],
    usageProcedures: [
      {
        title: 'Procédure de moulage par compression',
        steps: [
          { stepNumber: 1, description: 'Préparer le matériau' },
          { stepNumber: 2, description: 'Chauffer le moule' },
          { stepNumber: 3, description: 'Appliquer la pression' },
        ],
      },
    ],
  },
  {
    name: 'Moule régle de bureau',
    description: 'Moule d’injection fabrication de règle de bureau',
    category: 'Moule',
    type: 'injection',
    user: '6686899f7f0f7be0d5780336',
    images: ['ruler.jpg'],
    status: 'Operationel',
    operatingHours: 700,
    buyDate: new Date('2023-04-05'),
    orderDate: new Date('2023-01-15'),
    receptionDate: new Date('2023-03-01'),
    serviceDate: new Date('2023-03-10'),
    barcode: generateBarcode(),
    tierId: '1',
    totalCoast: 700,
    provenanceCountry: 'Royaume-Uni',
    maintenances: [
      {
        date: new Date('2023-07-10'),
        type: 'Maintenance',
        description: 'Vérification des éjecteurs',
        cost: 40,
        notes: 'RAS',
        recurrence: {
          frequency: 'Mensuel',
          interval: 1,
          endDate: new Date('2024-07-10'),
        },
      },
    ],
    usageProcedures: [
      {
        title: 'Procédure d’utilisation du moule d’injection',
        steps: [
          { stepNumber: 1, description: 'Chauffer le moule' },
          { stepNumber: 2, description: 'Injecter le matériau' },
          { stepNumber: 3, description: 'Ouvrir le moule' },
        ],
      },
    ],
  },
  {
    name: 'Set outils',
    description:
      'Ensemble d’outillages pour diverses opérations de fabrication et maintenance',
    category: 'Outillage',
    type: 'Autres',
    user: '6686899f7f0f7be0d5780336',
    images: ['toolset.jpeg'],
    status: 'Operationel',
    operatingHours: 300,
    buyDate: new Date('2023-05-25'),
    orderDate: new Date('2023-03-20'),
    receptionDate: new Date('2023-04-15'),
    serviceDate: new Date('2023-04-25'),
    barcode: generateBarcode(),
    tierId: '1',
    totalCoast: 700,
    provenanceCountry: 'Nouvelle-Calédonie',
    maintenances: [
      {
        date: new Date('2023-04-30'),
        type: 'Maintenance',
        description: 'Affûtage des outils',
        cost: 20,
        technician: '1', // Remplacez par un ID utilisateur valide
        notes: 'Outils affûtés',
        recurrence: {
          frequency: 'Mensuel',
          interval: 1,
          endDate: new Date('2024-04-30'),
        },
      },
    ],
    usageProcedures: [
      {
        title: 'Procédure d’utilisation des outillages',
        steps: [
          { stepNumber: 1, description: 'Préparer les outils' },
          { stepNumber: 2, description: 'Régler les paramètres' },
          { stepNumber: 3, description: 'Effectuer l’opération' },
        ],
      },
    ],
  },
]

export default machines
