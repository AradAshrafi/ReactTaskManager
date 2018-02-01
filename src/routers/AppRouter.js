import { Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/SignUpPage';
import TaskDashboard from '../components/TaskDashboard';
import NotFoundPage from '../components/NotFoundPage';
import AddTask from '../components/AddTask';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <Route path="/create" component ={AddTask} />
            <Route path="/" component={TaskDashboard} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </Router>
);

export default AppRouter;