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
        .post(`${server_domain}/v1/user/signup`, user)
        .then(res => {
            const userToken = res.body['token'];
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
        .post(`${server_domain}/v1/user/login`, {email,password})
        .then(res => {
            const userToken = res.body['token'];
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
    .post(`${server_domain}/v1/user/create`, task)
    .then(res => {
        console.log('task successfully added ');
        history.push('/');
    })
    .catch(err => {
        alert('log in error');
    });
};

export const axiosValidation = userToken => {
    setTimeout(null, 1000);
    console.log('successfully validated');
    return false;
};

export const axiosSetTasks = userToken => {
    return dispatch => {
        setTimeout(null, 1000);
        return () => {
            console.log('successfully set');
            const tasks = {
                title: 'asdfasd',
                description: 'asdf',
                startDate: '12345',
                endDate: '0',
                status: '',
                access: ''
            };
            dispatch(setTasks(tasks));
        };
    };
};

// export const startSetTasks = () => {
//     return axios
//         .get('/v1/user')
//         .then(res => {
//             let tasks=[];
//             res.data.map(x => {
//                 x=x.parse();
//                 x.id=x._id;
//                 delete x._id;
//                 tasks.push(x);
//             });
//             dispatch(setTasks([...tasks]));
//         })
//         .catch(err => {
//             console.log(err.error);
//         });
// };

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
