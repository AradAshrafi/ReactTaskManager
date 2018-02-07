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
import {axiosSetTasksPrivateUser,axiosSetTasksPublicUser}from "../lib/server"
////dispacho b validator ezafe kardam
export const history = createHistory();

class AppRouter extends React.Component {
    state = {
        userToken: null
    };

    componentDidMount() {
        const userToken = localStorage.getItem('userToken');
        console.log("userToken in localStorage in componentDidMount  =",localStorage.getItem("userToken"));
        console.log("userToken vaghry reload mikoni tu componentDidMount=",userToken);
        this.props.dispatch(
            axiosValidUser(userToken,()=>{
                console.log(this.props.auth)
                if(!this.props.auth.isAuth){
                        alert("10-1");
                        this.props.dispatch(axiosSetTasksPublicUser());
                }else{
                        alert("10-2");        
                        this.props.dispatch(axiosSetTasksPublicUser());
                        alert("10-3");        
                        this.props.dispatch(axiosSetTasksPrivateUser(localStorage.getItem('userToken')));  //// inja user tokeno az localStorage gereftam va dadam behesh
                        alert("10-4");        
                    }
                } 
            )
        );
    }
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <PrivateRoute
                        path="/create"
                        component={AddTask}
                    />
                    <PublicRoute
                        path="/"
                        component={TasksDashboard}
                        exact
                    />
                    <PrivateRoute
                        path="/dashboard"
                        component={TasksDashboard}
                    />
                    <PublicRoute
                        path="/login"
                        component={LoginPage}
                    />
                    <PublicRoute
                        path="/signup"
                        component={SignUpPage}
                    />
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        );
    }
}
const mapStateToProps=(state)=>({
    auth:state.auth
})
export default connect(mapStateToProps)(AppRouter);
