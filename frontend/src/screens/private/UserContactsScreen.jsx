import React from 'react'
import { useGetContactsQuery } from '../../slices/dolibarr/dolliContactApiSlice'
import DataTable from '../../components/shared/DataTable'

const UserContactsScreen = () => {
  const { data: contacts, isLoading, error } = useGetContactsQuery()

  console.log(contacts)

  const columns = [
    { Header: 'Prénom', accessor: 'firstname' },
    { Header: 'Nom', accessor: 'lastname' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Adresse', accessor: 'address' },
  ]

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Gestion des contacts</h1>
      <div>
        <DataTable
          columns={columns}
          data={contacts}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  )
}

export default UserContactsScreen
