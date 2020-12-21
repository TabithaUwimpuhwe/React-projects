import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//React' s goal is to render HTML in a web page using ReactDOM.render().. 
//It takes two arguments, HTML code and an HTML element.
//This display our app inside the "root" element:
ReactDOM.render(<App />, document.getElementById('root'));

// This optional code is used to register a service worker.
// register() is not called by default.
// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities.
serviceWorker.unregister(); 
