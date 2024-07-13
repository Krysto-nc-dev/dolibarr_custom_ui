import React from 'react'
import { useGetMachinesQuery } from '../../slices/machineApiSlice'
import Barcode from 'react-barcode'
import { Link } from 'react-router-dom'

const UserMachinesAndMolds = () => {
  const { data: machines, error, isLoading } = useGetMachinesQuery()
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-primaryColor">Matériel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines.map(machine => (
          <div key={machine._id} className="card">
            <img src={`http://192.168.178.21:3000/uploads/${machine.images[0]}`} alt={machine.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <div className="p-4">

            <div className="flex justify-between items-center mb-2">
              <Link to={`/machine-details/${machine._id}`} className="text-xl font-bold text-primaryColor">{machine.name}</Link>
            </div>
            <p ><strong>Description:</strong> {machine.description}</p>
            <p ><strong>Catégorie:</strong> {machine.category}</p>
            <p ><strong>Type:</strong> {machine.type}</p>
            <p ><strong>Provenance:</strong> {machine.provenanceCountry}</p>
            <p ><strong>Coût Total:</strong> {machine.totalCoast} €</p>
            <p ><strong>Status:</strong> {machine.status}</p>
            <p ><strong>Heures de Fonctionnement:</strong> {machine.operatingHours}</p>
            <p ><strong>Date d'Achat:</strong> {new Date(machine.buyDate).toLocaleDateString()}</p>
            <div className="mt-4">
              <Barcode value={machine.barcode} width={1} height={50} fontSize={14} />
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default UserMachinesAndMolds
