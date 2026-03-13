import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { userId, userEmail } = await request.json();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const params = new URLSearchParams();
    params.append("payment_method_types[0]", "card");
    params.append("mode", "subscription");
    params.append("line_items[0][price]", "price_1TAYRNCuuvmUYDIJiWGXOps4");
    params.append("line_items[0][quantity]", "1");
    if (userEmail) params.append("customer_email", userEmail);
    if (userId) params.append("metadata[userId]", userId);
    params.append(
      "success_url",
      `${siteUrl}/subscribe/success?session_id={CHECKOUT_SESSION_ID}&user_id=${userId}`
    );
    params.append("cancel_url", `${siteUrl}/subscribe`);

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const session = await response.json();

    if (!response.ok) {
      console.error("Stripe error:", session);
      return NextResponse.json(
        { error: session?.error?.message || "Stripe error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
