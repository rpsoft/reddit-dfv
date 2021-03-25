// import snoowrap from 'snoowrap';
const snoowrap = require('snoowrap')
// username: 'Kindly-Dust6626',
// password: ,
// appId: '-6MWcVqm7_N36A',
// appSecret: 'sPhR9YCb6JNqYTVvEQLmWq1FA2GMCQ',
// userAgent: 'gmescript/1.0.0 (http://www.dcs.gla.ac.uk/~jesus/)'

async function scrapeSubreddit() {
  const r = new snoowrap({
    userAgent: 'gmescript/1.0.0 (http://www.dcs.gla.ac.uk/~jesus/)',
    clientId: '-6MWcVqm7_N36A',
    clientSecret: 'sPhR9YCb6JNqYTVvEQLmWq1FA2GMCQ',
    username: 'Kindly-Dust6626',
    password: 'Melacome86',
  });

  const subreddit = await r.getSubreddit('gme');
  const topPosts = await subreddit.getTop({time: 'week', limit: 5});

  debugger
  let data = [];

  topPosts.forEach((post) => {
    debugger
    data.push({
      link: post.url,
      text: post.title,
      score: post.score
    })
  });

  console.log(data);
};

scrapeSubreddit()
