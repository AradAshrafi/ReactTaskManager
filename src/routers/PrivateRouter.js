import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { connect } from 'react-redux';

///inja neshun dadam k chera bayad az store estefade konim ba console ha vali emal nashode!
const PrivateRoute = ({ auth, component: Component, ...rest }) => {
   console.log("isauth in redux mode in  private  route=",!!auth.isAuth);
    return(
    <Route
        {...rest}
        component={props =>
            !auth.isAuth ? (
                <Redirect to="/" />
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
