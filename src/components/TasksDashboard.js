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
        alert("ComponentDidMount-tasksDashboard 1 ")
        console.log('props in Tasksdashboard', this.props);
        if (!!this.props.auth.isAuth){
            alert('ComponentDidMount-tasksDashboard-before-private-2');            
            this.props.dispatch(
                axiosSetTasksPrivateUser(localStorage.getItem('userToken'))
            ); 
            alert('ComponentDidMount-tasksDashboard-3');
        }
    }

    render() { 
        alert("START-tasksDashbpard-render-1");
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
        alert("END-tasksDashbpard-render-2") ;       
    }
}

const mapStateToProps = state => ({
    tasks: state.tasks,
    auth: state.auth
});
export default connect(mapStateToProps)(TasksDashboard);
