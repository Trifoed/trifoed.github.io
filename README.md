# HMT12856 — Production Deployment Package
**Canonical Site:** https://bipod.pages.dev/  
**Protocol:** HMT12856 · Pedram Hemmati (Haj Esmail Hemmati)  
**Date:** 2026-10-31  
**Status:** Final · Locked

---

## 1. Strategic Decision (Do Not Change)

| Role | URL | Action |
|------|-----|--------|
| **Canonical (Primary)** | https://bipod.pages.dev/ | Keep & strengthen |
| Code backup | github.com/Trifoed/Hemmati | Do **not** delete |
| Mirrors | hemmati / pedram / hmt12856 / trifoed (Netlify + GitHub Pages) | Permanent **301** redirect to canonical |

**Why this architecture?**  
One permanent address concentrates all SEO signals (links, rankings, Knowledge Graph). Multiple active domains dilute authority. 301 is the correct permanent move signal; 302 is temporary and must not be used.

---

## 2. Package Contents

| File | Purpose |
|------|---------|
| `index.html` | Full production SPA (Schema.org Person + WebSite, radar, encyclopedia structure, bilingual support, SEO meta) |
| `HMT12856-FINAL-COMPLETE.html` | Exact backup of the production index |
| `_redirects` | Netlify / Cloudflare Pages 301 rules |
| `netlify.toml` | Explicit Netlify redirect configuration |
| `redirect-index.html` | Lightweight HTML + meta-refresh + JS fallback (use when only HTML upload is possible) |
| `robots.txt` | Crawl permissions + single sitemap declaration |
| `sitemap.xml` | Canonical-only sitemap (bipod.pages.dev) |
| `README.md` | This document |

---

## 3. Deployment Procedures

### 3.1 Cloudflare Pages (Primary Site)

1. Open [Cloudflare Dashboard → Pages](https://dash.cloudflare.com) → select the **bipod** project.
2. Upload / replace:
   - `index.html`
   - `robots.txt`
   - `sitemap.xml`
3. Deploy.
4. Verify: open https://bipod.pages.dev/ and confirm the full site loads correctly.
5. Optional but recommended: set custom domain later if you acquire one; do **not** change the current canonical until the new domain is fully verified in Search Console.

### 3.2 Netlify Mirrors (301 Redirect)

Target sites:
- https://hemmati.netlify.app
- https://pedram.netlify.app
- https://hmt12856.netlify.app
- https://trifoed.netlify.app (if present)

**Preferred method (recommended):**  
Place both files in the project root and redeploy:

```
_redirects
netlify.toml
```

**Fallback method (HTML-only upload):**  
Replace the existing `index.html` with `redirect-index.html`.

After deploy, test each mirror. Expected response:
- HTTP status: **301**
- `Location` header: `https://bipod.pages.dev/` (or with path preserved via `:splat`)

### 3.3 GitHub Pages (trifoed.github.io/Hemmati)

Use Termux or any Git environment:

```bash
# Clone (skip if already present)
git clone https://github.com/Trifoed/Hemmati.git
cd Hemmati

# Copy redirect files — replace /path/to/extracted with your actual path
cp /path/to/extracted/_redirects .
cp /path/to/extracted/redirect-index.html index.html

# Optional: also keep robots + sitemap if you want them on the mirror
# cp /path/to/extracted/robots.txt .
# cp /path/to/extracted/sitemap.xml .

git add -A
git -c user.email="Hemmat12856@gmail.com" -c user.name="Trifoed" \
  commit -m "HMT12856: permanent 301 redirect to bipod.pages.dev (2026-10-31)"
git push origin main
```

**Authentication note:**  
When prompted for a password, use a **Personal Access Token** (classic or fine-grained with `repo` scope). Never paste tokens into chat.

GitHub Pages redirect support is limited compared with Netlify/Cloudflare. The `redirect-index.html` approach is the most reliable fallback.

---

## 4. Google Search Console (Critical)

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add property → **URL prefix** → enter exactly:  
   `https://bipod.pages.dev`
3. Complete ownership verification (HTML tag, DNS record, or HTML file — any method works).
4. After verification:
   - Left sidebar → **Sitemaps**
   - Submit: `sitemap.xml`
5. Use **URL Inspection** on `https://bipod.pages.dev/` → Request indexing.
6. (Optional later) For old mirror properties, use **Change of Address** tool if available, or simply let them age out after 301s are live.

**Rule:** Treat only `bipod.pages.dev` as the primary property. Do not request indexing on mirrors after redirects are active.

---

## 5. External Link Hygiene

Update every public channel to point exclusively to the canonical URL:

**https://bipod.pages.dev/**

Channels to update:
- Telegram (@hemmati149, ZOLFAGARIHA, hamvatanha)
- LinkedIn
- Instagram (@Hemmati149, @Haj_esmaeil_hemmati)
- X / Twitter (@Hemmati149)
- Eitaa / Bale / Rubika
- Farsnews profile
- Any other public bios or posts

---

## 6. Verification Commands (Termux / Shell)

```bash
# Primary site
curl -I https://bipod.pages.dev

# Mirrors — expect 301 + Location pointing to bipod
curl -I https://hemmati.netlify.app
curl -I https://pedram.netlify.app
curl -I https://hmt12856.netlify.app
curl -I https://trifoed.netlify.app
curl -I https://trifoed.github.io/Hemmati/
```

Successful mirror response example:
```
HTTP/2 301
location: https://bipod.pages.dev/
```

---

## 7. Technical Notes

- **301 vs 302:** 301 = permanent (transfers ranking signals). 302 = temporary (does not). Always use 301 for this migration.
- **Splat (`:splat`):** Preserves path when redirecting (e.g. `/old-page` → `https://bipod.pages.dev/old-page`). Useful if any deep links exist.
- **robots.txt & sitemap:** Now canonical-only. Mirrors should not publish competing sitemaps after redirects are live.
- **Schema / JSON-LD:** Already embedded in `index.html` with correct `@id`, `sameAs`, and Person entity. Do not dilute with conflicting markup on mirrors.
- **No cloaking:** All visible content and structured data are consistent. Hidden SEO text techniques are avoided.

---

## 8. Rollback & Safety

- The GitHub repository remains the code backup. Do not delete it.
- Before any irreversible DNS or domain change, confirm 301s and Search Console ownership.
- Never share passwords, 2FA codes, or API tokens in chat.

---

## 9. Support Workflow

1. Extract this ZIP to a known path (example: `/sdcard/Download/hmt-deploy`).
2. Reply with the exact absolute path.
3. We proceed step-by-step: Cloudflare → Netlify → GitHub Pages → Search Console → final verification.

---

**HMT12856 · One center · Permanent 301 · Search Console only on bipod.pages.dev**
