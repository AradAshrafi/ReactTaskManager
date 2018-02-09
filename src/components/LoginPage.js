import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { axiosLogIn } from '../lib/server';

 class LoginPage extends React.Component {
    state = {
        error: '' 
    };
    onFormSubmit = e => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        this.props.dispatch(axiosLogIn({ email, password }));
    };
    render() {
        return (
            <div className="box-layout">
                <div className="box-layout__box">

                    {this.state.error.length != 0 ? (
                        <p>{this.state.error}</p>
                    ) : (
                        ''
                    )}
                    <form
                        className="box-layout__form"
                        onSubmit={this.onFormSubmit}
                    >
                        <div className="box-layout__form">
                            <div>
                                <span>
                                    do you want to visit tasks as a guest ?{' '}
                                </span>
                                <a href="/" className="button button--link">
                                    Public Tasks
                                </a>
                            </div>
                            <input
                                name="email"
                                placeholder="enter your email"
                                className="text-input text-input--group1 text-input--group2"
                            />
                            <input
                                name="password"
                                placeholder="enter password"
                                className="text-input text-input--group1"
                            />
                        </div>
                        <button className="button button--circle">Login</button>
                    </form>
                    <div>
                        <p className="box-layout__title">
                            Don't have an account?
                        </p>
                        <Link className="button--link link" to="/signup">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect ()(LoginPage);
