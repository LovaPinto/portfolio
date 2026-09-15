const contactForm = document.getElementById('contactForm');
const notice = document.getElementById('form-notice');

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        notice.textContent = '';
        notice.className = 'form-notice';

        const formData = new FormData(contactForm);

        if (formData.get('_honey')) {
            notice.textContent = 'Message considéré comme spam.';
            notice.classList.add('error');
            return;
        }

        const btn = document.getElementById('formSubmitBtn');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Envoi en cours...';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                notice.textContent = 'Message envoyé avec succès. Merci !';
                notice.classList.add('success');
                contactForm.reset();
            } else {
                notice.textContent = "Une erreur est survenue. Veuillez réessayer.";
                notice.classList.add('error');
            }
        } catch (error) {
            notice.textContent = "Erreur de connexion. Veuillez réessayer.";
            notice.classList.add('error');
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    });
}