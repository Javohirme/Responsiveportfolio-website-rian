/*=============== MENU SHOW / HIDE ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// Show menu
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

// Hide menu
if (navClose && navMenu) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll(".nav__link");

navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    if (navMenu) navMenu.classList.remove("show-menu");
  }),
);

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById("contact-form"),
  contactMessage = document.getElementById("contact-message");

const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm(
      "service_u3pqjp4", // service ID
      "template_us9h8e7", // template ID
      "#contact-form", // form ID
    )
    .then(
      () => {
        contactMessage.textContent = "Message sent successfully ✅";

        setTimeout(() => {
          contactMessage.textContent = "";
        }, 5000);

        contactForm.reset();
      },
      (error) => {
        contactMessage.textContent = "Message not sent ❌";
        console.log(error);
      },
    );
};

if (contactForm) {
  contactForm.addEventListener("submit", sendEmail);
}

/*=============== SCROLL EVENTS (ALL IN ONE) ===============*/
const sections = document.querySelectorAll("section[id]");
const header = document.getElementById("header");
const scrollUp = document.getElementById("scroll-up");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  /*===== HEADER SHADOW =====*/
  if (header) {
    if (scrollY >= 50) {
      header.classList.add("shadow-header");
    } else {
      header.classList.remove("shadow-header");
    }
  }

  /*===== SCROLL UP BUTTON =====*/
  if (scrollUp) {
    if (scrollY >= 150) {
      scrollUp.classList.add("show-scroll");
    } else {
      scrollUp.classList.remove("show-scroll");
    }
  }

  /*===== ACTIVE LINK =====*/
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58;
    const sectionId = current.getAttribute("id");

    const link = document.querySelector(
      ".nav__menu a[href*=" + sectionId + "]",
    );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      if (link) link.classList.add("active-link");
    } else {
      if (link) link.classList.remove("active-link");
    }
  });
});

/*=============== DARK / LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";

const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme,
  );

  if (themeButton) {
    themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
      iconTheme,
    );
  }
}

if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  });
}

// Scroll reveal animation
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 1900,
  delay: 100,
  // reset: true,
});

sr.reveal(".home__perfil, .about__image, .contact__mail", { origin: "right" });
sr.reveal(
  ".home__name, .home__info, .about__container, section__title-1, .about__info, .contact__social, .contact__data",
  {
    origin: "left",
  },
);
sr.reveal(".services__card, .projects__card", { interval: 100 });
