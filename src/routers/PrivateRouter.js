import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { connect } from 'react-redux';

///inja neshun dadam k chera bayad az store estefade konim ba console ha vali emal nashode!
const PrivateRoute = ({ auth,isAuth, component: Component, ...rest }) => {
   console.log("isAuth in props mode in private route = ",isAuth) ;
   console.log("isauth in redux mode in  private  route=",!!auth.isAuth);
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

const mapStateToProps=(state)=>({
    auth:state.auth
})

export default connect (mapStateToProps) (PrivateRoute);
