---
layout: post
title: "neenjaw.com: Rebuilt with Jekyll"
date: 2020-09-11 10:56:11 -0600
categories: ruby jekyll liquid reboot react blog
---

If you visit here with any regularity, you'll see that this blog now looks very different.

It's been ~ 2.5 years since I last re-did this website, so it was overdue. Keeping with my last design decision, I have gone with another [JAM-stack][jamstack] setup: [Jekyll][jekyll], [Github][github], and [Netlify][netlify]. I moved from metalsmith (javascript/gulp) to jekyll (ruby/liquid templates) for two reasons: 1) metalsmith is no longer actively maintained, 2) I wanted to use a little bit of ruby for my personal website.

Jekyll is pretty nice! Out of the box nice template with the `minima` theme (this theme is mostly `minima`). It's very easy to create new, flexible layouts, top-level pages, integrate posts in flexible ways. The only thing I have yet to fully figure out is how it pulls in the `scss` dependencies. So my additions are just shoved in for the moment.

I have also added a very minimal react widgit, can you find it? It's the logo! Move your mouse around the screen, see how the conic gradient reacts (🤣) to your pointer position.

<div style="display: flex; justify-content: center; margin-bottom: 15px;"><div style="padding: 10px; border: 1px solid rgba(0, 0, 0, 0.4);" class="logo-container"></div></div>

It is made using react hooks. First I made a very simple function which returned the component:

> Logo Component, scaffolded

```jsx
const Logo = ({ name }) => {
  name = name ?? "neenjaw.com";
  const firstLetter = name[0];

  return (
    <div className="container">
      <div className="card">{firstLetter}</div>
      <span className="name">{name}</span>
    </div>
  );
};
```

For the component to update when something changes (like the mouse position), the `useEffect` hook is used:

> Logo Component, with useEffect scaffold

```jsx
const Logo = ({ name }) => {
  name = name ?? "neenjaw.com";
  const firstLetter = name[0];

  useEffect(
    () => {
      // Do stuff that get computed on change here
    },
    [
      /* list all variables that prompt an update when they change here */
    ]
  );

  return (
    <div className="container">
      <div className="card">{firstLetter}</div>
      <span className="name">{name}</span>
    </div>
  );
};
```

So since we want to update the component when the mouse position changes, let's make our own hook:

> useMousePosition Hook

```jsx
const useMousePosition = () => {
  // Keep track of the position of the mouse
  const [position, setPosition] = useState({ mouseX: 0, mouseY: 0 });

  // useEffect's callback argument is executed when the hook is mounted and
  // whenever the values of the second argument change.  The second argument
  // is an empty list, so it will only fire when the hook is mounted.
  useEffect(() => {
    // Add an event listener to the window which updates the state of this hook
    const setFromEvent = (e) =>
      setPosition({ mouseX: e.clientX, mouseY: e.clientY });
    window.addEventListener("mousemove", setFromEvent);

    // When this hook is to be unmounted, this returned callback function will
    // be fired to clean up allocated resources
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  // return the mouse's position to the calling component
  return position;
};
```

Now we can use the mouse position in our logo component:

> Logo Component, with useMousePosition

```jsx
const Logo = ({ name }) => {
  name = name ?? "neenjaw.com";
  const firstLetter = name[0];

  const { mouseX, mouseY } = useMousePosition();

  useEffect(() => {
    const { x, y, width, height } = cardEl.current.getBoundingClientRect();
    const dx = mouseX - (x + 0.5 * width);
    const dy = mouseY - (y + 0.5 * height);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    // Update our logo component here
  }, [mouseX, mouseY]);

  return (
    <div className="container">
      <div className="card">{firstLetter}</div>
      <span className="name">{name}</span>
    </div>
  );
};
```

One last thing to work out, how do we actually update the component? We need a way to identify the DOM element and update just that specific one (if you scroll back up, you can see that each logo has individual animations). If we hardcoded in an `id` and wanted two of them, this would break the HTML specification. If we used a `class`, then we would need some way to further identify it. So we could either generate a unique idea (which is a hassle at this scale), or use another provided hook `useRef`. `useRef` returned the current DOM instance of the component if it exists, so we can now update the style of that specific component.

> Logo Component with useRef

```jsx
const Logo = ({ name }) => {
  name = name ?? "neenjaw.com";
  const firstLetter = name[0];

  const cardEl = useRef(null);
  const { mouseX, mouseY } = useMousePosition();

  useEffect(() => {
    if (!cardEl.current) {
      return;
    }

    const { x, y, width, height } = cardEl.current.getBoundingClientRect();
    const dx = mouseX - (x + 0.5 * width);
    const dy = mouseY - (y + 0.5 * height);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    cardEl.current.style.setProperty("--startDeg", `${angle + 90}deg`);
  }, [mouseX, mouseY]);

  return (
    <div className="container">
      <div ref={cardEl} className="card">
        {firstLetter}
      </div>
      <span className="name">{name}</span>
    </div>
  );
};
```

Now we have a reusable component! So to make it into a widget, I transpiled the JSX using Babel and included the script in the jekyll layout.

Pretty neat!

Thanks for reading!

[jamstack]: https://jamstack.org/
[jekyll]: https://jekyllrb.com/
[github]: https://github.com/
[netlify]: https://www.netlify.com/
