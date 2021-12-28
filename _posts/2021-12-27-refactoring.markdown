---
layout: post
title: Refactoring
subtitle: Giving names to patterns
date: 2021-12-27 11:46:28 -0600
categories: refactoring code
---

<span style="float: right;">
  <span style="display: flex; flex-direction: column; align-items: flex-end; gap: 12px; padding: 12px; padding-top: 0">
    <img alt="'Dive into Design Patterns' by Alexan­der Shvets" src="/assets/images/dive-into-design-patterns.png" style="width: 150px; border: 1px solid rgba(0,0,0,0.5);" />
    <img alt="'Refactoring' by Martin Fowler" src="/assets/images/refactoring.jpg" style="width: 150px; border: 1px solid rgba(0,0,0,0.5);" />
  </span>
</span>

Over the last year at [7shifts](https://www.7shifts.com) we've been tackling various areas of tech debt to allow for future work in the areas of growth.

In order to be prepared to participate and help plan the work, I had set some personal goals to work through some books to refresh my knowledge about design patterns and formalizing refactoring techniques.

### But Design Patterns are&hellip; &lt;criticism /&gt;

There are a number of reasonable objections to design patterns that I encountered as I was reading through 'Dive into Design Patterns' which Ken O. Burtch [summarizes nicely](https://www.pegasoft.ca/coder/coder_july_2017.html):

1. Design patterns are work-arounds for missing language features.
1. Design patterns encourage lazy design, copy-and-pasting approaches rather than considering the implication for the direct use-case.
1. Design patterns increase complexity.
1. Design patterns might be common, but they also might be bad designs.
1. Design patterns are not clearly separate from implementation (or programming language).

I think each of these points has some merit behind them, but it might be that the biggest lesson from using design patterns is knowing when (and when not to) to apply them. For example using a builder pattern for simple objects, or a factory pattern for a non-polymorphic object might be over engineering a solution.

To the first points credit, a language might have a feature which allows for composition of code such that the design pattern is largely unnecessary. For example, the `Chain of Responsibility` is a design patterns where you abstract the chain of function/method calls which are applied to a data transformation/event/sequence. In Elixir, there is both the pipeline operator `|>` and libraries which use metaprogramming which all but implement the pattern.

```elixir
# A pipeline created using the pipeline operator
some_value
|> transform_1()
|> transform_2()
|> transform_3()
|> transform_4()

# A composed chain of responsibilities in a Phoenix Router Pipeline
defmodule HelloWeb.Router do
  use HelloWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  # ...
end
```

### So then why bother?

I think there have been two big gains in refreshing my knowledge of design patterns:

1. Learning to identify common organizational problems in code.
1. Developing a common language to discuss code organization.

Which is how _Refactoring_ fits into this for me, Martin Fowler discusses the concept of a [_code smell_](https://martinfowler.com/bliki/CodeSmell.html) -- a surface indication (sometimes even starting as a gut feeling) that usually corresponds to a deeper problem in the system. Code smells offer a vocabulary to discuss findings/concerns/ideas in a codebase facilitating discussions about discrete observations.

With code smells, design patterns, refactoring techniques, we have been able to initiate discussions about code using a code smell. Once identifying an issue, using design patterns as a language we have been able to discuss potential solutions. Once we have a potential solution, we use the formal refactoring patterns to carry out our plan.

### Summing up

I think like most things tech, there isn't a single panacea to all problems, and design patterns aren't perfect either, but design patterns offer a starting point to be able to discuss, identify issues with code organization to improve it over time.

The most important thing is communicating with the team about our thoughts/concerns on the code we write so that we can achieve our goals together.

---

> Interested to know more about 7shifts and the problems we are helping to solve with tech for the restaurant industry? We are hiring for a variety of in-person/hybrid/remote positions for anyone legally able to work in Canada. Come work with me! Check them out here: [Careers @ 7shifts](https://www.7shifts.com/careers)
