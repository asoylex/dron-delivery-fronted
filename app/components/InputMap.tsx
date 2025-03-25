import React, { useState } from 'react';
import { GoogleMap, Marker, Circle, useJsApiLoader } from '@react-google-maps/api';

interface Center {
    lat: number;
    lng: number;
}

interface Station {
    id: number;
    name: string;
    lat: number;
    long: number;
}

interface InputMapProps {
    defaultCenter: Center;
    onLocationSelected: (location: Center) => void;
    stations: Station[];  // Recibimos la lista de estaciones
}

const containerStyle = {
    width: '100%',
    height: '600px',
};

const InputMap: React.FC<InputMapProps> = ({ onLocationSelected, stations }) => {
    const [selectedLocation, setSelectedLocation] = useState<Center | null>(null);
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_API_MAPS ?? 'YOUR_API_KEY',  // Asegúrate de reemplazarlo con tu API Key real
    });

    // Maneja el clic en el mapa para seleccionar una nueva ubicación
    function handleMapClick(event: google.maps.MapMouseEvent) {
        if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            const newLocation = { lat, lng };
            setSelectedLocation(newLocation);
            onLocationSelected(newLocation);
        }
    }

    if (loadError) {
        return <div>Error cargando el mapa.</div>;
    }

    if (!isLoaded) {
        return <div>Cargando mapa...</div>;
    }

    const defaultCenter = {
        lat: 14.628434,  // Coordenadas por defecto
        lng: -90.522713,
    };

    // Radio de 5 km en metros
    const radius = 7000;

    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Seleccione la ubicación</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
                {selectedLocation && (
                    <p>Lat: {selectedLocation.lat}, Lng: {selectedLocation.lng}</p>
                )}
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={defaultCenter}
                    zoom={12}
                    onClick={handleMapClick}
                >
                    {/* Mostrar el marcador para la ubicación seleccionada */}
                    {selectedLocation && <Marker position={selectedLocation} />}

                    {/* Mostrar todos los marcadores de las estaciones */}
                    {stations.length > 0 && stations.map((station) => (
                        <React.Fragment key={station.id}>
                            <Marker position={{ lat: Number(station.lat), lng: Number(station.long) }} title={station.name} />
                            <Circle
                                center={{ lat: Number(station.lat), lng: Number(station.long) }}
                                radius={radius}
                                options={{
                                    strokeColor: '#0000FF',  // Color del borde del círculo
                                    strokeOpacity: 0.5,
                                    strokeWeight: 2,
                                    fillColor: '#BFDBFE',    // Color de relleno del círculo
                                    fillOpacity: 0.2,
                                }}
                            />
                        </React.Fragment>
                    ))}
                    {
                        //bodega central
                        <Marker
                            position={{ lat: 14.598866947156056, lng: -90.50777435302734 }}
                            title="Bodega Central"
                            icon={{
                                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                                scaledSize: new google.maps.Size(40, 40)
                            }}
                        />
                    }

                </GoogleMap>
            </div>
        </div>
    );
};

export default InputMap;
