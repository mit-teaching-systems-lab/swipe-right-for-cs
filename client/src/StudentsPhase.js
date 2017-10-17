import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Student from './Student.js';
import Float from './components/Float.js';
import './StudentsPhase.css';
import Tappable from './components/Tappable.js';

// Show the phase where we're going through students.
class StudentsPhase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentsDone: 0
    };
    this.onDoneStudent = this.onDoneStudent.bind(this);
    this.onFloatClicked = this.onFloatClicked.bind(this);
  }

  currentStudent() {
    const {students} = this.props;
    const {studentsDone} = this.state;
    return students[studentsDone];
  }

  onDoneStudent() {
    const studentsDone = this.state.studentsDone + 1;
    const {students, onDone} = this.props;
    if (studentsDone >= students.length) return onDone();
    this.setState({studentsDone});
  }

  onFloatClicked() {
    const {onDone} = this.props;
    onDone();
  }

  render() {
    const {onInteraction} = this.props;
    const student = this.currentStudent();
    return (
      <div className="StudentsPhase">
        {this.renderFloat()}
        <Student
          key={student.profileName}
          {...student}
          onInteraction={onInteraction}
          onDone={this.onDoneStudent}
        />
      </div>
    );
  }

  renderFloat() {
    const {studentsDone} = this.state;
    const {allowSkipAfter} = this.props;
    if (studentsDone < allowSkipAfter) return;

    return (
      <div className="StudentsPhase-float">
        <Tappable
          onClick={this.onFloatClicked}>
          <Float style={{backgroundColor: 'rgb(38,100,157)'}}>
            <svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </Float>
        </Tappable>
      </div>
    );
  }
}
StudentsPhase.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object).isRequired,
  allowSkipAfter: PropTypes.number.isRequired,
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default StudentsPhase;