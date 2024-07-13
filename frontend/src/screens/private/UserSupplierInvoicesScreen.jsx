import React from 'react'
import { useGetSupplierInvoicesQuery } from '../../slices/dolibarr/dolliSupplierInvoiceApiSlice'
import { CircleDollarSign } from 'lucide-react'

const UserSupplierInvoicesScreen = () => {
  const {
    data: supplierInvoices,
    error: errorSupplierInvoices,
    isLoading: loadingSupplierInvoices,
  } = useGetSupplierInvoicesQuery()

  if (loadingSupplierInvoices) return <div>Loading...</div>
  if (errorSupplierInvoices) return <div>Error loading supplier invoices</div>

  // Formatage de la date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  }

  // Formatage du montant TTC en XPF avec séparateur de milliers
  const formatTotalTTC = (amount) => {
    return Number(amount).toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'XPF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  }

  // Calcul du total TTC de toutes les factures
  const totalTTC = supplierInvoices.reduce(
    (acc, invoice) => acc + parseFloat(invoice.total_ttc),
    0,
  )

  // Définition des dates de début et de fin des exercices sociaux
  const currentYear = new Date().getFullYear()
  const startCurrentFiscalYear = new Date(currentYear, 6, 1) // 1er juillet de l'année en cours
  const endCurrentFiscalYear = new Date(currentYear + 1, 5, 30, 23, 59, 59) // 30 juin de l'année prochaine

  const startPreviousFiscalYear = new Date(currentYear - 1, 6, 1) // 1er juillet de l'année précédente
  const endPreviousFiscalYear = new Date(currentYear, 5, 30, 23, 59, 59) // 30 juin de l'année en cours

  // Filtrage des factures pour l'année civile en cours
  const invoicesCurrentYear = supplierInvoices.filter((invoice) => {
    const invoiceDate = new Date(invoice.date * 1000)
    return invoiceDate.getFullYear() === currentYear
  })

  // Filtrage des factures pour l'année civile précédente
  const invoicesPreviousYear = supplierInvoices.filter((invoice) => {
    const invoiceDate = new Date(invoice.date * 1000)
    return invoiceDate.getFullYear() === currentYear - 1
  })

  // Filtrage des factures pour l'exercice social actuel
  const invoicesCurrentFiscalYear = supplierInvoices.filter((invoice) => {
    const invoiceDate = new Date(invoice.date * 1000)
    return (
      invoiceDate >= startCurrentFiscalYear &&
      invoiceDate <= endCurrentFiscalYear
    )
  })

  // Filtrage des factures pour l'exercice social précédent
  const invoicesPreviousFiscalYear = supplierInvoices.filter((invoice) => {
    const invoiceDate = new Date(invoice.date * 1000)
    return (
      invoiceDate >= startPreviousFiscalYear &&
      invoiceDate <= endPreviousFiscalYear
    )
  })

  // Calcul du total TTC des factures pour l'année civile en cours
  const totalTTCCurrentYear = invoicesCurrentYear.reduce(
    (acc, invoice) => acc + parseFloat(invoice.total_ttc),
    0,
  )

  // Calcul du total TTC des factures pour l'année civile précédente
  const totalTTCPreviousYear = invoicesPreviousYear.reduce(
    (acc, invoice) => acc + parseFloat(invoice.total_ttc),
    0,
  )

  // Calcul du total TTC des factures pour l'exercice social actuel
  const totalTTCCurrentFiscalYear = invoicesCurrentFiscalYear.reduce(
    (acc, invoice) => acc + parseFloat(invoice.total_ttc),
    0,
  )

  // Calcul du total TTC des factures pour l'exercice social précédent
  const totalTTCPreviousFiscalYear = invoicesPreviousFiscalYear.reduce(
    (acc, invoice) => acc + parseFloat(invoice.total_ttc),
    0,
  )

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Factures de fournisseur</h1>
      <div className="bg-gray-700 rounded-lg p-4 shadow-md flex items-center justify-between my-4">
        <div>
          <p className="text-textColor text-lg font-semibold">
            Total TTC de toutes les factures
          </p>
          <p className="text-gray-200">{formatTotalTTC(totalTTC)}</p>
        </div>
        <CircleDollarSign className="text-blue-500" size={32} />
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 : Total TTC de toutes les factures */}

        {/* Card 2 : Total TTC des factures pour l'année en cours */}
        <div className="bg-green-300 rounded-lg p-4 shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-700 text-sm font-semibold">
              Total des factures pour l'année en cours
            </p>
            <p className="text-gray-500">
              {formatTotalTTC(totalTTCCurrentYear)}
            </p>
          </div>
         
        </div>

        {/* Card 3 : Total TTC des factures pour l'année précédente */}
        <div className="bg-red-300 rounded-lg p-4 shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-700 text-sm font-semibold">
              Total des factures pour l'année précédente
            </p>
            <p className="text-gray-500">
              {formatTotalTTC(totalTTCPreviousYear)}
            </p>
          </div>
         
        </div>

        {/* Card 4 : Total TTC des factures pour l'exercice social actuel */}
        <div className="bg-green-300 rounded-lg p-4 shadow-md flex items-center justify-between w-full">
          <div>
            <p className="text-gray-700 text-sm font-semibold">
              Total des factures pour l'exercice social actuel
            </p>
            <p className="text-gray-500">
              {formatTotalTTC(totalTTCCurrentFiscalYear)}
            </p>
          </div>
     
        </div>
        {/* Card 5 : Total TTC des factures pour l'exercice social précédent */}
        <div className="bg-red-300 rounded-lg p-4 shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-700 text-sm font-semibold mb-2">
              Total factures pour l'exercice social précédent
            </p>
            <p className="text-gray-500">
              {formatTotalTTC(totalTTCPreviousFiscalYear)}
            </p>
          </div>
          
        </div>
      </div>

      {/* Tableau des factures de fournisseur */}
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Ref. Fournisseur</th>
              <th className="py-2 px-4">Libellé</th>
              <th className="py-2 px-4">Total TTC (XPF)</th>
              <th className="py-2 px-4">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {supplierInvoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-2 px-4">{invoice.ref_supplier}</td>
                <td className="py-2 px-4">{invoice.label}</td>
                <td className="py-2 px-4">
                  {formatTotalTTC(invoice.total_ttc)}
                </td>
                <td className="py-2 px-4">{formatDate(invoice.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserSupplierInvoicesScreen
