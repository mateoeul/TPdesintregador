import { useEffect, useState } from "react";
import eventService from "../../services/eventService";
import EventCard from "../../components/eventCard.jsx/eventCard";
import "./MyEvents.css"
const UserEnrolledEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await eventService.userEnrolledEvents();
                if (data.events) {
                    setEvents(data.events);
                }
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
                <p>Cargando eventos...</p>
            </div>
        );
    }

    if (error) {
        return <p className="error-message">Error: {error}</p>;
    }

    if (events.length === 0) {
        return <p>No estás inscripto a ningún evento.</p>;
    }

    return (
        <div className="my-events-container">
            <div className="header-section">
                <button className="add-event-btn">Agregar Evento</button>
            </div>
    
            <h3 className="section-title">Eventos en los que te inscribiste</h3>
    
            <div className="event-list">
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        name={event.name}
                        description={event.description}
                        date={event.start_date}
                        duration={event.duration_in_minutes}
                        price={event.price}
                        capacity={event.max_assistance}
                        enrollmentStatus={event.enabled_for_enrollment}
                        id={event.id}
                    />
                ))}
            </div>
        </div>
    );
    
};

export default UserEnrolledEvents;
