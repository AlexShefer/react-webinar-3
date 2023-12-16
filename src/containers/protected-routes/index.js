import { Navigate, Outlet } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
function ProtectedRoutes() {
	const select = useSelector((state) => ({
		token: state.user.token,
		waiting: state.user.waiting
	}));

	if (!select.token && !select.waiting) {
		return (
			<Navigate
				to="/user/login"
				state={{
					message: 'You must log in first',
				}}
				replace
			/>
		);
	}
	return <Outlet />;
}

export default ProtectedRoutes;
