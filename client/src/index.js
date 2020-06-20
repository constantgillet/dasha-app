import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './style/main.scss'
import App from './js/components/App'

import './js/plugins/jquery-ui/jquery-ui'
$.widget.bridge('uibutton', $.ui.button)

import './js/plugins/adminlte.js'

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);