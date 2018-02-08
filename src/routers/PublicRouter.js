import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import {history} from '../routers/AppRouter';
import { connect } from 'react-redux';

const PublicRoute = ({ auth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            component={props =>
                !!auth.isAuth ? (
                    <Redirect to="/dashboard" />
                ) : (
                    <div>
                        {!(history.location.pathname === '/login' || history.location.pathname === '/signup') && (
                            <Header/>
                        )}
                        <Component {...props} />
                    </div>
                )
            }
        />
    );
};
 
const mapStateToProps=(state)=>({
    auth:state.auth
})
export default connect(mapStateToProps)(PublicRoute);
