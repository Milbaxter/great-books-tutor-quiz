# Quick Start - View Your Quiz Version

## ✅ What's Done

I've created a new branch `onboarding-quiz-v1` with:

1. **Interactive Quiz** (`quiz.html`)
   - 5 questions (2-3 minutes to complete)
   - Personalized book recommendations
   - Recommended pricing plan
   - Email capture

2. **Updated Homepage** (`index.html`)
   - New CTA: "📖 Find Your Perfect Books"
   - Links directly to quiz

3. **Full Strategy** (`ONBOARDING_IMPROVEMENT_PLAN.md`)
   - Complete implementation plan
   - A/B testing roadmap
   - Expected 3-5x conversion improvement

## 🚀 Deploy to Vercel (2 minutes)

### Step 1: Go to Vercel
Visit [vercel.com/new](https://vercel.com/new)

### Step 2: Import Repository
- Click "Import Git Repository"
- Select: `Milbaxter/30-books-30-days`
- If not visible, authorize GitHub access

### Step 3: Configure
- **Project Name:** `great-books-tutor-quiz` (or whatever you prefer)
- **Framework:** Other
- **Root Directory:** `./`
- **Branch:** `onboarding-quiz-v1` ⚠️ IMPORTANT: Select this branch!
- **Build Settings:** Leave all empty (no build needed)

### Step 4: Deploy
Click "Deploy" - takes ~30 seconds

### Step 5: View
Vercel will give you a URL like:
- `https://great-books-tutor-quiz.vercel.app`

## 🎯 What to Test

### Main Page
`https://your-url.vercel.app/`
- Hero now has "📖 Find Your Perfect Books" button
- Click it to go to quiz

### Quiz Page
`https://your-url.vercel.app/quiz.html`
- Complete the 5 questions
- See personalized recommendations
- Check mobile responsiveness

## 📊 Key Features to Review

1. **Quiz Flow**
   - Is 5 questions the right length?
   - Are the questions clear?
   - Does the topic selection work well? (max 3)

2. **Results Page**
   - Do the book recommendations make sense?
   - Is the plan recommendation appropriate?
   - Clear path to pricing?

3. **Design**
   - Matches brand aesthetic?
   - Mobile friendly?
   - Loading speed good?

## 🔧 Easy Tweaks

If you want to adjust anything, the quiz logic is all in `quiz.html`:

**Change questions:** Lines 150-230
**Modify book database:** Lines 345-420
**Adjust plan recommendations:** Lines 550-570

All vanilla JavaScript - no build step needed!

## 📧 Next Step: Email Integration

Currently, the quiz captures emails but doesn't send them anywhere. To make it functional:

1. Choose email provider (ConvertKit, Mailchimp, Resend)
2. Get API key
3. Update `submitQuiz()` function in quiz.html (line 600)
4. Deploy update

I can help with this once you pick a provider.

## 🤔 Questions for You

1. **Design:** Does the quiz aesthetic work, or should it match the main site more closely?
2. **Length:** 5 questions good, or go shorter (3) or longer (7)?
3. **Email Provider:** What are you currently using? Or want recommendations?
4. **Custom Domain:** Want to connect `quiz.greatest-book-tutor.com` instead of Vercel subdomain?

## 📁 Files Created

```
onboarding-quiz-v1/
├── quiz.html                           ← Standalone quiz page
├── index.html                          ← Modified hero section
├── vercel.json                         ← Deployment config
├── ONBOARDING_IMPROVEMENT_PLAN.md      ← Full strategy doc
├── DEPLOYMENT.md                       ← Detailed deployment guide
└── QUICK_START.md                      ← This file
```

## Git Commands (if needed)

```bash
# View changes
git diff main..onboarding-quiz-v1

# Merge to main when ready
git checkout main
git merge onboarding-quiz-v1
git push

# Or create PR on GitHub
https://github.com/Milbaxter/30-books-30-days/pull/new/onboarding-quiz-v1
```

---

**Ready to deploy?** Just follow the 5 steps above. Takes ~2 minutes. Then send me the URL and I'll QA it! 🎉
