'use client'

import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { GoogleMap, useJsApiLoader, Polyline, Marker } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '90vh',
}

const center = {
    lat: 14.628434,
    lng: -90.522713,
}

const startPoint = {
    lat: 14.601192436548484,
    lng: -90.61781340283203,
};

const endPoint = {
    lat: 14.604846988722352,
    lng: -90.44237547558593,
};

export default function Example() {
    const [open, setOpen] = useState(false)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_API_MAPS || '',
    })

    const [path] = useState([startPoint, endPoint]);
    const [currentPosition, setCurrentPosition] = useState(startPoint);
    const animationInterval = useRef<NodeJS.Timeout | null>(null);
    const animationDuration = 20000; // Tiempo en milisegundos para la trayectoria (ej: 5 segundos)
    const steps = 100; // Número de pasos en la animación
    const stepInterval = animationDuration / steps;
    const step = useRef(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isLoaded && isAnimating) {
            startAnimation();
        } else if (!isAnimating) {
            stopAnimation();
            setCurrentPosition(startPoint);
            step.current = 0;
        }
        return () => {
            stopAnimation();
        };
    }, [isLoaded, isAnimating]);

    const startAnimation = () => {
        step.current = 0;
        stopAnimation();

        animationInterval.current = setInterval(() => {
            if (step.current < steps) {
                const fraction = step.current / steps;
                const latDiff = endPoint.lat - startPoint.lat;
                const lngDiff = endPoint.lng - startPoint.lng;

                setCurrentPosition({
                    lat: startPoint.lat + latDiff * fraction,
                    lng: startPoint.lng + lngDiff * fraction,
                });
                step.current++;
            } else {
                stopAnimation();
                setIsAnimating(false); // Stop animation when it reaches the end
            }
        }, stepInterval);
    };

    const stopAnimation = () => {
        if (animationInterval.current) {
            clearInterval(animationInterval.current);
            animationInterval.current = null;
        }
    };

    const handleStartRoute = () => {
        setIsAnimating(true);
    };

    return (
        <div>
            <div className="relative">
                {isLoaded && <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                >
                    {/* Dibujar la línea recta */}
                    <Polyline
                        path={path}
                        options={{
                            strokeColor: '#FF0000',
                            strokeOpacity: 0.8,
                            strokeWeight: 3,
                        }}
                    />
                    {/* Marcador de inicio */}
                    <Marker position={startPoint} label="Inicio" />
                    {/* Marcador de fin */}
                    <Marker position={endPoint} label="Fin" />
                    {/* Marcador animado */}
                    {isAnimating && <Marker position={currentPosition} label="Dron" />}
                </GoogleMap>}

                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                    <button
                        onClick={handleStartRoute}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-40"
                    >
                        Iniciar recorrido
                    </button>
                    <button
                        onClick={() => setOpen(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 w-40"
                    >
                        Ver detalles
                    </button>

                </div>
            </div>

            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <DialogPanel
                                transition
                                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                            >
                                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">

                                    <div className="px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <DialogTitle className="text-base font-semibold text-gray-900">Mis Productos</DialogTitle>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                                                >
                                                    <span className="absolute -inset-2.5" />
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon aria-hidden="true" className="size-6" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white rounded-3xl shadow-lg flex flex-col items-center">
                                        <iframe src="https://lottie.host/embed/4b08e79b-f22b-465a-9827-860241b8af0e/dVYKLErqL4.lottie" width={100}></iframe>
                                        <iframe src="https://lottie.host/embed/747e8fbf-3249-47e9-9906-58861a1f09ae/Il1rFTAWMr.lottie" width={300}></iframe>
                                        <h2 className="text-lg font-semibold">Estimación de Entrega</h2>
                                        <p className="mt-2 text-gray-700">Tiempo estimado: <span className='animate-pulse'>30 minutos</span></p>
                                        <p className="mt-2 text-gray-700">Precio total: $50.00</p>
                                    </div>
                                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                        <fieldset className="border-t border-b border-gray-200">
                                            <legend className="sr-only">Notifications</legend>
                                            <div className="divide-y divide-gray-200">
                                                <div className="relative flex gap-3 pt-3.5 pb-4">
                                                    {/* ... (Tu contenido del diálogo) ... */}
                                                    <div className="flex">
                                                        <img
                                                            alt="Front of white cotton t-shirt with black and white mountain design on the front."
                                                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/order-history-page-07-product-01.jpg"
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

                                        </fieldset>
                                    </div>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}