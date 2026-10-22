# WebOvice Security Audit

**Date:** 2026-10-22  
**Scope:** Public production site `https://www.webovice.eu` (Vercel static HTML/CSS/JS + serverless `POST /api/contact`)  
**Auditor role:** Principal / AppSec review against OWASP ASVS-oriented checklist  
**Push / production deploy:** **not** performed as part of this audit (requires explicit approval)

---

## Executive Summary

WebOvice is a **static marketing site** with a single serverless contact endpoint (Resend). There is **no application authentication, database, Supabase runtime, file upload, or PHP application runtime** in this repository or in the verified Vercel production response path.

| Area | Status |
| --- | --- |
| Overall posture | **Hardened for the attack surface that exists** |
| Critical app findings (repo / production path) | **None confirmed** |
| PHP2Shell (CVE-2026-109618 / CVE-2026-109619) | **N/A to production WebOvice** — no PHP SAPI in deploy. Local Homebrew PHP CLI on the workstation is **unpatched (8.5.9)** and should be upgraded separately. |
| High findings remediated this pass | npm `vite` / `source-map-js`; overly broad Vercel preview Origin allow-list; missing deploy ignore for local `CN/` business docs |
| Residual high/medium | Contact spam without distributed rate limit / CAPTCHA; CSP `style-src 'unsafe-inline'`; platform `Access-Control-Allow-Origin: *` on static assets |

**Do not claim 100% security.** This audit covers the reachable code and configuration that were inspectable locally plus live header checks against production.

---

## Technology Inventory

| Item | Verified finding |
| --- | --- |
| Public app | Static HTML/CSS/JS (`index.html`, `kontakt.html`, `moje-prace.html`, `o-nas.html`, `404.html`) |
| API | `api/contact.js` — Node serverless on Vercel |
| Frameworks | **Not** Next.js / PHP app. Vite + React only for `assets/works-studio` build artifact |
| Node (local) | v25.9.0 / npm 11.12.1 |
| Runtime deps | `resend@6.28.1`, `react@19.3.0`, `react-dom@19.3.0`, `framer-motion` (works-studio) |
| Dev toolchain | `vite@7.3.7` (patched this pass), `@vitejs/plugin-react@4.7.0` |
| Hosting | Vercel (`server: Vercel`), HTTPS enforced, apex→www redirect in `vercel.json` |
| ENV (production) | `RESEND_API_KEY`, `CONTACT_EMAIL` — Vercel only; **not** in git |
| Third parties | Resend, Google Fonts, Framer CDN image host (CSP allow-list) |
| Auth / sessions / cookies (app) | None |
| Database / Supabase | **Not used** (Supabase appears only as a marketing “stack” icon) |
| Analytics | None found |
| PHP in repo | **Zero** `.php` files |
| PHP on workstation | Homebrew CLI **PHP 8.5.9** present — **not** used by this site’s Vercel deploy |

### PHP2Shell assessment (CVE-2026-109618, CVE-2026-109619)

Official sources consulted (2026-10-22):

- https://www.php.net/archive/2026.php (21 Oct 2026 advisory)
- CISA alert on critical PHP RCE (“php2shell”)
- Patched releases: **8.5.12 / 8.4.27 / 8.3.36 / 8.2.35**

| Check | Result |
| --- | --- |
| PHP files in WebOvice repo | None |
| Vercel production responses | Node/static (`server: Vercel`); contact API is Node handler |
| Container / Dockerfile PHP | None in repo |
| Local `php -v` | **8.5.9** (CLI) — **below** patched 8.5.12 |

**Conclusion:** Production WebOvice is **not exposed** to php2shell via this codebase. Local PHP CLI should still be upgraded (`brew upgrade php` or equivalent) for workstation hygiene. IoC hunting on production PHP workers is **N/A**.

---

## Vulnerability Register

### CRITICAL

_None confirmed in WebOvice production application path._

---

### HIGH

#### H1 — Transitive / toolchain npm vulnerabilities (`vite`, `source-map-js`)
- **Severity:** High (npm advisory classification)
- **Component:** `package-lock.json` / Vite build toolchain
- **Description:** `npm audit` reported high issues in `vite@7.3.6` and `source-map-js@1.2.1`.
- **Impact:** Supply-chain / local-dev DoS and Windows editor command issues; **low direct exploitability** on the static production site (Vite is not the production request path).
- **Remediation:** `npm audit fix` (no `--force`) → `vite@7.3.7`, `source-map-js@1.2.2`.
- **Verification:** `npm audit` → **0 vulnerabilities** (2026-10-22).
- **Status:** **REMEDIATED AND TESTED**

#### H2 — Overly broad trusted Origin for `*.vercel.app`
- **Severity:** High (abuse / spam relay potential)
- **Component:** `api/contact.js` `isTrustedHost`
- **Description:** Previous logic accepted any host matching `hostname.startsWith("webovice") && endsWith(".vercel.app")`, which can include unrelated Vercel projects if such a subdomain exists.
- **Impact:** Cross-site POST from a crafted preview host could abuse Resend if Origin checks passed.
- **Remediation:** Allow only `www.webovice.eu` / `webovice.eu` / localhost, plus **exact** `VERCEL_URL` / `VERCEL_BRANCH_URL`.
- **Verification:** Unit tests reject `webovice-attacker.vercel.app`.
- **Status:** **REMEDIATED AND TESTED**

#### H3 — Local business documents (`CN/`) not excluded from deploy ignore
- **Severity:** High **if** accidentally deployed (document exposure)
- **Component:** workspace `CN/*.pdf`, `CN/*.xlsx` (untracked locally)
- **Description:** Client/CN spreadsheets and PDFs lived under the project root without `.vercelignore` / `.gitignore` entries.
- **Impact:** Accidental `vercel deploy` of the whole tree could publish sensitive files.
- **Remediation:** Added `CN/` (and related local junk) to `.vercelignore` and `.gitignore`.
- **Verification:** Config present; files remain untracked.
- **Status:** **MITIGATED** (docs never committed; ignore rules now present)

---

### MEDIUM

#### M1 — Contact form spam / email flood
- **Component:** `POST /api/contact` + Resend
- **Description:** No shared distributed rate limit or CAPTCHA. Per-isolate Map rate limit added as best-effort only.
- **Remediation this pass:** Best-effort IP rate limit (8 req / 60s / isolate) + existing honeypot + Origin gates.
- **Remaining:** Upstash/KV rate limit and/or Turnstile (manual).
- **Status:** **MITIGATED** (not fully eliminated)

#### M2 — CSP requires `style-src 'unsafe-inline'`
- **Component:** `vercel.json` CSP + many inline `style=""` in HTML
- **Impact:** Weaker style-based XSS mitigation if script XSS ever appears.
- **Status:** **MITIGATED** (scripts still `'self'` only; larger HTML refactor deferred)

#### M3 — Static responses send `Access-Control-Allow-Origin: *`
- **Component:** Observed on production `curl -I https://www.webovice.eu/`
- **Impact:** Any origin can read static response bodies via XHR (HTML is public anyway). Lower risk than credentialed API CORS misconfig.
- **Remediation this pass:** API route headers set `Access-Control-Allow-Origin: https://www.webovice.eu`.
- **Remaining:** Confirm whether platform-level ACAO on static assets can be narrowed in Vercel dashboard.
- **Status:** **MITIGATED** for `/api/*`; static wildcard **NOT VERIFIED** as fully removable without dashboard access

---

### LOW

#### L1 — `innerHTML` for i18n HTML fragments
- **Component:** `i18n.js` `data-i18n-html`
- **Notes:** Values are static developer dictionary strings, not visitor input.
- **Status:** **ACCEPTED RISK** with rule: never feed URL/API data into these keys.

#### L2 — Local PHP CLI unpatched (8.5.9)
- **Component:** Developer workstation Homebrew PHP — **outside** WebOvice deploy.
- **Action:** Upgrade to ≥ 8.5.12.
- **Status:** **REQUIRES MANUAL ACTION** (workstation)

---

### INFO

| ID | Note |
| --- | --- |
| I1 | Live headers verified: HSTS, CSP, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy. |
| I2 | `security.txt` present and served (`Expires: 2027-09-24`). |
| I3 | No secrets found in tracked source (`RESEND_API_KEY` / `CONTACT_EMAIL` only via env). |
| I4 | No app auth, cookies, DB, uploads, SSRF sinks, or admin UI. |
| I5 | Contact API returns generic errors; no stack traces / Resend details to clients. |
| I6 | `SECURITY_AUDIT.md` excluded from Vercel via `.vercelignore` `*.md`. |

---

## Remediation Log (this pass)

| Change | Reason |
| --- | --- |
| `npm audit fix` → vite 7.3.7, source-map-js 1.2.2 | Clear high npm advisories |
| `api/contact.js` Origin allow-list tightened | Prevent arbitrary `webovice*.vercel.app` trust |
| `api/contact.js` best-effort IP rate limit | Soft abuse reduction |
| `vercel.json` API `Access-Control-Allow-Origin` | Narrow API CORS |
| `.vercelignore` / `.gitignore` add `CN/` (+ related) | Prevent accidental publish of local docs |
| `scripts/contact.test.mjs` host tests | Regression for Origin host policy |
| `SECURITY_AUDIT.md` rewritten | Full 2026-10-22 register |

---

## Tests executed (actual results)

| Check | Result |
| --- | --- |
| `npm run test:contact` | **18 passed, 0 failed** |
| `node --check api/contact.js` | OK |
| `npm audit` | **0 vulnerabilities** |
| `npm run build` (works-studio) | OK |
| `curl -I https://www.webovice.eu/` | Headers present (HSTS/CSP/XFO/…) |
| `curl -I https://www.webovice.eu/api/contact` | **405** + security headers + `Allow: POST` |
| `curl -I …/security.txt` | **200** |
| Intrusive PHP exploit testing | **Not performed** (policy + N/A) |
| Production Resend live send flood test | **Not performed** (non-destructive policy) |
| Vercel dashboard env / team 2FA review | **NOT VERIFIED** (no dashboard session claimed) |

---

## Deployment Checklist (when you approve)

1. Confirm Production env: `RESEND_API_KEY`, `CONTACT_EMAIL`.
2. Confirm Preview protection (Vercel Authentication) if previews must not hit Resend.
3. Deploy intentionally (`vercel --prod` only after approval).
4. Post-deploy: `curl -I https://www.webovice.eu` and `/api/contact`.
5. Smoke-test contact form once (one real email).
6. Rollback: redeploy previous Vercel deployment alias if needed.

---

## Outstanding Actions (manual)

- [ ] Upgrade local Homebrew PHP CLI to **≥ 8.5.12** (`php -v` verify).
- [ ] Optional: Turnstile / distributed rate limit for `/api/contact`.
- [ ] Optional: Protect Preview deployments; review Vercel team 2FA.
- [ ] Optional: Narrow static `Access-Control-Allow-Origin: *` in Vercel if configurable.
- [ ] Keep `CN/` and secrets out of git (now gitignored).
- [ ] Rotate `RESEND_API_KEY` if it was ever exposed in chat/logs.

---

## Final Security Status

| Claim | Status |
| --- | --- |
| Production WebOvice exposed to PHP2Shell via this app | **VERIFIED SECURE AGAINST TESTED ISSUE** (no PHP SAPI in path) |
| Contact XSS/header injection in notification email | **REMEDIATED AND TESTED** (escape + sanitize; unit tests) |
| Contact Origin / Content-Type gates | **REMEDIATED AND TESTED** |
| npm high vulns (vite / source-map-js) | **REMEDIATED AND TESTED** (`npm audit` clean) |
| Distributed anti-spam | **MITIGATED** (honeypot + Origin + soft rate limit) |
| Local PHP CLI patch level | **REQUIRES MANUAL ACTION** |
| Vercel dashboard secrets / team settings | **NOT VERIFIED** |
| “100% secure” | **UNRESOLVED / impossible claim** |

### Ready for controlled production deployment?

**Yes, from a code/security standpoint**, after you explicitly approve deploy and confirm ENV / domain checklist items. This audit pass **does not** push or deploy.
