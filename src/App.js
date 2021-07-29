import './App.css';
import Home from './components/Home';
import Topic from './components/Topic';
import {Switch,Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
       <h1>Subject Management</h1>

<Switch>
  <Route path="/" exact><Home/></Route>
  <Route path="/Topic/:id" exact><Topic/></Route>

</Switch>


     
    
    </div >
  );
}

export default App;
