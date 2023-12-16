import { useEffect } from 'react';
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

	const store = useStore()

	

	const select = useSelector((store) => ({
		username: store.profile.username,
		phone: store.profile.phone,
		email: store.profile.email,
		token: store.session.token,
		waiting: store.profile.waiting,
	}));

	useEffect(() => {
    store.actions.profile.getProfile(select.token)
  }, [select.token])
	
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
