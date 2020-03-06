import React, {Component} from 'react';
import './App.css';
import Dashboard from './Components/Dashboard';
import Header from './Components/Layout/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AddProject from './Components/Project/AddProject';
import {Provider} from 'react-redux';
import store from './store';
import UpdateProject from './Components/Project/UpdateProject';
import ProjectBoard from './Components/ProjectBoard/ProjectBoard';
import AddProjectTask from './Components/ProjectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './Components/ProjectBoard/ProjectTasks/UpdateProjectTask';
import Landing from './Components/Layout/Landing';
import Register from './Components/UserManagement/Register';
import Login from './Components/UserManagement/Login';
import jwt_decode from 'jwt-decode';
import setJWToken from './SecurityUtils/securityUtils';
import { SET_CURRENT_USER } from './actions/Types';
import { logout } from './actions/SecurityActions';
import SecuredRoute from './SecurityUtils/SecureRoute';

const jwtToken = localStorage.jwtToken;

if(jwtToken){
  setJWToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render(){
      return (
        <Provider store={store}>
          <Router>
            <div className="App">
              <Header/>
              {
                //public routes
              }
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              {
                //private routes upon login
              }
              <Switch>
                <SecuredRoute exact path="/dashboard" component={Dashboard}/>
                <SecuredRoute exact path="/addProject" component={AddProject}/>
                <SecuredRoute exact path="/updateProject/:id" component={UpdateProject} />
                <SecuredRoute exact path="/projectBoard/:id" component={ProjectBoard} /> 
                <SecuredRoute exact path="/addProjectTask/:id" component={AddProjectTask}/>
                <SecuredRoute exact path="/UpdateProjectTask/:backlog_id/:ptId" component={UpdateProjectTask}/>
              </Switch>
            </div>
          </Router>
        </Provider>
      );
  }
}

export default App;
