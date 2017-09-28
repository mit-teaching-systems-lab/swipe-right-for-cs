import React, { Component } from 'react';
import './App.css';
import uuid from 'uuid';


import Turn from './Turn.js';
import ProfileA from './profiles/A.png';
import ProfileB from './profiles/B.png';
import ProfileC from './profiles/C.png';
import ProfileD from './profiles/D.png';
import ProfileE from './profiles/E.png';


function imageFor(label) {
  return {
    a: ProfileA,
    b: ProfileB,
    c: ProfileC,
    d: ProfileD,
    e: ProfileE
  }[label.toLowerCase()];
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'unknown@mit.edu',
      workshopCode: 'foo',
      sessionId: uuid.v4()
    };
    this.onDoneTurn = this.onDoneTurn.bind(this);
    this.onInteraction = this.onInteraction.bind(this);
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
  onInteraction(interaction) {
    const session = this.session();
    console.log('onInteraction', {interaction, session}); // eslint-disable-line no-console
  }

  onDoneTurn(interaction) {
    this.onInteraction(interaction);
  }

  render() {
    const exampleTurn = {
      profileName: "Jamal",
      profileImageSrc: imageFor('A'),
      profileText: "Jamal spent the entire summer camping and hiking through various terrains.  He became particularly fond of beaches and returned as an expert on tidal pools, crabs and sand dollars.",
      argumentText: "It's a great resume-booster for any job or career you're interested in if you can work with computer really well."
    };
    return (
      <div className="App">
        <Turn
          {...exampleTurn}
          onDone={this.onDoneTurn}
        />
      </div>
    );
  }
}

export default App;
