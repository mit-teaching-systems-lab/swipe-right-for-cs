import React, { Component } from 'react';
import logo from './logo.svg';
import pic from './draft-pic.jpg';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      page: 0
    };
  }
  onPageChange() {

    this.setState(  {
      page: this.state.page + 1
    } );
  }

  render() {
    if (this.state.page === 0) {
      return <Title onDone = {this.onPageChange.bind(this)} />; 
    }
    if (this.state.page === 1) {
      return <Instructions onDone = {this.onPageChange.bind(this)} />;
    }
    if (this.state.page === 2){
      return <Student onDone = {this.onPageChange.bind(this)} />
    }

    }
  }


class Title extends Component {

  render() {
    return (
      <div className="Title">

        <p className="App-intro">
          Swipe Right for CS!    
        </p>

        <button onClick = {this.props.onDone} > CLICK ME TO PLAY </button>
        
        
      </div>
    );
  }
} 

Title.propTypes = {
  onDone: React.PropTypes.func.isRequired
};

class Instructions extends Component {
  render(){
    return (
      <div className = "Instructions">
        <p className = "Instructions-header">
           Round 1: Meet some students! 
        </p>
        

        <p className = "Instructions-body"> For each student, read their profile and take on their perspective. Once you've read some reasons teachers might use to convince them to take a computer science course. </p>
        
        <button onClick = {this.props.onDone} > READY? </button>

      


      </div>
    );

  }

}

Instructions.propTypes = {
  onDone: React.PropTypes.func.isRequired
};

class Student extends Component{
  render(){
    return(
    <div className = "Student">
      <p> SAM </p>
      <img src= {pic} alt = 'Pic' />

      <div className = "Student-Profile">
        <p> I led a team of 10 people through building a catapult for shop class! </p>
      </div>
        
        <button onClick = {this.props.onDone} > OKAY </button>


    </div>
    );
  }

}

Student.propTypes = {
  onDone: React.PropTypes.func.isRequired
};

export default App;
