import React from "react";
import TasksList from "./Taskslist";
import {Link} from "react-router-dom";
// import Header from '../components/Header';


export const TasksDashboard =()=>{
    return (
        <div>
            {/*<Header />*/}
            <div>
                <Link to='/create'>Add task</Link>
            </div>
            <TasksList />
        </div>
    );
};
export default TasksDashboard;