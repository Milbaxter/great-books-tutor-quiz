import Stripe from 'stripe';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const TIERS = {
  light: {
    name: 'Book Tutor Light',
    priceId: process.env.STRIPE_PRICE_LIGHT,
    books_limit: 2,
  },
  monthly: {
    name: 'Monthly',
    priceId: process.env.STRIPE_PRICE_MONTHLY,
    books_limit: 8,
  },
  pro: {
    name: 'Book Tutor Pro',
    priceId: process.env.STRIPE_PRICE_PRO,
    books_limit: 20,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const tierKey = req.query.tier || 'monthly';
    const tier = TIERS[tierKey];

    if (!tier) {
      return res.status(400).json({ error: 'Invalid tier' });
    }

    const subscriberToken = crypto.randomBytes(6).toString('hex');
    const origin = req.headers.origin || req.headers.referer?.replace(/\/$/, '') || 'https://greatest-book-tutor.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: tier.priceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${origin}/success.html?token=${subscriberToken}`,
      cancel_url: `${origin}/#pricing`,
      metadata: {
        subscriber_token: subscriberToken,
        tier: tierKey,
        books_limit: String(tier.books_limit),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
