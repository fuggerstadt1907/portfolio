import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_TO_EMAIL;

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message || !TO_EMAIL) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Kontaktformular <onboarding@resend.dev>",
    to: TO_EMAIL,
    replyTo: email,
    subject: `Neue Nachricht von ${name}`,
    text: [
      `Von:      ${name}`,
      `E-Mail:   ${email}`,
      ``,
      `Nachricht:`,
      `----------`,
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Failed to send" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
