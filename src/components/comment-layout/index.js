import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentLayout({ children, numOfComments, t }) {
	const cn = bem('CommentLayout');
	return (
		<div className={cn()}>
			<h2 className={cn('title')}>{t('comments.comments')} ({numOfComments})</h2>
			{children}
		</div>
	);
}

export default CommentLayout;
