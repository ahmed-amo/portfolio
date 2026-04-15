# EmailJS Setup Instructions

## Step 1: Get Your EmailJS Credentials

1. Go to [emailjs.com](https://www.emailjs.com) and sign up/login
2. Add a new email service (Gmail recommended)
3. Create a new email template with these variables:
   - `{{from_name}}` - sender's name
   - `{{from_email}}` - sender's email
   - `{{subject}}` - message subject
   - `{{message}}` - message content
4. Get your credentials:
   - **Service ID** (from Email Services page)
   - **Template ID** (from Email Templates page)
   - **Public Key** (from Account page)

## Step 2: Update Contact.tsx

Open `src/components/Contact.tsx` and replace these lines (around line 72-74):

```typescript
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Replace with your Public Key
```

With your actual credentials from EmailJS:

```typescript
const EMAILJS_SERVICE_ID = "service_abc123"; // Your actual Service ID
const EMAILJS_TEMPLATE_ID = "template_xyz789"; // Your actual Template ID
const EMAILJS_PUBLIC_KEY = "your_public_key_here"; // Your actual Public Key
```

## Step 3: Test Your Form

1. Run your development server: `npm run dev`
2. Navigate to the Contact section
3. Fill out the form and submit
4. Check your email for the message!

## Email Template Example

Here's a suggested template format for EmailJS:

**Subject**: New Contact from {{from_name}}

**Body**:
```
You have a new message from your portfolio:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

**To Email**: azzeddinehanibenchalel@gmail.com

## Troubleshooting

- **"Public Key is required"**: Make sure you've replaced `YOUR_PUBLIC_KEY` with your actual key
- **"Service not found"**: Double-check your Service ID
- **"Template not found"**: Verify your Template ID
- **Emails not arriving**: Check your spam folder and EmailJS dashboard

## Free Tier Limits

- 200 emails per month
- More than enough for a portfolio site!

## Need Help?

Check the EmailJS documentation: https://www.emailjs.com/docs/
