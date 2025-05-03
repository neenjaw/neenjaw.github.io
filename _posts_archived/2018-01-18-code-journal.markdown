---
layout: post
title: "Code Journal"
date: 2018-01-18 00:00:00 -0600
categories: coding
---

- Work through Wes Bos’s flexbox guide (currently video 13/20 or so)
- start lecture 255 (web developer bootcamp)
- get mongo db running (previously installed)
- mongod batch file
- Mongo -- needs to run from cmd +/- administrator priv
- learn the basic commands:
- Use
- use _db_
- Insert
- db._collection_path_.insert({k:v})
- Find
- db._collection_path_.find()
- Update

```javascript
db._collection_path_
  .update({
      name: "Lulu"
    },
    {
      $set[a]: {
        name: "Tater"
      }
    }
  )

db._collection_path_.remove({match criteria})[.limit(n)]
```

## Commentary

Shoulda started this journal up a couple months ago when I decided that it would be my goal to re-acquaint myself with computer science principles, practices and coding exercises. Up to now, my progress is really only marked by: my github contributions graph, the seemingly exponential increase in my firefox bookmarks, the books I have bought/downloaded/read, and the udemy/Wes Bos classes I am participating.

I will touch on my intentions with this later, but overall it has been nice to see purpose in all the schooling I did for my first degree.

---

Mongo db is interesting stuff. I can see why very popular in the js world just because of the similiarities to JSON. If I hadn’t played with firebase and angular, I think it’d be a lot more disorienting to use a relative un opinionated database.

Flexbox stuff is very interesting, as I can see how it could be used especially when used to display collections of data. I think I’ll really like CSS grid when I get to it, because like bootstrap 4, it produces an effect, but it still feels like a hack and like I am cheating to manipulate the display by manipulating the markup.

I wish I still had my old old old website from grade school when I made a warcraft/starcraft fan site just because of how hacked it felt to use tables to display everything. How ancient that feels from what I am now able to accomplish with HTML5/CSS3/JS/NODE.
