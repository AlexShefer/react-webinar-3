import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import LoginBar from '../../components/login-bar';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';


function InitialLayout() {
	const store = useStore();
	const location = useLocation()
	const select = useSelector((store) => ({
		username: store.session.username,
		token: store.session.token,
		searchParams: store.catalog.params
	}));
	const navigate = useNavigate();
	const callbacks = {
		onLogout: () => store.actions.session.logout(),
		goToLogin: () => navigate('/user/login', { state: { location: location.pathname, searchParams: select.searchParams } }),
	};

	return (
		<PageLayout>
			<LoginBar
				token={select.token}
				user={select.username}
				link={'/user/profile'}
				searchParams={select.searchParams}
				action={select.token ? callbacks.onLogout : callbacks.goToLogin}
			/>
			<Outlet />
		</PageLayout>
	);
}

export default InitialLayout;
