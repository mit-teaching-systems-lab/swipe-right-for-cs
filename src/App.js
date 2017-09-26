import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      page: 0
    };
  }
  onPageChange() {
    this.setState( {
      page: this.state.page + 1
    } );
  }

  render() {
    if (this.state.page === 0) {
      return <Title onDone = {this.onPageChange.bind(this)} />; 
    }

      return <Instructions OnDone = {this.onPageChange.bind(this)} />;
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

class Instructions extends Component {
  render(){
    return (
      <div className = "Instructions">
        <div className = "Instructions-header">
          <p> Round 1: Meet some students! </p>
        </div>

        <div className = "Instructions-body">
          <p> For each student, read their profile and take on their perspective. Once you've read some reasons teachers might use to convince them to take </p>

        </div>
      
      <button onClick = {this.props.onDone} > OKAY </button>


      </div>
    )

  }

}


export default App;
