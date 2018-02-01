import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routers/AppRouter'

const jsx=(
    <div><AppRouter /></div>
)

//componentWillMount();
ReactDOM.render(jsx,document.getElementById('app'));