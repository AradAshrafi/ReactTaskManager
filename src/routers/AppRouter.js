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
import { connect } from 'react-redux';
import { setAuth } from '../actions/auth';
import { Loading } from '../components/Loading';
import {
    axiosSetTasksPrivateUser,
    axiosSetTasksPublicUser
} from '../lib/server';

export const history = createHistory();

class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            data: false
        };
    }

    componentDidMount() { 
        alert("componentDidMount-AppRouter 9-1");
        const userToken = localStorage.getItem('userToken');
        console.log(
            'userToken in localStorage in componentDidMount  =',
            localStorage.getItem('userToken')
        );
        alert("componentDidMount-AppRouter-before Dispatching axiosValidUser 9-2");        
        this.props.dispatch(
            axiosValidUser(
                userToken,
                e1 => {
                    alert("callback1");
                    if (e1)
                        this.setState({
                            loading: false,
                            data: true,
                            error: false
                        });
                    console.log('1111app routers auth : ', this.props.auth);
                    console.log('1111app routers state : ', this.state);
                },
                e2 => {
                    alert("callback2");                    
                    if (e2)
                        this.setState({
                            loading: false,
                            data: false,
                            error: true
                        });
                    console.log('1111app routers auth : ', this.props.auth);
                    console.log('1111app routers state : ', this.state);
                },
                ()=>{
                    {
                        alert("callback3");
                        this.props.dispatch(axiosSetTasksPublicUser());
                    } 
                }
            
            )
        );
    }
    render() {
        alert("AppRoter-render 11-1")
        console.log(this.state);
        return (
            <Router history={history}>
                <div>
                    {!this.state.loading && (
                        <Switch>
                            <PrivateRoute path="/create" component={AddTask} />
                            <PublicRoute
                                path="/"
                                component={TasksDashboard}
                                exact
                            />
                            <PrivateRoute
                                path="/dashboard"
                                component={TasksDashboard}
                            />
                            <PublicRoute path="/login" component={LoginPage} />
                            <PublicRoute
                                path="/signup"
                                component={SignUpPage}
                            />
                            <Route component={NotFoundPage} />
                        </Switch>
                    )}
                    {this.state.loading && <Loading />}
                </div>
            </Router>
        );
        alert("ENDAppRoter-render 11-2");
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(AppRouter);
