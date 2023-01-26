import { prompt, Input } from "./deps.ts";
import type { ClientConfig, Model } from "./types.ts";
import { getConfig, setConfig } from "./utils.ts";

const OPENAI_URL = "https://api.openai.com/v1/completions";

export async function main(client: ClientConfig) {
	let config = await getConfig(client.name);

	if (!config || !config.apiKey) {
		console.log("You don't have an API key set. Go to https://beta.openai.com/account/api-keys to get one.");
		const result = await prompt([
			{
				name: "apiKey",
				message: "Your API key: ",
				type: Input,
			}
		]);

		if (!result.apiKey) {
			console.log("No API key provided");
			return;
		}

		await setConfig(client.name, {
			apiKey: result.apiKey,
		});
		config = {
			...config,
			apiKey: result.apiKey,
		}
	}

	const request = await getUserInput();

	if (!request) {
		console.log("No request provided");
		return;
	}

	const reqPrompt = `${client.instructions} Human:${request}, ${client.publicName}:`;
	const response = await openAiRequest(reqPrompt, config.apiKey, client.model);

	const cleanResponse = response.replace(/(\r?\n|\r)/g, "");
	console.log(`${client.publicName}: ${cleanResponse}`);
}

async function getUserInput(): Promise<string | undefined> {
	const result = await Input.prompt({
		message: "Request: ",
	});

	return result;
}

async function openAiRequest(prompt: string, apiKey: string, model: Model) {
	try {
		const response = await fetch(OPENAI_URL, {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				prompt: prompt,
				max_tokens: 100,
				model: model,
			}),
		});

		const data = await response.json();
		return data.choices[0].text;
	} catch (error) {
		console.error(error);
	}
}
