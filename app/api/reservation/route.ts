import { NextRequest, NextResponse } from "next/server";
import restaurant from "@/config/restaurant.config";

interface ReservationPayload {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  requests?: string;
  locale?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ReservationPayload = await req.json();
    const { name, phone, email, date, time, guests, requests } = body;

    // Validate required fields
    if (!name || !phone || !email || !date || !time || !guests) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Only send email if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: `${restaurant.name} Reservations <reservations@${process.env.RESEND_FROM_DOMAIN ?? "example.com"}>`,
        to: [restaurant.email],
        replyTo: email,
        subject: `New Reservation Request — ${name} (${guests} guests, ${date} at ${time})`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FAF7F2; color: #1C1C1C;">
            <h1 style="font-size: 28px; font-weight: 400; margin-bottom: 8px;">${restaurant.name}</h1>
            <p style="color: #6B6560; font-size: 13px; margin-bottom: 32px; border-bottom: 1px solid #D8D2C8; padding-bottom: 16px;">
              New Reservation Request
            </p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #6B6560; font-size: 13px; width: 140px;">Guest Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #6B6560; font-size: 13px;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #B85C38;">${phone}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #6B6560; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #B85C38;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #6B6560; font-size: 13px;">Date</td><td style="padding: 8px 0; font-weight: 600;">${date}</td></tr>
              <tr><td style="padding: 8px 0; color: #6B6560; font-size: 13px;">Time</td><td style="padding: 8px 0; font-weight: 600;">${time}</td></tr>
              <tr><td style="padding: 8px 0; color: #6B6560; font-size: 13px;">Party Size</td><td style="padding: 8px 0;">${guests} guests</td></tr>
              ${requests ? `<tr><td style="padding: 8px 0; color: #6B6560; font-size: 13px; vertical-align: top;">Special Requests</td><td style="padding: 8px 0;">${requests}</td></tr>` : ""}
            </table>
            <p style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #D8D2C8; font-size: 12px; color: #6B6560;">
              Reply directly to this email or call the guest at ${phone} to confirm.
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[reservation]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
