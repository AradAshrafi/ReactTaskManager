import React from 'react';
import TasksList from './Taskslist';
import { Link } from 'react-router-dom';
import {
    axiosSetTasksPublicUser,
    axiosSetTasksPrivateUser
} from '../lib/server';
import { connect } from 'react-redux';
import { setTasks } from '../actions/tasks';
import {axiosPayment} from '../lib/server';
import PhoneNumModal from './PhoneNumModal'
class TasksDashboard extends React.Component {
    state={
        addTaskState:false
    }

    componentWillMount() {
        this.props.dispatch(setTasks({}));
        this.props.dispatch(axiosSetTasksPublicUser());
        this.props.dispatch(
            axiosSetTasksPrivateUser(localStorage.getItem('userToken'))
        );
    }

    onClick = (e) =>{
        e.preventDefault()
        this.setState(()=>{
            return{
                addTaskState:true
            }
        })
    }

    closeModal=(e)=>{
        e.preventDefault()
        this.setState(()=>{
            return{
                addTaskState:false
            }
        })
    }

    render() {
        return (
            <div>
                <TasksList />
                <div className="content-container">
                    {!!this.props.auth.isAuth ? (
                        <button
                            onClick={this.onClick}
                            to="/create"
                            className="button button--link button--cover"
                        >
                            Add task
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="button button--link button--cover"
                        >
                            Add task
                        </Link>
                    )}
                    <PhoneNumModal closeModal={this.closeModal} addTaskState={this.state.addTaskState} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(TasksDashboard);
