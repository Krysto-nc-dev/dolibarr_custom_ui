import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetEventByIdQuery } from '../../slices/eventSlice';
import Loader from '../../components/shared/Loader';

const UserEventDetailsScreen = () => {
  const { id } = useParams();
  const { data: event, isLoading, error } = useGetEventByIdQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-red-500">
        {typeof error.data.message === 'string'
          ? error.data.message
          : 'Une erreur est survenue'}
      </p>
    );
  }

  return (
    <div className="h-screen p-6 bg-backgroundColor text-textColor">
      <div className=" p-6 rounded-lg shadow-md max-w-9xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{event.title}</h1>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        {event.duration && <p><strong>Durée:</strong> {event.duration} minutes</p>}
        {event.description && <p><strong>Description:</strong> {event.description}</p>}
        {event.location && <p><strong>Lieu:</strong> {event.location}</p>}
        <p>
          <strong>Statut:</strong> {event.status}
        </p>
        <p>
          <strong>Priorité:</strong> {event.priority}
        </p>
        {event.reminder && <p><strong>Rappel:</strong> {event.reminder} minutes avant</p>}
        {event.attachments && event.attachments.length > 0 && (
          <div>
            <strong>Pièces jointes:</strong>
            <ul>
              {event.attachments.map((attachment, index) => (
                <li key={index}><a href={attachment} target="_blank" rel="noopener noreferrer">{attachment}</a></li>
              ))}
            </ul>
          </div>
        )}
        {event.meetingUrl && (
          <p><strong>URL de la réunion:</strong> <a href={event.meetingUrl} target="_blank" rel="noopener noreferrer">{event.meetingUrl}</a></p>
        )}
      </div>
    </div>
  );
}

export default UserEventDetailsScreen;
