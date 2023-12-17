import { Navigate, Outlet } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
function ProtectedRoutes() {
	const select = useSelector((state) => ({
		isLogged: state.session.isLogged,
		waiting: state.session.waiting
	}));

	if (!select.isLogged && !select.waiting) {
		return (
			<Navigate
				to="/user/login"
				state={{
					message: 'To view the profile, please log in first.',
				}}
				replace
			/>
		);
	}
	return <Outlet />;
}

export default ProtectedRoutes;
