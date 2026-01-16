import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthActions, useTheme } from '../context'; 

export function Login() {
    const navigate = useNavigate();
    const { login } = useAuthActions();
    const { theme, toggle } = useTheme();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login(username, password);
            navigate('/');
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Error al iniciar sesión. Verifique sus credenciales.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display transition-colors duration-300">

            <div className="flex items-center bg-white dark:bg-slate-900 p-4 border-b border-gray-200 dark:border-gray-800 justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <span className="material-symbols-outlined select-none">school</span>
                    </div>
                    <h2 className="text-[#0d131b] dark:text-white text-base font-bold leading-tight tracking-[-0.015em]">
                        Dashboard Docentes
                    </h2>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => toggle()}
                        aria-label="Alternar tema"
                        className="inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-lg select-none">
                            {theme === 'dark' ? 'dark_mode' : theme === 'light' ? 'light_mode' : (document.documentElement.classList.contains('dark') ? 'dark_mode' : 'light_mode')}
                        </span>
                    </button>
                </div>
            </div>

            <main className="flex-1 flex items-center justify-center p-4 sm:p-6">

                <div className="card-centered">

                    <div className="text-center mb-8">
                        <h1 className="text-[#0d131b] dark:text-white text-2xl font-bold leading-tight">Iniciar Sesión</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Acceda a su portal de administración</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg text-center border border-red-100 dark:border-red-900/50 animate-pulse">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-[#0d131b] dark:text-gray-200 text-sm font-medium leading-normal">Usuario</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="nombre de usuario"
                                    required
                                    className="form-input flex w-full rounded-lg text-[#0d131b] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary border border-[#cfd9e7] dark:border-gray-700 bg-white dark:bg-slate-800 h-12 placeholder:text-[#4c6c9a]/60 dark:placeholder:text-gray-500 px-4 text-sm font-normal transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[#0d131b] dark:text-gray-200 text-sm font-medium leading-normal">Contraseña</label>
                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="********"
                                    required
                                    className="form-input flex w-full rounded-lg text-[#0d131b] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary border border-[#cfd9e7] dark:border-gray-700 bg-white dark:bg-slate-800 h-12 placeholder:text-[#4c6c9a]/60 dark:placeholder:text-gray-500 pl-4 pr-12 text-sm font-normal transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 text-[#4c6c9a] dark:text-gray-500 hover:text-primary transition-colors cursor-pointer flex items-center justify-center p-1"
                                >
                                    <span className="material-symbols-outlined text-xl select-none">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/*
            <div className="flex items-center justify-between text-xs py-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                <span className="text-gray-600 dark:text-gray-400">Recordarme</span>
              </label>
              <a href="#" className="text-primary font-medium hover:underline">¿Olvidó su contraseña?</a>
            </div>
            */}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-95"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Ingresando...
                                    </span>
                                ) : 'Ingresar'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            ¿No tienes cuenta?
                            <button
                                onClick={() => setShowRegisterModal(true)}
                                className="text-primary font-bold hover:underline ml-1 cursor-pointer bg-transparent border-none"
                            >
                                Regístrate aquí
                            </button>
                        </p>
                    </div>
                </div>
            </main>

            <footer className="p-6 text-center text-xs text-gray-400 dark:text-gray-600 shrink-0">
                <p>© 2026 Portal Administrativo para Docentes</p>
            </footer>

            {showRegisterModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-md p-6 border border-gray-100 dark:border-gray-800 transform transition-all scale-100 animate-in zoom-in-95 duration-200">
                        <div className="text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                                <span className="material-symbols-outlined text-primary text-2xl">info</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Solicitar Acceso</h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Hola, el acceso a esta plataforma es por invitación. Si estás interesado en utilizar este servicio para gestionar tus escuelas/alumnos, por favor contáctame para habilitar tu cuenta manualmente.
                            </p>

                            <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <span className="material-symbols-outlined text-sm">mail</span>
                                    luchoolopez2810@gmail.com
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-sm">call</span>
                                    +54 291-406-6356
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={() => setShowRegisterModal(false)}
                                    className="w-full inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors shadow-md shadow-primary/20"
                                >
                                    Entendido
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}