export const JWT = '1234';

export const axiosSignUp = () => {
    setTimeout(null , 1000);
    return "xxxx";
};
// (user)=>{
//     axios.post('',user)
// }


export const axiosAdd = (task) =>{
    setTimeout(null,1000)
    console.log(' successfully added ');
}

export const axiosValidation = (userToken) =>{
    setTimeout(null,1000)
    console.log('successfully validated');
    return true;
}



// export const axiosAddTask = (taskData = {}) => {
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