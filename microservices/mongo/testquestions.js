con = new Mongo();
db = con.getDB('underflow');
db.users.insert([
  {_id: '01',
      title: 'oof wow',
      body: 'this is a body',
      tags: ['a','b'],
      score: 10,
      answers: [],
      user: 'ngan',
      acceptedAnswer: null,
      timestamp: 113947020,
      media: ['01'],
      viewCount: 0,
      viewedIds: [],
      upvoteIds: [],
      downvoteIds: []
  },
  {_id: '02',
      title: 'oof',
      body: 'this is a wow body',
      tags: ['a','b'],
      score: 1,
      answers: [],
      user: 'ngan',
      acceptedAnswer: null,
      timestamp: 12375630.5,
      media: [],
      viewCount: 0,
      viewedIds: [],
      upvoteIds: [],
      downvoteIds: []
  },
  {_id: '03',
      title: 'oof wow wow',
      body: 'this is a body',
      tags: ['a','b'],
      score: 1,
      answers: [],
      user: 'ngan',
      acceptedAnswer: null,
      timestamp: 12375630.4,
      media: [],
      viewCount: 0,
      viewedIds: [],
      upvoteIds: [],
      downvoteIds: []
  },
  {_id: '04',
      title: 'oof',
      body: 'this is a wow wow body',
      tags: ['a','b'],
      score: 1,
      answers: [],
      user: 'ngan',
      acceptedAnswer: null,
      timestamp: 12375630.4,
      media: [],
      viewCount: 0,
      viewedIds: [],
      upvoteIds: [],
      downvoteIds: []
  },
  {_id: '05',
      title: 'oof',
      body: 'this is a body',
      tags: ['a','b', 'c'],
      score: 1,
      answers: [],
      user: 'ngan',
      acceptedAnswer: null,
      timestamp: 113947020,
      media: [],
      viewCount: 0,
      viewedIds: [],
      upvoteIds: [],
      downvoteIds: []
  },
  {_id: '06',
      title: 'oof',
      body: 'this is a body',
      tags: ['a','b'],
      score: 5,
      answers: [],
      user: 'ngan',
      acceptedAnswer: null,
      timestamp: 12375630.4,
      media: [],
      viewCount: 0,
      viewedIds: [],
      upvoteIds: [],
      downvoteIds: []
  }    
]);
