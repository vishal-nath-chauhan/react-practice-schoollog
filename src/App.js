import './App.css';
import Home from './components/Home';
import Topic from './components/Topic';
import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';

function App() {
  const state = useSelector((state) => state)
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact><Home /></Route>
        <Route path="/Topic/:id" exact><Topic state={state} /></Route>
      </Switch>
    </div >
  );
}

export default App;
