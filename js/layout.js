(() => {
  const body = document.body;
  if (!body) return;

  const basePath = body.dataset.basePath || "";
  const activeNav = (body.dataset.navActive || "").toLowerCase();
  const footerMode = (body.dataset.footer || "none").toLowerCase();

  const navClass = "font-label text-[10px] sm:text-xs uppercase tracking-widest";
  const inactiveClass = `${navClass} text-outline group-hover:text-primary transition-colors`;
  const activeClass = `${navClass} text-primary relative`;

  const navItem = (label, href, key) => {
    const isActive = activeNav === key;
    const span = isActive
      ? `<span class="${activeClass}">
                    ${label}
                    <span class="absolute -bottom-1 left-0 w-full h-[1px] bg-primary scale-x-100 transition-transform origin-left"></span>
                </span>`
      : `<span class="${inactiveClass}">${label}</span>`;

    return `<a class="group flex flex-col items-center gap-1 px-1 py-2 sm:p-0 min-h-[44px] min-w-[44px] justify-center" href="${href}">
                ${span}
            </a>`;
  };

  const renderHeader = () => `<header class="fixed top-0 w-full z-50 transition-all duration-300 bg-white/45 backdrop-blur-[40px] border-b border-outline-variant/10">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 h-16 md:h-24 flex items-center justify-between">
        <a class="text-fluid-lg font-display font-bold tracking-wide shrink-0 text-primary z-50" href="${basePath}index.html">
            中大读书会 <span class="italic font-normal">Light</span>
        </a>
        <nav class="flex gap-2 sm:gap-4 md:gap-8 items-center justify-end shrink-0 ml-2">
            ${navItem("HOME", `${basePath}index.html`, "home")}
            ${navItem("ARCHIVE", `${basePath}archive.html`, "archive")}
            ${navItem("ABOUT", `${basePath}about.html`, "about")}
        </nav>
    </div>
</header>`;

  const footerLinks =
    footerMode === "about-local"
      ? {
          join: "#join-community",
          speaker: "#become-speaker",
          contact: "#contact-us"
        }
      : {
          join: `${basePath}about.html#join-community`,
          speaker: `${basePath}about.html#become-speaker`,
          contact: `${basePath}about.html#contact-us`
        };

  const renderFooter = () => `<footer class="w-full bg-white/30 backdrop-blur-md border-t border-outline-variant/10">
    <div class="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-12 py-6 md:py-8 gap-4 md:gap-8 max-w-[1440px] mx-auto">
        <div class="text-lg font-display text-[#6D3D32] text-center md:text-left tracking-wide">
            中大读书会 Light
        </div>
        <div class="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8">
            <a class="font-label text-[10px] uppercase tracking-widest text-[#555555] hover:text-[#C8523A] transition-colors" href="${basePath}assets/wechat-qr.png" target="_blank" rel="noopener noreferrer">微信公众号</a>
            <a class="font-label text-[10px] uppercase tracking-widest text-[#555555] hover:text-[#C8523A] transition-colors" href="${footerLinks.join}">加入社群</a>
            <a class="font-label text-[10px] uppercase tracking-widest text-[#555555] hover:text-[#C8523A] transition-colors" href="${footerLinks.speaker}">嘉宾推荐</a>
            <a class="font-label text-[10px] uppercase tracking-widest text-[#555555] hover:text-[#C8523A] transition-colors" href="${footerLinks.contact}">联系我们</a>
        </div>
        <div class="font-label text-[9px] uppercase tracking-widest text-[#555555]/60 text-center md:text-right w-full md:w-auto mt-2 md:mt-0">
            © 2025 中山大学深圳校友会读书会
        </div>
    </div>
</footer>`;

  const headerMount = document.getElementById("site-header");
  if (headerMount) {
    headerMount.outerHTML = renderHeader();
  }

  const footerMount = document.getElementById("site-footer");
  if (footerMount && footerMode !== "none") {
    footerMount.outerHTML = renderFooter();
  }
})();
