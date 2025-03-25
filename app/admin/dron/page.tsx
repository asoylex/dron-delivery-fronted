"use client";
import { useState } from "react";

export default function VehicleForm() {
    const [vehicles, setVehicles] = useState<{ id: number; model: string; max_range_km: string; speed_km_h: string; station: string; }[]>([]);
    const [formData, setFormData] = useState({ model: "", max_range_km: "", speed_km_h: "", station: "" });
    const stations = ["Station A", "Station B", "Station C"]; // Simulación de estaciones

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setVehicles([...vehicles, { ...formData, id: vehicles.length + 1 }]);
        setFormData({ model: "", max_range_km: "", speed_km_h: "", station: "" });
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold text-gray-900">Informacion del Dron</h2>
                <p className="mt-1 text-sm text-gray-600">Agregue la informacion del Dron</p>

                <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-900">Model</label>
                        <div className="mt-2">
                            <input
                                name="model"
                                type="text"
                                value={formData.model}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-green-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-900">Max Range (km)</label>
                        <div className="mt-2">
                            <input
                                name="max_range_km"
                                type="number"
                                value={formData.max_range_km}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-green-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-900">Speed (km/h)</label>
                        <div className="mt-2">
                            <input
                                name="speed_km_h"
                                type="number"
                                value={formData.speed_km_h}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-green-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-900">Estacion</label>
                        <div className="mt-2 grid grid-cols-1">
                            <select
                                name="station"
                                value={formData.station}
                                onChange={handleChange}
                                className="w-full rounded-md bg-white py-1.5 px-3 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-green-600 sm:text-sm"
                            >
                                <option value="">Seleccione la estacion</option>
                                {stations.map((station, index) => (
                                    <option key={index} value={station}>{station}</option>
                                ))}
                            </select>
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

            {/* Tabla de Vehículos */}
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Model</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Max Range (km)</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Speed (km/h)</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Station</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {vehicles.map((vehicle) => (
                                        <tr key={vehicle.id}>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{vehicle.id}</td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{vehicle.model}</td>
                                            <td className="px-3 py-4 text-sm text-gray-500">{vehicle.max_range_km}</td>
                                            <td className="px-3 py-4 text-sm text-gray-500">{vehicle.speed_km_h}</td>
                                            <td className="px-3 py-4 text-sm text-gray-500">{vehicle.station}</td>
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