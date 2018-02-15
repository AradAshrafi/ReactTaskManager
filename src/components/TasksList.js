import React from 'react';
import TasksListItem from './TasksListItem';
import { connect } from 'react-redux';

export const TasksList = ({tasks,userId}) => {
    return (
        <div className="content-container content-container--tasksList">
            <div  className="list-header">
                <div>Task</div>
                <div>Date</div>
            </div>
            <div className="list-body">
                {tasks.length === 0 ? (
                    <div className="list-item">
                        <p>No Tasks </p>
                    </div>
                ) : (
                    tasks.map(task =>{ 
                            if(task.userId==userId){
                                 return (<TasksListItem key={task._id} {...task} />)
                            }
                        }
                    ) //_id is task's id
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({ 
    tasks: state.tasks,
    userId:state.auth.userId
});

export default connect(mapStateToProps)(TasksList);
