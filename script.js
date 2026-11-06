/**
 * Emiliano Maggi - Portfolio Professionale (GitHub Pages)
 * Client-side JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Sticky Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const isExpanded = mainNav.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // 4. Scroll Spy: Active Navigation Link Highlight
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.main-nav a[href*="#${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);
});

/**
 * Copy contact to clipboard with Toast feedback
 */
function copyContact(text, message) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message || 'Copiato negli appunti!');
    }).catch(() => {
      fallbackCopy(text, message);
    });
  } else {
    fallbackCopy(text, message);
  }
}

function fallbackCopy(text, message) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(message || 'Copiato negli appunti!');
  } catch (err) {
    showToast('Impossibile copiare automaticamente.');
  }
  document.body.removeChild(textArea);
}

/**
 * Display toast notification
 */
function showToast(msg) {
  const toast = document.getElementById('toastMessage');
  if (!toast) return;

  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #38bdf8; margin-right: 8px;"></i> ${msg}`;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 3200);
}

/**
 * Form mailto handler
 */
function handleMailSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('senderName').value.trim();
  const subject = document.getElementById('senderSubject').value.trim();
  const message = document.getElementById('senderMessage').value.trim();

  const targetEmail = 'emiliano.maggi91e@gmail.com';
  const encodedSubject = encodeURIComponent(`[Contatto Portfolio] ${subject} - da ${name}`);
  const bodyText = `Nome / Azienda: ${name}\n\nMessaggio:\n${message}\n\n---\nInviato dal portfolio web di Emiliano Maggi`;
  const encodedBody = encodeURIComponent(bodyText);

  window.location.href = `mailto:${targetEmail}?subject=${encodedSubject}&body=${encodedBody}`;
  
  showToast('Apertura client di posta in corso...');
}
