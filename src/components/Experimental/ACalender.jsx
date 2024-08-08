import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import axios from 'axios';

const AdvancedCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleDateClick = (info) => {
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent = {
        title,
        start: info.dateStr,
        end: info.dateStr, // Assuming single-day events; adjust if needed
      };

      axios.post('http://localhost:5000/events', newEvent)
        .then(response => {
          setEvents([...events, response.data]);
        })
        .catch(error => {
          console.error('Error creating event:', error);
        });
    }
  };

  const handleEventChange = (info) => {
    const updatedEvent = {
      ...info.event,
      start: info.event.startStr,
      end: info.event.endStr,
    };

    axios.put(`http://localhost:5000/events/${info.event.id}`, updatedEvent)
      .then(response => {
        const updatedEvents = events.map(event =>
          event.id === response.data.id ? response.data : event
        );
        setEvents(updatedEvents);
      })
      .catch(error => {
        console.error('Error updating event:', error);
      });
  };

  const handleEventClick = (info) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      axios.delete(`http://localhost:5000/events/${info.event.id}`)
        .then(() => {
          setEvents(events.filter(event => event.id !== info.event.id));
        })
        .catch(error => {
          console.error('Error deleting event:', error);
        });
    }
  };

  return (
    <div className="calendar-container overflow-auto h-[calc(100vh-4rem)] p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek addEventButton',
        }}
        editable
        selectable
        events={events}
        dateClick={handleDateClick}
        eventChange={handleEventChange}
        eventClick={handleEventClick}
        customButtons={{
          addEventButton: {
            text: 'Add Event',
            click: () => {
              const title = prompt('Enter event title:');
              if (title) {
                const newEvent = {
                  title,
                  start: new Date().toISOString(),
                };

                axios.post('http://localhost:5000/events', newEvent)
                  .then(response => {
                    setEvents([...events, response.data]);
                  })
                  .catch(error => {
                    console.error('Error creating event:', error);
                  });
              }
            },
            classNames: 'bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600',
          },
        }}
      />
    </div>
  );
};

export default AdvancedCalendar;