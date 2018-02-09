import React from 'react';
import thunk from 'redux-thunk';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { axiosAddTask, axiosEditTask } from '../lib/server';
import { connect } from 'react-redux';

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
            calendarFocused: null,
            error: ''
        };
        console.log(this.state.currentState,'props : ',this.props);
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
        this.state.currentState === 'adding'
            ? (axiosAddTask({
                  title: this.state.title,
                  description: this.state.description,
                  startDate: this.state.startDate,
                  endDate: this.state.endDate,
                  status: this.state.status,
                  access: this.state.access
              }))
            : this.props.dispatch(axiosEditTask(
                  this.props.task._id,
                  {
                      title: this.state.title,
                      description: this.state.description,
                      startDate: this.state.startDate,
                      endDate: this.state.endDate,
                      status: this.state.status,
                      access: this.state.access
                  },
                  localStorage.getItem('userToken')
              ));
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
                        <button className="button">Save Task</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default connect()(TaskForm);
