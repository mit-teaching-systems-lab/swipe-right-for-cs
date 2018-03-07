import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import qs from 'query-string';
import GamePage from './GamePage';
import LoginPage from './research/LoginPage';
import EmailLinkLoginPage from './research/EmailLinkLoginPage';
import ResearchPage from './research/ResearchPage';


// The main entry point for the app, routing to different pages.
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/research" component={ResearchPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/login_from_email" component={EmailLinkLoginPage} />
          <Route exact path="/play" render={this.renderDemo} />
          <Route exact path="/group/:code" render={this.renderDemoForGroup} />
          <Route exact path="/start" render={this.renderCodeOrg} />
          <Route exact path="/" render={this.renderCodeOrg} />
        </div>
      </BrowserRouter>
    );
  }

  // Random workshop code and student profiles
  renderDemo(props) {
    return <GamePage {...props} isCodeOrg={false} />;
  }

  // For stable workshop codes and consistent student profiles
  // for a cohort.  Optionally asks open-response questions for each
  // student.
  renderDemoForGroup(props) {
    const {code} = props.match.params;
    const query = qs.parse(props.location.search);
    return <GamePage
      {...props}
      isCodeOrg={false}
      shouldAskOpenResponse={'open' in query}
      defaultWorkshopCode={code} />;
  }

  renderCodeOrg(props) {
    return <GamePage {...props} isCodeOrg={true} />;
  }
}

export default App;
