import asyncHandler from '../middleware/asyncHandler.js'
import Cashier from '../models/CashierModel.js'

// @desc    Create a new cashier record
// @route   POST /api/cashiers
// @access  Public
const createCashier = asyncHandler(async (req, res) => {
  const { date, tierId, status } = req.body // Assurez-vous de récupérer tierId et status depuis req.body

  try {
    // Vérifier si un enregistrement de caissier existe déjà pour cette date
    const existingCashier = await Cashier.findOne({ date })

    if (existingCashier) {
      res.status(400)
      throw new Error('Cashier record already exists for this date')
    }

    // Créer un nouvel objet de caissier avec toutes les données nécessaires
    const cashier = new Cashier({
      date,
      sales: [],
      totalDaySales: 0,
      totalSales: 0,
      tierId,
      status,
    })

    // Sauvegarder le nouveau caissier créé dans la base de données
    const createdCashier = await cashier.save()
    res.status(201).json(createdCashier)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @desc    Get all cashier records
// @route   GET /api/cashiers
// @access  Public
const getCashiers = asyncHandler(async (req, res) => {
  try {
    const cashiers = await Cashier.find()
    res.status(200).json(cashiers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @desc    Get cashier record by ID
// @route   GET /api/cashiers/:id
// @access  Public
const getCashierById = asyncHandler(async (req, res) => {
  try {
    const cashier = await Cashier.findById(req.params.id)

    if (cashier) {
      res.status(200).json(cashier)
    } else {
      res.status(404)
      throw new Error('Cashier not found')
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @desc    Update cashier record
// @route   PUT /api/cashiers/:id
// @access  Public
const updateCashier = asyncHandler(async (req, res) => {
  const { date, sales, totalDaySales, tierId, status } = req.body

  try {
    const cashier = await Cashier.findById(req.params.id)

    if (cashier) {
      cashier.date = date || cashier.date
      cashier.sales = sales || cashier.sales
      cashier.totalDaySales = totalDaySales || cashier.totalDaySales
      cashier.tierId = tierId || cashier.tierId
      cashier.status = status || cashier.status

      const updatedCashier = await cashier.save()
      res.status(200).json(updatedCashier)
    } else {
      res.status(404)
      throw new Error('Cashier not found')
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @desc    Delete cashier record
// @route   DELETE /api/cashiers/:id
// @access  Public
const deleteCashier = asyncHandler(async (req, res) => {
  try {
    const cashier = await Cashier.findById(req.params.id)

    if (cashier) {
      await cashier.deleteOne()
      res.status(200).json({ message: 'Cashier removed' })
    } else {
      res.status(404)
      throw new Error('Cashier not found')
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

const addSale = asyncHandler(async (req, res) => {
  const { cashierId } = req.params
  const { sale } = req.body

  if (!sale || !Array.isArray(sale.products)) {
    res.status(400)
    throw new Error('Invalid sale data: sale and sale.products are required')
  }

  try {
    const cashier = await Cashier.findById(cashierId)

    if (!cashier) {
      res.status(404)
      throw new Error('Cashier not found')
    }

    // Filtrer les produits avec une quantité de 0
    sale.products = sale.products.filter((product) => product.quantity > 0)

    if (sale.products.length === 0) {
      res.status(400)
      throw new Error('No valid products in the sale')
    }

    // Recalculer subTotal pour chaque produit dans la vente
    sale.products.forEach((product) => {
      product.subTotal = product.unitPrice * product.quantity
    })

    // Ajouter la vente au caissier
    cashier.sales.push(sale)

    // Sauvegarder le caissier mis à jour dans la base de données
    const updatedCashier = await cashier.save()
    res.status(201).json(updatedCashier)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export {
  createCashier,
  getCashiers,
  getCashierById,
  updateCashier,
  deleteCashier,
  addSale,
}
