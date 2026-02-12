const fs = require('fs');
const data = JSON.parse(fs.readFileSync(__dirname + '/books.json', 'utf8'));

data.topics = [
  {
    "name": "Habits & Productivity",
    "slug": "best-books-about-habits",
    "description": "Discover the best books about building better habits, increasing productivity, and developing the discipline to achieve your goals. These science-backed guides reveal how habits form, how to change them, and how to harness focused work to accomplish more in less time.",
    "metaTitle": "Best Books About Habits & Productivity | Great Books Tutor",
    "metaDescription": "Explore the best books about habits and productivity. From Atomic Habits to Deep Work, discover science-backed strategies for building better habits and getting more done.",
    "books": ["atomic-habits", "the-power-of-habit", "deep-work", "the-willpower-instinct", "grit", "the-7-habits-of-highly-effective-people"]
  },
  {
    "name": "Money & Wealth",
    "slug": "best-books-about-money",
    "description": "Explore the best books about money, wealth building, and financial independence. These timeless guides cover everything from fundamental money principles to advanced wealth-building strategies, helping you transform your relationship with money and build lasting financial security.",
    "metaTitle": "Best Books About Money & Wealth Building | Great Books Tutor",
    "metaDescription": "Discover the best books about money and wealth building. From Rich Dad Poor Dad to The Richest Man in Babylon, learn timeless financial principles and strategies.",
    "books": ["rich-dad-poor-dad", "the-richest-man-in-babylon", "the-total-money-makeover", "think-and-grow-rich", "the-success-principles"]
  },
  {
    "name": "Mindfulness & Presence",
    "slug": "best-books-about-mindfulness",
    "description": "Find the best books about mindfulness, meditation, and living in the present moment. These transformative guides teach you how to quiet the mind, reduce stress, and cultivate a deeper awareness that brings peace, clarity, and joy to everyday life.",
    "metaTitle": "Best Books About Mindfulness & Meditation | Great Books Tutor",
    "metaDescription": "Explore the best books about mindfulness and presence. From The Power of Now to Wherever You Go There You Are, discover guides to meditation and mindful living.",
    "books": ["the-power-of-now", "wherever-you-go-there-you-are", "when-things-fall-apart", "tao-te-ching", "the-art-of-happiness", "creative-visualization"]
  },
  {
    "name": "Relationships & Communication",
    "slug": "best-books-about-relationships",
    "description": "Discover the best books about relationships, communication, and connecting with others. These essential guides cover love languages, vulnerability, healthy boundaries, and the art of genuine human connection that transforms both personal and professional relationships.",
    "metaTitle": "Best Books About Relationships & Communication | Great Books Tutor",
    "metaDescription": "Explore the best books about relationships and communication. From The 5 Love Languages to How to Win Friends, master the art of meaningful human connection.",
    "books": ["the-5-love-languages", "how-to-win-friends-and-influence-people", "daring-greatly", "boundaries", "quiet"]
  },
  {
    "name": "Success & Mindset",
    "slug": "best-books-about-success",
    "description": "Explore the best books about success, achievement, and developing a winning mindset. These powerful guides reveal the mental frameworks, strategies, and habits that separate high achievers from everyone else, giving you the tools to reach your full potential.",
    "metaTitle": "Best Books About Success & Mindset | Great Books Tutor",
    "metaDescription": "Discover the best books about success and mindset. From Think and Grow Rich to Outliers, learn the principles and mental frameworks behind extraordinary achievement.",
    "books": ["think-and-grow-rich", "the-magic-of-thinking-big", "awaken-the-giant-within", "the-power-of-positive-thinking", "the-success-principles", "outliers", "grit"]
  },
  {
    "name": "Psychology & Self-Understanding",
    "slug": "best-books-about-psychology",
    "description": "Find the best books about psychology, self-understanding, and the human mind. These illuminating guides explore how we think, what drives our behavior, and how understanding ourselves more deeply leads to greater wisdom, compassion, and personal freedom.",
    "metaTitle": "Best Books About Psychology & Self-Understanding | Great Books Tutor",
    "metaDescription": "Explore the best books about psychology and self-understanding. From Thinking Fast and Slow to The Four Agreements, understand the mind and unlock personal growth.",
    "books": ["thinking-fast-and-slow", "mans-search-for-meaning", "the-four-agreements", "outliers", "quiet", "the-little-prince"]
  }
];

fs.writeFileSync(__dirname + '/books.json', JSON.stringify(data, null, 2));
console.log('Added', data.topics.length, 'topics. Total books:', data.books.length);
