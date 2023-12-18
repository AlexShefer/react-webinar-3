import { cn as bem } from '@bem-react/classname';
import './style.css';
function ProfileCard(props) {
	
	const cn = bem('ProfileCard');
	return (
		<div className={cn()}>
			<h2>{props.translate('profile.profile')}</h2>
			<p className={cn('text')}>
			{props.translate('profile.name')}: <span className={cn('text_bold')}>{props.name}</span>
			</p>
			<p className={cn('text')}>
			{props.translate('profile.phone')}: <span className={cn('text_bold')}>{props.phone}</span>
			</p>
			<p className={cn('text')}>
			{props.translate('profile.email')}: <span className={cn('text_bold')}>{props.email}</span>
			</p>
		</div>
	);
}

export default ProfileCard;
