# HSWLP:Next – Cloudflare-Powered Next-Generation SaaS Framework

**HSWLP:Next** is the new **core system** of the HSWLP platform.  
It provides a **modern, Cloudflare-native foundation** on which various frontend “shells” (applications) can be built and deployed — without the need for a separate backend.

The framework is designed for **scalability, security, and speed**, making it ready for launching SaaS products directly on Cloudflare’s infrastructure.

---

## ✨ Key Features

- **Authentication & Onboarding**  
  Sign-up, login, email verification, and Cloudflare Turnstile captcha

- **Cloudflare-Native Storage**  
  D1 database with migrations, R2 object storage, and KV for session handling

- **Payments & Billing**  
  Stripe integration for subscriptions and purchases  
  Email notifications via Resend or Brevo

- **Cloud-Optimized Deployment**  
  Seamless deployment to Cloudflare Workers with support for Pages and Edge Functions

---

## 🚀 Getting Started (Local Development)

1. **Install dependencies**

   ```bash
   pnpm install

2. **Configure environment variables**
   Copy `.env.example` to `.env` and fill in your values.
   (For local dev, also copy `.dev.vars.example` → `.dev.vars`)

3. **Run migrations and start the dev server**

   ```bash
   pnpm db:migrate:dev
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

---

## ☁️ Deployment to Cloudflare

Deploy in one step:

```bash
pnpm run deploy
```

This will:

* Build the Worker
* Upload static assets (R2)
* Bind secrets, database, KV, and buckets via Wrangler

> ⚠️ Secrets must be configured manually with
> `wrangler secret put` or in the Cloudflare dashboard.

---

## 📂 Project Structure

* `src/constants.ts` → configuration constants
* `src/react-email/` → email templates
* `src/app/globals.css` → global styles
* `src/app/layout.tsx` → metadata & layout
* `wrangler.json` → Worker configuration

Preview email templates locally:

```bash
pnpm email:dev
```

→ [http://localhost:3001](http://localhost:3001)

---

## 🛠️ Roadmap

HSWLP\:Next will serve as the foundation for upcoming HSWLP apps:

* **HSWLP\:Cloud** – Static website deployments
* **HSWLP\:NAS** – Local Docker stack manager
* **HSWLP\:Dev** – Developer hub
* **HSWLP\:Store** – Template marketplace
* **HSWLP\:Academy** – Learning modules

**One system, many possibilities.
Built cleanly, built on Cloudflare.**
