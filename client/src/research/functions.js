import {InteractionTypes, Session} from '../shared/data.js';
import __values from 'lodash/values';


//filter out testing and demo data
export function withoutDemoInteractions(interactions) {
  return interactions.filter(row => {  
    const {session} = row;
    const workshopCode = Session.workshopCode(session);
    const identifier = Session.identifier(session);
    if (!isCodeOrgWorkshop(workshopCode)) return false;
    if (!isCodeOrgIdentifier(identifier)) return false;
    return true;
  });
}

export function isCodeOrgWorkshop(workshopCode) {
  if (workshopCode === 'foo') return false;
  if (workshopCode === 'demo') return false;
  if (workshopCode === 'code.org') return false;
  if (workshopCode.indexOf('DEMO') === 0) return false;
  return true;
}

export function isCodeOrgIdentifier(identifier) {
  if (Session.isBlankIdentifier(identifier)) return false;
  if (Session.isUnknownIdentifier(identifier)) return false;
  if (Session.isDeveloperIdentifier(identifier)) return false;
  return true;
}

// Returns map of {identifier -> boolean}
// If they haven't consented ever, consider them to have declined
// If they ever at any point they ever declined (even if it was after
// they initially consented), consider any of their data to be unconsented.
export function didConsentMap(interactions) {
  return interactions.reduce((consentMap, row) => {
    const {session} = row;
    const identifier = Session.identifier(session);
    if (!isCodeOrgIdentifier(identifier)) return consentMap;

    // Set consent only if they consented and never declined ever.
    const interactionType = row.interaction.type;
    if (interactionType === InteractionTypes.GAVE_CONSENT && consentMap[identifier] !== false) {
      consentMap[identifier] = true;
    }
    if (interactionType === InteractionTypes.DECLINED_CONSENT) {
      consentMap[identifier] = false;
    }
    if (consentMap[identifier] === undefined) {
      consentMap[identifier] = null;
    }

    return consentMap;
  }, {});
}

// Return the consent rate by identifier within a set of interactions
export function consentRateFor(interactions) {
  const consentMap = didConsentMap(interactions);
  const consentValues = __values(consentMap);
  return consentValues.reduce((sum, n) => sum + (n ? 1 : 0)) / consentValues.length;
}

export function onlyConsentedInteractions(interactions) {
  const consentMap = didConsentMap(interactions);
  return interactions.filter(row => {
    const {session} = row;
    const identifier = Session.identifier(session);
    if (Session.isBlankIdentifier(identifier)) return false;
    if (Session.isUnknownIdentifier(identifier)) return false;
    return consentMap[identifier];
  });
}

export function isSwipe(row) {
  const type = row.interaction.type;
  return (type === InteractionTypes.SWIPE_RIGHT || type === InteractionTypes.SWIPE_LEFT);
}

export function formatPercent(percent) {
  return Math.round(percent * 100) + '%';
}
