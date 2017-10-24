import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';

import SignInPage from './views/SignInPage';
import Homepage from './views/Homepage';
import ArtistPage from './views/ArtistPage';


class App extends React.Component {
  state = {
  authenticated: false,
  userEmail: ''
}

render () { return (
  <Router>
    <div>
    <Route exact path='/' render={(props) => {
         return <SignInPage {...props} onSuccess={(email) => {
           this.setState({
             authenticated: true,
             userEmail: email
           })
         }} />
       }} />

      <Route path="/home" component={Homepage}/>
      <Route path="/artist/:artistName" component={ArtistPage}/>
    </div>
  </Router>
)};
}

export default App;
