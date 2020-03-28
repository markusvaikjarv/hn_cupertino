import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/framework7/css/framework7.bundle.min.css';
import './index.css';
import 'framework7-icons';
import App from './App';
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';
import Framework7React from 'framework7-react';
import * as serviceWorker from './serviceWorker';

Framework7.use(Framework7React);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.register();
