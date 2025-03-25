import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface Center {
    lat: number;
    lng: number;
}

interface InputMapProps {
    defaultCenter: Center;
    onLocationSelected: (location: Center) => void;
}

const containerStyle = {
    width: '100%',
    height: '500px',
};



const InputMap: React.FC<InputMapProps> = ({ onLocationSelected }) => {
    const [selectedLocation, setSelectedLocation] = useState<Center | null>(null);
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_API_MAPS || '', // Reemplaza con tu API Key real
    });

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
        lat: 14.628434,
        lng: -90.522713,
    };

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
                    {selectedLocation && (
                        <Marker position={selectedLocation} />
                    )}
                </GoogleMap>
            </div>
        </div>
    );
};

export default InputMap;