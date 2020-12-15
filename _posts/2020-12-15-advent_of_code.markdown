---
layout: post
title: Advent of Code
date: 2020-12-15 15:02:11 -0600
categories: coding ruby elixir javascript
---

So, like last year, I have been participating in the [Advent of Code](https://www.adventofcode.com) challenge this year alongside friend from the [Exercism mentor/contributor group](https://www.exercism.io) and some local Saskatoon-based developers. With 15 days complete, there has already been an interesting variety of problems posing (mostly) fun questions.

> [Advent of Code](https://www.adventofcode.com) offers a daily holiday-themed programming challenge, one released each day.

Some interesting problem themes this year have focused around:

- common coding interview problems (think [Leetcode](https://www.leetcode.com))
- implementing state machines / virtual machines
- validating data
- ETL (Extract, Transform, Load) procedures
- cryptography

No specific programming language is prescribed, and so this year I've been trying to do it in a variety of Elixir, Ruby, and JavaScript. Each language has its own set of pros and cons. For example:

- Elixir is great for writing very clearly laid out functional transformations of data. However, when a random access array-like structure is required, you have to find another way to get constant time access (tuple, maps, ETS tables) rather than using a list.
- JavaScript is fast, and eslint combined with VSCode makes development pretty fast, but its relatively small standard library means implementing a lot of functions and methods on your own. (like sorting an array of numbers... `[3,2,1].sort((a, b) => a - b)`) which can be less than fun to debug in a crunch.
- Ruby is fast and performant and flexibly accommodates a lot of programming styles, but its massive standard library requires some familiarity in order to maximize its utility.

I think my favorite thing about [Advent of Code](https://www.adventofcode.com) is seeing how each person approaches a problem and discussing it together after. Each problem certainly has a few main approaches, but people coming from different backgrounds/languages apply their language to that approach in very different ways. I have learned a few new neat tricks about using ruby as a scripting language (`ARGF`, and `DATA` builtin objects). It's also been great getting to know a few local developers better. I'm looking forward to a post-COVID time where we can get together face-to-face.

I hope you partake in the fun!

Happy holidays!

> See my [Advent of Code](https://www.adventofcode.com) solutions here: [neenjaw/advent-of-code-2020](https://github.com/neenjaw/advent-of-code-2020)
