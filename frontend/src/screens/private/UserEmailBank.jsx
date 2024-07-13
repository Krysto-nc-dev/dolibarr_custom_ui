import React, { useState } from 'react';
import { useGetEmailsQuery, useAddEmailMutation, useDeleteEmailMutation } from '../../slices/emailApiSlice';
import Loader from '../../components/shared/Loader';
import Modal from '../../components/shared/Modal';
import { CheckCircle, CirclePlus, Edit, Trash, XCircle } from 'lucide-react'; // Import des icônes

const UserEmailBank = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    civility: '',
    firstname: '',
    lastname: '',
    city: '',
    birthdate: '',
    acceptMailing: true, // Default value based on schema
  });

const [addEmail] = useAddEmailMutation()
const [deleteEmail] = useDeleteEmailMutation(); // Utilisation de useDeleteEmailMutation

  const { data: emails, error: errorMail, isLoading: emailLoading, refetch: refetchEmails } = useGetEmailsQuery();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmail(formData);
      toggleModal(); // Close modal on successful submission
      refetchEmails(); // Refetch emails to update the list
      // Optionally clear form data after successful submission
      setFormData({
        email: '',
        civility: '',
        firstname: '',
        lastname: '',
        city: '',
        birthdate: '',
        acceptMailing: true, // Reset to default
      });
    } catch (error) {
      console.error('Error adding email:', error);
      // Handle error state if needed
    }
  };

  const handleEdit = (emailId) => {
    // Logic to handle editing an email, if needed
    console.log(`Edit email with ID: ${emailId}`);
  };

  const handleDelete = async (emailId) => {
    try {
      await deleteEmail(emailId); // Utilisation de la mutation pour supprimer l'email
      console.log(`Delete email with ID: ${emailId}`);
      refetchEmails(); // Rafraîchir la liste des emails après la suppression
    } catch (error) {
      console.error('Error deleting email:', error);
      // Handle error state if needed
    }
  };


  if (emailLoading) {
    return <Loader />;
  }

  if (errorMail) {
    return <p className="text-red-500">{errorMail.message}</p>;
  }

  return (
    <>
      {showModal && (
        <Modal closeModal={toggleModal}>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Ajouter un email</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Civilité:</label>
                  <input
                    type="text"
                    name="civility"
                    value={formData.civility}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Prénom:</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Nom:</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Ville:</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Date de naissance:</label>
                  <input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Accepte les mails:</label>
                <div className="mt-1 flex items-center">
                  <input
                    id="acceptMailing"
                    name="acceptMailing"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    checked={formData.acceptMailing}
                    onChange={(e) => setFormData((prev) => ({ ...prev, acceptMailing: e.target.checked }))}
                  />
                  <label htmlFor="acceptMailing" className="ml-2 block text-sm text-gray-900">
                    Accepte de recevoir des mails
                  </label>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className = "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primaryColor hover:bg-primaryColor-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          
                >
             Ajouter
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

 
<div className="p-2">
        <h2 className="text-xl font-semibold mb-4">Liste des emails</h2>
        <button onClick={toggleModal} className="bg-green-500 hover:bg-primaryColor-dark font-bold py-1 px-4 rounded mb-3 text-backgroundColor">
          <CirclePlus />
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-700 border">
            <thead className="bg-primaryColor">
              <tr>
                <th className="px-4 py-2 border-b text-left text-white">Email</th>
                <th className="px-4 py-2 border-b text-left text-white">Civilité</th>
                <th className="px-4 py-2 border-b text-left text-white">Prénom</th>
                <th className="px-4 py-2 border-b text-left text-white">Nom</th>
                <th className="px-4 py-2 border-b text-left text-white">Ville</th>
                <th className="px-4 py-2 border-b text-left text-white">Date de naissance</th>
                <th className="px-4 py-2 border-b text-left text-white">Accepte les mails</th>
                <th className="px-4 py-2 border-b text-left text-white">Actions</th> {/* Nouvelle colonne */}
              </tr>
            </thead>
            <tbody>
              {emails.map((email) => (
                <tr key={email._id} className="hover:bg-gray-500">
                  <td className="px-4 py-2 border-b text-left">{email.email}</td>
                  <td className="px-4 py-2 border-b text-left">{email.civility}</td>
                  <td className="px-4 py-2 border-b text-left">{email.firstname}</td>
                  <td className="px-4 py-2 border-b text-left">{email.lastname}</td>
                  <td className="px-4 py-2 border-b text-left">{email.city}</td>
                  <td className="px-4 py-2 border-b text-left">
                    {email.birthdate ? new Date(email.birthdate).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-4 py-2 border-b text-left">
                    {email.acceptMailing ? (
                      <XCircle className="text-red-500" size={24} />
                    ) : (
                      <CheckCircle className="text-green-500" size={24} />
                    )}
                  </td>
                  <td className="px-4 py-2 border-b text-left">
                    <button
                      onClick={() => handleEdit(email._id)}
                      className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(email._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserEmailBank;