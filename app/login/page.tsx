import React from 'react';

export default function LoginPage() {
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
                <form action="#" method="POST" className="space-y-6">
                    <div>
                        <div className="col-span-2">
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder="Correo electrónico"
                                autoComplete="email"
                                aria-label="Correo electrónico"
                                className="block w-full rounded-t-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                            />
                        </div>
                        <div className="-mt-px">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Contraseña"
                                autoComplete="current-password"
                                aria-label="Contraseña"
                                className="block w-full rounded-b-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                            />
                        </div>
                    </div>


                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}