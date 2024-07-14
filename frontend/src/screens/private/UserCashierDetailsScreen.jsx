import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'lucide-react';
import {
  useGetCashierByIdQuery,
  useAddSaleMutation,
} from '../../slices/cashierApiSlice';
import { useGetProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice';

const UserCashierDetailsScreen = () => {
  const { id: cashierId } = useParams();

  const [formData, setFormData] = useState({
    clientFirstname: '',
    clientLastname: '',
    clientMail: '',
    clientCity: '',
    touriste: false,
    clientCountry: 'Nouvelle-Calédonie',
    paymentMethod: 'Espèces',
    products: [],
  });

  const {
    data: cashierDetails,
    error: errorCashierDetails,
    isLoading: loadingCashierDetails,
  } = useGetCashierByIdQuery(cashierId);

  const {
    data: products,
    error: productError,
    isLoading: loadingProducts,
  } = useGetProductsQuery({
    mode: '1',
    variant_filter: '1',
  });

  const [addSale, { isLoading: addingSale }] = useAddSaleMutation();

  useEffect(() => {
    if (products) {
      const initialProductsState = products.map((product) => ({
        productId: product.id,
        unitPrice: parseFloat(product.price) || 0,
        quantity: 0,
        subTotal: 0,
        label: product.label,
        ref: product.ref,
      }));
      setFormData((prevState) => ({
        ...prevState,
        products: initialProductsState,
      }));
    }
  }, [products]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleProductChange = (productId, unitPriceStr, quantity) => {
    const unitPrice = parseFloat(unitPriceStr);

    const updatedProducts = formData.products.map((product) =>
      product.productId === productId
        ? { ...product, quantity, subTotal: unitPrice * quantity }
        : product
    );

    setFormData((prevState) => ({
      ...prevState,
      products: updatedProducts,
    }));
  };

  const handleSubmitSale = async (e) => {
    e.preventDefault();

    const filteredProducts = formData.products
      .filter((product) => product.quantity > 0)
      .map((product) => ({
        productID: product.productId,
        unitPrice: product.unitPrice,
        quantity: product.quantity,
      }));

    const saleData = {
      sale: {
        clientFirstname: formData.clientFirstname,
        clientLastname: formData.clientLastname,
        clientMail: formData.clientMail,
        clientCity: formData.clientCity,
        touriste: formData.touriste,
        clientCountry: formData.clientCountry,
        title: "Achat divers", // Ajoutez le titre si nécessaire
        products: filteredProducts,
      },
    };

    try {
      await addSale({ cashierId, sale: saleData });
      console.log('Sale added successfully');
      // Réinitialiser le formulaire après l'ajout réussi
      setFormData({
        clientFirstname: '',
        clientLastname: '',
        clientMail: '',
        clientCity: '',
        touriste: false,
        clientCountry: 'Nouvelle-Calédonie',
        products: formData.products.map((product) => ({
          ...product,
          quantity: 0,
          subTotal: 0,
        })),
      });
    } catch (error) {
      console.error('Error adding sale:', error);
    }
  };

  if (loadingCashierDetails || loadingProducts) {
    return <Loader />;
  }

  const placePrice = cashierDetails && cashierDetails.placePrice;
  const totalSales = cashierDetails && cashierDetails.totalSales;

  // Calculer le pourcentage du chiffre d'affaires par rapport au prix de la place
  const progressPercentage = (totalSales / placePrice) * 100;

  let realGain = totalSales - placePrice;
  let realGainClass = realGain >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="mx-auto p-4 max-w-9xl">
      <div className="rounded-lg shadow-md p-6 bg-gray-700 text-textColor">
        <div className="flex justify-between items-center mb-5">
          <div className="text-gray-700">Tiers ID : {cashierDetails && cashierDetails.tierId}</div>
          <div className="mb-4">
            <span
              className={`px-2 py-1 rounded ${
                cashierDetails && cashierDetails.status === 'Ouvert'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {cashierDetails && cashierDetails.status === 'Ouvert'
                ? 'Ouvert'
                : 'Fermé'}
            </span>
          </div>
        </div>
        <div className="mb-4 text-sm flex justify-between text-textColor">
          <div>Date :</div>
          <div>
            {cashierDetails &&
              cashierDetails.date &&
              new Date(cashierDetails.date).toLocaleDateString()}
          </div>
        </div>
        <div className="mb-4 flex justify-between text-textColor">
          <div>Prix de l'inscription</div>
          <div>{cashierDetails && cashierDetails.placePrice} XPF</div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between mb-2 text-textColor">
            <div>Chiffre d'affaires</div>
            <div>{cashierDetails && Math.floor(cashierDetails.totalSales)} XPF</div>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-text-textColor bg-gray-500">
                  Progression
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-primaryColor">
                  {progressPercentage.toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-6 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${progressPercentage}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap justify-center ${
                  progressPercentage >= 100
                    ? 'bg-green-500'
                    : progressPercentage >= 50
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                } text-white`}
              ></div>
            </div>
            {progressPercentage >= 100 ? (
              <div className="text-sm font-medium text-center text-textColor">
                Gain réel :{' '}
                <span className={realGainClass}>
                  {Math.floor(realGain)} XPF
                </span>
              </div>
            ) : (
              <div className="text-sm font-medium text-center text-textColor">
                Montant restant à atteindre pour gagner de l'argent :{' '}
                <span className="text-red-500">
                  {Math.floor(placePrice - totalSales)} XPF
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="mb-4">
          {cashierDetails &&
            cashierDetails.sales &&
            cashierDetails.sales.map((sale, index) => (
              <div
                key={index}
                className="border rounded-md border-primaryColor p-4 mb-4 bg-gray-50"
              >
                <div className="flex justify-between mb-2 text-gray-700">
                  <div className="text-sm">
                    <strong>Client:</strong> {sale.clientFirstname}{' '}
                    {sale.clientLastname}
                  </div>
                  <div className="text-sm">
                    <strong>Email:</strong> {sale.clientMail}
                  </div>
                  <div className="text-sm">
                    <strong>Ville:</strong> {sale.clientCity}
                  </div>
                </div>
                {sale.products && sale.products.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Nom Produit
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Quantité
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Prix unitaire (XPF)
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Total (XPF)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sale.products.map((product, idx) => (
                        <tr key={idx}>
                          <td className="px-3 py-2 text-sm text-gray-700">{product.productLabel}</td>
                          <td className="px-3 py-2 text-sm text-gray-700">{product.quantity}</td>
                          <td className="px-3 py-2 text-sm text-gray-700">{Math.floor(product.unitPrice)}</td>
                          <td className="px-3 py-2 text-sm text-gray-700">{Math.floor(product.quantity * product.unitPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-red-700">Aucun produit dans cette vente</p>
                )}
              </div>
            ))}
        </div>
        <form onSubmit={handleSubmitSale} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-textColor text-sm">Prénom du Client</label>
              <input
                type="text"
                name="clientFirstname"
                value={formData.clientFirstname}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-textColor text-sm">Nom du Client</label>
              <input
                type="text"
                name="clientLastname"
                value={formData.clientLastname}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-textColor text-sm">Email du Client</label>
              <input
                type="email"
                name="clientMail"
                value={formData.clientMail}
                onChange={handleChange}
                className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-textColor text-sm">Ville du Client</label>
              <input
                type="text"
                name="clientCity"
                value={formData.clientCity}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-textColor text-sm">Client Touriste</label>
              <input
                type="checkbox"
                name="touriste"
                checked={formData.touriste}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-primaryColor mt-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-textColor text-sm">Pays du Client</label>
              <input
                type="text"
                name="clientCountry"
                value={formData.clientCountry}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-sm bg-gray-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-textColor text-sm">Mode de Paiement</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-gray-500"
            >
              <option value="Espèces">Espèces</option>
              <option value="Carte Bancaire">Carte Bancaire</option>
              <option value="Virement">Virement</option>
            </select>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-textColor">Produits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {formData.products.map((product) => (
                <div key={product.productId} className="border p-4 rounded-md shadow-md">
                  <h3 className="text-sm font-medium text-textColor mb-2">{product.label}</h3>
                  <div className="flex justify-between ">

                  <div className="mb-2 w-[50%] mr-2">
                    <label className="block text-textColor text-sm">Référence</label>
                    <input
                      type="text"
                      value={product.ref}
                      readOnly
                      className="w-full p-2 border bg-red-300 rounded mt-1 bg-gray-100 text-sm"
                      />
                  </div>
                  <div className="mb-2 w-[50%]">
                    <label className="block text-textColor text-sm">Prix unitaire (XPF)</label>
                    <input
                      type="number"
                      value={product.unitPrice}
                      onChange={(e) => handleProductChange(product.productId, e.target.value, product.quantity)}
                      className="w-full p-2 border bg-red-300 rounded mt-1 text-sm"
                      />
                  </div>
                      </div>
                  <div className="mb-2">
                    <label className="block text-textColor">Quantité</label>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => handleProductChange(product.productId, product.unitPrice, parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded mt-1 text-sm"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-textColor">Total (XPF)</label>
                    <input
                      type="number"
                      value={product.subTotal}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded mt-1 bg-gray-100 text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={addingSale}
            className="w-full py-2 px-4 bg-primaryColor text-white font-semibold rounded-md shadow-md hover:bg-primaryColor-dark disabled:opacity-50"
          >
            {addingSale ? 'Ajout en cours...' : 'Ajouter la vente'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserCashierDetailsScreen;
