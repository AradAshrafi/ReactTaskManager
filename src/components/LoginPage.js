import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { fakeJWT} from '../lib/server';
import { history } from '../routers/AppRouter';
import { axiosLogIn } from '../lib/server';

export default class LoginPage extends React.Component {
    state = {
        error: ''
    };
    onFormSubmit = e => {
        let userToken
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        axiosLogIn({email,password});
        
    };
    render() {
        return (
            <div>
                <h1>Login </h1>
                {this.state.error.length != 0 ? <p>{this.state.error}</p> : ''}
                <form onSubmit={this.onFormSubmit}>
                    <input
                        name="email"
                        placeholder="enter your email or phone number"
                    />
                    <input name="password" placeholder="enter password" />
                    <button>Login</button>
                </form>
                <div>
                    <p>Don't have an account?</p>
                    <Link to="/signup">Sign up</Link>
                </div>
            </div>
        );
    }
}