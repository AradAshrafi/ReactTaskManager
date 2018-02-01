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
            <div>
                <div>
                    <h3>{title}</h3>
                    <h3>{description}</h3>
                </div>
                <div>
                    <p>{moment(startDate).format('MMMM Do YYYY')}</p>
                    <p>{moment(endDate).format('MMMM Do YYYY')}</p>
                    <p>{status}</p>
                </div>
            </div>
        </Link>
    );
}
export default TasksListItem;