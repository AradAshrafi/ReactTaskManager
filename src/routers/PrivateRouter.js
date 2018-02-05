import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
   console.log(isAuth) ;
    return(
    <Route
        {...rest}
        component={props =>
            !isAuth ? (
                <Redirect to="/" />
            ) : (
                <div>
                    <Header isAuth={isAuth} />
                    <Component isAuth = {isAuth} {...props} />
                </div>
            )
        }
    />
)};

export default PrivateRoute;
