import React from 'react';
import TasksListItem from './TasksListItem';
import { connect } from 'react-redux';

export const TasksList = ({tasks}) => {
    return (
        <div className="content-container">
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
                    tasks.map(task => <TasksListItem key={task.id} {...task} />)
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    tasks: state.tasks
});

export default connect(mapStateToProps)(TasksList);
