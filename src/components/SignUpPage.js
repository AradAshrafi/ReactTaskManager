import React from 'react';
import { history } from '../routers/AppRouter';
import { axiosSignUp } from '../lib/server';

export class SignUpPage extends React.Component {
    constructor(props){
        super(props);

        axiosSignUp.bind(this);
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
                            value={this.state.phoneNumber}
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
