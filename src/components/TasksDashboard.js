import React from 'react';
import TasksList from './Taskslist';
import { Link } from 'react-router-dom';
import {
    axiosSetTasksPublicUser,
    axiosSetTasksPrivateUser
} from '../lib/server';
import { connect } from 'react-redux';
import { setTasks } from '../actions/tasks';
import { axiosPayment } from '../lib/server';
class TasksDashboard extends React.Component {
    componentWillMount() {
        this.props.dispatch(setTasks({}));
        this.props.dispatch(axiosSetTasksPublicUser());
        this.props.dispatch(
            axiosSetTasksPrivateUser(localStorage.getItem('userToken'))
        );
    }

    render() {
        return (
            <div>
                <TasksList />
            </div>
        );
    }
}

export default connect()(TasksDashboard);
