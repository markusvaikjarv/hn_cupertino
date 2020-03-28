import React, { useEffect, useState, useCallback } from 'react';
import { Page, NavRight, Link, List, Navbar, ListItem } from 'framework7-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Comment from './Comment';

function Comments(props) {
	const [comments, setComments] = useState([]);
	const [title, setTitle] = useState('Fetching comments ...');
	const [link, setLink] = useState();
	const [isLoading, setLoading] = useState(false);

	const CommentsWrapper = styled.div`
		margin-top: 30px;
	`;

	const loadComments = useCallback(() => {
		(async () => {
			setLoading(true);

			const url = `https://hn.algolia.com/api/v1/items/${props.storyId}`;
			const { children: comments, title, url: link } = await (await fetch(url)).json();

			setComments(comments);
			setTitle(title);
			setLink(link);
			setLoading(false);

		})();
	}, [props.storyId]);


	useEffect(() => {
		loadComments();
	}, [loadComments]);

	return (
		<Page>
			<Navbar title={title} backLink="Back">
				{ link && (
					<NavRight>
						<Link 
							onClick={() => void window.open(link, '_blank')}
							iconF7="arrow_right"
						/>
					</NavRight>
				)}
			</Navbar>
			{isLoading ? (
				<List mediaList>
					{[...Array(10).keys()].map(n => (
						<ListItem
							bgColor="black"
							key={n}
							className={'skeleton-text skeleton-effect-blink'}
							title="________"
							subtitle="________ ________________ _______ _______"
							text="__ ________ _______ ___ _______ _____"
						>
						</ListItem>
					))}
				</List>
			) : (
				<CommentsWrapper>
					{
						comments.map(comment => (
							<Comment
								key={comment.id}
								author={comment.author}
								text={comment.text}
								comments={comment.children}
								topLevel />
						))
					}
				</CommentsWrapper>
			)}
		</Page>
	);
}

Comments.propTypes = {
	storyId: PropTypes.number,
};

export default Comments;