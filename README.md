# Great Books Tutor - Quiz Onboarding Version

**Live Demo:** [Deploy to see it live]

Interactive quiz-based onboarding for [greatest-book-tutor.com](https://greatest-book-tutor.com) designed to increase conversion rates through personalization.

## 🎯 What This Is

An improved version of the Great Books Tutor landing page that uses an **interactive quiz** to personalize the user experience before showing pricing.

**Key Addition:** 5-question quiz that captures user preferences and recommends the perfect books + pricing tier.

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Milbaxter/great-books-tutor-quiz)

### Manual Deploy (2 minutes):

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import this repository: `Milbaxter/great-books-tutor-quiz`
3. Framework: **Other**
4. Build settings: **Leave empty** (static HTML/JS)
5. Click **Deploy**

Done! You'll get a URL like `https://great-books-tutor-quiz.vercel.app`

## 📁 Key Files

- **`quiz.html`** - Interactive quiz page (5 questions, personalized results)
- **`index.html`** - Main landing page with updated hero CTA
- **`ONBOARDING_IMPROVEMENT_PLAN.md`** - Full strategy & implementation plan
- **`QUICK_START.md`** - Deployment guide
- **`DEPLOYMENT.md`** - Detailed technical docs

## 🧪 How It Works

### Current Flow (Original):
```
Landing → Browse Books → Pricing → Checkout
Conversion: ~2%
```

### New Flow (Quiz Version):
```
Landing → Quiz (5 questions) → Personalized Results → Pricing → Checkout
Expected Conversion: ~6-10% (3-5x improvement)
```

### Quiz Questions:
1. What brings you here? (motivation)
2. Which topics interest you? (select up to 3)
3. How much time can you dedicate? (determines plan recommendation)
4. What's your reading background? (personalization)
5. What's your email? (capture for nurture sequence)

### Results Page:
- **Personalized book list** (8 books matching selected topics)
- **Recommended pricing tier** (based on time commitment)
- **Clear CTA** to get started

## 💡 Why This Works

1. **Engagement before asking for money** - Users invest time in quiz, more likely to convert
2. **Email capture** - Even non-buyers become leads for nurture sequence
3. **Personalization** - Users see books that match their interests
4. **Social proof** - Recommendations feel tailored, not generic
5. **Reduced decision paralysis** - Clear recommendation vs. 3 pricing tiers

## 📊 Expected Impact

Based on industry benchmarks for quiz-based funnels:

| Metric | Current | With Quiz |
|--------|---------|-----------|
| Conversion Rate | 2% | 6-10% |
| Email Capture | 0% | 50%+ |
| Avg. Time on Site | ~2 min | ~5 min |
| Bounce Rate | 60%+ | 40%- |

**Conservative estimate:** 3x conversion improvement

## 🔧 Tech Stack

- **Frontend:** Pure HTML/CSS/JavaScript (no build step)
- **Backend:** None yet (static only)
- **Hosting:** Vercel (recommended)
- **Email:** Not integrated yet (see Next Steps)

## ✅ What's Included

- ✅ Interactive quiz UI (mobile responsive)
- ✅ Topic-to-book mapping algorithm
- ✅ Personalized results page
- ✅ Plan recommendation logic
- ✅ Email capture (frontend only)
- ✅ Updated hero section with quiz CTA
- ❌ Email backend integration (TODO)
- ❌ Analytics tracking (TODO)
- ❌ A/B testing setup (TODO)

## 🚧 Next Steps for Production

### 1. Email Integration
Connect to email service provider (ConvertKit, Mailchimp, Resend):

```javascript
// In quiz.html, update submitQuiz() function
async function submitQuiz() {
  await fetch('YOUR_EMAIL_API_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(quizData)
  });
  // ... rest of function
}
```

### 2. Analytics Tracking
Add Google Analytics or Plausible events:

```javascript
// Track quiz funnel
gtag('event', 'quiz_started');
gtag('event', 'quiz_step_completed', { step: 1 });
gtag('event', 'email_captured', { email: quizData.email });
gtag('event', 'quiz_completed');
```

### 3. Email Nurture Sequence
Set up automated emails (see `ONBOARDING_IMPROVEMENT_PLAN.md` for copy templates):
- Day 0: Your recommendations
- Day 1: Deep dive on top book
- Day 3: Social proof
- Day 7: Discount + urgency

### 4. A/B Testing
Test variations:
- Quiz length (3 vs 5 vs 7 questions)
- Email capture timing
- CTA copy
- Plan recommendations

## 📖 Full Documentation

- **[ONBOARDING_IMPROVEMENT_PLAN.md](./ONBOARDING_IMPROVEMENT_PLAN.md)** - Complete strategy, conversion projections, implementation roadmap
- **[QUICK_START.md](./QUICK_START.md)** - Fast deployment guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Detailed technical setup
- **[SPEC.md](./SPEC.md)** - Original product spec

## 🎨 Customization

All quiz logic is in `quiz.html` (vanilla JS):

**Change questions:** Lines 150-230  
**Modify book database:** Lines 345-420  
**Adjust plan logic:** Lines 550-570  

No build step needed - just edit and deploy!

## 📱 Mobile Support

Fully responsive design:
- ✅ Touch-friendly quiz options
- ✅ Optimized for mobile screens
- ✅ Fast loading (<1s)
- ✅ No dependencies

## 🤝 Contributing

This is a standalone experiment/test version. For the main product, see: [30-books-30-days](https://github.com/Milbaxter/30-books-30-days)

## 📧 Contact

Questions or feedback?  
**Email:** maximilian.rehn@gmail.com  
**Twitter:** [@wizard_mili](https://x.com/wizard_mili)

## 📄 License

Same as original project.

---

**Ready to deploy?** Click the Vercel button at the top or follow the Quick Deploy steps above! 🚀
