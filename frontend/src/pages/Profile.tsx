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
          {/*Aca tendria que poner mis datos personales / portafolio */}
          {/*<p className="text-center text-slate-400 dark:text-slate-600 text-xs font-mono">
            Versión del Sistema 1.0.0
          </p>*/}
        </div>

      </main>
    </div>
  );
};