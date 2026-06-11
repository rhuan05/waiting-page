function toggleFaq(el) {
    const item = el.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-toggle').textContent = '+';
    });
    if (!isOpen) {
        item.classList.add('open');
        item.querySelector('.faq-toggle').textContent = '−';
    }
}

function showSuccess() {
    document.getElementById('landing-page').style.display = 'none';
    const s = document.getElementById('success-page');
    s.classList.add('visible');
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function showLanding() {
    const btn = document.getElementById('hero-btn');
    document.getElementById('success-page').classList.remove('visible');
    document.getElementById('landing-page').style.display = 'block';
    document.getElementById('hero-EMAIL').value = '';
    document.getElementById('hero-FNAME').value = '';
    document.getElementById('lista-EMAIL').value = '';
    document.getElementById('lista-FNAME').value = '';
    btn.disabled = false;
    btn.textContent = 'Quero acesso antecipado →';
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function subscribe(formId) {
    const email = document.getElementById(formId + '-EMAIL').value.trim();
    const nome = document.getElementById(formId + '-FNAME').value.trim();
    const btn = document.getElementById(formId + '-btn');
    const errEl = document.getElementById(formId + '-error');

    errEl.style.display = 'none';
    errEl.textContent = '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errEl.textContent = 'Por favor, informe um e-mail válido.';
        errEl.style.display = 'block';
        return;
    }

    btn.disabled = true;
    btn.textContent = 'Enviando...';

    const MC_BASE = 'https://gmail.us20.list-manage.com/subscribe/post';
    const params = new URLSearchParams({
        u: 'edc2551fd48d2d4f7e93eb9a8',
        id: '845c83a940',
        f_id: '005d57e0f0',
        EMAIL: email,
        FNAME: nome,
        'b_edc2551fd48d2d4f7e93eb9a8_845c83a940': '',
    });

    const iframe = document.createElement('iframe');
    iframe.name = 'mc-iframe-' + Date.now();
    iframe.style.cssText = 'display:none;position:absolute;width:0;height:0;border:0;';
    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = MC_BASE + '?' + params.toString();
    form.target = iframe.name;
    form.style.display = 'none';
    document.body.appendChild(form);

    iframe.addEventListener('load', () => {
        form.remove();
        showSuccess();
    });

    form.submit();
}