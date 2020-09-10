---
layout: post
title: Website Overhaul!
date: 2018-03-03 00:00:00 -0600
categories: coding
---

I have made some big progress updating the website's back end. You'd probably notice nothing different from the look of things as they are now, but so much has changed on the back end. I have now implemented [Metalsmith](http://metalsmith.io) which is a really neat little static site generator. I think it may be past its prime, but has a well documented plugin system.

So now, as it is, neenjaw.com's content is generated from a set of markdown formatted pages, parsed, passed into a series of handlebars templates, then the html generated is saved.

Built into the build script I have also added a js and css minifier and bundler.

I am quite proud of this little stack, because a few months ago crawling through this type of stack was completely foreign to me and I was very lost as to how this all could create a site. But now, I have:

- used gulp and browsersync to create a development server
- used npm build scripts
- installed and proper linting tools for developemnt
- am able to work with a cdn provider for hosting, [netlify](https://netlify.com)

And for my design I have been able to accomplish this without:

- a css framework (bootstrap, purecss, semantic)
- js libraries like jQuery

And this is an accomplishment to me!

I started to get back into things looking at developing a solution for my professional work as a nurse, creating a system to better track staff assignment mix and workload, and now I think I have really rediscovered a lot of what brought me originally into computer science which I think I pushed aside when I lost track of how it could be applied to the real world. I like the coding, learning, applying, experimenting, and problem solving. Seeing how an web app could potentially save me 20-30min per day really opened my eyes to see how pervasive the problems of information management really are in day-to-day things.

I mean, the trick still is how do you make it profitable.

Fow now, it's only profitable in my personal development, but maybe someday it could be monetary as well.
