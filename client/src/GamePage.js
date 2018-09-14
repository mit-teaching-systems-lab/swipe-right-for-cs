import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import __isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import './App.css';
import {Log, Session} from './shared/data.js';
import {error} from './shared/log.js';
import MobileSimulator from './components/MobileSimulator.js';
import Lifecycle from './components/Lifecycle.js';
import WorkshopCode from './WorkshopCode.js';
import Title from './Title.js';
import ConsentPhase from './ConsentPhase.js';
import IntroductionPhase from './IntroductionPhase.js';
import StudentsPhase from './StudentsPhase.js';
import DiscussPhase from './DiscussPhase.js';
import ReviewPhase from './ReviewPhase.js';
import ThanksPhase from './ThanksPhase.js';
import {loadDataForCohort, defaultOptions} from './loaders/loadDataForCohort.js';


// Describes the major phases of the whole game
const Phases = {
  WORKSHOP_CODE: 'WORKSHOP_CODE',
  TITLE: 'TITLE',
  CONSENT: 'CONSENT',
  INTRODUCTION: 'INTRODUCTION',
  STUDENTS: 'STUDENTS',
  DISCUSS: 'DISCUSS',
  REVIEW: 'REVIEW',
  THANKS: 'THANKS'
};

// See https://github.com/sindresorhus/query-string/issues/50
function queryHasKey(query, key) {
  return Object.prototype.hasOwnProperty.call(query, key);
}

class GamePage extends Component {
  constructor(props) {
    super(props);
    const {isCodeOrg, defaultWorkshopCode} = props;
    const query = queryString.parse(window.location.search) || {};

    // 12/8/17 This is a patch to rebalance cells for remaining trials, oversampling from
    // those that have been undersampled to this point due to randomness.  Going forward
    // with other experiments, we should switch strategies so that we generate the
    // experimental cells and then pull from them for each new workshop identifier we see,
    // to force balance across experimental cells.  This is a workaround for the remaining
    // sessions of the study that's already underway.
    // const forceCodeOrgBuckets = (isCodeOrg) ? [2, 3, 3, 4, 6, 7] : false;

    // 9/12/18 This patch was removed for the Q2 2018 run.
    const forceCodeOrgBuckets = false;
    
    this.state = {
      isCodeOrg,
      config: {
        ...defaultOptions,
        forceCodeOrgBuckets
      },
      sessionId: uuid.v4(),
      reviewPhaseOptions: {
        showPercents: !queryHasKey(query, 'reviewnopercents'),
        copyVersion: query['reviewcopyversion'] || '0'
      },
      identifier: (isCodeOrg)
        ? query['cuid'] || Session.unknownIdentifier()
        : Session.unknownIdentifier(),
      workshopCode: (defaultWorkshopCode !== undefined)
        ? defaultWorkshopCode
        : ['DEMO', uuid.v4()].join(':'), // for code.org, set in initial screens
      cohortNumber: null, // set when data is loaded, based on workhopCode
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

  // Describe context of the game session
  session() {
    const {isCodeOrg, identifier, workshopCode, cohortNumber, sessionId} = this.state;
    return Session.create({
      isCodeOrg,
      identifier,
      workshopCode,
      cohortNumber,
      sessionId,
      clientTimestampMs: new Date().getTime(),
      location: window.location.toString()
    });
  }

  shouldWarnAboutCodeStudio() {
    const {identifier} = this.state;
    return (
      (identifier === Session.unknownIdentifier()) ||
      (__isEmpty(identifier))
    );
  }

  doFetchData() {
    const {workshopCode, config} = this.state;
    loadDataForCohort(workshopCode, config)
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

  // Log to the server
  doLog(log) {
    fetch('/api/log', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(log)
    });
  }

  onWorkshopCodeDone(nextPhase, workshopCode) {
    this.setState({workshopCode, phase: nextPhase});
  }

  onTitleDone(nextPhase) {
    this.setState({phase: nextPhase});
  }

  onDataLoaded(loadedData) {
    const {cohortNumber, students} = loadedData;
    this.setState({cohortNumber, students});
    this.doPrefetchStudentImages(students);
  }

  onDataError(err) {
    error(err);
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
      <MobileSimulator minWidth={800} minHeight={400}>
        {isCodeOrg ? this.renderCodeOrg() : this.renderDemo()}
      </MobileSimulator>
    );
  }

  // From code.org Code Studio, with identifier on query string
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
    return <WorkshopCode
      shouldWarnAboutCodeStudio={this.shouldWarnAboutCodeStudio()}
      onInteraction={this.onInteraction}
      onDone={this.onWorkshopCodeDone.bind(this, phase)} />;
  }

  renderTitle(phase) {
    return (
      <Lifecycle componentWillMount={() => this.doFetchData()}>
        <Title
          onInteraction={this.onInteraction}
          onDone={this.onTitleDone.bind(this, phase)} />
      </Lifecycle>
    );
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
    const {shouldAskOpenResponse} = this.props;
    const {students, config} = this.state;
    const {forcedProfileCount} = config;
    return (
      <StudentsPhase
        students={students}
        allowSkipAfter={forcedProfileCount}
        shouldAskOpenResponse={shouldAskOpenResponse}
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
    const {students, workshopCode, reviewPhaseOptions} = this.state;
    return <ReviewPhase
      workshopCode={workshopCode}
      students={students}
      onInteraction={this.onInteraction}
      reviewPhaseOptions={reviewPhaseOptions}
      onDone={() => this.setState({phase})} />;
  }

  renderThanks(phase) {
    const {logs} = this.state;
    return <ThanksPhase
      logs={logs}
      onInteraction={this.onInteraction} />;
  }
}
GamePage.propTypes = {
  isCodeOrg: PropTypes.bool.isRequired,
  shouldAskOpenResponse: PropTypes.bool,
  defaultWorkshopCode: PropTypes.string
};
GamePage.defaultProps = {
  defaultWorkshopCode: undefined
};

export default GamePage;
