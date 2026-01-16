import { Routes, Route } from 'react-router-dom';

import { Login } from "../pages/Login"

export function AppRouter(){
    return(
        <Routes>
            <Route path="/iniciar-sesion" element={<Login />} />
        </Routes>
    )
}