import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(request: NextRequest) {
  try {
    const { userId, userEmail } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: "price_1TAYRNCuuvmUYDIJiWGXOps4",
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      metadata: { userId },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/subscribe/success?session_id={CHECKOUT_SESSION_ID}&user_id=${userId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/subscribe`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
