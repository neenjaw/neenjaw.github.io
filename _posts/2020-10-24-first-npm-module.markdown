---
layout: post
title: I am now published! (in NPM)
date: 2020-10-24 11:00:57 -0600
categories: javascript npm github rest-api security
---

I published by first NPM package yesterday!

It all started when I was pushing some commits to GitHub that other people had helped me on, but since I wasn't creating the commit from a pull request, the `Co-authored-by` commit trailer wasn't generated automatically.

In the case that you don't know, the format for this trailer is:

```text
Co-authored-by: [user full-name] <[user email]>
```

And neither of those attributes are easily found if you don't already know them. You have to click through github profile pages, copy and pasting precariously.

So as a fun example I decided to make an app to do this for me. It had the following requirements:

- Had to be easy, I just wanted to type in the github user name (e.g. `neenjaw`) and then get a string back (e.g. `Co-authored-by: Tim Austin <tim@neenjaw.com>`)
- It had to be live, pulling the data from github using its rest-api interface
- It had to be secure, not storing my github personal access token in plain text

From those, the most difficult one seemed to be the third -- securely handling my github personal access token.

## Loose Lips Sink Ships

A keychain is the perfect place for something like a personal access token and I do most (if not all) development in Ubuntu (either Ubuntu proper or WSL2 Ubuntu), so I knew about the libsecret interface for storing secrets using DBUS channels. I had never interacted with it before directly. It is relatively straight forward though. You can either use C-lang bindings, or instead you can use `libsecret-tools` to get a command-line tool to interact with it.

From there using `secret-tool` you can store a secret (`echo "secret" | secret-tool store --label="your label" {attribute} {value}`), retrieve a secret (`secret-tool lookup {attribute} {value}`), or clear it (`secret-tool clear {attribute} {value}`). So using nodejs, this is as easy as executing the command string in a child-precess and running each command:

```javascript
const { exec } = require('child_process')

// Getting a secret from libsecret
exec(`secret-tool lookup {attribute} {value}`, (error, stdout, stderr) => {
  if (error) {
    // Handle the error
    return
  }
  if (stderr) {
    // Handle the stderr output
    return
  }

  // use the stdout output
})
```

This is a pretty standard nodejs pattern, an asynchronous function, taking a callback to then handle the result whenever the process should finish. They are pretty easy to use, but over time they produce a lot of complexity and deeply nested structures -- a.k.a. [Callback Hell](http://callbackhell.com/). So just for fun I wanted to wrap this into a javascript `Promise` and then practice using ES7's `async/await`:

```javascript
// The `exec` call wrapped in a promise
const getSecretValue = (attribute, value) => {
  return new Promise((resolve, reject) => {
    exec(
      `secret-tool lookup ${attribute} ${value}`,
      (error, stdout, stderr) => {
        if (error) {
          return reject(error)
        }
        if (stderr) {
          return reject(stderr)
        }
        resolve(stdout.trim())
      }
    )
  })
}
```

> It's a bit deep to get into promises and `async/await` here, but suffice to say they are patterns of writing asynchronous in a top-down or function-chaining way.

This function returns a promise which can then be used pretty easily:

```javascript
getSecretValue('my-secret-app', 'token')
  .then((secretToken) => {
    // do something with it here
  })
  .catch((error) => {
    // handle the error here
  })
```

Now that we have a mechanism to safely handling my github personal access token, let's get the information from GitHub!

## Using Octokit

Github as several maintained packages to interact with its REST-api, and I just went with their [`@Octokit/rest` npm package](https://www.npmjs.com/package/@octokit/rest) to do a basic `GET` request for the user's information with token authentication.

```javascript
const { Octokit } = require('@octokit/rest')

async function getCoauthorCommitTrailer(user) {
  const octo = new Octokit({ auth: token })

  const response = await octo.request(`/users/${user}`)
  const { name, email } = response.data
  return `Co-authored-by: ${name} <${email}>`
}
```

Neat! Super simple! But what if I want more than one user at once? Let's amp it up with a higher order function!

```javascript
async function getCoauthorCommitTrailers(...usernames) {
  const responses = await Promise.all(
    usernames.map((username) => oktokit.request(`/users/${username}`))
  )

  function toCommitTrailer(response) {
    const { name, email } = response.data
    return `Co-authored-by: ${name} <${email}>`
  }

  return responses.map(toCommitTrailer) // This returns the array in a promise
}

getCoauthorCommitTrailers(neenjaw, neenjaw_friend).then((trailers) =>
  trailers.forEach((trailer) => console.log(trailer))
)
```

> Now we can get a bunch at once!

## Wrapping it up

Putting that all together, I wrapped it in a little CLI script using the [`yargs` npm package](https://www.npmjs.com/package/yargs) to parse command line options to set/unset/show the saved token. Updated my package.json file to include my global install script, then published it! Check out my npm package here: [Give Credit Where Due](https://www.npmjs.com/package/give-credit-where-due)

It was neat to put into practice things that I've seen done, but never implemented my self.

I really like that about programming -- solving practical problems!
