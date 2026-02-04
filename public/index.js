document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');

    /**
     * REACTIVE CURSOR LOGIC
     * Tracks the mouse smoothly and handles the gold ring expansion
     */
    document.addEventListener('mousemove', (e) => {
        window.requestAnimationFrame(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    });

    /**
     * HOVER EFFECTS
     * Scales the cursor into a gold ring when hovering over interactive elements
     */
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

    /**
     * FORM SUBMISSION LOGIC (Retained from previous version)
     * Handles the "Make an Enquiry" form on the Contact page
     */
    const quoteForm = document.getElementById('quoteForm');
    const successMessage = document.getElementById('formSuccess');

    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = quoteForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerText = "Sending Enquiry...";

            const formData = new FormData(quoteForm);
            
            try {
                const response = await fetch(quoteForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    quoteForm.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                alert("Submission failed. Please contact our 24/7 line: +27 67 659 2296");
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
            }
        });
    }
});
