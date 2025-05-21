import { NextResponse } from "next/server";

export async function GET() {
  // Determine the LLM provider based on environment variables
  let provider = "none";
  let model = "";

  if (process.env.ANTHROPIC_API_KEY) {
    provider = "anthropic";
    model = "claude-3-7-sonnet-latest"; // Default Anthropic model
  } else if (process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_MODEL_NAME) {
    provider = "openrouter";
    model = process.env.OPENROUTER_MODEL_NAME;
  }

  return NextResponse.json({
    provider,
    model,
  });
}