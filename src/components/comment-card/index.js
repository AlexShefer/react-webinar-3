import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentInput from '../comment-input';
import { formatDate } from '../../utils/foramte-date';
import './style.css';

function CommentCard(props) {
	const cn = bem('CommentCard');

	const options = {
		isAuthorized: props.exists && props.authUser.profile.name === props.username,
		isCommenting: props.id === props.commentingId,
	};

	return (
		<div className={cn()} style={{ marginLeft: `${30 * props.level}px` }}>
			<h3
				className={cn('username', {
					authorized: options.isAuthorized,
				})}
			>
				{props.username}
				<span className={cn('date')}>{formatDate(props.date)}</span>
			</h3>
			<p className={cn('text')}>{props.text}</p>
			{options.isCommenting ? (
				<CommentInput
					closeCommentInput={props.closeCommentInput}
					addComment={props.addComment}
					id={props.id}
					type={'comment'}
					exists={props.exists}
				/>
			) : (
				<button
					className={cn('btn')}
					onClick={() => props.openCommentInput(props.id)}
				>
					Ответить
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
	openCommentInput: PropTypes.func,
};

export default CommentCard;
