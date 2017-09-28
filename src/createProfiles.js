import _ from 'lodash';
import renderTemplate from './renderTemplate.js';
import ProfileA from './data/A.png';
import ProfileB from './data/B.png';
import ProfileC from './data/C.png';
import ProfileD from './data/D.png';
import ProfileE from './data/E.png';

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
      profileName: manipulation.name,
      profileImageSrc: imageFor(manipulation.image_key),
      profileText: renderTemplate(profileTemplate.profile_template, {
        Name: manipulation.name,
        He: _.capitalize(manipulation.he),
        he: manipulation.he,
        his: manipulation.his,
        him: manipulation.him
      }),
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