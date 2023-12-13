import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/login-form';
import useTranslate from '../../hooks/use-translate';
import LoginBar from '../../components/login-bar';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';

function Login() {
	const { t } = useTranslate();
	const store = useStore();
	const navigate = useNavigate();

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
			<LoginForm onLogin={callbacks.onLogin} error={select.error} />
		</>
	);
}

export default Login;
