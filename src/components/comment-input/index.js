import { useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

const CommentInput = forwardRef((props, ref) => {
	const [comment, setComment] = useState('');
	const [placeholder, setPlaceholder] = useState()

	const cn = bem('CommentInput');
	const errorMessage =
		props.type === 'article'
			? props.t('comments.errCommentMessage')
			: props.t('comments.errAnswerMessage');
	const callbacks = {
		onChange: (e) => {
			setComment((prev) => e.target.value);
		},
		closeCommentInput: () => {
			props.closeCommentInput();
		},
		addComment: () => {
			const trimmedComment = comment.trim();
			console.log(trimmedComment.length);
			if (trimmedComment && comment.length > 0) {
				props.addComment(props.commentingId, comment, props.type);
				if (props.type === 'comment') {
					props.closeCommentInput();
					props.setFormPosition(prev => ({
						id: '',
						level: '',
					}));
				} else {
					setComment('');
				}
			} else {
				setComment('')
				setPlaceholder(props.t('comments.errEmptyMessage'))
			}
			
		},
	};

	const renders = {
		commentForm: () => (
			<>
				<h3 className={cn('title')}>
					{props.t('comments.new')}{' '}
					{props.type === 'comment'
						? props.t('comments.answer')
						: props.t('comments.comment')}
				</h3>
				<textarea
					className={cn('input')}
					placeholder={placeholder}
					value={comment}
					onChange={callbacks.onChange}
					rows="10"
				/>
				<button className={cn('btn')} onClick={callbacks.addComment}>
					{props.t('comments.send')}
				</button>
				{props.type === 'comment' && (
					<button
						className={cn('btn')}
						onClick={callbacks.closeCommentInput}
					>
						{props.t('comments.cancel')}
					</button>
				)}
			</>
		),
		loginLink: () => (
			<p className={cn('message')}>
				<Link className={cn('message-link')} to={'/login'}>
					{props.t('comments.toSignin')}
				</Link>
				, {errorMessage}.{' '}
				{props.type === 'comment' && (
					<button
						className={cn('message-btn')}
						onClick={callbacks.closeCommentInput}
					>
						{props.t('comments.cancel')}
					</button>
				)}
			</p>
		),
	};

	const maxMargin = 30 * 6; // Максимальный уровень вложенности 7

	return (
		<div
			ref={ref}
			className={cn()}
			style={{
				marginLeft: `${
					props.level <= 5 ? 30 + 30 * props.level : maxMargin
				}px`,
			}}
		>
			{props.exists ? renders.commentForm() : renders.loginLink()}
		</div>
	);
});

CommentInput.propTypes = {
	exists: PropTypes.bool,
	type: PropTypes.string.isRequired,
	closeCommentInput: PropTypes.func,
	addComment: PropTypes.func.isRequired,
	commentingId: PropTypes.string,
	setFormPosition: PropTypes.func,
	t: PropTypes.func.isRequired,
};

export default CommentInput;
