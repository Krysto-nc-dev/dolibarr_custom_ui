import React, { useEffect, useState } from 'react';
import { useGetInvoicesQuery } from '../../slices/dolibarr/dolliInvoiceApiSlices';
import Loader from '../shared/Loader';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const TotalSales = () => {
  const { data: invoices, error: errorInvoices, isLoading: loadingInvoices } = useGetInvoicesQuery();
  const [currentYearSales, setCurrentYearSales] = useState(0);
  const [previousYearSales, setPreviousYearSales] = useState(0);

  useEffect(() => {
    if (invoices && invoices.length > 0) {
      const currentYear = new Date().getFullYear();
      const previousYear = currentYear - 1;

      const currentYearSalesTotal = invoices.reduce((acc, invoice) => {
        const invoiceDate = new Date(invoice.date * 1000);
        if (invoiceDate.getFullYear() === currentYear) {
          return acc + parseFloat(invoice.multicurrency_total_ttc);
        }
        return acc;
      }, 0);

      const previousYearSalesTotal = invoices.reduce((acc, invoice) => {
        const invoiceDate = new Date(invoice.date * 1000);
        if (invoiceDate.getFullYear() === previousYear) {
          return acc + parseFloat(invoice.multicurrency_total_ttc);
        }
        return acc;
      }, 0);

      setCurrentYearSales(currentYearSalesTotal);
      setPreviousYearSales(previousYearSalesTotal);
    }
  }, [invoices]);

  if (loadingInvoices) return <Loader />;
  if (errorInvoices) return <div>Error loading invoices: {errorInvoices.message}</div>;

  const salesDifference = currentYearSales - previousYearSales;
  const salesDifferenceText = salesDifference >= 0 ? `${salesDifference.toLocaleString('fr-FR')} XPF` : `${salesDifference.toLocaleString('fr-FR')} XPF`;
  const salesDifferenceClass = salesDifference >= 0 ? 'text-green-500' : 'text-red-500';
  const SalesIcon = salesDifference >= 0 ? ArrowUpCircle : ArrowDownCircle;

  return (
    <div className="text-center">
      <div className="flex justify-center items-end">
        <strong className='text-xl text-textColor font-semibold'>
          {currentYearSales.toLocaleString('fr-FR')}  
        </strong>
        <span className='ml-1 text-mutedColor text-[10px] mb-0.5'>XPF</span>
      </div>
      <div className={`text-sm ${salesDifferenceClass} flex justify-center items-center mt-1`}>
        <SalesIcon className="mr-1 w-4 h-4" />
        <span className="relative">
          {salesDifference.toLocaleString('fr-FR')}
          <span className="text-mutedColor text-[10px] ml-1">XPF</span>
        </span>
      </div>
    </div>
  );
}

export default TotalSales;
