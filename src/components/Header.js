import React from 'react';
import { Link } from 'react-router-dom';
import { history } from '../routers/AppRouter';

export const Header = props => (
    <div className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="link header header__title" to="/">
                    <h1>Task Manager </h1>
                </Link>
                {props.isAuth ? (
                    <button className="button">Log Out</button> //handle onClick to LogOut
                ) : (
                    props.isDashboard && (
                        <div>
                            <Link className="button button--link header--button" to="/login">
                                Log In
                            </Link>
                            <Link className="button button--link" to="/signup">
                                Sign Up
                            </Link>
                        </div>//i dont use header--button twice because one margin is enough
                    )
                )}
            </div>
        </div>
    </div> //handle Style
);


export default Header;
