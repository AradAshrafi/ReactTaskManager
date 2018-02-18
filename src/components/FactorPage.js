import React from 'react';
import { connect } from 'react-redux';
import PurchaseTasksListItem from './PurchaseTasksListItem';
import Modal from 'react-modal';
import { axiosCart, axiosGetFactorNumberThenPay } from '../lib/server';
import { setTasks } from '../actions/tasks';

class FactorPage extends React.Component {
    state = {
        totalCost: 0,
        modalStatus: false,
        phoneNum: 0,
        task: {},
        tasksId: []
    };

    componentWillMount() {
        this.props.dispatch(setTasks({})); ///injaham k redux o khali mikonim az tasks !
        const tasksId = JSON.parse(localStorage.getItem('tasksId'));
        // console.log("tasksId in componentWillMount localStorage: ",tasksId);
        this.props.dispatch(axiosCart(tasksId));
        if (this.props.match.params.state === 'add') {
            const task = JSON.parse(localStorage.getItem('addTask'));
            // this.setState(() => ({
            //     task: task,
            //     totalCost: task.amount
            // }));
            this.state.task=task;
            // this.state.totalCost=parseInt(task.amount);
            this.state.totalCost=5000;
            console.log('task is : ', this.state.task);
            console.log(this);
            console.log(
                'task is : ',
                JSON.parse(localStorage.getItem('addTask'))
            );
        } else {
            this.setState(() => ({
                tasksId: JSON.parse(localStorage.getItem('tasksId'))
            }));
        }
    }

    onBankAcc = () => {

        const amount = this.state.totalCost; ///bayad begim amount age add bashe chejurie?
        const mobile = this.state.phoneNum;
        const userId = this.props.userId;
        const state = this.props.match.params.state;
        const task=this.state.task;
        const tasksId=this.state.tasksId;

        axiosGetFactorNumberThenPay(
            userId,
            amount,
            state,
            task,
            tasksId,
            mobile
        );
    };
    // onWallet=()=>{

    // }
    onOpenModal = () => {
        this.setState(() => ({
            modalStatus: true
        }));
    };
    closeModal = () => {
        this.setState(() => ({
            modalStatus: false
        }));
    };
    onPhoneNumChange = e => {
        const phoneNum = e.target.value;
        this.setState(() => ({
            phoneNum
        }));
    };
    render() {
        console.log("redux:",this.props.store)
        return (
            <div>
                <div>
                    {this.props.match.params.state === 'add' && (
                        <PurchaseTasksListItem {...this.state.task} /> //bayad destructure mikardim
                    )}
                    {this.props.match.params.state === 'buy' &&
                        this.props.tasks.map(val => {
                            this.setState(prevState => ({
                                totalCost: prevState.totalCost + val.amount ////tasksId amount nadarad 
                            }));
                            return <PurchaseTasksListItem {...val} />;
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

const mapStateToProps = state => ({
    wallet: state.auth.wallet,
    userId: state.auth.userId,
    tasks:state.tasks
});
export default connect(mapStateToProps)(FactorPage);
