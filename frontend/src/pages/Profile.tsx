import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileInfo } from '../components/profile/ProfileInfo';
import { ProfileSecurity } from '../components/profile/ProfileSecurity';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/iniciar-sesion');
  };

  const handlePasswordReset = () => {
    alert("Funcionalidad de envío de correo en desarrollo.");
  };

  if (!user) return null;

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen pb-12">
      
      <div className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-slate-200/50 dark:border-slate-800/50">
        <button onClick={() => navigate(-1)} className="text-slate-900 dark:text-white flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
        </button>
        <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight tracking-tight">Mi Perfil</h2>
        <div className="size-10"></div> 
      </div>

      <main className="max-w-md mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <ProfileHeader user={user} />
        
        <ProfileInfo user={user} />
        
        <ProfileSecurity onRequestPasswordReset={handlePasswordReset} />

        <div className="mt-10 flex flex-col gap-4 pb-8">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 h-14 rounded-xl text-red-500 font-bold bg-red-500/5 hover:bg-red-500/10 transition-colors border border-red-500/10"
          >
            <span className="material-symbols-outlined">logout</span>
            Cerrar Sesión
          </button>
          <p className="text-center text-slate-400 dark:text-slate-600 text-xs font-mono">
            Versión del Sistema 1.0.0
          </p>
        </div>

      </main>
    </div>
  );
};