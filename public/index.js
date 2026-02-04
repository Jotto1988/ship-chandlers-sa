// public/index.js

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');

    /**
     * ANCHOR CURSOR LOGIC
     * Tracks the mouse and applies a smooth transition
     */
    document.addEventListener('mousemove', (e) => {
        // Use requestAnimationFrame for smoother performance on high-refresh screens
        window.requestAnimationFrame(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    });

    /**
     * HOVER EFFECTS
     * Scales the anchor cursor when hovering over interactive elements
     */
    const interactiveElements = document.querySelectorAll('a, button, .info-card, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
            cursor.style.filter = 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.5))';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.filter = 'none';
        });
    });

    /**
     * FORM SUBMISSION LOGIC
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
