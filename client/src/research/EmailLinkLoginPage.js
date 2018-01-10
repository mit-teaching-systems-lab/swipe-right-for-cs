import React, { Component } from 'react';
import './LoginPage.css';
import Interactions from './Interactions.js';


// The page for users to login for accessing research data.
class EmailLinkLoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      token: "default",
      status: "default"
    };

    this.onUpdateEmail = this.onUpdateEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getQueryVariable = this.getQueryVariable.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.moveForward = this.moveForward.bind(this);
  }

  getQueryVariable(variable) {
    const params = {};
    const rawParam = window.location.search;
    if (rawParam) {
      const rawParams = rawParam.substring(1); // gets rid of ?
      rawParams.split("&").forEach(function(v) {
        const varAndVal = v.split("=");
        params[decodeURIComponent(varAndVal[0])] = decodeURIComponent(varAndVal[1]);
      });
    }
    return params[variable];
  }

  authenticate(link) {
    return fetch('/api/research/email', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        link: link
      })
    });
  }

  moveForward() {
    return fetch('/api/research/interactions', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'email': this.state.email,
        'token': this.state.token
      },
      method: 'GET'
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
        if (result.status === 200){
          result.json()
            .then(result => {
              this.setState({token:result.token});
            });
          this.onSubmitSuccess();
        }else{
          this.onSubmitError();
        }
      })
      .catch(this.onSubmitError());
  }

  onSubmitSuccess() {
    this.setState({ status : 'success' });
  }

  onSubmitError() {
    this.setState({ status : 'error' });

  }

  render() {
    const { email } = this.state;
    if (this.state.status === 'default') {
      return (
        <div className='LoginView'>
          <h3>Welcome back to Teacher Moments!</h3>
          <form name="loginForm" onSubmit={this.onSubmit}>
            <div className='Block'>
              <label htmlFor="email"><b>Please enter your email below. </b></label>
            </div>
            <div className='Block'>
              <input type="email" id='email' placeholder="Enter email here" name="email" value={email} onChange={this.onUpdateEmail} required></input>
            </div>
            <div className='Block'>
              <button type="submit"> Get Link </button>
            </div>
          </form>
        </div>
      );
    } else if (this.state.status === 'error') {
      return (
        <div className='LoginView'>
          <h3>There was a problem with your request. Make sure inputted email is the same email link was sent to.</h3>
          <form name="loginForm" onSubmit={this.onSubmit}>
            <div className='Block'>
              <label htmlFor="email"><b>Please enter your email below. </b></label>
            </div>
            <div className='Block'>
              <input type="email" id='email' placeholder="Enter email here" name="email" value={email} onChange={this.onUpdateEmail} required></input>
            </div>
            <div className='Block'>
              <button type="submit"> Get Link </button>
            </div>
          </form>
        </div>
      );
    } else if (this.state.status === 'success') {
      return (
        <Interactions />
      );
    } else{
      return (
        <div className='LoginView'>
          <h3>Should never get here</h3>
        </div>
      );
    }
  }
}


export default EmailLinkLoginPage;
