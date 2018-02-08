import React from 'react';
import { Link } from 'react-router-dom';
import { axiosSignUp } from '../lib/server';
import { connect } from 'react-redux';

export class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        error: undefined,
        errorText: undefined,
        success: undefined,
        name: '',
        email: '',
        phoneNumber: '',
        password: undefined
    };

    Register = e => {
        e.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            password: this.state.passsword
        };
        this.props.dispatch(axiosSignUp(user));
    };

    onNameChange = e => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    };

    onEmailChange = e => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    };

    onPhoneChange = e => {
        const phoneNumber = e.target.value;
        this.setState(() => ({ phoneNumber }));
    };

    onPassChange = e => {
        const passsword = e.target.value;
        this.setState(() => ({ passsword }));
    };

    render = () => {
        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <form className="box-layout__form" onSubmit={this.Register}>
                        {!!this.state.success && <p>{this.state.success}</p>}
                        {!!this.state.error && <p>{this.state.error}</p>}
                        <div className="box-layout__form">
                            <div>
                                <span>
                                    do you want to visit tasks as a guest ?{' '}
                                </span>
                                <a href="/" className="button">
                                    Public Tasks
                                </a>
                            </div>
                            <div>
                                <h1>Please enter your information</h1>
                            </div>
                            <div>
                                <input
                                    placeholder="enter your name"
                                    className="text-input  text-input--group1"
                                    value={this.state.name}
                                    onChange={this.onNameChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    placeholder="enter your email"
                                    className="text-input text-input--group1"
                                    value={this.state.email}
                                    onChange={this.onEmailChange}
                                    required={true}
                                />
                            </div>
                            <div>
                                <input
                                    placeholder="enter your phone number"
                                    className="text-input text-input--group1"
                                    value={this.state.phoneNumber}
                                    onChange={this.onPhoneChange}
                                    required={true}
                                />
                            </div>
                            <div>
                                <input
                                    placeholder="enter your password"
                                    className="text-input text-input--group1"
                                    value={this.state.password}
                                    onChange={this.onPassChange}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div>
                            <button className="button button--circle">
                                Sign Up
                            </button>
                        </div>
                        <div>
                            <p>already have an account ?</p>
                            <Link className="button--link link" to="/login">
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
}

export default connect()(SignUpPage);
