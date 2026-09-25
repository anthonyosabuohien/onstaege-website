export const FOUNDER_EMAIL = 'anthonyosabuohien101@gmail.com';

export interface EarlyAccessSubmissionPayload {
  ticketId: string;
  email: string;
  role: string;
  spaceName?: string;
  city?: string;
  intent?: string;
  submittedAt: string;
}

export interface NewsletterSubmissionPayload {
  email: string;
  source?: string;
  subscribedAt: string;
}

/**
 * Automatically dispatches a copy of early access submission details to the founder's email in the background.
 */
export async function sendAutomaticEarlyAccessAlert(payload: EarlyAccessSubmissionPayload): Promise<boolean> {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${FOUNDER_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `⚡ Onstaege Early Access: ${payload.email} (${payload.role})`,
        _template: 'table',
        _captcha: 'false',
        'Applicant Email': payload.email,
        'Audience Category': payload.role,
        'Venue / Space': payload.spaceName || 'Not specified',
        'City / Location': payload.city || 'Global Remote',
        'Access Pass ID': payload.ticketId,
        'Intent / Feature': payload.intent || 'General Early Access',
        'Submitted At (UTC)': payload.submittedAt,
      }),
    });

    return res.ok;
  } catch (err) {
    // Non-blocking background dispatch
    console.warn('Background founder alert notice:', err);
    return false;
  }
}

/**
 * Automatically dispatches a copy of newsletter subscription to founder's email.
 */
export async function sendAutomaticNewsletterAlert(payload: NewsletterSubmissionPayload): Promise<boolean> {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${FOUNDER_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `📬 Onstaege Newsletter: ${payload.email}`,
        _template: 'table',
        _captcha: 'false',
        'Subscriber Email': payload.email,
        'Subscription Source': payload.source || 'Website Footer',
        'Timestamp (UTC)': payload.subscribedAt,
      }),
    });

    return res.ok;
  } catch (err) {
    console.warn('Background newsletter alert notice:', err);
    return false;
  }
}
