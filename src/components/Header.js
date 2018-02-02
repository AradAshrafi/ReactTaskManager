import React from 'react';
import { Link } from 'react-router-dom';
import { history } from '../routers/AppRouter';

export const Header = props => (
    <div>
        <Link to="/">Task Manager </Link>
        {props.isAuth ? (
            <button>Log Out</button> //handle onClick to LogOut
        ) : (
            props.isDashboard && (
                <div>
                    <Link to="/login">Log In</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            )
        )}
    </div> //handle Style
);

export default Header;
