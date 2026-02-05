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
     */
    const hoverables = document.querySelectorAll('a, button, .info-card, input, textarea, .boat-nav');
    
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '60px';
            cursor.style.height = '60px';
            cursor.style.background = 'transparent';
            cursor.style.borderColor = '#d4af37';
            cursor.style.borderWidth = '3px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.background = '#d4af37';
            cursor.style.borderWidth = '2px';
            cursor.style.borderColor = '#0f172a';
        });
    });

    /**
     * PHP FORM REDIRECT NOTIFICATIONS (TOASTS)
     * Detects success/error status from the PHP redirect and shows a notification.
     */
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    if (status) {
        // Create toast container
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.right = '30px';
        toast.style.padding = '20px 30px';
        toast.style.borderRadius = '8px';
        toast.style.color = '#0f172a';
        toast.style.fontWeight = 'bold';
        toast.style.zIndex = '10000';
        toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        toast.style.fontFamily = 'Outfit, sans-serif';
        toast.style.textTransform = 'uppercase';
        toast.style.letterSpacing = '1px';
        toast.style.fontSize = '12px';

        if (status === 'success') {
            toast.style.background = '#d4af37'; // Brand Gold
            toast.innerHTML = '<i class="fas fa-anchor mr-2"></i> Quote Request Sent Successfully!';
        } else if (status === 'error') {
            toast.style.background = '#ff4444'; // Red for error
            toast.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i> Submission Failed. Please Call Us.';
        }

        document.body.appendChild(toast);

        // Fade out and remove after 5 seconds
        setTimeout(() => {
            toast.style.transition = 'opacity 1s ease';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 1000);
        }, 5000);

        // Clean up URL so notification doesn't repeat on manual refresh
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});
