# Learn With Lane — Website

Static GitHub Pages site for Learn With Lane: independent ESL and reading-remediation
instruction based in Durant, Oklahoma. Pages mirror the original Google Sites layout.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, credibility, services overview, "coming soon" local classes |
| `services-scheduling.html` | How it works, rates, booking calendar, FAQ |
| `learning-games.html` | Consonant Crash showcase, newsletter signup, Stripe donation |

## Structure

```
.
├── index.html
├── services-scheduling.html
├── learning-games.html
├── css/styles.css        # mobile-first, brand colors, no dependencies
├── js/script.js          # mobile menu, FAQ accordion, newsletter handling
├── images/               # web-ready images used by the pages
├── CNAME                 # custom domain: learnwithlane.com
└── _config.yml           # excludes planning docs from the published build
```

The `Hero Images/` and `Preproject Planning/` folders and the `*.md` planning docs
are kept in the repo for reference but excluded from the published site via `_config.yml`.

## Brand colors

| Token | Hex | Use |
|-------|-----|-----|
| Primary blue | `#007bbf` | Headlines, primary buttons, links |
| Secondary orange | `#d8893f` | Secondary buttons, accents |
| Accent yellow | `#fbe9b2` | Hero wash, "coming soon" banner |
| Ink | `#2b2b2b` | Body text |

## Things to finish wiring up

These are intentionally left as clearly-marked placeholders:

1. **Booking calendar embed** (`services-scheduling.html`)
   Google's `calendar.app.google/...` short link is a *page* link and does not embed
   reliably in an `<iframe>`. To get a true inline calendar, in Google Calendar open
   your appointment schedule → **Share / Embed** → copy the provided `<iframe>` code and
   replace the placeholder iframe in the booking section. The "Open in a new tab" link
   below the calendar already points at your real short link and works as-is.

2. **MailChimp newsletter** (`learning-games.html`)
   In Mailchimp: **Audience → Signup forms → Embedded forms**, copy the form's `action`
   URL, and paste it into the `action="..."` attribute on the `<form data-newsletter>`.
   Keep the input names `EMAIL` and `FNAME`. Until then the form shows a friendly
   "not connected yet" message instead of submitting.

3. **Stripe donation** and **Consonant Crash** links are live and already point at the
   real URLs.

## Deploy

1. Create / use repo `learnwithlane-usa/LWL-Website`, push these files to `main`.
2. **Settings → Pages →** Deploy from a branch → `main` / root.
3. DNS at your registrar: four `A` records for the apex (`185.199.108.153`,
   `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and a `CNAME` for `www`
   pointing to `learnwithlane-usa.github.io`.
4. After DNS propagates, enable **Enforce HTTPS** in Settings → Pages.

Full step-by-step deployment notes are in `HANDOFF_GUIDE.md`.
