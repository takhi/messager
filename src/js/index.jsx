import React from 'react';
import ReactDOM from 'react-dom';
import Messager from './components/Messager.jsx';
import '../css/style.css';

ReactDOM.render(<Messager url="ws://localhost:1001"/>, document.getElementById('app'));