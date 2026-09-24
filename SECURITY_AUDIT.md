# WebOvice Security Audit

**Date:** 2026-09-24  
**Scope:** Public production site `https://www.webovice.eu` (Vercel static + serverless `/api/contact`)  
**Push / production deploy:** not performed as part of this audit

## Security posture

**BEFORE → AFTER**

- Public static marketing site with a contact form that already used Resend server-side, honeypot, HTML escaping, and basic validation — but **no HTTP security headers / CSP**, **no Origin checks**, **no Content-Type enforcement**, **no apex→www redirect in repo config**, **no security.txt**, and **transitive npm audit findings** in the Vite toolchain.
- After this work: hardened contact API, security headers + usable CSP, apex redirect, dependency audit clean, validation tests, and an explicit manual checklist for items that cannot be fixed in git alone.

---

## Inventory (Phase 1)

| Item | Finding |
| --- | --- |
| Framework | **Not** Next.js / React app for the public site. Static HTML/CSS/JS. Vite + React only for `works-studio` build artifact. |
| Runtime | Vercel static hosting + Node serverless (`api/contact.js`), project Node 24.x |
| Dependencies | `resend` (runtime), `react` / `react-dom` / `framer-motion` (works-studio), Vite toolchain (dev) |
| Public pages | `/`, `/kontakt`, `/moje-prace`, `/o-nas`, `/404` |
| API | `POST /api/contact` only |
| Forms | Contact form (`#contact-form`) on `index.html` + `kontakt.html` |
| ENV | `RESEND_API_KEY`, `CONTACT_EMAIL` (Vercel; not in git) |
| Third parties | Resend, Google Fonts, Framer CDN avatar image |
| Analytics | None found |
| Cookies | None set by app (only `localStorage` for language) |
| DB / auth / uploads | None |
| Redirects | `/pripadove-studie` → `/moje-prace`; **added** apex `webovice.eu` → `www.webovice.eu` |
| Middleware | None |

### Threat model (anonymous attacker)

Realistic attacks:

1. **Spam / abuse of `/api/contact`** → email flood via Resend  
2. **Malicious payload** in form fields → XSS in notification email (if not escaped) / header injection in Subject/Reply-To  
3. **CSRF-ish cross-site POST** to send spam mail from victim browsers  
4. **Clickjacking** the marketing UI  
5. **Missing security headers** / mixed content  
6. **Dependency / supply-chain** issues in build toolchain  
7. **Secret leakage** via client bundle or git  

Not applicable (no feature surface): SSRF from user URLs, file upload attacks, session cookie theft, authenticated IDOR, admin panels.

---

## Findings

### CRITICAL

_None found in repository code or reachable attack surface after review._

No Resend API key or `CONTACT_EMAIL` values were present in tracked git content. Local `.vercel/.env.production.local` is gitignored and contains Vercel platform vars (including `VERCEL_OIDC_TOKEN`) — not committed.

---

### HIGH

#### H1 — Missing HTTP security headers / CSP
- **Problem:** Responses had no HSTS, CSP, `frame-ancestors`, `nosniff`, Referrer-Policy, or Permissions-Policy.
- **Why:** Enables clickjacking, MIME sniffing, weaker HTTPS posture, freer XSS exfil if an XSS ever appears.
- **Where:** Site-wide Vercel responses (`vercel.json` previously had no `headers`).
- **Scenario:** Attacker iframes `webovice.eu` or exploits a future XSS more easily.
- **Fixed:** Yes — `vercel.json` `headers` + CSP (see below).
- **How:** Security headers on `/(.*)`; `Cache-Control: no-store` on `/api/(.*)`; HSTS without preload.
- **Remaining:** Verify headers on production after deploy (`curl -I https://www.webovice.eu`).

#### H2 — Contact API missing Origin / Content-Type gates
- **Problem:** Any client could POST JSON without browser Origin checks; Content-Type was not required.
- **Why:** Raises cross-site form abuse and odd clients posting unexpected content types.
- **Where:** `api/contact.js`
- **Scenario:** Malicious page triggers a victim browser to POST to `/api/contact` (spam), or non-JSON bodies confuse parsers.
- **Fixed:** Yes — trusted Origin/Referer host allow-list; `415` unless `application/json`; production rejects missing Origin/Referer.
- **Remaining:** Optional distributed rate limit / Turnstile (manual).

#### H3 — Transitive npm vulnerabilities (Vite toolchain)
- **Problem:** `npm audit` reported high/moderate issues in `postcss`, `nanoid`, `browserslist`, `baseline-browser-mapping`.
- **Why:** Supply-chain / build-tool risk (not directly in the contact serverless path).
- **Where:** `package-lock.json` / Vite transitive deps.
- **Scenario:** Compromised or vulnerable build tooling; low direct exploitability on the static production site.
- **Fixed:** Yes — `npm audit fix` (no `--force`) → **0 vulnerabilities**.
- **Remaining:** Keep periodic `npm audit`.

---

### MEDIUM

#### M1 — Header / CRLF injection via form fields
- **Problem:** Name/email could theoretically contain CR/LF before use in Subject / Reply-To.
- **Why:** Header injection if a downstream mail API concatenated unsafely.
- **Where:** `api/contact.js`
- **Scenario:** Name `Foo\r\nBcc: attacker@…` in subject construction.
- **Fixed:** Yes — control-char sanitization; subject sanitized; email lowercased + format check.
- **Remaining:** None for this vector.

#### M2 — Apex host not redirected in repo config
- **Problem:** `webovice.eu` → `www.webovice.eu` was not declared in `vercel.json` (may already exist in dashboard).
- **Why:** Split cookie/canonical identity; weaker consistent HTTPS host story.
- **Where:** `vercel.json`
- **Fixed:** Yes — host-conditioned permanent redirect apex → www.
- **Remaining:** Confirm in Vercel Domains that both hosts are attached and HTTPS is valid (manual).

#### M3 — No `security.txt`
- **Problem:** No documented vulnerability disclosure contact.
- **Fixed:** Yes — `.well-known/security.txt` with `mailto:webovice@gmail.com` (public site email).
- **Remaining:** Keep Expires date updated yearly.

---

### LOW

#### L1 — CSP requires `style-src 'unsafe-inline'`
- **Problem:** Many legitimate inline `style=""` attributes (stack cards, refs footers).
- **Why:** Slightly weaker XSS mitigation for style-based attacks.
- **Where:** HTML templates.
- **Fixed:** Partial — CSP still blocks inline/external scripts except `'self'`; `object-src 'none'`; `frame-ancestors 'none'`.
- **Remaining:** Optional refactor of inline styles → classes to drop `'unsafe-inline'` (larger design change; not done).

#### L2 — `innerHTML` in i18n / UI cloning
- **Problem:** `i18n.js` uses `innerHTML` for `data-i18n-html` keys; `script.js` clones card `innerHTML` and sets a fixed logo img string.
- **Why:** XSS if those strings ever became user-controlled.
- **Where:** `i18n.js`, `script.js`
- **Scenario:** Today strings are static developer-controlled dictionary entries — **not** visitor input.
- **Fixed:** No code change (would be security theatre / break intentional `<strong>` markup). Documented.
- **Remaining:** Never pipe URL params or API data into `data-i18n-html`.

#### L3 — No distributed rate limiting
- **Problem:** Serverless instances cannot share an in-memory counter.
- **Why:** Determined bot can still spam Resend within account limits.
- **Fixed:** Not with a fake Map. Honeypot retained; Origin checks added.
- **Remaining:** OPTIONAL Upstash / Vercel KV / Cloudflare Turnstile / Resend account limits (manual checklist).

---

### INFO

| ID | Note |
| --- | --- |
| I1 | No auth, sessions, cookies (app), DB, uploads, SSRF sinks, analytics, open redirects with user input. |
| I2 | `rel="noopener noreferrer"` already present on `target="_blank"` links. |
| I3 | Resend FROM is hard-coded `WebOvice <poptavky@webovice.eu>`; visitor email only as validated `replyTo`. |
| I4 | `.env*` and `.vercel` are gitignored; no `.env` files in repo root. |
| I5 | `localStorage` only stores UI language key. |
| I6 | Production contact responses already used `Cache-Control: no-store` + generic errors (no Resend details). |
| I7 | `SECURITY_AUDIT.md` is excluded from Vercel deploy via `.vercelignore` `*.md` (not publicly served). |
| I8 | GET on `/api/contact` returns 405 (covered by handler). |

---

## What was implemented in code

1. **`vercel.json`** — security headers, CSP, HSTS (no preload), apex→www redirect, API `no-store`
2. **`api/contact.js`** — Origin/Referer allow-list, Content-Type `application/json`, stronger sanitization, CRLF hardening, exported `validatePayload`
3. **`.well-known/security.txt`** — disclosure contact
4. **Canonical URLs** on main HTML pages → `https://www.webovice.eu/...`
5. **`npm audit fix`** — lockfile clean (0 vulns)
6. **`scripts/contact.test.mjs`** + `npm run test:contact`
7. **`.vercelignore`** — exclude `scripts/` from deploy

---

## Dependency audit result

```
npm audit  →  found 0 vulnerabilities
```

(after non-force `npm audit fix`)

Production serverless path primarily needs `resend`. Remaining React/Vite packages are for the works-studio build.

---

## Tests / build

| Check | Result |
| --- | --- |
| `npm run test:contact` | 14 passed |
| `node --check api/contact.js` | OK |
| `npm run build` (Vite works-studio) | OK |
| lint / typecheck | N/A (no project ESLint/TS setup) |

Handler-level checks (GET, Origin, Content-Type) are enforced in `api/contact.js`; full HTTP integration against Resend was **not** run (by design — no live spam emails).

---

## MANUAL SECURITY CHECKLIST

Do these outside the repo before/after deploy:

### Vercel

- [ ] Confirm Production env: `RESEND_API_KEY`, `CONTACT_EMAIL=webovice@gmail.com`
- [ ] Confirm Preview env either has the same vars or is acceptable for test sends
- [ ] Project Settings → Domains: `www.webovice.eu` + `webovice.eu` both HTTPS; apex redirects to www (repo now also encodes this)
- [ ] After deploy: `curl -I https://www.webovice.eu` and verify `content-security-policy`, `strict-transport-security`, `x-content-type-options`, `x-frame-options` / CSP `frame-ancestors`
- [ ] After deploy: `curl -I https://www.webovice.eu/.well-known/security.txt`
- [ ] Settings → Deployment Protection: consider protecting **Preview** deployments (Vercel Authentication) so random preview URLs are not public spam relays
- [ ] Team access: review members; enable 2FA on the Vercel (and GitHub) account
- [ ] Optional: Vercel Firewall / WAF / bot rate rules if plan allows — especially path `/api/contact`

### Resend

- [ ] Domain `webovice.eu` remains verified
- [ ] Sending identity `poptavky@webovice.eu` allowed
- [ ] Review Resend dashboard rate limits / alerts
- [ ] If any key was ever pasted into chat/logs, **rotate** `RESEND_API_KEY`

### DNS

- [ ] Apex `webovice.eu` and `www` both point as Vercel documents
- [ ] No stale HTTP-only records

### Optional bot defenses (not implemented — need accounts/secrets)

- [ ] Cloudflare Turnstile (or similar) on the contact form
- [ ] Distributed rate limit via Upstash Redis / Vercel KV keyed by IP + `/api/contact`

### Git / ops

- [ ] Keep `.vercel/` and `.env*` out of git (already gitignored)
- [ ] Do not commit real API keys
- [ ] After merging this audit branch: deploy only when you explicitly approve

---

## Deploy readiness

**Yes — safe to deploy from a security standpoint**, provided the Manual checklist Domain/ENV items are confirmed.

This change set does **not** alter visual design. Contact UX is unchanged; API is stricter (Origin + JSON Content-Type), which is correct for the browser form (`fetch` already sends both).

**Do not push/deploy until you confirm.**
