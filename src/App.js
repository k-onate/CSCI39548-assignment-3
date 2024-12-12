/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import axios from 'axios';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // tries to make an API call to retrive data from remote website
  async componentDidMount()
  {
    let creditsAPI = 'https://johnnylaicode.github.io/api/credits.json';

    try {
      let response = await axios.get(creditsAPI);
      console.log(response);
      this.setState({creditList: response.data});
    }
     catch(error)
    {
      if(error.response) {
        console.log(error.response.data);
      }
    }

    let debitsAPI = "https://johnnylaicode.github.io/api/credits.json";

    try {
      let response = await axios.get(debitsAPI);
      console.log(response);
      this.setState({debitList: response.data});
    }
    catch(error)
    {
      if(error.reponse) {
        console.log(error.response.data);
      }
    }
  }


  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser});
}

  //setting up mutator functions for credit and debit pages
  setCredits = (newCredits) => { this.setState({creditList: newCredits}); }
  setDebits = (newDebits) => {this.setState({debitList: newDebits}); }

  setAccountBalance = (newBalance) => { this.setState({accountBalance: newBalance}); }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)

    const CreditsComponent = () => (
      <Credits 
        credits = {this.state.creditList} 
        accountBalance = {this.state.accountBalance}
        setCredits = {this.setCredits}
        setAccountBalance = {this.setAccountBalance}
      />) 

    const DebitsComponent = () => (
      <Debits 
        debits={this.state.debitList} 
        accountBalance = {this.state.accountBalance}
        setDebits = {this.setDebits}
        setAccountBalance = {this.setAccountBalance}
      />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/CSCI39548-assignment-3">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;
