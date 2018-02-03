import React from "react";
import Route from "react-router-dom";
import TasksList from "./Taskslist";
import {Link} from "react-router-dom";
import Header from '../components/Header';
import {axiosSetTasksPublicUser,axiosSetTasksPrivateUser} from '../lib/server';

export const TasksDashboard =(props)=>{
    console.log(props)
    !props.isAuth ? axiosSetTasksPublicUser() : (axiosSetTasksPrivateUser(props.userToken),axiosSetTasksPublicUser());
    return (
        <div>
            <Header isAuth={props.isAuth} isDashboard={true} />
            <div>
                {(!!props.isAuth) ?
                <Link to='/create'>Add task</Link>
                :
                <Link to='/login'>Add task</Link>                
                }
            </div>
            <TasksList tasks={props.tasks} />
        </div>
    );
};

// const mapStateToProps= (state)=>({
//     tasks:state.tasks
// })
// export default connect(mapStateToProps)(TasksDashboard);

export default TasksDashboard;