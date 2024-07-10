import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMachineByIdQuery } from '../../slices/machineApiSlice';
import Loader from '../../components/shared/Loader';
import Barcode from 'react-barcode';

const UserMachineAndMouldDetails = () => {
  const { id: machineId } = useParams();
  const { data: machine, error, isLoading } = useGetMachineByIdQuery(machineId);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-red-500">
        {typeof error.data.message === 'string' ? error.data.message : 'Une erreur est survenue'}
      </p>
    );
  }

  return (
    <div className="p-6 bg-gray-700 min-h-screen">
        <img src={`/uploads/${machine.images[0]}`} alt="Machine" className="w-full h-[450px] object-cover mb-4 rounded-lg" />
      <h1 className="text-3xl font-bold mb-6 text-center text-primaryColor">Détails de la Machine</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-primaryColor mb-2">{machine.name}</h2>
            <p className="text-lg text-gray-700 mb-2"><strong>Description:</strong> {machine.description}</p>
            <p className="text-lg text-gray-700 mb-2"><strong>Type:</strong> {machine.type}</p>
            <p className="text-lg text-gray-700 mb-2"><strong>Catégorie:</strong> {machine.category}</p>
            <p className="text-lg text-gray-700 mb-2"><strong>Provenance:</strong> {machine.provenanceCountry}</p>
            <p className="text-lg text-gray-700 mb-2"><strong>Status:</strong> {machine.status}</p>
            <p className="text-lg text-gray-700 mb-2"><strong>Coût Total:</strong> {Number(machine.totalCoast).toLocaleString()} XPF</p>
            <p className="text-lg text-gray-700 mb-2"><strong>Heures d'opération:</strong> {machine.operatingHours.toLocaleString()}</p>
            <p className="text-lg text-gray-700 mb-2"><strong>Date d'achat:</strong> {new Date(machine.buyDate).toLocaleDateString()}</p>
            <p className="text-lg text-gray-700 mb-2"><strong>Date de commande:</strong> {new Date(machine.orderDate).toLocaleDateString()}</p>
            <p className="text-lg text-gray-700 mb-2"><strong>Date de réception:</strong> {new Date(machine.receptionDate).toLocaleDateString()}</p>
            <p className="text-lg text-gray-700 mb-2"><strong>Date de mise en service:</strong> {new Date(machine.serviceDate).toLocaleDateString()}</p>
          </div>
          <Barcode value={machine.barcode} />
        </div>
        

        <h3 className="text-xl font-bold text-primaryColor mt-6 mb-4">Maintenances</h3>
        <div className="space-y-4">
          {machine.maintenances.map((maintenance, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md">
              <p className="text-lg text-gray-700 mb-2"><strong>Date:</strong> {new Date(maintenance.date).toLocaleDateString()}</p>
              <p className="text-lg text-gray-700 mb-2"><strong>Type:</strong> {maintenance.type}</p>
              <p className="text-lg text-gray-700 mb-2"><strong>Description:</strong> {maintenance.description}</p>
              <p className="text-lg text-gray-700 mb-2"><strong>Coût:</strong> {Number(maintenance.cost).toLocaleString()} XPF</p>
              <p className="text-lg text-gray-700 mb-2"><strong>Technicien:</strong> {maintenance.technician}</p>
              <p className="text-lg text-gray-700 mb-2"><strong>Notes:</strong> {maintenance.notes}</p>
              {maintenance.recurrence && (
                <p className="text-lg text-gray-700 mb-2"><strong>Récurrence:</strong> {maintenance.recurrence.frequency} tous les {maintenance.recurrence.interval} mois jusqu'au {new Date(maintenance.recurrence.endDate).toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold text-primaryColor mt-6 mb-4">Procédures d'utilisation</h3>
        <div className="space-y-4">
          {machine.usageProcedures.map((procedure, index) => (
            <div key={procedure._id} className="bg-gray-100 p-4 rounded-md">
              <h4 className="text-lg font-bold mb-2">{procedure.title}</h4>
              {procedure.steps.map((step, stepIndex) => (
                <p key={stepIndex} className="text-lg text-gray-700 mb-2"><strong>Étape {step.stepNumber}:</strong> {step.description}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserMachineAndMouldDetails;
