import { Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/SignUpPage';
import TasksDashboard from '../components/TasksDashboard';
import NotFoundPage from '../components/NotFoundPage';
import AddTask from '../components/AddTask';
import { axiosValidation } from '../lib/server';

export const history = createHistory();

class AppRouter extends React.Component {
    state = {
        isAuth: false
    };

    componentWillMount() {
        try {
            const userToken = localStorage.getItem('userToken');
            if (!!userToken) {
                let isAuth = axiosValidation(userToken);
                console.log(isAuth);
                this.setState(() => ({
                    isAuth: isAuth
                }));
                // then && catch (push(/dashboard))
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
                            <AddTask {...routeProps} isAuth={this.state.isAuth} />
                        )}
                    />
                    <Route
                        path="/"
                        render={routeProps => (
                            <TasksDashboard {...routeProps} isAuth={this.state.isAuth} />
                        )}
                        exact
                    />
                    <Route
                        path="/login"
                        render={routeProps => (
                            <LoginPage {...routeProps} isAuth={this.state.isAuth} />
                        )}
                    />
                    <Route
                        path="/signup"
                        render={routeProps => (
                            <SignUpPage {...routeProps} isAuth={this.state.isAuth} />
                        )}
                    />
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;
