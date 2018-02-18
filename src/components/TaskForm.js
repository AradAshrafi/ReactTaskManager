import React from 'react';
import thunk from 'redux-thunk';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { setTasks } from '../actions/tasks';
import { axiosAddTask, axiosEditTask } from '../lib/server';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';

export class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: props.task ? 'editing' : 'adding',
            description: props.task ? props.task.description : '',
            title: props.task ? props.task.title : '',
            startDate: props.task ? moment(props.task.startDate) : moment(),
            endDate: props.task ? moment(props.task.endDate) : moment(),
            status: props.task ? props.task.status : 'TODO',
            access: props.task ? props.task.access : false,
            amount: props.task ? props.task.amount : 0,
            calendarFocused: null,
            error: ''
        };
    }

    onSubmit = e => {
        //other solution (is thinked and have maslehat)
        // this.props.onSubmit({
        //     title: this.state.title,
        //     description:this.state.description,
        //     startDate: this.state.startDate,
        //     endDate: this.state.endDate,
        //     status:this.state.status,
        //     access:this.state.access
        // });

        e.preventDefault();
        if (this.state.currentState === 'adding') {
            const addingTaskObj={
                title: this.state.title,
                description: this.state.description,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                status: this.state.status,
                access: this.state.access,
                amount: this.state.amount
            }
            localStorage.setItem(
                'addTask',
                JSON.stringify(addingTaskObj)
            );
            setTasks(addingTaskObj);
            history.push('/factor/add');
        } else {
            this.props.dispatch(
                axiosEditTask(
                    this.props.task._id,
                    {
                        title: this.state.title,
                        description: this.state.description,
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                        status: this.state.status,
                        access: this.state.access,
                        amount: this.state.amount
                    },
                    localStorage.getItem('userToken')
                )
            );
        }
    };

    onTitleChange = e => {
        const title = e.target.value;
        this.setState(() => ({ title }));
    };

    onDescriptionChange = e => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onDatesChange = ({ startDate, endDate }) => {
        this.setState(() => ({
            startDate,
            endDate
        }));
    };

    onFocusChange = calendarFocused => {
        this.setState(() => ({
            calendarFocused
        }));
    };

    onStatusChange = e => {
        const status = e.target.value;
        this.setState(() => ({ status }));
    };

    onAccessChange = e => {
        const access = e.target.value === 'Public' ? true : false;
        this.setState(() => ({
            access
        }));
    };
    onAmountChange = e => {
        const amount = e.target.value;
        this.setState(() => ({ amount }));
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="input-group">
                    <div className="input-group__item">
                        <input
                            className="text-input"
                            placeholder="title"
                            type="text"
                            value={this.state.title}
                            onChange={this.onTitleChange}
                        />
                    </div>
                    <div className="input-group__item">
                        <select
                            className="select"
                            value={
                                this.state.access === true
                                    ? 'Public'
                                    : 'Private'
                            }
                            onChange={this.onAccessChange}
                        >
                            <option value="Private">Private</option>
                            <option value="Public">Public</option>
                        </select>
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-group__item">
                        <input
                            className="text-input"
                            placeholder="description"
                            type="text"
                            value={this.state.description}
                            onChange={this.onDescriptionChange}
                        />
                    </div>
                    <div className="input-group__item">
                        <select
                            className="select"
                            value={this.state.status}
                            onChange={this.onStatusChange}
                        >
                            <option value="TODO">Todo</option>
                            <option value="DOING">Doing</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            showClearDates={true}
                        />
                    </div>
                    <div className="input-group__item">
                        <input
                            className="text-input"
                            placeholder="Price of the task"
                            type="number"
                            value={this.state.amount}
                            onChange={this.onAmountChange}
                        />
                    </div>
                </div>
                <div className="input-group">
                    <button className="button button--link button--cover">
                        Save Task
                    </button>
                </div>
            </form>
        );
    }
}

export default connect()(TaskForm);
