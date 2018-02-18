import React from 'react';
import { setTasks } from '../actions/tasks';
import { axiosCart } from '../lib/server';
import { connect } from 'react-redux';
import PurchaseTasksListItem from '../components/PurchaseTasksListItem';
import {history} from "../routers/AppRouter";

class CartPage extends React.Component {
    componentWillMount() {
        this.props.dispatch(setTasks({}));
        const tasksId=localStorage.getItem('tasksId')
        this.props.dispatch(axiosCart(tasksId));
    }
    onConfirm=(e)=>{
        e.preventDefault();
        history.push("/factor/buy");
    }
    render() {
        return(
            <div>
                <h1>Cart : </h1>
                {this.props.tasks.map(task=>(
                    <PurchaseTasksListItem key={task._id}{...task} />
                ))}
                <button onClick={this.onConfirm}>Confirm</button>
            </div>
        )

    }
}
const mapStateToProps =(state) =>({
    tasks:state.tasks
})
export default connect(mapStateToProps)(CartPage);