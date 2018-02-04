import React from 'react';
import { Link } from 'react-router-dom';
import { history } from '../routers/AppRouter';

export const Header = props => (
    <div>
        <Link className="link" to="/">Task Manager </Link>
        {props.isAuth ? (
            <button className="button">Log Out</button> //handle onClick to LogOut
        ) : (
            props.isDashboard && (
                <div>
                    <Link className="button button--link" to="/login">Log In</Link>
                    <Link className="button button--link" to="/signup">Sign Up</Link>
                </div>
            )
        )}
    </div> //handle Style
);

export default Header;
