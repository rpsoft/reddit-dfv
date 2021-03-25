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

    // var res = await reddit.get('/api/v1/collections/subreddit_collections', {
    //   sr_fullname : "t5_2u6vg"
    // })
    //
    // res = await reddit.get('/api/v1/collections/collection', {
    //   collection_id : res[0].collection_id
    // })
    //
    // res = await reddit.get('/by_id/'+res.link_ids.join(","), {})


// [/r/subreddit]/comments/article
    const res = await reddit.get('/comments/article', {article:"t3_l2mawk"})

    console.log(JSON.stringify(res))

    //
    //
    // fs.writeFile("DeepFuckingValue.json", JSON.stringify(posts), function(err) {
    //     if (err) {
    //         console.log(err);
    //     }
    // });
}

main()
