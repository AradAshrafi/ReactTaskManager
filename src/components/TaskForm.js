import React from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { history } from '../routers/AppRouter';
import moment from 'moment';
import { axiosAddTask } from '../lib/server';

export default class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.tasks ? props.tasks.description : '',
            title: props.tasks ? props.tasks.title : '',
            startDate: props.tasks ? moment(props.tasks.startDate) : moment(),
            endDate: props.tasks ? moment(props.tasks.endDate) : moment(),
            status: props.tasks ? props.tasks.status : 'TODO',
            access: props.tasks ? props.tasks.access : false,
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
        axiosAddTask({
            title: this.state.title,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            status: this.state.status,
            access: this.state.access
        });
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
        const access = !!e.target.value;
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
                            value={this.state.access}
                            onChange={this.onAccessChange}
                        >
                            <option value={false}>Private</option>
                            <option value={true}>access</option>
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
                    <div classNameclassName="input-group__item">
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
