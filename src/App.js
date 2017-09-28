import React, { Component } from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import parseCsvSync from 'csv-parse/lib/sync';
import './App.css';
import profileTemplatesFile from './data/profileTemplates.csv';
import manipulationsFile from './data/manipulations.csv';
import hashCode from './hashCode.js';
import createProfiles from './createProfiles.js';
import IntroductionPhase from './IntroductionPhase.js';
import StudentsPhase from './StudentsPhase.js';


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
    this.onData = this.onData.bind(this);
    this.onDataError = this.onDataError.bind(this);
  }

  componentDidMount() {
    const promises = [
      fetch(profileTemplatesFile).then(r => r.text()),
      fetch(manipulationsFile).then(r => r.text())
    ];
    Promise.all(promises)
      .then(this.onData)
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

  onData(texts) {
    // Load data
    const [profileTemplatesText, manipulationsText] = texts;
    const profileTemplates = parseCsvSync(profileTemplatesText, { columns: true });
    const allManipulations = parseCsvSync(manipulationsText, { columns: true, 'auto_parse': true });

    // Determine cohort
    const {workshopCode} = this.state;
    const cohortCount = 1 + _.maxBy(allManipulations, 'cohort_number').cohort_number - _.minBy(allManipulations, 'cohort_number').cohort_number;
    const cohortNumber = hashCode(workshopCode) % cohortCount;

    // Pick particular manipulations and apply them
    const manipulations = _.filter(allManipulations, { 'cohort_number': cohortNumber });
    const students = createProfiles(profileTemplates, manipulations);
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
    return <div className="App">{this.renderScreen()}</div>;
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
