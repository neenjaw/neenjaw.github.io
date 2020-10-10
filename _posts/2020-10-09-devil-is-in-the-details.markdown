---
layout: post
title: '"The Devil is in the Details"'
date: 2020-10-09 22:48:09 -0600
categories: react canvas javascript typescript exercism
---

It's a pretty common phrase, which rings true to me pretty often. As I have shared, I have been volunteering to help develop parts of [Exercism](https://www.exercism.io)'s upcoming version 3 platform for learning programming languages and code mentorship. Recently that has meant developing a [React](https://reactjs.org/) component to represent a concept map for a programming language (see below).

<figure>
  <p>
    <img alt="Concepts Map, No zoom" src="/assets/images/concepts-map-no-zoom.png" style="border: 1px solid rgba(0,0,0,0.5);">
  </p>
  <figcaption>
    <blockquote>
      A Concepts Map
    </blockquote>
  </figcaption>
</figure>

This had turned out beautifully and I was (and am) pretty proud of how it turned out. Until a co-contributor rightly pointed out that when it is zoomed,
it became blurry! 🤯🤯🤯

<img alt="Concepts Map, 200% zoom" src="/assets/images/concepts-map-blurry.png" style="border: 1px solid rgba(0,0,0,0.5);">

The crisp bezier lines that linked the concepts lost their definition. But why? The other elements were still crisp. Well, the simple explanation is because the lines are drawn on an HTML `<canvas>`, which draws shapes in raster (or bitmap) mode. Meaning that it after it draws the curve as pixels the grid, the curve only exists as pixels, and it does not retain the mathematical model of the curve.

> The contrast to this would be vector graphics, where the shape's mathematical definition is saved, so it can be losslessly resized after it has been drawn.

But why was it resizing it like this? And was there a way that I could retain the high-quality drawing?

## Gathering evidence

The developer console is an invaluable tool. Press `f12` when your browser is in focus. This can show you ever bit of information that drives every webpage you visit. It can tell you how wide your webpage is (`document.documentElement.clientWidth`), it can tell you how tall the webpage is (`document.body.scrollHeight`). And, in fact, it is these properties which I used to place the canvas in the first place, so why was it breaking?

**It is because when the browser zooms, it lies.**

When you are at 100% zoom, the _CSS_ resolution matches the _window_ or _device_ resolution. When you zoom in, the resolution of the CSS lowers, but the window stays the same.

<figure>
  <p>
    <img alt="Concepts Map, Ruler Proof" src="/assets/images/concepts-map-rulers.png" style="border: 1px solid rgba(0,0,0,0.5);">
  </p>
  <figcaption>
    <blockquote>
      A zoomed in webpage. The yellow ruler's markings is the pixel measurement of the device. The white ruler is the pixel measurement of the webpage according to the browser.
    </blockquote>
  </figcaption>
</figure>

As you can see in the picture, the rulers don't match. And here is the source of the problem:

1. The component defines the height and width of the canvas to be:

   ```javascript
   const width = document.documentElement.clientWidth
   const height = document.body.scrollHeight
   ```

2. A canvas element as it is positioned on the webpage is defined by its _CSS_ style. That is, its element's dimensions are defined by the _CSS_ `width` and `height`

   ```javascript
   // Setting the canvas' CSS height and width
   canvas.style.width = `${width}px`
   canvas.style.height = `${height}px`
   ```

3. The canvas pixel grid is defined separately.

   ```javascript
   // Setting the canvas pixel grid height and width
   canvas.width = width
   canvas.height = height
   ```

4. So when the webpage is zoomed, the elements appear bigger, because the CSS dimensions are reduced and stretched to fill the window space. Since the canvas pixel grid is defined separately, it draws picture at the reduced dimension, then it gets stretched, causing the blurred shapes.

## The cure: _devicePixelRatio_

So how can this be fixed? How can we draw the canvas as the resolution of the device but size the element to the resolution of the webpage?

Turns out there is a widely supported property on the global `window` object: `devicePixelRatio`.

- When at 100% zoom, `devicePixelRatio == 1`
- When at 200% zoom, `devicePixelRatio == 2`

So we can use `devicePixelRatio` value to scale our canvas pixel dimensions:

```javascript
canvas.width = width * devicePixelRatio
canvas.height = height * devicePixelRatio
```

And we can use this to scale our functions when they dynamically calculate the coordinates to start and end the lines:

```typescript
function scalePath(path: ConceptPath, scale: number = 1): ConceptPath {
  return {
    start: {
      x: path.start.x * scale,
      y: path.start.y * scale,
    },
    end: {
      x: path.end.x * scale,
      y: path.end.y * scale,
    },
  }
}
```

So that when we draw this, no matter the zoom it ends up just as we expect it to:

<img alt="Concepts Map, 200% zoom, Crisp" src="/assets/images/concepts-map-crisp.png" style="border: 1px solid rgba(0,0,0,0.5);">

> 🤩🤩🤩

What I like about this:

- It looks great no matter the zoom
- It doesn't force a certain view on the user
- It is more accessible to people who require a higher zoom

First impressions matter on the web, so I hope this helps to make it a good one.
