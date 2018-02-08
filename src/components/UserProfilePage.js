import React from 'react';
import ProfileTasksList from './ProfileTasksList';
import { Link } from 'react-router-dom';
import {
    axiosSetProfileTasks
} from '../lib/server';
import { connect } from 'react-redux';
import { setTasks } from '../actions/tasks';

class UserProfilePage extends React.Component{

}

const mapStateToProps = state => ({
    tasks: state.tasks
});

export default connect (mapStateToProps)(UserProfilePage);