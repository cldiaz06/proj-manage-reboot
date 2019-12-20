import React, {Component} from 'react';
import './App.css';
import Dashboard from './Components/Dashboard';
import Header from './Components/Layout/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AddProject from './Components/Project/AddProject';
import {Provider} from 'react-redux';
import store from './store';

class App extends Component {
  render(){
      return (
        <Provider store={store}>
          <Router>
            <div className="App">
              <Header/>
              <Route path="/dashboard" component={Dashboard}/>
              <Route path="/addProject" component={AddProject}/>
            </div>
          </Router>
        </Provider>
      );
  }
}

export default App;
