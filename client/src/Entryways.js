import React, { Component } from 'react';
import uuid from 'uuid';
import qs from 'query-string';
import __isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
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


// Describes pathways into the game
class Entryways extends Component {
  constructor(props) {
    super(props);
    const {pathname} = window.location;
    const query = queryString.parse(window.location.search);
    this.state = {
      pathname,
      query,
    };
  }

  render() {
    const {pathname, query} = this.state;

    if (pathname.indexOf('/') === 0) {
      return window.location = '/';
    }

    if (pathname.indexOf('/start') === 0) {
      if (!query.cuid) {
        // warn
      }
    
    
      
    }
  }
    this.state = {
      isCodeOrg,
      config: defaultOptions,
      sessionId: uuid.v4(),

      // may be present for code.org
      identifier: query.cuid || Session.unknownIdentifier(),
      
      // set via the URL, by the user later on the code.org path, or to a random default
      workshopCode: query.workshop || ['DEMO', uuid.v4()].join(':'),
      
      // set when data is loaded, based on workhopCode
      cohortNumber: null, 

      // if we have workshop use it, if code.org ask for workshop, else just start
      phase: (query.workshop)
        ? Phases.TITLE
        : (isCodeOrg) ? Phases.WORKSHOP_CODE : Phases.TITLE,
      students: null,
      logs: []
    };
    this.onDataLoaded = this.onDataLoaded.bind(this);
    this.onDataError = this.onDataError.bind(this);
    this.onInteraction = this.onInteraction.bind(this);
    this.renderDemo = this.renderDemo.bind(this);
    this.renderCodeOrg = this.renderCodeOrg.bind(this);
  }

  // On iOS Safari, the back swipe gesture in the browser
  // can be confusing as users swipe in the game, and lead them
  // to navigate back or reload the page accidentally.
  // We can't control this from JS, but we can open a new tab
  // to ensure we have a clean history and this navigation won't be
  // triggered.  So if there is browser history and we're on
  // mobile Safari, force ourselves to be opened in a new tab.
  shouldBreakOut() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return (
      (window.history && window.history.length > 0) &&
      (userAgent.indexOf('safari') !== -1) &&
      (userAgent.indexOf('ios') !== -1)
    );
  }

  // The browsers are tricksy and check that this comes from 
  // a user interaction, so we do it as they enter a workshop
  // code and serialize that across.
  doBreakOut(workshopCode) {
    const params = qs.parse(window.location.search);
    const query = {...params, workshop: workshopCode};
    const url = window.location.href + '?' + qs.stringify(query);
    window.open(url, '_blank');
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
    // This has to be done in response to a user action,
    // so switch tabs if this happens.
    if (this.shouldBreakOut()) {
      return this.doBreakOut(workshopCode);
    }

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
      <div className="Entryways">
        <MobileSimulator minWidth={800} minHeight={400}>
          {isCodeOrg ? this.renderCodeOrg() : this.renderDemo()}
        </MobileSimulator>
      </div>
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
    const {students, config} = this.state;
    const {forcedProfileCount} = config;
    return (
      <StudentsPhase
        students={students}
        allowSkipAfter={forcedProfileCount}
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
    const {logs} = this.state;
    return <ThanksPhase
      logs={logs}
      onInteraction={this.onInteraction} />;
  }
}

export default Entryways;
