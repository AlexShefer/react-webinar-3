import { Navigate, Outlet } from 'react-router-dom';

import useSelector from '../../hooks/use-selector';
function ProtectedRoutes() {
	const token = useSelector((state) => state.user.token);

	if (!token) {
		return (
			<Navigate
				to="/user/login"
				state={{
					message: 'You must log in first',
					from: location.pathname,
				}}
				replace
			/>
		);
	}
	return <Outlet />;
}

export default ProtectedRoutes;
