import React from 'react';
import { Link } from 'react-router-dom';
import { history } from '../routers/AppRouter';
import { connect } from 'react-redux';

export const Header = props => {
    return(  
        <div className="header">
            <div className="content-container">
                <div className="header__content">
                    <Link className="link header header__title" to="/">
                        <h1>Task Manager </h1>
                    </Link>
                    {!!props.auth.isAuth ? (
                        <a
                            href="/"
                            className="button"
                            onClick={()=>localStorage.removeItem('userToken')} //hatman bayad dakhele function benevisim
                        >
                            Log Out
                        </a>
                    ) : (
                        <div>
                            <Link
                                className="button button--link header--button"
                                to="/login"
                            >
                                Log In
                            </Link>
                            <Link className="button button--link" to="/signup">
                                Sign Up
                            </Link>
                        </div>
                        //i dont use header--button twice because one margin is enough
                    )}
                </div>
            </div>
        </div>
    );
}
const mapStateToProps=(state)=>({
    auth:state.auth
})
export default connect(mapStateToProps) (Header);

    