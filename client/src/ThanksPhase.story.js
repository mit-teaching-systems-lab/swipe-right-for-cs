import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import ThanksPhase from './ThanksPhase.js';

const logs = [
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213957743,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "type": "INTRO_PLAY:F+SCM4ixUqV93ZCFA0sLwrfaNUEOA2NaJrTBdIIFP64="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213959085,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "type": "DECLINED_CONSENT:96D+jgR6SglT5cPrdtiLk9oY2FScLr5eMFTwBpISylU="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213960076,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "type": "INTRO_PLAY:F+SCM4ixUqV93ZCFA0sLwrfaNUEOA2NaJrTBdIIFP64="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213973094,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "trendsetter",
        "profileName": "Mei",
        "profileText": "Mei always makes sure she's looking her best when she comes to school, and all her friends look to her for help with what the latest trends are.",
        "profileImageSrc": "/static/media/CF2.76e196fe.png",
        "argumentText": "You'll have so many career opportunities - high income, job flexibility, lots of options."
      },
      "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213973528,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "trendsetter",
        "profileName": "Mei",
        "profileText": "Mei always makes sure she's looking her best when she comes to school, and all her friends look to her for help with what the latest trends are.",
        "profileImageSrc": "/static/media/CF2.76e196fe.png",
        "argumentText": "There are even a lot of artists now that use CS to create their work (composition, 3D modeling, design)."
      },
      "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213973960,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "trendsetter",
        "profileName": "Mei",
        "profileText": "Mei always makes sure she's looking her best when she comes to school, and all her friends look to her for help with what the latest trends are.",
        "profileImageSrc": "/static/media/CF2.76e196fe.png",
        "argumentText": "You might be surprised to know only half of computing jobs are in high tech companies! You could mash up your interests in other careers with technology and work anywhere"
      },
      "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213974510,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "trendsetter",
        "profileName": "Mei",
        "profileText": "Mei always makes sure she's looking her best when she comes to school, and all her friends look to her for help with what the latest trends are.",
        "profileImageSrc": "/static/media/CF2.76e196fe.png",
        "argumentText": "Lots of people work to keep computers safe from hackers. People also use computers to solve crimes. "
      },
      "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213975111,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "choices": [
        "They're in",
        "They need one more nudge",
        "I didn't get there yet"
      ],
      "choiceIndex": 0,
      "choiceText": "They're in",
      "student": {
        "profileName": "Mei",
        "profileKey": "trendsetter",
        "profileText": "Mei always makes sure she's looking her best when she comes to school, and all her friends look to her for help with what the latest trends are.",
        "profileImageSrc": "/static/media/CF2.76e196fe.png"
      },
      "type": "STUDENT_RATING:sDNl+SwNNhRcIrujNQtiS0mIX+xHDgVwT44X5EHCeNs="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213976278,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "musician",
        "profileName": "Carlos",
        "profileText": "Carlos isn't sure what he wants to do after high school yet, but at the moment he's really into playing music.",
        "profileImageSrc": "/static/media/HM2.c1ae9a1e.png",
        "argumentText": "Knowing the basics of CS can help you find ways to work more efficiently, even if you’re not working directly in CS. You can use your CS skills to do your job quicker and better."
      },
      "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213976728,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "musician",
        "profileName": "Carlos",
        "profileText": "Carlos isn't sure what he wants to do after high school yet, but at the moment he's really into playing music.",
        "profileImageSrc": "/static/media/HM2.c1ae9a1e.png",
        "argumentText": "You'll have so many career opportunities - high income, job flexibility, lots of options."
      },
      "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213977162,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "musician",
        "profileName": "Carlos",
        "profileText": "Carlos isn't sure what he wants to do after high school yet, but at the moment he's really into playing music.",
        "profileImageSrc": "/static/media/HM2.c1ae9a1e.png",
        "argumentText": "Computing is a big part of visualization and imagery. You’ve seen computer-generated graphics in movies and video games. It’s useful in science, too, to picture a problem or process."
      },
      "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213978661,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "musician",
        "profileName": "Carlos",
        "profileText": "Carlos isn't sure what he wants to do after high school yet, but at the moment he's really into playing music.",
        "profileImageSrc": "/static/media/HM2.c1ae9a1e.png",
        "argumentText": "You might be surprised to know only half of computing jobs are in high tech companies! You could mash up your interests in other careers with technology and work anywhere"
      },
      "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213979341,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "choices": [
        "They're in",
        "They need one more nudge",
        "I didn't get there yet"
      ],
      "choiceIndex": 0,
      "choiceText": "They're in",
      "student": {
        "profileName": "Carlos",
        "profileKey": "musician",
        "profileText": "Carlos isn't sure what he wants to do after high school yet, but at the moment he's really into playing music.",
        "profileImageSrc": "/static/media/HM2.c1ae9a1e.png"
      },
      "type": "STUDENT_RATING:sDNl+SwNNhRcIrujNQtiS0mIX+xHDgVwT44X5EHCeNs="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213980794,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "teammate",
        "profileName": "Raj",
        "profileText": "Raj is a great teammate on projects, always in the background helping other people out and moving the project forward.",
        "profileImageSrc": "/static/media/IM2.22cd0c72.png",
        "argumentText": "You might be surprised to know only half of computing jobs are in high tech companies! You could mash up your interests in other careers with technology and work anywhere"
      },
      "type": "SWIPE_LEFT:a3n0/aAfASRmbKZTpULy8BE9F8fCjsWoczycNGdwf5M="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213981312,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "teammate",
        "profileName": "Raj",
        "profileText": "Raj is a great teammate on projects, always in the background helping other people out and moving the project forward.",
        "profileImageSrc": "/static/media/IM2.22cd0c72.png",
        "argumentText": "Lots of people work to keep computers safe from hackers. People also use computers to solve crimes. "
      },
      "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213981812,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "teammate",
        "profileName": "Raj",
        "profileText": "Raj is a great teammate on projects, always in the background helping other people out and moving the project forward.",
        "profileImageSrc": "/static/media/IM2.22cd0c72.png",
        "argumentText": "Knowing the basics of CS can help you find ways to work more efficiently, even if you’re not working directly in CS. You can use your CS skills to do your job quicker and better."
      },
      "type": "SWIPE_LEFT:a3n0/aAfASRmbKZTpULy8BE9F8fCjsWoczycNGdwf5M="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213982361,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "teammate",
        "profileName": "Raj",
        "profileText": "Raj is a great teammate on projects, always in the background helping other people out and moving the project forward.",
        "profileImageSrc": "/static/media/IM2.22cd0c72.png",
        "argumentText": "You can take AP computer science classes and get college credit before even going to college.  It'll save money on tuition when you're in college as well."
      },
      "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213982807,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "choices": [
        "They're in",
        "They need one more nudge",
        "I didn't get there yet"
      ],
      "choiceIndex": 1,
      "choiceText": "They need one more nudge",
      "student": {
        "profileName": "Raj",
        "profileKey": "teammate",
        "profileText": "Raj is a great teammate on projects, always in the background helping other people out and moving the project forward.",
        "profileImageSrc": "/static/media/IM2.22cd0c72.png"
      },
      "type": "STUDENT_RATING:sDNl+SwNNhRcIrujNQtiS0mIX+xHDgVwT44X5EHCeNs="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213983994,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "striver",
        "profileName": "Brad",
        "profileText": "Brad rearranged his course schedule this year to have a chance to take AP courses in his senior year, and has been working hard to show teachers he'll be able to do the work.",
        "profileImageSrc": "/static/media/WM2.2a46364c.png",
        "argumentText": "You can take AP computer science classes and get college credit before even going to college.  It'll save money on tuition when you're in college as well."
      },
      "type": "SWIPE_LEFT:a3n0/aAfASRmbKZTpULy8BE9F8fCjsWoczycNGdwf5M="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213984428,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "striver",
        "profileName": "Brad",
        "profileText": "Brad rearranged his course schedule this year to have a chance to take AP courses in his senior year, and has been working hard to show teachers he'll be able to do the work.",
        "profileImageSrc": "/static/media/WM2.2a46364c.png",
        "argumentText": "Since computing can be an applied science, it underpins innovations across whole fields. If you were interested in medicine for example, you could be part of a new innovation in health care."
      },
      "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213984911,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "striver",
        "profileName": "Brad",
        "profileText": "Brad rearranged his course schedule this year to have a chance to take AP courses in his senior year, and has been working hard to show teachers he'll be able to do the work.",
        "profileImageSrc": "/static/media/WM2.2a46364c.png",
        "argumentText": "Learning CS can help you connect or build global communities that share your interests and passions."
      },
      "type": "SWIPE_LEFT:a3n0/aAfASRmbKZTpULy8BE9F8fCjsWoczycNGdwf5M="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213985428,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "striver",
        "profileName": "Brad",
        "profileText": "Brad rearranged his course schedule this year to have a chance to take AP courses in his senior year, and has been working hard to show teachers he'll be able to do the work.",
        "profileImageSrc": "/static/media/WM2.2a46364c.png",
        "argumentText": "Computer science jobs are high-paying and high status, and can empower you to push back against current forms of oppression. "
      },
      "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213986262,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "choices": [
        "They're in",
        "They need one more nudge",
        "I didn't get there yet"
      ],
      "choiceIndex": 2,
      "choiceText": "I didn't get there yet",
      "student": {
        "profileName": "Brad",
        "profileKey": "striver",
        "profileText": "Brad rearranged his course schedule this year to have a chance to take AP courses in his senior year, and has been working hard to show teachers he'll be able to do the work.",
        "profileImageSrc": "/static/media/WM2.2a46364c.png"
      },
      "type": "STUDENT_RATING:sDNl+SwNNhRcIrujNQtiS0mIX+xHDgVwT44X5EHCeNs="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213987628,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "jokester",
        "profileName": "Chang",
        "profileText": "Chang can always get the class cackling with his running commentary, but especially when he starts doing impersonations. Somehow he's able to do it in a way that everyone can laugh at it.",
        "profileImageSrc": "/static/media/CM2.19bd7e6f.png",
        "argumentText": "Computer science creates so many new ways to express your creativity, whether it's generating images or videos,  creating interactive stories, or making new kinds of media altogether."
      },
      "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213988430,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "jokester",
        "profileName": "Chang",
        "profileText": "Chang can always get the class cackling with his running commentary, but especially when he starts doing impersonations. Somehow he's able to do it in a way that everyone can laugh at it.",
        "profileImageSrc": "/static/media/CM2.19bd7e6f.png",
        "argumentText": "There are even a lot of artists now that use CS to create their work (composition, 3D modeling, design)."
      },
      "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213988962,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "jokester",
        "profileName": "Chang",
        "profileText": "Chang can always get the class cackling with his running commentary, but especially when he starts doing impersonations. Somehow he's able to do it in a way that everyone can laugh at it.",
        "profileImageSrc": "/static/media/CM2.19bd7e6f.png",
        "argumentText": "Computer science is pervasive in every field. No matter what you plan to do when you finish school, knowing something about computer science will help you be better at your job."
      },
      "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213989529,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "turn": {
        "profileKey": "jokester",
        "profileName": "Chang",
        "profileText": "Chang can always get the class cackling with his running commentary, but especially when he starts doing impersonations. Somehow he's able to do it in a way that everyone can laugh at it.",
        "profileImageSrc": "/static/media/CM2.19bd7e6f.png",
        "argumentText": "Since computing can be an applied science, it underpins innovations across whole fields. If you were interested in medicine for example, you could be part of a new innovation in health care."
      },
      "type": "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213990171,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "choices": [
        "They're in",
        "They need one more nudge",
        "I didn't get there yet"
      ],
      "choiceIndex": 0,
      "choiceText": "They're in",
      "student": {
        "profileName": "Chang",
        "profileKey": "jokester",
        "profileText": "Chang can always get the class cackling with his running commentary, but especially when he starts doing impersonations. Somehow he's able to do it in a way that everyone can laugh at it.",
        "profileImageSrc": "/static/media/CM2.19bd7e6f.png"
      },
      "type": "STUDENT_RATING:sDNl+SwNNhRcIrujNQtiS0mIX+xHDgVwT44X5EHCeNs="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508213995379,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "type": "DONE_DISCUSS_PHASE:OQGgrwTHfwd0M+ZTrA6/otXv3r+wPC0xSLgcXZAbIEY="
    }
  },
  {
    "session": {
      "email": "foo@mit.edu",
      "workshopCode": "foo",
      "cohortNumber": 0,
      "sessionId": "4169a069-3d27-4729-8cdf-c5856847b598",
      "clientTimestampMs": 1508214009315,
      "location": "http://localhost:3000/start?email=foo@mit.edu"
    },
    "interaction": {
      "type": "DONE_REVIEW_PHASE:osON8ijo/c3R2tL9Q4UF7WWUMklpbHLoDi9qZXdGswU="
    }
  }
];
// const moves = [
//   {
//     "profileName": "Meredith",
//     "profileText": "Meredith is always studying and working diligently to be successful in her classes because she wants to be the first in her family to go to college.",
//     "argumentText": "It looks really good on your resume to take a computer science class, because it tells employers that you’re knowledgeable about a topic that’s really important. ",
//     "isRight": true
//   },
//   {
//     "profileName": "Meredith",
//     "profileText": "Meredith is always studying and working diligently to be successful in her classes because she wants to be the first in her family to go to college.",
//     "argumentText": "Computer science jobs are high-paying and high status, and can empower you to push back against current forms of oppression. ",
//     "isRight": false
//   },
//   {
//     "profileName": "Meredith",
//     "profileText": "Meredith is always studying and working diligently to be successful in her classes because she wants to be the first in her family to go to college.",
//     "argumentText": "Computing is part of designing new products, not just technical ones.  This isn't just gadgets and apps either, there are even wearable computers now.",
//     "isRight": true
//   },
//   {
//     "profileName": "Meredith",
//     "profileText": "Meredith is always studying and working diligently to be successful in her classes because she wants to be the first in her family to go to college.",
//     "argumentText": "Computing is ubiquitous. Learning about computer science will help you understand the world around you.",
//     "isRight": true
//   },
//   {
//     "profileName": "Mei",
//     "profileText": "Mei led a team of ten people through building a catapult for a project in shop class.",
//     "argumentText": "Computing is a big part of visualization and imagery. You’ve seen computer-generated graphics in movies and video games. It’s useful in science, too, to picture a problem or process.",
//     "isRight": true
//   },
//   {
//     "profileName": "Mei",
//     "profileText": "Mei led a team of ten people through building a catapult for a project in shop class.",
//     "argumentText": "Computing is ubiquitous. Learning about computer science will help you understand the world around you.",
//     "isRight": false
//   },
//   {
//     "profileName": "Mei",
//     "profileText": "Mei led a team of ten people through building a catapult for a project in shop class.",
//     "argumentText": "You can take AP computer science classes and get college credit before even going to college.  It'll save money on tuition when you're in college as well.",
//     "isRight": true
//   },
//   {
//     "profileName": "Mei",
//     "profileText": "Mei led a team of ten people through building a catapult for a project in shop class.",
//     "argumentText": "Computing connects people to businesses and to information and to each other too.",
//     "isRight": true
//   },
//   {
//     "profileName": "Chang",
//     "profileText": "Chang is at the top of his class in math, but is much more interested in literature, especially if it's historical fiction.",
//     "argumentText": "You'll have so many career opportunities - high income, job flexibility, lots of options.",
//     "isRight": true
//   },
//   {
//     "profileName": "Chang",
//     "profileText": "Chang is at the top of his class in math, but is much more interested in literature, especially if it's historical fiction.",
//     "argumentText": "Learning CS can help you connect or build global communities that share your interests and passions.",
//     "isRight": true
//   },
//   {
//     "profileName": "Chang",
//     "profileText": "Chang is at the top of his class in math, but is much more interested in literature, especially if it's historical fiction.",
//     "argumentText": "It looks really good on your resume to take a computer science class, because it tells employers that you’re knowledgeable about a topic that’s really important. ",
//     "isRight": true
//   },
//   {
//     "profileName": "Chang",
//     "profileText": "Chang is at the top of his class in math, but is much more interested in literature, especially if it's historical fiction.",
//     "argumentText": "People in the arts and architecture rely on design software all the time.",
//     "isRight": true
//   },
//   {
//     "profileName": "Gabriella",
//     "profileText": "Gabriella spent the entire summer camping and hiking through various terrains. She became particularly fond of beaches and returned as an expert on tidal pools, crabs, and sand dollars.",
//     "argumentText": "Since computing can be an applied science, it underpins innovations across whole fields. If you were interested in medicine for example, you could be part of a new innovation in health care.",
//     "isRight": true
//   },
//   {
//     "profileName": "Gabriella",
//     "profileText": "Gabriella spent the entire summer camping and hiking through various terrains. She became particularly fond of beaches and returned as an expert on tidal pools, crabs, and sand dollars.",
//     "argumentText": "Computer science is pervasive in every field. No matter what you plan to do when you finish school, knowing something about computer science will help you be better at your job.",
//     "isRight": true
//   },
//   {
//     "profileName": "Gabriella",
//     "profileText": "Gabriella spent the entire summer camping and hiking through various terrains. She became particularly fond of beaches and returned as an expert on tidal pools, crabs, and sand dollars.",
//     "argumentText": "Understanding computer science will help you understand and be engaged in some of the major ethical and civic issues of our time.",
//     "isRight": true
//   },
//   {
//     "profileName": "Gabriella",
//     "profileText": "Gabriella spent the entire summer camping and hiking through various terrains. She became particularly fond of beaches and returned as an expert on tidal pools, crabs, and sand dollars.",
//     "argumentText": "Computing is ubiquitous. Learning about computer science will help you understand the world around you.",
//     "isRight": true
//   },
//   {
//     "profileName": "Raj",
//     "profileText": "Raj is a great teammate on projects, always in the background helping other people out and moving the project forward.",
//     "argumentText": "You might be surprised to know only half of computing jobs are in high tech companies! You could mash up your interests in other careers with technology and work anywhere",
//     "isRight": true
//   },
//   {
//     "profileName": "Raj",
//     "profileText": "Raj is a great teammate on projects, always in the background helping other people out and moving the project forward.",
//     "argumentText": "Computing is ubiquitous. Learning about computer science will help you understand the world around you.",
//     "isRight": true
//   },
//   {
//     "profileName": "Raj",
//     "profileText": "Raj is a great teammate on projects, always in the background helping other people out and moving the project forward.",
//     "argumentText": "Knowing the basics of CS can help you find ways to work more efficiently, even if you’re not working directly in CS. You can use your CS skills to do your job quicker and better.",
//     "isRight": true
//   },
//   {
//     "profileName": "Raj",
//     "profileText": "Raj is a great teammate on projects, always in the background helping other people out and moving the project forward.",
//     "argumentText": "You can take AP computer science classes and get college credit before even going to college.  It'll save money on tuition when you're in college as well.",
//     "isRight": false
//   }
// ];
storiesOf('ThanksPhase', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(
      <ThanksPhase
        email="kevin.robinson.0@gmail.com"
        logs={logs}
        onInteraction={action('onInteraction')} />
    );
  });