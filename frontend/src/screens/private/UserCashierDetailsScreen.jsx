import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from 'lucide-react'
import {
  useGetCashierByIdQuery,
  useAddSaleMutation,
} from '../../slices/cashierApiSlice'
import { useGetProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice'
import { toast } from 'react-toastify'

const UserCashierDetailsScreen = () => {
  const { id: cashierId } = useParams()

  const [formData, setFormData] = useState({
    clientFirstname: '',
    clientLastname: '',
    clientMail: '',
    clientCity: '',
    touriste: false,
    clientCountry: 'Nouvelle-Calédonie',
    paymentMethod: 'Espèces',
    products: [],
  })

  const {
    data: cashierDetails,
    error: errorCashierDetails,
    isLoading: loadingCashierDetails,
  } = useGetCashierByIdQuery(cashierId)

  const {
    data: products,
    error: productError,
    isLoading: loadingProducts,
  } = useGetProductsQuery({
    mode: '1',
    variant_filter: '1',
  })

  const [addSale, { isLoading: addingSale }] = useAddSaleMutation()

  useEffect(() => {
    if (products) {
      const initialProductsState = products.map((product) => ({
        productId: product.id,
        unitPrice: parseFloat(product.price) || 0,
        quantity: 0,
        subTotal: 0,
        label: product.label,
        ref: product.ref,
      }))
      setFormData((prevState) => ({
        ...prevState,
        products: initialProductsState,
      }))
    }
  }, [products])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }))
  }

  const handleProductChange = (productId, unitPriceStr, quantity) => {
    const unitPrice = parseFloat(unitPriceStr)

    const updatedProducts = formData.products.map((product) =>
      product.productId === productId
        ? { ...product, quantity, subTotal: unitPrice * quantity }
        : product,
    )

    setFormData((prevState) => ({
      ...prevState,
      products: updatedProducts,
    }))
  }

  const calculateTotalSale = () => {
    return formData.products.reduce(
      (total, product) => total + product.subTotal,
      0,
    )
  }
  const getProductLabel = (productId) => {
    const product = products.find((p) => p.id === productId)
    return product ? product.label : 'Produit inconnu'
  }

  const handleSubmitSale = async (e) => {
    e.preventDefault()

    const filteredProducts = formData.products
      .filter((product) => product.quantity > 0)
      .map((product) => ({
        productID: product.productId,
        unitPrice: product.unitPrice,
        quantity: product.quantity,
      }))

    const saleData = {
      sale: {
        clientFirstname: formData.clientFirstname,
        clientLastname: formData.clientLastname,
        clientMail: formData.clientMail,
        clientCity: formData.clientCity,
        touriste: formData.touriste,
        clientCountry: formData.clientCountry,
        title: 'Achat divers', // Ajoutez le titre si nécessaire
        products: filteredProducts,
      },
    }

    try {
      await addSale({ cashierId, sale: saleData })
      console.log('Sale added successfully')
      toast.success('Vente ajoutée avec succée.');
      // Réinitialiser le formulaire après l'ajout réussi
      setFormData({
        clientFirstname: '',
        clientLastname: '',
        clientMail: '',
        clientCity: '',
        touriste: false,
        clientCountry: 'Nouvelle-Calédonie',
        paymentMethod: 'Espèces',
        products: formData.products.map((product) => ({
          ...product,
          quantity: 0,
          subTotal: 0,
        })),
      })
    } catch (error) {
      console.error('Error adding sale:', error)
      toast.error('Une erreur est survenue lors de la création de la caisse.');
    }
  }

  if (loadingCashierDetails || loadingProducts) {
    return <Loader />
  }

  const placePrice = cashierDetails && cashierDetails.placePrice
  const totalSales = cashierDetails && cashierDetails.totalSales

  // Calculer le pourcentage du chiffre d'affaires par rapport au prix de la place
  const progressPercentage = (totalSales / placePrice) * 100

  let realGain = totalSales - placePrice
  let realGainClass = realGain >= 0 ? 'text-green-500' : 'text-red-500'

  return (
    <div className="mx-auto p-4 max-w-9xl">
      <div className="rounded-lg shadow-md p-6 bg-gray-700 text-textColor">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-primaryColor">
                {progressPercentage.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-6 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${progressPercentage}%` }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap justify-center ${
                progressPercentage >= 100
                  ? 'bg-green-500'
                  : progressPercentage >= 50
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              } text-white`}
            ></div>
          </div>
         
        </div>
        <div className="flex justify-between items-center mb-5">
          <div className="text-gray-200">
             {cashierDetails && cashierDetails.title}
          </div>
          <div className="mb-4">
            <span
              className={`px-2 py-1 rounded ${
                cashierDetails && cashierDetails.status === 'Ouvert'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {cashierDetails && cashierDetails.status === 'Ouvert'
                ? 'Ouvert'
                : 'Fermé'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmitSale}>
          <details className="group">
            <summary className="font-medium cursor-pointer text-lg">
              Informations du Client
            </summary>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-textColor text-sm">
                  Prénom du Client
                </label>
                <input
                  type="text"
                  name="clientFirstname"
                  value={formData.clientFirstname}
                  onChange={handleChange}
                  className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-textColor text-sm">
                  Nom du Client
                </label>
                <input
                  type="text"
                  name="clientLastname"
                  value={formData.clientLastname}
                  onChange={handleChange}
                  className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-textColor text-sm">
                  Email du Client
                </label>
                <input
                  type="email"
                  name="clientMail"
                  value={formData.clientMail}
                  onChange={handleChange}
                  className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-textColor text-sm">
                  Ville du Client
                </label>
                <input
                  type="text"
                  name="clientCity"
                  value={formData.clientCity}
                  onChange={handleChange}
                  className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-textColor text-sm">
                  Pays du Client
                </label>
                <input
                  type="text"
                  name="clientCountry"
                  value={formData.clientCountry}
                  onChange={handleChange}
                  className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-textColor text-sm">Touriste</label>
                <input
                  type="checkbox"
                  name="touriste"
                  checked={formData.touriste}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>
            </div>
          </details>
          <div className="mt-6">
            <label className="block text-textColor text-sm">
              Mode de Paiement
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
            >
              <option value="Espèces">Espèces</option>
              <option value="Carte bancaire">Carte bancaire</option>
              <option value="Chèque">Chèque</option>
            </select>
          </div>
          <div className="mt-6 text-textColor text-lg">
            Total de la Vente: {calculateTotalSale()} XPF
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-4 py-2 bg-primaryColor text-white rounded ${
                addingSale ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={addingSale}
            >
              Ajouter la vente
            </button>
          </div>
          <div className="space-y-4"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6"></div>
          <div className="space-y-4">
            {formData.products.map((product, index) => (
              <div
                key={product.productId}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end"
              >
                
                <div>
                  <label className="block text-textColor text-sm">
                    Produit
                  </label>
                  <input
                    type="text"
                    value={product.label}
                    disabled
                    className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-textColor text-sm">
                    Prix unitaire (XPF)
                  </label>
                  <input
                    type="number"
                    value={product.unitPrice}
                    onChange={(e) =>
                      handleProductChange(
                        product.productId,
                        e.target.value,
                        product.quantity,
                      )
                    }
                    className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-textColor text-sm">
                    Quantité
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={product.quantity}
                    onChange={(e) =>
                      handleProductChange(
                        product.productId,
                        product.unitPrice,
                        parseInt(e.target.value),
                      )
                    }
                    className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className="mb-6">
        {cashierDetails &&
        cashierDetails.sales &&
        cashierDetails.sales.length > 0 ? (
          <ul className="space-y-4 mt-3">
            {cashierDetails.sales.map((sale) => (
              <li key={sale.id} className="p-4 bg-gray-800 rounded-lg">
                <div className="flex justify-between mb-2 text-sm">
                  <div>
                    {sale.clientFirstname} {sale.clientLastname}
                  </div>
                  <div>{new Date(cashierDetails.date).toLocaleDateString()}</div>
                </div>
                <div className="text-sm text-gray-400">{sale.clientMail}</div>
                <div className="text-sm text-gray-400">
                  {sale.clientCity}, {sale.clientCountry}
                </div>
                <div className="text-sm text-gray-400">
                  {sale.touriste ? 'Client Touriste' : ' Client Local'}
                </div>
                <div className="mt-2 text-sm">
                  <h3 className="font-medium">Produits :</h3>
                  <ul className="pl-4 list-disc list-inside">
                    {sale.products.map((product) => (
                      <li
                        key={product.productID}
                        className="flex justify-between"
                      >
                        <p>
                          {getProductLabel(product.productID)} -{' '}
                          {product.quantity} x {product.unitPrice} XPF{' '}
                        </p>
                        <p>sous-total = {product.subTotal} XPF</p>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Calculer et afficher le total basé sur les sous-totaux */}
                <div className="mt-2 text-sm font-medium">
                  Total :{' '}
                  {sale.products.reduce(
                    (total, product) => total + product.subTotal,
                    0,
                  )}{' '}
                  XPF
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-red-300 text-center text-2xl mt-3">
            Aucune vente réalisée pour le moment.
          </div>
        )}
      </div>
      <div className="mb-4 text-sm flex justify-between text-textColor"></div>
      <div className="mb-4 flex justify-between text-textColor">
        <div>Prix de l'inscription</div>
        <div>{cashierDetails && cashierDetails.placePrice} XPF</div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between mb-2 text-textColor">
          <div>Chiffre d'affaires</div>
          <div>
            {cashierDetails && Math.floor(cashierDetails.totalSales)} XPF
          </div>
        </div>
        {progressPercentage >= 100 ? (
            <div className="text-xl font-medium text-center text-textColor">
              Gain réel :{' '}
              <span className={realGainClass}>{Math.floor(realGain)} XPF</span>
            </div>
          ) : (
            <div className="text-xl font-medium text-center text-textColor">
              Montant restant à atteindre pour gagner de l'argent :{' '}
              <span className="text-red-500">
                {Math.floor(placePrice - totalSales)} XPF
              </span>
            </div>
          )}
      </div>
<div className='flex justify-center items-center'>

      <button className='bg-dangerColor py-1 px-6 rounded-md text-gray-100 font-bold' >Fermer la caisse et enregister les ventes</button>
</div>
    </div>
  )
}

export default UserCashierDetailsScreen
