import { useSelector } from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';

const PrivateRoute = () => {
    const {isLoggedIn, isPopulated} = useSelector(state => state.auth);
    return (isLoggedIn || !isPopulated) ? <Outlet/> : <Navigate to="/login"/>;
}

export default PrivateRoute;