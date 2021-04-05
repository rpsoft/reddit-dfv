# %%
import praw

r = praw.Reddit(
    client_id="-6MWcVqm7_N36A",
    client_secret="sPhR9YCb6JNqYTVvEQLmWq1FA2GMCQ",
    password="Melacome86",
    user_agent="gmescript/1.0.0 (http://www.dcs.gla.ac.uk/~jesus/)",
    username="Kindly-Dust6626",
)



# %%

# cmts = list(r.redditor('DeepFuckingValue').comments.new(limit=None))

# comnts_to_store = list([])

# for comment in cmts: 
#     j = {k: v for k,v in comment.__dict__.items() if k != '_reddit'}
#     j['author'] = j['author'].name
#     j['subreddit'] = j['subreddit'].name
#     comnts_to_store.append(j)

# %%

overview = list(r.redditor("DeepFuckingValue").submissions.hot())

# %%

deleted_ones = 0

submissions_to_store = list([])

for subms in overview: 
    j = {k: v for k,v in subms.__dict__.items() if k != '_reddit'}
    j['author'] = j['author'].name
    j['subreddit'] = j['subreddit'].name

    submission_comments = list([])

    subms.comments.replace_more(limit=None)
    for comment in subms.comments.list(): 
        c = {k: v for k,v in comment.__dict__.items() if k != '_reddit'}
        try:
            
            cleanComment = {
                "body" : c['body'],
                "body_html" : c['body_html'],
                "subreddit" : c['subreddit'],
                "name" : c['name'],
                "author" : c['author'],
                "author_fullname" : c['author_fullname'],
                "parent_id" : c['parent_id'],
                "created" : c['created'],
                "created_utc" : c['created_utc'],
                "score" : c['score']
            }
            
            submission_comments.append(cleanComment)            
        except:            
            deleted_ones = deleted_ones +1
            print("An exception occurred")

    j['comments'] = submission_comments
    submissions_to_store.append(j)

# %%
# import json

# f = open('submissions_comments.json', 'w')

# json.dump(submissions_to_store, f )

# f.close()

# # %%
# print(str(submissions_to_store))

# # %%
# len(submissions_to_store[20]["comments"])

# %%
import pickle
 
pickle.dump( submissions_to_store, open( "deepfuckingvalue_scores.pickle", "wb" ) )


# %%

n = 0

for cmn in submissions_to_store[52]['comments']:
    print(cmn['body'])
    n = n +1

    if ( n > 20):
        break

# %%
len(submissions_to_store)
# %%
len(submissions_to_store[0]['comments'])
# %%

def showCounts(submissions_to_store):
    n = 0

    for subms in submissions_to_store:
        
        print(str(len(subms['comments'])) + " " + subms['title'])
    
showCounts(submissions_to_store)


# %%

print(submissions_to_store[0]['comments'][0])

# %%
submissions_to_store_old = pickle.load( open( "deepfuckingvalue.pickle", "rb" ) )
showCounts(submissions_to_store_old)
# ( submissions_to_store, open( "deepfuckingvalue.pickle", "wb" ) )
# %%
submissions_to_store = pickle.load( open( "deepfuckingvalue_scores.pickle", "rb" ) )
showCounts(submissions_to_store)

# %%
# deleted_ones

# %%

# pickle.dump( submissions_to_store_old, open( "deepfuckingvalue_scores_old.pickle", "wb" ) )



# %%
