import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { anthropic } from "@ai-sdk/anthropic";
import { type LanguageModelV1 } from "ai";

export const model: LanguageModelV1 | undefined = process.env.ANTHROPIC_API_KEY
  ? anthropic("claude-3-7-sonnet-latest")
  : process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_MODEL_NAME
  ? createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
    })(process.env.OPENROUTER_MODEL_NAME)
  : undefined;
