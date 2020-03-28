import React, { useEffect, useState, useCallback } from 'react';
import * as _ from 'lodash';
import PropTypes from 'prop-types';

import { Page, List, Link, ListItem, Actions, ActionsGroup, ActionsButton, ActionsLabel } from 'framework7-react';

function StoryList(props) {
	const [stories, setStories] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [chosen, setChosen] = useState({});

	const loadStories = useCallback((done) => {
		(async () => {
			if (!(props.sort || props.search)) {
				return;
			}

			setLoading(true);

			let url = 'https://hn.algolia.com/api/v1';

			if (props.search) {
				url += `/search?query=${props.search}`;
			} else if (props.sort) {
				switch (props.sort) {
				case 'top':
					url += '/search?tags=front_page';
					break;
				case 'new':
					url += '/search_by_date?tags=story';
					break;
				default: break;
				}
			} else {
				throw new Error('One of props [sort, search] is required');
			}

			const { hits: stories } = await (await fetch(url)).json();
			setStories(stories);
			setLoading(false);

			if ( _.isFunction(done)) done();
		})();
	}, [props.sort, props.search]);


	useEffect(() => {
		loadStories();
	}, [loadStories]);

	return (
		<Page
			ptr
			onPtrRefresh={loadStories}
		>
			{isLoading ? (
				<List mediaList>
					{[...Array(20).keys()].map(n => (
						<ListItem
							key={n}
							link="/"
							className={'skeleton-text skeleton-effect-blink'}
							title="__________ _______ ____ _________"
							subtitle="__ ________"
						>
						</ListItem>
					))}
				</List>
			) : (
				<List mediaList>
					{
						stories.map(story => (
							<ListItem
								key={story.id}
								link={story.url || '/'}
								title={story.title}
								actionsOpen="#story-actions"
								onClick={() => setChosen(story)}
								subtitle={`${story.num_comments} comments`}
							></ListItem>
						))
					}
				</List>
			)}
			<Actions id="story-actions">
				<ActionsGroup>
					<ActionsLabel>{`Posted by ${chosen.author}`}</ActionsLabel>
					<ActionsButton onClick={() => void window.open(chosen.url, '_blank')} bold>Visit link</ActionsButton>
					<ActionsButton>
						<Link href={`/stories/${chosen.objectID}`} >Read comments</Link>
					</ActionsButton>
				</ActionsGroup>
				<ActionsGroup>
					<ActionsButton color="red">Cancel</ActionsButton>
				</ActionsGroup>
			</Actions>
		</Page>
	);
}

StoryList.propTypes = {
	sort: PropTypes.oneOf(['top', 'new']),
	search: PropTypes.string
};

export default StoryList;