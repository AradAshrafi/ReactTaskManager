import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { connect } from 'react-redux';

const PrivateRoute = ({ auth, component: Component, ...rest }) => {
    return(
    <Route
        {...rest}
        component={props =>
            !auth.isAuth ? (
                <Redirect to="/" />//it's equal to history.push('/')
            ) : (
                <div>
                    <Header/>
                    <Component {...props} />
                </div>
            )
        }
    />
)};

const mapStateToProps=(state)=>({ 
    auth:state.auth
})

export default connect (mapStateToProps) (PrivateRoute);
