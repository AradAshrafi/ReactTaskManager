import React from 'react';
import ProfileTasksListItem from './ProfileTasksListItem';
import { connect } from 'react-redux';

export const ProfileTasksList = ({tasks}) => {
    return (
        <div className="content-container content-container--tasksList">
            <div  className="list-header">
                <div>Task</div>
                {/*for styling*/}
                <div>Date</div>
            </div>
            <div className="list-body">
                {tasks.length === 0 ? (
                    <div className="list-item">
                        <p>No Tasks </p>
                    </div>
                ) : (
                    tasks.map(task => <ProfileTasksListItem key={task._id} {...task} />) //_id is task's id
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({ 
    tasks: state.tasks
});

export default connect(mapStateToProps)(ProfileTasksList);
