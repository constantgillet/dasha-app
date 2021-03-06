import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import 'toastr/build/toastr.min.css'

//Import boostrap js
import 'bootstrap/dist/js/bootstrap.min.js'
import './style/main.scss'

import App from './js/components/App'

import './js/plugins/jquery-ui/jquery-ui'
$.widget.bridge('uibutton', $.ui.button)

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);