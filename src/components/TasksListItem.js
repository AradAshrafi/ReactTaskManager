import React from 'react';
import moment from 'moment';
import { history } from '../routers/AppRouter';


export class TasksListItem extends React.Component {

    cart = () => {
        let arr = JSON.parse(localStorage.getItem("tasksId"));
        if (arr === null) {
            arr = [];
            arr.push(this.props._id);
        } else {
            arr.push(this.props._id);
        }
        alert('task has been added to cart ');
        localStorage.setItem("tasksId", JSON.stringify(arr))
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
                    {history.location.pathname == "/dashboard" && (
                        <div >
                            <button onClick={this.cart} className="button">Add to cart</button>
                        </div>
                    )
                    }
                </div>
            </div>
        );
    }
};


export default TasksListItem;
