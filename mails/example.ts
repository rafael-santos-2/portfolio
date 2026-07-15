// IMPORTS
// ----------------------------------------------------------------------------------------------------
// npm install @sendgrid/mail
// .env: SENDGRID_API_KEY=your_key_here
import sgMail from '@sendgrid/mail';
// ----------------------------------------------------------------------------------------------------


// CONFIG
// ----------------------------------------------------------------------------------------------------
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
// ----------------------------------------------------------------------------------------------------


// SEND
// ----------------------------------------------------------------------------------------------------
export async function send_example_mail() {
  await sgMail.send({
    to:      { email: 'recipient@example.com', name: 'Recipient Name' },
    from:    { email: 'noreply@yourdomain.com', name: 'Bird Larsen' },
    subject: 'Hello from Bird Larsen',
    text:    'Plain text fallback.',
    html:    '<p>Hello! This is a test email.</p>',

    // Optional fields:
    cc:           { email: 'someone@example.com', name: 'Someone' },
    bcc:          { email: 'hidden@example.com', name: 'Hidden' },
    replyTo:      { email: 'reply@yourdomain.com', name: 'Reply Name' },
    attachments: [{ content: '<base64>', filename: 'file.pdf', type: 'application/pdf', disposition: 'attachment' }],
  });
}
// ----------------------------------------------------------------------------------------------------
