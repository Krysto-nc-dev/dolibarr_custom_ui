import React from 'react';
import { useGetRecyclableProductsQuery } from '../../slices/recyclableProductsApiSlice';
import Barcode from 'react-barcode';
import { Star } from 'lucide-react';
import Loader from '../../components/shared/Loader';
import { useGetPlasticTypesQuery } from '../../slices/plasticTypesSlice';

const UserRecyclableProducts = () => {
  const { data: recyclableProducts, error, isLoading } = useGetRecyclableProductsQuery();
  const { data: plasticTypes, error: errorPlasticType, isLoading: loadingPlasticType } = useGetPlasticTypesQuery();

  if (isLoading || loadingPlasticType) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (errorPlasticType) return <div>Error: {errorPlasticType.message}</div>;

  const getPlasticTypeNameById = (id) => {
    const plasticType = plasticTypes.find(type => type._id === id);
    return plasticType ? `${plasticType.scientificNameFr} - ${plasticType.sigleFr}` : 'Inconnue';
  };

  const renderStars = (rating) => {
    return (
      <>
        {Array(10).fill().map((_, i) => (
          <Star key={i} className={i < rating ? 'text-warningColor' : 'text-mutedColor'} />
        ))}
      </>
    );
  };

  return (
    <div className="p-6 bg-backgroundColor text-textColor">
      <h1 className="text-xl font-bold mb-6 text-primaryColor text-center">Produits Recyclables</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recyclableProducts.map((product) => (
          <div key={product._id} className="card">
            <div className="bg-white">
              <img src={`http://192.168.178.21:3000/uploads/${product.photo}`} alt={product.name} className="w-full h-48 object-contain rounded-md mb-4" />
            </div>
            <div className="flex justify-between items-center mb-2 p-3">
              <h2 className="text-md font-bold text-primaryColor">{product.name}</h2>
              <div className="ml-4">
                <Barcode value={product.barCode} width={1} height={30} fontSize={10} />
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm"><strong>Marque:</strong> {product.brand}</p>
              <p className="text-sm"><strong>Description:</strong> {product.description}</p>
              <div className="text-sm mb-2 flex items-center">
                <strong>Note de recyclage:</strong>
                <div className="ml-2 flex">{renderStars(product.recyclingNote)}</div>
              </div>
              <p className="text-sm text-gray-200 mb-2"><strong>Poids:</strong> {product.weightGr} gr</p>
              <div className="text-sm text-gray-200 mb-2">
                <strong>Types de plastique:</strong>
                <ul className="list-disc pl-5 mt-2">
                  {product.plastic_types.map((typeId) => (
                    <li key={typeId}>{getPlasticTypeNameById(typeId)}</li>
                  ))}
                </ul>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <strong>Couleurs:</strong>
                <ul className="list-disc pl-5 mt-2">
                  {product.colors.map((color) => (
                    <li key={color}>{color}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserRecyclableProducts;
