# MyLocations - Gestión de Ubicaciones de Eventos

## Descripción
La página MyLocations permite a los usuarios autenticados gestionar completamente sus ubicaciones de eventos. Incluye todas las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) con validaciones y una interfaz intuitiva.

## Funcionalidades Implementadas

### ✅ **Crear Ubicación**
- Formulario completo con validaciones
- Campos requeridos: id_location, name, full_address, max_capacity, latitude, longitude
- Validaciones del lado del cliente y servidor
- Botón "Agregar Ubicación" para mostrar/ocultar el formulario

### ✅ **Ver Ubicaciones**
- Lista de todas las ubicaciones del usuario autenticado
- Diseño en grid responsive
- Información completa: nombre, dirección, capacidad, coordenadas
- Estado de carga con spinner
- Manejo de errores

### ✅ **Editar Ubicación**
- Botón de edición (✏️) en cada tarjeta
- Formulario pre-cargado con datos existentes
- Mismas validaciones que la creación
- Botón "Actualizar" para guardar cambios

### ✅ **Eliminar Ubicación**
- Botón de eliminación (🗑️) en cada tarjeta
- Confirmación antes de eliminar
- Actualización automática de la lista
- Manejo de errores

## Estructura de Datos

### Campos del Formulario:
```javascript
{
    "id_location": 3397,        // ID de la ubicación (número)
    "name": "Sigma",            // Nombre (mínimo 3 caracteres)
    "full_address": "Sigma 2874", // Dirección (mínimo 3 caracteres)
    "max_capacity": 500,        // Capacidad máxima (mayor a 0)
    "latitude": -51.1111,       // Latitud (número decimal)
    "longitude": -11.1111       // Longitud (número decimal)
}
```

## Validaciones

### Frontend:
- **Nombre**: Mínimo 3 caracteres
- **Dirección**: Mínimo 3 caracteres  
- **Capacidad**: Mayor a 0
- **Campos requeridos**: Todos los campos son obligatorios

### Backend:
- Mismas validaciones que el frontend
- Verificación de permisos (solo el creador puede editar/eliminar)
- Validación de id_location existente

## Endpoints Utilizados

- `GET /api/events-locations` - Obtener ubicaciones del usuario
- `POST /api/events-locations` - Crear nueva ubicación
- `PUT /api/events-locations/:id` - Actualizar ubicación
- `DELETE /api/events-locations/:id` - Eliminar ubicación

## Componentes y Estilos

### Componente Principal:
- `MyLocations.jsx` - Lógica principal y renderizado
- Estado local para formularios y datos
- Manejo de operaciones CRUD

### Estilos:
- `MyLocations.css` - Diseño responsive y moderno
- Grid layout para las tarjetas
- Efectos hover y transiciones
- Diseño mobile-first

## Uso

1. **Navegar a MyLocations** desde el menú principal
2. **Crear ubicación**: Hacer clic en "Agregar Ubicación"
3. **Editar**: Hacer clic en el botón ✏️ de la tarjeta
4. **Eliminar**: Hacer clic en el botón 🗑️ de la tarjeta
5. **Ver detalles**: Toda la información se muestra en las tarjetas

## Características Técnicas

- **React Hooks**: useState, useEffect para manejo de estado
- **Async/Await**: Operaciones asíncronas con el backend
- **Manejo de errores**: Try-catch con mensajes informativos
- **Responsive**: Diseño adaptativo para móviles y desktop
- **Accesibilidad**: Tooltips y etiquetas descriptivas

## Dependencias

- `event_locationService.js` - Servicio para comunicación con el backend
- `react-router-dom` - Para navegación
- CSS personalizado para estilos únicos

## Estado de la Aplicación

La página mantiene el estado de:
- Lista de ubicaciones
- Formulario de creación/edición
- Estado de carga y errores
- Modo de edición (crear vs actualizar)
