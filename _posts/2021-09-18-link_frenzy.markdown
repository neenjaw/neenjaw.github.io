---
layout: post
title: Fall Link Roundup
date: 2021-09-18 10:55:01 -0600
categories: links review roundup programming development
---

Summer has come and gone, the fall routine is here. Over the last few months I have read some really cool articles/posts, and I thought I'd post a selection of them here with a short thought about each.

## Programming

### Clojure

- [A gentle intro to Clojure](https://towardsdatascience.com/a-gentle-intro-to-clojure-ad6c6802babe)
  > I am a sucker for functional languages, but I haven't gotten as familiar with clojure and I would like some days. This is an interesting read with a cool application to the Github API.
- [Clojure for the brave and true](https://www.braveclojure.com/clojure-for-the-brave-and-true/)
  > Have only skimmed the TOC, but looks very very cool

### Elixir

- [Authentication and Authorisation in Phoenix Liveview](https://www.leanpanda.com/blog/authentication-and-authorisation-in-phoenix-liveview/)
  > Good overview of this problem: Phoenix Liveview is driven by channels (websockets) which don't innately associate with phoenix's session state. With the introduction of `phx_gen_auth` this has been simplified -- cool overview!
- [Learning Elixir's GenServer with a real-world example](https://papercups.io/blog/genserver)
  > Nice overview of the almighty GenServer
- [Practical Concurrency Cookbook](https://functional.works-hub.com/learn/elixir-practical-concurrency-3794f?utm_source=reddit&utm_medium=affiliates&utm_campaign=functionalworks-blog-post)
  > Some good examples of common use-cases
- [How does Plug.Cowboy Work](https://www.charta.dev/tours/plug_cowboy)
  > Cool overview of `Plug.Cowboy`
- [Securing Webhook Payload Delivery in Phoenix](https://elixirfocus.com/posts/securing-webhook-payload-delivery-in-phoenix/)
  > Good overview of concerns with some good examples
- [Using Phoenix Presence](https://whatdidilearn.info/2018/03/11/using-phoenix-presence.html)
  > A nice example of using phoenix presence in a contrived app
- [Architecting GenServers for Testability in Elixir](https://tylerayoung.com/2021/09/12/architecting-genservers-for-testability/)
  > Nice examples / discussion

### Go

- [Go by Example](https://gobyexample.com/)
  > A friend and I have challenged ourselves to try and solve 2021's advent of code in a language that we don't feel strong in. We decided on Go for this year, this site is definitely going to be a good resource.

### HTML / CSS / SVG

- [Learn CSS](https://web.dev/learn/css/)
  > Google released a new learn CSS platform based on their successful 'CSS podcast'. It looks pretty amazing!
- [Creating UI Components in SVG](https://css-tricks.com/creating-ui-components-in-svg/)
  > If there is one lesson I learned when working on [Exercism's](https://exercism.org) syllabus map is that SVGs and programmatically generated SVGs can be amazing. Sarah Drasner's overview of using them for UI is great.
- [Designing Beautiful Shadows in CSS](https://www.joshwcomeau.com/css/designing-shadows/)
  > Wow, what an awesome article to help you really understand the method behind the details

### JavaScript

- [Just JavaScript](https://justjavascript.com/)
  > Dan Abramov's online interpretation of his previous email-based curriculum to shape your mental model of JavaScript. Worth.
- [Dynamic task schedule with NodeJS and Redis](hhttps://medium.com/yudiz-solutions/dynamic-task-scheduling-with-redis-and-nodejs-7b63782c78cc)
  > Hadn't thought about this type of problem in a long time, this was a simple approach to polling long running tasks using a common redis solution
- [Lightning Fast Search with Elastic Search](https://dev.to/webiny/lighting-fast-search-with-elasticsearch-n82)
  > While reading ['NodeJS the right way'](https://pragprog.com/titles/jwnode2/node-js-8-the-right-way/) there is an interesting portion where you have the chance to learn a bit about elasticsearch. This is a neat overview of elasticsearch.
- [Let’s Create a Lightweight Native Event Bus in JavaScript](https://css-tricks.com/lets-create-a-lightweight-native-event-bus-in-javascript/)
  > Cool pattern which feels very javascript-y to me.
- [JavaScript async and await in loops](https://zellwk.com/blog/async-await-in-loops/)
  > Good overview of promises while performing in data transformations of collections
- [Three intermediate functional JS patterns](https://www.intercaetera.com/posts/three-functional-patterns)
  > Some neat patterns, I liked the rest removal and console-logging in arrow functions, but I am less convinced the removal of the ternary is alway the best. The example uses a poorly formatted ternary expression and replaces it with a specifically formatted single-line if statements. 🤷 6 of one, half-dozen of the other to me.
- [30 seconds of code (GitHub repository)](https://github.com/30-seconds/30-seconds-of-code/tree/master/snippets)
  > I like these short snippets of patterns for re-use. The website feels slower to navigate, so prefer the repo view.

### Javascript / React

- [Fundamentals of Redux Course from Dan Abramov](https://egghead.io/courses/fundamentals-of-redux-course-from-dan-abramov-bd5cc867)
  > An older course, but still relevant as redux has played a large part in shaping the modern SPA-landscape for controlling/consolidating app-wide state. It seems there is a shift with "new" concepts like React's Context, but good overview and Dan Abramov is very good.
- [React XSS Protection Cheat Sheet](https://lolware.net/blog/react-xss-protection-cheat-sheet/)
  > nice overview of practices to protect your viewers/users/clients
- [react2025](https://react2025.com/)
  > Cool tutorial/walk-through using Next.js/React, integrating Firebase and Stripe, deploying to Vercel
- [Multistep Forms in React with Awesome Ux](https://andyfry.co/multi-step-form-intro/)
  > A cool series of articles detailing multi-step forms in react

### Prolog

- [Prolog meta-interpretation for syntax checking](https://blog.terminusdb.com/prolog-meta-interpretation-for-syntax-checking)
  > I'm a sucker for interesting applications of prolog. While it is super slow, using it for niche instances like this makes a lot of sense to me since it is so good for DSLs with its DCG syntax

### Ruby / RoR

- [Ruby on Rails Model Patterns and Anti-patterns](https://blog.appsignal.com/2020/11/18/rails-model-patterns-and-anti-patterns.html)
  > While using ruby and RoR as the subject, I think this is an applicable problem in many languages/frameworks

## Software Development / Other

- [Software Estimation is Hard. Do it anyway.](https://jacobian.org/2021/may/20/estimation/)
  > A good case for how to approach the estimation conversion.
- [My Software Estimation Technique](https://jacobian.org/2021/may/25/my-estimation-technique/)
  > A methodical approach to software estimation.
- [Technical Writing Course](https://developers.google.com/tech-writing)
  > Had no idea this resource existed. Planning to go through it sometime
- [Guide to Onboarding Developers](https://codesubmit.io/blog/guide-to-onboarding-developers/)
  > My employer is hiring lots right now, this looks like a neat way to be able to plug in to that process and help make the transition successful for others.
- [Reddit Interview Problems: The Game of Life](https://alexgolec.dev/reddit-interview-problems-the-game-of-life/)
  > Neat overview of hiring programming problems
