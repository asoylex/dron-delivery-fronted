"use client";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAllRoles, saveRole } from "@/app/services/role";

export default function RoleForm() {
    const [roles, setRoles] = useState<{ id: number; name: string; slug: string }[]>([]);

    const initialValues = { name: "", slug: "" };

    const validationSchema = Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        slug: Yup.string().required("El slug es obligatorio")
    });

    useEffect(() => {
        getAllRoles().then((data) => setRoles(data));
    }, []);

    const handleSubmit = (values: { name: string; slug: string }, { resetForm }: { resetForm: () => void }) => {
        saveRole(values);
        setRoles([...roles, { ...values, id: roles.length + 1 }]);
        resetForm();
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold text-gray-900">Información del Rol</h2>
                <p className="mt-1 text-sm text-gray-600">Agregue la información del rol</p>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">Nombre</label>
                            <div className="mt-2">
                                <Field name="name" type="text" className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-green-600 sm:text-sm" />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">Slug</label>
                            <div className="mt-2">
                                <Field name="slug" type="text" className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-green-600 sm:text-sm" />
                                <ErrorMessage name="slug" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </div>

                        <div className="sm:col-span-full">
                            <button type="submit" className="block w-[12rem] rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                                Guardar
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>

            {/* Tabla de Roles */}
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nombre</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Slug</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {roles.map((role) => (
                                        <tr key={role.id}>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{role.id}</td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{role.name}</td>
                                            <td className="px-3 py-4 text-sm text-gray-500">{role.slug}</td>
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
