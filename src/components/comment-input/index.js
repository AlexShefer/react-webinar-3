import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function CommentInput(props) {
	const [comment, setComment] = useState();

	const cn = bem('CommentInput');

	const callbacks = {
		onChange: (e) => {
			setComment((prev) => e.target.value);
		},
		closeCommentInput: () => {
			props.closeCommentInput();
		},
		addComment: () => {
			if (comment && comment.length > 0) {
				props.addComment(props.id, comment, props.type);
				if (props.type === 'comment') {
					props.closeCommentInput();
				} else {
					setComment('');
				}
			}
		},
	};

	const renders = {
		commentForm: () => (
			<>
				<h3 className={cn('title')}>
					Новый {props.type === 'comment' ? 'ответ' : 'комментарий'}
				</h3>
				<textarea
					className={cn('input')}
					value={comment}
					onChange={callbacks.onChange}
					rows="10"
				/>
				<button className={cn('btn')} onClick={callbacks.addComment}>
					Отправит
				</button>
				{props.type === 'comment' && (
					<button
						className={cn('btn')}
						onClick={callbacks.closeCommentInput}
					>
						Отмена
					</button>
				)}
			</>
		),
		loginLink: () => (
			<p className={cn('message')}>
				<Link className={cn('message-link')} to={'/login'}>Войдите</Link>, чтобы иметь возможность
				ответить.{' '}
				{props.type === 'comment' && (
					<button className={cn('message-btn')} onClick={callbacks.closeCommentInput}>
						Отмена
					</button>
				)}
			</p>
		),
	};

	return (
		<div className={cn()}>
			{props.exists ? (
				renders.commentForm()
			) : (
				renders.loginLink()
			)}
		</div>
	);
}

CommentInput.propTypes = {
	exists: PropTypes.bool.isRequired,
	id: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	closeCommentInput: PropTypes.func,
	addComment: PropTypes.func.isRequired,
};

export default CommentInput;
