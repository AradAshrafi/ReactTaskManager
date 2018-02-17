import React from "react";
import { connect } from 'react-redux';
import PurchaseTasksListItem from "./PurchaseTasksListItem";
import Modal from 'react-modal'
import { axiosCart,axiosGetFactorNumberThenPay } from "../lib/server";
import { setTasks } from '../actions/tasks';


class FactorPage extends React.Component {
    state = {
        totalCost: 0,
        modalStatus: false,
        phoneNum : 0
    }

    componentWillMount() {
        this.props.dispatch(setTasks({}));
        const tasksId=localStorage.getItem('tasksId')
        this.props.dispatch(axiosCart(tasksId));
    }

    onBankAcc = () => {
        const amount = this.state.totalCost;
        const mobile = this.state.phoneNum;
        const userId = this.props.userId;
        const state = this.props.match.params.state;
        let task;
        let tasksId;
        if (state == "add") {
             task =localStorage.getItem("addTask");
        }else{
             tasksId =localStorage.getItem("tasksId");
        }
        axiosGetFactorNumberThenPay(userId,amount,state,task,tasksId,mobile);
    }
    // onWallet=()=>{

    // }
    onOpenModal = () => {
        this.setState(() => ({
            modalStatus: true
        }))
    }
    closeModal = () => {
        this.setState(() => ({
            modalStatus: false
        }))
    }
    onPhoneNumChange = e => {
        const phoneNum = e.target.value;
        this.setState(() => ({
            phoneNum
        }));
    };
    render() {
        return (
            <div>
                <div>
                    {this.props.tasks.map(val => {
                        this.setState((prevState) => ({
                            totalCost: prevState.totalCost + val.amount
                        }))
                        return (<PurchaseTasksListItem {...val} />)
                    })}
                    <div>
                        <p>Total costs :{this.state.totalCost}</p>
                    </div>
                </div>
                <div>
                    <h3>Payment method</h3>
                    <button onClick={this.onOpenModal}>Use Bank Account</button>
                    {/* <button onClick={this.onWallet}>Use Wallet</button> */}
                </div>
                <Modal
                    isOpen={!!this.state.modalStatus}
                    onRequestClose={this.closeModal}
                    contentLabel="PhoneNum"
                    closeTimeoutMS={200}
                    className="modal"
                >
                    <h3 className="modal__title">
                        Phone Number ( For Bank Messages ) :
                    </h3>
                    <input
                        className="text-input--modal"
                        placeholder="phoneNum"
                        type="text"
                        value={this.state.phoneNum}
                        onChange={this.onPhoneNumChange}
                    />
                    <button onClick={this.onBankAcc}> Done</button>
                    <button onClick={this.closeModal}> Close</button>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tasks: state.tasks,
    wallet: state.auth.wallet,
    userId: state.auth.userId
})
export default connect(mapStateToProps)(FactorPage);