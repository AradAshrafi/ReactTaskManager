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
import {history} from  "../routers/AppRouter"; ///////?????
// export const fakeJWT = '1234';

export const axiosSignUp = user => {
    axios
        .post(`${server_domain}/v1/user/signup`,user, {
            headers: { 'content-type': 'application/json' }
        })
        .then(res => {
            const userToken = res.data.token;   ////////????
            localStorage.setItem('userToken', userToken);
            console.log(localStorage.getItem('userToken'));

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
        });
};

export const axiosLogIn = ({ email, password }) => {
    axios
        .post(`${server_domain}/v1/user/login`,{
                email: email,
                password: password
            },
        )
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
    axios
        .get(`${server_domain}/v1/user/validate`, {
            headers: { 'Authorization': "bearer "+userToken }
        })
        .then(res => {
            console.log('validation has checked');
            console.log("isAuth checking in axiosValida");
            const isAuth = res.data['isValid'];
            console.log("isAuth in axios",isAuth);
            history.push('/');
            callback(isAuth);
            
            
        })
        .catch(err => {
            alert('validation checking error');
        });
};

export const axiosSetTasksPublicUser = () => {
    return dispatch => {
        return axios
            .get(
                `${server_domain}/v1/user/task/showpublic`
            )
            .then(res => {
                let tasks = [];
                res.data.map(x => {
                    x = x.parse();
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
                    x = x.parse();
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