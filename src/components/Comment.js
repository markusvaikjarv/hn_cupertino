import React, { Fragment } from 'react';
import { BlockHeader, Block } from 'framework7-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Comment(props) {
	const CommentContainer = styled.div`
		${!props.topLevel ? 'padding-left: 10px;' : ''}
	`;

	const CommentTitle = styled(BlockHeader)`
		margin-top: 0px;
		margin-bottom: -20px;
	`;

	const CommentContent = styled(Block)`
		overflow-x: hidden;
		margin-bottom: 0px;
	`;

	return (
		<CommentContainer>
			<Fragment>
				<CommentTitle>{props.author}</CommentTitle>
				<CommentContent>
					<div dangerouslySetInnerHTML={{ __html: props.text }} />
				</CommentContent>
				<Fragment>
					{
						props.comments.map(comment => (
							<Comment key={comment.id} author={comment.author} text={comment.text} comments={comment.children}/>
						))
					}
				</Fragment>
			</Fragment>
		</CommentContainer>
	);
}

Comment.propTypes = {
	comments: PropTypes.arrayOf(PropTypes.object),
	topLevel: PropTypes.string,
	text: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
};

export default Comment;