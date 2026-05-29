# F3 Re-run QA Report

Date: 2026-05-25
Project: umkm_tahu

## Static Verification (login/page.tsx line 155)

Password toggle button has the fix applied:
```
className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 inline-flex items-center justify-center p-0 bg-transparent border-0"
```

Confirmed:
- w-6 h-6 (24px x 24px constrained box)
- inline-flex + items-center + justify-center (icon centering)
- p-0 (no padding contribution)
- bg-transparent + border-0 (no visual box)
- absolute right-3 (positioned inside the input's pr-2.75rem padding)

The previous overflow root cause (default browser button padding/border pushing past form edge) is structurally addressed.

## HTTP-level Verification (curl-equivalent)

| Path | Status | Location | Pass |
|------|--------|----------|------|
| /login | 200 | (page renders, 26496 bytes) | yes |
| /beranda | 307 | /login | yes |
| /catat | 307 | /login | yes |

Auth redirect: PASS

## Browser-level Verification (Playwright MCP)

NOT EXECUTED. Playwright MCP returned 'Not connected' on every navigate/snapshot/resize attempt across ~10 retries. No browser session could be opened.

This means the following could NOT be empirically verified:
- document.body.scrollWidth <= window.innerWidth + 2 at 390x844
- document.body.scrollWidth <= window.innerWidth + 2 at 1280x800
- JS console errors on /login

## Verdict

Auth redirect: PASS (HTTP 307 -> /login confirmed for both /beranda and /catat).
Overflow: UNVERIFIED at runtime, but the source-level fix is correctly in place.
Console errors: UNVERIFIED.

VERDICT: PARTIAL. Cannot fully approve without browser-rendered checks. Recommend re-running this QA when Playwright MCP is connected.
