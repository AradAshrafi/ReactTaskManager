import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import {history} from '../routers/AppRouter';
import { connect } from 'react-redux';

///inja neshun dadam k chera bayad az store estefade konim ba console ha vali emal nashode!


const PublicRoute = ({ auth, component: Component, ...rest }) => {
    console.log("isAuth in redux mode",!!auth.isAuth);
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
