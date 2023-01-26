# cli-assistant
A simple AI assistant for your CLI.

We have:
* [GLaDOS](https://en.wikipedia.org/wiki/GLaDOS)
* Caroline (some AI assistant name I came up with)

## Installation

You will need [Deno](https://deno.land) for this. And also a [OpenAI API Key](https://beta.openai.com/account/api-keys)

```
git clone https://github.com/notangelmario/cli-assistant

deno install --allow-env=HOME --allow-read=$HOME/.glados.config.json --allow-net=api.openai.com glados.ts
```

> I will provide compiled binaries soon
