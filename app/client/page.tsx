"use client";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useState } from 'react';

const containerStyle = {
    width: '100%',
    height: '300px',
};

const center = {
    lat: 14.628434,
    lng: -90.522713,
};

export default function ClientHome() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyAuRJewHuegUVRF_XyHxHI13Un0-QXiQNY',
    });

    const [clickedLatLng, setClickedLatLng] = useState<{ lat: number; lng: number } | null>(null);

    function handleMapClick(event: google.maps.MapMouseEvent) {
        if (!event.latLng) {
            return;
        }
        const latLng = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setClickedLatLng(latLng);
        console.log("Coordenadas clickeadas:", latLng);
        // Aquí puedes hacer algo con las coordenadas guardadas, como mostrarlas en la UI
    }

    return (
        <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <fieldset className="border-t border-b border-gray-200">
                    <legend className="sr-only">Notifications</legend>
                    <div className="divide-y divide-gray-200">
                        <div className="divide-y divide-gray-200">
                            <div className="relative flex gap-3 pt-3.5 pb-4">
                                <div className="flex">
                                    <img
                                        alt="Front of white cotton t-shirt with black and white mountain design on the front."
                                        src="https://dummyimage.com/300x300/cccccc/000000.png&text=Imagen%20No%20Disponible"
                                        className="size-20 flex-none rounded-md object-cover sm:size-20"
                                    />
                                </div>
                                <div className="min-w-0 flex-1 text-sm/6">
                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                        Comments
                                    </label>
                                    <p id="comments-description" className="text-gray-500">
                                        Get notified when someones posts a comment on a posting.
                                    </p>
                                </div>
                                <div className="flex h-6 shrink-0 items-center">
                                    <div className="group grid size-4 grid-cols-1">
                                        <input
                                            defaultChecked
                                            id="comments"
                                            name="comments"
                                            type="checkbox"
                                            aria-describedby="comments-description"
                                            className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-green-600 checked:bg-green-600 indeterminate:border-green-600 indeterminate:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                        />
                                        <svg
                                            fill="none"
                                            viewBox="0 0 14 14"
                                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                        >
                                            <path
                                                d="M3 8L6 11L11 3.5"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-checked:opacity-100"
                                            />
                                            <path
                                                d="M3 7H11"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-indeterminate:opacity-100"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex gap-3 pt-3.5 pb-4">
                                <div className="flex">
                                    <img
                                        alt="Front of white cotton t-shirt with black and white mountain design on the front."
                                        src="https://tailwindcss.com/plus-assets/img/ecommerce-images/order-history-page-07-product-01.jpg"
                                        className="size-20 flex-none rounded-md object-cover sm:size-20"
                                    />
                                </div>
                                <div className="min-w-0 flex-1 text-sm/6">
                                    <label htmlFor="candidates" className="font-medium text-gray-900">
                                        Candidates
                                    </label>
                                    <p id="candidates-description" className="text-gray-500">
                                        Get notified when a candidate applies for a job.
                                    </p>
                                </div>
                                <div className="flex h-6 shrink-0 items-center">
                                    <div className="group grid size-4 grid-cols-1">
                                        <input
                                            id="candidates"
                                            name="candidates"
                                            type="checkbox"
                                            aria-describedby="candidates-description"
                                            className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-green-600 checked:bg-green-600 indeterminate:border-green-600 indeterminate:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                        />
                                        <svg
                                            fill="none"
                                            viewBox="0 0 14 14"
                                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                        >
                                            <path
                                                d="M3 8L6 11L11 3.5"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-checked:opacity-100"
                                            />
                                            <path
                                                d="M3 7H11"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-indeterminate:opacity-100"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex gap-3 pt-3.5 pb-4">
                                <div className="flex">
                                    <img
                                        alt="text"
                                        src="https://tailwindcss.com/plus-assets/img/ecommerce-images/order-history-page-07-product-01.jpg"
                                        className="size-20 flex-none rounded-md object-cover sm:size-20"
                                    />
                                </div>
                                <div className="min-w-0 flex-1 text-sm/6">
                                    <label htmlFor="offers" className="font-medium text-gray-900">
                                        Offers
                                    </label>
                                    <p id="offers-description" className="text-gray-500">
                                        Get notified when a candidate accepts or rejects an offer.
                                    </p>
                                </div>
                                <div className="flex h-6 shrink-0 items-center">
                                    <div className="group grid size-4 grid-cols-1">
                                        <input
                                            id="offers"
                                            name="offers"
                                            type="checkbox"
                                            aria-describedby="offers-description"
                                            className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-green-600 checked:bg-green-600 indeterminate:border-green-600 indeterminate:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                        />
                                        <svg
                                            fill="none"
                                            viewBox="0 0 14 14"
                                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                        >
                                            <path
                                                d="M3 8L6 11L11 3.5"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-checked:opacity-100"
                                            />
                                            <path
                                                d="M3 7H11"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-indeterminate:opacity-100"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
                {isLoaded && (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={12}
                        onClick={handleMapClick}
                    >
                        {/* Puedes agregar un marcador aquí si clickedLatLng tiene un valor */}
                        {clickedLatLng && (
                            <Marker position={clickedLatLng} label="Zona de entrega" />
                        )}
                    </GoogleMap>
                )}
                {/* Mostrar las coordenadas clickeadas */}
                {clickedLatLng && (
                    <div className="mt-4">
                        <p>Latitud clickeada: {clickedLatLng.lat}</p>
                        <p>Longitud clickeada: {clickedLatLng.lng}</p>
                    </div>
                )}
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="rounded-full my-10 bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        Generar Pedido
                    </button>
                </div>
            </div>
        </div>
    );
}