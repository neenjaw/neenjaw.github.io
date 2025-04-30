---
layout: post
title: Lessons Learned from Advent of Code
subtitle: An occasionally painful education
date: 2025-04-30 06:02:08 -0600
categories: programming puzzles
---

I've set a bit of an annual tradition the last 5 years to attempt the [Advent of Code](https://adventofcode.com/) challenge.
The challenge consists of 25 programming and logic puzzles designed to push programmers a little bit out of their comfort zone, and likely do something completely different from work.

Looking back at my experience of the last years, I'm not sure I would say every moment has been fun, but I think I have profited from the experience.
Some lessons were learned from success, but more were learned from where I felt stretched, maybe even overwhelmed, by a problem I'd never seen before.
But those lessons have sharpened my skills with the tools I have available to me.

> "It's dangerous to go alone"
>
> -Unnamed Old Man

Advent of Code isn't a short challenge.
25 days in a rows adds up.
Even the days where the solution arrives quickly still means you've set aside _something_ in order to complete it.

But there are also days where the solution arrives slowly.
The problem could be unfamiliar or even a topic you have never heard of.

This is where having a friend to work through the problems with has been invaluable for me.
Having someone to bounce an idea off of, or commiserate the difficulty of a challenge has been an incredible resource.
There is nothing like having another person who can either be a passive encouragement with their presence, or an active participant to get out of a logjam.

Have a buddy.

> "Expectations are resentments waiting to happen"
>
> -Anne Lamott

Self-imposed expectations can be unrealistic.
We often hold a view of ourselves which make it difficult to take on new things.
We don't want to fail, or be seen as a failure.

Advent of Code creates many such situations where expectations are challenged.
The content might be unfamiliar.
The solution might take longer than you hoped.
Maybe you chose a new programming language to learn and it feels clumsy.
As the month goes on, these concerns are compounded by yet another problem or exhaustion.

Re-grounding myself for why I subject myself to the problems has been rewarding.
- I am in it to learn.  Learn new problems.  Learn new solutions.
- I am not in it to be the fastest [globally].
- I want to practice approaching and accomplishing hard tasks.

> "If a craftsman wants to do good work, he must first sharpen his tools"
>
> -Confucius

It's easy to get hung up on technical points of a programming language.
They all have their bespoke behaviours that are irregular an prickly.
Does the language return a new object, or mutate in place?
How are variables bound and rebound?

Knowing a programming language deeply is an invaluable resource.
Know how it works, know the common patterns, know the libraries and frameworks that are used on a daily basis.

The long term goal is to use the programming language to solve problems for people, not for the sake of programming.

This has been impressed on me as I've pushed myself to learn new languages for Advent of Code.
Not knowing how to express my idea the way I do in another language is a reminder that I also need to be deep in my daily-driver language.
I need to be able to write in that language freely.

> "When you hear hooves, think horses, not zebras"
>
> -Dr. Theodore Woodward

When encountering a bug in code, it's more often a combination of elementary mistakes.
Off by 1 errors are really easy to make when working between array-like contexts and real-world problems.
Inconsistencies in how data is structured lead to mis-orderings, or mis-typings.

It is possible to avoid entire classes of bugs by choosing some features up front.
Two small recommendations which have profited me greatly:

1. Use structured over unstructured data:
   Use a `struct` or `class` with named parameters and strong types when you can over arrays with positional meanings.
   You never have to ask, "Was this `[y,x]` or `[x,y]` if they have names.

2. Use iterators over indexes when possible:
   If you need to loop through a collection of data, use an iterator to go through it sequentially and stop when complete.
   You don't have to remember where it starts and when to end.


> "Make it work, make it right, make it fast"
>
> -Kent Beck

Too often I see a struggle when we write too much code before we are able to see the code in motion.
This is a feature I love about JavaScript, PHP, Ruby, and Elixir -- it's easy to see code in motion.

This can be accomplished more generally with unit tests in most languages.
Can a scaffold be created to start running your solution early and often.
It facilitates catching bugs and regressions early.

Get _something_ working early and iterate on it, before worrying about performance.

> "The secret to winning is learning how to lose."
>
> -James Clear

Recently I have spent time thinking about how to translate a finite event like Advent of Code into an infinite mindset.
The game isn't over when Advent of Code is over, so how do these little wins or failures contribute to that.
The game isn't over if I fail to solve one of the problems.

Sometimes a solution is simply out of reach, it might depend on knowledge, experience or language constructs you don't have available.

We need a fallback strategy.
For Advent of Code, sometimes we need to have an ace in our back pocket like `numpy` or `z3` which we can just lob a problem at to unblock us.
More generally, we need to cultivate relationships with people -- friends, co-workers -- to rely on in those moments.
We need to have a "debug" strategy to better understand the current situation and the problem we have encountered.

---
