import { Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/SignUpPage';
import TasksDashboard from '../components/TasksDashboard';
import NotFoundPage from '../components/NotFoundPage';
import AddTask from '../components/AddTask';
import { axiosValidUser } from '../lib/server';
import PublicRoute from '../routers/PublicRouter';
import PrivateRoute from '../routers/PrivateRouter';
import {connect} from 'react-redux';
import {setAuth} from "../actions/auth";
////dispacho b validator ezafe kardam
export const history = createHistory();

class AppRouter extends React.Component {
    state = {
        userToken: null,
        isAuth: false
    };

    componentDidMount() {
        const userToken = localStorage.getItem('userToken');
        console.log("userToken in localStorage in componentDidMount  =",localStorage.getItem("userToken"));
        console.log("userToken vaghry reload mikoni tu componentDidMount=",userToken);
        this.props.dispatch(
            axiosValidUser(userToken, a => {
                    console.log("userToken in localStorage in componentDidMount  in dispaching axiosvalidUser =",localStorage.getItem("userToken"));        
                    console.log("userToken vaghry reload mikoni tu componentDidMount in callback=",userToken);            
                    // localStorage.setItem('userToken', userToken);
                    console.log('isAuth in Did mount "a" =', a);
                    this.props.dispatch(setAuth(a));    /////ino neveshtam hala dg redux ba reload kardan khali nemishe 
                    // localStorage.setItem('userToken',userToken);
                    this.setState({
                            userToken: userToken,
                            isAuth: a /////??????
                        },
                        () => {
                            console.log('isAuth in props mode in componentDidMount in setState callback is : ', this.state.isAuth);
                        }
                    )
                }
            )
        );
    }
    render() {
        const isAuth = this.state.isAuth;
        return (
            <Router history={history}>
                <Switch>
                    <PrivateRoute
                        isAuth={isAuth}
                        path="/create"
                        component={AddTask}
                    />
                    <PublicRoute
                        isAuth={isAuth}
                        path="/"
                        component={TasksDashboard}
                        exact
                    />
                    <PrivateRoute
                        isAuth={isAuth}
                        path="/dashboard"
                        component={TasksDashboard}
                    />
                    <PublicRoute
                        isAuth={isAuth}
                        path="/login"
                        component={LoginPage}
                    />
                    <PublicRoute
                        isAuth={isAuth}
                        path="/signup"
                        component={SignUpPage}
                    />
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        );
    }
}

export default connect()(AppRouter);
