import {createStore,combineReducers,applyMiddleware,compose} from "redux";
import thunk from 'redux-thunk';
import tasks from "../reducers/tasks";

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default ()=>{
    const store=createStore(combineReducers({
        tasks:tasks
    }),
   composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}