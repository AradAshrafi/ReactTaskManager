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
        .post(`${server_domain}/v1/user/signup`,user)
        .then(res => {
            const userToken = res.data.token;   ////////????
            localStorage.setItem('userToken', userToken);
            console.log('checking token in axiosSignUp in localStorage',localStorage.getItem('userToken'));
            dispatch(setAuth(true));            
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
            alert("2-1 ran into axuisLogin");
            console.log('response tu axiosLogin',res);
            const userToken = res.data.token;
            console.log("userToken in axiosLogin",userToken);
            localStorage.setItem('userToken', userToken);
            console.log('checking token in axiosLogin in localStorage 1 before setAuth',localStorage.getItem('userToken'));            
            dispatch(setAuth(true)); ///token b fuck raf
            console.log('checking token in axiosLogin in localStorage 2 after setAuth',localStorage.getItem('userToken'));
            // // localStorage.setItem('userToken', userToken);            
            // alert("2-2");
            // console.log('checking token in axiosLogin in localStorage 3 after setAuth',localStorage.getItem('userToken'));
            
            // history.push('/'); //inam baes mishe token az bein bere
            // alert("2-3");
            // console.log('checking token in axiosLogin in localStorage 4 after setAuth and history.push',localStorage.getItem('userToken'));
            // // localStorage.setItem('userToken', userToken);            
            // console.log('checking token in axiosLogin in localStorage 5 at the end',localStorage.getItem('userToken'));
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
            alert("4-1")
            console.log('task successfully added ');
            history.push('/');
        })
        .catch(err => {
            console.log("addtask error reponse ::",err);
            alert('addTask  error');
        });
};

export const axiosValidUser = (userToken,callback1,callback2) => {
    return dispatch =>{
        return axios
        .get(`${server_domain}/v1/user/validate`, {
                headers: { Authorization: 'Bearer ' + userToken }
            })
        .then(res => {
            alert("3-1");
            console.log("response to the axiosValidUser", res);
            alert("3-2");
            console.log('validation has checked');
            console.log("userToken in localStorage in axiosValidUser then =",localStorage.getItem("userToken"));
            // localStorage.setItem('userToken', userToken);  /////ino ezafe kardam chon harbar reload mikardi localStorage khali mishod!!            
            alert("3-3");
            const isAuth = !!res.data.isValid;
            // console.log(" 3-3 userToken in localStorage in axiosValidUser then =",localStorage.getItem("userToken"));            
            // alert("3-4");
            dispatch(setAuth(isAuth)); ///token b ga raf
            // console.log("3-4 userToken in localStorage in axiosValidUser then =",localStorage.getItem("userToken"));     
            // // localStorage.setItem('userToken', userToken);            
                   
            // alert("3-5");
            // console.log("isAuth in axios",isAuth);
            // // history.push('/');
            // console.log("3-5 userToken in localStorage in axiosValidUser then =",localStorage.getItem("userToken"));            
            // alert("3-6");
            // console.log("3-6 userToken in localStorage in axiosValidUser then =",localStorage.getItem("userToken"))            
            // // callback(isAuth);
            // alert("3-7");
            // console.log("3-7 userToken in localStorage in axiosValidUser then =",localStorage.getItem("userToken"));
            
            callback1(true);           
        })
        .catch(err => {
            alert('validation checking error');
            console.log("validation error in axiosValiduser",err)
            dispatch(setAuth(false));          
            console.log("userToken in localStorage in axiosValidUser catch =",localStorage.getItem("userToken"));
            callback2(true);
                  
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