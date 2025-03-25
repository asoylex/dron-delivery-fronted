"use client";
import { useState } from "react";

export default function ProductForm() {
    const [products, setProducts] = useState<{ id: number; name: string; description: string; pricing: string; }[]>([]);
    const [formData, setFormData] = useState({ name: "", description: "", pricing: "" });

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setProducts([...products, { ...formData, id: products.length + 1 }]);
        setFormData({ name: "", description: "", pricing: "" });
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold text-gray-900">Información del Producto</h2>
                <p className="mt-1 text-sm text-gray-600">Agregue la información del producto</p>

                <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-900">Nombre</label>
                        <div className="mt-2">
                            <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-green-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-900">Descripción</label>
                        <div className="mt-2">
                            <input
                                name="description"
                                type="text"
                                value={formData.description}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-green-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-900">Precio</label>
                        <div className="mt-2">
                            <input
                                name="pricing"
                                type="number"
                                value={formData.pricing}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-green-600 sm:text-sm"
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

            {/* Tabla de Productos */}
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nombre</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Descripción</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Precio</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{product.id}</td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{product.name}</td>
                                            <td className="px-3 py-4 text-sm text-gray-500">{product.description}</td>
                                            <td className="px-3 py-4 text-sm text-gray-500">${product.pricing}</td>
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
