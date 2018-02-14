import React from 'react';
import Modal from 'react-modal';
import { axiosPayment } from '../lib/server';
import { server_domain } from '../lib/config';

export default class PhoneNumModal extends React.Component {
    state = {
        phoneNum: '',
        amount:5000
    };
    onPhoneNumChange = e => {
        const phoneNum = e.target.value;
        this.setState(() => ({
            phoneNum
        }));
    };
    onAmountChange = e => {
        const amount = e.target.value;
        this.setState(() => ({
            amount
        }));
    };
    
    
    submitAndMakeModalGo = e => {
        e.preventDefault();
        const api = 'test';
        const amount = this.state.amount;
        const redirect = `${server_domain}/v1/user/task/payment`;
        const mobile = this.state.phoneNum;
        axiosPayment(api, amount, redirect, mobile);
    };
    render() {
        return (
            <Modal
                isOpen={!!this.props.addTaskState}
                onRequestClose={this.props.closeModal}
                contentLabel="PhoneNum"
                closeTimeoutMS={200}
                className="modal"
            >
                <h3>account balance : </h3>
                <p>sth</p>
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
                <span>
                    amount to charge(adding each task needs 5000 charge) :<input
                        className="text-input--modal"
                        placeholder="amount"
                        type="text"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                </span>
                <button onClick={this.submitAndMakeModalGo} className="button">
                    done
                </button>
                <button onClick={this.props.closeModal} className="button">
                    close
                </button>
            </Modal>
        );
    }
}
