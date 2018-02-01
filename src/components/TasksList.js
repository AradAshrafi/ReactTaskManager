import React from 'react';
import TasksListItem from "./TasksListItem";
import {connect}  from "react-redux";

export const TasksList=({tasks,users})=>{
    return (
        <div>
            <div>
                <div>Task</div>{/*for styling*/ }
                <div>Date</div>
            </div>
            <div>
                {tasks.map((task)=>(<TasksListItem key={task.id} {...task} />))}
            </div>
        </div>
    );
};

const mapStateToProps=(state)=>({
    tasks:state.tasks,
})

export default connect(mapStateToProps)(TasksList);