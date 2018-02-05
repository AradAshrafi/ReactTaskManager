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

export const history = createHistory();

class AppRouter extends React.Component {
    state = {
        userToken: null,
        isAuth: false
    };

    componentWillMount() {
        const userToken = localStorage.getItem('userToken');
        axiosValidUser(userToken, a => {
            console.log('isAuth in will mount', a);
            this.setState({
                userToken: userToken,
                isAuth: a/////??????
            }),
                () => {
                    console.log(history.location.pathname);
                    console.log('isAuth is : ', this.state.isAuth);
                };
        });
    }

    // try {
    //     const userToken = localStorage.getItem('userToken');
    //     axiosValidUser(userToken, a => {
    //         console.log('isAuth in will mount', a);
    //         this.setState(
    //             {
    //                 userToken: userToken,
    //                 isAuth: a /////??????
    //             },
    //             () => {
    //                 console.log(history.location.pathname);
    //                 console.log('isAuth is : ', this.state.isAuth);
    //                 if (
    //                     history.location.pathname === '/' ||
    //                     history.location.pathname === '/login' ||
    //                     history.location.pathname === '/create' ||
    //                     history.location.pathname === '/signup'
    //                 ) {
    //                     if (
    //                         !this.state.isAuth &&
    //                         !(
    //                             history.location.pathname === '/' ||
    //                             history.location.pathname === '/login' ||
    //                             history.location.pathname === '/signup'
    //                         )
    //                     ) {
    //                         //to avoid porbable infinite loops
    //                         history.push('/');
    //                     }
    //                     if (
    //                         this.state.isAuth &&
    //                         (history.location.pathname === '/login' ||
    //                             history.location.pathname === '/signup')
    //                     ) {
    //                         //to avoid porbable infinite loops
    //                         history.push('/');
    //                     }
    //                 }
    //             }
    //         );
    //     });

    // } catch (e) {
    //     console.log(e);
    // }

    render() {
        const isAuth=this.state.isAuth
        return (
            <Router history={history}>
                <Switch>
                    <PrivateRoute
                        isAuth
                        path="/create"
                        component={AddTask}
                    />
                    <PublicRoute
                        isAuth
                        path="/"
                        component={TasksDashboard}
                        exact
                    />
                    <PrivateRoute
                        isAuth
                        path="/dashboard"
                        component={TasksDashboard}
                    />
                    <PublicRoute
                        isAuth
                        path="/login"
                        component={LoginPage}
                    />
                    <PublicRoute
                        isAuth
                        path="/signup"
                        component={SignUpPage}
                    />
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;
