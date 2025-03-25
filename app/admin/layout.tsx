

"use client";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from "next/navigation";


interface LayoutClientProps {
    children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {

    const pathname = usePathname(); // Obtiene la ruta actual

    // Función para verificar si la ruta está activa
    const isRoute = (path: string) => pathname === path;
    return (
        <div
        >

            <Disclosure as="nav" className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button */}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-hidden focus:ring-inset">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />


                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <img
                                    alt="Your Company"
                                    src="https://launion.com.gt/wp-content/uploads/2024/12/Logo-56_Mesa-de-trabajo-1_020b006e0_6174.jpg"

                                    className="h-8 w-auto"
                                />
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {/* Current: "border-green-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                <Link
                                    href="/admin/dron"
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${isRoute("/admin/dron") ? "border-green-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        }`}
                                >
                                    Drones
                                </Link>
                                <Link
                                    href="/admin/product"
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${isRoute("/admin/product") ? "border-green-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        }`}
                                >
                                    Productos
                                </Link>
                                <Link
                                    href="/admin/role"
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${isRoute("/admin/role") ? "border-green-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        }`}
                                >
                                    Roles
                                </Link>
                                <Link
                                    href="/admin/station"
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${isRoute("/admin/station") ? "border-green-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        }`}
                                >
                                    Estaciones
                                </Link>
                                <Link
                                    href="/admin/status"
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${isRoute("/admin/status") ? "border-green-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        }`}
                                >
                                    Estados
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 pt-2 pb-4">
                        {/* Current: "bg-green-50 border-green-500 text-green-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                        <Link
                            href="/admin/dron"
                            className={`block border-l-4 py-2 pr-4 pl-3 text-base font-medium ${isRoute("/admin/dron")
                                ? "border-green-500 bg-green-50 text-green-700"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                }`}
                        >
                            Drones
                        </Link>
                        <Link
                            href="/admin/product"
                            className={`block border-l-4 py-2 pr-4 pl-3 text-base font-medium ${isRoute("/admin/product")
                                ? "border-green-500 bg-green-50 text-green-700"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                }`}
                        >
                            Productos
                        </Link>
                        <Link
                            href="/admin/role"
                            className={`block border-l-4 py-2 pr-4 pl-3 text-base font-medium ${isRoute("/admin/role")
                                ? "border-green-500 bg-green-50 text-green-700"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                }`}
                        >
                            Roles
                        </Link>
                        <Link
                            href="/admin/station"
                            className={`block border-l-4 py-2 pr-4 pl-3 text-base font-medium ${isRoute("/admin/station")
                                ? "border-green-500 bg-green-50 text-green-700"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                }`}

                        >
                            Estaciones
                        </Link>
                        <Link
                            href="/admin/status"
                            className={`block border-l-4 py-2 pr-4 pl-3 text-base font-medium ${isRoute("/admin/status")
                                ? "border-green-500 bg-green-50 text-green-700"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                }`}

                        >
                            Estados
                        </Link>
                    </div>
                </DisclosurePanel>
            </Disclosure>
            {children}
        </div>
    );
}