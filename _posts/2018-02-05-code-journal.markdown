---
layout: post
title: Code Journal
date: 2018-02-05 00:00:00 -0600
categories: coding
---

- Wes Bos 30-day challenge - Day 12 [done]
- Lots of reading done re: webdev
- Lesson 287 webdev bootcamp
- Created some organizational spreadsheet to start organizing my thoughts re:
- Courses to do / doing / done
- Thought to creating a presentable github
- Books to read
- Projects on the go
- Roadblocks being faced
- Ideas to pursue/think about
- Link repository
- Tag format

## Commentary

Now, I am no expert, but I disagree with Wes’ solution for his konami code logger for today’s solution. I too thought to just have a comparison string, but it doesn’t work for the very example he demonstrated on Buzzfeed. It only will work for discrete letters, not for other key combinations not represented by a single character. Having it compare the sequence as an array, element for element, is a more robust way to account for complex key names. Also, he uses a slice operation on the string, I am not sure if this is more or less complicated than viewing it as a queue with a push and shift method. At least according to what I can find of test run on jsperf, they seem to be generally equivalent in removing the first element in an array.

Yelp camp is really starting to look great too. Again, now having a stronger understanding of flexbox, css I feel very empowered to finish the work started on the shift tracker. It also gives me confidence that if given a design, I could recreate it.

It’s been interesting organizing my learning plan in a spreadsheet to, makes me see how far I’ve come, how far I’d like to yet go with my skills. Basically having 10 years worth of content to make up for. I think though I am much more disciplined than I was 10 years ago and much more willing to tackle and persevere through problems.
