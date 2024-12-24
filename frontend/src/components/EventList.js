import React, { useState, useEffect } from 'react';
import axios from '../utils/axios'; // Adjust the path based on your folder structure
import './EventList.css';
import { Link } from 'react-router-dom'; // Import Link for navigation

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [rsvpInfo, setRsvpInfo] = useState({});
  const [attendees, setAttendees] = useState({});

  // Fetch events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  // Handle RSVP input change
  const handleRsvpChange = (eventId, field, value) => {
    setRsvpInfo((prev) => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        [field]: value,
      },
    }));
  };

  // Handle RSVP submit
  const handleRsvpSubmit = async (eventId) => {
    const { name, email } = rsvpInfo[eventId] || {};
    if (!name || !email) {
      alert('Please provide both name and email.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/events/${eventId}/rsvp`,
        { name, email }
      );
      alert(response.data.message);
      fetchAttendees(eventId);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Error submitting RSVP.');
    }
  };

  // Fetch attendees
  const fetchAttendees = async (eventId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/events/${eventId}/attendees`
      );
      setAttendees((prev) => ({
        ...prev,
        [eventId]: response.data.attendees,
      }));
    } catch (error) {
      console.error('Error fetching attendees:', error);
    }
  };

  // Toggle attendees list visibility
  const toggleAttendees = (eventId) => {
    if (attendees[eventId]) {
      setAttendees((prev) => {
        const newAttendees = { ...prev };
        delete newAttendees[eventId];
        return newAttendees;
      });
    } else {
      fetchAttendees(eventId);
    }
  };


  
  // Handle voting
  const handleVote = async (eventId, option) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/events/${eventId}/vote`,
        { option }
      );
      alert(response.data.message);
    } catch (error) {
      console.error('Error voting:', error);
      alert('You have to login to vote.');
    }
  };

  return (
    <div className="event-list-container">
      {/* Home Button for Event List */}
      <Link to="/" className="eventlist-home-button">Home</Link> {/* Home Button outside of the event list */}

      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        events.map((event) => (
          <div key={event._id} className="event-card">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p className="date">
              {new Date(event.date).toLocaleDateString()}
            </p>

            {/* RSVP Form */}
            <div className="rsvp-form">
              <h3>RSVP</h3>
              <input
                type="text"
                placeholder="Your Name"
                value={rsvpInfo[event._id]?.name || ''}
                onChange={(e) =>
                  handleRsvpChange(event._id, 'name', e.target.value)
                }
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={rsvpInfo[event._id]?.email || ''}
                onChange={(e) =>
                  handleRsvpChange(event._id, 'email', e.target.value)
                }
                required
              />
              <button onClick={() => handleRsvpSubmit(event._id)}>
                RSVP
              </button>
            </div>

            <h3>Attendees</h3>
            <button className="attendees-button" onClick={() => toggleAttendees(event._id)}>
              {attendees[event._id] ? "Hide Attendees" : "Show Attendees"}
            </button>
            {attendees[event._id] && (
              <ul className="attendee-list">
                {attendees[event._id].map((attendee, index) => (
                  <li key={index}>
                    {attendee.name} ({attendee.email})
                  </li>
                ))}
              </ul>
            )}

            {/* Poll Options */}
            <div className="poll-options">
              <h3>Poll Options</h3>
              <ul>
                {event.pollOptions.map((option, index) => (
                  <li key={index}>
                    {option.option} - {option.votes} votes
                    <button onClick={() => handleVote(event._id, option.option)}>
                      Vote
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;
