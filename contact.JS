/* 
   contact.js — Form validation + mailto email submission
   */

document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('main form');
  if (!form) return;

  /*  Helper: show/clear field error  */
  function showError(input, message) {
    clearError(input);
    input.style.borderColor = '#C0392B';
    input.style.boxShadow = '0 0 0 3px rgba(192,57,43,0.12)';

    const err = document.createElement('span');
    err.className = 'field-error';
    err.style.cssText = `
      color:#C0392B; font-size:0.78rem; margin-top:0.2rem;
      display:block; animation: fadeIn 0.2s ease;
    `;
    err.textContent = message;
    input.parentNode.appendChild(err);
  }

  function clearError(input) {
    input.style.borderColor = 'var(--light-border)';
    input.style.boxShadow = 'none';
    const prev = input.parentNode.querySelector('.field-error');
    if (prev) prev.remove();
  }

  /*  Inject fadeIn animation once  */
  if (!document.getElementById('contact-anim')) {
    const s = document.createElement('style');
    s.id = 'contact-anim';
    s.textContent = `@keyframes fadeIn { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }`;
    document.head.appendChild(s);
  }

  /*  Validation rules  */
  function validateName(val) {
    if (!val.trim()) return 'Name is required.';
    if (val.trim().length < 2) return 'Name must be at least 2 characters.';
    return null;
  }

  function validateEmail(val) {
    if (!val.trim()) return 'Email address is required.';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(val.trim())) return 'Please enter a valid email address.';
    return null;
  }

  function validateMessage(val) {
    if (!val.trim()) return 'Message is required.';
    if (val.trim().length < 10) return 'Message must be at least 10 characters.';
    return null;
  }

  /*  Real-time validation on blur  */
  const nameInput    = form.querySelector('#name');
  const emailInput   = form.querySelector('#email');
  const messageInput = form.querySelector('#message');

  if (nameInput)    nameInput.addEventListener('blur',    () => { const e = validateName(nameInput.value);       e ? showError(nameInput, e)    : clearError(nameInput); });
  if (emailInput)   emailInput.addEventListener('blur',   () => { const e = validateEmail(emailInput.value);     e ? showError(emailInput, e)   : clearError(emailInput); });
  if (messageInput) messageInput.addEventListener('blur', () => { const e = validateMessage(messageInput.value); e ? showError(messageInput, e) : clearError(messageInput); });

  /*  Submit  */
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Validate all
    const nameErr    = validateName(nameInput?.value || '');
    const emailErr   = validateEmail(emailInput?.value || '');
    const messageErr = validateMessage(messageInput?.value || '');

    [{ input: nameInput, err: nameErr }, { input: emailInput, err: emailErr }, { input: messageInput, err: messageErr }]
      .forEach(({ input, err }) => {
        if (!input) return;
        err ? showError(input, err) : clearError(input);
      });

    if (nameErr || emailErr || messageErr) {
      // Shake the submit button
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.style.animation = 'shake 0.4s ease';
        btn.addEventListener('animationend', () => btn.style.animation = '', { once: true });

        if (!document.getElementById('shake-anim')) {
          const s = document.createElement('style');
          s.id = 'shake-anim';
          s.textContent = `@keyframes shake {
            0%,100%{transform:translateX(0)}
            20%{transform:translateX(-6px)}
            40%{transform:translateX(6px)}
            60%{transform:translateX(-4px)}
            80%{transform:translateX(4px)}
          }`;
          document.head.appendChild(s);
        }
      }
      return;
    }

    // Build mailto link and open
    const subject = encodeURIComponent('Contact Form Message - Business Pots DAKALO');
    const body    = encodeURIComponent(
      `Name: ${nameInput.value}\nEmail: ${emailInput.value}\n\nMessage:\n${messageInput.value}`
    );
    window.location.href = `mailto:dakalonetswera03@gmail.com?subject=${subject}&body=${body}`;

    // Show success message
    showSuccess(form);
    form.reset();
  });

  function showSuccess(form) {
    const existing = document.getElementById('successMessage');
    if (existing) existing.remove();

    const msg = document.createElement('div');
    msg.id = 'successMessage';
    msg.style.cssText = `
      background:#EDF7ED; border:1px solid #87C987; color:#2D6A2D;
      padding:1rem 1.4rem; border-radius:var(--radius-sm);
      font-size:0.95rem; margin-top:1rem;
      animation:fadeIn 0.3s ease;
    `;
    msg.textContent = '✓ Thank you! Your email client will open shortly to send your message.';
    form.after(msg);

    setTimeout(() => msg.remove(), 6000);
  }

});