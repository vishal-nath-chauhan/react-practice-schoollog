import {createStore } from 'redux';
import reducerFunction from "../reducer/Reducer";

const store =createStore(reducerFunction) ;

export default store;