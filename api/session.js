import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const STALE_SESSION_MS = 30 * 60 * 1000; // 30 minutes
const SESSION_TIME = 1800; // 30 minutes in seconds

// Per-book agent IDs — add more as agents are created
const BOOK_AGENTS = {
  'mans-search-for-meaning': 'agent_8801kh54rqykf3han31mceg4x659',
  // 'atomic-habits': 'agent_...',
};

// Book metadata for display
const BOOK_TITLES = {
  'mans-search-for-meaning': "Man's Search for Meaning",
  'atomic-habits': 'Atomic Habits',
  'the-little-prince': 'The Little Prince',
  'when-things-fall-apart': 'When Things Fall Apart',
  'the-success-principles': 'The Success Principles',
  'tao-te-ching': 'Tao Te Ching',
  'the-richest-man-in-babylon': 'The Richest Man in Babylon',
  'the-total-money-makeover': 'The Total Money Makeover',
  'daring-greatly': 'Daring Greatly',
  'the-5-love-languages': 'The 5 Love Languages',
  'the-magic-of-thinking-big': 'The Magic of Thinking Big',
  'boundaries': 'Boundaries',
  'deep-work': 'Deep Work',
  'how-to-win-friends-and-influence-people': 'How to Win Friends and Influence People',
  'think-and-grow-rich': 'Think and Grow Rich',
  'thinking-fast-and-slow': 'Thinking, Fast and Slow',
  'outliers': 'Outliers',
  'the-art-of-happiness': 'The Art of Happiness',
  'the-willpower-instinct': 'The Willpower Instinct',
  'the-four-agreements': 'The Four Agreements',
  'awaken-the-giant-within': 'Awaken the Giant Within',
  'the-power-of-positive-thinking': 'The Power of Positive Thinking',
  'the-power-of-now': 'The Power of Now',
  'the-7-habits-of-highly-effective-people': 'The 7 Habits of Highly Effective People',
  'creative-visualization': 'Creative Visualization',
  'wherever-you-go-there-you-are': 'Wherever You Go, There You Are',
  'the-power-of-habit': 'The Power of Habit',
  'grit': 'Grit',
  'rich-dad-poor-dad': 'Rich Dad, Poor Dad',
  'quiet': 'Quiet',
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subscriber, book } = req.query;

  if (!subscriber || !/^[a-f0-9]{12}$/.test(subscriber)) {
    return res.status(400).json({ error: 'Invalid subscriber token' });
  }

  if (!book || !BOOK_TITLES[book]) {
    return res.status(400).json({ error: 'Invalid book slug' });
  }

  // Check if book has an agent
  const agentId = BOOK_AGENTS[book];
  if (!agentId) {
    return res.status(404).json({ error: 'Agent coming soon', book_title: BOOK_TITLES[book] });
  }

  // Validate subscriber
  const subRaw = await redis.get(`subscriber:${subscriber}`);
  if (!subRaw) {
    return res.status(404).json({ error: 'Subscriber not found' });
  }

  const subData = typeof subRaw === 'string' ? JSON.parse(subRaw) : subRaw;

  if (!subData.active) {
    return res.status(403).json({ error: 'Subscription is not active' });
  }

  // Check books_used limit
  const booksUsed = subData.books_used || [];
  if (!booksUsed.includes(book) && booksUsed.length >= subData.books_limit) {
    return res.status(403).json({
      error: 'Book limit reached for this billing cycle',
      books_used: booksUsed.length,
      books_limit: subData.books_limit,
    });
  }

  // Get or create per-book session
  const sessionKey = `session:${subscriber}:${book}`;
  let sessionRaw = await redis.get(sessionKey);
  let sessionData;

  if (!sessionRaw) {
    // Create new session for this book
    sessionData = {
      remaining: SESSION_TIME,
      active: false,
      session_start: null,
      agent_id: agentId,
    };
    await redis.set(sessionKey, JSON.stringify(sessionData), { ex: 90 * 24 * 60 * 60 });

    // Add book to books_used if not already there
    if (!booksUsed.includes(book)) {
      subData.books_used = [...booksUsed, book];
      await redis.set(`subscriber:${subscriber}`, JSON.stringify(subData), { ex: 90 * 24 * 60 * 60 });
    }
  } else {
    sessionData = typeof sessionRaw === 'string' ? JSON.parse(sessionRaw) : sessionRaw;
  }

  // Auto-expire stale sessions (browser crash, tab left open)
  if (sessionData.active && sessionData.session_start) {
    const elapsed = Date.now() - sessionData.session_start;
    if (elapsed > STALE_SESSION_MS) {
      const elapsedSeconds = Math.min(
        Math.ceil(elapsed / 1000),
        Math.ceil(STALE_SESSION_MS / 1000)
      );
      sessionData.remaining = Math.max(0, sessionData.remaining - elapsedSeconds);
      sessionData.active = false;
      sessionData.session_start = null;
      await redis.set(sessionKey, JSON.stringify(sessionData), { ex: 90 * 24 * 60 * 60 });
    }
  }

  // No time left
  if (sessionData.remaining <= 0) {
    return res.status(403).json({ error: 'No time remaining', remaining: 0 });
  }

  // Concurrent session prevention
  if (sessionData.active) {
    return res.status(409).json({
      error: 'Session already active on another device',
      remaining: sessionData.remaining,
    });
  }

  // Mark session as active
  sessionData.active = true;
  sessionData.session_start = Date.now();
  await redis.set(sessionKey, JSON.stringify(sessionData), { ex: 90 * 24 * 60 * 60 });

  // Generate ElevenLabs signed URL
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
      {
        method: 'GET',
        headers: { 'xi-api-key': ELEVENLABS_API_KEY },
      }
    );

    if (!response.ok) {
      throw new Error(`ElevenLabs API returned ${response.status}`);
    }

    const data = await response.json();

    res.status(200).json({
      signed_url: data.signed_url,
      remaining: sessionData.remaining,
      book_title: BOOK_TITLES[book],
      book_slug: book,
    });
  } catch (err) {
    // Rollback active state on failure
    sessionData.active = false;
    sessionData.session_start = null;
    await redis.set(sessionKey, JSON.stringify(sessionData), { ex: 90 * 24 * 60 * 60 });

    console.error('ElevenLabs signed URL error:', err);
    res.status(500).json({ error: 'Failed to start session' });
  }
}
