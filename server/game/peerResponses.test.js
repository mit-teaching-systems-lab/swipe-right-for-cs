const {groupPeerResponses} = require('./peerResponses.js');

const rows = [
  {
    "profile_name": "Meredith",
    "argument_text": "You might be surprised to know only half of computing jobs are in high tech companies! You could mash up your interests in other careers with technology and work anywhere",
    "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
  },
  {
    "profile_name": "Meredith",
    "argument_text": "Computer science creates so many new ways to express your creativity, whether it's generating images or videos,  creating interactive stories, or making new kinds of media altogether.",
    "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
  },
  {
    "profile_name": "Meredith",
    "argument_text": "Computer science creates so many new ways to express your creativity, whether it's generating images or videos,  creating interactive stories, or making new kinds of media altogether.",
    "type": "SWIPE_LEFT:a3n0/aAfASRmbKZTpULy8BE9F8fCjsWoczycNGdwf5M="
  },
  {
    "profile_name": "Gabriella",
    "argument_text": "You can take AP computer science classes and get college credit before even going to college.  It'll save money on tuition when you're in college as well.",
    "type": "SWIPE_LEFT:a3n0/aAfASRmbKZTpULy8BE9F8fCjsWoczycNGdwf5M="
  }
];

describe('groupPeerResponses', () => {
  it('groups responses correctly', () => {
    expect(groupPeerResponses(rows)).toEqual([{
      "profileName": "Meredith",
      "argumentText": "You might be surprised to know only half of computing jobs are in high tech companies! You could mash up your interests in other careers with technology and work anywhere",
      "percentageRight": 100
    },
    {
      "profileName": "Meredith",
      "argumentText": "Computer science creates so many new ways to express your creativity, whether it's generating images or videos,  creating interactive stories, or making new kinds of media altogether.",
      "percentageRight": 50
    },
    {
      "profileName": "Gabriella",
      "argumentText": "You can take AP computer science classes and get college credit before even going to college.  It'll save money on tuition when you're in college as well.",
      "percentageRight": 0
    }]);
  });
});