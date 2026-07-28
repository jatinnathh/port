/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Simple .env parser
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    let val = parts.slice(1).join('=').trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.substring(1, val.length - 1);
    }
    env[key] = val;
  }
});

console.log('Testing SMTP connection with settings:');
console.log('Host:', env.SMTP_HOST);
console.log('Port:', env.SMTP_PORT);
console.log('User:', env.SMTP_USER);
console.log('Target Email:', env.NOTIFICATION_EMAIL);

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST ,
  port: Number(env.SMTP_PORT),
  secure: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

async function main() {
  try {
    const info = await transporter.sendMail({
      from: `"Portfolio Test" <${env.SMTP_USER}>`,
      to: env.NOTIFICATION_EMAIL || env.SMTP_USER,
      subject: 'Sherlock/Portfolio Alert Test: Page Visit Notification',
      text: 'Test notification from Portfolio Notify API setup.\nSomeone visited your portfolio page!',
    });
    console.log('Email sent successfully! Message ID:', info.messageId);
  } catch (err) {
    console.error('SMTP test failed:', err);
  }
}

main();
