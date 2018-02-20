import { server_domain } from './config';
import { setTasks, addTask, removeTask, editTask } from '../actions/tasks';
import { setAuth, setUserId } from '../actions/auth';
import { Redirect } from 'react-router-dom';
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
            history.push('/profile'); /// bayad bere profile
            localStorage.removeItem('addTask');
        })
        .catch(err => {
            console.log('addtask error reponse : ', err);
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
                const wallet = res.data.wallet;
                const userId = res.data.userId;
                dispatch(setAuth(isAuth, wallet, userId));
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
    return dispatch =>
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
            });
};

export const axiosPayment = (factorNumber, amount, mobile) => {
    const redirect = `${server_domain}/v1/user/account/payment`;
    const api = 'test';
    const x = formUrlencoded({
        factorNumber: factorNumber,
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
            console.log('ok shod');
            console.log(res);
            console.log('x is  : ', x);

            window.location.assign(
                `https://pay.ir/payment/gateway/${res.data.transId}`
            );
        })
        .catch(err => {
            console.log('pokh');

            console.log(JSON.stringify(err));
        });
};

export const axiosServerPaymentUpdate = (amount, userId, status, transId) => {
    const x = {
        amount,
        userId,
        status,
        transId
    };
    alert('fuck1');
    axios({
        method: 'put',
        url: `${server_domain}/v1/user/account/updateinfo`,
        data: x,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('userToken')
        }
    })
        // (`${server_domain}/v1/user/account/updateinfo`, x,{
        //     headers: { Authorization: 'Bearer ' + userToken }
        // })
        .then(res => {
            alert('fuck');
            console.log('server verification succeeded');
        })
        .catch(err => {
            console.log('server verification error');
            alert('internet error,refresh to complete this action');
        });
};
export const axiosVerify = (state, userId, transId) => {
    axios
        .post('https://pay.ir/payment/verify', {
            api: 'test',
            transId
        })
        .then(res => {
            console.log('ok');
            console.log(res);
            const a = res.data.amount;
            const amount = parseInt(a);
            const status = res.data.status;
            const transId2 = parseInt(transId);
            // const transId=transId2;
            // const status=status2.toString();
            console.log(
                'amount:',
                amount,
                'userId:',
                userId,
                'status:',
                status,
                'trasnId2:',
                transId2
            );
            console.log('typeof amount', typeof amount);
            console.log('typeof userId', typeof userId);
            console.log('typeof status', typeof status);
            console.log('typeof transId2', typeof transId2);

            axiosServerPaymentUpdate(amount, userId, status, transId2);
            console.log('test');
        })
        .catch(err => {
            console.log('not ok', err);
            console.log(JSON.stringify(err));
            // const status = err.data.status;
            // axiosServerPaymentUpdate(0, userId, status, transId);
            // history.push(`/payment/${state}/${status}/${transId}`);//khata dar taeede tarakonesh,dobare baresh migardunim ke taeedesh kone
        });
};

export const axiosCart = (tasksId, cb) => {
    return dispatch =>
        axios
            .post(`${server_domain}/v1/user/task/factortasks`, tasksId, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('userToken')
                }
            })
            .then(res => {
                console.log('res  : ', [...res.data]);
                dispatch(setTasks([...res.data]));
                cb();
            })
            .catch(err => {
                console.log('axiosCart error : ', err);
            });
};

export const axiosGetFactorNumberThenPay = (
    userId,
    amount,
    state,
    task,
    tasksId,
    mobile
) => {
    console.log(userId, amount, state, task, tasksId);
    axios
        .post(`${server_domain}/v1/user/factor/add`, {
            userId,
            amount,
            state,
            task,
            tasksId
        })
        .then(res => {
            console.log('res : ', res);
            const factorNumber = res.data.factorNumber;
            axiosPayment(factorNumber, amount, mobile);
        })
        .catch(err => {
            console.log(err);
        });
};
