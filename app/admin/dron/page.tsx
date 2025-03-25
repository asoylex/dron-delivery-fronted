"use client";
import { getAllStations } from "@/app/services/station";
import { getAllDrones, saveDrone } from "@/app/services/dron";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function VehicleForm() {
    const [vehicles, setVehicles] = useState<{ id: number; model: string; speed_km_h: string; station: string; }[]>([]);
    const [stations, setStations] = useState<{ id: number; name: string; }[]>([]);

    useEffect(() => {
        getAllStations().then((data) => setStations(data));
        getAllDrones().then((data) => setVehicles(data));
    }, []);

    const initialValues = {
        model: "",
        speed_km_h: "",
        station: "",
    };

    const validationSchema = Yup.object({
        model: Yup.string()
            .required("El modelo es obligatorio")
            .min(2, "Debe tener al menos 2 caracteres"),
        speed_km_h: Yup.number()
            .required("La velocidad es obligatoria")
            .positive("Debe ser un número positivo")
            .integer("Debe ser un número entero"),
        station: Yup.string().required("Debe seleccionar una estación"),
    });

    const handleSubmit = (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {

        saveDrone(values);
        const newVehicle = { ...values, id: vehicles.length + 1 };
        setVehicles([...vehicles, newVehicle]);
        resetForm();
    };

    console.log(stations);

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold text-gray-900">Información del Dron</h2>
                <p className="mt-1 text-sm text-gray-600">Agregue la información del Dron</p>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Modelo</label>
                                <div className="mt-2">
                                    <Field
                                        name="model"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-green-600 sm:text-sm"
                                    />
                                    <ErrorMessage name="model" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Velocidad (km/h)</label>
                                <div className="mt-2">
                                    <Field
                                        name="speed_km_h"
                                        type="number"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-green-600 sm:text-sm"
                                    />
                                    <ErrorMessage name="speed_km_h" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Estación</label>
                                <div className="mt-2">
                                    <Field
                                        as="select"
                                        name="station"
                                        className="w-full rounded-md bg-white py-1.5 px-3 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-green-600 sm:text-sm"
                                    >
                                        <option value="">Seleccione la estación</option>
                                        {stations.map((station) => (
                                            <option key={station.id} value={station.id}>
                                                {station.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="station" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="block w-[12rem] rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                >
                                    {isSubmitting ? "Guardando..." : "Guardar"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            {/* Tabla de Vehículos */}
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            ID
                                        </th>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Modelo
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Velocidad (km/h)
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Estación
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {vehicles.map((vehicle) => (
                                        <tr key={vehicle.id}>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">
                                                {vehicle.id}
                                            </td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">
                                                {vehicle.model}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500">
                                                {vehicle.speed_km_h}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500">
                                                {stations.length > 0 && stations.find(st => st.id == Number(vehicle.id))?.name || "Desconocida"}
                                            </td>
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
