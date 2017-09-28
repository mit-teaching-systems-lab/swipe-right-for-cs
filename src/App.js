import React, { Component } from 'react';
import _ from 'lodash';
import uuid from 'uuid';
import parseCsvSync from 'csv-parse/lib/sync';
import './App.css';
import Profiles from './profiles/Profiles.csv';
import renderTemplate from './renderTemplate.js';

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
      sessionId: uuid.v4(),
      profiles: null
    };
    this.onDoneTurn = this.onDoneTurn.bind(this);
    this.onInteraction = this.onInteraction.bind(this);
    this.onProfileText = this.onProfileText.bind(this);
    this.onProfileError = this.onProfileError.bind(this);
  }

  componentDidMount() {
    fetch(Profiles)
      .then(r => r.text()).then(this.onProfileText)
      .catch(this.onProfileError);
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

  onProfileText(text) {
    const profiles = parseCsvSync(text, { columns: true });
    this.setState({profiles});
  }

  onProfileError(err) {
    console.error(err); // eslint-disable-line no-console
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
    return (
      <div className="App">
        {this.renderScreen()}
      </div>
    );
  }

  renderScreen() {
    const {profiles} = this.state;
    if (!profiles) return <div>Loading...</div>;

    const exampleTurn = _.first([_.first(profiles)].map((profile) => {
      const studentInfo = {
        Name: 'Jamal',
        He: 'He',
        he: 'he',
        his: 'his',
        him: 'him'
      };
      return {
        profileName: studentInfo.Name,
        profileImageSrc: imageFor('A'),
        profileText: renderTemplate(profile.profile_template, studentInfo),
        argumentText: _.first([
          profile.argument_1,
          profile.argument_2,
          profile.argument_3,
          profile.argument_4,
          profile.argument_5
        ])
      };
    }));
    // const exampleTurn = {
    //   profileName: "Jamal",
    //   profileImageSrc: imageFor('A'),
    //   profileText: "Jamal spent the entire summer camping and hiking through various terrains.  He became particularly fond of beaches and returned as an expert on tidal pools, crabs and sand dollars.",
    //   argumentText: "It's a great resume-booster for any job or career you're interested in if you can work with computer really well."
    // };
    return (
      <Turn
        {...exampleTurn}
        onDone={this.onDoneTurn}
      />
    );
  }
}

export default App;
