const cashiers = [
  {
    date: new Date('2024-07-01'),
    tierId: '36',
    status: 'Fermé',
    sales: [
      {
        clientMail: 'client1@example.com',
        clientFirstname: 'John',
        clientLastname: 'Doe',
        clientCity: 'Nouméa',
        touriste: false,
        clientCountry: 'Nouvelle-Calédonie',
        title: 'Vente du 1er juillet',
        products: [
          { productID: '119', unitPrice: 400, quantity: 4, subTotal: 1600 },
          { productID: '120', unitPrice: 5900, quantity: 1, subTotal: 5900 },
        ],
        // totalPrice: 35, // Calculé automatiquement par le middleware
      },
      {
        clientMail: 'client2@example.com',
        clientFirstname: 'Jane',
        clientLastname: 'Smith',
        clientCity: 'Paris',
        touriste: true,
        clientCountry: 'France',
        title: 'Vente du 1er juillet',
        products: [
          { productID: '103', unitPrice: 700, quantity: 3, subTotal: 2100 },
          { productID: '72', unitPrice: 300, quantity: 1, subTotal: 300 },
        ],
        // totalPrice: 34, // Calculé automatiquement par le middleware
      },
    ],
    // totalDaySales: 69, // Calculé automatiquement par le middleware
  },
  {
    date: new Date('2024-07-02'),
    tierId: '55',
    status: 'Fermé',
    sales: [
      {
        clientMail: 'client3@example.com',
        clientFirstname: 'Emily',
        clientLastname: 'Brown',
        clientCity: 'Mont-Dore',
        touriste: false,
        clientCountry: 'Nouvelle-Calédonie',
        title: 'Vente du 2 juillet',
        products: [
          { productID: '97', unitPrice: 500, quantity: 2, subTotal: 1000 },
          { productID: '102', unitPrice: 800, quantity: 2, subTotal: 1600 },
        ],
        // totalPrice: 46, // Calculé automatiquement par le middleware
      },
      {
        clientMail: 'client4@example.com',
        clientFirstname: 'Stoyann',
        clientLastname: 'VELTEN',
        clientCity: 'Nouméa',
        touriste: false,
        clientCountry: 'Nouvelle-Calédonie',
        title: 'Vente du 2 juillet',
        products: [
          { productID: '102', unitPrice: 800, quantity: 1, subTotal: 800 },
          { productID: '109', unitPrice: 200, quantity: 5, subTotal: 1000 },
        ],
        // totalPrice: 60, // Calculé automatiquement par le middleware
      },
    ],
    // totalDaySales: 96, // Calculé automatiquement par le middleware
  },
  // Ajoutez d'autres enregistrements de caisse si nécessaire
]

export default cashiers
