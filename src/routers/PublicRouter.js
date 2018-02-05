import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import {history} from '../routers/AppRouter';
const PublicRoute = ({ isAuth, component: Component, ...rest }) => {
    console.log(isAuth);
    return (
        <Route
            {...rest}
            component={props =>
                isAuth ? (
                    <Redirect to="/dashboard" />
                ) : (
                    <div>
                        {!(history.location.pathname === '/login' || history.location.pathname === '/signup') && (
                            <Header isAuth={isAuth} />
                        )}
                        <Component isAuth={isAuth} {...props} />
                    </div>
                )
            }
        />
    );
};

export default PublicRoute;
