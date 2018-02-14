import React from 'react';
import ProfileTasksList from './ProfileTasksList';
import { Link } from 'react-router-dom';
import { axiosSetProfileTasks } from '../lib/server';
import { connect } from 'react-redux';
import { setTasks } from '../actions/tasks';
import PhoneNumModal from './PhoneNumModal';

class UserProfilePage extends React.Component {
    state = {
        addTaskState: false
    };

    componentWillMount() {
        this.props.dispatch(setTasks({}));
        this.props.dispatch(
            axiosSetProfileTasks(localStorage.getItem('userToken'))
        );
    }
    onClick = e => {
        e.preventDefault();
        this.setState(() => {
            return {
                addTaskState: true
            };
        });
    };

    closeModal = e => {
        e.preventDefault();
        this.setState(() => {
            return {
                addTaskState: false
            };
        });
    };

    render() {
        return (
            <div>
                <ProfileTasksList />
                <div className="content-container">
                    <button
                        onClick={this.onClick}
                        to="/create"
                        className="button button--link button--cover"
                    >
                        Add task
                    </button>
                    <PhoneNumModal
                        closeModal={this.closeModal}
                        addTaskState={this.state.addTaskState}
                    />
                </div>
            </div>
        );
    }
}

export default connect()(UserProfilePage);
