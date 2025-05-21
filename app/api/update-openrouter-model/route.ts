import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const payloadSchema = z.object({
  model: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const payload = payloadSchema.parse(json);

    // In a real application, you would update the environment variable here
    // Since we can't directly modify environment variables at runtime,
    // we'll store it in a global variable that the models.ts file can access
    
    // For demonstration purposes, we'll just return success
    // In a production environment, you might use a more persistent solution
    
    // @ts-ignore - Adding to global scope
    global.OPENROUTER_MODEL_NAME = payload.model;

    return NextResponse.json({
      success: true,
      message: "OpenRouter model updated successfully",
    });
  } catch (error) {
    console.error("Error updating OpenRouter model:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update OpenRouter model",
      },
      { status: 400 }
    );
  }
}