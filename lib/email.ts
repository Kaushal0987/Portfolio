import { Resend } from "resend";
import type { ContactInput } from "@/lib/validation";

export async function sendContactEmail(data: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey) {
    throw new Error("Email service is not configured.");
  }

  if (!to) {
    throw new Error("Contact email is not configured.");
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: data.email,
    subject: `Portfolio inquiry from ${data.name}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      "",
      "Message:",
      data.message,
    ].join("\n"),
    html: `
      <h2>New portfolio inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
