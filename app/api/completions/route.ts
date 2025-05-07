import Handlebars from "handlebars";
import { NextRequest, NextResponse } from "next/server";
import { Ragie } from "ragie";
import { z } from "zod";
import { generateText } from "ai";
import { model } from "./models";

const ragie = new Ragie({ auth: process.env.RAGIE_API_KEY });

const payloadSchema = z.object({
  message: z.string(),
  partition: z.string(),
  topK: z.number(),
  rerank: z.boolean(),
  systemPrompt: z.string(),
});

export async function POST(request: NextRequest) {
  if (typeof model === "undefined") {
    throw new Error("No model provided");
  }
  const json = await request.json();
  const payload = payloadSchema.parse(json);

  const ragieResponse = await ragie.retrievals.retrieve({
    query: payload.message,
    partition: payload.partition,
    topK: payload.topK,
    rerank: payload.rerank,
  });

  const compiled = Handlebars.compile(payload.systemPrompt);

  const systemPrompt = compiled({
    now: new Date().toISOString(),
  });

  const modelResponse = await generateText({
    model,
    messages: [
      {
        role: "user",
        content: systemPrompt,
      },
      {
        role: "user",
        content: JSON.stringify(
          ragieResponse.scoredChunks.map((chunk) => ({
            type: "document",
            source: {
              type: "text",
              media_type: "text/plain",
              data: chunk.text,
            },
            title: chunk.documentName,
            citations: { enabled: true },
          }))
        ),
      },
      {
        role: "user",
        content: payload.message,
      },
    ],
  });

  return NextResponse.json({
    modelResponse,
    retrievalResponse: ragieResponse,
  });
}
