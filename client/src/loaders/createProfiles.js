import __zip from 'lodash/zip';
import __capitalize from 'lodash/capitalize';
import __shuffle from 'lodash/shuffle';
import __range from 'lodash/range';
import __compact from 'lodash/compact';

import renderTemplate from './renderTemplate.js';
import BF1 from '../files/BF1.png';
import BM1 from '../files/BM1.png';
import CF1 from '../files/CF1.png';
import CM1 from '../files/CM1.png';
import HF1 from '../files/HF1.png';
import HM1 from '../files/HM1.png';
import IF1 from '../files/IF1.png';
import IM1 from '../files/IM1.png';
import WF1 from '../files/WF1.png';
import WM1 from '../files/WM1.png';

export function imageFor(label) {
  return {
    BF1,
    BM1,
    CF1,
    CM1,
    HF1,
    HM1,
    IF1,
    IM1,
    WF1,
    WM1
  }[label.toUpperCase()];
}

// Take profile templates, and the set of manipulations and zip them together
// into concrete profiles for a game.
//
// Returns no students on input array length mismatch.
export function createProfiles(profileTemplates, variants, argumentCount) {
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