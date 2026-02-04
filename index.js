document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');

    // Smooth Mouse Tracking
    document.addEventListener('mousemove', (e) => {
        window.requestAnimationFrame(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    });

    // Reactive Hover States
    const hoverables = document.querySelectorAll('a, button, .info-card, input, textarea');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '45px';
            cursor.style.height = '45px';
            cursor.style.background = 'transparent';
            cursor.style.borderColor = '#d4af37';
            cursor.style.borderWidth = '3px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '18px';
            cursor.style.height = '18px';
            cursor.style.background = '#d4af37';
            cursor.style.borderWidth = '2px';
            cursor.style.borderColor = '#0f172a';
        });
    });

    // Form Submission (Formspree)
    const quoteForm = document.getElementById('quoteForm');
    const successMsg = document.getElementById('formSuccess');
    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = quoteForm.querySelector('button');
            btn.disabled = true;
            btn.innerText = "Sending Enquiry...";
            try {
                const res = await fetch(quoteForm.action, {
                    method: 'POST',
                    body: new FormData(quoteForm),
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    quoteForm.classList.add('hidden');
                    successMsg.classList.remove('hidden');
                }
            } catch (err) {
                alert("Please WhatsApp us: +27 67 659 2296");
                btn.disabled = false;
                btn.innerText = "Enquire Now";
            }
        });
    }
});
