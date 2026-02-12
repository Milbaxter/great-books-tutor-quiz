# Deployment Instructions for Quiz Version

This branch (`onboarding-quiz-v1`) contains the new interactive quiz onboarding flow.

## What's New

- **`quiz.html`** - Standalone interactive quiz page
- **Modified `index.html`** - Updated hero section with "Find Your Perfect Books" CTA
- **`ONBOARDING_IMPROVEMENT_PLAN.md`** - Full strategy document
- **`vercel.json`** - Vercel configuration

## Deploy to Vercel (Easiest Method)

### Option 1: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `Milbaxter/30-books-30-days`
4. In the configuration:
   - **Framework Preset:** Other (it's just HTML/JS)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** Leave empty (no build needed)
   - **Output Directory:** Leave empty
   - **Branch:** Select `onboarding-quiz-v1`
5. Click "Deploy"

Vercel will automatically:
- Deploy your site
- Give you a URL like `https://great-books-tutor-quiz.vercel.app`
- Auto-deploy on every push to this branch

### Option 2: Via Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy (from project directory)
cd ~/clawd/30-books-30-days
vercel --prod
```

## Testing the Quiz

Once deployed, visit:
- **Quiz page:** `https://your-url.vercel.app/quiz.html`
- **Main page:** `https://your-url.vercel.app/` (now has "Find Your Perfect Books" button)

## How It Works

1. User lands on site
2. Clicks "📖 Find Your Perfect Books" in hero
3. Takes 5-question quiz (2-3 minutes):
   - What brings you here?
   - Which topics interest you? (select up to 3)
   - How much time can you dedicate?
   - What's your reading background?
   - What's your email?
4. Sees personalized results:
   - 8 recommended books based on their topics
   - Recommended pricing plan based on time commitment
   - "Get Started" CTA to pricing section

## Next Steps for Full Implementation

The current version is a static frontend proof-of-concept. To make it production-ready:

### 1. Email Capture Backend
Add email submission to your email service provider:
```javascript
// In quiz.html, replace submitQuiz() with:
async function submitQuiz() {
  try {
    await fetch('YOUR_EMAIL_API_ENDPOINT', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quizData)
    });
    nextStep();
    displayResults();
  } catch (error) {
    console.error('Error submitting quiz:', error);
  }
}
```

Recommended services:
- **ConvertKit** (best for email marketing)
- **Mailchimp** (popular, easy)
- **Resend** (modern, developer-friendly)

### 2. Analytics Tracking
Add events to track:
- Quiz started
- Each step completed
- Email captured
- Results viewed
- CTA clicked

Example (Google Analytics):
```javascript
gtag('event', 'quiz_started');
gtag('event', 'quiz_completed', { email: quizData.email });
```

### 3. A/B Testing
Test variations:
- Quiz length (3 vs 5 vs 7 questions)
- Email capture timing (before vs after results)
- CTA copy ("Get Started" vs "Start My Trial")

### 4. Email Nurture Sequence
Set up automated emails:
- Day 0: "Your personalized recommendations"
- Day 1: Deep dive on their #1 book
- Day 3: Social proof + testimonials
- Day 7: Discount code + urgency

## Files Changed

```
onboarding-quiz-v1/
├── quiz.html                           (NEW - standalone quiz page)
├── index.html                          (MODIFIED - new hero CTA)
├── vercel.json                         (NEW - deployment config)
├── ONBOARDING_IMPROVEMENT_PLAN.md      (NEW - full strategy)
└── DEPLOYMENT.md                       (NEW - this file)
```

## Cost Estimate

**Current Implementation:** $0 (static frontend only)

**With Full Backend:**
- Email service: $0-50/mo (free tiers available)
- Vercel hosting: $0 (hobby plan covers this easily)
- Analytics: $0 (Google Analytics free)

**Total:** $0-50/mo

## Performance Impact

- Quiz page size: ~21KB (minimal)
- No external dependencies (vanilla JS)
- Loads instantly
- Mobile responsive

## Browser Compatibility

Tested and working:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS/Android)

## Questions?

Email: maximilian.rehn@gmail.com
