import './App.css';
import Home from './components/Home';
import Topic from './components/Topic';
import { Switch, Route } from 'react-router-dom'
import {Provider} from 'react-redux';
import store from "./Data/Store"
function App() {
  return (
    <Provider store ={store}>
    <div className="App">
      <Switch>
        <Route path="/" exact><Home /></Route>
        <Route path="/Topic/:id" exact><Topic /></Route>

      </Switch>
    </div >
    </Provider>
  );
}

export default App;
