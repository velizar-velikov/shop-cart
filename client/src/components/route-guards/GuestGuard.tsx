import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext.tsx';
import paths from '../../config/paths.ts';

export default function GuestGuard() {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Outlet />;
    } else {
        return <Navigate to={paths.home.path} />;
    }
}
