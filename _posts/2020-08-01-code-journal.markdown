---
layout: post
title: Code Journal - Aug 01
date: 2020-08-01 00:00:00 -0600
categories: coding
---

# Cracking the Coding Interview

So I am trying to brush up on coding in java and python so that I am better at writing code that isn't Elixir. So I bought a book as a refresher and some mental exercise [see title]. It's interesting, so far it's been a great reminder of all the things I forgot. I really enjoy how the author writes up the proofs for time complexity, often building by example. It seems to grok with me.

So then I got to the start of the programming questions, and so I wanted to practice setting up a gradle project to use Java and JUnit. So I `touch`d `build.gradle`. Added:

```text
apply plugin: 'java'

repositories {
  mavenCentral()
}

sourceCompatibility = 1.8
targetCompatibility = 1.8

dependencies {
	testImplementation('org.junit.jupiter:junit-jupiter:5.6.2')
}

jar {
  archiveBaseName = 'gs-gradle'
  archiveVersion = '0.1.0'
}

test {
  useJUnitPlatform()
  testLogging {
    events 'PASSED', 'FAILED', 'SKIPPED'
  }
}
```

And then 🔥🔥🔥.

VSCode started melting down. The Java Language server was repeatedly crashing, ejecting dump files every second. 🤯!

Turns out, after 45 minutes of troubleshooting, a [`Project Lombok`](https://projectlombok.org/) VS Code plugin was behaving badly. Which is too bad, because it is a really neat extension. Project Lombok contains annotations (mixins, decorators, whatever you want to call them) to shorten Java code and reduce boilerplate.

## On to the question

So the question that I eventually wrote a solution for was to make a string with spaces usable in a URL in place. E.g. turn `"a b "` into `"a%20b"`.

So given the problem, I set out some assumptions (some set by the book):

1. A string only contains trailing spaces so that the string can be "url-ified" without having to re-allocate a new `char` array.
1. There are enough trailing spaces to convert all of the spaces.
1. Multiple spaces should not be collapsed.

So my naive approach would be to:

1. Start with an empty array
1. Iterate the characters of the String
   1. If non-space character, allocate an array with `length + 1` of the previous, copy char
   1. If space character, allocate an array with `length + 3` of the previous, copy '%', `2`, `0`
1. Caveat, since there are trailing spaces, I would have to go back and trim off the extra "%20" until reaching a non-space character

I did not actually implement this, but just for conversation.

I first wrote a few tests:

```java
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Disabled;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UrlifyTest {
  @Test
  void replacesNothingWhenGivenNothing() {
    assertEquals("", Urlify.urlify(""));
  }

  @Test
  void replacesNothingWhenNoSpaces() {
    assertEquals("a", Urlify.urlify("a"));
  }

  @Test
  void replacesSpaceInBetweenWords() {
    assertEquals("a%20b", Urlify.urlify("a b  "));
  }

  @Test
  void replacesSpaceInBetweenManyWords() {
    assertEquals("a%20b%20c", Urlify.urlify("a b c    "));
  }
}
```

But iterating the string in reverse presents us with a much more interesting/efficient/simple solution:

1. convert the string to an array of characters
1. use a for-loop to loop through the string backwards
   1. keep state to check when done iterating through trailing spaces
   1. keep state for where to insert the character next, since our loop index may be different from our insert index
   1. If a trailing space encountered, ignore it, continue
   1. If when a non-space character is encountered, we should start moving characters and replacing strings from this point
      1. If a non-space is encountered, move it to the insert index, and decrease it by 1
      1. If a space is encountered, put `'%', '2', '0'` at the insert index, and decrease it by 3

The resulting code:

```java
public class Urlify {
  public static String urlify(String str) {
    char[] chars = str.toCharArray();

    boolean inWord = false;
    int insertTo = chars.length - 1;
    for (int i = chars.length - 1; i >= 0; i--) {
      char c = chars[i];
      if (!inWord && Character.isSpaceChar(c)) {
        continue;
      }

      if (Character.isSpaceChar(c)) {
        chars[insertTo] = '0';
        chars[insertTo - 1] = '2';
        chars[insertTo - 2] = '%';
        insertTo -= 3;
        continue;
      }

      inWord = true;
      chars[insertTo] = c;
      insertTo -= 1;
    }

    return String.valueOf(chars);
  }
}
```

While not a complex problem, was a good exercise for remembering how to set up a basic gradle project, write tests, approach a problem.
