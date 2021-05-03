---
layout: post
title: Seeing Crystal Clear
date: 2021-05-02 19:04:49 -0600
categories: programming crystal type-inference strong-typing exercism
---

Over the past several months I have been focussing on professional work, but I've managed to still maintain some involvement with [Exercism][exercism] as version 3 continues to be developed. One of the cool things coming in version 3 is being able to run tests against a solution in the browser. There are several advantages to this but in brief:

- Lowers the bar to allow students to experiment with new languages.
- Students have instant validation on the code they write.
- Students with limited hardware or software can learn without worrying about installing/working locally.

To support this there is quite a bit of tooling being built -- notably what we have come to call a "Test-runner". The test runners are isolated containers designed to isolate un-trusted code and execute it as safely as possible. The real challenge is writing an adapter for the 50-some languages to return a machine readable format compatible for the website.

I've had a hand in writing a few of these:

- [Elixir Test-runner][elixir-test-runner]
- [PHP Test-runner][php-test-runner]
- and now a [Crystal Test-runner][crystal-test-runner]

There have been several neat challenges for each of these:

- In Elixir, implementing a [custom formatter](https://github.com/exercism/elixir-test-runner/blob/main/exercism_test_helper/lib/json_formatter.ex) to capture the test run and save it as a json file.
- In PHP, using [typescript and cheerio](https://github.com/exercism/php-test-runner/tree/main/junit-to-json) to parse junit output and reformat it to json.

But this past week I've been working with Crystal to write a test-runner. As a learning challenge, I set a goal to write all of the needed tooling in crystal.

## What is Crystal

Crystal is a modern language that defines itself by a few things:

- Syntax is heavily inspired by ruby -- making it easy to read and write.
- Strong typing with static type checking and compile-time type inference.
- Null reference checks.
- Macros for metaprogramming and AST manipulation
- Concurrency primitives similar to Go and Clojure.
- Native C-lib bindings.

The [standard library](https://crystal-lang.org/api/1.0.0/) is quite rich, and has some really nice patterns to serialize and deserialize an object to json.

## Deserializing JSON

So the [defined interface](https://github.com/exercism/docs/blob/main/building/tooling/test-runners/interface.md) for a test-runner states that upon completion a `results.json` must be created with a summary of the test run. So in crystal that might be represented by this class structure:

```crystal
class TestCase
  include JSON::Serializable

  getter name : String
  getter test_code : String?
  property status : String?
  property message : String?
  property output : String?
end

class TestRun
  include JSON::Serializable

  getter version : Int32
  property status : String?
  property message : String?
  property tests : Array(TestCase)
end
```

Then all that's needed to serialize/deserialize a json file is a single LOC!

```crystal
# deserialize
test_run = TestRun.from_json(File.read(scaffold_json))

# serialize
File.write(output_file, test_run.to_json)
```

## Parsing XML

Crystal's batteries included test suite has an undocumented (as far as I could determine) ability to output the result in junit format. So by parsing the junit output, the json can be constructed with the data!

In Javascript-land, I have done this with cheerio, but Crystal even has native XML parsing abilities:

```crystal
junit_file_content = File.read(junit_file)
junit_document = XML.parse(junit_file_content)
```

So now `junit_document`'s value is an `XML::Node` where you can access its name, attributes and children for cnvenient traversal and data extraction.

## Difficulties

I would agree with Crystal's website, it was relatively easy to pick up with regard to its syntax and how methods and values behave. I think the steepest learning curve was cleanly handling the _nil_-able types.

When you have a _nil_-able type union like `String?` which represents `Nil | String`, if you call a method on it (like [#upcase][crystal-string-upcase]) it will generate a compile-time error:

> Suppose this code:

```crystal
class Person
  property name : String?

  def initialize(@name)
  end
end

person = Person.new
person.name.upcase
```

> Now when compiled:

```shell
> crystal person.cr
Showing last frame. Use --error-trace for full trace.

In person.cr:6:13

 6 | person.name.upcase
                 ^-----
Error: undefined method 'upcase' for Nil (compile-time type is (String | Nil))
```

There are several ways to handle this:

1. You can assert it is not nil, which will work if it actually isn't nil, otherwise it will raise an error:

   ```crystal
   person = Person.new("Ted")
   person.name.not_nil!.upcase
   ```

2. You can `try`, which will only perform the block if the value is not nil

   ```crystal
   person = Person.new("Ted")
   person.name.try(&.upcase)
   ```

3. You can also create situations where the compiler can infer whether it is nil:

   ```crystal
   person = Person.new("Ted")
   name = person.name
   if name
     name.upcase
   end
   ```

One caveat is that if you are using a nested reference, you have to assign the value to a local variable to infer its value because otherwise in a concurrent setting there might be some race condition where it becomes null after the if statement, but before the method call.

```crystal
person = Person.new("Ted")

# Can't do this:

if person.name
  name.upcase
end

# Do this:

name = person.name
if name
  name.upcase
end
```

## Wrapping up

Overall, Crystal was a fun programming venture. I don't know if I will be using it regularly from here on out, but it was fun and reasonably easy to get things done. The [Crystal: Getting Started](https://crystal-lang.org/reference/getting_started/) are pretty good with most things covered to get started.

[exercism]: https://www.exercism.io
[crystal-string-upcase]: https://crystal-lang.org/api/1.0.0/String.html#upcase(options:Unicode::CaseOptions=:none):String-instance-method
[crystal-test-runner]: https://github.com/neenjaw/crystal-test-runner
[elixir-test-runner]: https://github.com/exercism/elixir-test-runner
[php-test-runner]: https://github.com/exercism/php-test-runner
