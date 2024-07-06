import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


const UserCalendar = () => {
  const [events, setEvents] = useState([
    { title: 'Réunion d\'équipe', date: '2024-07-15' },
    { title: 'Présentation client', date: '2024-07-20' },
    { title: 'Déjeuner d\'affaires', date: '2024-07-25' },
  ]);

  return (
    <div className="h-screen p-6 bg-backgroundColor text-textColor">
      <div className="flex justify-center items-center w-full">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-7xl">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            locale="fr" // Pour mettre le calendrier en français
            buttonText={{
              today: 'Aujourd\'hui',
              month: 'Mois',
              week: 'Semaine',
              day: 'Jour'
            }}
            height="auto"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
          />
        </div>
      </div>
    </div>
  );
}

export default UserCalendar;
