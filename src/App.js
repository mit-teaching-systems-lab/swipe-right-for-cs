import React, { Component } from 'react';
import uuid from 'uuid';
import './App.css';
import MobileSimulator from './MobileSimulator.js';
import IntroductionPhase from './IntroductionPhase.js';
import StudentsPhase from './StudentsPhase.js';
import {loadDataForCohort} from './loaders/loadDataForCohort.js';


// Describes the major phases of the whole game
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
      phase: Phases.INTRODUCTION,
      students: null,
      logs: []
    };
    this.onDoneIntroduction = this.onDoneIntroduction.bind(this);
    this.onDoneStudents = this.onDoneStudents.bind(this);
    this.onInteraction = this.onInteraction.bind(this);
    this.onDataLoaded = this.onDataLoaded.bind(this);
    this.onDataError = this.onDataError.bind(this);
  }

  componentDidMount() {
    const {workshopCode} = this.state;
    loadDataForCohort(workshopCode)
      .then(this.onDataLoaded)
      .catch(this.onDataError);
  }

  // Describe context of the game session
  session() {
    const {email, workshopCode, cohortNumber, sessionId} = this.state;
    return {
      email,
      workshopCode,
      cohortNumber,
      sessionId,
      clientTimestampMs: new Date().getTime(),
      location: window.location.toString()
    };
  }

  onDataLoaded(loadedData) {
    const {cohortNumber, students} = loadedData;
    this.setState({cohortNumber, students});
  }

  onDataError(err) {
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
    return (
      <div className="App">
        <MobileSimulator minWidth={800} minHeight={400}>
          {this.renderScreen()}
        </MobileSimulator>
      </div>
    );
  }

  renderScreen() {
    const {phase, students} = this.state;
    if (phase === Phases.INTRODUCTION) return this.renderIntroduction();
    if (!students) return this.renderLoading();
    if (phase === Phases.STUDENTS) return this.renderStudents();
    if (phase === Phases.DISCUSS) return <div>Discuss! (TODO)</div>;
  }

  renderIntroduction() {
    return <IntroductionPhase
      onInteraction={this.onInteraction}
      onDone={this.onDoneIntroduction} />;
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderStudents() {
    const {students} = this.state;
    return (
      <StudentsPhase
        students={students}
        onInteraction={this.onInteraction}
        onDone={this.onDoneStudents} />
    );
  }
}

export default App;
