import React, { useEffect, useState } from 'react';
import userService from '../../services/user.service'; 
import type { User } from '../../types/user.types';
import { UserTable } from '../../components/admin/UserTable';
import { CreateUserModal } from '../../components/admin/CreateUserModal';
import { ConfirmModal } from '../../components/ConfirmModal'; // Asumo la ruta
import { AdminHeader } from '../../components/admin/AdminHeader';   // IMPORTAR HEADER

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 
  
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

  const filteredUsers = users.filter(user => {
    const term = searchTerm.toLowerCase();
    return (
      user.username.toLowerCase().includes(term) ||
      user.dni.includes(term) ||
      (user.role && user.role.toLowerCase().includes(term))
    );
  });

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
      
      <AdminHeader 
        onCreate={() => setShowCreateModal(true)} 
        onSearch={setSearchTerm} 
      />

      <UserTable 
        users={filteredUsers} 
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
        isDanger={actionType === 'delete' || (actionType === 'toggle' && !!userToAction?.active)} 
        onClose={() => { setUserToAction(null); setActionType(null); }}
        onConfirm={actionType === 'delete' ? handleDeleteUser : handleToggleStatus}
      />
    </div>
  );
};