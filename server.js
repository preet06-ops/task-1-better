const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 3000;
// Default owner email — change via OWNER_EMAIL env if needed
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'preetham.b099@gmail.com';

// Simple health check
app.get('/health', (req, res) => res.json({ ok: true }));

app.post('/send', async (req, res) => {
    const { name, email, message } = req.body || {};
    if (!email || !message) return res.status(400).json({ error: 'Missing email or message' });

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: (process.env.SMTP_SECURE === 'true'),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const from = process.env.FROM_EMAIL || process.env.SMTP_USER;

        // Send confirmation to the submitter
        await transporter.sendMail({
            from,
            to: email,
            subject: `Thanks for contacting Elevated Labs`,
            text: `Hi ${name || ''},\n\nThanks for reaching out. We received your message:\n\n${message}\n\n— Elevated Labs`,
            html: `<p>Hi ${name || ''},</p><p>Thanks for reaching out. We received your message:</p><blockquote>${message}</blockquote><p>— Elevated Labs</p>`
        });

        // Send notification to owner if configured
        if (OWNER_EMAIL) {
            await transporter.sendMail({
                from,
                to: OWNER_EMAIL,
                subject: `New contact from ${name || email}`,
                text: `From: ${name} <${email}>\n\n${message}`,
                html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${message}</p>`
            });
        }

        return res.json({ ok: true });
    } catch (err) {
        console.error('Email send error', err);
        return res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
