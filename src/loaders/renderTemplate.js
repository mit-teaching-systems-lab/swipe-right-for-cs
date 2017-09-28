import _ from 'lodash';

// Evaluate a mustache-style template safely, in compliance with CSP
function renderTemplate(message, data) {
  return message.replace(/\{\{([^}]+)}}/g, function(s, match) {
    var result = data;
    _.each(match.trim().split('.'), function(propertyName) {
      result = result[propertyName];
    });
    return _.escape(result);
  });
}

export default renderTemplate;