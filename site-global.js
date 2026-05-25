document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const storageThemeKey = "farmaciaThemeMode";
  const storageFontKey = "farmaciaFontSize";
  const minFontSize = 13;
  const maxFontSize = 22;
  const defaultFontSize = 16;
  let currentFontSize = defaultFontSize;

  function getStoredTheme() {
    return localStorage.getItem(storageThemeKey) || "light";
  }

  function getStoredFontSize() {
    const value = Number(localStorage.getItem(storageFontKey));
    return Number.isFinite(value) && value >= minFontSize && value <= maxFontSize ? value : defaultFontSize;
  }

  function applyTheme(theme) {
    document.body.classList.toggle("dark-theme", theme === "dark");
    document.body.classList.toggle("light-theme", theme === "light");
    const toggleButton = document.getElementById("toggle-theme");
    if (toggleButton) {
      toggleButton.textContent = theme === "dark" ? "☀️" : "🌙";
      toggleButton.setAttribute("aria-label", theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro");
    }
    localStorage.setItem(storageThemeKey, theme);
  }

  function applyFontSize(value) {
    currentFontSize = Math.min(maxFontSize, Math.max(minFontSize, value));
    root.style.setProperty("--base-font-size", `${currentFontSize}px`);
    localStorage.setItem(storageFontKey, currentFontSize);
  }

  function updateFontSize(value) {
    applyFontSize(value);
  }

  function createControlPanel() {
    if (document.querySelector(".site-controls")) {
      return;
    }

    const controls = document.createElement("div");
    controls.className = "site-controls";
    controls.innerHTML = `
      <button id="decrease-font" type="button" title="Diminuir fonte">A-</button>
      <button id="reset-font" type="button" title="Tamanho padrão">A</button>
      <button id="increase-font" type="button" title="Aumentar fonte">A+</button>
      <button id="toggle-theme" type="button" title="Alternar modo claro/escuro">🌙</button>
    `;

    document.body.insertAdjacentElement("afterbegin", controls);

    document.getElementById("decrease-font").addEventListener("click", () => {
      updateFontSize(currentFontSize - 1);
    });

    document.getElementById("reset-font").addEventListener("click", () => {
      updateFontSize(defaultFontSize);
    });

    document.getElementById("increase-font").addEventListener("click", () => {
      updateFontSize(currentFontSize + 1);
    });

    document.getElementById("toggle-theme").addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
      applyTheme(nextTheme);
    });
  }

  applyFontSize(getStoredFontSize());
  applyTheme(getStoredTheme());
  createControlPanel();
});
