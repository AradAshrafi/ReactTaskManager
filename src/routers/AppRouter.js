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
import { Loading } from '../components/Loading';

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
        const userToken = localStorage.getItem('userToken');
        this.props.dispatch(
            axiosValidUser(
                userToken,
                e1 => {
                    if (e1)
                        this.setState({
                            loading: false,
                            data: true,
                            error: false
                        });
                },
                e2 => {
                    if (e2)
                        this.setState({
                            loading: false,
                            data: false,
                            error: true
                        });
                }
            )
        );
    }
    render() {
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
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(AppRouter);
