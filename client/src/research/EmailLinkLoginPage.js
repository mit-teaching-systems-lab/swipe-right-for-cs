import React, { Component } from 'react';
import './LoginPage.css';

// The page for users to login for accessing research data.
class EmailLinkLoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link: "",
      email: "",
      token: "default",
      authenticated: false,
      status: "default"
    };

    this.onUpdateEmail = this.onUpdateEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getQueryVariable = this.getQueryVariable.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  componentDidUpdate() {
    //TODO: setState does not happen immediately!
    // alert(this.state.link);
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
    alert(this.state.email);
    this.setState({ link : link });
    alert(this.state.link);

    return fetch('/api/research/email', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,

        //setState doesn't update values immediately so this.state.link does not work
        // link: this.state.link
        link: link
      })
    });
  }

  onUpdateEmail(e) {
    const { value } = e.target;
    this.setState({ email : value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newValue = this.getQueryVariable('linkToken');
    // this.setState({ link : newValue });
    this.authenticate(newValue)
      .then(result => {
        if (result.status === 200){
          this.onSubmitSuccess();
        }else{
          this.onSubmitError();
        }
      })
      .catch(this.onSubmitError());
  }

  onSubmitSuccess() {
    this.setState({ authenticated : true });
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
        <div className='LoginView'>
          <h3>Success! What to do now?</h3>
        </div>
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
