import React, { Component } from 'react';
import uuid from 'uuid';
import parseCsvSync from 'csv-parse/lib/sync';
import './App.css';
import profilesFile from './profiles/profilesFile.csv';
import createProfiles from './createProfiles.js';
import IntroductionPhase from './IntroductionPhase.js';
import StudentsPhase from './StudentsPhase.js';



const Phases = {
  INTRODUCTION: 'INTRODUCTION',
  STUDENTS: 'STUDENTS',
  DISCUSS: 'DISCUSS',
  REVIEW: 'REVIEW',
  THANKS: 'THANKS'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'unknown@mit.edu',
      workshopCode: 'foo',
      sessionId: uuid.v4(),
      profileTemplates: null,
      phase: Phases.INTRODUCTION,
      logs: []
    };
    this.onDoneIntroduction = this.onDoneIntroduction.bind(this);
    this.onDoneStudents = this.onDoneStudents.bind(this);
    this.onInteraction = this.onInteraction.bind(this);
    this.onProfileText = this.onProfileText.bind(this);
    this.onProfileError = this.onProfileError.bind(this);
  }

  componentDidMount() {
    fetch(profilesFile)
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

  students() {
    const {profileTemplates} = this.state;
    const manipulations = [
      {
        Name: 'Jamal',
        He: 'He',
        he: 'he',
        his: 'his',
        him: 'him',
        imageKey: 'A'
      },
      {
        Name: 'Andre',
        He: 'He',
        he: 'he',
        his: 'his',
        him: 'him',
        imageKey: 'B'
      },
      {
        Name: 'Luisa',
        He: 'She',
        he: 'she',
        his: 'her',
        him: 'her',
        imageKey: 'C'
      },
      {
        Name: 'Bob',
        He: 'He',
        he: 'he',
        his: 'his',
        him: 'him',
        imageKey: 'D'
      },
      {
        Name: 'Tom',
        He: 'He',
        he: 'he',
        his: 'his',
        him: 'him',
        imageKey: 'E'
      }
    ];
    return createProfiles(profileTemplates, manipulations);
  }

  onProfileText(text) {
    const profileTemplates = parseCsvSync(text, { columns: true });
    this.setState({profileTemplates});
  }

  onProfileError(err) {
    console.error(err); // eslint-disable-line no-console
  }

  onDoneIntroduction() {
    this.setState({ phase: Phases.STUDENTS });
  }

  onDoneStudents() {
    this.setState({ phase: Phases.DISCUSS });
  }

  // Log an interaction locally and on the server, along with context
  // about the session.
  onInteraction(interaction) {
    const {logs} = this.state;

    const session = this.session();
    const log = {interaction, session};
    console.log('onLog', log); // eslint-disable-line no-console
    this.setState({ logs: logs.concat(log) });
  }

  render() {
    const {phase} = this.state;
    return (
      <div className="App">
        {phase === Phases.INTRODUCTION && this.renderIntroduction()}
        {phase === Phases.STUDENTS && this.renderStudents()}
        {phase === Phases.DISCUSS && (<div>Discuss! (TODO)</div>)}
      </div>
    );
  }

  renderIntroduction() {
    return <IntroductionPhase
      onInteraction={this.onInteraction}
      onDone={this.onDoneIntroduction} />;
  }
  renderStudents() {
    const students = this.students();
    return (
      <StudentsPhase
        students={students}
        onInteraction={this.onInteraction}
        onDone={this.onDoneStudents} />
    );
  }
}

export default App;
