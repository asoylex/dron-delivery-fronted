"use client";
import React, { useState } from 'react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        phone: '',
        address: '',
        lat: '',
        long: '',
        enable: true,
        credits: 0,
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    return (
        <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 h-screen">
            <div className="w-full max-w-sm space-y-10">
                <div>
                    <img
                        alt="Your Company"
                        src="https://launion.com.gt/wp-content/uploads/2024/12/Logo-56_Mesa-de-trabajo-1_020b006e0_6174.jpg"
                        className="mx-auto h-10 w-auto"
                    />
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Nombre"
                        autoComplete="name"
                        aria-label="Nombre"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        placeholder="Nombre de usuario"
                        autoComplete="username"
                        aria-label="Nombre de usuario"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="Teléfono"
                        autoComplete="tel"
                        aria-label="Teléfono"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Dirección"
                        autoComplete="address"
                        aria-label="Dirección"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <input
                        id="lat"
                        name="lat"
                        type="number"
                        placeholder="Latitud"
                        autoComplete="lat"
                        aria-label="Latitud"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                        value={formData.lat}
                        onChange={handleChange}
                    />
                    <input
                        id="long"
                        name="long"
                        type="number"
                        placeholder="Longitud"
                        autoComplete="long"
                        aria-label="Longitud"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                        value={formData.long}
                        onChange={handleChange}
                    />
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        required
                        placeholder="Correo electrónico"
                        autoComplete="email"
                        aria-label="Correo electrónico"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="Contraseña"
                        autoComplete="new-password"
                        aria-label="Contraseña"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <input
                        id="confirm-password"
                        name="confirmPassword"
                        type="password"
                        required
                        placeholder="Confirmar contraseña"
                        autoComplete="new-password"
                        aria-label="Confirmar contraseña"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="w-full rounded-md bg-green-600 px-3 py-1.5 text-base text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 sm:text-sm/6"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
};
