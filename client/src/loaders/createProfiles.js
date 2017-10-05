import _ from 'lodash';
import renderTemplate from './renderTemplate.js';
import HM1 from '../files/HM1.png';
import HF1 from '../files/HF1.png';
import BM1 from '../files/BM1.png';
import BF1 from '../files/BF1.png';
import CM1 from '../files/CM1.png';
import CF2 from '../files/CF2.png';
import WM1 from '../files/WM1.png';
import WF1 from '../files/WF1.png';
import IM1 from '../files/IM1.png';
import IF1 from '../files/IF1.png';

function imageFor(label) {
  return {
    BM1,
    BF1,
    HM1,
    HF1,
    CM1,
    CF2,
    WM1,
    WF1,
    IM1,
    IF1
  }[label.toUpperCase()];
}

// Take profile templates, and the set of manipulations and zip them together
// into concrete profiles for a game.
//
// Returns no students on input array length mismatch.
function createProfiles(profileTemplates, variants) {
  if (profileTemplates.length !== variants.length) return [];

  return _.zip(profileTemplates, variants).map(([profileTemplate, variant]) => {
    return {
      profileName: variant.name,
      profileImageSrc: imageFor(variant.image_key),
      profileText: renderTemplate(profileTemplate.profile_template, {
        Name: variant.name,
        He: _.capitalize(variant.he),
        he: variant.he,
        his: variant.his,
        him: variant.him
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