import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StudentProfile.css';


// Renders a student profile.
class StudentProfile extends Component {
  render() {
    const {profileName, profileText, profileImageSrc, imageHeight} = this.props;
    return (
      <div className="StudentProfile">
        <img
          height={imageHeight}
          src={profileImageSrc}
          alt={profileName} />
        <div className="StudentProfile-profile">{profileText}</div>
      </div>
    );
  }
}
StudentProfile.propTypes = {
  imageHeight: PropTypes.number.isRequired,
  profileName: PropTypes.string.isRequired,
  profileImageSrc: PropTypes.string.isRequired,
  profileText: PropTypes.string.isRequired
};
export default StudentProfile;