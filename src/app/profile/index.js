import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import ProfileCard from '../../components/profile-card';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';

function Profile() {
	const { t } = useTranslate();
	const select = useSelector((store) => ({
		username: store.user.username,
		phone: store.user.phone,
		email: store.user.email,
		token: store.user.token,
		waiting: store.user.waiting,
	}));
	
	return (
		<>
			<Head title={t('title')}>
				<LocaleSelect />
			</Head>
			<Navigation />
			<Spinner active={select.waiting}>
				<ProfileCard
					name={select.username}
					phone={select.phone}
					email={select.email}
				/>
			</Spinner>
		</>
	);
}

export default Profile;
