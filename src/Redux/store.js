import { createStore, applyMiddleware , combineReducers} from 'redux'
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import tabReducer from './Reducers/caseReducer'

const reducer = combineReducers({
    slectedTab : tabReducer,
});

const middleware = [thunk];

const store = createStore(reducer,composeWithDevTools(applyMiddleware(...middleware)));

export default store;
