import React, { Component } from 'react';
import './LoginPage.css';
import Interactions from './Interactions.js';
import queryString from 'query-string';

// This is the landing page users reach when clicking on a login 
// link from their email. Users can confirm their email to get 
// access to participant data.
class EmailLinkLoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      token: "default",
      status: "default",
      message: "Welcome back to Swipe Right!"
    };

    this.onUpdateEmail = this.onUpdateEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getQueryVariable = this.getQueryVariable.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  getQueryVariable(variable) {
    const query = queryString.parse(window.location.search);
    return query[variable];
  }

  authenticate(link) {
    return fetch('/api/research/email', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email.toLowerCase(),
        link: link
      })
    })
      .then(result => {
        if (result.status === 200){
          return result.json();
        } else {
          throw new Error('failed to fetch');
        }
      });
  }

  onUpdateEmail(e) {
    const { value } = e.target;
    this.setState({ email : value });
  }

  onSubmit(e) {
    e.preventDefault();
    const linkToken = this.getQueryVariable('linkToken');
    this.authenticate(linkToken)
      .then(result => {
        this.setState({token:result.token});
        this.onSubmitSuccess();
      })
      .catch(err => {
        this.onSubmitError();
      });
  }

  onSubmitSuccess() {
    this.setState({ 
      status : 'success' ,
      message: "Welcome back to Swipe Right!"
    });
  }

  onSubmitError() {
    this.setState({ 
      status : 'error' ,
      message: "There was a problem with your request. Make sure inputted email is the same email link was sent to."
    });
  }

  render() {
    const { email } = this.state;
    if (this.state.status === 'success') {
      if ((this.state.email !=="")&&(this.state.token !== "default")){
        return (
          <Interactions email={this.state.email.toLowerCase()} token={this.state.token}/>
        );
      }else {
        return null;
      }
    } else {
      return (
        <div className='LoginPage'>
          <h2>{this.state.message}</h2>
          <form name="loginForm" onSubmit={this.onSubmit}>
            <div className='LoginPage-Block'>
              <label htmlFor="email"><b>Please enter your email below. </b></label>
            </div>
            <div className='LoginPage-Block'>
              <input type="email" id='email' placeholder="Enter email here" name="email" value={email} onChange={this.onUpdateEmail} required></input>
            </div>
            <div className='LoginPage-Block'>
              <button type="submit"> Login </button>
            </div>
          </form>
        </div>
      );
    } 
  }
}


export default EmailLinkLoginPage;
