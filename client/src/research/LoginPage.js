import React, { Component } from 'react';
import './LoginPage.css';


// The page for users to login for accessing research data.
class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      message: ""
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
        email: this.state.email.toLowerCase()
      })
    })
      .then(result => {
        if (result.status === 200) {
          this.setState({message: "Check your email, "+this.state.email+" for a login link!"});
        } else{
          this.setState({message: "Your email, "+this.state.email+", does not seem to be authorized to view user data."});
        }
      })
      .catch(err => {
        this.setState({message: "An error occurred. Make sure your email address is authorized and try again!"});
      });
  }
  
  render() {
    const email = this.state.email;
    return (
      <div className='LoginView'>
        <h2> Welcome to the Teacher Moments Researcher Portal</h2>
        <h3>{this.state.message}</h3>
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
