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
            <TasksList tasks={props.tasks} />            
            <div className="content-container">
                {(!!props.isAuth) ?
                <Link to='/create' className="button button--link">Add task</Link>
                :
                <Link to='/login' className="button button--link">Add task</Link>                
                }
            </div>
        </div>
    );
};

// const mapStateToProps= (state)=>({
//     tasks:state.tasks
// })
// export default connect(mapStateToProps)(TasksDashboard);

export default TasksDashboard;