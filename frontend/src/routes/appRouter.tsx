import { Routes, Route } from 'react-router-dom';

import { Login } from "../pages/Login"
import { AdminRoute } from './adminRouter';
import { DashboardSchool } from '../pages/DashboardSchool';
import { MainLayout } from '../layout/MainLayout';
import { StudentList } from '../pages/StudentList';
import { Profile } from '../pages/Profile';

import { AdminDashboard } from '../pages/admin/AdminDashboard';
import RecoverPassword from '../pages/RecoverPassword';

export function AppRouter() {
    return (
        <Routes>
            <Route path="/iniciar-sesion" element={<Login />} />

            <Route element={<MainLayout />}>
                <Route path='/' element={<DashboardSchool />} />
                <Route path='/students/school/:schoolId' element={<StudentList />} />
                <Route path='/perfil' element={<Profile />} />
                <Route path='/recuperar-password' element={<RecoverPassword />} />
            </Route>

            <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
            </Route>
        </Routes>
    )
}