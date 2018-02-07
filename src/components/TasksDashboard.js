import React from 'react';
import Route from 'react-router-dom';
import TasksList from './Taskslist';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import {
    axiosSetTasksPublicUser,
    axiosSetTasksPrivateUser
} from '../lib/server';
import { connect } from 'react-redux';

class TasksDashboard extends React.Component {
    componentDidMount() {
        console.log('props in Tasksdashboard', this.props);
        if (!this.props.auth.isAuth) {
            alert('10-1');
            this.props.dispatch(axiosSetTasksPublicUser());
        } else {
            alert('10-2');
            this.props.dispatch(axiosSetTasksPublicUser());
            alert('10-3');
            this.props.dispatch(
                axiosSetTasksPrivateUser(localStorage.getItem('userToken'))
            ); //// inja user tokeno az localStorage gereftam va dadam behesh
            alert('10-4');
        }
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
