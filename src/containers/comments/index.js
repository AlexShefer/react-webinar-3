import React, { useState } from 'react';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import { useParams } from 'react-router';
import shallowequal from 'shallowequal';

import CommentCard from '../../components/comment-card';
import CommentInput from '../../components/comment-input';
import CommentLayout from '../../components/comment-layout';
import commentsActions from '../../store-redux/comments/actions';
import listToTree from '../../utils/list-to-tree';
import Spinner from '../../components/spinner';
import treeToList from '../../utils/tree-to-list';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

export default function Comments() {
	const params = useParams();
	const [commentingId, setCommentingId] = useState(params.id);
	const dispatch = useDispatch();
	const {t, lang} = useTranslate()
	useInit(() => {
		dispatch(commentsActions.load(params.id));
	}, [params.id, dispatch]);

	const selectStore = useSelector((state) => ({
		exists: state.session.exists,
		token: state.session.token,
		authUser: state.session.user,
	}));

	const select = useSelectorRedux(
		(state) => ({
			comments: state.comments.data,
			waiting: state.comments.waiting,
		}),
		shallowequal
	);

	const commentList = treeToList(
		listToTree(select.comments, params.id),
		(item, level) => {
			return { ...item, level: level };
		}
	);

	const callbacks = {
		addComment: (id, text, commentType) => {
			dispatch(
				commentsActions.addComment(
					id,
					selectStore.token,
					text,
					commentType
				)
			);
		},
		openCommentInput: (id) => {
			setCommentingId(id);
		},
		closeCommentInput: () => {
			setCommentingId(params.id);
		},
	};

	return (
		<CommentLayout t ={t} numOfComments={select.comments?.length}>
			<Spinner active={select.waiting}>
				{commentList.map((comment) => (
					<CommentCard
						key={comment._id + comment.date}
						t ={t}
						lang ={lang}
						username={comment.author?.profile?.name}
						text={comment.text}
						date={comment.dateCreate}
						level={comment.level}
						id={comment._id}
						openCommentInput={callbacks.openCommentInput}
						closeCommentInput={callbacks.closeCommentInput}
						commentingId={commentingId}
						addComment={callbacks.addComment}
						exists={selectStore.exists}
						authUser={selectStore.authUser}
					/>
				))}
				{params.id === commentingId ? (
					<CommentInput
						t ={t}
						addComment={callbacks.addComment}
						id={params.id}
						type={'article'}
						exists={selectStore.exists}
					/>
				) : null}
			</Spinner>
		</CommentLayout>
	);
}
