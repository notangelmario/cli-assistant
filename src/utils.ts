import { join } from "./deps.ts";
import { Config } from "./types.ts";

// This should get the config at $HOME/.{name}.config.json
export const getConfig = async (name: string) => {
	const homeDir = Deno.env.get("HOME");
	if (!homeDir) {
		throw new Error("No home directory found");
	}

	const configPath = join(homeDir, `.${name}.config.json`);

	try {
		const config = await Deno.readTextFile(configPath);
		return JSON.parse(config);
	} catch (error) {
		console.error(error);
	}
}

export const setConfig = async (name: string, config: Config) => {
	const homeDir = Deno.env.get("HOME");
	if (!homeDir) {
		throw new Error("No home directory found");
	}

	const configPath = join(homeDir, `.${name}.config.json`);

	try {
		await Deno.writeTextFile(configPath, JSON.stringify(config));
	} catch (error) {
		console.error(error);
	}
}
