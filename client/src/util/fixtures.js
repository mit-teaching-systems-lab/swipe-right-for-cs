export const students = [{"profileName":"Carlos","profileImageKey":"HM2","profileImageSrc":"/static/media/HM2.096a53d9.jpg","profileKey":"jokester","profileText":"Carlos can always get the class cackling with his running commentary, but especially when he starts doing impersonations. Somehow he's able to do it in a way that everyone can laugh at it.","argumentTexts":["Computing is part of designing new products, not just technical ones.  This isn't just gadgets and apps either, there are even wearable computers now.","Learning CS can help you connect or build global communities that share your interests and passions.","There are real cultural and structural barriers that might make it hard to pursue computer science at the college level.  Getting started now in high school will be easier.","You'll have so many career opportunities - high income, job flexibility, lots of options."]},{"profileName":"Sonali","profileImageKey":"IF2","profileImageSrc":"/static/media/IF2.5db3b2ba.jpg","profileKey":"journalist","profileText":"Sonali hopes to apply for a journalism internship next summer and has been working hard at improving her writing all semester.","argumentTexts":["Computing is ubiquitous. Learning about computer science will help you understand the world around you.","It looks really good on your resume to take a computer science class, because it tells employers that you’re knowledgeable about a topic that’s really important. ","The world needs active and informed citizens of the world, and computer science is now necessary knowledge in order to actively participate in a democracy. ","Computer science creates so many new ways to express your creativity, whether it's generating images or videos,  creating interactive stories, or making new kinds of media altogether."]},{"profileName":"Raj","profileImageKey":"IM2","profileImageSrc":"/static/media/IM2.bb38a062.jpg","profileKey":"musician","profileText":"Raj isn't sure what he wants to do after high school yet, but right now he's really into working on his own music.","argumentTexts":["Computer science jobs are high-paying and high status, and can empower you to push back against current forms of oppression. ","Understanding how to use computing is an important skill for leaders in most every field.","There are real cultural and structural barriers that might make it hard to pursue computer science at the college level.  Getting started now in high school will be easier.","Computing is part of designing new products, not just technical ones.  This isn't just gadgets and apps either, there are even wearable computers now."]},{"profileName":"Gabriella","profileImageKey":"HF2","profileImageSrc":"/static/media/HF2.0834a65c.jpg","profileKey":"hardworker","profileText":"Gabriella is always studying and working diligently to be successful in her classes because she wants to be the first in her family to go to college.","argumentTexts":["Computer science jobs are high-paying and high status, and can empower you to push back against current forms of oppression. ","Understanding how to use computing is an important skill for leaders in most every field.","There are real cultural and structural barriers that might make it hard to pursue computer science at the college level.  Getting started now in high school will be easier.","Computing is part of designing new products, not just technical ones.  This isn't just gadgets and apps either, there are even wearable computers now."]},{"profileName":"Brad","profileImageKey":"WM2","profileImageSrc":"/static/media/WM2.060f94cd.jpg","profileKey":"maker","profileText":"Brad led a team of ten people through building a catapult for a project in shop class.","argumentTexts":["Computer science is pervasive in every field. No matter what you plan to do when you finish school, knowing something about computer science will help you be better at your job.","Computing is ubiquitous. Learning about computer science will help you understand the world around you.","Understanding how to use computing is an important skill for leaders in most every field.","People in the arts and architecture use design software all the time."]},{"profileName":"Meredith","profileImageKey":"WF2","profileImageSrc":"/static/media/WF2.8f6b0b4f.jpg","profileKey":"charismatic","profileText":"Meredith is incredibly good at reading people, connecting with adults and being persistent in working to convince them. She can really turn it on and put in some amazing work when she wants to.","argumentTexts":["Computer science creates so many new ways to express your creativity, whether it's generating images or videos,  creating interactive stories, or making new kinds of media altogether.","You'll have so many career opportunities - high income, job flexibility, lots of options.","The world needs active and informed citizens of the world, and computer science is now necessary knowledge in order to actively participate in a democracy. ","Learning CS can help you connect or build global communities that share your interests and passions."]},{"profileName":"Keisha","profileImageKey":"BF2","profileImageSrc":"/static/media/BF2.f8917305.jpg","profileKey":"trendsetter","profileText":"Keisha always makes sure she's looking her best when she comes to school, and all her friends look to her for help with what the latest trends are.","argumentTexts":["Learning CS can help you connect or build global communities that share your interests and passions.","Understanding how to use computing is an important skill for leaders in most every field.","The world needs active and informed citizens of the world, and computer science is now necessary knowledge in order to actively participate in a democracy. ","Computing is part of designing new products, not just technical ones.  This isn't just gadgets and apps either, there are even wearable computers now."]},{"profileName":"Lamar","profileImageKey":"BM2","profileImageSrc":"/static/media/BM2.47362e22.jpg","profileKey":"teammate","profileText":"Lamar is a great teammate on projects, always in the background helping other people out and moving the project forward.","argumentTexts":["Computer science is pervasive in every field. No matter what you plan to do when you finish school, knowing something about computer science will help you be better at your job.","Understanding how to use computing is an important skill for leaders in most every field.","Computing is ubiquitous. Learning about computer science will help you understand the world around you.","There are real cultural and structural barriers that might make it hard to pursue computer science at the college level.  Getting started now in high school will be easier."]},{"profileName":"Chang","profileImageKey":"CM2","profileImageSrc":"/static/media/CM2.f17af951.jpg","profileKey":"striver","profileText":"Chang rearranged his course schedule this year to have a chance to take AP courses in his senior year, and has been working hard to show teachers he'll be able to do the work.","argumentTexts":["Computing is ubiquitous. Learning about computer science will help you understand the world around you.","You can take AP computer science classes and get college credit before even going to college.  It'll save money on tuition when you're in college as well.","It looks really good on your resume to take a computer science class, because it tells employers that you’re knowledgeable about a topic that’s really important. ","Computer science jobs are high-paying and high status, and can empower you to push back against current forms of oppression. "]},{"profileName":"Mei","profileImageKey":"CF2","profileImageSrc":"/static/media/CF2.1ac12a06.jpg","profileKey":"captain","profileText":"Mei is excited about fall sports starting, and spending more time with her teammates. She's a natural leader on the team and helps make everyone better.","argumentTexts":["People in the arts and architecture use design software all the time.","There are real cultural and structural barriers that might make it hard to pursue computer science at the college level.  Getting started now in high school will be easier.","Understanding how to use computing is an important skill for leaders in most every field.","Computer science jobs are high-paying and high status, and can empower you to push back against current forms of oppression. "]}];

// Rewrite to fetch from dev server
export const storybookStudents = students.map(student => {
  return {
    ...student,
    profileImageSrc: `http://localhost:3000${student.profileImageSrc}`
  };
});


export const logs = [
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