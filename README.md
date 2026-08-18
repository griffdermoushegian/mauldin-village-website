# Mauldin Village — Website

Static marketing website for Mauldin Village, a 48-home Braden Fellman Group community at
5418 Mauldin Avenue, Columbia, SC 29203. Plain HTML, CSS, and JavaScript — no build step.

Functionality mirrors mattressfactorylofts.com (specials banner, floor plans with live
availability, gallery, neighborhood/map + directions, contact) with an original design.
Copy follows the BFG brand voice guide.

## Pages
- `index.html` — Home (hero, highlights, floor plan teaser, location, FAQ, CTA)
- `floor-plans.html` — 3 floor plans, comparison table, **AppFolio live availability embed + Apply Now**
- `amenities.html` — Home features & community amenities
- `gallery.html` — Community photos + interior placeholder (lightbox included)
- `neighborhood.html` — Nearby anchors + Google Maps embed + written directions
- `contact.html` — Contact info, tour request form, map

## Data sources (pulled from AppFolio via BFG MCP, Aug 17 2026)
- 48 units: 8× 1bd/1ba (750 sqft), 24× 2bd/1ba (854 sqft), 16× 3bd/1ba (1,052 sqft)
- Advertised rents: $900 / $1,095 / $1,295
- Application fee: $100
- Property UUID: `8e660864-0c25-11f1-baea-0a6c9c7940e7` (report_id 607), asset phase "Under Construction"

## AppFolio integration
- **Vacancy listings**: `floor-plans.html#availability` embeds the AppFolio listings page
  as a direct iframe, filtered to the **"Mauldin Village" property group**
  (`filters[property_list]=Mauldin Village` — the same URL the official listing.js widget
  generates; a direct iframe is used because the widget appends its iframe to the end of
  `<body>` instead of where the script runs).
- **Apply Now buttons** point to the same filtered listings URL — each posted listing
  carries its own Apply flow. Swap to a listing-specific `.../listings/detail/<uid>` URL
  if you want to deep-link a unit.

## Contact form
Front-end only right now (validates + shows confirmation; sends nothing). Two options,
both marked in `contact.html`:
1. Wire the existing form to an email service / backend.
2. Replace it with the property Jotform embed (BFG standard) once a Mauldin Village form
   exists — `PropertyName_Jotforms` is still null for this property in Supabase.

## Photos
`assets/photo-1.jpg … photo-5.jpg` are the five exterior shots pulled from the
ApartmentHomeLiving listing (1600px, web-optimized JPEG). All exteriors — the gallery keeps
one "interiors coming soon" placeholder tile. When new photos arrive, drop them in `assets/`
and follow the commented `<figure>` pattern in `gallery.html`. The home hero uses `photo-3.jpg`.

## ⚠️ Placeholders to replace before launch
- **Office hours** Mon–Fri 9–5 — assumed; confirm with the leasing team.
- **Domain** — all absolute URLs use `https://mauldinvillage.com`. If deploying elsewhere,
  find-and-replace across `*.html`, `sitemap.xml`, `robots.txt`, `llms.txt`.
- **Amenity details** — pet policy, parking, and unit finishes are deliberately vague pending
  confirmation; tighten the Amenities page once renovations settle.
- "Own front door / private entrance" phrasing on Home & Floor Plans assumes garden-style
  entries — confirm against the actual buildings (photo-3 shows breezeway entries, so
  soften if needed).

## SEO & LLM readability
- **JSON-LD**: `ApartmentComplex`/`LocalBusiness` (address, geo 34.0490971/-81.0165121,
  offers per floor plan with real rents/sqft, 48 units, photos), `WebSite`, `FAQPage` on
  the home page; `BreadcrumbList` on interior pages; `ContactPage` on contact.
- **Per-page**: canonical, Open Graph + Twitter Card (photo-3 as share image), theme-color,
  descriptive titles/metas.
- **Crawler files**: `robots.txt` (explicitly allows GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, etc.), `sitemap.xml`, `llms.txt` (plain-text site summary for LLMs).
- After deploying: submit `sitemap.xml` in Google Search Console, validate JSON-LD with the
  Rich Results Test, and create a Google Business Profile for the property.

## Deployment (Render)
- **Live URL**: https://mauldinvillage.com (Render URL: https://mauldin-village.onrender.com)
- **Render service**: `mauldin-village` (`srv-da26nkou01pc73duqfs0`), static site, BFG workspace
  (`tea-d5n56bq4d50c73dfo4gg`) — [dashboard](https://dashboard.render.com/static/srv-da26nkou01pc73duqfs0)
- **Repo**: https://github.com/griffdermoushegian/mauldin-village-website — pushes to `main`
  auto-deploy (publish path `.`, no build command)
- **Custom domains**: `mauldinvillage.com` (primary) + `www` (redirects to apex).
  DNS at GoDaddy: `A @ → 216.24.57.1`, `CNAME www → mauldin-village.onrender.com`
- To publish changes: commit in this folder and `git push`

## Viewing locally
```bash
cd MauldinVillage
python3 -m http.server 8000
```
Note: the AppFolio widget and Google Maps embeds require being served over http(s) —
opening `index.html` via `file://` will show everything except those embeds.
