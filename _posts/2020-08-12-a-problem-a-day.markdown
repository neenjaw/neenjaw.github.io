---
layout: post
title: A problem a day keeps the brain-rust at bay.
date: 2020-08-12 00:00:00 -0600
categories: coding
---

So while reading about technical interviews recently, I have also been trying to practice my hand at solving problems that I have never seen before.

While I do a lot of practice on [Exercism](https://exercism.io), I am now reasonable familiar with most of the problems and have solved them in at least one language (probably elixir or javascript or go). So I went on the hunt for new content. As a result I have been working through problems at [leetcode.com](https://www.leetcode.com) on its free tier.

It lets you work through problems with your choice of language to write it in. So that was my first decision to make. I wanted to practice solving problems, not learn languages so I felt I should pick a language that I want to stick to so that I can write it well if I were to be called to do so in a session. At this point I chose Ruby just because of its rich standard library, focus on readability, and being able to then code in a variety of styles.

So on to the problem:

> So imagine there is a box of oranges, and if a rotten orange is in the box, after a step of time, it causes oranges that are orthogonally adjacent to rot. How many steps until the rot has propagated to its maximum extent?

So a few things occurred to me:

- I need to represent a grid (2d array)
- I need to model a step of time (array)
- I need to be able to halt after a step to make note of how many steps I've made and if more need to occur.

So my approach started with using a nested loop, with the outer loop representing the current step and the inner loop representing the rotten oranges propagating to the adjacent fresh orange.

```ruby
def oranges_rotting(grid)
    # ...

    while _____ do # loop until all the oranges are rotten, or no more steps to perform
        while _____ do # rot fresh oranges if they are beside rotten oranges
        end
    end

    # ...
end
```

So I then decided that I would represent this with two stacks that I would exchange to represent `this_step` and `next_step`. when the program starts, `next_step` will be filled with all of the rotten oranges in the initial grid and `this_step` is empty. With each iteration `next_step` and `this_step` are exchanged, and then as each orange on the stack is processed, add them to the `next_step` stack.

```ruby
def oranges_rotting(grid)
    # ...

   count = 0
    while !next_step.empty? do
        this_step, next_step = next_step, this_step

        while !this_step.empty? do
            # rot the adjacent fresh oranges, mark them for the next step
        end
        count += 1 if !next_step.empty?
    end

   # ...
end
```

I believe this is the crux of the problem, to find a way to compute each step without then taking a moment to determine how many steps have occurred. Propagating the rotting oranges became relatively trivial:

```ruby
# Using coordinate notation, these are the four directions that a rotten orange can rot fresh oranges
def mutations
    [
        [-1, 0],
        [0, -1],
        [0, 1],
        [1, 0],
    ]
end

# for each orange at the coordinates {y, x} on the grid, check the adjacent spaces and add them to next step
def rot_surrounding(grid, y, x, next_step)
    height = grid.length
    width = grid[0].length
    mutations.each do |(dy, dx)|
        adj_x = x + dx
        adj_y = y + dy
        # Because of ruby's handy ability to handle negative array indices, a more verbose check was required here
        if (0...height).include?(adj_y) && (0...width).include?(adj_x) && grid[adj_y][adj_x] == FRESH_ORANGE
            grid[adj_y][adj_x] = ROTTEN_ORANGE
            next_step.push([adj_y, adj_x])
        end
    end
end
```

Lastly, a scan was needed at the start to find the rotten oranges in the grid, and at the end to determine if all fresh oranges were reachable by rotten oranges.

```ruby
def scan_grid(grid, type)
    found = []
    grid.each_with_index do |row, y|
        row.each_with_index do |cell, x|
            found.push([y, x]) if cell == type
        end
    end
    found
end
```

The complete code can be found on my github gist [here](https://gist.github.com/neenjaw/71db39c428c2c6e01477e63c87afd875):

<script src="https://gist.github.com/neenjaw/71db39c428c2c6e01477e63c87afd875.js"></script>
