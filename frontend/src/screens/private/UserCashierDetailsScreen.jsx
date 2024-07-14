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

  if (errorCashierDetails || productError) {
    return (
      <div className="mx-auto p-4 text-red-500">
        Error: {errorCashierDetails?.message || productError?.message}
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      <div className="rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-5">
          <div>tiers id : {cashierDetails && cashierDetails.tierId}</div>
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
        <div className="mb-4 text-sm flex justify-between">
          <div>Date :</div>
          <div>
            {cashierDetails &&
              cashierDetails.date &&
              new Date(cashierDetails.date).toLocaleDateString()}
          </div>
        </div>
        <div className="mb-4 flex justify-between">
  <div>Prix de l'inscription</div>
  <div>
    {cashierDetails && cashierDetails.placePrice} XPF
  </div>
</div>
        <div className="mb-4 flex justify-between">
          <div>Chiffre d'affaires</div>
          <div>
            {cashierDetails && Math.floor(cashierDetails.totalSales)} XPF
          </div>
        </div>
        <div className="mb-4">
          {cashierDetails &&
            cashierDetails.sales &&
            cashierDetails.sales.map((sale, index) => (
              <div
                key={index}
                className="border rounded-md border-primaryColor p-4 mb-4"
              >
                <div className="flex justify-between mb-2">
                  <div className="text-sm">
                    <strong className="">Client:</strong> {sale.clientFirstname}{' '}
                    {sale.clientLastname}
                  </div>
                  <div className="text-sm mb-2">
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
                          Référence
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Prix Unitaire
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Quantité
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Sous-total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sale.products.map((product, prodIndex) => {
                        const matchedProduct = products.find(
                          (p) => p.id === product.productId
                        );
                        if (!matchedProduct) return null;

                        return (
                          <tr key={prodIndex}>
                            <td className="px-3 py-2 whitespace-nowrap">
                              {matchedProduct.label}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              {matchedProduct.ref}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              {Math.floor(product.unitPrice)} XPF
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              {product.quantity}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              {Math.floor(product.subTotal)} XPF
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-sm text-red-500">
                    Aucun produit trouvé pour cette vente.
                  </div>
                )}
                <div className="flex justify-end mt-2">
                  <strong className="text-green-500">
                    Total: {Math.floor(sale.totalPrice)} XPF
                  </strong>
                </div>
              </div>
            ))}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Ajouter une vente</h3>
          <form onSubmit={handleSubmitSale}>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <label
                  htmlFor="clientFirstname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Prénom
                </label>
                <input
                  type="text"
                  id="clientFirstname"
                  name="clientFirstname"
                  value={formData.clientFirstname}
                  onChange={handleChange}
                  required
                  className="mt-1 bg-gray-100 text-gray-800 focus:ring-primaryColor focus:border-primaryColor block w-full shadow-sm sm:text-sm rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="clientLastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="clientLastname"
                  name="clientLastname"
                  value={formData.clientLastname}
                  onChange={handleChange}
                  required
                  className="mt-1 bg-gray-100 text-gray-800 focus:ring-primaryColor focus:border-primaryColor block w-full shadow-sm sm:text-sm rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="clientMail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="clientMail"
                  name="clientMail"
                  value={formData.clientMail}
                  onChange={handleChange}
                  required
                  className="mt-1 bg-gray-100 text-gray-800 focus:ring-primaryColor focus:border-primaryColor block w-full shadow-sm sm:text-sm rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="clientCity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ville
                </label>
                <input
                  type="text"
                  id="clientCity"
                  name="clientCity"
                  value={formData.clientCity}
                  onChange={handleChange}
                  required
                  className="mt-1 bg-gray-100 text-gray-800 focus:ring-primaryColor focus:border-primaryColor block w-full shadow-sm sm:text-sm rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="clientCountry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pays
                </label>
                <input
                  type="text"
                  id="clientCountry"
                  name="clientCountry"
                  value={formData.clientCountry}
                  onChange={handleChange}
                  required
                  className="mt-1 bg-gray-100 text-gray-800 focus:ring-primaryColor focus:border-primaryColor block w-full shadow-sm sm:text-sm rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="paymentMethod"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mode de paiment
                </label>
                <input
                  type="text"
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                  className="mt-1 bg-gray-100 text-gray-800 focus:ring-primaryColor focus:border-primaryColor block w-full shadow-sm sm:text-sm rounded-md"
                />
              </div>
              <div className="col-span-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <input
                    id="touriste"
                    name="touriste"
                    type="checkbox"
                    checked={formData.touriste}
                    onChange={handleChange}
                    className="mr-2 bg-gray-100 text-primaryColor focus:ring-primaryColor rounded-md"
                  />
                  <span className="block">Touriste</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-medium mb-2">Produits</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {formData.products.map((product, index) => (
                  <div key={index} className="flex items-center">
                    <label
                      htmlFor={`quantity-${product.productId}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {product.label}
                    </label>
                    <input
                      type="number"
                      id={`quantity-${product.productId}`}
                      name={`quantity-${product.productId}`}
                      value={product.quantity}
                      onChange={(e) =>
                        handleProductChange(
                          product.productId,
                          product.unitPrice,
                          parseInt(e.target.value, 10)
                        )
                      }
                      className="mt-1 bg-gray-100 text-gray-800 focus:ring-primaryColor focus:border-primaryColor block w-24 shadow-sm sm:text-sm rounded-md"
                    />
                    <span className="ml-2 text-gray-700">
                      XPF {Math.floor(product.unitPrice)}
                    </span>
                    <span className="ml-2 text-gray-700">
                      Réf: {product.ref}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primaryColor hover:bg-primaryColorFocus focus:outline-none focus:border-primaryColor focus:shadow-outline-primaryColor active:bg-primaryColorActive transition ease-in-out duration-150 ${
                  addingSale ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={addingSale}
              >
                {addingSale ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V2.83a1 1 0 00-2 0V4a6 6 0 00-6 6h2.83a1 1 0 000-2H4z"
                    ></path>
                  </svg>
                ) : null}
                Ajouter une vente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserCashierDetailsScreen;
