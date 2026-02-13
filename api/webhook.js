import Stripe from 'stripe';
import { Redis } from '@upstash/redis';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const TIER_LIMITS = {
  light: 2,
  monthly: 8,
  pro: 20,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let event;

  try {
    const rawBody = await getRawBody(req);
    const sig = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const subscriberToken = session.metadata?.subscriber_token;
    const tier = session.metadata?.tier || 'monthly';

    if (subscriberToken && session.payment_status === 'paid') {
      const existing = await redis.get(`subscriber:${subscriberToken}`);
      if (!existing) {
        const subscriberData = {
          id: subscriberToken,
          tier: tier,
          books_limit: TIER_LIMITS[tier] || 8,
          books_used: [],
          billing_cycle_start: Date.now(),
          active: true,
          stripe_customer_id: session.customer,
          stripe_subscription_id: session.subscription,
          created_at: Date.now(),
        };

        await redis.set(`subscriber:${subscriberToken}`, JSON.stringify(subscriberData), { ex: 90 * 24 * 60 * 60 });
        console.log(`Subscriber created: ${subscriberToken} (tier: ${tier})`);
      }
    }
  }

  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object;
    // Find subscriber by stripe_subscription_id — scan is expensive but rare event
    // For production, store a mapping: stripe_sub_id -> subscriber_token
    console.log(`Subscription updated: ${subscription.id}`);
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object;
    console.log(`Subscription deleted: ${subscription.id}`);
    // In production, deactivate the subscriber record
  }

  res.status(200).json({ received: true });
}
