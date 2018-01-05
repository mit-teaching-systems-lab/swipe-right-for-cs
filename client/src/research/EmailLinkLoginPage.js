import React, { Component } from 'react';
import './LoginPage.css';

// The page for users to login for accessing research data.
class EmailLinkLoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      link: "",
      token: ""
    };

    this.onUpdateEmail = this.onUpdateEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getQueryVariable = this.getQueryVariable.bind(this);
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

  onUpdateEmail(e) {
    const { value } = e.target;
    this.setState({ email : value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newValue = this.getQueryVariable('linkToken');
    this.setState({ link : newValue });
    fetch('/api/research/email', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        link: this.state.link
      })
    });
  }

  //Should there be something when email is not valid?
  //then we'd have to wait for promise to return.....
  //or make it send an email saying email is not valid?

  render() {
    const { email } = this.state;
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
  }
}


export default EmailLinkLoginPage;
