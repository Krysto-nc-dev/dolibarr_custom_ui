import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetWarehouseDetailsQuery } from '../../slices/dolibarr/dolliWarehouseApiSlice'
import { useGetStockmovementsQuery } from '../../slices/dolibarr/dolliStockmovementApiSlice'

const UserWarehouseDetailsScreen = () => {
  const { id: warehouseId } = useParams()
  const {
    data: warehouse,
    error: errorWarehouse,
    isLoading: isLoadingWarehouse,
  } = useGetWarehouseDetailsQuery(warehouseId)
  const {
    data: stockMovements,
    error: errorStockMovements,
    isLoading: isLoadingStockMovements,
  } = useGetStockmovementsQuery()

  if (isLoadingWarehouse || isLoadingStockMovements) {
    return <div>Loading...</div>
  }

  if (errorWarehouse || errorStockMovements) {
    return <div>Error loading warehouse or stock movements details.</div>
  }

  const warehouseStockMovements = stockMovements.filter(
    (movement) => movement.warehouse_id === warehouseId,
  )


  return (
    <div className="p-4 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Détails de l'entrepôt {warehouse.lieu}
      </h2>
      {warehouse && (
        <div className="space-y-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="font-semibold md:w-1/3">ID:</span>
            <span className="md:w-2/3">{warehouse.id}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="font-semibold md:w-1/3">Label:</span>
            <span className="md:w-2/3">{warehouse.label}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="font-semibold md:w-1/3">Description:</span>
            <span className="md:w-2/3">{warehouse.description}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="font-semibold md:w-1/3">Lieu:</span>
            <span className="md:w-2/3">{warehouse.lieu}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="font-semibold md:w-1/3">Address:</span>
            <span className="md:w-2/3 whitespace-pre-line">
              {warehouse.address}
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="font-semibold md:w-1/3">Town:</span>
            <span className="md:w-2/3">{warehouse.town}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="font-semibold md:w-1/3">ZIP Code:</span>
            <span className="md:w-2/3">{warehouse.zip}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="font-semibold md:w-1/3">Country Code:</span>
            <span className="md:w-2/3">{warehouse.country_code}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="font-semibold md:w-1/3">Phone:</span>
            <span className="md:w-2/3">{warehouse.phone}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="font-semibold md:w-1/3">Status:</span>
            <span className="md:w-2/3">{warehouse.statut}</span>
          </div>
        </div>
      )}

   

      <div>
        <h3 className="text-xl font-semibold mb-4">
          Mouvements de stock de l'entrepot
        </h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Type de Mouvement</th>
              <th className="py-2 px-4 bg-gray-200">ID Produit</th>
              <th className="py-2 px-4 bg-gray-200">Label</th>
              <th className="py-2 px-4 bg-gray-200">Quantité</th>
              <th className="py-2 px-4 bg-gray-200">Date</th>
            </tr>
          </thead>
          <tbody>
            {warehouseStockMovements.map((movement) => (
              <tr
                key={movement.id}
                className={
                  parseFloat(movement.qty) < 0 ? 'bg-red-50' : 'bg-green-50'
                }
              >
              
                <td
                  className={`py-2 px-4 border-b ${
                    parseFloat(movement.qty) < 0
                      ? 'text-red-700'
                      : 'text-green-700'
                  }`}
                >
                  <span
                    className={`py-2 px-3 m-auto flex items-center justify-center rounded-full font-bold ${
                      parseFloat(movement.qty) < 0
                        ? 'bg-red-300'
                        : 'bg-green-300'
                    }`}
                  >
                    {parseFloat(movement.qty) < 0 ? 'Suppression' : 'Ajout'}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <Link to={`/user-product-details/${movement.product_id}`}>{movement.product_id}</Link>
                 </td>
                <td className="py-2 px-4 border-b">{movement.label}</td>
                <td
                  className={`py-2 px-4 border-b ${
                    parseFloat(movement.qty) < 0
                      ? 'text-red-600'
                      : 'text-green-600'
                  }`}
                >
                  {movement.qty}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(movement.datem * 1000).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserWarehouseDetailsScreen
