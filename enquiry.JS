/* 
   enquiry.js — Validation, dynamic price estimate response,
                accordion business hours, character counter
    */

document.addEventListener('DOMContentLoaded', () => {

  /* 
     1. ACCORDION for Business Hours table
  */
  const hoursH2 = [...document.querySelectorAll('h2')].find(h => h.textContent.includes('Business Hours'));
  const hoursTable = document.querySelector('table');

  if (hoursH2 && hoursTable) {
    hoursH2.style.cssText += `cursor:pointer; display:flex; align-items:center;
      justify-content:space-between; user-select:none;`;

    const arrow = document.createElement('span');
    arrow.id = 'hours-arrow';
    arrow.textContent = '▾';
    arrow.style.cssText = `font-size:1.2rem; color:var(--terracotta); transition:transform 0.3s;`;
    hoursH2.appendChild(arrow);

    let open = true;
    hoursH2.addEventListener('click', () => {
      open = !open;
      hoursTable.style.maxHeight = open ? hoursTable.scrollHeight + 'px' : '0';
      hoursTable.style.overflow  = 'hidden';
      hoursTable.style.transition = 'max-height 0.35s ease';
      arrow.style.transform = open ? 'rotate(0deg)' : 'rotate(-90deg)';
    });

    // Set initial max-height for transition to work
    hoursTable.style.maxHeight  = hoursTable.scrollHeight + 'px';
    hoursTable.style.overflow   = 'hidden';
    hoursTable.style.transition = 'max-height 0.35s ease';
  }

  /* 
     2. CHARACTER COUNTER for message textarea
   */
  const msgArea = document.getElementById('message');
  if (msgArea) {
    const counter = document.createElement('span');
    counter.style.cssText = `font-size:0.75rem; color:var(--warm-grey);
      display:block; text-align:right; margin-top:0.2rem;`;
    counter.textContent = '0 / 500';
    msgArea.after(counter);

    msgArea.addEventListener('input', () => {
      const len = msgArea.value.length;
      counter.textContent = `${len} / 500`;
      counter.style.color = len > 450 ? 'var(--terracotta)' : 'var(--warm-grey)';
      if (len > 500) msgArea.value = msgArea.value.slice(0, 500);
    });
  }

  /* 
     3. FORM VALIDATION + PRICE ESTIMATE RESPONSE
  */
  const form = document.querySelector('main form');
  if (!form) return;

  /* Inject styles once */
  if (!document.getElementById('enq-styles')) {
    const s = document.createElement('style');
    s.id = 'enq-styles';
    s.textContent = `
      @keyframes enqFadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      @keyframes enqShake {
        0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)}
        40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)}
      }
      .field-err {
        color:#C0392B; font-size:0.78rem; margin-top:0.2rem;
        display:block; animation:enqFadeIn 0.2s ease;
      }
      #enq-response {
        background: linear-gradient(135deg, var(--charcoal), #3A2A1F);
        color: var(--cream);
        border-radius: var(--radius-md);
        padding: 2rem 2.2rem;
        margin-top: 2rem;
        animation: enqFadeIn 0.4s ease;
        box-shadow: var(--shadow-card);
      }
      #enq-response h3 { color: var(--clay); margin-bottom: 1rem; font-size: 1.2rem; }
      #enq-response p  { color: #C8B89A; margin-bottom: 0.6rem; max-width:none; }
      #enq-response .highlight { color: var(--accent-gold); font-weight: 700; font-size: 1.1rem; }
      #enq-response ul { list-style:none; padding:0; margin:0.8rem 0; }
      #enq-response ul li { color:#C8B89A; padding:0.3rem 0 0.3rem 1.4rem; position:relative; font-size:0.93rem; }
      #enq-response ul li::before { content:'▸'; position:absolute; left:0; color:var(--terracotta); }
    `;
    document.head.appendChild(s);
  }

  /* Error helpers */
  function setError(input, msg) {
    clearErr(input);
    input.style.borderColor = '#C0392B';
    input.style.boxShadow = '0 0 0 3px rgba(192,57,43,0.12)';
    const span = document.createElement('span');
    span.className = 'field-err';
    span.textContent = msg;
    input.closest('.form-group').appendChild(span);
  }

  function clearErr(input) {
    input.style.borderColor = 'var(--light-border)';
    input.style.boxShadow = 'none';
    const s = input.closest('.form-group')?.querySelector('.field-err');
    if (s) s.remove();
  }

  /* Validators */
  const rules = {
    firstName: v => !v.trim() ? 'First name is required.' : v.trim().length < 2 ? 'At least 2 characters.' : null,
    lastName:  v => !v.trim() ? 'Last name is required.' : null,
    email:     v => !v.trim() ? 'Email is required.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Enter a valid email.' : null,
    phone:     v => v && v.trim() && !/^[\d\s\+\-\(\)]{7,15}$/.test(v.trim()) ? 'Enter a valid phone number.' : null,
    product:   v => !v ? 'Please select a product category.' : null,
    quantity:  v => !v ? 'Please select a quantity.' : null,
    budget:    v => !v ? 'Please select a budget range.' : null,
    message:   v => !v.trim() ? 'Message is required.' : v.trim().length < 10 ? 'At least 10 characters please.' : null,
  };

  // Real-time blur validation
  Object.keys(rules).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', () => {
      const err = rules[id](el.value);
      err ? setError(el, err) : clearErr(el);
    });
  });

  /* Price estimate calculator */
  function calcEstimate(budget, quantity, product) {
    const budgetMap = {
      'under500':    [0, 499],
      '500-2000':    [500, 2000],
      '2000-10000':  [2000, 10000],
      '10000+':      [10000, 50000]
    };
    const qtyMap = {
      '1-5': 3, '6-20': 13, '21-50': 35, '50+': 75
    };
    const premiumProducts = ['ceramic', 'custom', 'wholesale'];

    const range   = budgetMap[budget] || [0, 0];
    const qty     = qtyMap[quantity]  || 1;
    const premium = premiumProducts.includes(product) ? 1.2 : 1;

    const perUnit = Math.round((range[0] + range[1]) / 2 / qty * premium);
    return { perUnit, total: Math.round(perUnit * qty) };
  }

  /* Build response card */
  function buildResponse(data) {
    const { firstName, product, quantity, budget } = data;
    const est = calcEstimate(budget, quantity, product);

    const productLabels = {
      indoor: 'Indoor Plant Pots', outdoor: 'Outdoor Garden Pots',
      ceramic: 'Ceramic Pots', terracotta: 'Terracotta Pots',
      hanging: 'Hanging Pots', decorative: 'Decorative Pots',
      wholesale: 'Wholesale / Bulk Order', custom: 'Custom / Bespoke Order',
      other: 'General Enquiry'
    };

    const availability = product === 'custom' ? '3–5 business days' :
                         product === 'wholesale' ? '5–10 business days' : '1–2 business days';

    return `
      <div id="enq-response">
        <h3>✓ Enquiry Received, ${firstName}!</h3>
        <p>Thank you for reaching out about <strong style="color:var(--cream)">${productLabels[product] || 'our products'}</strong>.
        We will get back to you within <strong style="color:var(--cream)">${availability}</strong>.</p>

        <p style="margin-top:1rem; font-size:0.78rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--warm-grey);">
          Estimated Cost Breakdown
        </p>
        <p class="highlight">≈ R${est.perUnit.toLocaleString()} per unit &nbsp;|&nbsp; R${est.total.toLocaleString()} total (${quantity} units)</p>
        <p style="font-size:0.8rem; color:#8A7968; margin-top:-0.4rem;">
          *Estimate based on your selected budget range. Final pricing confirmed on quote.
        </p>

        <p style="margin-top:1.2rem; font-size:0.78rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--warm-grey);">
          What Happens Next
        </p>
        <ul>
          <li>Our team reviews your enquiry and prepares a tailored quote</li>
          <li>We email you a formal quote within ${availability}</li>
          <li>You confirm the order and we arrange delivery or collection</li>
        </ul>

        <p style="margin-top:1.2rem; font-size:0.85rem;">
          Questions in the meantime? Call us: <strong style="color:var(--cream)">+27 60 897 2588</strong>
        </p>
      </div>
    `;
  }

  /* Submit */
  form.addEventListener('submit', e => {
    e.preventDefault();

    let hasError = false;
    Object.keys(rules).forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const err = rules[id](el.value);
      if (err) { setError(el, err); hasError = true; }
      else clearErr(el);
    });

    if (hasError) {
      const submitBtn = form.querySelector('input[type="submit"]');
      if (submitBtn) {
        submitBtn.style.animation = 'enqShake 0.4s ease';
        submitBtn.addEventListener('animationend', () => submitBtn.style.animation = '', { once: true });
      }

      // Scroll to first error
      const firstErr = form.querySelector('.field-err');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Remove old response if any
    const old = document.getElementById('enq-response');
    if (old) old.remove();

    // Inject response
    const responseHTML = buildResponse({
      firstName: document.getElementById('firstName')?.value || 'Customer',
      product:   document.getElementById('product')?.value   || 'other',
      quantity:  document.getElementById('quantity')?.value  || '1-5',
      budget:    document.getElementById('budget')?.value    || 'under500',
    });

    form.insertAdjacentHTML('afterend', responseHTML);
    document.getElementById('enq-response').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

});