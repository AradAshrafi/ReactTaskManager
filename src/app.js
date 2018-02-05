import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux';
import "./styles/styles.scss";
import {setAuth} from "./actions/auth";
import {setTasks} from "./actions/tasks";
import {axiosSetTasksPublicUser,axiosSetTasksPrivateUser} from './lib/server';


const store=configureStore();

const jsx=(
    <Provider store={store}><AppRouter /></Provider>
)

    if(!store.auth){
        store.dispatch(axiosSetTasksPublicUser());
    }else{
        store.dispatch(axiosSetTasksPublicUser());
        store.dispatch(axiosSetTasksPrivateUser(this.props.userToken));
    }
//componentWillMount();
ReactDOM.render(jsx,document.getElementById('app'));