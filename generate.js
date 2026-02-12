#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ─── Helpers ───────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeJsonLd(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

// ─── Read data ─────────────────────────────────────────────────────────────────

const ROOT = __dirname;
const dataPath = path.join(ROOT, 'data', 'books.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const books = data.books;
const topics = data.topics;
const SITE = 'https://greatest-book-tutor.com';

// ─── Shared CSS (inline) ───────────────────────────────────────────────────────

function sharedCSS() {
  return `
    *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif;
      color: #1a1a1a;
      background: #fafafa;
      line-height: 1.7;
      -webkit-font-smoothing: antialiased;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* ---- NAV ---- */
    nav {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 100;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid #eee;
      padding: 0 24px;
    }

    nav .nav-inner {
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 56px;
    }

    nav .nav-logo {
      font-size: 0.95rem;
      font-weight: 700;
      color: #111;
      text-decoration: none;
    }

    nav .nav-links {
      display: flex;
      gap: 28px;
      list-style: none;
    }

    nav .nav-links a {
      font-size: 0.9rem;
      font-weight: 500;
      color: #555;
      text-decoration: none;
      transition: color 0.2s;
    }

    nav .nav-links a:hover {
      color: #2563eb;
    }

    /* ---- HERO ---- */
    .hero {
      text-align: center;
      padding: 120px 24px 80px;
      background: #fff;
      border-bottom: 1px solid #eee;
    }

    .hero h1 {
      font-size: 3rem;
      font-weight: 800;
      letter-spacing: -1.5px;
      line-height: 1.15;
      margin-bottom: 24px;
      color: #111;
    }

    .hero .hero-desc {
      font-size: 1.15rem;
      color: #555;
      max-width: 600px;
      margin: 0 auto 36px;
      line-height: 1.7;
    }

    .book-meta {
      font-size: 1rem;
      color: #555;
      margin-bottom: 20px;
    }

    /* ---- CTA ---- */
    .cta-btn {
      display: inline-block;
      background: #2563eb;
      color: #fff;
      padding: 16px 40px;
      border-radius: 8px;
      text-decoration: none;
      font-size: 1.1rem;
      font-weight: 600;
      transition: background 0.2s;
    }

    .cta-btn:hover {
      background: #1d4ed8;
    }

    /* ---- SECTIONS ---- */
    section {
      padding: 80px 24px;
    }

    .section-inner {
      max-width: 800px;
      margin: 0 auto;
    }

    .section-label {
      text-transform: uppercase;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 2px;
      color: #2563eb;
      margin-bottom: 12px;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: -0.5px;
      margin-bottom: 20px;
      color: #111;
    }

    h3 {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 10px;
      color: #111;
    }

    p {
      margin-bottom: 16px;
    }

    a {
      color: #2563eb;
      text-decoration: none;
    }

    a:hover {
      color: #1d4ed8;
    }

    /* ---- BREADCRUMB ---- */
    .breadcrumb {
      padding: 72px 24px 0;
      font-size: 0.9rem;
      color: #777;
      max-width: 800px;
      margin: 0 auto;
    }

    .breadcrumb a {
      color: #2563eb;
      text-decoration: none;
    }

    .breadcrumb a:hover {
      text-decoration: underline;
    }

    /* ---- SUMMARY / CONTENT SECTIONS ---- */
    .content-section {
      background: #fff;
    }

    .content-section:nth-child(even) {
      background: #f8f9fb;
    }

    .content-section .section-inner p {
      font-size: 1.05rem;
      color: #333;
      line-height: 1.8;
    }

    /* ---- CONCEPT CARDS ---- */
    .concept-card {
      padding: 24px;
      background: #f8f9fb;
      border-radius: 12px;
      border: 1px solid #eee;
      margin-bottom: 20px;
    }

    .concept-card h3 {
      margin-bottom: 8px;
    }

    .concept-card p {
      font-size: 0.95rem;
      color: #333;
    }

    /* ---- BLOCKQUOTES ---- */
    blockquote {
      border-left: 4px solid #2563eb;
      padding-left: 20px;
      font-style: italic;
      color: #555;
      margin: 16px 0;
      line-height: 1.7;
    }

    blockquote .attribution {
      display: block;
      margin-top: 8px;
      font-style: normal;
      font-size: 0.85rem;
      color: #777;
    }

    /* ---- TAKEAWAYS ---- */
    ol.takeaways {
      padding-left: 24px;
    }

    ol.takeaways li {
      font-size: 1.05rem;
      color: #333;
      padding: 8px 0;
      line-height: 1.7;
    }

    /* ---- AUTHOR BIO ---- */
    .author-section p {
      font-size: 1.05rem;
      color: #333;
      line-height: 1.8;
    }

    /* ---- BOOK CTA ---- */
    .book-cta {
      text-align: center;
      background: #f8f9fb;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }

    .book-cta h2 {
      margin-bottom: 16px;
    }

    .book-cta p {
      font-size: 1.1rem;
      color: #555;
      max-width: 540px;
      margin: 0 auto 32px;
    }

    /* ---- FAQ ---- */
    .faq-list {
      max-width: 680px;
      margin: 40px auto 0;
    }

    .faq-item {
      border-bottom: 1px solid #e5e7eb;
      padding: 24px 0;
    }

    .faq-item:first-child {
      border-top: 1px solid #e5e7eb;
    }

    .faq-q {
      font-size: 1.05rem;
      font-weight: 700;
      margin-bottom: 8px;
      color: #111;
    }

    .faq-a {
      font-size: 0.95rem;
      color: #555;
      line-height: 1.7;
    }

    /* ---- RELATED BOOKS ---- */
    .related-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 20px;
      margin-top: 24px;
    }

    .related-card {
      display: block;
      padding: 24px;
      background: #f8f9fb;
      border-radius: 12px;
      border: 1px solid #eee;
      text-decoration: none;
      color: inherit;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .related-card:hover {
      border-color: #2563eb;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
    }

    .related-card h3 {
      font-size: 1rem;
      font-weight: 700;
      color: #111;
      margin-bottom: 4px;
    }

    .related-card .related-author {
      font-size: 0.85rem;
      color: #777;
    }

    /* ---- TOPIC LINKS ---- */
    .topic-links {
      padding: 20px 24px;
      font-size: 0.95rem;
      text-align: center;
      color: #555;
      max-width: 800px;
      margin: 0 auto;
    }

    .topic-links a {
      color: #2563eb;
      text-decoration: none;
    }

    .topic-links a:hover {
      text-decoration: underline;
    }

    /* ---- TOPIC PAGE BOOK CARDS ---- */
    .topic-book-card {
      padding: 28px;
      background: #fff;
      border-radius: 12px;
      border: 1px solid #eee;
      margin-bottom: 24px;
    }

    .topic-book-card h3 {
      margin-bottom: 4px;
    }

    .topic-book-card h3 a {
      color: #111;
      text-decoration: none;
    }

    .topic-book-card h3 a:hover {
      color: #2563eb;
    }

    .topic-book-card .card-author {
      font-size: 0.9rem;
      color: #777;
      margin-bottom: 12px;
    }

    .topic-book-card .card-desc {
      font-size: 0.95rem;
      color: #333;
      margin-bottom: 12px;
    }

    /* ---- RELATED TOPICS ---- */
    .related-topics {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 24px;
    }

    .related-topic-link {
      display: inline-block;
      padding: 10px 20px;
      background: #f8f9fb;
      border: 1px solid #eee;
      border-radius: 8px;
      color: #2563eb;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 600;
      transition: border-color 0.2s, background 0.2s;
    }

    .related-topic-link:hover {
      border-color: #2563eb;
      background: #eff6ff;
    }

    /* ---- FOOTER ---- */
    footer {
      text-align: center;
      padding: 40px 24px;
      font-size: 0.85rem;
      color: #aaa;
      background: #fafafa;
      border-top: 1px solid #eee;
    }

    footer a {
      color: #777;
      text-decoration: none;
    }

    footer a:hover {
      color: #2563eb;
    }

    /* ---- RESPONSIVE ---- */
    @media (max-width: 768px) {
      nav .nav-links {
        gap: 18px;
      }

      nav .nav-links a {
        font-size: 0.82rem;
      }

      nav .nav-logo {
        font-size: 0.85rem;
      }

      .hero {
        padding: 92px 20px 60px;
      }

      .hero h1 {
        font-size: 2.2rem;
      }

      h2 {
        font-size: 1.6rem;
      }

      section {
        padding: 60px 20px;
      }

      .related-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .hero h1 {
        font-size: 1.8rem;
      }

      .cta-btn {
        padding: 14px 32px;
        font-size: 1rem;
      }
    }
  `;
}

// ─── Shared HTML fragments ─────────────────────────────────────────────────────

function faviconLink() {
  return `<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📖</text></svg>">`;
}

function navHTML() {
  return `
  <nav>
    <div class="nav-inner">
      <a href="/" class="nav-logo">Great Books Tutor</a>
      <ul class="nav-links">
        <li><a href="/#pricing">Pricing</a></li>
        <li><a href="/#faq">FAQ</a></li>
        <li><a href="/#contact">Contact</a></li>
      </ul>
    </div>
  </nav>`;
}

function footerHTML() {
  return `
  <footer>
    <p>&copy; 2026 Great Books Tutor. All rights reserved.</p>
    <p style="margin-top:8px;"><a href="/#contact">Contact</a> &middot; <a href="https://x.com/wizard_mili" target="_blank" rel="noopener">X</a></p>
  </footer>`;
}

// ─── Book page generator ───────────────────────────────────────────────────────

function buildBookLookup() {
  const lookup = {};
  for (const book of books) {
    lookup[book.slug] = book;
  }
  return lookup;
}

function findTopicsForBook(bookSlug) {
  const result = [];
  for (const topic of topics) {
    if (topic.books && topic.books.includes(bookSlug)) {
      result.push(topic);
    }
  }
  return result;
}

function generateBookPage(book) {
  const bookLookup = buildBookLookup();
  const bookTopics = findTopicsForBook(book.slug);

  // Summary paragraphs
  const summaryParagraphs = book.summary
    .split('\n\n')
    .filter(p => p.trim())
    .map(p => `<p>${escapeHtml(p.trim())}</p>`)
    .join('\n          ');

  // Key concepts
  const conceptsHTML = book.keyConcepts
    .map(c => `
          <div class="concept-card">
            <h3>${escapeHtml(c.title)}</h3>
            <p>${escapeHtml(c.description)}</p>
            ${c.quote ? `<blockquote>${escapeHtml(c.quote)}</blockquote>` : ''}
          </div>`)
    .join('');

  // Notable quotes
  const quotesHTML = book.notableQuotes
    .map(q => `
          <blockquote>
            <p>${escapeHtml(q.text)}</p>
            <span class="attribution">&mdash; ${escapeHtml(book.author)}${q.context ? ', ' + escapeHtml(q.context) : ''}</span>
          </blockquote>`)
    .join('');

  // Key takeaways
  const takeawaysHTML = book.keyTakeaways
    .map(t => `<li>${escapeHtml(t)}</li>`)
    .join('\n            ');

  // FAQ
  const faqHTML = book.faq
    .map(f => `
          <div class="faq-item">
            <div class="faq-q"><h3 style="font-size:1.05rem;margin:0;">${escapeHtml(f.question)}</h3></div>
            <div class="faq-a"><p style="margin:0;">${escapeHtml(f.answer)}</p></div>
          </div>`)
    .join('');

  // FAQ JSON-LD
  const faqJsonLd = book.faq
    .map(f => `{
          "@type": "Question",
          "name": "${escapeJsonLd(f.question)}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "${escapeJsonLd(f.answer)}"
          }
        }`)
    .join(',\n        ');

  // Related books
  const relatedHTML = book.relatedBooks
    .map(slug => {
      const rel = bookLookup[slug];
      if (!rel) return '';
      return `
          <a href="/books/${escapeHtml(rel.slug)}/" class="related-card">
            <h3>${escapeHtml(rel.title)}</h3>
            <span class="related-author">${escapeHtml(rel.author)}</span>
          </a>`;
    })
    .filter(Boolean)
    .join('');

  // Topic links
  const topicLinksHTML = bookTopics.length > 0
    ? `
  <div class="topic-links">
    This book appears in: ${bookTopics.map(t => `<a href="/topics/${escapeHtml(t.slug)}/">${escapeHtml(t.name)}</a>`).join(' &middot; ')}
  </div>`
    : '';

  const canonicalUrl = `${SITE}/books/${book.slug}/`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(book.metaTitle)}</title>
  <meta name="description" content="${escapeHtml(book.metaDescription)}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="${escapeHtml(book.metaTitle)}">
  <meta property="og:description" content="${escapeHtml(book.metaDescription)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(book.metaTitle)}">
  <meta name="twitter:description" content="${escapeHtml(book.metaDescription)}">
  ${faviconLink()}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": "${escapeJsonLd(book.title)}",
    "author": {
      "@type": "Person",
      "name": "${escapeJsonLd(book.author)}"
    },
    "datePublished": "${escapeJsonLd(String(book.yearPublished))}",
    "numberOfPages": ${book.pages},
    "description": "${escapeJsonLd(book.metaDescription)}",
    "publisher": ${book.publisher ? `{
      "@type": "Organization",
      "name": "${escapeJsonLd(book.publisher)}"
    }` : 'null'}
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "${SITE}/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Books",
        "item": "${SITE}/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "${escapeJsonLd(book.title)}",
        "item": "${canonicalUrl}"
      }
    ]
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        ${faqJsonLd}
    ]
  }
  </script>
  <style>${sharedCSS()}</style>
</head>
<body>

  ${navHTML()}

  <div class="breadcrumb">
    <a href="/">Home</a> &rsaquo; <a href="/">Books</a> &rsaquo; ${escapeHtml(book.title)}
  </div>

  <!-- HERO -->
  <section class="hero">
    <div class="container">
      <h1>${escapeHtml(book.title)} Summary &amp; Key Takeaways</h1>
      <p class="book-meta">By ${escapeHtml(book.author)} &middot; ${escapeHtml(String(book.yearPublished))} &middot; ${escapeHtml(String(book.pages))} pages</p>
      <p class="hero-desc">${escapeHtml(book.heroDescription)}</p>
      <a href="/#pricing" class="cta-btn">Learn This Book With a Tutor</a>
    </div>
  </section>

  <!-- SUMMARY -->
  <section class="content-section">
    <div class="section-inner">
      <h2>Summary of ${escapeHtml(book.title)}</h2>
      ${summaryParagraphs}
    </div>
  </section>

  <!-- KEY CONCEPTS -->
  <section class="content-section" style="background:#f8f9fb;">
    <div class="section-inner">
      <h2>Key Concepts</h2>
      ${conceptsHTML}
    </div>
  </section>

  <!-- NOTABLE QUOTES -->
  <section class="content-section">
    <div class="section-inner">
      <h2>Notable Quotes from ${escapeHtml(book.title)}</h2>
      ${quotesHTML}
    </div>
  </section>

  <!-- KEY TAKEAWAYS -->
  <section class="content-section" style="background:#f8f9fb;">
    <div class="section-inner">
      <h2>Key Takeaways</h2>
      <ol class="takeaways">
        ${takeawaysHTML}
      </ol>
    </div>
  </section>

  <!-- ABOUT THE AUTHOR -->
  <section class="content-section author-section">
    <div class="section-inner">
      <h2>About ${escapeHtml(book.author)}</h2>
      <p>${escapeHtml(book.authorBio)}</p>
    </div>
  </section>

  <!-- CTA -->
  <section class="book-cta">
    <div class="container">
      <h2>Learn ${escapeHtml(book.title)} Through Conversation</h2>
      <p>Have an AI tutor walk you through the key ideas, discuss them with you, and help you truly understand this book&mdash;all in a single voice conversation.</p>
      <a href="/#pricing" class="cta-btn">Get Started</a>
    </div>
  </section>

  <!-- FAQ -->
  <section class="content-section" style="background:#fff;">
    <div class="section-inner">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-list">
        ${faqHTML}
      </div>
    </div>
  </section>

  <!-- RELATED BOOKS -->
  <section class="content-section" style="background:#f8f9fb;">
    <div class="section-inner">
      <h2>Related Books</h2>
      <div class="related-grid">
        ${relatedHTML}
      </div>
    </div>
  </section>

  ${topicLinksHTML}

  ${footerHTML()}

</body>
</html>`;
}

// ─── Topic page generator ──────────────────────────────────────────────────────

function generateTopicPage(topic) {
  const bookLookup = buildBookLookup();
  const canonicalUrl = `${SITE}/topics/${topic.slug}/`;

  // Book cards
  const bookCardsHTML = topic.books
    .map(slug => {
      const book = bookLookup[slug];
      if (!book) return '';
      const firstQuote = book.notableQuotes && book.notableQuotes.length > 0 ? book.notableQuotes[0] : null;
      return `
          <div class="topic-book-card">
            <h3><a href="/books/${escapeHtml(book.slug)}/">${escapeHtml(book.title)}</a></h3>
            <p class="card-author">By ${escapeHtml(book.author)}</p>
            <p class="card-desc">${escapeHtml(book.heroDescription)}</p>
            ${firstQuote ? `<blockquote><p>${escapeHtml(firstQuote.text)}</p></blockquote>` : ''}
          </div>`;
    })
    .filter(Boolean)
    .join('');

  // ItemList JSON-LD
  const itemListEntries = topic.books
    .map((slug, i) => {
      const book = bookLookup[slug];
      if (!book) return '';
      return `{
          "@type": "ListItem",
          "position": ${i + 1},
          "name": "${escapeJsonLd(book.title)}",
          "url": "${SITE}/books/${slug}/"
        }`;
    })
    .filter(Boolean)
    .join(',\n        ');

  // Related topics (all other topics)
  const relatedTopicsHTML = topics
    .filter(t => t.slug !== topic.slug)
    .map(t => `<a href="/topics/${escapeHtml(t.slug)}/" class="related-topic-link">${escapeHtml(t.name)}</a>`)
    .join('\n          ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(topic.metaTitle)}</title>
  <meta name="description" content="${escapeHtml(topic.metaDescription)}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="${escapeHtml(topic.metaTitle)}">
  <meta property="og:description" content="${escapeHtml(topic.metaDescription)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(topic.metaTitle)}">
  <meta name="twitter:description" content="${escapeHtml(topic.metaDescription)}">
  ${faviconLink()}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "${escapeJsonLd(topic.name)}",
    "description": "${escapeJsonLd(topic.metaDescription)}",
    "numberOfItems": ${topic.books.length},
    "itemListElement": [
        ${itemListEntries}
    ]
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "${SITE}/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Topics",
        "item": "${SITE}/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "${escapeJsonLd(topic.name)}",
        "item": "${canonicalUrl}"
      }
    ]
  }
  </script>
  <style>${sharedCSS()}</style>
</head>
<body>

  ${navHTML()}

  <div class="breadcrumb">
    <a href="/">Home</a> &rsaquo; <a href="/">Topics</a> &rsaquo; ${escapeHtml(topic.name)}
  </div>

  <!-- HERO -->
  <section class="hero">
    <div class="container">
      <h1>Best Books About ${escapeHtml(topic.name)}</h1>
      <p class="hero-desc">${escapeHtml(topic.description)}</p>
    </div>
  </section>

  <!-- BOOK LIST -->
  <section class="content-section">
    <div class="section-inner">
      ${bookCardsHTML}
    </div>
  </section>

  <!-- CTA -->
  <section class="book-cta">
    <div class="container">
      <h2>Master These Books Through Conversation</h2>
      <p>Have an AI tutor walk you through each book&rsquo;s key ideas, discuss them with you, and help you truly understand&mdash;all through natural voice conversation.</p>
      <a href="/#pricing" class="cta-btn">Get Started</a>
    </div>
  </section>

  <!-- RELATED TOPICS -->
  <section class="content-section" style="background:#f8f9fb;">
    <div class="section-inner">
      <h2>Explore More Topics</h2>
      <div class="related-topics">
        ${relatedTopicsHTML}
      </div>
    </div>
  </section>

  ${footerHTML()}

</body>
</html>`;
}

// ─── Sitemap generator ─────────────────────────────────────────────────────────

function generateSitemap() {
  let urls = '';

  // Home
  urls += `  <url><loc>${SITE}/</loc><priority>1.0</priority></url>\n`;

  // Books
  for (const book of books) {
    urls += `  <url><loc>${SITE}/books/${book.slug}/</loc><priority>0.8</priority></url>\n`;
  }

  // Topics
  for (const topic of topics) {
    urls += `  <url><loc>${SITE}/topics/${topic.slug}/</loc><priority>0.7</priority></url>\n`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>`;
}

// ─── Main ──────────────────────────────────────────────────────────────────────

function main() {
  // Generate book pages
  for (const book of books) {
    const dir = path.join(ROOT, 'books', book.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = generateBookPage(book);
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  }
  console.log(`Generated ${books.length} book pages`);

  // Generate topic pages
  for (const topic of topics) {
    const dir = path.join(ROOT, 'topics', topic.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = generateTopicPage(topic);
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  }
  console.log(`Generated ${topics.length} topic pages`);

  // Generate sitemap
  const totalUrls = 1 + books.length + topics.length;
  const sitemap = generateSitemap();
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf-8');
  console.log(`Generated sitemap.xml with ${totalUrls} URLs`);

  console.log('Done!');
}

main();
