import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const data = [
  { month: 'Janv', peignes: 12, portesSavon: 19, jenga: 3, perles: 5, pot: 2 },
  { month: 'Fev', peignes: 15, portesSavon: 12, jenga: 6, perles: 8, pot: 4 },
  { month: 'Mar', peignes: 8, portesSavon: 17, jenga: 9, perles: 3, pot: 7 },
  { month: 'Avr', peignes: 10, portesSavon: 20, jenga: 4, perles: 6, pot: 5 },
  { month: 'Mai', peignes: 7, portesSavon: 14, jenga: 8, perles: 9, pot: 3 },
  { month: 'Jui', peignes: 13, portesSavon: 18, jenga: 5, perles: 7, pot: 4 },
  { month: 'Juil', peignes: 9, portesSavon: 16, jenga: 7, perles: 4, pot: 6 },
  { month: 'Aout', peignes: 14, portesSavon: 15, jenga: 6, perles: 5, pot: 7 },
  { month: 'Sept', peignes: 11, portesSavon: 19, jenga: 5, perles: 8, pot: 3 },
  { month: 'Oct', peignes: 12, portesSavon: 14, jenga: 7, perles: 6, pot: 5 },
  { month: 'Nov', peignes: 10, portesSavon: 18, jenga: 4, perles: 7, pot: 6 },
  { month: 'Dec', peignes: 15, portesSavon: 16, jenga: 8, perles: 9, pot: 4 },
];

const TransactionChart = () => (
  <div className='bg-white p-4  border border-primaryColor rounded-lg h-[22rem] flex flex-col flex-1 shadow-xl'>
    <strong>Transactions</strong>
    
    <ResponsiveBar
      data={data}
      keys={['peignes', 'portesSavon', 'jenga', 'perles', 'pot']}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Mois',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Transactions',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  </div>
);

export default TransactionChart;
