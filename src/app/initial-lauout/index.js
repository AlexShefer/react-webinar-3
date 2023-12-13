import { Outlet, useNavigate } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import LoginBar from '../../components/login-bar';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

function InitialLayout() {
	const store = useStore();
	const select = useSelector((store) => ({
		username: store.user.username,
		token: store.user.token,
	}));
	const navigate = useNavigate();

	const callbacks = {
		onLogout: () => store.actions.user.logout(),
		goToLogin: () => navigate('/user/login'),
	};

	return (
		<PageLayout>
			<LoginBar
				token={select.token}
				user={select.username}
				link={'/user/profile'}
				action={select.token ? callbacks.onLogout : callbacks.goToLogin}
			/>
			<Outlet />
		</PageLayout>
	);
}

export default InitialLayout;
