import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const STALE_SESSION_MS = 30 * 60 * 1000; // 30 minutes max

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subscriber, book } = req.query;

  if (!subscriber || !/^[a-f0-9]{12}$/.test(subscriber)) {
    return res.status(400).json({ error: 'Invalid subscriber token' });
  }

  if (!book) {
    return res.status(400).json({ error: 'Missing book slug' });
  }

  const sessionKey = `session:${subscriber}:${book}`;
  const raw = await redis.get(sessionKey);
  if (!raw) {
    return res.status(404).json({ error: 'Session not found' });
  }

  const sessionData = typeof raw === 'string' ? JSON.parse(raw) : raw;

  // No active session — nothing to end
  if (!sessionData.active || !sessionData.session_start) {
    return res.status(200).json({
      remaining: sessionData.remaining,
      elapsed: 0,
      message: 'No active session',
    });
  }

  // Calculate elapsed time using server clock
  const elapsedMs = Date.now() - sessionData.session_start;
  let elapsedSeconds = Math.ceil(elapsedMs / 1000);

  // Cap at stale session timeout (don't charge more than 30 min)
  if (elapsedMs > STALE_SESSION_MS) {
    elapsedSeconds = Math.ceil(STALE_SESSION_MS / 1000);
  }

  // Deduct time
  sessionData.remaining = Math.max(0, sessionData.remaining - elapsedSeconds);
  sessionData.active = false;
  sessionData.session_start = null;
  sessionData.last_used = Date.now();

  await redis.set(sessionKey, JSON.stringify(sessionData), { ex: 90 * 24 * 60 * 60 });

  res.status(200).json({
    remaining: sessionData.remaining,
    elapsed: elapsedSeconds,
  });
}
