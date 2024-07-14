import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  useGetCashierByIdQuery,
  useAddSaleMutation,
} from '../../slices/cashierApiSlice'
import { Loader } from 'lucide-react'
import { useGetProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice'

const UserCashierDetailsScreen = () => {
  const { id: cashierId } = useParams()

  // State to manage form data
  const [formData, setFormData] = useState({
    clientFirstname: '',
    clientLastname: '',
    clientMail: '',
    clientCity: '',
    touriste: false,
    clientCountry: 'Nouvelle-Calédonie',
    products: [],
  })

  // Hooks to fetch cashier details by ID and list of products
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

  // Hook to add a sale
  const [addSale, { isLoading: addingSale }] = useAddSaleMutation()

  // Update formData.products when products change
  useEffect(() => {
    if (products) {
      const initialProductsState = products.map((product) => ({
        productId: product.id,
        unitPrice: parseFloat(product.price) || 0, // Handle cases where price might be undefined or NaN
        quantity: 0,
        subTotal: 0,
      }))
      setFormData((prevState) => ({
        ...prevState,
        products: initialProductsState,
      }))
    }
  }, [products])

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }))
  }

  // Function to handle product change with quantity
  const handleProductChange = (productId, unitPriceStr, quantity) => {
    const unitPrice = parseFloat(unitPriceStr)

    const updatedProducts = formData.products.map((product) => {
      if (product.productId === productId) {
        return {
          ...product,
          quantity,
          subTotal: unitPrice * quantity,
        }
      }
      return product
    })

    setFormData((prevState) => ({
      ...prevState,
      products: updatedProducts,
    }))
  }

  // Function to submit the sale form
  const handleSubmitSale = async (e) => {
    e.preventDefault()
    try {
      await addSale({ cashierId, sale: formData })
      // Refresh cashier details after adding the sale
      // You can add logic here to refresh the data
    } catch (error) {
      console.error('Error adding sale:', error)
    }
  }

  // Display loader while loading data
  if (loadingCashierDetails || loadingProducts) {
    return <Loader />
  }

  // Handle errors if the request fails
  if (errorCashierDetails || productError) {
    return (
      <div className="mx-auto p-4 text-red-500">
        Error: {errorCashierDetails?.message || productError?.message}
      </div>
    )
  }

  // Display cashier details if data is loaded
  return (
    <div className="mx-auto p-4">
      <div className="bg-gray-700 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-5">
          <div>{cashierDetails && cashierDetails.tierId}</div>
          <div className="mb-4">
            <span
              className={`px-2 py-1 rounded ${
                cashierDetails.status === 'Ouvert'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {cashierDetails.status === 'Ouvert' ? 'Ouvert' : 'Fermé'}
            </span>
          </div>
        </div>
        <div className="mb-4 text-sm flex justify-between">
          <div>Date :</div>
          <div>
            {cashierDetails &&
              cashierDetails.date &&
              new Date(cashierDetails.date).toLocaleDateString()}
          </div>
        </div>
        <div className="mb-4 flex justify-between">
          <div>Chiffre d'affaires</div>
          <div>
            {cashierDetails && Math.floor(cashierDetails.totalSales)} XPF
          </div>
        </div>
        <div className="mb-4">
          {cashierDetails &&
            cashierDetails.sales &&
            cashierDetails.sales.map((sale, index) => (
              <div
                key={index}
                className="border rounded-md border-primaryColor p-4 mb-4"
              >
                <div className="flex justify-between mb-2">
                  <div className="text-sm">
                    <strong className="">Client:</strong> {sale.clientFirstname}{' '}
                    {sale.clientLastname}
                  </div>
                  <div className="text-sm mb-2">
                    <strong>Email:</strong> {sale.clientMail}
                  </div>
                  <div className="text-sm">
                    <strong>Ville:</strong> {sale.clientCity}
                  </div>
                </div>
                {sale.products && sale.products.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Nom Produit
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Référence
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Prix Unitaire
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Quantité
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Sous-total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sale.products.map((product, prodIndex) => {
                        const matchedProduct = products.find(
                          (p) => p.id === product.productId,
                        )
                        if (!matchedProduct) return null // Handle case where product not found

                        return (
                          <tr key={prodIndex}>
                            <td className="px-3 py-2 whitespace-nowrap">
                              {matchedProduct.label}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              {matchedProduct.ref}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              {Math.floor(product.unitPrice)} XPF
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              {product.quantity}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              {Math.floor(product.subTotal)} XPF
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-sm text-red-500">
                    Aucun produit trouvé pour cette vente.
                  </div>
                )}
                <div className="flex justify-end mt-2">
                  <strong className="text-green-500">
                    Total: {Math.floor(sale.totalPrice)} XPF
                  </strong>
                </div>
              </div>
            ))}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Ajouter une vente</h3>
          <form onSubmit={handleSubmitSale}>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <label
                  htmlFor="clientFirstname"
                  className="block text-sm font-medium text-gray-100"
                >
                  Prénom
                </label>
                <input
                  type="text"
                  id="clientFirstname"
                  name="clientFirstname"
                  value={formData.clientFirstname}
                  onChange={handleChange}
                  required
                  className="mt-1 bg-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="clientLastname"
                  className="block text-sm font-medium text-gray-100"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="clientLastname"
                  name="clientLastname"
                  value={formData.clientLastname}
                  onChange={handleChange}
                  required
                  className="mt-1 bg-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="clientMail"
                  className="block text-sm font-medium text-gray-100"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="clientMail"
                  name="clientMail"
                  value={formData.clientMail}
                  onChange={handleChange}
                  required
                  className="mt-1 bg-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="clientCity"
                  className="block text-sm font-medium text-gray-100"
                >
                  Ville
                </label>
                <input
                  type="text"
                  id="clientCity"
                  name="clientCity"
                  value={formData.clientCity}
                  onChange={handleChange}
                  required
                  className="mt-1 bg-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="touriste" className="flex items-center">
                  <input
                    type="checkbox"
                    id="touriste"
                    name="touriste"
                    checked={formData.touriste}
                    onChange={handleChange}
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-sm text-gray-100">
                    Client Touriste
                  </span>
                </label>
              </div>
              <div>
                <label
                  htmlFor="clientCountry"
                  className="block text-sm font-medium text-gray-100"
                >
                  Pays
                </label>
                <select
                  id="clientCountry"
                  name="clientCountry"
                  value={formData.clientCountry}
                  onChange={handleChange}
                  className="mt-1   block w-full pl-3 pr-10 py-2 text-base bg-gray-500 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {[
                    'Australie',
                    'France',
                    'Nouvelle-Zélande',
                    'Chine',
                    'Japon',
                    'Autres',
                    'Nouvelle-Calédonie',
                  ].map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Produits
              </label>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-3 items-center mb-2"
                >
                  <label
                    htmlFor={`product-${product.id}`}
                    className="ml-2 block text-sm text-gray-100 col-span-2"
                  >
                    {product.label} -{' '}
                    {product.price !== undefined
                      ? `${Math.floor(parseFloat(product.price))} XPF`
                      : 'Prix non disponible'}
                  </label>
                  <select
                    id={`product-${product.id}`}
                    name={`product-${product.id}`}
                    onChange={(e) => {
                      const quantity = parseInt(e.target.value, 10)
                      handleProductChange(product.id, product.price, quantity)
                    }}
                    className="ml-2 block text-sm bg-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md col-span-1"
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex w-full items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {addingSale ? 'Ajout en cours...' : 'Ajouter la vente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserCashierDetailsScreen
