import { useEffect, useState } from 'react';
import { useGetInvoicesQuery } from '../../slices/dolibarr/dolliInvoiceApiSlices';
import { DOLIBAR_URL, DOLIBARR_API_KEY } from '../../constants';

const useProductSales = () => {
  const { data: invoices, error: errorInvoices, isLoading: loadingInvoices } = useGetInvoicesQuery();
  const [productSales, setProductSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoiceLines = async () => {
      try {
        if (invoices && invoices.length > 0) {
          const allInvoiceLines = await Promise.all(invoices.map(async (invoice) => {
            const response = await fetch(`${DOLIBAR_URL}/invoices/${invoice.id}?mode=1`, {
              headers: {
                'DOLAPIKEY': DOLIBARR_API_KEY
              }
            });
            const data = await response.json();
            return data.lines; // Assuming the invoice lines are in the 'lines' field
          }));
          
          const flattenedInvoiceLines = allInvoiceLines.flat();

          const salesData = flattenedInvoiceLines.reduce((acc, line) => {
            if (line.product_type === '0') { // Assuming '0' indicates a product and not a service
              const productId = line.fk_product;
              if (!acc[productId]) {
                acc[productId] = {
                  productId,
                  label: line.product_label,
                  value: 0,
                };
              }
              const subprice = parseFloat(line.subprice);
              const qty = parseFloat(line.qty);
              if (!isNaN(subprice) && !isNaN(qty)) {
                acc[productId].value += subprice * qty;
              }
            }
            return acc;
          }, {});

          setProductSales(Object.values(salesData));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceLines();
  }, [invoices]);

  return { productSales, loading, error };
};

export default useProductSales;
