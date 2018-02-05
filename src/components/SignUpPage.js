import React from 'react';
import { history } from '../routers/AppRouter';
import { Link } from 'react-router-dom';
import { axiosSignUp } from '../lib/server';

export class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        // axiosSignUp.bind(this);
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
        // let userToken;
        e.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            password: this.state.passsword
        };
        axiosSignUp(user);

        // localStorage.setItem('userToken', userToken);
        // console.log(localStorage.getItem('userToken'));
        // history.push('/');
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
                    <h1>Sign Up</h1>
                    <form className="box-layout__form" onSubmit={this.Register}>
                        {!!this.state.success && <p>{this.state.success}</p>}
                        {!!this.state.error && <p>{this.state.error}</p>}
                        <div className="box-layout__form">
                            <div >
                                <h1>Please enter your information</h1>
                            </div>
                            <div >
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
                            <button className="button button--circle">Sign Up</button>
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

export default SignUpPage;
