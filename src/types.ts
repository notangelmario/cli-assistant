export type Model = "text-davinci-002" | "text-davinci-003" | "text-curie-001"

export interface Config {
	apiKey?: string;
}

export interface ClientConfig {
	name: string;
	model: Model;
	instructions: string;
	publicName: string;
}
