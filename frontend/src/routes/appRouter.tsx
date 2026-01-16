import { Routes, Route } from 'react-router-dom';

import { Login } from "../pages/Login"
import { AdminRoute } from './adminRouter';
import { DashboardSchool } from '../pages/DashboardSchool';

export function AppRouter() {
    return (
        <Routes>
            <Route>
                <Route path="/iniciar-sesion" element={<Login />} />
                <Route path='/escuelas' element={<DashboardSchool />} />
            </Route>

            <Route element={<AdminRoute />}>
                <Route path="/admin" element={<div>Panel de Administracion</div>} />
            </Route>
        </Routes>
    )
}