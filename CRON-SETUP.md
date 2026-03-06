# Email Notification System Setup

TheDashAfrica has a built-in email notification system that sends alerts to subscribers when new articles are published.

## How It Works

1. **Subscribe API** (`/api/subscribe.php`): Handles new subscriptions and stores emails in `subscribers.json`
2. **Notify API** (`/api/notify.php`): Checks the RSS feed for new articles and sends email notifications to all subscribers
3. **RSS Feed** (`/rss_feed.xml`): Must be updated when new articles are published

## Setup for Email Notifications

### Option 1: Using Gmail SMTP

1. Create an **App Password** for your Google Account:
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Go to App Passwords (search for it)
   - Create a new app password for "Mail"

2. Edit `smtp-config.json` and add your details:
   ```json
   {
     "host": "smtp.gmail.com",
     "port": 587,
     "username": "your-email@gmail.com",
     "password": "your-16-character-app-password",
     "use_tls": true
   }
   ```

### Option 2: Using Other SMTP Services

For other email services (SendGrid, Mailgun, Amazon SES, etc.), update `smtp-config.json` with their SMTP settings:
- **SendGrid**: smtp.sendgrid.net, port 587
- **Mailgun**: smtp.mailgun.org, port 587
- **Amazon SES**: Your AWS SES SMTP endpoint

## Setting Up Automatic Notifications (Cron Job)

To automatically notify subscribers when new articles are published, set up a cron job to call the notify API periodically.

### On Linux/Unix Server

Add this to your crontab (`crontab -e`):

```bash
# Run every 15 minutes
*/15 * * * * curl -s https://thedashafrica.com/api/notify.php
```

### On cPanel Hosting

1. Log into cPanel
2. Go to **Cron Jobs**
3. Add a new cron job:
   - Common Settings: Every 15 minutes (*/15)
   - Command: `curl -s https://thedashafrica.com/api/notify.php`

### On Windows Server (Task Scheduler)

1. Open Task Scheduler
2. Create Basic Task
3. Set trigger: Every 15 minutes
4. Action: Start a program
5. Program: `curl`
6. Arguments: `-s https://thedashafrica.com/api/notify.php`

## Testing the System

1. **Test Subscribe**: Submit an email at `/subscribe`
2. **Test Notify**: Visit `/api/notify.php` in your browser
3. **Check Subscribers**: View `public/api/data/subscribers.json`

## Manual Notification

You can manually trigger notifications by:
- Visiting: `https://thedashafrica.com/api/notify.php`
- Or running: `curl https://thedashafrica.com/api/notify.php`

## Troubleshooting

- **Emails not sending**: Check PHP error logs, verify SMTP settings
- **No new articles detected**: Ensure RSS feed is being updated when articles are published
- **Duplicate notifications**: The system has a 15-minute cooldown to prevent spam
