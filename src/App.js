import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import uuid from 'uuid';
import Swipeable from './Swipeable.js';
import Interactions from './Interactions.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'unknown@mit.edu',
      workshopCode: 'foo',
      sessionId: uuid.v4()
    };
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);
  }

  // Describe context of the game session
  session() {
    const {email, workshopCode, sessionId} = this.state;
    return {
      email,
      workshopCode,
      sessionId,
      clientTimestampMs: new Date().getTime(),
      location: window.location.toString()
    };
  }

  // Log an interaction to the server, along with context about the session
  doLogInteraction(interaction) {
    const session = this.session();
    console.log('doLogInteraction', {interaction, session});
  }

  onSwipeLeft(question, argument) {
    this.doLogInteraction(Interactions.swipeLeft({question, argument}));
  }

  onSwipeRight(question, argument) {
    this.doLogInteraction(Interactions.swipeRight({question, argument}));
  }

  render() {
    const question = { profile: 'sarah' };
    const argument = { text: 'do it!' };
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>cheesy first change</h2>
        </div>
        <Swipeable
          height={200}
          onSwipeLeft={this.onSwipeLeft.bind(this, question, argument)}
          onSwipeRight={this.onSwipeRight.bind(this, question, argument)}>
          hello!
        </Swipeable>
      </div>
    );
  }
}

export default App;
