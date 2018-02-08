import React from 'react';
import TaskForm from './TaskForm';

export default class AddTask extends React.Component {
    render() { 
        return (
            <div>
                <div className="content-container">
                    <div>
                        <h1>Add Task</h1>
                    </div>
                    <div>
                        <TaskForm />
                    </div>
                </div>
            </div>
        );
    }
}
