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
		isLogged: store.session.isLogged,
		searchParams: store.catalog.params
	}));
	const navigate = useNavigate();

	const {t} = useTranslate()
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
				action={select.isLogged ? callbacks.onLogout : callbacks.goToLogin}
				actionLabel = {select.isLogged ? t('login.logout') : t('login.signIn')}
			/>
			<Outlet />
		</PageLayout>
	);
}

export default InitialLayout;
