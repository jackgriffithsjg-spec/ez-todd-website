# EZ TODD by EZ Law QA Validation Report

Date: June 5, 2026

## Scope

This was an end-to-end validation pass for the current EZ TODD by EZ Law prototype flow:

- Homepage and main CTA entry
- Start page
- Intake mockup
- Tier 1 red-flag routing
- Tier 2 review tags
- Preliminary deed recommendation
- Intake summary
- Limited-scope engagement agreement mockup
- Checkout review mockup
- Pricing consistency
- Footer/legal disclaimer consistency
- Static preview file routing
- SEO/AEO basics
- Mobile-first layout indicators

No real payment, database, e-signature, backend submission, or final legal agreement functionality was connected.

## Testing Framework Inspection

No existing Playwright, Cypress, Vitest, Jest, React Testing Library, or other test setup was found. The project contains Next.js scripts only:

- `dev`
- `build`
- `lint`
- `typecheck`

Because no testing framework exists and no package runner is available in this environment, this report documents a manual QA pass and lightweight command-based validation.

## Commands Run

| Command | Result |
| --- | --- |
| `rg --files -g '*playwright*' -g '*cypress*' -g '*vitest*' -g '*jest*' -g '*.spec.*' -g '*.test.*'` | No test framework or test files found |
| `find app -maxdepth 4 -type f \| sort` | Confirmed current App Router routes |
| `rg -n "<h1" app components *.html` | Confirmed H1 sources across app/static pages |
| `rg -n "FAQPage\|application/ld\\+json" app lib components` | Confirmed FAQ JSON-LD and homepage schema output |
| Static local-link check with Node | Passed: all static `.html` local file links resolve |
| Intake logic scenario check with Node | Passed expected recommendation/red-flag outcomes |
| `npm run build` | Failed: `npm` command not found |
| `npm run lint` | Failed: `npm` command not found |
| `npm run typecheck` | Failed: `npm` command not found |

## Scenario Results

| Scenario | Expected | Actual | Status |
| --- | --- | --- | --- |
| 1. Clean TODD Path | Continue through intake, no hard stop, recommend Transfer on Death Deed, show $500 selected-only price, continue to summary/agreement/checkout | Logic returns no flags, recommendation `Transfer on Death Deed`, total `$500`; routed summary/agreement/checkout preserve selected deed via query string | Pass |
| 2. Clean Lady Bird Path / Review Path | Recommend Lady Bird or show review note, show only Lady Bird `$600`, continue if no Tier 1 flag | Logic returns no flags, recommendation `Lady Bird Deed`, total `$600`; fixed summary/agreement/checkout to preserve Lady Bird selection | Pass |
| 3. Missing Legal Description | Not blocked, add-on/review tag appears, price includes +$20 if selected/authorized | Logic returns `Add-on: legal description retrieval`, total `$520`; fixed routed summary/checkout to show add-on state | Pass |
| 4. Medicaid / Long-Term Care | Route to Attorney Review Required, no checkout path, request call CTAs | Logic returns `Attorney Review Needed` with Medicaid flag; review-required screen hides intake form and does not show checkout CTA | Pass |
| 5. Non-Texas Property | Route to stop/review-required state, explain Texas-only issue, no checkout | Logic returns `Attorney Review Needed` with non-Texas flag; review-required screen lists the issue and checkout is unavailable | Pass |
| 6. Pricing Consistency | Global pages show flat-fee comparison; summary/checkout show selected deed only or comparison fallback if no selection | Fixed selected-only pricing and comparison fallback for summary/checkout; global pricing remains TODD `$500`, Lady Bird `$600`, legal-description add-on `$20` | Pass |
| 7. Legal Disclaimer Consistency | Footer/legal page include legal advice, attorney-client relationship, Texas-only, estate-plan, and no-guarantee limitations | Footer appears on all app routes; legal page and static legal preview contain required disclaimers | Pass |
| 8. Navigation and CTA Routing | Header/footer/CTA links resolve; no dead links; normal flow reaches checkout; red flags cannot | Static local-link check passed. Removed dead `#` save/resume and logo placeholders. Normal flow links are wired | Pass |
| 9. Mobile Responsiveness | Cards stack, buttons tap-friendly, progress usable, no obvious horizontal-scroll source | Code/static CSS use mobile-first grids, full-width mobile buttons, overflow-x intake progress, responsive header/footer | Pass by code inspection |
| 10. SEO/AEO Basics | One H1 per page, page metadata, FAQ schema, core terms present | H1s confirmed in route or component sources; metadata present; FAQ schema present; core terms appear naturally | Pass |

## Bugs Found

1. Intake summary and checkout did not preserve the deed recommendation from intake.
   - Impact: Lady Bird path and missing-legal-description path could display TODD `$500` pricing later in the mock flow.
   - Status: Fixed.

2. Intake summary and checkout had no true "no deed selected" fallback.
   - Impact: Direct visits could imply TODD was selected even when no deed had been selected.
   - Status: Fixed with comparison-style fallback pricing.

3. Static preview had dead `#` links.
   - Impact: Navigation QA found non-functional placeholders.
   - Status: Fixed by making save/resume non-clickable and pointing static logo links to `preview.html`.

## Fixes Made

- Added lightweight query-string state between intake, summary, engagement agreement, and checkout:
  - `deed=todd`
  - `deed=lady-bird`
  - `legalDescription=yes|no`
- Updated app summary page to show:
  - selected/recommended deed pricing when a deed is present
  - comparison pricing when no deed is present
- Updated app engagement agreement page to preserve deed/fee through checkout.
- Updated app checkout page to show selected-only pricing or comparison fallback.
- Updated static preview files to mirror the same flow behavior.
- Removed dead placeholder links in the intake help bar and static homepage logo.

## Remaining Recommendations

- Install/use the package manager in the local environment so `npm run build`, `npm run lint`, and `npm run typecheck` can run.
- When the project is ready for formal QA, add Playwright or another E2E framework and automate the ten validation scenarios.
- Once a backend exists, replace query-string mock state with stored intake/session state.
- Add real route guards later so Tier 1 matters cannot manually jump to checkout with crafted URLs.
- Add visual browser QA once the app is served by a local dev server rather than static `file://` previews.
