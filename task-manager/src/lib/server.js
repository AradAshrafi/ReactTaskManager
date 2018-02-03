import { server_domain } from './config';
import { setTasks } from '../actions/tasks';
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

// export const fakeJWT = '1234';

export const axiosSignUp = user => {
    axios
        .post(`${server_domain}/v1/user/signup`, {
            body: user,
            headers: { 'content-type': 'application/json' }
        })
        .then(res => {
            const userToken = res.req['token'];
            localStorage.setItem('userToken', userToken);
            console.log(localStorage.getItem('userToken'));

            //axiosSignUp's this is bind to signUpPage
            this.setState(() => ({
                success: 'Successfully registered'
            }));

            setTimeout(() => history.push('/'), 1000);
        })
        .catch(err => {
            alert('sign up error');
        });
};

export const axiosLogIn = ({ email, password }) => {
    axios
        .post(`${server_domain}/v1/user/login`, {
            body: {
                email: email,
                password: password
            },
            headers: { 'content-type': 'application/json' }
        })
        .then(res => {
            const userToken = res.req['token'];
            localStorage.setItem('userToken', userToken);
            console.log(localStorage.getItem('userToken'));
            history.push('/');
        })
        .catch(err => {
            alert('log in error');
        });
};

export const axiosAddTask = task => {
    axios
        .post(`${server_domain}/v1/user/create`, {
            body: { task: task },
            headers: { 'content-type': 'application/json' }
        })
        .then(res => {
            console.log('task successfully added ');
            history.push('/');
        })
        .catch(err => {
            alert('addTask  error');
        });
};

export const axiosValidUser = userToken => {
    axios
        .post(`${server_domain}/v1/user/validate`, {
            body: { userToken },
            headers: { 'content-type': 'application/json' }
        })
        .then(res => {
            console.log('validation has checked');
            const isAuth = res.req['isValid'];
            history.push('/');
            return isAuth;
        })
        .catch(err => {
            alert('validation checking error');
        });
};

export const axiosSetTasksPublicUser = () => {
    return dispatch => {
        return axios
            .get(`${server_domain}/v1/user/task/showpublic`)
            .then(res => {
                let tasks = [];
                res.req.tasks.map(x => {
                    x = x.parse();
                    x.id = x._id;
                    delete x._id;
                    tasks.push(x);
                });
                dispatch(setTasks([...tasks]));
                console.log('tasks successfully set');
            })
            .catch(err => {
                console.log('show public error : ', err.error);
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
                res.req.tasks.map(x => {
                    x = x.parse();
                    x.id = x._id;
                    delete x._id;
                    tasks.push(x);
                });
                dispatch(setTasks([...tasks]));
                console.log('tasks successfully set');
            })
            .catch(err => {
                console.log('show private error', err.error);
            });
    };
};

// export const axiosAddTaskTask = (taskData = {}) => {
//     // return (dispatch, getState) => {
//         const {
//             title = '',
//             description = '',
//             startDate = 0,
//             endDate = 0,
//             status = '',
//             access = ''
//         } = taskData;
//         const task = { title, description, startDate, endDate, status, access };
//         return axios
//             .post('/v1/user/create', task)
//             .then(res => {
//                 console.log(' successfully added ');
//                 // dispatch(
//                 //     addTask({
//                 //         id: res.data['_id'],
//                 //         ...task
//                 //     })
//                 // );
//                 history.push("/v1/user");
//             })
//             .catch(err=>{
//                 alert('add task error');
//             });

// };
