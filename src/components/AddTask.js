import React from "react";
import TaskForm from "./TaskForm";
// import Header from '../components/Header';

export default class AddTask extends React.Component{
    render(){
      return (
        <div>
            {/*<Header />*/}
            <div>
                <h1>Add Task</h1>
            </div>
            <div>
                <TaskForm/>
            </div>
        </div>
      );
    }
}

