import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import GamePage from './GamePage';
import LoginPage from './research/LoginPage';
import TokenLoginPage from './research/TokenLoginPage';
import ResearchPage from './research/ResearchPage';


// The main entry point for the app, routing to different pages.
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/research" component={ResearchPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/login_from_email" component={TokenLoginPage} />
          <Route exact path="/play" render={this.renderDemo} />
          <Route exact path="/start" render={this.renderCodeOrg} />
          <Route exact path="/" render={this.renderCodeOrg} />
        </div>
      </BrowserRouter>
    );
  }

  renderDemo(props) {
    return <GamePage {...props} isCodeOrg={false} />;
  }

  renderCodeOrg(props) {
    return <GamePage {...props} isCodeOrg={true} />;
  }
}

export default App;
