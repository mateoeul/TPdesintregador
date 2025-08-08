import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import eventService from "../../services/eventService";
import "./eventForm.css";

const EventForm = () => {
  const { id } = useParams();  // id del evento para editar (opcional)
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    id_event_category: "",
    id_event_location: "",
    start_date: "",
    duration_in_minutes: "",
    price: "",
    enabled_for_enrollment: false,
    max_assistance: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(null);

  // Si hay id, cargo el evento para editar
  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      setLoading(true);
      try {
        const data = await eventService.getById(id);
        setForm({
          name: data.name || "",
          description: data.description || "",
          id_event_category: data.id_event_category || "",
          id_event_location: data.id_event_location || "",
          start_date: data.start_date ? data.start_date.slice(0, 16) : "",
          duration_in_minutes: data.duration_in_minutes || "",
          price: data.price || "",
          enabled_for_enrollment: data.enabled_for_enrollment === 1,
          max_assistance: data.max_assistance || "",
        });
      } catch (err) {
        setError("Error al cargar el evento.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!form.name || !form.description || !form.start_date) {
      setError("Por favor completá todos los campos obligatorios.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        ...form,
        id_event_category: Number(form.id_event_category),
        id_event_location: Number(form.id_event_location),
        duration_in_minutes: Number(form.duration_in_minutes),
        price: Number(form.price),
        enabled_for_enrollment: form.enabled_for_enrollment ? 1 : 0,
        max_assistance: Number(form.max_assistance),
      };

      if (id) {
        await eventService.updateEvent(id, payload);
        alert("Evento actualizado con éxito!");
      } else {
        await eventService.createEvent(payload);
        alert("Evento creado con éxito!");
      }
      navigate("/myevents"); // o donde tengas la lista de eventos
    } catch (err) {
      setError(err.message || "Error al guardar el evento.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("¿Querés eliminar este evento?")) return;

    setLoadingDelete(true);
    try {
      await eventService.deleteEvent(id);
      alert("Evento eliminado con éxito!");
      navigate("/myevents");
    } catch (err) {
      setError(err.message || "Error al eliminar el evento.");
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="event-form-page">
      <h1>{id ? "Editar Evento" : "Crear Evento"}</h1>

      {error && <p className="error-text">{error}</p>}

      {(loading || loadingDelete) && <p>Cargando...</p>}

      <form onSubmit={handleSubmit} className="event-form" style={{opacity: loading || loadingDelete ? 0.6 : 1}}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={loading || loadingDelete}
            required
          />
        </label>

        <label>
          Descripción:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            disabled={loading || loadingDelete}
            required
          />
        </label>

        <label>
          Categoría (ID):
          <input
            type="number"
            name="id_event_category"
            value={form.id_event_category}
            onChange={handleChange}
            disabled={loading || loadingDelete}
            min={1}
            required
          />
        </label>

        <label>
          Ubicación (ID):
          <input
            type="number"
            name="id_event_location"
            value={form.id_event_location}
            onChange={handleChange}
            disabled={loading || loadingDelete}
            min={1}
            required
          />
        </label>

        <label>
          Fecha y hora de inicio:
          <input
            type="datetime-local"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            disabled={loading || loadingDelete}
            required
          />
        </label>

        <label>
          Duración (minutos):
          <input
            type="number"
            name="duration_in_minutes"
            value={form.duration_in_minutes}
            onChange={handleChange}
            disabled={loading || loadingDelete}
            min={1}
            required
          />
        </label>

        <label>
          Precio ($):
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            disabled={loading || loadingDelete}
            min={0}
            required
          />
        </label>

        <label>
          Inscripción abierta:
          <input
            type="checkbox"
            name="enabled_for_enrollment"
            checked={form.enabled_for_enrollment}
            onChange={handleChange}
            disabled={loading || loadingDelete}
          />
        </label>

        <label>
          Cupo máximo:
          <input
            type="number"
            name="max_assistance"
            value={form.max_assistance}
            onChange={handleChange}
            disabled={loading || loadingDelete}
            min={1}
            required
          />
        </label>

        <div className="button-group" style={{marginTop: "20px"}}>
          <button type="submit" disabled={loading || loadingDelete}>
            {id ? "Guardar" : "Crear"}
          </button>

          {id && (
            <button
              type="button"
              className="btn-delete"
              onClick={handleDelete}
              disabled={loading || loadingDelete}
              style={{marginLeft: "10px"}}
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventForm;
