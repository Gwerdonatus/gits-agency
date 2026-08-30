# CI

`deploy.yml` typechecks and builds the Cloudflare worker on every push and pull
request, and deploys to Cloudflare Workers when the push is to `main`.

It runs on Linux deliberately. The OpenNext Cloudflare adapter is not fully
supported on Windows — `npm run build:worker` fails there with
`ERR_UNSUPPORTED_ESM_URL_SCHEME` on absolute `C:\` paths — so building in CI is
what makes deploying from a Windows machine unnecessary.

## What you must configure

The workflow cannot deploy until these exist. Until then it will still run and
report build failures, which is useful on its own.

### Repository secrets
_Settings → Secrets and variables → Actions → Secrets_

| Secret | Where it comes from |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens → Create Token → **Edit Cloudflare Workers** template |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → Workers & Pages → Account ID in the right-hand pane |
| `SANITY_API_READ_TOKEN` | sanity.io/manage → API → Tokens → a **Viewer** token. Needed because the blog reads from Sanity during the build |

### Repository variables (optional)
_Settings → Secrets and variables → Actions → Variables_

These are inlined into the client bundle and are readable in the shipped
JavaScript regardless, so they are variables rather than secrets. The workflow
falls back to the same defaults the code uses, so you only need them if yours
differ.

| Variable | Default |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `vih4pg3q` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-05-21` |

## Runtime secrets belong in Cloudflare, not here

Everything the API routes read at request time — `GROQ_API_KEY`,
`RESEND_API_KEY`, `SANITY_WRITE_TOKEN`, `ADMIN_PASSWORD`, the `EMAIL_FROM_*`
addresses — is read by the running Worker, not by the build. Putting them in
GitHub would do nothing.

Set them once against the Worker:

```bash
npx wrangler secret put GROQ_API_KEY
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put SANITY_WRITE_TOKEN
npx wrangler secret put ADMIN_PASSWORD
```

Or in the Cloudflare dashboard under Workers & Pages → your worker → Settings →
Variables and Secrets. They persist across deploys; you set them once.

If the chat replies "Something went wrong" in production while working locally,
a missing `GROQ_API_KEY` on the Worker is the first thing to check.
