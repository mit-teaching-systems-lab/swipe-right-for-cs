import __escape from 'lodash/escape';

// Evaluate a mustache-style template safely, in compliance with CSP
function renderTemplate(message, data) {
  return message.replace(/\{\{([^}]+)}}/g, function(s, match) {
    var result = data;
    match.trim().split('.').forEach((propertyName) => {
      result = result[propertyName];
    });
    return __escape(result);
  });
}

export default renderTemplate;