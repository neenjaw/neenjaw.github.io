---
title: "Learning to deploy on Heroku"
description: and other things
layout: post
date: 2018-04-11
---

Finished and deployed a version of Shift Tracker to start testing, so I took today to get back into Colt Steele's Web Developer Bootcamp since I am about 94% of the way through it. Since I have completed the capstone project, Yelp Camp (see my repository at [Github](https://github.com/neenjaw/udemy-webdev-bootcamp/tree/master/s20-node-to-yelpcamp/yelp-camp/v11)), the course has turned towards deploying on hosting services -- [Heroku](https://heroku.com) specifically.

Heroku CLI Snippets (more for my memory, than your understanding)

```shell
> heroku                    #cli interface
> heroku create             #initialize a heroku app inside of a git repository
> git push heroku master    #push the latest commit to heroku
> heroku ps:scale web=1     #scale up the dynos assigned to the app
> heroku ps:scale web=0     #scale down the dynos assigned to the app
> heroku open               #open the heroku url in the browser, can specify the route as well
> heroku logs --tail        #open the log stream
> heroku local web          #start the local web host
```

So let's you get your hands dirty with it all pretty easily, and they support a whole bunch of platforms. Interesting topic as there are a whole bunch of these exact SaaS (server as a service) platforms (digital ocean, google cloud platform, amazon web services, firebase, heroku [duh], netlify).

---

I am quite happy with where Shift Tracker is going in the next few months, hopefully can get all the test data input then really start to make a difference in daily work flow patterns. Looking forward to presenting it at Dynamics (Critical Care Conference) from the perspective of how technology can offload critical decision making to facilitate better decisions and free up time for increased about of time spent on other priority tasks.

I think if I had more time/energy/man power I would really like to incorporate webpack/babel to be able to use ES6 syntax as I really am finding that being confined to ES5 syntax that it is an added layer of effort to do things that ES6 does really well (use of `let` and `const` for block-scope variables as opposed to just `var` for function-level scopeing; the `...` spread operator, use of arrow functions `() => {}`; assignment by deconstruction).
