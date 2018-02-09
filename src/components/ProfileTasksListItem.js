import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { axiosRemoveTask } from '../lib/server';
import { connect } from 'react-redux';

export class ProfileTasksListItem extends React.Component {
    RemoveAction = () => {
        this.props.dispatch(
            axiosRemoveTask(this.props._id, localStorage.getItem('userToken'))
        );
    };

    render() {
        const {
            _id,
            title,
            description,
            startDate,
            endDate,
            status,
            access
        } = this.props;
        return (
            <div>
                <div className="list-item--hoverHandler">
                    <Link to={`edit/${_id}`} className="button--link">
                        <div className="list-item">
                            <div className="list-item-content">
                                <h3>{title}</h3>
                                <h3>{description}</h3>
                                <p>{access ? 'Public' : 'Private'}</p>
                            </div>
                            <div className="list-item-content">
                                <p className="list-item-date">
                                    {moment(startDate).format('MMMM Do YYYY')}
                                </p>
                                <p className="list-item-date">
                                    {moment(endDate).format('MMMM Do YYYY')}
                                </p>
                                <p className="list-item-status">{status}</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <button
                    className="button button--remove"
                    onClick={this.RemoveAction}
                >
                    Remove Task
                </button>
            </div>
        );
    }
}
export default connect()(ProfileTasksListItem);
