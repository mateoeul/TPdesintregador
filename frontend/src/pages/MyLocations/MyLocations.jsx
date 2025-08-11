import { useEffect, useState } from "react";
import eventLocationsService from "../../services/event_locationService";
import { useNavigate } from "react-router-dom";
import "./MyLocations.css";

const MyLocations = () => {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingLocation, setEditingLocation] = useState(null);
    const [formData, setFormData] = useState({
        id_location: "",
        name: "",
        full_address: "",
        max_capacity: "",
        latitude: "",
        longitude: ""
    });

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            setLoading(true);
            const data = await eventLocationsService.getUserLocations();
            setLocations(data || []);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            id_location: "",
            name: "",
            full_address: "",
            max_capacity: "",
            latitude: "",
            longitude: ""
        });
        setEditingLocation(null);
        setShowCreateForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (editingLocation) {
                await eventLocationsService.updateLocation(editingLocation.id, formData);
                alert("Ubicación actualizada exitosamente");
            } else {
                await eventLocationsService.createLocation(formData);
                alert("Ubicación creada exitosamente");
            }
            
            resetForm();
            fetchLocations();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleEdit = (location) => {
        setEditingLocation(location);
        setFormData({
            id_location: location.id_location,
            name: location.name,
            full_address: location.full_address,
            max_capacity: location.max_capacity,
            latitude: location.latitude,
            longitude: location.longitude
        });
        setShowCreateForm(true);
    };

    const handleDelete = async (locationId) => {
        if (window.confirm("¿Estás seguro de que querés eliminar esta ubicación?")) {
            try {
                await eventLocationsService.deleteLocation(locationId);
                alert("Ubicación eliminada exitosamente");
                fetchLocations();
            } catch (error) {
                alert(`Error al eliminar la ubicación: ${error.message}`);
            }
        }
    };

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
                <p>Cargando ubicaciones...</p>
            </div>
        );
    }

    if (error) {
        return <p className="error-message">Error: {error}</p>;
    }

    return (
        <div className="my-locations-container">
            <h2 style={{ margin: 0, fontSize: "26px", fontWeight: 800 }}>Mis Ubicaciones</h2>
            
            <div className="header-section">
                <button 
                    className="add-location-btn" 
                    onClick={() => setShowCreateForm(true)}
                >
                    Agregar Ubicación
                </button>
            </div>

            {/* Formulario de creación/edición */}
            {showCreateForm && (
                <div className="location-form-container">
                    <h3>{editingLocation ? "Editar Ubicación" : "Crear Nueva Ubicación"}</h3>
                    
                    <form onSubmit={handleSubmit} className="location-form">
                        <div className="form-row">
                            <label>
                                ID de Ubicación:
                                <input
                                    type="number"
                                    name="id_location"
                                    value={formData.id_location}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Ej: 3397"
                                />
                            </label>
                            
                            <label>
                                Nombre:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Ej: Sigma"
                                    minLength={3}
                                />
                            </label>
                        </div>

                        <div className="form-row">
                            <label>
                                Dirección Completa:
                                <input
                                    type="text"
                                    name="full_address"
                                    value={formData.full_address}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Ej: Sigma 2874"
                                    minLength={3}
                                />
                            </label>
                            
                            <label>
                                Capacidad Máxima:
                                <input
                                    type="number"
                                    name="max_capacity"
                                    value={formData.max_capacity}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Ej: 500"
                                    min={1}
                                />
                            </label>
                        </div>

                        <div className="form-row">
                            <label>
                                Latitud:
                                <input
                                    type="number"
                                    name="latitude"
                                    value={formData.latitude}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Ej: -51.1111"
                                    step="any"
                                />
                            </label>
                            
                            <label>
                                Longitud:
                                <input
                                    type="number"
                                    name="longitude"
                                    value={formData.longitude}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Ej: -11.1111"
                                    step="any"
                                />
                            </label>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="submit-btn">
                                {editingLocation ? "Actualizar" : "Crear"}
                            </button>
                            <button 
                                type="button" 
                                className="cancel-btn"
                                onClick={resetForm}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Lista de ubicaciones */}
            <div className="locations-section">
                <h3 className="section-title">Tus ubicaciones creadas</h3>
                <p className="section-subtitle">Ubicaciones que vos registraste para eventos.</p>
                
                {locations.length === 0 ? (
                    <p className="no-locations">No tenés ubicaciones registradas.</p>
                ) : (
                    <div className="locations-grid">
                        {locations.map((location) => (
                            <div key={location.id} className="location-card">
                                <div className="location-header">
                                    <h4 className="location-name">{location.name}</h4>
                                    <div className="location-actions">
                                        <button 
                                            className="edit-btn" 
                                            onClick={() => handleEdit(location)}
                                            title="Editar ubicación"
                                        >
                                            ✏️
                                        </button>
                                        <button 
                                            className="delete-btn" 
                                            onClick={() => handleDelete(location.id)}
                                            title="Eliminar ubicación"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="location-details">
                                    <p><strong>Dirección:</strong> {location.full_address}</p>
                                    <p><strong>Capacidad:</strong> {location.max_capacity} personas</p>
                                    <p><strong>Coordenadas:</strong> {location.latitude}, {location.longitude}</p>
                                    <p><strong>ID Ubicación:</strong> {location.id_location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyLocations;