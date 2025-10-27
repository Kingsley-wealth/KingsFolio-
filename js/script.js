/* -----------------------------
   Typing effect + UI helpers
   ----------------------------- */
/* ---------- TYPING EFFECT ---------- */
const typingElement = document.querySelector(".typing-text");
if (typingElement) {
  const phrases = [
    "Front-end & Back-end Developer",
    "Building beautiful, usable interfaces",
    "Learning every day — Full-Stack Roadmap"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let typingDelay = 80;   // ms per character
  let erasingDelay = 40;  // ms per character when erasing
  let newPhraseDelay = 1500; // pause before typing next phrase

  function type() {
    if (charIndex < phrases[phraseIndex].length) {
      typingElement.textContent += phrases[phraseIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      // pause then erase
      setTimeout(erase, newPhraseDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typingElement.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      // move to next phrase
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
    }
  }

  // Start typing on load (if element exists)
  document.addEventListener("DOMContentLoaded", () => {
    if (phrases.length) setTimeout(type, 700);
  });
}

/* ---------- SCROLL REVEAL ---------- */
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  const revealPoint = 120; // lower = reveal earlier

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - revealPoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ---------- NAV ACTIVE ON SCROLL ---------- */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav ul a");

function navActiveOnScroll() {
  let scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

     if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navAnchors.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
      });
    }
  });
}
window.addEventListener("scroll", navActiveOnScroll);
window.addEventListener("load", navActiveOnScroll);

    /* ---------- Optional: Close mobile menu on resize to desktop ---------- */
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        // ensure nav visible in desktop and reset mobile states
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        const icon = menuToggle.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-times");
        }
      }
    });


/* ---------- SCROLL-TOP BUTTON ---------- */
const scrollTopBtn = document.querySelector(".scroll-top");
function toggleScrollTop() {
  if (!scrollTopBtn) return;
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
}
window.addEventListener("scroll", toggleScrollTop);
window.addEventListener("load", toggleScrollTop);

/* ---------- MOBILE MENU TOGGLE ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");


if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    
    // swap icon
    const icon = menuToggle.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");

  });


  // close menu on link click (mobile)
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-times");
    }
    });
  });
}
});
// === CONTACT FORM HANDLING (Inline success message, Netlify safe) ===
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (!contactForm) return;

  contactForm.addEventListener("submit", () => {
    // Wait a bit for Netlify to handle submission
    setTimeout(() => {
      formMessage.classList.remove("hidden");

      // Hide message and reset form after 5 seconds
      setTimeout(() => {
        formMessage.classList.add("hidden");
        contactForm.reset();
      }, 5000);
    }, 800);
  });
});
function downloadprogress(btn) {
  if (btn.classList.contains("downloading")) return;

  const txt = btn.querySelector(".btn-text");
  const old = txt.innerHTML;
  btn.classList.add("downloading");

  // Show downloading animation
  txt.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';

  // Simulate progress for 3 seconds
  setTimeout(() => {
    txt.innerHTML = '<i class="fas fa-check-circle"></i> Complete!';

    // Trigger actual download (auto-download your PDF)
    const link = document.createElement("a");
    link.href = "assets/1resume5star.pdf"; // <-- your resume file path
    link.download = "Kingsley-Resume.pdf";
    link.click();

    // Reset button after 2 seconds
    setTimeout(() => {
      txt.innerHTML = old;
      btn.classList.remove("downloading");
    }, 2000);
  }, 3000);
}
const progressBars = document.querySelectorAll('.progress');

const showProgress = () => {
  const triggerBottom = window.innerHeight * 0.8;
  progressBars.forEach(bar => {
    const barTop = bar.getBoundingClientRect().top;
    if (barTop < triggerBottom) {
      bar.style.width = bar.getAttribute('style').split(':')[1];
    }
  });
};

window.addEventListener('scroll', showProgress);
