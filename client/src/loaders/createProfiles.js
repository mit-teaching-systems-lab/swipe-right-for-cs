import __zip from 'lodash/zip';
import __capitalize from 'lodash/capitalize';
import __shuffle from 'lodash/shuffle';
import __range from 'lodash/range';
import __compact from 'lodash/compact';

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
function createProfiles(profileTemplates, variants, argumentCount) {
  if (profileTemplates.length !== variants.length) return [];

  return __zip(profileTemplates, variants).map(([profileTemplate, variant]) => {
    const argumentTexts = __shuffle(argumentTextsFor(profileTemplate)).slice(0, argumentCount);
    return {
      profileName: variant.name,
      profileImageKey: variant.image_key,
      profileImageSrc: imageFor(variant.image_key),
      profileKey: profileTemplate.profile_key,
      profileText: renderTemplate(profileTemplate.profile_template, {
        Name: variant.name,
        He: __capitalize(variant.he),
        he: variant.he,
        his: variant.his,
        him: variant.him
      }),
      argumentTexts
    };
  });
}

function argumentTextsFor(profileTemplate) {
  const keys = __range(1, 20).map(i => `argument_${i}`);
  return __compact(keys.map(key => profileTemplate[key]));
}

export default createProfiles;