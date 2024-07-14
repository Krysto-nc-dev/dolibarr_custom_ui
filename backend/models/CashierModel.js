import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  subTotal: {
    type: Number,
    required: true,
  },
})

const saleSchema = new mongoose.Schema(
  {
    clientMail: {
      type: String,
    },
    clientFirstname: {
      type: String,
    },
    clientLastname: {
      type: String,
    },
    clientCity: {
      type: String,
    },
    touriste: {
      type: Boolean,
      default: false,
    },
    clientCountry: {
      type: String,
      enum: [
        'Australie',
        'France',
        'Nouvelle-Zelande',
        'Chine',
        'Japon',
        'Autres',
        'Nouvelle-Calédonie',
      ],
      required: true,
      default: 'Nouvelle-Calédonie',
    },
    title: {
      type: String,
      required: true,
    },
    products: [productSchema], // Utilisation du schéma de produit défini
    totalPrice: {
      type: Number,
      default: 0, // Supprimez la contrainte `required` et définissez la valeur par défaut à 0
    },
  },
  { timestamps: true },
)

const cashierSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    sales: [saleSchema], // Tableau des ventes réalisées dans la journée
    totalDaySales: {
      type: Number,
      default: 0, // Initialisation du total à zéro
    },
    totalSales: {
      type: Number,
      default: 0, // Initialisation du total des ventes
    },
    tierId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Ouvert', 'Fermé'],
      required: true,
      default: 'Ouvert',
    },
  },
  { timestamps: true },
)

// Middleware pour calculer le total des ventes à chaque enregistrement d'une nouvelle vente
cashierSchema.pre('validate', function (next) {
  let totalDaySales = 0
  let totalSales = 0

  this.sales.forEach((sale) => {
    let saleTotal = 0

    // Filtrer les produits avec une quantité de 0
    sale.products = sale.products.filter((product) => product.quantity > 0)

    sale.products.forEach((product) => {
      product.subTotal = product.unitPrice * product.quantity // Calcul du sous-total pour chaque produit
      saleTotal += product.subTotal
    })

    sale.totalPrice = saleTotal
    totalDaySales += saleTotal
  })

  this.totalDaySales = totalDaySales

  this.sales.forEach((sale) => {
    totalSales += sale.totalPrice
  })

  this.totalSales = totalSales

  next()
})

const Cashier = mongoose.model('Cashier', cashierSchema)

export default Cashier
