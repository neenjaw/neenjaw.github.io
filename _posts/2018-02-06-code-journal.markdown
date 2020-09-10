---
layout: post
title: Code Journal
date: 2018-02-06 00:00:00 -0600
categories: coding
---

- Wes Bos 30-day challenge - Day 13 [done]
- Setting up eslint/jslint
- Trying to use vscode more
- Webdev Lessons 288-291

## Commentary

Interesting exercise, not sure if I really like how the states function since the way the debouce calls the method, it sometimes acts a bit janky. For ex, it gets called right before you scroll the image into view, then it doesnt get called because you arent scrolling anymore, then once you start scrolling out, it may then show the image. I can appreciate not wanting to execute DOM changes over and over but I think to make it seem liek the pictures aren’t loading is dangerous. I wonder if adding a flag to prevent it from being called would be worth while.

The other option could be to pre-compute the offsets of all the images and then create map to just tell the script to hide/show the elements as the page is scrolled so that it is only the dom only changes when triggered by a check on the map

---

I gotta say, while I like atom as an editor, I really like vscode right now. Generally the language support has been as good as atom, and the easy integration of eslint/jshint has been useful.

---

It’s interesting seeing the differences in Bootstrap 3 to Bootstrap 4. I do much prefer the syntax usage of bootstrap 4, and it seems much more predictable than bootstrap 3. I have had to adapt yelpcamp to it, but I think overall it looks pretty good and comparable.
