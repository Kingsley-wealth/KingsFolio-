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
const navLinks = document.querySelectorAll(".nav-links a");

function navActiveOnScroll() {
  let scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop + sectionHeight&& scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) { link.classList.add("active");
        }
          
        
      });
    }
  });
}
window.addEventListener("scroll", navActiveOnScroll);
window.addEventListener("load", navActiveOnScroll);

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
const menuToggle = document.querySelector(".menu-toggle");
const navList = document.querySelector("nav ul li a");

if (menuToggle && navList) {
  menuToggle.addEventListener("click", () => {
    navList.classList.toggle("open");
    menuToggle.classList.toggle("open");
  });

  // close menu on link click (mobile)
  navList.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navList.classList.remove("open");
      menuToggle.classList.remove("open");
    });
  });
}
// === CONTACT FORM HANDLING (Safe for Netlify) ===
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return;

  const isNetlifyForm = contactForm.hasAttribute("data-netlify");

  contactForm.addEventListener("submit", async (e) => {
    // 🚫 Only intercept if NOT using Netlify
    if (!isNetlifyForm) {
      e.preventDefault();
      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          // ✅ Local save for debugging or records
          saveMessageLocally(formData);
          window.location.href = "thankyou.html";
        } else {
          alert("Error sending message. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("⚠️ Something went wrong!");
      }
    } else {
      // ✅ Netlify auto-handles form submission — optional local save
      const formData = new FormData(contactForm);
      saveMessageLocally(formData);
    }
  });

  // Helper function for localStorage
  function saveMessageLocally(formData) {
    const message = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      time: new Date().toLocaleString(),
    };
    const savedMessages =
      JSON.parse(localStorage.getItem("contactMessages")) || [];
    savedMessages.push(message);
    localStorage.setItem("contactMessages", JSON.stringify(savedMessages));
  }
});

/* ---------- TOAST ON THANKYOU PAGE ---------- */
window.addEventListener("DOMContentLoaded", () => {
  const toast = document.querySelector(".toast");
  if (toast) {
    toast.style.display = "block";
    setTimeout(() => (toast.style.display = "none"), 3500);
  }
});
