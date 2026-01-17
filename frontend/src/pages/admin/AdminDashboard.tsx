import React, { useEffect, useState } from 'react';
import userService from '../../services/user.service'; 
import type { User } from '../../types/user.types';
import { UserTable } from '../../components/admin/UserTable';
import { CreateUserModal } from '../../components/admin/CreateUserModal';
import { ConfirmModal } from '../../components/ConfirmModal';

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const [userToAction, setUserToAction] = useState<User | null>(null);
  const [actionType, setActionType] = useState<'toggle' | 'delete' | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll(true); 
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async () => {
    if (!userToAction) return;
    try {
      const updated = await userService.toggleUserStatus(userToAction.id);
      setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
      setUserToAction(null);
      setActionType(null);
    } catch (error) {
      console.error(error);
      fetchUsers(); 
    }
  };

  const handleDeleteUser = async () => {
    if (!userToAction) return;
    try {
      await userService.deleteUser(userToAction.id);
      setUsers(prev => prev.filter(u => u.id !== userToAction.id));
      setUserToAction(null);
      setActionType(null);
    } catch (error) {
      console.error(error);
      fetchUsers();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Panel de Administración</h1>
          <p className="text-slate-500 text-sm">Gestiona el acceso de los usuarios</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 shadow-sm shadow-primary/20 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          <span>Nuevo Usuario</span>
        </button>
      </div>

      <UserTable 
        users={users} 
        loading={loading} 
        onToggleStatus={(user) => { setActionType('toggle'); setUserToAction(user); }}
        onDelete={(user) => { setActionType('delete'); setUserToAction(user); }}
      />

      <CreateUserModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={fetchUsers}
      />

      <ConfirmModal 
        isOpen={!!userToAction}
        title={actionType === 'delete' ? 'Eliminar Usuario' : (userToAction?.active ? 'Desactivar Usuario' : 'Activar Usuario')}
        message={actionType === 'delete' ? `¿Deseas eliminar permanentemente a ${userToAction?.username}?` : `¿Deseas cambiar el estado de ${userToAction?.username}?`}
        confirmText={actionType === 'delete' ? 'Eliminar' : (userToAction?.active ? 'Desactivar' : 'Activar')}
        isDanger={actionType === 'delete' || userToAction?.active} 
        onClose={() => { setUserToAction(null); setActionType(null); }}
        onConfirm={actionType === 'delete' ? handleDeleteUser : handleToggleStatus}
      />
    </div>
  );
};