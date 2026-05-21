# Triptych — Launch Kit

Drop-in copy for launch day. Replace `YOUR-URL` with your live URL (Netlify or custom domain) before posting. Replace `@yourhandle` with your handle.

---

## 1. Twitter / X — launch thread

**Tweet 1 (hook + link + image)**

> I built a tiny daily word puzzle.
>
> Three hidden words. One letter pool. Five attempts.
>
> Triptych → YOUR-URL

*Attach: `og-card.png`*

**Tweet 2 (the twist)**

> Wordle gives you one word. Triptych gives you three — sharing the same scrambled pile of letters.
>
> You have to figure out where every letter belongs. No category. No theme. Just the shape of the words.

**Tweet 3 (proof it's a real game)**

> – New puzzle every day at midnight Pacific
> – Wordle-style shareable result (emoji grid + streak)
> – Installable on iOS / Android (PWA)
> – Free play mode with 4 difficulties if the daily isn't enough

**Tweet 4 (the ask)**

> If you play it and like it, the best thing you can do is share your result. Streaks unlock at day 3.
>
> YOUR-URL

---

## 2. Show HN

**Title (max 80 chars):**

> Show HN: Triptych – three hidden words share one letter pool

**Body:**

> Hi HN — I built a small daily word puzzle called Triptych.
>
> Every day you get three hidden words, but their letters are all jumbled together into a single pool. You have five attempts to slot every letter into the right row. No categories, no themes — just deduction from the shape of the words and the feedback after each guess.
>
> A few things I tried to get right:
>
> - Deterministic daily: `mulberry32(hash(YYYY-MM-DD))` seeds puzzle selection, so everyone gets the same board. Rollover at midnight America/Los_Angeles, computed client-side — no server.
> - Wordle-style share text with an emoji grid, attempts, time, and current streak.
> - Persistent stats / streaks in `localStorage`, with a graceful fallback when storage is blocked.
> - Installable as a PWA, works offline after first load.
> - A free-play mode with four difficulties (Beginner → Expert). Beginner shows a rhyming-word hint instead of a letter, which I found nudges you toward the answer without giving it away.
>
> Tech is intentionally boring: single `index.html`, single `app.jsx`, React 18 + Babel standalone from CDN, a service worker, and ~80KB of word data. No build step, no framework install — `python3 -m http.server` and it runs.
>
> Play: YOUR-URL
> Source: https://github.com/YOUR-USERNAME/triptych
>
> Would love feedback on difficulty curve and whether the daily feels too easy or too punishing on 5 attempts.

---

## 3. r/wordle (or r/WordGames)

**Title:**

> I made a daily word puzzle where three answers share one letter pool [free, no signup]

**Body:**

> Hey r/wordle — long-time lurker, first-time poster. Made a little puzzle called **Triptych** that scratches the same daily-itch as Wordle but with a different shape.
>
> **The rules:**
> - Three hidden words, each 4–6 letters.
> - All their letters are dumped into a single shared pool.
> - You have 5 attempts to place every letter into the right row.
> - Wrong-spot / right-spot color feedback, just like you'd expect.
>
> **What I borrowed from Wordle:**
> - One puzzle per day, same for everyone.
> - Shareable emoji result (with attempts + time + streak).
> - Pacific midnight rollover with a live countdown.
>
> **What's different:**
> - No theme / category hints. The only signal is the letters themselves.
> - Free-play mode with 4 difficulties for after you've done the daily.
> - Installable as a phone app (PWA).
>
> Free, no signup, no ads, no account. Just open and play.
>
> 👉 YOUR-URL
>
> Would love thoughts from this sub specifically — is 5 attempts the right number for three words? Currently leaning toward "yes but tight," which is intentional.

---

## 4. r/webgames

**Title:**

> Triptych — a daily 3-word puzzle, free in your browser

**Body:**

> Built a small browser word game. New puzzle daily, plays in ~3 minutes, installable as a PWA if you want it on your phone. No signup.
>
> Three hidden words share a single scrambled letter pool — you have to figure out which letters belong to which word.
>
> YOUR-URL

---

## 5. Product Hunt

**Tagline (60 char max):**

> Three hidden words. One letter pool. A new puzzle every day.

**Description (260 char):**

> Triptych is a daily word puzzle in three parts. Every day, three hidden words share a single jumbled pool of letters. You have five attempts to place every letter in the right row. Free-play mode with four difficulties for when the daily isn't enough.

**First comment from maker:**

> Hey PH — I built Triptych because I love Wordle but wanted something with a bit more deduction. The shared letter pool means every letter you place reveals information about all three words at once. Would love feedback on difficulty + ideas for new modes.

---

## 6. iMessage / DM to friends

> made a little word puzzle. it's like wordle but you solve 3 at once from one pile of letters. new one every day → YOUR-URL

---

## Launch day order (recommended)

1. **Morning (8–10am PT)** — Tweet thread. Pin it.
2. **+1 hour** — Post to r/wordle. Engage replies for the first hour.
3. **+2 hours** — Show HN. Best timing is Tue–Thu, 9–11am PT.
4. **Afternoon** — r/webgames, r/InternetIsBeautiful (if you have karma there).
5. **Day 2** — Product Hunt launch (PH posts do best Tue/Wed at 12:01am PT).
6. **Day 3+** — DM 5–10 friends individually. Personal sends convert way better than broadcasts.

## Things to have ready before posting

- [ ] Custom domain pointed at Netlify (looks more legit than `*.netlify.app`)
- [ ] You've played the daily yourself today — easier to talk about
- [ ] Twitter pinned tweet + bio link both point at the site
- [ ] GitHub repo is public with a real README and a recent commit
- [ ] Screenshot or short Loom of a real play-through ready to paste in replies
- [ ] An empty browser tab open on the analytics dashboard (Plausible / Netlify Analytics) so you can watch traffic arrive
