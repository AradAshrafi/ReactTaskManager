import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
// import Header from '../components/Header';

export const TasksListItem = ({
    id,
    title,
    description,
    startDate,
    endDate,
    status,
    access
}) => {
    return (
        <Link to={`/edit/${id}`}> 
            <div className="list-item">
                <div className="list-item-content">
                    <h3>{title}</h3>
                    <h3>{description}</h3>
                </div>
                <div className="list-item-content">
                    <p className="list-item-date">{moment(startDate).format('MMMM Do YYYY')}</p>
                    <p className="list-item-date">{moment(endDate).format('MMMM Do YYYY')}</p>
                    <p className="list-item-status">{status}</p>
                </div>
            </div>
        </Link>
    );
}
export default TasksListItem;