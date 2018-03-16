import React from 'react';
import ReactDOM from 'react-dom';
import Messager from './components/Messager.jsx';
import '../css/style.css';

const CONFIG_URL = 'config.json';

fetch(CONFIG_URL)
.then((response) => response.json())
.then((json) => {
    ReactDOM.render(
        <Messager url={json.URL} />, document.getElementById('app')
    );  
});