"use client";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getClients } from "@/app/services/user";

export default function UserForm() {
    const [users, setUsers] = useState<{ id: number; name: string; username: string; phone: string; address?: string; lat?: number; long?: number; enable: boolean; credits: number; user: { email: string }; password: string }[]>([]);

    const initialValues = {
        name: "",
        username: "",
        phone: "",
        address: "",
        enable: true,
        credits: 0,
        email: "",
        password: ""
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        username: Yup.string().required("El usuario es obligatorio"),
        phone: Yup.string().required("El teléfono es obligatorio"),
        email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria")
    });

    useEffect(() => {
        getClients().then((data) => setUsers(data));
    }, []);

    const handleSubmit = (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {
        setUsers([...users, { ...values, id: users.length + 1, user: { email: values.email } }]);
        resetForm();
    };
    console.log(users);
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold text-gray-900">Registro de Usuario</h2>
                <p className="mt-1 text-sm text-gray-600">Agregue la información del usuario</p>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {[
                            { label: "Nombre", name: "name" },
                            { label: "Usuario", name: "username" },
                            { label: "Teléfono", name: "phone" },
                            { label: "Dirección", name: "address" },
                            { label: "Correo Electrónico", name: "email", type: "email" },
                            { label: "Contraseña", name: "password", type: "password" }
                        ].map(({ label, name, type = "text" }) => (
                            <div key={name} className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">{label}</label>
                                <div className="mt-2">
                                    <Field name={name} type={type} className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-green-600 sm:text-sm" />
                                    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>
                        ))}
                        <div className="sm:col-span-full">
                            <button type="submit" className="block w-[12rem] rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                                Guardar
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>

            {/* Tabla de Usuarios */}
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nombre</th>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Usuario</th>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Teléfono</th>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Correo</th>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Créditos</th>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {users.map((client) => (
                                        <tr key={client.id}>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{client.id}</td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{client.name}</td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{client.username}</td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{client.phone}</td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{client.user.email}</td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{client.credits}</td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">
                                                <button
                                                    onClick={() => {
                                                        const updatedUsers = users.filter((u) => u.id !== client.id);
                                                        setUsers(updatedUsers);
                                                    }}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
