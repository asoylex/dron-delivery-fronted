"use client";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAllProducts } from '../services/product';
import { saveOrder, addArticles } from '../services/order';
import { setLatLong, discountCredit, getClientById } from '../services/user';
import { successAlert, warningAlert } from '../helper/alert';
import { getAllStations } from '../services/station';
import haversine from 'haversine-distance';

const containerStyle = {
    width: '100%',
    height: '290px',
};

const center = {
    lat: 14.628434,
    lng: -90.522713,
};

export default function ClientHome() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_API_MAPS || '',
    });

    const [clickedLatLng, setClickedLatLng] = useState<{ lat: number; lng: number } | null>(null);
    const [user, setUser] = useState<{ id: number } | null>(null);
    const [products, setProducts] = useState<{ id: number; name: string; description: string; pricing: number }[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [totalCredit, setTotalCredit] = useState<number>(0);
    const [stations, setStations] = useState<{ id: number; name: string; lat: number; long: number }[]>([]);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('user') || '{}');

                if (!userData.user) {
                    warningAlert('Por favor inicie sesión');
                    return;
                }

                setUser(userData.user);

                const clientData = await getClientById(userData.user.id);
                setTotalCredit(clientData?.credits || 0);

                const stationsData = await getAllStations();
                setStations(stationsData);
            } catch (error) {
                console.error('Error:', error);
                warningAlert('Error al cargar datos del usuario');
            }
        };

        loadUserData();
    }, []);

    useEffect(() => {
        getAllProducts().then(setProducts);
    }, []);

    function handleCheckboxChange(productId: number) {
        setSelectedProducts((prevSelectedProducts) =>
            prevSelectedProducts.includes(productId)
                ? prevSelectedProducts.filter((id) => id !== productId)
                : [...prevSelectedProducts, productId]
        );
    }

    function handleMapClick(event: google.maps.MapMouseEvent) {
        if (!event.latLng) return;
        setClickedLatLng({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
    function findNearestStation(selectedLocation: { lat: number; lng: number }): { id: number; name: string; lat: number; long: number; distance: number } | null {
        let nearestStation: { id: number; name: string; lat: number; long: number; distance: number } | null = null;
        let minDistance = Infinity;

        stations.forEach(station => {
            const stationLocation = { lat: station.lat, lon: station.long };
            const selectedLatLng = { lat: selectedLocation.lat, lon: selectedLocation.lng };
            const distance = haversine(stationLocation, selectedLatLng) / 1000; // Convert meters to km

            if (distance <= 7 && distance < minDistance) {
                minDistance = distance;
                nearestStation = { ...station, distance };
            }
        });

        return nearestStation;
    }


    const formik = useFormik({
        initialValues: {
            userId: user?.id || '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            userId: Yup.number().required('Usuario requerido'),
        }),
        onSubmit: async (values) => {
            if (!clickedLatLng) {
                warningAlert('Debe seleccionar una ubicación en el mapa');
                return;
            }

            const nearestStation = findNearestStation(clickedLatLng);

            if (!nearestStation) {
                warningAlert('No hay estaciones disponibles en un radio de 7 km');
                return;
            }

            const distanceCost = nearestStation ? nearestStation.distance * 1 : 0; // Q1 por km

            const orderTotal = selectedProducts.reduce((acc, id) => {
                const product = products.find(p => p.id === id);
                return acc + (product ? product.pricing : 0);
            }, 0) + distanceCost;

            const order = await saveOrder({ userId: values.userId, statusId: 1 });
            await setLatLong({ userId: values.userId, lat: clickedLatLng.lat, long: clickedLatLng.lng });
            await discountCredit({ id: values.userId, discount: orderTotal });

            if (selectedProducts.length > 0) {
                await addArticles({ order_id: order.id, products: selectedProducts.map(id => ({ product_id: id, quantity: 1 })) });
            }

            successAlert(`Pedido generado exitosamente. Costo de envío: Q${distanceCost.toFixed(2)}`);

            await new Promise(resolve => setTimeout(resolve, 2000));
            window.location.href = '/client/tracking';
        },
    });

    return (
        <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <fieldset className="border-t border-b border-gray-200">
                    <legend className="sr-only">Products</legend>
                    <h2>
                        Credito disponible: Q. {totalCredit.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </h2>
                    <div className="divide-y divide-gray-200">
                        {products.map((product) => (
                            <div key={product.id} className="relative flex gap-3 pt-3.5 pb-4">
                                <div className="flex">
                                    <img
                                        alt="Imagen no disponible"
                                        src="https://dummyimage.com/300x300/cccccc/000000.png&text=Imagen%20No%20Disponible"
                                        className="size-20 flex-none rounded-md object-cover sm:size-20"
                                    />
                                </div>
                                <div className="min-w-0 flex-1 text-sm/6">
                                    <label className="font-medium text-gray-900">
                                        {product.name}
                                    </label>
                                    <p className="text-gray-500">
                                        {product.description}
                                    </p>
                                    <p className="text-gray-500">
                                        Precio: Q. {product.pricing}
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(product.id)}
                                    onChange={() => handleCheckboxChange(product.id)}
                                    className="rounded border-gray-300 focus:ring-green-600"
                                />
                            </div>
                        ))}
                    </div>
                </fieldset>
                <h3>
                    Total: Q. {Number(
                        selectedProducts.reduce((acc, id) => {
                            const product = products.find((p) => p.id === id);
                            return acc + (product && product.pricing ? Number(product.pricing) : 0);
                        }, 0)
                    ).toFixed(2)}
                    {clickedLatLng && (
                        <>
                            + Envío: Q. {(findNearestStation(clickedLatLng)?.distance || 0).toFixed(2)}
                        </>
                    )}
                </h3>

                {isLoaded && (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={12}
                        onClick={handleMapClick}
                    >
                        {clickedLatLng && <Marker position={clickedLatLng} label="Zona de entrega" />}
                    </GoogleMap>
                )}
                {
                    clickedLatLng && (
                        < div className="mt-4">
                            <p className="text-gray-500 text-sm">Ubicación seleccionada: Lat: {clickedLatLng.lat} Long: {clickedLatLng.lng}</p>
                        </div>
                    )
                }

                <div className=" justify-end">
                    <button
                        type="submit"
                        onClick={() => formik.handleSubmit()}
                        className="rounded-full my-10 bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        Generar Pedido
                    </button>
                </div>
            </div>
        </div >
    );
}
