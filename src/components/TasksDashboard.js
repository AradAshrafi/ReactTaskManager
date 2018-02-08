import React from 'react';
import TasksList from './Taskslist';
import { Link } from 'react-router-dom';
import {
    axiosSetTasksPublicUser,
    axiosSetTasksPrivateUser
} from '../lib/server';
import { connect } from 'react-redux';
import { setTasks } from '../actions/tasks';

class TasksDashboard extends React.Component {
    componentWillMount() {
        console.log('props in Tasksdashboard', this.props);
        this.props.dispatch(setTasks({}));
        this.props.dispatch(axiosSetTasksPublicUser());
        this.props.dispatch(
            axiosSetTasksPrivateUser(localStorage.getItem('userToken'))
        );
    }

    render() {
        return (
            <div>
                <TasksList tasks={this.props.tasks} />
                <div className="content-container">
                    {!!this.props.auth.isAuth ? (
                        <Link
                            to="/create"
                            className="button button--link button--cover"
                        >
                            Add task
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="button button--link button--cover"
                        >
                            Add task
                        </Link>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    tasks: state.tasks,
    auth: state.auth
});
export default connect(mapStateToProps)(TasksDashboard);
