import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Interactions from './Interactions.js';
import './ConsentPhase.css';


// Note that changes here may require IRB amendments.
const fullConsentText = `
Optionally, we'd" like to use your responses here for a joint research study between MIT and code.org.  We would like to compare the responses across participants.

Your responses would be included in the research, along with data from your code.org profile.  All data you enter is stored securely and protected on a secure server on Google Drive, Amazon Web Services or Heroku.  If you consent, we will email you a copy of this form for your records.

You can continue playing the game either way.  Participation in the research study in voluntary.

More details:
You have been asked to participate in a research study conducted by the staff and researchers at the Teaching System Laboratory (TSL) at the Massachusetts Institute of Technology and code.org.

Purpose of study:
The purpose of this study is to investigate how computer science teachers respond within learning experiences aimed at building skills in empathy, positioning students competently, and connecting student strengths and interests with reasons to take computer science courses.  In particularly, we aim to investigate whether there are differences in how teachers respond to situations with the game differentially based on the race, ethnicity and gender of student profiles.  This will be conducted as a session within code.org workshops.  These workshops are run quarterly at around 40 sites around the United States.  Each workshop is run by a facilitator and contains roughly 10-20 teachers as participants.  The session will be blended, with some elements done in-person and some done online within the session or afterward.  All participants will be over 18.

Study results:
The results of this study will be used for ongoing research conducted by TSL and code.org in preparing and supporting effective, well-prepared computer science teachers. Results of the study will be shared through conference papers, journal articles, websites, online blogs, tweets, and other materials. All information will be reported anonymously.

Data collection:
Data collection will include online log file data including responses participants submit within learning experiences.  These may include things like: written or typed responses, clicks or taps within the learning experience, or audio or video recordings participants create.  Beyond sharing and social elements directly within the learning experience, the data will be used only for analysis or to share with other participants as they choose.  Data will be stored securely in Google Drive, Amazon Web Services and Heroku.

Participant information:
Participating in this study is voluntary. 
You will not be compensated for participating in the study.
Your email and any other personally identifiable information will be confidential.
Your anonymized responses may be shared with other players as part of the game.

Study timeframe:
This project will be completed by September 1, 2020.  After that date, participant data will be deleted.

Informed Consent: 
I understand the procedures described above. My questions have been answered to my satisfaction, and I agree to participate in this study.  I will be emailed a copy of this form.

Contact information:
Please contact Dr. Justin Reich (jreich@mit.edu) or Kevin Robinson, (krob@mit.edu) with any questions or concerns. If you feel you have been treated unfairly, or you have questions regarding your rights as a research subject, you may contact the Chairman of the Committee on the Use of Humans as Experimental Subjects, M.I.T., Room E25-143b, 77 Massachusetts Ave, Cambridge, MA 02139, phone 1-617-253-6787.`;


// Ask the user for research consent.
// Note that changes here may require IRB amendments.
class ConsentPhase extends Component {
  constructor(props) {
    super(props);
    this.onConsent = this.onConsent.bind(this);
    this.onDecline = this.onDecline.bind(this);
  }

  onConsent() {
    const {onInteraction, onDone} = this.props;
    onInteraction(Interactions.gaveConsent());
    onDone();
  }

  onDecline() {
    const {onInteraction, onDone} = this.props;
    onInteraction(Interactions.declinedConsent());
    onDone();
  }

  render() {
    return (
      <div className="ConsentPhase">
        <div className="ConsentPhase-content">
          <div className="Global-header-font">Research consent</div>
          <div className="ConsentPhase-text">{fullConsentText}</div>
          <div className="ConsentPhase-choices">
            <div onClick={this.onConsent}>I consent</div>
            <div onClick={this.onDecline}>No thanks</div>
          </div>
        </div>
      </div>
    );
  }
}
ConsentPhase.propTypes = {
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default ConsentPhase;
