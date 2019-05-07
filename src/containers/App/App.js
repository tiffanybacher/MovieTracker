import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import './App.css';
import { fetchDiscover } from '../../api/fetchDiscover';
import { cleanDiscover } from '../../api/cleaners';

class App extends Component {
  
  componentDidMount() {
    fetchDiscover()
      .then(response => cleanDiscover(response.results))
      .then(movies => console.log(movies));
  }
  
  render() {
    return(
      <div className="App">
        <h1>OUR APP</h1>
        {/* <Header />
        <Switch>
          <Route exact path='/' component={Splash}/>
          <Route exact path='/movies' component={MovieContainer}/>
        </Switch> */}
      </div>
    );
  }
}

export default connect()(App);
