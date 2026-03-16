// ============================================================
//  contact.js — contact form submission via EmailJS
//
//  Setup (free):
//    1. Sign up at https://www.emailjs.com/
//    2. Create a Service and Email Template
//       Template variables used: from_name, from_email,
//                                subject, budget, message
//    3. Replace the three constants below with your own IDs
//
//  Fallback: if EmailJS is not configured, clicking Submit
//  opens the user's mail client with the message pre-filled.
// ============================================================

const EMAILJS_SERVICE  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE = 'YOUR_TEMPLATE_ID';
const EMAILJS_KEY      = 'YOUR_PUBLIC_KEY';

export function initContact() {
  const form   = document.getElementById('cf');
  const btn    = document.getElementById('fs');
  const status = document.getElementById('fst');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    btn.disabled    = true;
    btn.textContent = 'Sending...';
    status.className = '';
    status.style.display = 'none';

    const payload = {
      from_name:  this.from_name.value,
      from_email: this.from_email.value,
      subject:    this.subject.value,
      budget:     this.budget.value || 'Not specified',
      message:    this.message.value,
    };

    try {
      if (EMAILJS_SERVICE !== 'YOUR_SERVICE_ID') {
        // ── EmailJS send ──────────────────────────────────────
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id:    EMAILJS_SERVICE,
            template_id:   EMAILJS_TEMPLATE,
            user_id:       EMAILJS_KEY,
            template_params: payload,
          }),
        });
        if (!res.ok) throw new Error('EmailJS error');
        status.textContent = "✓ Message sent! I'll get back to you within 24 hours.";
        status.className   = 'ok';
        this.reset();
      } else {
        throw new Error('EmailJS not configured — falling back to mailto');
      }
    } catch {
      // ── Mailto fallback ────────────────────────────────────
      const body = [
        `From: ${payload.from_name} (${payload.from_email})`,
        `Budget: ${payload.budget}`,
        '',
        payload.message,
      ].join('\n');

      window.location.href = `mailto:anmol.8.gupta@gmail.com`
        + `?subject=${encodeURIComponent(payload.subject)}`
        + `&body=${encodeURIComponent(body)}`;

      status.textContent = '📧 Opening mail client… Configure EmailJS for in-page sending.';
      status.className   = 'ok';
    }

    btn.disabled    = false;
    btn.textContent = 'Send Message ⟶';
  });
}
