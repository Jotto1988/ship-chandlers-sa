// public/index.js

document.addEventListener("DOMContentLoaded", () => {
    const quoteForm = document.getElementById("quoteForm");
    const successMessage = document.getElementById("formSuccess");
    const submitBtn = document.getElementById("submitBtn");

    if (quoteForm) {
        quoteForm.addEventListener("submit", async (e) => {
            e.preventDefault(); 

            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = "Processing...";

            const formData = new FormData(quoteForm);
            
            try {
                const response = await fetch(quoteForm.action, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    quoteForm.classList.add("hidden");
                    successMessage.classList.remove("hidden");
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                } else {
                    throw new Error("Connection error");
                }
                
            } catch (error) {
                alert("We are experiencing high traffic. Please contact us directly via WhatsApp: +27 67 659 2296");
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
});
