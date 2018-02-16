import React from 'react';
import Modal from 'react-modal';
import { axiosPayment } from '../lib/server';
import { server_domain } from '../lib/config';
import { connect } from 'react-redux';
import {history} from '../routers/AppRouter';

class PhoneNumModal extends React.Component {
    state = {
        phoneNum: '',
        amount: 5000
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
        const amount = this.state.amount;
        const mobile = this.state.phoneNum;
        axiosPayment( amount, mobile);
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
                <p>{this.props.wallet}</p>
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
                {history.location.pathname == '/profile' && (
                    <button onClick={this.props.closeModal} className="button">
                        close
                    </button>
                )}
                {history.location.pathname == '/create' && (
                    <button onClick={this.props.closeModal} className="button">
                        Profile
                    </button>
                )}
            </Modal>
        );
    }
}
const mapStateToProps = state => ({
    wallet:state.auth.wallet
});

export default connect(mapStateToProps)(PhoneNumModal);
