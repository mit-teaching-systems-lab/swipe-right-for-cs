import __zip from 'lodash/zip';
import __capitalize from 'lodash/capitalize';
import __shuffle from 'lodash/shuffle';
import __range from 'lodash/range';
import __compact from 'lodash/compact';

import renderTemplate from './renderTemplate.js';
import BF2 from '../files/BF2.png';
import BM2 from '../files/BM2.png';
import CF2 from '../files/CF2.png';
import CM2 from '../files/CM2.png';
import HF2 from '../files/HF2.png';
import HM2 from '../files/HM2.png';
import IF2 from '../files/IF2.png';
import IM2 from '../files/IM2.png';
import WF2 from '../files/WF2.png';
import WM2 from '../files/WM2.png';

export function imageFor(label) {
  return {
    BF2,
    BM2,
    CF2,
    CM2,
    HF2,
    HM2,
    IF2,
    IM2,
    WF2,
    WM2
  }[label.toUpperCase()];
}

// Take profile templates, and the set of manipulations and zip them together
// into concrete profiles for a game.
//
// Returns no students on input array length mismatch.
export function createProfiles(profileTemplates, variants, argumentCount) {
  if (profileTemplates.length !== variants.length) {
    console.warn(`createProfiles called with ${profileTemplates.length} profiles and ${variants.length} variants`); //eslint-disable-line no-console
    return [];
  }

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