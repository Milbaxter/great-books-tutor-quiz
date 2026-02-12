# 30 Books in 30 Days — Product Spec

## Product Overview

A 30-day self-improvement challenge where users get a daily AI-powered voice conversation with an "expert" on one of the 30 greatest self-help books. Each session is a 30-minute deep dive: the agent explains the book's core ideas, discusses them with the user, and verifies comprehension through questions.

**One-liner:** "30 great books. 30 days. 30 minutes a day. $5/book."

## How It Works

1. User purchases the challenge ($149)
2. Immediately receives an email with their Day 1 ElevenLabs agent link
3. Every 24 hours after purchase, a new email arrives with the next book's agent link
4. User clicks the link and has a voice conversation (up to 30 minutes) with an AI expert on that day's book
5. After 30 days, the user has completed the challenge

## Pricing

| Package | Price | Per Book | Notes |
|---------|-------|----------|-------|
| 7-Day Trial | $42 | ~$6/book | First 7 books. Customer acquisition tool. |
| 30-Day Challenge | $149 | ~$5/book | The core product. |

### Pricing page framing
- Lead with **$5/book** (large) — "less than the price of the actual book"
- Show ~~$15/book~~ crossed out to anchor against real book prices
- Total price ($149) shown secondary
- "Less than a coffee for a 30-minute deep dive with an expert"

### Unit Economics (30-Day Challenge)

- ElevenLabs cost: $0.10/min
- Max cost per session: 30 min x $0.10 = $3.00
- Max cost per user (30 days): $90
- Expected real usage (~60-70% of cap): $55-$65
- Revenue: $149
- **Expected margin: ~57-63%**

## Session Mechanics

- **Duration:** 30-minute hard cap per session. Session ends at 30 minutes.
- **Pacing:** One new book per day, delivered every 24 hours from time of purchase.
- **Access window:** The link is available for 24 hours until the next book arrives. No replays.
- **Modality:** Voice conversation via ElevenLabs conversational agent.
- **No rollover:** Unused minutes do not carry over.

### Conversation Structure

Each agent session should follow this approximate flow:

1. **Introduction (2-3 min):** Greet the user, introduce the book, the author, and why this book matters.
2. **Core Ideas (10-15 min):** Walk through the 3-5 most important concepts from the book. Use examples, analogies, and stories from the book.
3. **Discussion (5-10 min):** Ask the user how these ideas connect to their own life. Encourage reflection.
4. **Comprehension Check (5-8 min):** Ask 3-5 questions to verify the user understood the key takeaways. Provide gentle correction if needed.
5. **Wrap-up (2-3 min):** Summarize the session, give one actionable takeaway to apply today.

## Book List

30-day self-help curriculum, ordered by Goodreads rating:

| Day | Book | Author |
|-----|------|--------|
| 1 | Man's Search for Meaning | Viktor E. Frankl |
| 2 | Atomic Habits | James Clear |
| 3 | The Little Prince | Antoine de Saint-Exupery |
| 4 | When Things Fall Apart | Pema Chodron |
| 5 | The Success Principles | Jack Canfield |
| 6 | Tao Te Ching | Lao Tzu |
| 7 | The Richest Man in Babylon | George S. Clason |
| 8 | The Total Money Makeover | Dave Ramsey |
| 9 | Daring Greatly | Brene Brown |
| 10 | The 5 Love Languages | Gary Chapman |
| 11 | The Magic of Thinking Big | David J. Schwartz |
| 12 | Boundaries | Henry Cloud & John Townsend |
| 13 | Deep Work | Cal Newport |
| 14 | How to Win Friends and Influence People | Dale Carnegie |
| 15 | Think and Grow Rich | Napoleon Hill |
| 16 | Thinking, Fast and Slow | Daniel Kahneman |
| 17 | Outliers | Malcolm Gladwell |
| 18 | The Art of Happiness | Dalai Lama XIV |
| 19 | The Willpower Instinct | Kelly McGonigal |
| 20 | The Four Agreements | Don Miguel Ruiz |
| 21 | Awaken the Giant Within | Tony Robbins |
| 22 | The Power of Positive Thinking | Norman Vincent Peale |
| 23 | The Power of Now | Eckhart Tolle |
| 24 | The 7 Habits of Highly Effective People | Stephen R. Covey |
| 25 | Creative Visualization | Shakti Gawain |
| 26 | Wherever You Go, There You Are | Jon Kabat-Zinn |
| 27 | The Power of Habit | Charles Duhigg |
| 28 | Grit | Angela Duckworth |
| 29 | Rich Dad, Poor Dad | Robert T. Kiyosaki |
| 30 | Quiet | Susan Cain |

## Agent Design

Each day's agent is a distinct persona — an "expert" who has deeply studied that day's book.

### Agent persona guidelines
- Warm, conversational, encouraging tone — like a smart friend who just read this book and is excited to tell you about it
- Not academic or lecturing. Conversational.
- Adapts to the user's level — if they already know concepts, go deeper. If they're new, keep it accessible.
- Uses concrete examples and stories from the book, not just abstract concepts
- Asks open-ended questions to drive discussion, not just yes/no

### Knowledge base
- Each agent is pre-loaded with a comprehensive knowledge base for its specific book: key concepts, notable quotes, chapter summaries, author background, common criticisms, and connections to other books in the series.

## Delivery Mechanism

- **Channel:** Email
- **Trigger:** First email sent immediately upon purchase. Subsequent emails every 24 hours from purchase time.
- **Email contents:**
  - Day number and book title ("Day 14: How to Win Friends and Influence People")
  - Brief teaser (1-2 sentences about why this book matters)
  - Link to the ElevenLabs agent session
  - Progress indicator ("14 of 30 complete")
- **Scheduling:** Individual timelines — each user's 30 days starts when they purchase. No cohorts.

## Virality & Growth

- **Completion certificate:** Shareable image/card at day 30 ("I completed the 30 Books in 30 Days challenge")
- **Progress sharing:** Daily "Day X/30" shareable cards
- **Gifting:** Dedicated "Gift this challenge" purchase flow. Recipient gets a personalized email with the sender's name.
- **Referral:** Users who complete the challenge get a discount code to share

## Future Expansion

- **Themed packs:** "30 Philosophy Classics," "30 Business Books," "30 Sci-Fi Masterpieces"
- **100-book prestige tier:** For superfans who complete multiple 30-day packs
- **Text mode:** Lower-cost text chat option as a cheaper tier
- **Replay pass:** Paid add-on to revisit completed sessions
- **Spaced repetition:** Brief 5-min review sessions that revisit earlier books

## Tech Stack

- **AI agent:** ElevenLabs Conversational AI
- **Payments:** Stripe
- **Email delivery:** TBD (SendGrid, Resend, or similar)
- **Landing page / marketing site:** TBD
- **User management & scheduling:** TBD (lightweight backend to track purchases, schedule emails, manage access)

## Success Metrics

- **Completion rate:** % of users who finish all 30 days (target: >40%)
- **Daily engagement:** % of users who use their link each day
- **Average session length:** Target 15-20 min (indicates real engagement, not just clicking)
- **Gift purchases:** % of revenue from gifts
- **Referral rate:** % of new users from referral codes
- **NPS:** Target >50
