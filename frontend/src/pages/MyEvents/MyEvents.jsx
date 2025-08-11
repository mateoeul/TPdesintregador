import { useEffect, useState } from "react";
import eventService from "../../services/eventService";
import { useNavigate } from "react-router-dom";
import EventCard from "../../components/eventCard.jsx/eventCard";
import "./MyEvents.css"

const UserEnrolledEvents = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([]);
    const [createdEvents, setCreatedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const [enrolledRes, createdRes] = await Promise.all([
                    eventService.userEnrolledEvents(),
                    eventService.userCreatedEvents(),
                ]);

                if (enrolledRes?.events) setEvents(enrolledRes.events);
                if (createdRes?.events) setCreatedEvents(createdRes.events);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleEditEvent = (eventId) => {
        navigate(`/edit-event/${eventId}`);
    };

    const handleDeleteEvent = async (eventId) => {
        if (window.confirm("¿Estás seguro de que querés eliminar este evento?")) {
            try {
                await eventService.deleteEvent(eventId);
                // Actualizar la lista de eventos creados
                setCreatedEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
                alert("Evento eliminado exitosamente");
            } catch (error) {
                // Mostrar mensaje de error más claro
                if (error.message.includes("usuarios inscritos")) {
                    const userChoice = window.confirm(
                        `${error.message}\n\n¿Querés que te lleve a la página del evento para ver las inscripciones?`
                    );
                    if (userChoice) {
                        navigate(`/eventDetail/${eventId}`);
                    }
                } else {
                    alert(`Error al eliminar el evento: ${error.message}`);
                }
            }
        }
    };

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

    return (
        <div className="my-events-container">
            <h2 style={{ margin: 0, fontSize: "26px", fontWeight: 800 }}>Mis eventos</h2>
            <div className="header-section">
                <button className="add-event-btn" onClick={() => navigate("/create-event")}>Agregar Evento</button>
            </div>

            <h3 className="section-title">Tus eventos creados</h3>
            <p className="section-subtitle">Eventos que vos publicaste.</p>
            {createdEvents.length === 0 ? (
                <p>No tenés eventos creados.</p>
            ) : (
                <div className="event-list" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: 24,
                    alignItems: "stretch",
                    justifyItems: "stretch",
                }}>
                    {createdEvents.map((event) => (
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
                            showActions={true}
                            onEdit={handleEditEvent}
                            onDelete={handleDeleteEvent}
                        />
                    ))}
                </div>
            )}

            <h3 className="section-title">Eventos en los que te inscribiste</h3>
            <p className="section-subtitle">Eventos a los que te anotaste.</p>
            {events.length === 0 ? (
                <p>No estás inscripto a ningún evento.</p>
            ) : (
                <div className="event-list" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: 24,
                    alignItems: "stretch",
                    justifyItems: "stretch",
                }}>
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
                            showActions={false}
                        />
                    ))}
                </div>
            )}
        </div>
    );
    
};

export default UserEnrolledEvents;
