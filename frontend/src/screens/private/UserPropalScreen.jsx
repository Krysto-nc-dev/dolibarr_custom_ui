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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-primaryColor">Propositions commercial ({propals.length})</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className='bg-primaryColor'>
            <tr>
              <th className="py-2 px-4  text-left text-xs font-semibold text-white uppercase tracking-wider">Référence</th>
              <th className="py-2 px-4  text-left text-xs font-semibold text-white uppercase tracking-wider">Statut</th>
              <th className="py-2 px-4  text-left text-xs font-semibold text-white uppercase tracking-wider">Condition de règlement</th>
              <th className="py-2 px-4  text-left text-xs font-semibold text-white uppercase tracking-wider">Raison de la demande</th>
              <th className="py-2 px-4  text-left text-xs font-semibold text-white uppercase tracking-wider">Total HT</th>
              <th className="py-2 px-4  text-left text-xs font-semibold text-white uppercase tracking-wider">Total TVA</th>
              <th className="py-2 px-4  text-left text-xs font-semibold text-white uppercase tracking-wider">Total TTC</th>
            </tr>
          </thead>
          <tbody>
            {propals.map((propal) => (
              <tr key={propal.id}>
                <td className="py-2 px-4 border-b border-gray-200">
                  <Link to={`/propal-details/${propal.id}`}>
                  {propal.ref}
                  </Link>
                  </td>
                <td className="py-2 px-4 border-b border-gray-200">{propal.status}</td>
                <td className="py-2 px-4 border-b border-gray-200">{propal.cond_reglement_id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{propal.demand_reason_id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{parseFloat(propal.total_ht).toFixed(0)} XPF</td>
                <td className="py-2 px-4 border-b border-gray-200">{parseFloat(propal.total_tva).toFixed(0)} XPF</td>
                <td className="py-2 px-4 border-b border-gray-200">{parseFloat(propal.total_ttc).toFixed(0)} XPF</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserPropalScreen
