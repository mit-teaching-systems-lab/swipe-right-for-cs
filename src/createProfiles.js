import _ from 'lodash';
import renderTemplate from './renderTemplate.js';
import ProfileA from './profiles/A.png';
import ProfileB from './profiles/B.png';
import ProfileC from './profiles/C.png';
import ProfileD from './profiles/D.png';
import ProfileE from './profiles/E.png';

function imageFor(label) {
  return {
    a: ProfileA,
    b: ProfileB,
    c: ProfileC,
    d: ProfileD,
    e: ProfileE
  }[label.toLowerCase()];
}

// Take profile templates, and the set of manipulations and zip them together
// into concrete profiles for a game.
function createProfiles(profileTemplates, manipulations) {
  return _.zip(profileTemplates, manipulations).map(([profileTemplate, manipulation]) => {
    return {
      profileName: manipulation.Name,
      profileImageSrc: imageFor(manipulation.imageKey),
      profileText: renderTemplate(profileTemplate.profile_template, manipulation),
      argumentTexts: [
        profileTemplate.argument_1,
        profileTemplate.argument_2,
        profileTemplate.argument_3,
        profileTemplate.argument_4,
        profileTemplate.argument_5
      ]
    };
  });
}

export default createProfiles;