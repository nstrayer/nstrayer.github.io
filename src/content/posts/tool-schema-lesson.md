---
title: Be careful with your tool schemas
description: A lesson in how the names of parameters in agent tool schemas can influence performance in surprising ways
publishedAt: 2026-09-16
tags:
  - LLMs
ai:
  statement: I used Codex to create the Posts section, Markdown scaffold, and AI assistance panel.
  tools:
    - Codex
---

I'm working on a new project at Posit that involves a lot of building on the internals of LLM agents. In this project I had added a new tool parameter to a tool that had existed for a while without problems. The parameter was called `description` and it was used to provide plain-language description of what the code the agent wrote for the tool call was doing. Like how you'd describe a simple script's contents to a collegue. E.g. "Read in the csv, filter out NAs, print the first 10 rows.".

This worked great and the new schema got merged but I started noticing that more often than I would expect agents, especially those that I like to do interactive data science work with (fast and cheap ones that let me explore in flow) were messing up and repeatedly forgetting to provide another schema field called "intent". This is a short description that is used to label the toolcall for easy browsing. E.g. "load and filter data". [^1]

At first my thought was "well duh, I added another parameter that sounds very similar to the first and the model is getting confused." But then I looked into it further with some evals. It turns out that the model was always omitting the 'intent' field and never the 'description' one. I would have thought that this split would be about even.

This made me suspicious so I asked a couple agents to describe "standard tool calling schemas for code execution" and they all had 'description' as a parameter, but in the role of our 'intent'. So it seems like the agent was getting confused with two similarly named parameters and then just defaulting to the one that was probably in harnesses that it was reinforcement learned in.

The quick fix was to rename the description to something distinct. I tested a few options with evals and found 'psuedocode' brought the tool call error rate down to zero.

## Takeaways
When coming up with parameter names for agent tools you not only need to use common sense (something I didnt do initially) but you should also see if there is prior art in other harnesses that could be 'baked in' to the models training. Also use simple evals to make sure you're not missing something.

[^1]: You might say, "what about the parameter _description?_" These made the difference very clear. The model just seems to not care about them at all.
