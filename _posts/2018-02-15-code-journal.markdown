---
layout: post
title: Code Journal
date: 2018-02-15 00:00:00 -0600
categories: coding
---

- Wes Bos 30-day challenge - day 22
- Webdev - up to 310

## Commentary

### Wes Bos

I really liked this session today, as this effect is really really cool. I didn’t like how it started in the top left at first though, so I played around with it to appear at the first mouseover, then translate/transform from there on. I also added a fade out timer, so that 3 seconds after mouseout it fades away. When another mouseover is performed, it fades back in where it was then moves to the new location.

I also really liked using browsersync to make working on this even easier. Like wow, you just don’t realize how much time you spend just reloading that thing manually.

### Webdev

Starting to really come together with YelpCamp. Now campgrounds have authorization to edit/update/delete. Thing is that comments are still orphaned I think if the campground is deleted as there is no relational CASCADE operation defined.

Express middleware is starting to make a lot of sense as is the general structure of express.

I am enjoying the decisions I have made to diverge from Colt’s approach to yelp camp. To review:

1. Using bootcamp 4 vs bootcamp 3
2. Decided to make an effort to not reveal database implementation if able, so masking the ‘\_id’ param as ‘id’
3. Using ‘where’ and ‘x’ [update|delete] vs the one method
4. Using the populate path as opposed to another mongo query

I think I’m getting more out of it in general this way, and it gives me a better representation for a portfolio if need be.
