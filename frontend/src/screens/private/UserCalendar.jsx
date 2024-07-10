import React from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useGetEventsQuery } from '../../slices/eventSlice';
import Loader from '../../components/shared/Loader';
import { CirclePlus } from 'lucide-react';

const UserCalendar = () => {
  const { data: events, error, isLoading } = useGetEventsQuery();

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

  const formattedEvents = events.map(event => ({
    title: event.title,
    start: event.date,
    url: `/event/${event._id}`, // Assurez-vous que _id est correct selon votre modèle
    extendedProps: {
      description: event.description,
      location: event.location,
      status: event.status,
      priority: event.priority,
      meetingUrl: event.meetingUrl,
    },
  }));

  return (
    <div className="h-screen p-4 bg-backgroundColor text-textColor text-sm">
        <Link to={'/add-event-form'} className="bg-primaryColor text-white font-semibold py-1 px-5 rounded-full mb-2 flex items-center w-[15rem]"> <CirclePlus className='mr-2' /> Ajouter un évènement</Link>
      <div className="flex justify-center items-center w-full">
        <div className="bg-gray-700 p-6 rounded-lg shadow-md w-full max-w-7xl">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={formattedEvents}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            locale="fr"
            buttonText={{
              today: 'Aujourd\'hui',
              month: 'Mois',
              week: 'Semaine',
              day: 'Jour',
            }}
            height="auto"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventClick={(info) => {
              info.jsEvent.preventDefault();
              if (info.event.url) {
                window.open(info.event.url, "_self");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserCalendar;
