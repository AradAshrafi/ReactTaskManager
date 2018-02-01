import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux';

const store=configureStore();

const jsx=(
    <Provider store={store}><AppRouter /></Provider>
)

//componentWillMount();
ReactDOM.render(jsx,document.getElementById('app'));