import React, { Component } from 'react';
import './LoginPage.css';


// The page for users to login for accessing research data.
class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    // console.log(this);
    const { value } = e.target;
    // console.log(e.target);
    this.setState({ email : value });
  }

  handleSubmit(e) {
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
        <form name="loginForm" onSubmit={this.handleSubmit}>
          <label htmlFor="email"><b>Enter authorized email address: </b></label> <br/><br/>
          <input type="email" placeholder="Enter email here" name="email" value={email} onChange={this.handleChange} required></input><br/><br/>

          <button type="submit"> Get Link </button>
        </form>
      </div>
    );
  }
}


export default LoginPage;
