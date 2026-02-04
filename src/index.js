// public/index.js

document.addEventListener("DOMContentLoaded", () => {
    const quoteForm = document.getElementById("quoteForm");
    const successMessage = document.getElementById("formSuccess");
    const submitBtn = document.getElementById("submitBtn");

    if (quoteForm) {
        quoteForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Stop the page from refreshing

            // UI Feedback: Show user that something is happening
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = "Processing...";

            const formData = new FormData(quoteForm);
            
            try {
                // Send the data via a background request
                const response = await fetch(quoteForm.action, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success: Hide form and show maritime success message
                    quoteForm.classList.add("hidden");
                    successMessage.classList.remove("hidden");
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                } else {
                    throw new Error("Connection error");
                }
                
            } catch (error) {
                // Failsafe: Provide the WhatsApp number if digital submission fails
                alert("We are experiencing high traffic. Please contact us directly via WhatsApp: +27 67 659 2296 [cite: 47]");
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
});
