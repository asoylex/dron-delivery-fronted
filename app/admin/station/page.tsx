"use client";
import { useState } from "react";
import InputMap from "../../components/InputMap";


export default function StationForm() {
    const [stations, setStations] = useState<{ id: number; name: string; lat: number; long: number }[]>([]);
    const [formData, setFormData] = useState({ name: "", lat: 0, long: 0 });
    const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 }); // Centro inicial del mapa

    const handleChangeName = (e: { target: { name: string; value: string; }; }) => {
        setFormData({ ...formData, name: e.target.value });
    };

    const handleLocationSelected = (location: { lat: number; lng: number }) => {
        setFormData({ ...formData, lat: location.lat, long: location.lng });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setStations([...stations, { ...formData, id: stations.length + 1 }]);
        setFormData({ name: "", lat: 0, long: 0 });
        setMapCenter({ lat: 0, lng: 0 }); // Resetear el centro del mapa si es necesario
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold text-gray-900">Información de la Estación</h2>
                <p className="mt-1 text-sm text-gray-600">Agregue la información de la estación</p>

                <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-900">Nombre</label>
                        <div className="mt-2">
                            <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChangeName}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-green-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-full">
                        <label className="block text-sm font-medium text-gray-900">Ubicación de la Estación</label>
                        <div className="mt-2">
                            <InputMap
                                defaultCenter={mapCenter}
                                onLocationSelected={handleLocationSelected}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-full">
                        <button
                            type="submit"
                            className="block w-[12rem] rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>

            {/* Tabla de Estaciones */}
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nombre</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Latitud</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Longitud</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {stations.map((station) => (
                                        <tr key={station.id}>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{station.id}</td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{station.name}</td>
                                            <td className="px-3 py-4 text-sm text-gray-500">{station.lat}</td>
                                            <td className="px-3 py-4 text-sm text-gray-500">{station.long}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}