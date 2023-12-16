import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/login-form';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
	const { t } = useTranslate();
	const store = useStore();
	const navigate = useNavigate();
	const location = useLocation()

	const select = useSelector((state) => ({
		username: state.user.username,
		token: state.user.token,
		error: state.user.error,
		waiting: state.user.waiting,
	}));

	const callbacks = {
		onLogin: (body) => {
			store.actions.user.login(body);
		},
		isLogged: () => {
			store.actions.user.isLogged();
		},
		onLogout: () => {
			store.actions.user.logout();
		},
	};
	return (
		<>
			<Head title={t('title')}>
				<LocaleSelect />
			</Head>
			<Navigation />
			<LoginForm onLogin={callbacks.onLogin} error={select.error} location={location} />
		</>
	);
}

export default Login;
