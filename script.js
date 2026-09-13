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

// Keeps track of the pending "auto-hide" timer for the success
// message, so a new submission can cancel an old timer before
// starting a fresh one (otherwise two timers could conflict).
let hideMessageTimeoutId;

// Shows feedback text inside #form-message and marks it as an
// error or a success so it can be styled (and read out) correctly.
function showFormMessage(text, type) {
  // Cancel any auto-hide timer left over from an earlier message,
  // so it can't clear this new message out from under the user.
  clearTimeout(hideMessageTimeoutId);

  formMessage.textContent = text;
  formMessage.className = type; // "error" or "success"

  // Only the success message auto-hides; error messages stay
  // visible until the user fixes the form and submits again.
  if (type === 'success') {
    hideMessageTimeoutId = setTimeout(function () {
      formMessage.textContent = '';
      formMessage.className = '';
    }, 5000);
  }
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

// ---------------------------------------------------------
// Mobile navigation menu (hamburger toggle)
// Only matters on smaller screens — on desktop the toggle button
// is hidden by CSS and the nav links are always visible.
// ---------------------------------------------------------
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.textContent = isOpen ? '✕' : '☰';
  });

  // Close the menu once a link is tapped, so it doesn't stay open
  // after the page jumps to the chosen section.
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = '☰';
    });
  });
}
