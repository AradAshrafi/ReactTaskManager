import { server_domain } from './config';
import { setTasks } from '../actions/tasks';
import { setAuth } from '../actions/auth';
//dispacho b validator va login va signUp ezafe kardam
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
import {history} from  "../routers/AppRouter"; ///////?????
// export const fakeJWT = '1234';

export const axiosSignUp = user => {
    return dispatch =>{
        return axios
        .post(`${server_domain}/v1/user/signup`,user, {
            headers: { 'content-type': 'application/json' }
        })
        .then(res => {
            const userToken = res.data.token;   ////////????
            localStorage.setItem('userToken', userToken);
            console.log('checking token in axiosSignUp in localStorage',localStorage.getItem('userToken'));
            dispatch(setAuth(true));            
            // axiosSignUp's this is bind to signUpPage
            // this.setState(() => ({
            //     success: 'Successful ly registered'
            // }));
            // console.log(this.state.success)////////???? ////////////// bind nashodeee   
            setTimeout(() => history.push('/'), 1000);
        })
        .catch(err => {
            // console.log(err);
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
            const userToken = res.data.token;
            localStorage.setItem('userToken', userToken);
            dispatch(setAuth(true));
            console.log('checking token in axiosLogin in localStorage',localStorage.getItem('userToken'));
            history.push('/');
        })
        .catch(err => {
            alert('log in error');
        });
    }
};

export const axiosAddTask = task => {
    const userToken=localStorage.getItem('userToken');
    axios
        .post(`${server_domain}/v1/user/task/create`,task ,{
            headers: { 'Authorization': "bearer "+userToken }
        })
        .then(res => {
            console.log('task successfully added ');
            history.push('/');
        })
        .catch(err => {
            alert('addTask  error');
        });
};

export const axiosValidUser = (userToken,callback) => {
    return dispatch =>{
        return axios
        .get(`${server_domain}/v1/user/validate`, {
            headers: { 'Authorization': "bearer "+userToken }
        })
        .then(res => {
            console.log('validation has checked');
            console.log("isAuth checking in axiosValida");
            console.log("userToken in localStorage in axiosValidUser then =",localStorage.getItem("userToken"));
            // localStorage.setItem('userToken', userToken);  /////ino ezafe kardam chon harbar reload mikardi localStorage khali mishod!!            
            const isAuth = !!res.data.isValid;
            dispatch(setAuth(isAuth));
            console.log("isAuth in axios",isAuth);
            history.push('/');
            callback(isAuth);
        })
        .catch(err => {
            alert('validation checking error');
            console.log("userToken in localStorage in axiosValidUser catch =",localStorage.getItem("userToken"));
                  
        });
    }
    
};

export const axiosSetTasksPublicUser = () => {
    console.log('kiiiir')
    
    return dispatch => {
        console.log('kiiiir')        
        return axios
            .get(
                `${server_domain}/v1/user/task/showpublic`
            )
            .then(res => {
                let tasks = [];
                res.data.map(x => {
                    console.log(x);
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
                let tasks = [];
                res.data.map(x => {
                    console.log(x);
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