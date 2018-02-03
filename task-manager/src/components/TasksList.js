import React from 'react';
import TasksListItem from './TasksListItem';
import { connect } from 'react-redux';

export const TasksList = ({tasks}) => {
    return (
        <div>
            <div>
                <div>Task</div>
                {/*for styling*/}
                <div>Date</div>
            </div>
            <div>
                {tasks.length === 0 ? (
                    <div>
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
