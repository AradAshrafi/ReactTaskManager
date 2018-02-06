import React from "react";
import Route from "react-router-dom";
import TasksList from "./Taskslist";
import {Link} from "react-router-dom";
import Header from '../components/Header';
import {axiosSetTasksPublicUser,axiosSetTasksPrivateUser} from '../lib/server';

export const TasksDashboard =(props)=>{
    console.log("props in Tasksdashboard",props)
    return (
        <div>
            <TasksList tasks={props.tasks} />            
            <div className="content-container">
                {(props.isAuth) ?
                <Link to='/create' className="button button--link button--cover">Add task</Link>
                :
                <Link to='/login' className="button button--link button--cover">Add task</Link>                
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