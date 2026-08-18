(() => {
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  if (!toggle || !mobileNav) return;

  const close = () => {
    mobileNav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", close);
  });
})();
