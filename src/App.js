import React from 'react';
import F7App from 'framework7-react/components/app.js';
import { View } from 'framework7-react';
import PWAPrompt from 'react-ios-pwa-prompt';
import Stories from './components/Stories';
import Comments from './components/Comments';
import './App.css';

const App = () =>
	<F7App
		params={{
			theme: 'ios',
			name: 'hacker news',
			autoDarkTheme: true,
			id: 'com.hn-cupertino.v1',
			routes: [
				{
					path: '/',
					component: Stories
				},
				{
					path: '/stories/:storyId',
					component: Comments
				}
			]
		}}
	>
		<PWAPrompt />
		<View themeDark color='pink' main />
	</F7App>;

export default App;
