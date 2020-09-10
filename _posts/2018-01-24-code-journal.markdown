---
layout: post
title: Code Journal
date: 2018-01-24 00:00:00 -0600
categories: coding
---

- Rebuild powershell env (touch and right click context menu shortcut)
- Remake Mongo db cmd shortcuts to start the service.
- Re-insert the yelpcamp data into the mongo db

## Commentary

1. Got the powershell working again, set the execution to Remotesigned so that I could create a local ‘touch’ alias
2. Right click powershell context menu is such a handy short cut, really makes it easy to open a window quickly
3. Got the mongo cmd files made up to start the server/client easily
4. Re-inserting the data into the database was actually pretty fun:
   a. I first created a json file with the contents of the database that I wanted to insert
   b. Then using python, used pymongo and bson libraries to read the file, convert it to an object compatible with mongo and then inserted it by connecting to the localhost

I haven’t really used python for anything ‘real’ per se, but it was interesting to see python in action and can totally see why it’s a popular language, it’s similar to perl in that way at least for smaller things.
