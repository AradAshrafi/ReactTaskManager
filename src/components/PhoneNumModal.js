import React from 'react';
import Modal from 'react-modal';
import { axiosPayment } from '../lib/server';
import {server_domain} from '../lib/config';

export default class PhoneNumModal extends React.Component {
    state = {
        phoneNum: '',
    };
    onPhoneNumChange = (e) => {
        const phoneNum = e.target.value;
        this.setState(() => ({
            phoneNum
        }));
    };
    submitAndMakeModalGo = e => {
        e.preventDefault();
        const api="test";
        const amount=5000;
        const redirect = `${server_domain}/v1/user/task/payment`
        const mobile = this.state.phoneNum;
        axiosPayment(api,amount,redirect,mobile);
    };
    render() {
        return (
            <Modal
                isOpen={!!this.props.addTaskState }
                onRequestClose={this.props.closeModal}
                contentLabel="PhoneNum"
                closeTimeoutMS={200}
                className="modal"
            >
                <h3 className="modal__title">Phone Number ( For Bank Messages ) : </h3>
                <input
                    className="text-input--modal"
                    placeholder="phoneNum"
                    type="text"
                    value={this.state.phoneNum}
                    onChange={this.onPhoneNumChange}
                />
                <button onClick={this.submitAndMakeModalGo} className="button">done</button>
                <button onClick={this.props.closeModal} className="button">close</button>
            </Modal>
        );
    }
}

