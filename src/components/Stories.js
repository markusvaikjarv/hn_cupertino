import React, { useState, Fragment } from 'react';
import { Page, NavRight, Searchbar, BlockTitle } from 'framework7-react';
import { Navbar, Toolbar, Link, Tabs, Tab } from 'framework7-react';

import StoryList from './StoryList';

function Stories() {
	const [showSearch, setShowSearch] = useState(true);
	const [searching, setSearching] = useState(false);
	const [searchTerm, setSearchTerm] = useState(undefined);

	return (
		<Page pageContent={false}>
			<Navbar title="Hacker News">
				{ showSearch && (
					<Fragment>
						<NavRight>
							<Link searchbarEnable=".searchbar-demo" iconIos="f7:search"></Link>
						</NavRight>
						<Searchbar
							className="searchbar-demo"
							expandable
							onChange={(search) => setSearchTerm(search.target.value)}
							onSearchbarEnable={() => setSearching(true)}
							onSearchbarDisable={() => setSearching(false)}
							onClickDisable={() => setSearchTerm()}
						></Searchbar>
					</Fragment>
				)}
			</Navbar>
			{ searching && (
				<StoryList search={searchTerm}></StoryList>
			)}
			{ !searching && (
				<Fragment>
					<Toolbar tabbar labels bottom>
						<Link tabLink="#tab-1" tabLinkActive text="Top" iconIos="f7:arrow_up_circle"></Link>
						<Link tabLink="#tab-2" text="New" iconIos="f7:bolt"></Link>
						<Link tabLink="#tab-3" text="Settings" iconIos="f7:gear_alt"></Link>
					</Toolbar>
					<Tabs>
						<Tab 
							id="tab-1"
							onTabShow={() => setShowSearch(true)}
							className="page-content" 
							tabActive
						>
							<StoryList sort="top"></StoryList>
						</Tab>
						<Tab 
							id="tab-2"
							className="page-content"
							onTabShow={() => setShowSearch(true)}
						>
							<StoryList sort="new"></StoryList>
						</Tab>
						<Tab
							id="tab-3"
							className="page-content"
							onTabShow={() => setShowSearch(false)}
						>
							<BlockTitle>Not implement yet!</BlockTitle>
						</Tab>
					</Tabs>
				</Fragment>
			)}
		</Page>
	);
}

export default Stories;
