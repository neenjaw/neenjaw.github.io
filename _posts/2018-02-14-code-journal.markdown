---
layout: post
title: Code Journal
date: 2018-02-14 00:00:00 -0600
categories: coding
---

- Wes Bos 30-day challenge - day 21
- Browser-sync (learned how to config)
- OpenSSL - setup, cert generate
- Webdev up to 307

## Commentary

Well, I decided to again depart from the model provided for the course. It seems wrong to just store the whole author object in the comment. It’s not very ACID. What if the user changes the name or something? Considering it’s not very hard to populate one more level, I am surprised Colt didn’t touch on this.

I guess this is also another symptom of the NoSQL pattern, or lack thereof that I have been reading about recently. Basically, there is a lot of criticism towards NoSQL db’s because they can be seen to promote bad db design, facilitate bad data, and be very hard to guarantee correctness if data changes or is deleted.

I started to see this in my brief venture into the angular as a part of the shift trader SPA, because I wanted the SPA to have a collection of all the trades and then just a collection of their own user data. So meant updated two independent trees without necessarily a tie between them to ensure their correctness.
