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

CommentLayout.propTypes = {
	children: PropTypes.node, 
	numOfComments: PropTypes.number,
	t: PropTypes.func.isRequired,
}

export default CommentLayout;
