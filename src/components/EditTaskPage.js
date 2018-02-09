import React from 'react'
import TaskForm from '../components/TaskForm'
import {connect} from "react-redux"
import {axiosEditTask,axiosRemoveTask} from "../lib/server";

class EditTaskPage extends React.Component{
    RemoveAction = () => {
        this.props.dispatch(axiosRemoveTask(this.props._id, localStorage.getItem("userToken")));
    }
    onSubmit=()=>{
        const task=this.props.task;
        const taskId=this.props.task._id;
        const userToken=localStorage.getItem('usertoken');
        this.props.dispatch(axiosEditTask(taskId,task,userToken));
    }
    render(){
        return(
            <div>
                <div className="content-container">
                    <div>
                        <h1>Add Task</h1>
                    </div>
                    <div>
                        <TaskForm 
                        task={Props.task}
                        onSubmit={this.onSubmit}
                        />
                        <button 
                            className="button button--secondary"
                            onClick={this.RemoveAction}
                        >
                        Remove expense
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps =(state,props) => {
    return {
        task:state.tasks.find((task)=>{
            return task._id==props.match.params.id;
        })
    }
}

export default connect (mapStateToProps) (EditTaskPage);