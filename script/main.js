document.addEventListener("DOMContentLoaded", () => {
  initBurgerMenu();
  initSmoothScroll();
  initModalHandlers();
});

function initBurgerMenu() {
  const burger = document.querySelector(".header__burger");
  const menu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");
  const closeButton = document.querySelector(".buttonClose");
  const body = document.body;

  const animationDuration = 400;

  const openMenu = () => {
    const scrollY = window.scrollY;
    body.dataset.scrollY = scrollY;
    burger.classList.add("active");
    menu.classList.add("active");
    overlay.classList.add("active");

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
  };

  const closeMenu = (targetId = null) => {
    burger.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");

    requestAnimationFrame(() => {
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.overflow = "";
      window.scrollTo(0, parseInt(body.dataset.scrollY || "0"));

      if (targetId) {
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, animationDuration);
      }
    });
  };

  burger.addEventListener("click", () => {
    burger.classList.contains("active") ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  menu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      const targetId = event.target.getAttribute("href").slice(1);
      closeMenu(targetId);
    }
  });

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closeMenu();
    });
  }
}

// Smooth Scroll
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetElement = document.getElementById(link.getAttribute("href").slice(1));
      targetElement?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// Modal Authorization
function initModalHandlers() {
  const body = document.body;

  const modalActions = {
    open(modalSelector, type) {
      const modal = document.querySelector(modalSelector);
      if (!modal) return;

      modal.classList.add("active");
      body.classList.add("modal-open");
      body.style.overflow = "hidden"; // Блокируем прокрутку

      modal.querySelector(".form--login").style.display = type === "login" ? "flex" : "none";
      modal.querySelector(".form--register").style.display = type === "register" ? "flex" : "none";
    },
    close(modalSelector) {
      const modal = document.querySelector(modalSelector);
      if (!modal) return;

      modal.classList.remove("active");
      body.classList.remove("modal-open");
      body.style.overflow = ""; // Убираем блокировку прокрутки
    },
    toggle(modalSelector, targetType) {
      const modal = document.querySelector(modalSelector);
      if (!modal) return;

      modal.querySelector(".form--login").style.display = targetType === "login" ? "flex" : "none";
      modal.querySelector(".form--register").style.display = targetType === "register" ? "flex" : "none";
    }
  };

  function initModalEvents(modalSelector) {
    const modal = document.querySelector(modalSelector);
    if (!modal) return;

    modal.querySelector(".modal__close")?.addEventListener("click", () => modalActions.close(modalSelector));
    modal.addEventListener("click", (e) => e.target === modal && modalActions.close(modalSelector));
    modal.querySelector(".link[id='goToRegister']")?.addEventListener("click", () => modalActions.toggle(modalSelector, "register"));
    modal.querySelector(".link[id='goToLogin']")?.addEventListener("click", () => modalActions.toggle(modalSelector, "login"));
  }

  function bindModalButtons(modalSelector) {
    document.querySelectorAll(".header__button--login").forEach((btn) =>
      btn.addEventListener("click", () => modalActions.open(modalSelector, "login"))
    );
    document.querySelectorAll(".header__button--register").forEach((btn) =>
      btn.addEventListener("click", () => modalActions.open(modalSelector, "register"))
    );
    document.querySelectorAll(".header__button--authorization").forEach((btn) =>
      btn.addEventListener("click", () => modalActions.open(modalSelector, "login")) // Используем "login" как дефолтный тип
    );
  }

  const modalSelector = "#modal";
  bindModalButtons(modalSelector);
  initModalEvents(modalSelector);
}



document.addEventListener('DOMContentLoaded', () => {
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');

  togglePassword.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

      // Меняем иконку
      const newIcon = type === 'password' ? 'image/eye-closed.svg' : 'image/eye-closed.svg';
      togglePassword.src = newIcon;
  });
});

