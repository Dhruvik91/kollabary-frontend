<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Kollabary Next.js App Router frontend. The integration includes client-side initialization via `instrumentation-client.ts`, a reverse proxy through Next.js rewrites to improve ad-blocker resilience, 15 custom event captures across 9 files, and user identification on login and email verification.

**Key changes made:**

- **`instrumentation-client.ts`** (new) — Initializes PostHog with the EU host, reverse proxy, exception capture, and `defaults: '2026-01-30'`.
- **`next.config.ts`** — Added `/ingest/*` reverse proxy rewrites to `eu.i.posthog.com` and `eu-assets.i.posthog.com`, plus `skipTrailingSlashRedirect: true`.
- **`.env.local`** — Set `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`.
- **`src/hooks/use-auth.hooks.ts`** — `posthog.identify()` + `user_logged_in` on login success; `posthog.identify()` + `email_verified` on email verification; `user_logged_out` + `posthog.reset()` on logout.
- **9 feature files** — Event captures added (see table below).

## Events

| Event Name | Description | File |
|---|---|---|
| `user_signed_up` | User successfully creates a new account | `src/features/auth/SignupContainer.tsx` |
| `user_logged_in` | User successfully logs in (with identify) | `src/hooks/use-auth.hooks.ts` |
| `user_logged_out` | User logs out (with posthog.reset) | `src/hooks/use-auth.hooks.ts` |
| `email_verified` | User verifies email address (with identify) | `src/hooks/use-auth.hooks.ts` |
| `auction_created` | Brand creates a new collaboration auction | `src/features/auction/containers/AuctionCreateContainer.tsx` |
| `auction_updated` | Brand updates an existing auction | `src/features/auction/containers/AuctionEditContainer.tsx` |
| `bid_submitted` | Influencer places a bid on an auction | `src/features/auction/containers/AuctionDetailContainer.tsx` |
| `bid_accepted` | Brand accepts an influencer's bid | `src/features/auction/containers/AuctionDetailContainer.tsx` |
| `collaboration_accepted` | Influencer accepts a collaboration request | `src/features/collaboration/containers/CollaborationDetailContainer.tsx` |
| `collaboration_proof_submitted` | Influencer submits proof of work URLs | `src/features/collaboration/containers/CollaborationDetailContainer.tsx` |
| `review_submitted` | Brand submits a review after collaboration | `src/features/collaboration/containers/CollaborationDetailContainer.tsx` |
| `topup_initiated` | User opens Razorpay to buy KC coins | `src/features/top-up/TopUpContainer.tsx` |
| `topup_completed` | KC coin top-up payment verified successfully | `src/features/top-up/TopUpContainer.tsx` |
| `referral_link_copied` | User copies their referral link | `src/components/shared/ReferralCard.tsx` |
| `pitch_sent` | Influencer sends a pitch to a brand | `src/features/pitch/components/PitchNowModal.tsx` |

## Next steps

We've built a dashboard and five insights for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://eu.posthog.com/project/171727/dashboard/658231
- **Signup to Login Funnel**: https://eu.posthog.com/project/171727/insights/2TmKY57s
- **Daily New Signups**: https://eu.posthog.com/project/171727/insights/P51p7Kz7
- **Auction to Bid Acceptance Funnel**: https://eu.posthog.com/project/171727/insights/acYyZgOW
- **Top-up Payment Conversion**: https://eu.posthog.com/project/171727/insights/tLM0nxGF
- **Collaboration Activity Trends**: https://eu.posthog.com/project/171727/insights/HeafOk3a

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
