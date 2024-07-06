import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const data = [
  { id: 'Femme', label: 'Femme', value: 55, color: 'hsl(348, 70%, 50%)' },
  { id: 'Homme', label: 'Homme', value: 35, color: 'hsl(204, 70%, 50%)' },
  { id: 'Autre', label: 'Autre', value: 10, color: 'hsl(100, 70%, 50%)' },
];

const BuyerProfileChart = () => (
  <div className=' bg-white p-4 border border-primaryColor rounded-lg w-[28rem] h-[22rem]' >
    <h2 className='text-center font-semibold mb-4'>Profil des acheteurs</h2>
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ datum: 'data.color' }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextColor="#333333"
      radialLabelsLinkColor={{ from: 'color' }}
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor="#333333"
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
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

export default BuyerProfileChart;
