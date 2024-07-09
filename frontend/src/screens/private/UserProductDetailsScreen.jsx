import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../../slices/dolibarr/dolliProductApiSlice';
import { useGetStockmovementsQuery, useAddStockmovementMutation } from '../../slices/dolibarr/dolliStockmovementApiSlice';
import Loader from '../../components/shared/Loader';
import Barcode from 'react-barcode';
import { useGetDocumentsQuery } from '../../slices/dolibarr/dolliDocumentApiSlice';
import { DOLIBAR_URL } from '../../constants';
import { DOLIBARR_API_KEY } from '../../slices/constants';
import { useGetWarehousesQuery } from '../../slices/dolibarr/dolliWarehouseApiSlice';

const UserProductDetailsScreen = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading: loadingProduct, error: errorProduct } = useGetProductDetailsQuery(productId);
  const { data: stockmovements, isLoading: loadingStock, error: errorStock, refetch: refetchStockMovements } = useGetStockmovementsQuery();
  const { data: documents, isLoading: loadingDocuments, error: errorDocuments } = useGetDocumentsQuery({
    modulepart: 'product',
    id: productId,
  });
  const { data: warehouses, error: errorWarehouses, isLoading: loadingWarehouses } = useGetWarehousesQuery();

  const [addStockmovement] = useAddStockmovementMutation();
  const [quantity, setQuantity] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [currentStock, setCurrentStock] = useState(product ? Number(product.stock_reel) : 0);

  useEffect(() => {
    if (product) {
      setCurrentStock(Number(product.stock_reel));
    }
  }, [product]);

  const handleDownload = async (modulepart, file) => {
    const url = `${DOLIBAR_URL}/documents/download?modulepart=${modulepart}&original_file=${encodeURIComponent(file)}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'DOLAPIKEY': DOLIBARR_API_KEY,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const linkSource = `data:${data['content-type']};base64,${data.content}`;
      const downloadLink = document.createElement('a');
      downloadLink.href = linkSource;
      downloadLink.download = data.filename;
      downloadLink.click();
    } catch (error) {
      console.error('Failed to download document:', error);
    }
  };

  const handleStockMovement = async (type) => {
    if (!quantity || isNaN(quantity) || !selectedWarehouse) {
      alert('Please enter a valid quantity and select a warehouse');
      return;
    }

    const qty = type === 'add' ? Number(quantity) : -Number(quantity);

    const newStockmovement = {
      product_id: productId,
      warehouse_id: selectedWarehouse,
      qty,
      type: type === 'add' ? 3 : 2, // type 3 for stock increase, type 2 for stock decrease
      movementlabel: type === 'add' ? 'Stock increase' : 'Stock decrease',
    };

    console.log('Adding stock movement:', newStockmovement);

    try {
      await addStockmovement(newStockmovement).unwrap();
      alert('Stock movement added successfully');
      setCurrentStock((prevStock) => prevStock + qty);
      setQuantity('');
      setSelectedWarehouse('');
      refetchStockMovements();
    } catch (error) {
      console.error('Failed to add stock movement:', error);
      alert('Failed to add stock movement');
    }
  };

  if (loadingProduct || loadingStock || loadingDocuments || loadingWarehouses) {
    return <Loader />;
  }

  if (errorProduct || errorStock || errorDocuments || errorWarehouses) {
    return (
      <p className="text-red-500">
        {typeof (errorProduct || errorStock || errorDocuments || errorWarehouses).data.message === 'string'
          ? (errorProduct || errorStock || errorDocuments || errorWarehouses).data.message
          : 'Une erreur est survenue'}
      </p>
    );
  }

  const stockValue = currentStock * (parseFloat(product.price) || 0);
  const productWeight = parseFloat(product.weight) || 0;
  const totalStockWeight = (productWeight * currentStock) / 1000; // Convert grams to kilograms
  const filteredStockMovements = stockmovements.filter((movement) => movement.product_id === productId);

  const formatSize = (size) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024;
      i++;
    }
    return `${Math.round(size * 10) / 10} ${units[i]}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-bold">{product.label}</h1>
          <p className='m-2'>
            <strong>Valeur du stock:</strong>
            <span className='text-white font-bold bg-secondaryColor py-1 px-3 rounded-full'>
              {stockValue.toLocaleString()} XPF
            </span>
          </p>
          <p className='m-2'>
            <strong>Poids total du stock:</strong>
            <span className='text-white font-bold bg-secondaryColor py-1 px-3 rounded-full'>
              {totalStockWeight.toLocaleString()} kg
            </span>
          </p>
        </div>
        <Barcode value={product.barcode} />
      </div>
      <div className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: product.description }} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Détails du produit</h2>
          <p><strong>Référence:</strong> {product.ref}</p>
          <p><strong>Prix:</strong> {Number(product.price).toLocaleString()} XPF</p>
          <p><strong>Prix minimum:</strong> {Number(product.price_min).toLocaleString()} XPF</p>
          <p><strong>Prix TTC:</strong> {Number(product.price_ttc).toLocaleString()} XPF</p>
          <p><strong>En stock:</strong> {currentStock}</p>
          <p><strong>Poids:</strong> {product.weight} Gr</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Informations supplémentaires</h2>
          <p>
            <strong>En vente:</strong>
            <span className={product.status_buy === "0" ? 'text-green-700' : 'text-red-700'}>
              {product.status_buy === "0" ? ' Oui' : ' Non'}
            </span>
          </p>
          <p><strong>Statut:</strong> {product.status === "1" ? 'Actif' : 'Inactif'}</p>
          <p><strong>Type:</strong> {product.type === "1" ? 'Service' : 'Produit'}</p>
          <p><strong>Date de création:</strong> {new Date(product.date_creation * 1000).toLocaleDateString()}</p>
          <p><strong>Date de modification:</strong> {new Date(product.date_modification * 1000).toLocaleDateString()}</p>
          <p><strong>Pays:</strong> {product.country_code}</p>
        </div>
      </div>

      {/* Section des documents */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Documents</h2>
        <table className="min-w-full bg-white">
          <thead className="bg-primaryColor">
            <tr>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Image</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Nom</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Taille</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Date</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {documents && documents.ecmfiles_infos && documents.ecmfiles_infos.length > 0 ? (
              documents.ecmfiles_infos.map((docInfo) => {
                const document = documents[parseInt(docInfo.position) - 1];
                if (!document) {
                  return null;
                }
                return (
                  <tr key={document.name}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <img
                        src={`https://crm.krysto.nc/documents/produit/${document.level1name}/${encodeURIComponent(document.name)}`}
                        alt={document.name}
                        className="max-h-16"
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">{document.name}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{formatSize(document.size)}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{new Date(document.date * 1000).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button
                        onClick={() => handleDownload('product', `${document.level1name}/${document.name}`)}
                        className="text-primaryColor underline"
                      >
                        Télécharger
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className='text-dangerColor font-bold text-center py-2'>Aucun document disponible.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Section des mouvements de stock */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Mouvements de Stock</h2>
        <div className="flex space-x-4 mb-4">
          <input
            type="number"
            className="p-2 border rounded"
            placeholder="Quantité"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <select
            className="p-2 border rounded"
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
          >
            <option value="">Sélectionnez un entrepôt</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => handleStockMovement('add')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Ajouter au stock
          </button>
          <button
            onClick={() => handleStockMovement('remove')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Supprimer du stock
          </button>
        </div>
        <table className="min-w-full bg-white">
          <thead className="bg-primaryColor">
            <tr>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Date</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Quantité</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredStockMovements.map((movement) => (
              <tr
                key={movement.id}
                className={movement.qty > 0 ? 'bg-green-200' : 'bg-red-200'}
              >
                <td className="py-2 px-4 border-b border-gray-200">{new Date(movement.datem * 1000).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b border-gray-200">{Number(movement.qty).toLocaleString()}</td>
                <td className="py-2 px-4 border-b border-gray-200">{movement.qty > 0 ? 'Ajout' : 'Suppression'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProductDetailsScreen;
