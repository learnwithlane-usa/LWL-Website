# Learn With Lane — Website

learnwithlane.com: GitHub Pages with Jekyll on. Pushes to `main` go live in about a minute.
Redesign plan and status: `G:/AI/Business/Learn With Lane/WEBSITE_REDESIGN_PLAN.md`.

## Pages (after redesign step 1, 2026-10-24)

| File | Purpose |
|------|---------|
| `index.html` | Home: hero, three doors (classes, English lessons, workbooks), About David, free-worksheets strip |
| `oklahoma-homeschool-classes.html` | Creature Card Lab, PCTC note, email class list (step 3 adds the Cal.com series booking) |
| `services-scheduling.html` | One-on-one English lessons, rates, booking (nav label "English Lessons"; step 5 replaces it) |
| `workbooks.html` | Paid TPT packs (grid copied from the free page's "Full Packs" section) |
| `free-phonics-worksheets.html` | Free TPT samplers + full packs (step 6 turns it into a filterable library) |
| `zh-tw/index.html` | Taiwan ESL page, own Chinese header/footer (not the shared include) |
| `reading-tutor-oklahoma.html`, `intro.html`, `classroom.html`, `privacy.html`, `terms.html`, `404.html` | Older pages on the shared header/footer |
| `playbook.html`, `learning-tools/` | Redirect stubs to Free Worksheets. `playbook-access-f5a238088a20.html` stays live, unlinked, for direct buyers |

## How pages are built

- Every page except `zh-tw/` and the redirect stubs starts with front matter (`---` / `---`) and uses
  `{% include head-fonts.html %}`, `{% include header.html %}`, `{% include footer.html %}` from `_includes/`.
  A nav change is one edit in `_includes/header.html`.
- The gold header button reads `page.header_cta_text` / `page.header_cta_url` from front matter, default
  "Join the class list". The current page is underlined by `js/script.js`.
- Keep Liquid to those forms; `tools/preview.py` only understands them.

## Local preview (no Ruby on this machine)

```
python tools/preview.py               # builds _preview/ and serves http://localhost:4000
python tools/preview.py --port 8765   # what G:/AI/.claude/launch.json "lwl-site" runs
```

## Brand

Navy `#1d4e6f`, gold `#f5c542`, orange accent `#d8893f`, cream `#fffaf0`, line `#e6dcc8`.
Headings Baloo 2, accents Patrick Hand (Google Fonts), body system sans. Tokens live at the top of
`css/styles.css`. Owl art in `images/owl-*.svg` is copied from `G:/AI/Clipart/lwl_owl_color_*.svg`.
`images/share-home.png` comes from `TPT_Launch_Packs/_store_graphics/build_site_graphics.py` (`share_home()`).

## Deploy

1. Create / use repo `learnwithlane-usa/LWL-Website`, push these files to `main`.
2. **Settings → Pages →** Deploy from a branch → `main` / root.
3. DNS at your registrar: four `A` records for the apex (`185.199.108.153`,
   `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and a `CNAME` for `www`
   pointing to `learnwithlane-usa.github.io`.
4. After DNS propagates, enable **Enforce HTTPS** in Settings → Pages.

Full step-by-step deployment notes are in `HANDOFF_GUIDE.md`.
