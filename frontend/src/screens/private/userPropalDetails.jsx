import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetProposalDetailsQuery } from '../../slices/dolibarr/dolliProposalApiSlice'
import Loader from '../../components/shared/Loader'

const UserPropalDetails = () => {
  const { id: propalId } = useParams()

  const { data: propal, error, isLoading } = useGetProposalDetailsQuery(propalId)

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (
      <p className="text-red-500">
        {typeof error.data.message === 'string' ? error.data.message : 'Une erreur est survenue'}
      </p>
    )
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-primaryColor">Détails du Devis</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-primaryColor mb-4">Référence: {propal.ref}</h2>
        <p className="text-lg text-gray-700 mb-2"><strong>Statut:</strong> {propal.statut_libelle}</p>
        <p className="text-lg text-gray-700 mb-2"><strong>Condition de règlement:</strong> {propal.cond_reglement_doc}</p>
        <p className="text-lg text-gray-700 mb-2"><strong>Raison de la demande:</strong> {propal.demand_reason}</p>
        <p className="text-lg text-gray-700 mb-2"><strong>Total HT:</strong> {Number(propal.total_ht).toLocaleString('fr-FR', { minimumFractionDigits: 0 })} XPF</p>
        <p className="text-lg text-gray-700 mb-2"><strong>Total TVA:</strong> {Number(propal.total_tva).toLocaleString('fr-FR', { minimumFractionDigits: 0 })} XPF</p>
        <p className="text-lg text-gray-700 mb-2"><strong>Total TTC:</strong> {Number(propal.total_ttc).toLocaleString('fr-FR', { minimumFractionDigits: 0 })} XPF</p>
        <p className="text-lg text-gray-700 mb-2"><strong>Date de création:</strong> {new Date(propal.date_creation * 1000).toLocaleDateString()}</p>
        <p className="text-lg text-gray-700 mb-2"><strong>Date de validation:</strong> {new Date(propal.date_validation * 1000).toLocaleDateString()}</p>

        <h3 className="text-xl font-bold text-primaryColor mt-6 mb-4">Lignes de la proposition</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className='bg-primaryColor'>
              <tr>
                <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Produit</th>
                <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Quantité</th>
                <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Prix unitaire HT</th>
                <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Total HT</th>
              </tr>
            </thead>
            <tbody>
              {propal.lines.map((line) => (
                <tr key={line.id}>
                  <td className="py-2 px-4 border-b border-gray-200">{line.product_label}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{line.qty}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{Number(line.subprice).toLocaleString('fr-FR', { minimumFractionDigits: 0 })} XPF</td>
                  <td className="py-2 px-4 border-b border-gray-200">{Number(line.total_ht).toLocaleString('fr-FR', { minimumFractionDigits: 0 })} XPF</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserPropalDetails
