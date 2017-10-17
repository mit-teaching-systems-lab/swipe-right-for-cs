import React, { Component } from 'react';
import uuid from 'uuid';
import queryString from 'query-string';
import './App.css';
import {Log, Session} from './shared/data.js';
import MobileSimulator from './components/MobileSimulator.js';
import WorkshopCode from './WorkshopCode.js';
import Title from './Title.js';
import ConsentPhase from './ConsentPhase.js';
import IntroductionPhase from './IntroductionPhase.js';
import StudentsPhase from './StudentsPhase.js';
import DiscussPhase from './DiscussPhase.js';
import ReviewPhase from './ReviewPhase.js';
import ThanksPhase from './ThanksPhase.js';
import {loadDataForCohort} from './loaders/loadDataForCohort.js';


// Describes the major phases of the whole game
const Phases = {
  WORKSHOP_CODE: 'WORKSHOP_CODE',
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
    const isCodeOrg = (window.location.pathname !== '/play');
    const query = queryString.parse(window.location.search);
    this.state = {
      isCodeOrg,
      sessionId: uuid.v4(),
      email: (isCodeOrg) ? query.email || '' : Session.unknownEmail(),
      workshopCode: (isCodeOrg) ? '' : 'demo-workshop-code',
      phase: (isCodeOrg) ? Phases.WORKSHOP_CODE : Phases.TITLE,
      students: null,
      logs: []
    };
    this.onDataLoaded = this.onDataLoaded.bind(this);
    this.onDataError = this.onDataError.bind(this);
    this.onInteraction = this.onInteraction.bind(this);
    this.renderDemo = this.renderDemo.bind(this);
    this.renderCodeOrg = this.renderCodeOrg.bind(this);
  }

  // Wait until the email and workshopCode is set,
  // which happens different ways based on the code.org
  // or public path.
  componentWillUpdate(nextProps, nextState) {
    const prevPhase = this.state.phase;
    if (nextState.phase === prevPhase) return;
    if (nextState.phase === Phases.TITLE) this.doFetchData();
  }

  // Describe context of the game session
  session() {
    const {email, workshopCode, cohortNumber, sessionId} = this.state;
    return Session.create({
      email,
      workshopCode,
      cohortNumber,
      sessionId,
      clientTimestampMs: new Date().getTime(),
      location: window.location.toString()
    });
  }

  doFetchData() {
    const {workshopCode} = this.state;
    loadDataForCohort(workshopCode)
      .then(this.onDataLoaded)
      .catch(this.onDataError);
  }

  // Optimization
  doPrefetchStudentImages(students) {
    const imageUrls = students.map(s => s.profileImageSrc);
    imageUrls.forEach(imageUrl => {
      const image = new Image();
      image.src = imageUrl;
    });
  }

  // Logging to the console, server and Rollbar
  doLog(log) {
    if (window.Rollbar) window.Rollbar.info('onLog', log);
    fetch('/api/log', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(log)
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

  // Log the interaction, along with context about the session.
  onInteraction(interaction) {
    const {logs} = this.state;
    const session = this.session();
    const log = Log.create(session, interaction);
    this.setState({ logs: logs.concat(log) });
    this.doLog(log);
  }

  render() {
    const {isCodeOrg} = this.state;

    return (
      <div className="App">
        <MobileSimulator minWidth={800} minHeight={400}>
          {isCodeOrg ? this.renderCodeOrg() : this.renderDemo()}
        </MobileSimulator>
      </div>
    );
  }

  // From code.org Code Studio, with email on query string
  renderCodeOrg() {
    const {phase, students} = this.state;
    if (phase === Phases.WORKSHOP_CODE) return this.renderWorkshopCode(Phases.TITLE);
    if (phase === Phases.TITLE) return this.renderTitle(Phases.CONSENT);
    if (phase === Phases.CONSENT) return this.renderConsent(Phases.INTRODUCTION);
    if (phase === Phases.INTRODUCTION) return this.renderIntroduction(Phases.STUDENTS);
    if (!students) return this.renderLoading();
    if (phase === Phases.STUDENTS) return this.renderStudents(Phases.DISCUSS);
    if (phase === Phases.DISCUSS) return this.renderDiscuss(Phases.REVIEW);
    if (phase === Phases.REVIEW) return this.renderReview(Phases.THANKS);
    if (phase === Phases.THANKS) return this.renderThanks();
  }

  // Publicly open demo
  renderDemo() {
    const {phase, students} = this.state;
    if (phase === Phases.TITLE) return this.renderTitle(Phases.INTRODUCTION);
    if (phase === Phases.INTRODUCTION) return this.renderIntroduction(Phases.STUDENTS);
    if (!students) return this.renderLoading();
    if (phase === Phases.STUDENTS) return this.renderStudents(Phases.REVIEW);
    if (phase === Phases.REVIEW) return this.renderReview(Phases.THANKS);
    if (phase === Phases.THANKS) return this.renderThanks();
  }

  renderWorkshopCode(phase) {
    const {email} = this.state;
    return <WorkshopCode
      email={email}
      onInteraction={this.onInteraction}
      onDone={(workshopCode) => {
        this.setState({workshopCode, phase});
      }} />;
  }

  renderTitle(phase) {
    return <Title
      onInteraction={this.onInteraction}
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

  renderReview(phase) {
    const {students, workshopCode} = this.state;
    return <ReviewPhase
      workshopCode={workshopCode}
      students={students}
      onInteraction={this.onInteraction}
      onDone={() => this.setState({phase})} />;
  }

  renderThanks(phase) {
    return <ThanksPhase onInteraction={this.onInteraction} />;
  }
}

export default App;
