import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useAuth.js';
import paths from '../../config/paths.js';

export default function Logout() {
    const logout = useLogout();
    useEffect(() => {
        async function logoutAction() {
            await logout();
        }
        logoutAction();
    }, []);

    return <Navigate to={paths.home.path}></Navigate>;
}
