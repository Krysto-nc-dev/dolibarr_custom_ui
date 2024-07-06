const events = [
  {
    title: "Réunion d'équipe",
    date: new Date(2024, 6, 15, 10, 0),
    duration: 60, // 1 hour
    description: 'Réunion hebdomadaire pour discuter des projets en cours.',
    user: '6686899f7f0f7be0d5780336',
    location: 'Salle de conférence A',
    status: 'Planifié',
    priority: 'Haute',
    reminder: 15, // 15 minutes before
    attachments: [],
    meetingUrl: 'https://meet.example.com/team-meeting',
  },
  {
    title: 'Présentation client',
    date: new Date(2024, 6, 20, 14, 0),
    duration: 90, // 1.5 hours
    description: 'Présentation du nouveau produit aux clients potentiels.',
    user: '6686899f7f0f7be0d5780336',
    location: 'Bureau du client',
    status: 'Planifié',
    priority: 'Moyenne',
    reminder: 30, // 30 minutes before
    attachments: [],
    meetingUrl: '',
  },
  {
    title: "Déjeuner d'affaires",
    date: new Date(2024, 6, 25, 12, 30),
    duration: 60, // 1 hour
    description:
      'Déjeuner avec un partenaire potentiel pour discuter des opportunités de collaboration.',
    user: '6686899f7f0f7be0d5780336',
    location: 'Restaurant La Belle Vie',
    status: 'Planifié',
    priority: 'Basse',
    reminder: 10, // 10 minutes before
    attachments: [],
    meetingUrl: '',
  },
  {
    title: 'Formation interne',
    date: new Date(2024, 6, 28, 9, 0),
    duration: 120, // 2 hours
    description: "Formation sur les nouvelles procédures de l'entreprise.",
    user: '6686899f7f0f7be0d5780336',
    location: 'Salle de formation B',
    status: 'Planifié',
    priority: 'Moyenne',
    reminder: 20, // 20 minutes before
    attachments: [],
    meetingUrl: '',
  },
  {
    title: 'Revue trimestrielle',
    date: new Date(2024, 7, 5, 15, 0),
    duration: 120, // 2 hours
    description:
      'Revue des résultats du trimestre et planification pour le prochain trimestre.',
    user: '6686899f7f0f7be0d5780336',
    location: 'Salle de conférence A',
    status: 'Planifié',
    priority: 'Haute',
    reminder: 30, // 30 minutes before
    attachments: [],
    meetingUrl: 'https://meet.example.com/quarterly-review',
  },
]

export default events
