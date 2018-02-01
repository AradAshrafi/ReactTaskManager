import React from 'react';
import { history } from '../routers/AppRouter';
import { axiosSignUp } from '../lib/server';

export class SignUpPage extends React.Component {
    state = {
        error: undefined,
        errorText: undefined,
        success: undefined,
        name: '',
        email: '',
        phoneNum: '',
        password: undefined
    };

    Register = e => {
        let userToken;
        e.preventDefault();
        this.setState(() => ({
            success: 'Successfully registered'
        }));
        const user = {
            name: this.state.name,
            email: this.state.email,
            phoneNum: this.state.phoneNum,
            password: this.state.passsword
        };
        userToken=axiosSignUp();
        localStorage.setItem('userToken', userToken);
        console.log(localStorage.getItem('userToken'));
        history.push('/');
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
        const phoneNum = e.target.value;
        this.setState(() => ({ phoneNum }));
    };

    onPassChange = e => {
        const passsword = e.target.value;
        this.setState(() => ({ passsword }));
    };

    render = () => {
        return (
            <div>
                <form
                    className="box-layout__2 box-layout__2--2"
                    onSubmit={this.Register}
                >
                    {!!this.state.success && <p>{this.state.success}</p>}
                    {!!this.state.error && <p>{this.state.error}</p>}
                    <div className="input-group3">
                        <h1>Please enter your information</h1>
                    </div>
                    <div className="input-group2">
                        <label>Name</label>
                        <input
                            value={this.state.name}
                            onChange={this.onNameChange}
                            required
                        />
                    </div>
                    <div className="input-group2">
                        <label>Email Add.</label>
                        <input
                            value={this.state.email}
                            onChange={this.onEmailChange}
                            required={true}
                        />
                    </div>
                    <div className="input-group2">
                        <label>Phone number</label>
                        <input
                            value={this.state.phoneNum}
                            onChange={this.onPhoneChange}
                            required={true}
                        />
                    </div>
                    <div className="input-group2">
                        <label>password</label>
                        <input
                            value={this.state.password}
                            onChange={this.onPassChange}
                            required={true}
                        />
                    </div>
                    <div className=" button-group4">
                        <button className="button button--2">Sign Up</button>
                    </div>
                </form>
            </div>
        );
    };
}

export default SignUpPage;
