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
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1>Login </h1>
                    {this.state.error.length != 0 ? <p>{this.state.error}</p> : ''}
                    <form className="box-layout__form" onSubmit={this.onFormSubmit}>
                        <div className="box-layout__form">
                            <input
                                name="email"
                                placeholder="enter your email"
                                className="text-input"
                            />
                            <input 
                                name="password"
                                placeholder="enter password" 
                                className="text-input"
                                />
                        </div>
                        <button className="button">Login</button>
                    </form>
                    <div>
                        <p className="box-layout__title">Don't have an account?</p>
                        <Link className="button--link" to="/signup">Sign up</Link>
                    </div>
                </div>
            </div>
        );
    }
}