const Reddit = require('reddit')
var fs = require('fs');


const reddit = new Reddit({
  username: 'Kindly-Dust6626',
  password: 'Melacome86',
  appId: '-6MWcVqm7_N36A',
  appSecret: 'sPhR9YCb6JNqYTVvEQLmWq1FA2GMCQ',
  userAgent: 'gmescript/1.0.0 (http://www.dcs.gla.ac.uk/~jesus/)'
})

const getAllPostsForUser = async (user)  => {

     const getPosts = async (user, after) => {

       var options = {limit:100}

       if ( after && after.length > 0 ){
         options["after"] = after
       }

       const res = await reddit.get(user, options)

       return res.data.children
     }

     var posts = []

     var after = ""

     do {
       var currentPosts = await getPosts('/user/'+user+'/comments', after)

       if ( currentPosts.length > 0 ){
         after = currentPosts[ currentPosts.length -1 ].data.name
         console.log(after)
       }

       posts.push(currentPosts)
     } while (currentPosts.length > 0);


     posts = posts.flat()


     return posts;
}



async function main (){

    // var posts = await getAllPostsForUser('DeepFuckingValue');
    // console.log("total:" + posts.length)

    // const res = await reddit.get('/api/search_reddit_names', {
    //      exact: true,
    //      include_over_18: true,
    //      include_unadvertisable: true ,
    //      query	: "GME",
    // })



    // Submit a link to the /r/BitMidi subreddit
    // const res = await reddit.post('/api/submit', {
    //   sr: 'WeAreTheMusicMakers',
    //   kind: 'link',
    //   resubmit: true,
    //   title: 'BitMidi – 100K+ Free MIDI files',
    //   url: 'https://bitmidi.com'
    // })

   //
   // const res = await reddit.get('/api/search_reddit_names', {
   //      exact: true,
   //      include_over_18: true,
   //      include_unadvertisable: true ,
   //      query	: "GME",
   // })



    var res = await reddit.get('/api/v1/collections/subreddit_collections', {
      sr_fullname : "t5_2u6vg"
    })

    // const res = await reddit.get('/r/GME/api/info', {
    //   url : "https://www.reddit.com/r/wallstreetbets/comments/kr7s30/gme_yolo_update_jan_5_2021/"
    // })

    // const res = await reddit.get('kr7s30/comments/article', {limit:20})
    //



    // //
    res = await reddit.get('/api/v1/collections/collection', {
      collection_id : res[0].collection_id
    })

    // for (l in res.link_ids) {
    //
    //   // debugger
    res = await reddit.get('/by_id/'+res.link_ids.join(","), {})

    //     // /comments/article
    //     // [/r/subreddit]/api/info
    //
    //     break;
    // }

    console.log(JSON.stringify(res))

    //
    //
    // fs.writeFile("DeepFuckingValue.json", JSON.stringify(posts), function(err) {
    //     if (err) {
    //         console.log(err);
    //     }
    // });



    // res.data.children.map( post => {
    //   var utcSeconds = post.data.created;
    //   var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    //   d.setUTCSeconds(utcSeconds);
    //
    //   console.log( d.toString()+" -- "+post.data.link_author+" -- "+ post.data.body_html )
    //
    // })

}

main()
