import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetCashierByIdQuery } from '../../slices/cashierApiSlice'
import { Loader } from 'lucide-react'
import { useGetProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice'
import { useGetThirdPartyDetailsQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice'

const UserCashierDetailsScreen = () => {
  const { id: cashierId } = useParams()

  // Utilisation du hook pour récupérer les détails du caissier par ID
  const {
    data: cashierDetails,
    error: errorCashierDetails,
    isLoading: loadingCashierDetails,
  } = useGetCashierByIdQuery(cashierId)
  const {
    data: products,
    error: errorProducts,
    isLoading: loadingProducts,
  } = useGetProductsQuery()
  const {
    data: tier,
    error: errorTier,
    isLoading: loadingTier,
  } = useGetThirdPartyDetailsQuery(cashierDetails.tierId) // Récupération des détails du tiers

  if (loadingCashierDetails || loadingProducts || loadingTier) {
    return <Loader /> // Affichage d'un loader pendant le chargement des données
  }

  if (errorCashierDetails || errorProducts || errorTier) {
    return (
      <div className="mx-auto p-4 text-red-500">
        Error: {errorCashierDetails && errorCashierDetails.message}{' '}
        {errorProducts && errorProducts.message}{' '}
        {errorTier && errorTier.message}
      </div>
    ) // Gestion de l'erreur si la requête échoue
  }

  // Fonction pour récupérer le nom et la référence du produit à partir de son ID
  const getProductDetailsById = (productId) => {
    const product = products.find((prod) => prod.id === productId)
    return product
      ? { name: product.label, reference: product.ref }
      : { name: 'Produit inconnu', reference: 'Référence inconnue' }
  }

  // Si les données sont chargées et qu'il n'y a pas d'erreur, afficher les détails du caissier
  return (
    <div className="mx-auto p-4">
      <div className="bg-gray-700 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-5">
          <div>{tier.name}</div>

          <div className="mb-4">
            <span
              className={`px-2 py-1 rounded ${
                cashierDetails.status === 'ouvert'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {cashierDetails.status === 'ouvert' ? 'Ouvert' : 'Fermé'}
            </span>
          </div>
        </div>
        <div className="mb-4  text-sm flex justify-between">
          <div>Date :</div>
          <div>{new Date(cashierDetails.date).toLocaleDateString()}</div>
        </div>
        <div className="mb-4  flex justify-between ">
          <div>Chiffre d'affaires</div>
          <div>{cashierDetails.totalSales} XPF</div>
        </div>

        <div className="mb-4">
          {cashierDetails.sales.map((sale, index) => (
            <div
              key={index}
              className="border rounded-md border-primaryColor p-4 mb-4"
            >
              <div className="flex justify-between mb-2">
                <div className="text-sm">
                  <strong className=''>Client:</strong> {sale.clientFirstname}{' '}
                  {sale.clientLastname}
                </div>

                <div className="text-sm mb-2">
                  <strong>Email:</strong> {sale.clientMail}
                </div>
                <div className="text-sm">
                  <strong>Ville:</strong> {sale.clientCity}
                </div>
              </div>

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
                    const { name, reference } = getProductDetailsById(
                      product.productID,
                    )
                    return (
                      <tr key={prodIndex}>
                        <td className="px-3 py-2 whitespace-nowrap">{name}</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {reference}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {product.unitPrice} XPF
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {product.quantity}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {product.subTotal} XPF
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="flex justify-end mt-2">
                <strong className="text-green-500">
                  Total: {sale.totalPrice} XPF
                </strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserCashierDetailsScreen
