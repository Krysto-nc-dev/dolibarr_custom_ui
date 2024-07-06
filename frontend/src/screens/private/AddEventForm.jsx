import React from 'react';
import { useForm } from 'react-hook-form';

const AddEventForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Vous pouvez ajouter ici la logique pour envoyer les données au backend
  };

  return (
    <div className=" mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center text-primaryColor">Ajouter un événement</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-textColor mb-1">Titre</label>
          <input
            type="text"
            {...register('title', { required: 'Le titre est requis' })}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.title ? 'border-dangerColor focus:ring-dangerColor' : 'border-gray-300 focus:ring-primaryColor'
            }`}
          />
          {errors.title && <p className="text-dangerColor text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-textColor mb-1">Date</label>
            <input
              type="date"
              {...register('date', { required: 'La date est requise' })}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.date ? 'border-danger-color focus:ring-danger-color' : 'border-gray-300 focus:ring-primaryColor'
              }`}
            />
            {errors.date && <p className="text-dangerColor text-sm mt-1">{errors.date.message}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-textColor mb-1">Durée (minutes)</label>
            <input
              type="number"
              {...register('duration')}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-primaryColor"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-textColor mb-1">Description</label>
          <textarea
            {...register('description')}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-primaryColor"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-textColor mb-1">Lieu</label>
          <input
            type="text"
            {...register('location')}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-primaryColor"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-textColor mb-1">Statut</label>
            <select
              {...register('status')}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-primaryColor"
            >
              <option value="Planifié">Planifié</option>
              <option value="Terminé">Terminé</option>
              <option value="Annulé">Annulé</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-textColor mb-1">Priorité</label>
            <select
              {...register('priority')}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-primaryColor"
            >
              <option value="Basse">Basse</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Haute">Haute</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-textColor mb-1">Rappel (minutes)</label>
            <input
              type="number"
              {...register('reminder')}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-primaryColor"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-textColor mb-1">URL de la réunion</label>
            <input
              type="url"
              {...register('meetingUrl')}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-primaryColor"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-textColor mb-1">Fichiers joints (URLs séparées par des virgules)</label>
          <textarea
            {...register('attachments')}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-primaryColor"
            rows="2"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-primaryColor text-white font-semibold rounded-lg shadow-md hover:bg-primaryColor-dark focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-opacity-75"
        >
          Ajouter l'événement
        </button>
      </form>
    </div>
  );
};

export default AddEventForm;
