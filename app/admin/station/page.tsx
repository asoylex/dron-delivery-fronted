"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputMap from "../../components/InputMap";
import { getAllStations, saveStation } from "../../services/station";

export default function StationForm() {
    const [stations, setStations] = useState<{ id: number; name: string; lat: number; long: number }[]>([]);
    const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 }); // Centro inicial del mapa

    // Use Formik
    const formik = useFormik({
        initialValues: { name: "", lat: 0, long: 0 },
        validationSchema: Yup.object({
            name: Yup.string().required("El nombre de la estación es obligatorio"),
            lat: Yup.number().required("La latitud es obligatoria"),
            long: Yup.number().required("La longitud es obligatoria"),
        }),
        onSubmit: async (values) => {

            console.log(values);
            await saveStation(values);
            formik.resetForm();

            setStations([...stations, { ...values, id: stations.length + 1 }]);
            setMapCenter({ lat: 0, lng: 0 });
        },
    });

    // Obtener estaciones cuando el componente se monta
    useEffect(() => {
        getAllStations().then((data) => setStations(data));
    }, []);

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold text-gray-900">Información de la Estación</h2>
                <p className="mt-1 text-sm text-gray-600">Agregue la información de la estación</p>

                <form onSubmit={formik.handleSubmit} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-900">Nombre</label>
                        <div className="mt-2">
                            <input
                                name="name"
                                type="text"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-green-600 sm:text-sm"
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-500 text-sm">{formik.errors.name}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className="sm:col-span-full">
                        <label className="block text-sm font-medium text-gray-900">Ubicación de la Estación</label>
                        <div className="mt-2">
                            <InputMap
                                defaultCenter={mapCenter}
                                onLocationSelected={(location) => {
                                    formik.setFieldValue("lat", location.lat);
                                    formik.setFieldValue("long", location.lng);
                                }}
                                stations={stations}
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
                <div className="mt-8 ">
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

            {/* Tabla de Estaciones */}

        </div>
    );
}
