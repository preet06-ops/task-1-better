# Elevated Landing — Local email sender

This project includes a small Express server (`server.js`) that forwards contact form submissions via SMTP using Nodemailer.

Quick setup:

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and set your SMTP credentials. Example fields:

- `SMTP_HOST` — your SMTP server host (e.g., smtp.gmail.com)
- `SMTP_PORT` — usually 587 for TLS, 465 for SSL
- `SMTP_SECURE` — `true` for SSL (465), `false` for TLS (587)
- `SMTP_USER` / `SMTP_PASS` — SMTP auth
- `FROM_EMAIL` — optional From address (defaults to SMTP_USER)
- `OWNER_EMAIL` — where notifications will be sent (defaults to `preetham.b099@gmail.com`)

3. Start the server:

```bash
npm start
```

4. Open `index.html` in your browser or serve the folder and submit the contact form. The server will:

- Send a confirmation email to the submitter's address.
- Send a notification email to `OWNER_EMAIL` (defaults to `preetham.b099@gmail.com`).

Security notes:
- Do NOT commit your `.env` with real credentials.
- For production, use a secure service or transactional email provider.

If you want, I can also add client-side validation or wire a newsletter subscription endpoint.
