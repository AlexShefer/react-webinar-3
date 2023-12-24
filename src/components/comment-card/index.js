import PropTypes from 'prop-types';
import { getLastChildId } from '../../utils/getLastChildId';
import { cn as bem } from '@bem-react/classname';
import { formatDate } from '../../utils/foramte-date';
import './style.css';

function CommentCard(props) {
	const cn = bem('CommentCard');

	const options = {
		isAuthorized:
			props.exists && props.authUser.profile.name === props.username,
		isCommenting: props.id === props.commentingId,
	};

	const handleClick = () => {
		const lastChildrenId = getLastChildId(props.lastChild);
		props.openCommentInput(props.id);
		props.setFormPosition((prev) => ({
			...prev,
			level: props.level,
			id: lastChildrenId,
		}));
	};

	const maxMargin = 30 * 5; // Максимальный уровень вложенности 6

	return (
		<div
			className={cn()}
			style={{
				marginLeft: `${
					props.level <= 5 ? 30 * props.level : maxMargin
				}px`,
			}}
		>
			<h3
				className={cn('username', {
					authorized: options.isAuthorized,
				})}
			>
				{props.username}
				<span className={cn('date')}>
					{formatDate(props.date, props.lang)}
				</span>
			</h3>
			<p className={cn('text')}>{props.text}</p>
			{options.isCommenting ? null : (
				<button className={cn('btn')} onClick={handleClick}>
					{props.t('comments.toAnswer')}
				</button>
			)}
		</div>
	);
}

CommentCard.propTypes = {
	username: PropTypes.string,
	date: PropTypes.string,
	text: PropTypes.string,
	id: PropTypes.string,
	commentingId: PropTypes.string,
	level: PropTypes.number,
	exists: PropTypes.bool,
	authUser: PropTypes.shape({
		profile: PropTypes.shape({
			name: PropTypes.string,
		}),
	}).isRequired,
	closeCommentInput: PropTypes.func,
	addComment: PropTypes.func,
	lastChild: PropTypes.object,
	t: PropTypes.func,
	openCommentInput: PropTypes.func,
};

export default CommentCard;
