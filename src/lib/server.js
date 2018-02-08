import { server_domain } from './config';
import { setTasks } from '../actions/tasks';
import { setAuth } from '../actions/auth';
import axios from 'axios';
import {
    AxiosProvider,
    Request,
    Get,
    Delete,
    Head,
    Post,
    Put,
    Patch,
    withAxios
} from 'react-axios';
import {history} from  "../routers/AppRouter"; 

export const axiosSignUp = user => {
    return dispatch =>{
        return axios
        .post(`${server_domain}/v1/user/signup`,user)
        .then(res => {
            const userToken = res.data.token;   ////////????
            localStorage.setItem('userToken', userToken);
            console.log('checking token in axiosSignUp in localStorage',localStorage.getItem('userToken'));
            dispatch(setAuth(true));            
            setTimeout(() => history.push('/'), 1000);
        })
        .catch(err => {
            alert('sign up error');
        });}
};

export const axiosLogIn = ({ email, password }) => {
    return dispatch =>{
        return axios
        .post(`${server_domain}/v1/user/login`,{
                email: email,
                password: password
            },
        )
        .then(res => {
            alert("2-1 ran into axuisLogin");
            console.log('response tu axiosLogin',res);
            const userToken = res.data.token;
            console.log("userToken in axiosLogin",userToken);
            localStorage.setItem('userToken', userToken);
            console.log('checking token in axiosLogin in localStorage 1 before setAuth',localStorage.getItem('userToken'));            
            dispatch(setAuth(true)); ///token b fuck raf
            console.log('checking token in axiosLogin in localStorage 2 after setAuth',localStorage.getItem('userToken'));
        })
        .catch(err => {
            alert('log in error');
        });
    }
};

export const axiosAddTask = task => {
    const userToken=localStorage.getItem('userToken');
    axios
        .post(`${server_domain}/v1/user/task/create`,task , {
            headers: { Authorization: 'Bearer ' + userToken }
        })
        .then(res => {
            alert("server-axiosAddTask  4-1")
            console.log('task successfully added ');
            history.push('/dashboard');
        })
        .catch(err => {
            console.log("addtask error reponse ::",err);
            alert('addTask  error');
        });
};

export const axiosValidUser = (userToken,callback1,callback2,callback3) => {
    return dispatch =>{
        return axios
        .get(`${server_domain}/v1/user/validate`, {
                headers: { Authorization: 'Bearer ' + userToken }
            })
        .then(res => {
            alert("server-axiosValidUser-then 3-1");
            console.log("response to the axiosValidUser", res);
            console.log("userToken in localStorage in axiosValidUser then =",localStorage.getItem("userToken"));
            const isAuth = !!res.data.isValid;
            alert("server-axiosValidUser-then-before dispactching isAuth-3-2");            
            dispatch(setAuth(isAuth)); ///token b ga raf
            alert("server-axiosValidUser-then-before callback1 3-3"); 
            const callback1Arg=true                       
            callback1(callback1Arg);
            alert("server-axiosValidUser-then-before callback3 3-4");    
            if(callback1Arg)         
            {callback3();}           
        })
        .catch(err => {
            alert('validation checking error');
            console.log("validation errorResponse in axiosValiduser",err);
            alert("server-axiosValidUser-catch-before dispatching isAuth 3-5");             
            dispatch(setAuth(false));          
            console.log("userToken in localStorage in axiosValidUser catch =",localStorage.getItem("userToken"));
            alert("server-axiosValidUser-catch-before callback2  3-6"); 
            const callback2Arg=true                                                           
            callback2(callback2Arg);
            if(callback2Arg)         
            {callback3();}  
                  
        });
    }
    
};

export const axiosSetTasksPublicUser = () => {
    console.log('kiiiir')
    console.log(localStorage.getItem('userToken'));
    
    return dispatch => {
        console.log('kiiiir')        
        return axios
            .get(
                `${server_domain}/v1/user/task/showpublic`
            )
            .then(res => {
                console.log("response in axiosSetTasksPublicUser ",res);                
                let tasks = [];
                res.data.map(x => {
                    console.log("taskses addes in public axios",x);
                    x.id = x._id;
                    delete x._id;
                    tasks.push(x);
                });
                dispatch(setTasks([...tasks]));
                console.log('tasks successfully set');
            })
            .catch(err => {
                console.log('show public error : ', err);
            });
    };
};

export const axiosSetTasksPrivateUser = userToken => {
    return dispatch => { 
        return axios
            .get(`${server_domain}/v1/user/task/show`, {
                headers: { Authorization: 'Bearer ' + userToken }
            })
            .then(res => {
                console.log("response in axiosSetTasksPrivateUser",res);
                let tasks = [];
                res.data.map(x => {
                    console.log('tasks added in private axios',x);
                    x.id = x._id;
                    delete x._id;
                    tasks.push(x);
                });
                dispatch(setTasks([...tasks]));
                console.log('tasks successfully set');
            })
            .catch(err => {
                console.log('show private error', err);
            });
    };
};