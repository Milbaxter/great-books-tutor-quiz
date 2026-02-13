import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// Per-book agent IDs — add more as agents are created
const BOOK_AGENTS = {
  'mans-search-for-meaning': 'agent_8801kh54rqykf3han31mceg4x659',
};

const ALL_BOOKS = [
  { slug: 'mans-search-for-meaning', title: "Man's Search for Meaning", author: 'Viktor E. Frankl', number: 1 },
  { slug: 'atomic-habits', title: 'Atomic Habits', author: 'James Clear', number: 2 },
  { slug: 'the-little-prince', title: 'The Little Prince', author: 'Antoine de Saint-Exupery', number: 3 },
  { slug: 'when-things-fall-apart', title: 'When Things Fall Apart', author: 'Pema Chodron', number: 4 },
  { slug: 'the-success-principles', title: 'The Success Principles', author: 'Jack Canfield', number: 5 },
  { slug: 'tao-te-ching', title: 'Tao Te Ching', author: 'Lao Tzu', number: 6 },
  { slug: 'the-richest-man-in-babylon', title: 'The Richest Man in Babylon', author: 'George S. Clason', number: 7 },
  { slug: 'the-total-money-makeover', title: 'The Total Money Makeover', author: 'Dave Ramsey', number: 8 },
  { slug: 'daring-greatly', title: 'Daring Greatly', author: 'Brene Brown', number: 9 },
  { slug: 'the-5-love-languages', title: 'The 5 Love Languages', author: 'Gary Chapman', number: 10 },
  { slug: 'the-magic-of-thinking-big', title: 'The Magic of Thinking Big', author: 'David J. Schwartz', number: 11 },
  { slug: 'boundaries', title: 'Boundaries', author: 'Henry Cloud & John Townsend', number: 12 },
  { slug: 'deep-work', title: 'Deep Work', author: 'Cal Newport', number: 13 },
  { slug: 'how-to-win-friends-and-influence-people', title: 'How to Win Friends and Influence People', author: 'Dale Carnegie', number: 14 },
  { slug: 'think-and-grow-rich', title: 'Think and Grow Rich', author: 'Napoleon Hill', number: 15 },
  { slug: 'thinking-fast-and-slow', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', number: 16 },
  { slug: 'outliers', title: 'Outliers', author: 'Malcolm Gladwell', number: 17 },
  { slug: 'the-art-of-happiness', title: 'The Art of Happiness', author: 'Dalai Lama XIV', number: 18 },
  { slug: 'the-willpower-instinct', title: 'The Willpower Instinct', author: 'Kelly McGonigal', number: 19 },
  { slug: 'the-four-agreements', title: 'The Four Agreements', author: 'Don Miguel Ruiz', number: 20 },
  { slug: 'awaken-the-giant-within', title: 'Awaken the Giant Within', author: 'Tony Robbins', number: 21 },
  { slug: 'the-power-of-positive-thinking', title: 'The Power of Positive Thinking', author: 'Norman Vincent Peale', number: 22 },
  { slug: 'the-power-of-now', title: 'The Power of Now', author: 'Eckhart Tolle', number: 23 },
  { slug: 'the-7-habits-of-highly-effective-people', title: 'The 7 Habits of Highly Effective People', author: 'Stephen R. Covey', number: 24 },
  { slug: 'creative-visualization', title: 'Creative Visualization', author: 'Shakti Gawain', number: 25 },
  { slug: 'wherever-you-go-there-you-are', title: 'Wherever You Go, There You Are', author: 'Jon Kabat-Zinn', number: 26 },
  { slug: 'the-power-of-habit', title: 'The Power of Habit', author: 'Charles Duhigg', number: 27 },
  { slug: 'grit', title: 'Grit', author: 'Angela Duckworth', number: 28 },
  { slug: 'rich-dad-poor-dad', title: 'Rich Dad, Poor Dad', author: 'Robert T. Kiyosaki', number: 29 },
  { slug: 'quiet', title: 'Quiet', author: 'Susan Cain', number: 30 },
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subscriber } = req.query;

  if (!subscriber || !/^[a-f0-9]{12}$/.test(subscriber)) {
    return res.status(400).json({ error: 'Invalid subscriber token' });
  }

  const subRaw = await redis.get(`subscriber:${subscriber}`);
  if (!subRaw) {
    return res.status(404).json({ error: 'Subscriber not found' });
  }

  const subData = typeof subRaw === 'string' ? JSON.parse(subRaw) : subRaw;
  const booksUsed = subData.books_used || [];

  // Check each book's session status
  const bookStatuses = await Promise.all(
    ALL_BOOKS.map(async (book) => {
      const hasAgent = !!BOOK_AGENTS[book.slug];

      if (!hasAgent) {
        return { ...book, status: 'locked', remaining: 0 };
      }

      const sessionRaw = await redis.get(`session:${subscriber}:${book.slug}`);
      if (!sessionRaw) {
        // Not started yet
        if (booksUsed.length >= subData.books_limit && !booksUsed.includes(book.slug)) {
          return { ...book, status: 'limit_reached', remaining: 0 };
        }
        return { ...book, status: 'available', remaining: 1800 };
      }

      const sessionData = typeof sessionRaw === 'string' ? JSON.parse(sessionRaw) : sessionRaw;

      if (sessionData.remaining <= 0) {
        return { ...book, status: 'completed', remaining: 0 };
      }

      return { ...book, status: 'in_progress', remaining: sessionData.remaining };
    })
  );

  res.status(200).json({
    subscriber: {
      tier: subData.tier,
      books_limit: subData.books_limit,
      books_used: booksUsed.length,
      active: subData.active,
    },
    books: bookStatuses,
  });
}
