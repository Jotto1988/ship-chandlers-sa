document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');

    /**
     * SMOOTH MOUSE TRACKING
     * Ensures the cursor element follows the mouse movement smoothly
     */
    document.addEventListener('mousemove', (e) => {
        window.requestAnimationFrame(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    });

    /**
     * REACTIVE HOVER STATES
     * Scales the cursor into a gold ring when hovering over interactive elements.
     * Added '.boat-nav' to ensure the cursor is visible over the navigation hull.
     */
    const hoverables = document.querySelectorAll('a, button, .info-card, input, textarea, .boat-nav');
    
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '60px'; // Expanded for better interaction feel
            cursor.style.height = '60px';
            cursor.style.background = 'transparent';
            cursor.style.borderColor = '#d4af37'; // Brand Gold
            cursor.style.borderWidth = '3px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px'; // Restored base size
            cursor.style.height = '20px';
            cursor.style.background = '#d4af37'; // Brand Gold
            cursor.style.borderWidth = '2px';
            cursor.style.borderColor = '#0f172a'; // Brand Navy
        });
    });

    /**
     * FORM SUBMISSION LOGIC (FORMSPREE)
     * Handles the re-supply enquiry form on the Contact page.
     */
    const quoteForm = document.getElementById('quoteForm');
    const successMsg = document.getElementById('formSuccess');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = quoteForm.querySelector('button');
            const originalText = btn.innerText;
            
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
                } else {
                    throw new Error('Submission failed');
                }
            } catch (err) {
                // Fallback contact info from source document
                alert("Submission failed. Please WhatsApp us: +27 67 659 2296");
                btn.disabled = false;
                btn.innerText = originalText;
            }
        });
    }
});
