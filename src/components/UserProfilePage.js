import React from 'react';
import ProfileTasksList from './ProfileTasksList';
import { Link } from 'react-router-dom';
import { axiosSetProfileTasks } from '../lib/server';
import { connect } from 'react-redux';
import { setTasks } from '../actions/tasks';

class UserProfilePage extends React.Component {
    componentWillMount() {
        this.props.dispatch(setTasks({}));
        this.props.dispatch(axiosSetProfileTasks(localStorage.getItem('userToken')));
    }

    render() {
        return (
            <div>
                <ProfileTasksList />
                <div className="content-container">
                    <Link
                        to="/create"
                        className="button button--link button--cover"
                    >
                        Add task
                    </Link>
                </div>
            </div>
        );
    }
}

export default connect()(UserProfilePage);
