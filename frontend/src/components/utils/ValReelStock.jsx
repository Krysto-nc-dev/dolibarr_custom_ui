import React, { useState, useEffect } from 'react';
import { useGetProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice';
import Loader from '../shared/Loader';

const ValReelStock = () => {
  const [mode, setMode] = useState(1); // 0: all, 1: products, 2: services
  const { data: products, error: errorProducts, isLoading: loadingProducts } = useGetProductsQuery(mode);
  const [totalStockValue, setTotalStockValue] = useState(0);

  useEffect(() => {
    if (products && products.length > 0) {
      const totalValue = products.reduce((acc, product) => {
        const stockReel = Number(product.stock_reel);
        const priceTtc = Number(product.price_ttc);
        if (!isNaN(stockReel) && !isNaN(priceTtc)) {
          return acc + stockReel * priceTtc;
        }
        return acc;
      }, 0);
      setTotalStockValue(totalValue);
    }
  }, [products]);

  if (loadingProducts) return <Loader/>;
  if (errorProducts) return <div>Error loading products: {errorProducts.message}</div>;

  return (
    <div>
      <h1 className={`text-xl font-bold ${totalStockValue < 0 ? 'text-dangerColor' : 'text-successColor'}`}>
        {Math.round(totalStockValue).toLocaleString('fr-FR').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} <span className='text-[10px]'>XPF</span>
      </h1>
    </div>
  );
};

export default ValReelStock;
