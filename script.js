/* ==========================================
   OG NORD EST ENGINEERING CO. LTD
   Main JavaScript File
   ========================================== */

// ---------- 1. MOBILE NAVIGATION TOGGLE ----------
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", !expanded);
  navList.classList.toggle("show");
});

// Close menu when a link is clicked (mobile)
document.querySelectorAll(".nav-list a").forEach(link => {
  link.addEventListener("click", () => {
    navList.classList.remove("show");
    navToggle.setAttribute("aria-expanded", false);
  });
});


// ---------- 2. AUTO UPDATE FOOTER YEAR ----------
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


// ---------- 3. CONTACT FORM VALIDATION ----------
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent actual submission for demo

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Simple validation
    if (!name || !email || !subject || !message) {
      formStatus.textContent = "Please fill in all fields.";
      formStatus.style.color = "red";
      return;
    }

    // Basic email format check
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
      formStatus.textContent = "Please enter a valid email address.";
      formStatus.style.color = "red";
      return;
    }

    // Simulate sending (you can later replace with email service)
    formStatus.textContent = "Sending message...";
    formStatus.style.color = "#0077cc";

    setTimeout(() => {
      formStatus.textContent = "Message sent successfully! We'll get back to you soon.";
      formStatus.style.color = "green";
      contactForm.reset();
    }, 1500);
  });
}

