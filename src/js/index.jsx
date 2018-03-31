import React from 'react';
import ReactDOM from 'react-dom';
import Messager from './components/Messager';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import '../css/style.css';

const CONFIG_URL = 'config.json';
const store = configureStore();

fetch(CONFIG_URL)
.then((response) => response.json())
.then((json) => {
    ReactDOM.render(
        <Provider store={store}><Messager url={json.URL} /></Provider>, document.getElementById('app')
    );  
});