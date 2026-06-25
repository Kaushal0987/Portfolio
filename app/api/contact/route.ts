import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid input.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ success: true });
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send message.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
