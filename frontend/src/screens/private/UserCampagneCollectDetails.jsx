import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../components/shared/Loader';
import Barcode from 'react-barcode';
import { useGetThirdPartyDetailsQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice';
import { useGetCampagneCollecteByIdQuery } from '../../slices/campagneCollectApiSlice';
import { useGetPlasticTypesQuery } from '../../slices/plasticTypesSlice';
import { useGetPlasticColorsQuery } from '../../slices/plasticColorSlice';
import { ResponsivePie } from '@nivo/pie';

const UserCampagneCollecteDetailsScreen = () => {
  const { id: campagneId } = useParams();
  const { data: campagne, error: errorCampagne, isLoading: loadingCampagne } = useGetCampagneCollecteByIdQuery(campagneId);
  const { data: tier, error: errorTier, isLoading: loadingTier } = useGetThirdPartyDetailsQuery(campagne?.dollibarTierId);
  const { data: plasticTypes, error: errorPlasticTypes, isLoading: loadingPlasticTypes } = useGetPlasticTypesQuery();
  const { data: plasticColors, error: errorPlasticColors, isLoading: loadingPlasticColors } = useGetPlasticColorsQuery();

  if (loadingCampagne || loadingTier || loadingPlasticTypes || loadingPlasticColors) {
    return <Loader />;
  }

  if (errorCampagne) {
    return <div className="text-center mt-4 text-red-500">Erreur : {errorCampagne.message}</div>;
  }

  if (errorTier) {
    return <div className="text-center mt-4 text-red-500">Erreur : {errorTier.message}</div>;
  }

  if (!campagne) {
    return <div className="text-center mt-4">Campagne de collecte non trouvée</div>;
  }

  if (errorPlasticTypes) {
    return <div className="text-center mt-4 text-red-500">Erreur : {errorPlasticTypes.message}</div>;
  }

  if (errorPlasticColors) {
    return <div className="text-center mt-4 text-red-500">Erreur : {errorPlasticColors.message}</div>;
  }

  const totalPlasticWeight = campagne.collectes.reduce((total, collecte) => total + collecte.PlasticWeightKg, 0);

  const getPlasticTypeName = (id) => {
    const type = plasticTypes.find(type => type._id === id);
    return type ? type.sigleFr : 'Type inconnu';
  };

  const getPlasticColorName = (id) => {
    const color = plasticColors.find(color => color._id === id);
    return color ? color.name : 'Couleur inconnue';
  };

  // Préparer les données pour le pie chart
  const plasticWeightsByType = campagne.collectes.reduce((acc, collecte) => {
    const typeName = getPlasticTypeName(collecte.PlasticType);
    if (!acc[typeName]) {
      acc[typeName] = 0;
    }
    acc[typeName] += collecte.PlasticWeightKg;
    return acc;
  }, {});

  const pieChartData = Object.keys(plasticWeightsByType).map(typeName => ({
    id: typeName,
    label: typeName,
    value: plasticWeightsByType[typeName]
  }));

  const MyResponsivePie = ({ data }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#ffffff"
      arcLinkLabelsThickness={2}
    
    
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
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
          <strong>{datum.label}</strong>: {datum.value.toLocaleString()} Kg
        </div>
      )}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 4]]
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 2,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 1,
          spacing: 10
        }
      ]}
      fill={[
        {
          match: {
            id: 'Mixed'
          },
          id: 'dots'
        },
        {
          match: {
            id: 'PP'
          },
          id: 'dots'
        },
        {
          match: {
            id: 'PS'
          },
          id: 'dots'
        },
        {
          match: {
            id: 'OTHER'
          },
          id: 'dots'
        },
        {
          match: {
            id: 'PET'
          },
          id: 'lines'
        },
        {
          match: {
            id: 'HDPE'
          },
          id: 'lines'
        },
        {
          match: {
            id: 'LDPE'
          },
          id: 'lines'
        },
        {
          match: {
            id: 'PVC'
          },
          id: 'lines'
        }
      ]}
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
                itemTextColor: '#ffff'
              }
            }
          ]
        }
      ]}
      
    />
  );

  return (
    <div className="p-4 min-h-screen text-textColor">
      <h1 className="text-3xl font-bold text-center text-primaryColor">Détails de la Campagne de Collecte</h1>
      <div className="text-xl font-bold text-center text-primaryColor">
        Poids total collecté pour cette campagne : <strong className='text-secondaryColor'>{totalPlasticWeight} kg</strong>
      </div>
      <div className="p-6 rounded-lg">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-primaryColor mb-2">{campagne.title}</h2>
            <p className="text-lg mb-2"><strong>Détails :</strong> {campagne.description}</p>
            <p className="text-lg mb-2"><strong>Type de collecte :</strong> {campagne.collectionType}</p>
            <p className="text-lg mb-2"><strong>Tiers :</strong> <Link to={`/user-third-party-details/${campagne.dollibarTierId}`} className='hover:text-secondaryColor'>{tier ? tier.name : 'Non défini'}</Link></p>
            <p className="text-lg mb-2"><strong>Récurrence :</strong> {campagne.recurring ? 'Oui' : 'Non'}</p>
            {campagne.recurring && (
              <>
                <p className="text-lg mb-2"><strong>Fréquence :</strong> {campagne.frequency}</p>
                <p className="text-lg mb-2"><strong>Date de début :</strong> {new Date(campagne.startDate).toLocaleDateString()}</p>
                <p className="text-lg mb-2"><strong>Date de fin :</strong> {new Date(campagne.endDate).toLocaleDateString()}</p>
              </>
            )}
            <p className="text-lg mb-2"><strong>Adresse :</strong> {campagne.address}</p>
            <p className="text-lg mb-2"><strong>Date de création :</strong> {new Date(campagne.createdAt).toLocaleDateString()}</p>
            <p className="text-lg mb-2"><strong>Dernière modification :</strong> {new Date(campagne.updatedAt).toLocaleDateString()}</p>
          </div>
          <div className="flex flex-col items-center">
            <span className={`text-lg font-semibold py-1 px-4 rounded ${getStatusColorClass(campagne.status)}`}>{campagne.status}</span>
            {campagne.barcode && (
              <div className="mt-4">
                <Barcode className='h-20' value={campagne.barcode} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section pour afficher le contrat dans un tableau */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2 text-primaryColor">Contrat</h2>
        {campagne.contract ? (
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">Nom du contrat</th>
                <th className="py-2 px-4">Télécharger</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr>
                <td className="py-2 px-4">{campagne.contract}</td>
                <td className="py-2 px-4">
                  <a
                    href={`http://localhost:5000/uploads/${encodeURIComponent(campagne.contract)}`}
                    className="text-blue-500 hover:text-blue-700"
                    download
                  >
                    Télécharger
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="text-lg">Aucun contrat disponible pour cette campagne.</p>
        )}
      </div>

      {/* Section pour afficher les collectes liées à la campagne */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2 text-primaryColor">Collectes</h2>
        {campagne.collectes && campagne.collectes.length > 0 ? (
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">Date de Collecte</th>
                <th className="py-2 px-4">Poids du Plastique (kg)</th>
                <th className="py-2 px-4">Type de Plastique</th>
                <th className="py-2 px-4">Couleur du Plastique</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {campagne.collectes.map((collecte, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">{new Date(collecte.dateCollecte).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{collecte.PlasticWeightKg}</td>
                  <td className="py-2 px-4">{getPlasticTypeName(collecte.PlasticType)}</td>
                  <td className="py-2 px-4">{getPlasticColorName(collecte.PlasticColor)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-lg">Aucune collecte disponible pour cette campagne.</p>
        )}
      </div>

      {/* Section pour afficher le diagramme en camembert */}
      <div className="mt-6 ">
        <h2 className="text-xl font-bold mb-2 text-primaryColor">Répartition du Poids par Type de Plastique</h2>
        <div  className='bg-gray-700 rounded-md ' style={{ height: 400 }}>
          <MyResponsivePie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

const getStatusColorClass = (status) => {
  switch (status) {
    case 'Actif':
      return 'bg-green-400 text-green-800';
    case 'Inactif':
    case 'Annulé':
      return 'bg-red-400 text-red-800';
    default:
      return 'bg-gray-400 text-gray-800';
  }
};

export default UserCampagneCollecteDetailsScreen;
