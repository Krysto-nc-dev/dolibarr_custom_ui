import React from 'react'
import { useParams } from 'react-router-dom'

const UserInvoiceDetails = () => {

    const {id: invoiceId} = useParams()
  return (
    <div>
        <h1>Facture avec l'id : {invoiceId}</h1>
    </div>
  )
}

export default UserInvoiceDetails