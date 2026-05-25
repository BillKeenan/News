# N.E.W.S. — North Eastern Widows Sons Website

## Project Overview

Static HTML/CSS website for the North Eastern Widows Sons (N.E.W.S.), a Masonic motorcycle riding association chapter based in northeastern Ontario, Canada. Single-page site with nav, hero, about, gallery, philanthropy, and contact sections.

**Live site:** GitHub Pages from `main`
**Preview site:** Netlify from `dev` — https://snazzy-paprenjak-56dbfe.netlify.app

---

## Repository

**GitHub:** https://github.com/BillKeenan/News
**Local path:** `/home/bill/Nextcloud/widows sons/site/News`

---

## Branch Structure

| Branch | Purpose |
|--------|---------|
| `main` | Production — published via GitHub Pages |
| `dev`  | Preview — published via Netlify, reviewed before merging to main |

**Rule:** Never commit directly to `main`. All work goes to `dev` first.

When work is ready to publish, merge the open `dev → main` PR on GitHub.

---

## Issue Workflow (Automated)

Issues are handled automatically by the **Claude Code GitHub Action** (`.github/workflows/claude.yml`).

### To trigger Claude on an issue:
- **Add the `claude` label** to an issue, OR
- **Comment `@claude <instructions>`** on an issue

### What happens automatically:
1. Claude reads the issue and makes the required code changes
2. Changes are committed to a temporary `claude/issue-N-*` branch
3. That branch is merged into `dev` and deleted
4. The `dev → main` PR is created (or updated) with `Closes #N` added to its body
5. When you merge the PR to `main`, GitHub automatically closes all linked issues

### To publish completed work:
1. Preview on Netlify (`dev` branch)
2. Merge the open `dev → main` PR on GitHub
3. Linked issues close automatically

### After merging, sync dev to main:
```bash
git checkout dev && git reset --hard origin/main && git push origin dev --force
```

---

## GitHub Actions Setup

**Workflow file:** `.github/workflows/claude.yml`

**Required secrets** (set at github.com/BillKeenan/News/settings/secrets/actions):
- `ANTHROPIC_API_KEY` — from platform.claude.com

**Required repository setting:**
- Settings → Actions → General → Workflow permissions → ✅ Allow GitHub Actions to create and approve pull requests

---

## File Structure

```
News/
├── index.html          # Single-page site — all content and styles inline
├── images/
│   ├── ws-news.svg             # Official chapter logo (viewBox 0 0 2000 2000)
│   ├── hsn-donation-2026.jpg
│   ├── mexico-visit-2026.jpg
│   ├── tail-of-the-dragon.jpg
│   └── dorset-gathering-2026.jpg
├── lib/
│   └── lightgallery/   # Lightbox library for gallery and philanthropy photos
├── CNAME               # wsnews.ca
└── .github/
    └── workflows/
        └── claude.yml  # Claude Code automation
```

---

## Editing the Gallery

Gallery images are defined in a JavaScript array near the bottom of `index.html`:

```javascript
const galleryImages = [
    {
        src:   'images/filename.jpg',
        alt:   'Screen reader description',
        title: 'Bold caption line',       // optional
        sub:   'Italic caption line',     // optional
        link:  { href: '...', label: '...' }  // optional
    },
    ...
];
```

Add a new object to add a photo. The philanthropy feature photo is separate — edit the `#giving-feature` section directly in the HTML.

---

## Design Tokens

Defined as CSS variables in `:root`:

| Variable | Value | Role |
|----------|-------|------|
| `--gold` | `#8c6a18` | Primary accent |
| `--gold-light` | `#b8902e` | Hover gold |
| `--black` | `#f4efe4` | Page background (warm off-white) |
| `--dark` | `#ede5d4` | Section alternate background |
| `--text` | `#3d3020` | Body text |
| `--muted` | `#8c7d64` | Subdued labels |

Fonts: **Cinzel** (headings/labels) and **Crimson Pro** (body) via Google Fonts.

---

## Key Notes

- The logo SVG (`ws-news.svg`) has a `viewBox="0 0 2000 2000"` — do not change this. Content is drawn around coordinates 1000,1000 and will disappear if the viewBox is reduced.
- Filenames with spaces cause Netlify deployment issues — always use hyphens.
- The Masonic square & compass SVG in the About section is intentional — it is the chapter seal, not a decorative compass, and should not be replaced with the logo.
- `gh issue view` fails due to a GitHub GraphQL deprecation warning — use `gh api repos/BillKeenan/News/issues/N` instead.
