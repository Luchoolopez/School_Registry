import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme'; 
import Toggle from './base/toggle/Toggle'; 

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : { username: 'Docente', role: 'docente' };

  const getInitials = (name: string) => {
    return name ? name.substring(0, 2).toUpperCase() : 'US';
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/iniciar-sesion');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#1a232e] border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300 mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-primary/10 text-primary p-2 rounded-lg">
              <span className="material-symbols-outlined text-2xl leading-none">school</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              MisColegios
            </h1>
          </div>

          <div className="flex items-center gap-4">
            
            <div className="hidden sm:block">
              <Toggle 
                isThemeToggle 
                checked={theme === 'dark' || (theme === 'system' && document.documentElement.classList.contains('dark'))}
                onChange={toggle}
                size="md"
              />
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>

            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 focus:outline-none group"
              >
                <div className="hidden md:flex flex-col items-end mr-1">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-tight">
                    {user.username}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">
                    {user.role || 'Docente'}
                  </span>
                </div>

                <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                  {getInitials(user.username)}
                </div>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 py-1 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                  
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 md:hidden">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user.username}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user.role}</p>
                    
                    <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-slate-500">Tema</span>
                        <Toggle 
                            isThemeToggle 
                            checked={theme === 'dark'}
                            onChange={toggle}
                            size="sm"
                        />
                    </div>
                  </div>

                  <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    Mi Perfil
                  </button>

                  {user?.role === 'admin' && (
                    <button 
                        onClick={() => {
                            navigate('/admin');
                            setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-primary dark:text-blue-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                        Panel de Admin
                    </button>
                  )}
                  
                  
                  <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};