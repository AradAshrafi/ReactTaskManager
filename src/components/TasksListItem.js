import React from 'react';
import moment from 'moment';
import { history } from '../routers/AppRouter';


export class TasksListItem extends React.Component {

// buy=()=>{

// }

    render(){ 
        return (
        <div className="list-item">
            <div className="list-item-content">
                <h3>{this.props.title}</h3>
                <h3>{this.props.description}</h3>
                {/* <p>{this.props.amount}</p> */}
                <p>kirrr</p>
            </div>
            <div className="list-item-content">
                <p className="list-item-date">
                    {moment(this.props.startDate).format('MMMM Do YYYY')}
                </p>
                <p className="list-item-date">
                    {moment(this.props.endDate).format('MMMM Do YYYY')}
                </p>
                <p className="list-item-status">{this.props.status}</p>
                {history.location.pathname=="/dashboard" && (   
                <div >
                    <button onClick={this.buy} className="button">Buy</button>
                </div>
                )
            }
            </div>
        </div>
    );
}
};

// export const TasksListItem = ({
//     _id,
//     title,
//     description,
//     startDate,
//     endDate,
//     status,
//     access
// }) => {
//     return (
//         <div className="list-item">
//             <div className="list-item-content">
//                 <h3>{title}</h3>
//                 <h3>{description}</h3>
//             </div>
//             <div className="list-item-content">
//                 <p className="list-item-date">
//                     {moment(startDate).format('MMMM Do YYYY')}
//                 </p>
//                 <p className="list-item-date">
//                     {moment(endDate).format('MMMM Do YYYY')}
//                 </p>
//                 <p className="list-item-status">{status}</p>
//             {history.location.pathname=="/dashboard" && (   
//                 <div>
//                     <button>Buy</button>
//                 </div>
//                 )
//             }
//             </div>
//         </div>
//     );
// };
export default TasksListItem;
