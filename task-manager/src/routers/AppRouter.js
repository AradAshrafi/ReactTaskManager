import { Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/SignUpPage';
import TasksDashboard from '../components/TasksDashboard';
import NotFoundPage from '../components/NotFoundPage';
import AddTask from '../components/AddTask';
import { axiosValidUser } from '../lib/server';

export const history = createHistory();

class AppRouter extends React.Component {
    state = {
        userToken:null,
        isAuth: false
    };

    componentWillMount() {
        try {
            const userToken = localStorage.getItem('userToken');
            if (!!userToken) {
                const isAuth = axiosValidUser(userToken);
                console.log(isAuth);
                this.setState(() => ({
                    userToken:userToken,
                    isAuth: isAuth
                }));
                if(!this.state.isAuth && history.location.pathname !== '/') //to avoid porbable infinite loops
                    history.push('/')
            }
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route
                        path="/create"
                        render={routeProps => (
                            <AddTask {...routeProps} {...this.state} />
                        )}
                    />
                    <Route
                        path="/"
                        render={routeProps => (
                            <TasksDashboard {...routeProps} {...this.state} />
                        )}
                        exact
                    />
                    <Route
                        path="/login"
                        render={routeProps => (
                            <LoginPage {...routeProps} {...this.state} />
                        )}
                    />
                    <Route
                        path="/signup"
                        render={routeProps => (
                            <SignUpPage {...routeProps} {...this.state} />
                        )}
                    />
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;