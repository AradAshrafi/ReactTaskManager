import React from "react";
import Route from "react-router-dom";
import TasksList from "./Taskslist";
import {Link} from "react-router-dom";
// import Header from '../components/Header';


export const TasksDashboard =(props)=>{
    console.log(props)
    //setTasks (update redux)
    return (
        <div>
            {/*<Header />*/}
            <div>
                {(!!props.isAuth) ?
                <Link to='/create'>Add task</Link>
                :
                <Link to='/login'>Add task</Link>                
                }
            </div>
            <TasksList />
        </div>
    );
};
export default TasksDashboard;