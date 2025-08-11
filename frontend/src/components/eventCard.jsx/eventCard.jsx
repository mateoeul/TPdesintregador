import "./eventCard.css";
import { useNavigate } from "react-router-dom";

const EventCard = ({ 
  id, 
  name, 
  description, 
  date, 
  duration, 
  price, 
  capacity, 
  enrollmentStatus, 
  showActions = false,
  onEdit,
  onDelete 
}) => {
  
  function isTodayOrPast(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate <= today;
  }

  const isEnrollmentOpen = enrollmentStatus === "1" && !isTodayOrPast(date);

  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(id);
    } else {
      navigate(`/edit-event/${id}`);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="event-card">
      <h2 className="event-title">{name}</h2>
      <p className="event-description">{description}</p>
      <p className="event-info"><strong>Fecha:</strong> {date}</p>
      <p className="event-info"><strong>Duración:</strong> {duration} min</p>
      <p className="event-info"><strong>Precio:</strong> ${price}</p>
      <p className="event-info"><strong>Cupo máximo:</strong> {capacity} personas</p>

      <p className={`event-status ${isEnrollmentOpen ? "open" : "closed"}`}>
        {isEnrollmentOpen ? "Inscripción abierta" : "Inscripción cerrada"}
      </p>

      {showActions && (
        <div className="event-actions">
          <button 
            className="edit-btn" 
            onClick={handleEdit}
            title="Editar evento"
          >
            ✏️
          </button>
          <button 
            className="delete-btn" 
            onClick={handleDelete}
            title="Eliminar evento"
          >
            🗑️
          </button>
        </div>
      )}

      <button onClick={() => navigate(`/eventDetail/${id}`)}>Ver más</button>
    </div>
  );
};

export default EventCard;