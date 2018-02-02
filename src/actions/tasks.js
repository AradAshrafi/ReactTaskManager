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
import axios from 'axios';

// export const addTask = task => ({
//     type: 'ADD_TASK',
//     task
// });

export const setTasks = tasks => ({
    type: 'SET_TASKS',
    tasks
});
