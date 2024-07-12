import mongoose from 'mongoose'

const projects = [
  {
    title: 'Projet de Subvention Environnementale',
    description:
      'Demande de subvention pour un projet de réduction des déchets plastiques.',
    category: 'Demande de subvention',
    projectType: 'Long terme',
    budget: 50000,
    startDate: new Date('2023-06-01'),
    endDate: new Date('2025-06-01'),
    status: 'Proposition',
    teamMembers: ['6686899f7f0f7be0d5780336'],
    documents: ['subvention_proposal.pdf'],
    stages: [
      {
        stageNumber: 1,
        title: 'Préparation de la Demande',
        description:
          'Collecter les informations et préparer la documentation nécessaire pour la demande.',
        startDate: new Date('2023-06-01'),
        endDate: new Date('2023-06-30'),
        status: 'Terminée',
      },
      {
        stageNumber: 2,
        title: 'Soumission de la Demande',
        description:
          'Soumettre la demande de subvention aux autorités compétentes.',
        startDate: new Date('2023-07-01'),
        endDate: new Date('2023-07-15'),
        status: 'Terminée',
      },
      {
        stageNumber: 3,
        title: 'Attente de l’Approbation',
        description:
          'Attendre la réponse des autorités concernant la demande de subvention.',
        startDate: new Date('2023-07-16'),
        endDate: new Date('2023-09-01'),
        status: 'En cours',
      },
    ],
  },
  {
    title: 'Recherche et Développement sur les Bioplastiques',
    description:
      'Projet de recherche pour développer des alternatives aux plastiques traditionnels.',
    category: 'Recherche et Développement',
    projectType: 'Long terme',
    budget: 75000,
    startDate: new Date('2023-01-15'),
    endDate: new Date('2025-01-15'),
    status: 'En cours',
    teamMembers: ['6686899f7f0f7be0d5780336', '6686899f7f0f7be0d5780337'],
    documents: ['rd_plan.pdf', 'bioplastics_research.pdf'],
    stages: [
      {
        stageNumber: 1,
        title: 'Recherche Initiale',
        description:
          'Conduire une recherche initiale pour identifier les matériaux alternatifs potentiels.',
        startDate: new Date('2023-01-15'),
        endDate: new Date('2023-03-15'),
        status: 'Terminée',
      },
      {
        stageNumber: 2,
        title: 'Développement de Prototypes',
        description:
          'Développer des prototypes de bioplastiques à partir des matériaux identifiés.',
        startDate: new Date('2023-03-16'),
        endDate: new Date('2023-06-30'),
        status: 'En cours',
      },
      {
        stageNumber: 3,
        title: 'Tests et Évaluation',
        description:
          'Tester et évaluer les prototypes pour vérifier leur viabilité et performance.',
        startDate: new Date('2023-07-01'),
        endDate: new Date('2023-12-31'),
        status: 'Non commencée',
      },
    ],
  },
  {
    title: 'Développement d’un Nouveau Produit Commercial',
    description:
      'Projet de développement d’un nouveau produit en plastique recyclé pour le marché.',
    category: 'Projet Commercial',
    projectType: 'Court terme',
    budget: 30000,
    startDate: new Date('2023-09-01'),
    endDate: new Date('2024-03-01'),
    status: 'Proposition',
    teamMembers: ['6686899f7f0f7be0d5780338'],
    documents: ['commercial_product_plan.pdf'],
    stages: [
      {
        stageNumber: 1,
        title: 'Étude de Marché',
        description:
          'Réaliser une étude de marché pour identifier les besoins et opportunités.',
        startDate: new Date('2023-09-01'),
        endDate: new Date('2023-09-30'),
        status: 'Non commencée',
      },
      {
        stageNumber: 2,
        title: 'Design du Produit',
        description:
          'Concevoir le produit en fonction des résultats de l’étude de marché.',
        startDate: new Date('2023-10-01'),
        endDate: new Date('2023-11-15'),
        status: 'Non commencée',
      },
      {
        stageNumber: 3,
        title: 'Production Pilote',
        description:
          'Lancer une production pilote pour tester le produit sur le marché.',
        startDate: new Date('2023-11-16'),
        endDate: new Date('2024-01-15'),
        status: 'Non commencée',
      },
    ],
  },
  {
    title: 'Achat plastell (trieur de plastique par type)',
    description: "Achat d'un plastell pour trier les plastiques par type",
    category: 'Autres',
    projectType: 'Court terme',
    budget: 30000,
    startDate: new Date('2023-09-01'),
    endDate: new Date('2024-03-01'),
    status: 'En cours',
    teamMembers: ['6686899f7f0f7be0d5780338'],
    documents: ['plastell_devis.pdf'],
    stages: [
      {
        stageNumber: 1,
        title: 'Demande de devis',
        description: 'Demande de devis',
        startDate: new Date('2023-09-01'),
        endDate: new Date('2023-09-30'),
        status: 'Terminée',
      },
      {
        stageNumber: 2,
        title: 'Validation du devis',
        description:
          'Concevoir le produit en fonction des résultats de l’étude de marché.',
        startDate: new Date('2023-10-01'),
        endDate: new Date('2023-11-15'),
        status: 'Non commencée',
      },
      {
        stageNumber: 3,
        title: 'Reception de la machine',
        description: 'Reception du plastell',
        startDate: new Date('2023-11-16'),
        endDate: new Date('2024-01-15'),
        status: 'Non commencée',
      },
    ],
  },
]

export default projects
