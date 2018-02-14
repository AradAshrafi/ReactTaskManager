import { server_domain } from './config';
import { setTasks, addTask, removeTask, editTask } from '../actions/tasks';
import { setAuth } from '../actions/auth';
import {Redirect} from 'react-router-dom';
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
import { history } from '../routers/AppRouter';
import formUrlencoded from 'form-urlencoded';
// var formU =require("form-urlencoded");

export const axiosSignUp = user => {
    return dispatch => {
        return axios
            .post(`${server_domain}/v1/user/signup`, user)
            .then(res => {
                const userToken = res.data.token;
                localStorage.setItem('userToken', userToken);
                dispatch(setAuth(true));
                setTimeout(() => history.push('/'), 1000);
            })
            .catch(err => {
                alert('sign up error');
            });
    };
};

export const axiosLogIn = ({ email, password }) => {
    return dispatch => {
        return axios
            .post(`${server_domain}/v1/user/login`, {
                email: email,
                password: password
            })
            .then(res => {
                const userToken = res.data.token;
                localStorage.setItem('userToken', userToken);
                dispatch(setAuth(true));
            })
            .catch(err => {
                alert('log in error');
            });
    };
};

export const axiosAddTask = task => {
    const userToken = localStorage.getItem('userToken');
    axios
        .post(`${server_domain}/v1/user/task/create`, task, {
            headers: { Authorization: 'Bearer ' + userToken }
        })
        .then(res => {
            history.push('/dashboard');
        })
        .catch(err => {
            console.log('addtask error reponse ::', err);
            alert('addTask  error');
        });
};

export const axiosValidUser = (userToken, callback1, callback2) => {
    return dispatch => {
        return axios
            .get(`${server_domain}/v1/user/validate`, {
                headers: { Authorization: 'Bearer ' + userToken }
            })
            .then(res => {
                const isAuth = !!res.data.isValid;
                dispatch(setAuth(isAuth));
                const callback1Arg = true;
                callback1(callback1Arg);
            })
            .catch(err => {
                console.log(
                    'validation errorResponse in axiosValiduser [unauthorized]',
                    err
                );
                dispatch(setAuth(false));
                const callback2Arg = true;
                callback2(callback2Arg);
            });
    };
};

export const axiosSetTasksPublicUser = () => {
    return dispatch => {
        return axios
            .get(`${server_domain}/v1/user/task/showpublic`)
            .then(res => {
                dispatch(setTasks([...res.data]));
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
                res.data.map(x => {
                    dispatch(addTask(x));
                });
            })
            .catch(err => {
                console.log('show private error [unauthorized] : ', err);
            });
    };
};

export const axiosSetProfileTasks = userToken => {
    return dispatch => {
        return axios
            .get(`${server_domain}/v1/user/task/usertasks`, {
                headers: { Authorization: 'Bearer ' + userToken }
            })
            .then(res => {
                console.log('start of setting process');
                dispatch(setTasks([...res.data]));
                console.log('successfully set tasks in profile');
            })
            .catch(err => {
                console.log('set profile tasks error ', err);
            });
    };
};

export const axiosRemoveTask = (taskId, userToken) => {
    return dispatch => {
        return (
            axios({
                method: 'delete',
                url: `${server_domain}/v1/user/task/deletetask/${taskId}`,
                data: null,
                // withCredentials: true,
                headers: { Authorization: 'Bearer ' + userToken }, //jason??
                params: taskId
            })
                // .delete(`${server_domain}/v1/user/task/deletetask/${taskId}`)
                .then(res => {
                    console.log('start of deleting process', res, ' ');
                    dispatch(removeTask(taskId));
                    history.push('/profile');
                    console.log('successfully updated');
                })
                .catch(err => {
                    console.log('remove task error ', err);
                })
        );
    };
};

export const axiosEditTask = (taskId, updates, userToken) => {
    return dispatch => {
        return (
            axios({
                method: 'put',
                url: `${server_domain}/v1/user/task/updatetask/${taskId}`,
                data: updates,
                // withCredentials: true,
                headers: { Authorization: 'Bearer ' + userToken }, //jason??
                params: taskId
            })
                // .put(`${server_domain}/v1/user/task/deletetask/${taskId}`)
                .then(res => {
                    dispatch(editTask(taskId, updates));
                    history.push('/profile');
                })
                .catch(err => {
                    console.log('edit task error ', err);
                })
        );
    };
};

export const axiosPayment = (api, amount, redirect, mobile) => {
    const x = formUrlencoded({
        api: api,
        amount: amount,
        redirect: redirect,
        mobile: mobile
    });

    axios
        // ({
        //     method:"POST",
        //     url:"https://pay.ir/payment/send",
        //     data:{
        //                 api:'test',
        //                 amount,
        //                 redirect,
        //                 mobile
        //             },
        //     headers:{"Content-Type": "application/x-www-form-urlencoded"}
        // })
        .post('https://pay.ir/payment/send', x, {
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded'
                // "Content-Type" : "application/JSONP"
            }
        })
        .then(res => {
            console.log(res);
            console.log('x is  : ', x)
            
            window.location.assign(`https://pay.ir/payment/gateway/${res.data.transId}`)
        })
        .catch(err => {
            console.log(JSON.stringify(err));
        });
};
