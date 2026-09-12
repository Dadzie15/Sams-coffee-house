// Sam's Coffee House
// Contact form validation (plain JavaScript, no libraries, no backend).

// Grab the elements we need from the page.
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formMessage = document.getElementById('form-message');

// A simple, reasonable pattern for checking email format
// (not perfect, but good enough to catch obvious mistakes).
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Shows feedback text inside #form-message and marks it as an
// error or a success so it can be styled (and read out) correctly.
function showFormMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = type; // "error" or "success"
}

// Run all validation whenever the form is submitted.
contactForm.addEventListener('submit', function (event) {
  // Stop the browser from actually submitting/reloading the page.
  event.preventDefault();

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const messageValue = messageInput.value.trim();

  // Check each field in turn and stop at the first problem found.
  if (nameValue === '') {
    showFormMessage('Please enter your name.', 'error');
    nameInput.focus();
    return;
  }

  if (emailValue === '') {
    showFormMessage('Please enter your email address.', 'error');
    emailInput.focus();
    return;
  }

  if (!emailPattern.test(emailValue)) {
    showFormMessage('Please enter a valid email address.', 'error');
    emailInput.focus();
    return;
  }

  if (messageValue === '') {
    showFormMessage('Please enter a message.', 'error');
    messageInput.focus();
    return;
  }

  // All fields are valid — show a friendly confirmation.
  // This is a demo form with no backend, so nothing is actually sent.
  showFormMessage(
    'Thank you! Your enquiry has been received. This is a demo form — no message was actually sent.',
    'success'
  );

  // Clear the fields so the form is ready for another entry.
  contactForm.reset();
});
