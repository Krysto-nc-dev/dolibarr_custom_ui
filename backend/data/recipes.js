const recipes = [
  {
    title: 'Recette de couleur bleue',
    description:
      'Mélange de différentes couleurs pour obtenir une teinte bleue.',
    colors: [
      { colorId: '737a3694e5fc335f796a4924', percentage: 50 }, // Bleu Clair
      { colorId: '737a3694e5fc335f796a4921', percentage: 30 }, // Blanc
      { colorId: '737a3694e5fc335f796a4922', percentage: 20 }, // Noir
    ],
    productionType: 'injection',
    user: '6686899f7f0f7be0d5780336',
    images: [
      'https://images.unsplash.com/photo-1588421357574-87938a86fa28?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1601436155198-2ebfea8117b0?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    title: 'Recette de couleur verte',
    description:
      'Mélange de différentes couleurs pour obtenir une teinte verte.',
    colors: [
      { colorId: '737a3694e5fc335f796a4928', percentage: 60 }, // Vert
      { colorId: '737a3694e5fc335f796a4927', percentage: 25 }, // Jaune
      { colorId: '737a3694e5fc335f796a4922', percentage: 15 }, // Noir
    ],
    productionType: 'extrusion',
    user: '6686899f7f0f7be0d5780336',
    images: [
      'https://images.unsplash.com/photo-1561016444-14f747499547?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1666836046442-70ebab318a76?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    title: 'Recette de couleur rouge',
    description:
      'Mélange de différentes couleurs pour obtenir une teinte rouge.',
    colors: [
      { colorId: '737a3694e5fc335f796a4923', percentage: 70 }, // Rouge
      { colorId: '737a3694e5fc335f796a4921', percentage: 20 }, // Blanc
      { colorId: '737a3694e5fc335f796a4922', percentage: 10 }, // Noir
    ],
    productionType: 'compression',
    user: '6686899f7f0f7be0d5780336',
    images: [
      'https://images.unsplash.com/photo-1595757816291-ab4c1cba0fc2?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1504537103742-67c282f65f24?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    title: 'Recette de couleur jaune',
    description:
      'Mélange de différentes couleurs pour obtenir une teinte jaune.',
    colors: [
      { colorId: '737a3694e5fc335f796a4927', percentage: 80 }, // Jaune
      { colorId: '737a3694e5fc335f796a4921', percentage: 10 }, // Blanc
      { colorId: '737a3694e5fc335f796a4922', percentage: 10 }, // Noir
    ],
    productionType: 'injection',
    user: '6686899f7f0f7be0d5780336',
    images: [
      'https://images.unsplash.com/flagged/photo-1593005510329-8a4035a7238f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1615457938971-3ab61c1c0d57?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    title: 'Recette de couleur noire',
    description:
      'Mélange de différentes couleurs pour obtenir une teinte noire.',
    colors: [
      { colorId: '737a3694e5fc335f796a4922', percentage: 90 }, // Noir
      { colorId: '737a3694e5fc335f796a4924', percentage: 5 }, // Bleu Clair
      { colorId: '737a3694e5fc335f796a4923', percentage: 5 }, // Rouge
    ],
    productionType: 'extrusion',
    user: '6686899f7f0f7be0d5780336',
    images: [
      'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1618022325802-7e5e732d97a1?q=80&w=1048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
]

export default recipes
