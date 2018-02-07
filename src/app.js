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
    console.log(store);
    if(!store.auth.isAuth){
        alert("10-1");
        store.dispatch(axiosSetTasksPublicUser());
    }else{
        alert("10-2");        
        store.dispatch(axiosSetTasksPublicUser());
        alert("10-3");        
        store.dispatch(axiosSetTasksPrivateUser(localStorage.getItem('userToken')));  //// inja user tokeno az localStorage gereftam va dadam behesh
        alert("10-4");        
    }
//componentWillMount();
ReactDOM.render(jsx,document.getElementById('app'));