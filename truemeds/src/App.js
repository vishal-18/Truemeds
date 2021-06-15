import React from 'react';
import './App.css';
import NewScreen from './NewScreen';
import Login from './Login';
import { Switch, Route} from 'react-router-dom';

function App() {
    return ( 
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/newscreen" component={NewScreen} />
    </Switch>
    )
}

export default App;
