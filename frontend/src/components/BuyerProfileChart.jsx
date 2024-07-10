import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import Loader from './shared/Loader';
import useProductSales from './utils/UseProductSales';

const colors = [
  'hsl(348, 70%, 50%)',
  'hsl(204, 70%, 50%)',
  'hsl(100, 70%, 50%)',
  'hsl(60, 70%, 50%)',
  'hsl(30, 70%, 50%)',
  'hsl(0, 70%, 50%)',
  'hsl(90, 70%, 50%)',
  'hsl(180, 70%, 50%)',
];

const BuyerProfileChart = () => {
  const { productSales, loading, error } = useProductSales();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading product sales data: {error.message}</div>;
  }

  const chartData = productSales.map((product, index) => ({
    id: product.label,
    label: product.label,
    value: product.value,
    color: colors[index % colors.length],
  }));

  return (
    <div className='bg-gray-600 p-4 border border-primaryColor rounded-lg w-[28rem] h-[30rem]'>
      <h2 className='text-center font-semibold mb-4'>Ventes par produit</h2>
      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ datum: 'data.color' }}
        borderWidth={2}
        borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#ffffff" // Couleur des labels radiaux en blanc
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#ffffff" // Couleur des labels de tranches en blanc
        sliceLabel={() => ''} // Retire les chiffres à l'intérieur du graphique
        tooltip={({ datum }) => (
          <div
            style={{
              padding: '5px 10px',
              fontSize: '0.8rem',
              background: '#fff',
              border: '1px solid #ccc',
              color: '#777777', // Couleur du texte des infobulles en gris
            }}
          >
            <strong>{datum.label}</strong>: {datum.value.toLocaleString()} XPF
          </div>
        )}
        animate={true}
        motionConfig="gentle"
        theme={{
          labels: {
            text: {
              fill: '#ffffff', // Couleur générale du texte en blanc
            },
          },
        }}
      />
    </div>
  );
};

export default BuyerProfileChart;
