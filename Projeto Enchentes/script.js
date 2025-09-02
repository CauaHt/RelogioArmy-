// Aguarda o DOM carregar completamente
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");
  const menuIcon = mobileMenuBtn.querySelector("i");

  mobileMenuBtn.addEventListener("click", function () {
    mobileNav.classList.toggle("active");

    if (mobileNav.classList.contains("active")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times");
    } else {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    }
  });

  const mobileNavLinks = mobileNav.querySelectorAll("a");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileNav.classList.remove("active");
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    });
  });

  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll(
    ".stat-card, .feature-card, .target-card, .alert-item"
  );
  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });

  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    }

    updateCounter();
  }

  const statsSection = document.querySelector(".stats");
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;

          const statNumbers = [
            {
              element: document.querySelector(".stat-card:nth-child(1) h3"),
              value: 15200,
            },
            {
              element: document.querySelector(".stat-card:nth-child(2) h3"),
              value: 127,
            },
            {
              element: document.querySelector(".stat-card:nth-child(3) h3"),
              value: 3400,
            },
            {
              element: document.querySelector(".stat-card:nth-child(4) h3"),
              value: 50000,
            },
          ];

          statNumbers.forEach((stat, index) => {
            setTimeout(() => {
              if (index === 0) {
                animateCounter(stat.element, stat.value);
                setTimeout(() => {
                  stat.element.textContent = "15.2K";
                }, 2000);
              } else if (index === 2) {
                animateCounter(stat.element, stat.value);
                setTimeout(() => {
                  stat.element.textContent = "3.4K";
                }, 2000);
              } else if (index === 3) {
                animateCounter(stat.element, stat.value);
                setTimeout(() => {
                  stat.element.textContent = "50K+";
                }, 2000);
              } else {
                animateCounter(stat.element, stat.value);
              }
            }, index * 200);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  const mapButtons = document.querySelectorAll(
    'button:contains("Mapa"), button:contains("Ver Mapa")'
  );
  mapButtons.forEach((button) => {
    if (button.textContent.includes("Mapa")) {
      button.addEventListener("click", function () {
        const mapSection = document.getElementById("mapa");
        if (mapSection) {
          const headerHeight = document.querySelector(".header").offsetHeight;
          const targetPosition = mapSection.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    }
  });

  const downloadButtons = document.querySelectorAll(
    'button:contains("Baixar App")'
  );
  downloadButtons.forEach((button) => {
    if (button.textContent.includes("Baixar App")) {
      button.addEventListener("click", function () {
        alert(
          "Em breve! O aplicativo estará disponível nas lojas de aplicativos."
        );
      });
    }
  });

  function updateAlertTimes() {
    const alertTimes = document.querySelectorAll(".alert-time");
    const now = new Date();

    alertTimes.forEach((timeElement, index) => {
      const minutesAgo = [15, 30, 60][index];
      const alertTime = new Date(now.getTime() - minutesAgo * 60000);

      if (minutesAgo < 60) {
        timeElement.textContent = `Há ${minutesAgo} minutos`;
      } else {
        timeElement.textContent = `Há ${Math.floor(minutesAgo / 60)} hora${
          Math.floor(minutesAgo / 60) > 1 ? "s" : ""
        }`;
      }
    });
  }

  updateAlertTimes();
  setInterval(updateAlertTimes, 60000);

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    const heroImage = document.querySelector(".hero-image img");

    if (hero && heroImage && scrolled < hero.offsetHeight) {
      heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });

  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  const style = document.createElement("style");
  style.textContent = `
        .nav a.active {
            color: #93C5FD !important;
            font-weight: 600;
        }
    `;
  document.head.appendChild(style);

  function simulateSearch(query) {
    console.log(`Buscando por: ${query}`);
  }

  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("click", function () {
      const title = this.querySelector("h3").textContent;
      alert(
        `Funcionalidade: ${title}\n\nEsta funcionalidade estará disponível na versão completa do sistema.`
      );
    });
  });

  const images = document.querySelectorAll("img");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add("fade-in");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });

  const imageStyle = document.createElement("style");
  imageStyle.textContent = `
        img {
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }
        img.fade-in {
            opacity: 1;
        }
    `;
  document.head.appendChild(imageStyle);

  setTimeout(() => {
    images.forEach((img) => {
      if (img.complete) {
        img.classList.add("fade-in");
      }
    });
  }, 100);

  console.log("MonitorBelém - Sistema carregado com sucesso!");
});

function selectElementsContaining(text) {
  const elements = document.querySelectorAll("*");
  return Array.from(elements).filter(
    (element) =>
      element.textContent.includes(text) && element.children.length === 0
  );
}

document.addEventListener("DOMContentLoaded", function () {
  // Seleciona botões que contêm "Mapa"
  const mapButtons = Array.from(document.querySelectorAll("button")).filter(
    (btn) => btn.textContent.includes("Mapa")
  );

  mapButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const mapSection = document.getElementById("mapa");
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const appButtons = Array.from(document.querySelectorAll("button")).filter(
    (btn) => btn.textContent.includes("Baixar App")
  );

  appButtons.forEach((button) => {
    button.addEventListener("click", function () {
      alert(
        "Em breve! O aplicativo estará disponível para download nas lojas de aplicativos."
      );
    });
  });
});
