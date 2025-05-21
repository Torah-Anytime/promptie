import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { anthropic } from "@ai-sdk/anthropic";
import { type LanguageModelV1 } from "ai";

// Get the OpenRouter model name from the global variable if available
// @ts-ignore - Accessing global scope
const openrouterModelName = global.OPENROUTER_MODEL_NAME || process.env.OPENROUTER_MODEL_NAME;

export const model: LanguageModelV1 | undefined = process.env.ANTHROPIC_API_KEY
  ? anthropic("claude-3-7-sonnet-latest")
  : process.env.OPENROUTER_API_KEY && openrouterModelName
  ? createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
    })(openrouterModelName)
  : undefined;
