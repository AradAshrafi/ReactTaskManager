import React from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { history } from '../routers/AppRouter';
import moment from 'moment';
import {axiosAdd} from '../lib/server';

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
        axiosAdd({
            title: this.state.title,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            status: this.state.status,
            access: this.state.access
        });
        history.push('/');
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
                <input
                    placeholder="title"
                    type="text"
                    value={this.state.title}
                    onChange={this.onTitleChange}
                />
                <input
                    placeholder="description"
                    type="text"
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <div>
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
                <select
                    value={this.state.status}
                    onChange={this.onStatusChange}
                >
                    <option value="TODO">Todo</option>
                    <option value="DOING">Doing</option>
                    <option value="DONE">Done</option>
                </select>
                <select
                    value={this.state.access}
                    onChange={this.onAccessChange}
                >
                    <option value={false}>Private</option>
                    <option value={true}>access</option>
                </select>
                <div>
                    <button className="button">Save Task</button>
                </div>
            </form>
        );
    }
}
