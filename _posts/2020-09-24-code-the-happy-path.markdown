---
layout: post
title: "Coding the happy path"
date: 2020-09-24 15:28:48 -0600
categories: elixir genserver coding phoenix
---

This week I am working through the last few chapters of [_Programming Phoenix >= 1.4_][prag-prog-programming-phoenix] by _Chris McCord, Bruce Tate, and José Valim_. And I wanted to write down one of the really awesome things I like about `Elixir` -- how it supports coding for the happy path.

## "Let it crash"

There is a saying with Erlang and Elixir, "Let it crash." This is because crashing in a running `Elixir` application (running on the `BEAM VM`) isn't quite like crashing out of your `Java`, `C`, or `Rust` app. This is for two reasons:

1. When a `BEAM` process crashes, it often doesn't bring down the whole application because `BEAM` processes are not kernel processes. They are a lightweight abstraction provided by the virtual machine.
2. In `Elixir`, the **Supervisor** pattern is able to bring your system back up to a known good state.

<img alt="GenServer in action" src="/assets/images/genserver-boom.gif" style="border: 1px solid rgba(0,0,0,0.5);">

> The application supervisor restarts our crashed ticking processes auto-magically!

Let's look at some code:

```elixir

defmodule MyApp.TickingTimeBomb do
  use GenServer, restart: :permanent

  # Public interface

  def start_link(initial_val) do
    GenServer.start_link(__MODULE__, initial_val)
  end

  def init(initial) do
    Process.send_after(self(), :tick, 1000)
    {:ok, initial}
  end

  # GenServer Callbacks

  def handle_info(:tick, val) when val <= 0, do: raise("boom!")

  def handle_info(:tick, val) do
    IO.puts("tick #{val}")
    Process.send_after(self(), :tick, 1000)
    {:noreply, val - 1}
  end
end
```

So here is a very simple `GenServer` example that ticks down and crashes. In Elixir, A `GenServer` provides an interface for an agent in a distributed system. An agent is a process, and all processes are able to send and receive messages. Our process is initialized with the `init/1` function, setting the agent's state to the `initial` value. This could be anything, but for our purposes it is just an integer.

During the initialization a message loop is started by `Process.send_after(self(), :tick, 1000)`. This sends the message `:tick` to itself after `1000`ms. The callback functions then define the behavior of the agent processes. If the tick message is received with the value is <= 0, then the process crashes with an error. Otherwise, it decrements the value and sends another `:tick` message to itself.

## Shouldn't this only run once?

Well yes, if it werent for our handy declaration at the top of the file

```elixir
defmodule MyApp.TickingTimeBomb do
  use GenServer, restart: :permanent

  # ....
```

This provides the application with a directive to restart the process indefinitely. But our application needs to be told to start our process to get the ball rolling. There are a couple ways to do this, but for the process to run under the application supervisor directly we can add this modele to our `application.ex` code:

```elixir
defmodule MyApp.Application do
  @moduledoc false
  use Application

  def start(_type, _args) do
    children = [
      {MyApp.TickingTimeBomb, 5} # <-- This is the magic here
    ]

    opts = [strategy: :one_for_one, name: MyApp.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
```

We add the module as a child process to our application's supervisor. The second _tuple_ element is the argument that is passed along to our `init/1` function whenever it is started. So when it crashes, it is restarted with a value of `5`.

This is a pretty neat feature of Elixir programming!

## Coding the happy path

So how do we bring this back to the title? Well, it just reinforces that in elixir we can code assertively for the normative case with the guarantee that a raised error will not bring down our application and it remains able to service requests.

So rather than trying to handle every possible outcome of every function call, you can state your expected return, and if the result doesn't match or fit our contract, then we delegate the responsibility to a supervisor to deal with it. _Jose Valim_ (formerly of [Plataformatec](http://blog.plataformatec.com.br/), now [Dashbit](https://dashbit.co/)) [wrote about this a few years ago][writing-assertive].

[prag-prog-programming-phoenix]: https://pragprog.com/titles/phoenix14/programming-phoenix-1-4/
[writing-assertive]: http://blog.plataformatec.com.br/2014/09/writing-assertive-code-with-elixir/
