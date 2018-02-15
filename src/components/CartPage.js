import React from 'react';
import { setTasks } from '../actions/tasks';
import { axiosCart } from '../lib/server';
import { connect } from 'react-redux';
import PurchaseTasksListItem from '../components/PurchaseTasksListItem'

class CartPage extends React.Component {
    componentWillMount() {
        this.props.dispatch(setTasks({}));
        const tasksId=localStorage.getItem('tasksId')
        this.props.dispatch(axiosCart(tasksId))
    }
    render() {
        return(
            <div>
                <h1>Cart : </h1>
                {this.props.tasks.map(task=>(
                    <PurchaseTasksListItem {...task} />
                ))}
            </div>
        )

    }
}
const mapStateToProps =(state) =>({
    tasks:state.tasks
})
export default connect(mapStateToProps)(CartPage);