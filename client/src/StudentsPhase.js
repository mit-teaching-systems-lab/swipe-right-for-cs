import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Student from './Student.js';


// Show the phase where we're going through students.
class StudentsPhase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentsDone: 0
    };
    this.onDoneStudent = this.onDoneStudent.bind(this);
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

  render() {
    const {onInteraction} = this.props;
    const student = this.currentStudent();
    return (
      <div className="StudentsPhase">
        <Student
          key={student.profileName}
          {...student}
          onInteraction={onInteraction}
          onDone={this.onDoneStudent}
        />
      </div>
    );
  }
}
StudentsPhase.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default StudentsPhase;