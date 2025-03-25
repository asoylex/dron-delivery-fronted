"use client";
import { createCredentialAndRegisterUser } from '../services/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { successAlert, errorAlert } from '../helper/alert';
import { useRouter } from 'next/navigation';


export default function RegisterPage() {
    const router = useRouter();

    const validationSchema = Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        username: Yup.string().required("El nombre de usuario es obligatorio"),
        phone: Yup.string().matches(/^\d{8,15}$/, "Número de teléfono inválido").required("El teléfono es obligatorio"),
        address: Yup.string().required("La dirección es obligatoria"),
        email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
        password: Yup.string().min(6, "Mínimo 6 caracteres").required("Contraseña obligatoria"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
            .required("Debe confirmar la contraseña"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            phone: "",
            address: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await createCredentialAndRegisterUser(values);

                router.push('/client');

                successAlert("Registro exitoso")

            } catch (error) {
                errorAlert("Hubo un problema con el registro " + error);
            }
        },
    });



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
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {[
                        { id: "name", name: "name", type: "text", placeholder: "Nombre" },
                        { id: "username", name: "username", type: "text", placeholder: "Nombre de usuario" },
                        { id: "phone", name: "phone", type: "tel", placeholder: "Teléfono" },
                        { id: "address", name: "address", type: "text", placeholder: "Dirección" },
                        { id: "email", name: "email", type: "email", placeholder: "Correo electrónico" },
                        { id: "password", name: "password", type: "password", placeholder: "Contraseña" },
                        { id: "confirmPassword", name: "confirmPassword", type: "password", placeholder: "Confirmar contraseña" },
                    ].map(({ id, name, type, placeholder }) => (
                        <div key={id}>
                            <input
                                id={id}
                                name={name}
                                type={type}
                                placeholder={placeholder}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                value={formik.values[name as keyof typeof formik.values]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched[name as keyof typeof formik.touched] && formik.errors[name as keyof typeof formik.errors] ? (
                                <p className="text-red-500 text-xs">{formik.errors[name as keyof typeof formik.errors]}</p>
                            ) : null}
                        </div>
                    ))}

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
