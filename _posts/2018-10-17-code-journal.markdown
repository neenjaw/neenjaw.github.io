---
layout: post
title: Code Journal
date: 2018-10-17 00:00:00 -0600
categories: coding
---

# Current side project

I am working to recreate a version of YNAB 3 as I've been trying to think about how to design an accounting system, a secure API, and a detached web front end. For learning goals I wanted to:

- learn how to integrate node.js into a relational database
- learn how to create a JSON api in express without template routes
- learn how to secure an API with JWT and traditional authorization patterns
- learn how to integrate a front-end framework into it (e.g. reactjs, vue, or angular)

So what I have started has a few features:

## 1. Knex.js

> an npm library which functions as an sql builder for a variety of databases

What I like about this library is that it also defines a migration pattern to adapt the database over time

It also has a build in way to seed the database from files, so easy to test, destroy, and rebuild data

## 2. Bookshelf.js

> an npm library which functions as an ORM using knex as a foundation

I am really liking this so far for it's promise based nature, makes it a little nicer to use and feels a bit more moden than mongoose (yes, yes, mongoose can use promises...). I also like that it is in general less opinionated than mongoose, so allows the database to do more of the heavy lifting whereas mongoose everything is limited by the schema defined and mongo can still be full of bad relational data (yes, yes, why are you using a nosql db for relational db problems).

## 3. Express.js

This really is a handy library and communicating with JSON is very easy. `res.json({result: 'hazaa!'})`!

## 4. jsonwebtoken

> an npm library to implement JWT use

Definitely an interesting way to secure a web API. I can really appreciate that it has its niche just as PHP with plain 'ol sessions has a place. I like that it really lowers the taxation on the database, and that it also drops the number of times a user is sending password data.

---

I have had to learn a few nifty tools so far for this:

1. dotenv -- an npm library for loading environment variables into the node process. I discovered how difficult it is to keep some of these secret tokens a secret when you have things centralized on public hubs like github. I don't want to broadcast things like the API secret tokens. But I also don't want to have to type them out every time. So this allows me to do that (as long as I don't add the `.env` file to the repo).
2. debugging in vscode directly -- it is really awesome to be able to set breakpoints in vscode and have it stop and beable to inspect it as it runs. I have been really trying to minimize calls to `console.log` to better understand what my program is doing before it gets there.

---

Other things that I've been playing with over the last month(s):

1. Python -- flask, flask_rest_api, virtualenv setup, django
2. Elixer -- just the base syntax/types, eventually would like to use phoenix framework or nerves in a project
3. Minecraft server admin -- as a launching point to learn about systemd, linux file structure, linux sys admin, ubuntu
4. MedHack -- Where we made a small web app to connect people to resources.
