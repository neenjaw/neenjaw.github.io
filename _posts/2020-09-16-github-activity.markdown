---
layout: post
title: github-activity
date: 2020-09-16 11:49:41 -0600
categories: javascript wes-bos challenge github
---

I was going to post about my work through `Programming Phoenix` today, but I got sidetracked as I caught the intro to Wes Bos' video today: ['hosers are tweeting about github contribution graphs again'][wes-bos]. I watched the hook, and thought, "WAIT! I can do this!" So I paused the video and cooked up my own version:

![Edit my github contribution graph](/assets/images/sm-github-edit.gif)

I thought out my user story first:

1. I want to be able to enable and disable it on click
2. When enabled, I can click on the legend to get the paint color
3. When the color is selected, it should appear selected
4. When I click on the graph, it should paint the selected color to the square
5. When I click on the graph, it should suppress its usual behavior

So I started on a simple script and, like Wes' suggestion, just wrote it on the side and pasted to the console.

```javascript
// Find the legend in the DOM
const legend = document.querySelector("ul.legend");
// Find the graph in the DOM
const svg = document.querySelector("svg.js-calendar-graph-svg");
```

Easy enough, I can start to listen to click events through there!

## Color selector

Let's work on the color selector first:

We probably need some variables to store our state: is it enabled? which color is selected?

```javascript
// I settled on three, because then it makes things a little shorter later
let colorChangeEnabled = false;
let selectedColorBox = null;
let selectedColor = null;
```

And now the click handler

```javascript
const legendClickHandler = (event) => {
  // Determine if the event is coming from a legend box
  const target = event.target;
  if (target.parentElement != legend && target.tagName != "LI") {
    return;
  }

  // If the coloring is enabled, clicking on the box again diables it
  if (colorChangeEnabled && target.classList.contains("active-color")) {
    colorChangeEnabled = false;
    selectedColorBox.classList.remove("active-color");
    target.style.border = "0";
    return;
  }

  // A new color is selected, enable the color changer, show which color is selected
  colorChangeEnabled = true;
  if (selectedColorBox) {
    selectedColorBox.classList.remove("active-color");
    selectedColorBox.style.border = "0";
  }
  selectedColorBox = target;
  selectedColorBox.classList.add("active-color");
  selectedColorBox.style.border = "2px solid rgb(255, 0, 0)";
  selectedColor = selectedColorBox.style.backgroundColor;
};
```

Then by the [magic of event bubbling](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture), we can attach this to the parent of the boxes!

```javascript
legend.addEventListener("click", legendClickHandler);
```

At this scale, there is likely not much difference in performance between adding one event listener to the parent, or adding one event listener to each box (5 in total), but there is the potential for this to become a problem at scale. Also, if boxes were to be added or removed, we are already covering that case.

## Coloring boxes

Similar to above, we will make a handler to fire when there is a click on the graph:

```javascript
const rectClickHandler = (event) => {
  const target = event.target;

  // If coloring isn't enabled, do nothing
  if (!colorChangeEnabled) {
    return;
  }

  // Stop other click events from firing when it is enabled
  event.preventDefault();
  event.stopPropagation();

  // check if the click is on a graph box
  if (target.tagName != "rect" || !target.classList.contains("day")) {
    return;
  }

  // COLOR IT!
  target.style.fill = selectedColor;
};
```

Then add it to the svg graph:

```javascript
svg.addEventListener("click", rectClickHandler);
```

## Finishing steps

So, the limitation here is that you have to paste this into the console each time. But did you know there are good addons which allow custom javascript? I like to use [tampermonkey](http://www.tampermonkey.net/) for chrome.

So I made a new script, pasted the finished script there, and now it leads for me every time!

This was a pretty neat little challenge just to see if I could get it done. Probably writing this article took me longer.

Checkout my [github gist][gist] for the full script, and check out [Wes Bos' video][wes-bos] where I got the idea!

[gist]: https://gist.github.com/neenjaw/803779a06d37ba41c9471fbf9439b5a4
[wes-bos]: https://youtu.be/rLkgcm1UsiM
