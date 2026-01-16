import { Routes, Route } from 'react-router-dom';

import { Login } from "../pages/Login"
import { AdminRoute } from './adminRouter';
import { DashboardSchool } from '../pages/DashboardSchool';
import { MainLayout } from '../layout/MainLayout';

export function AppRouter() {
    return (
        <Routes>
            <Route path="/iniciar-sesion" element={<Login />} />

            <Route element={<MainLayout />}>
                <Route path='/escuelas' element={<DashboardSchool />} />
            </Route>

            <Route element={<AdminRoute />}>
                <Route path="/admin" element={<div>Panel de Administracion</div>} />
            </Route>
        </Routes>
    )
}