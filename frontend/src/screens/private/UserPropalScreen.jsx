import React from 'react'
import { useGetProposalsQuery } from '../../slices/dolibarr/dolliProposalApiSlice'
import Loader from '../../components/shared/Loader'
import { Link } from 'react-router-dom'

const UserPropalScreen = () => {
  const { data: propals, isLoading, error } = useGetProposalsQuery()

  console.log(propals)

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

  const getStatusText = (status) => {
    switch (status) {
      case 4:
        return 'Facturé'
      case 0:
        return 'Brouillon'
      default:
        return 'Inconnu'
    }
  }

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-primaryColor">Propositions commerciales ({propals.length})</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className='bg-primaryColor'>
            <tr>
              <th className="py-2 px-4  text-left text-xs font-semibold text-white uppercase tracking-wider">Référence</th>
              <th className="py-2 px-4  text-left text-xs font-semibold text-white uppercase tracking-wider">Statut</th>
              <th className="py-2 px-4  text-left text-xs font-semibold text-white uppercase tracking-wider">Total HT</th>
              <th className="py-2 px-4  text-left text-xs font-semibold text-white uppercase tracking-wider">Total TVA</th>
              <th className="py-2 px-4  text-left text-xs font-semibold text-white uppercase tracking-wider">Total TTC</th>
              <th className="py-2 px-4  text-left text-xs font-semibold text-white uppercase tracking-wider">Date de validation</th>
            </tr>
          </thead>
          <tbody>
            {propals.map((propal) => (
              <tr key={propal.id} className='bg-gray-700 hover:bg-gray-500'>
                <td className="py-2 px-4 ">
                  <Link to={`/propal-details/${propal.id}`}>
                    {propal.ref}
                  </Link>
                </td>
                <td className="py-2 px-4 ">
                 <span className='bg-primaryColor py-1 px-3 rounded-full text-white font-bold'>{getStatusText(propal.status)} </span> </td>
                <td className="py-2 px-4 ">{parseFloat(propal.total_ht).toLocaleString('fr-FR', { minimumFractionDigits: 0 })} XPF</td>
                <td className="py-2 px-4 ">{parseFloat(propal.total_tva).toLocaleString('fr-FR', { minimumFractionDigits: 0 })} XPF</td>
                <td className="py-2 px-4 ">{parseFloat(propal.total_ttc).toLocaleString('fr-FR', { minimumFractionDigits: 0 })} XPF</td>
                <td className="py-2 px-4 ">
                  {propal.status === 4 ? new Date(propal.date_validation * 1000).toLocaleDateString('fr-FR') : 'Non validée'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserPropalScreen
