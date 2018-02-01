import { Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/SignUpPage';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage}/>
        </Switch>
    </Router>
);

export default AppRouter;