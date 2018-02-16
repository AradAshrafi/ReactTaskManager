import React from "react";
import moment from 'moment';
import { history } from '../routers/AppRouter';
import {removeTask} from "../actions/tasks";
import { connect } from 'react-redux';


class PurchaseTasksListItem extends React.Component {

    Remove=()=>{
        this.props.dispatch(removeTask(this.props._id));
        JSON.parse(localStorage.getItem("tasksId"))
    }

    render() {
        return (
            <div className="list-item">
                <div className="list-item-content">
                    <h3>{this.props.title}</h3>
                    <h3>{this.props.description}</h3>
                    <p>Price {this.props.amount}</p>
                </div>
                <div className="list-item-content">
                    <p className="list-item-date">
                        {moment(this.props.startDate).format('MMMM Do YYYY')}
                    </p>
                    <p className="list-item-date">
                        {moment(this.props.endDate).format('MMMM Do YYYY')}
                    </p>
                    <p className="list-item-status">{this.props.status}</p>
                    {history.location.pathname=="/cart" && (
                        <div >
                            <button onClick={this.Remove} className="button">Remove Task</button>
                        </div>
                        )
                    }
                </div>
            </div>
        );
    }
};


export default connect ()(PurchaseTasksListItem);
