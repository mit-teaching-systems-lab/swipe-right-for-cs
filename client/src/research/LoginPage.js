import React, { Component } from 'react';
import './LoginPage.css';


// The page for users to login for accessing research data.
class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };

    this.onUpdateEmail = this.onUpdateEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onUpdateEmail(e) {
    const { value } = e.target;
    this.setState({ email : value });
  }

  onSubmit(e) {
    e.preventDefault();
    fetch('/api/research/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email
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
        <h3> Welcome to the Teacher Moments Researcher Portal</h3>
        <form name="loginForm" onSubmit={this.onSubmit}>
          <div className='Block'>
            <label htmlFor="email"><b>Enter authorized email address: </b></label>
          </div>
          <div className='Block'>
            <input type="email" placeholder="Enter email here" name="email" value={email} onChange={this.onUpdateEmail} required></input>
          </div>
          <div className='Block'>
            <button type="submit"> Get Link </button>
          </div>
        </form>
      </div>
    );
  }
}


export default LoginPage;
