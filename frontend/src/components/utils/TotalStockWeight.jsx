import React, { useState, useEffect } from 'react';
import { useGetProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice';
import Loader from '../shared/Loader';

const TotalStockWeight = () => {
  const [mode, setMode] = useState(1); // 0: all, 1: products, 2: services
  const { data: products, error: errorProducts, isLoading: loadingProducts } = useGetProductsQuery(mode);
  const [totalStockWeight, setTotalStockWeight] = useState(0);

  useEffect(() => {
    if (products && products.length > 0) {
      const totalWeight = products.reduce((acc, product) => {
        const stockReel = Number(product.stock_reel);
        const weight = Number(product.weight);
        if (!isNaN(stockReel) && !isNaN(weight)) {
          return acc + stockReel * weight;
        }
        return acc;
      }, 0);
      setTotalStockWeight(totalWeight / 1000); // Convert to kg
    }
  }, [products]);

  if (loadingProducts) return <Loader />;
  if (errorProducts) return <div>Error loading products: {errorProducts.message}</div>;

  return (
    <div>
      <h1 className={`text-xl font-bold ${totalStockWeight < 0 ? 'text-dangerColor' : 'text-successColor'}`}>
        {Math.round(totalStockWeight).toLocaleString('fr-FR').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} <span className='text-[10px]'>kg</span>
      </h1>
    </div>
  );
};

export default TotalStockWeight;
