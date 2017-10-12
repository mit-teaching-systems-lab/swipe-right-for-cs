import React, { Component } from 'react';
import uuid from 'uuid';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import queryString from 'query-string';
import './App.css';
import MobileSimulator from './components/MobileSimulator.js';
import Title from './Title.js';
import ConsentPhase from './ConsentPhase.js';
import IntroductionPhase from './IntroductionPhase.js';
import StudentsPhase from './StudentsPhase.js';
import DiscussPhase from './DiscussPhase.js';
import {loadDataForCohort} from './loaders/loadDataForCohort.js';


// Describes the major phases of the whole game
const Phases = {
  TITLE: 'TITLE',
  INTRODUCTION: 'INTRODUCTION',
  STUDENTS: 'STUDENTS',
  DISCUSS: 'DISCUSS',
  REVIEW: 'REVIEW',
  THANKS: 'THANKS'
};

class App extends Component {
  constructor(props) {
    super(props);
    const query = queryString.parse(window.location.search);
    this.state = {
      email: query.email || 'unknown@mit.edu',
      workshopCode: uuid.v4(),
      sessionId: uuid.v4(),
      phase: Phases.TITLE,
      students: null,
      logs: []
    };
    this.onDataLoaded = this.onDataLoaded.bind(this);
    this.onDataError = this.onDataError.bind(this);
    this.onInteraction = this.onInteraction.bind(this);
    this.renderDemo = this.renderDemo.bind(this);
    this.renderCodeOrg = this.renderCodeOrg.bind(this);
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

  // Optimization
  doPrefetchStudentImages(students) {
    const imageUrls = students.map(s => s.profileImageSrc);
    imageUrls.forEach(imageUrl => {
      const image = new Image();
      image.src = imageUrl;
    });
  }

  onDataLoaded(loadedData) {
    const {cohortNumber, students} = loadedData;
    this.setState({cohortNumber, students});
    this.doPrefetchStudentImages(students);
  }

  onDataError(err) {
    console.error(err); // eslint-disable-line no-console
  }

  // Log an interaction locally and on the server, along with context
  // about the session.
  onInteraction(interaction) {
    const {logs} = this.state;

    const session = this.session();
    const log = {interaction, session};
    console.log('onLog', log); // eslint-disable-line no-console
    if (window.Rollbar) window.Rollbar.info('onLog', log);
    this.setState({ logs: logs.concat(log) });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <MobileSimulator minWidth={800} minHeight={400}>
            <Route exact path="/" render={this.renderDemo}/>
            <Route exact path="/start" render={this.renderCodeOrg}/>
          </MobileSimulator>
        </div>
      </Router>
    );
  }

  // From code.org Code Studio, with email on query string
  renderCodeOrg(match) {
    const {phase, students} = this.state;
    if (phase === Phases.TITLE) return this.renderTitle(Phases.CONSENT);
    if (phase === Phases.CONSENT) return this.renderConsent(Phases.INTRODUCTION);
    if (phase === Phases.INTRODUCTION) return this.renderIntroduction(Phases.STUDENTS);
    if (!students) return this.renderLoading();
    if (phase === Phases.STUDENTS) return this.renderStudents(Phases.DISCUSS);
    if (phase === Phases.DISCUSS) return this.renderDiscuss(Phases.REVIEW);
    if (phase === Phases.REVIEW) return this.renderReview();
  }

  // Publicly open demo
  renderDemo(match) {
    const {phase, students} = this.state;
    if (phase === Phases.TITLE) return this.renderTitle(Phases.INTRODUCTION);
    if (phase === Phases.INTRODUCTION) return this.renderIntroduction(Phases.STUDENTS);
    if (!students) return this.renderLoading();
    if (phase === Phases.STUDENTS) return this.renderStudents(Phases.REVIEW);
    if (phase === Phases.REVIEW) return this.renderReview();
  }

  renderTitle(phase) {
    return <Title
      onDone={() => this.setState({phase})} />;
  }

  renderConsent(phase) {
    return <ConsentPhase
      onInteraction={this.onInteraction}
      onDone={() => this.setState({phase})} />;
  }

  renderIntroduction(phase) {
    return <IntroductionPhase
      onInteraction={this.onInteraction}
      onDone={() => this.setState({phase})} />;
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderStudents(phase) {
    const {students} = this.state;
    return (
      <StudentsPhase
        students={students}
        onInteraction={this.onInteraction}
        onDone={() => this.setState({phase})} />
    );
  }

  renderDiscuss(phase) {
    const {students} = this.state;
    return <DiscussPhase
      students={students}
      onInteraction={this.onInteraction}
      onDone={() => this.setState({phase})} />;
  }

  renderReview() {
    return <div>TODO...</div>;
  }
}

export default App;
