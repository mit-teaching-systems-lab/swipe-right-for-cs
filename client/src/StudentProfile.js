import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StudentProfile.css';


// Renders a student profile.
class StudentProfile extends Component {
  render() {
    const {profileText, profileImageSrc} = this.props;
    return (
      <div className="StudentProfile">
        <div className="StudentProfile-image" style={{backgroundImage: `url(${profileImageSrc})`}}></div>
        <div className="StudentProfile-profile">{profileText}</div>
      </div>
    );
  }
}
StudentProfile.propTypes = {
  profileName: PropTypes.string.isRequired,
  profileImageSrc: PropTypes.string.isRequired,
  profileText: PropTypes.string.isRequired
};
export default StudentProfile;