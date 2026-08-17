/* =====================================================================
   Bazar — Mobile Navigation Controller
   Handles: hamburger menu, bottom nav, filter drawer
   ===================================================================== */

(function () {
  'use strict';

  // ---- Hamburger Menu ----
  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const close = document.querySelector('.mobile-menu-close');
    const backdrop = document.querySelector('.mobile-menu-backdrop');

    if (!toggle || !overlay) return;

    function openMenu() {
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', openMenu);
    if (close) close.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  // ---- Bottom Nav Active State ----
  function initBottomNav() {
    const nav = document.querySelector('.mobile-bottom-nav');
    if (!nav) return;

    const items = nav.querySelectorAll('.mobile-bottom-nav__item');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    items.forEach(function (item) {
      const href = item.getAttribute('href') || '';
      const itemPath = href.split('/').pop();

      // Remove all active states first
      item.classList.remove('active');

      // Match current page
      if (currentPath === itemPath ||
        (currentPath === '' && itemPath === 'index.html') ||
        (currentPath === 'index.html' && itemPath === 'index.html')) {
        item.classList.add('active');
      }
    });
  }

  // ---- Mobile Filter Drawer (Category page) ----
  function initFilterDrawer() {
    const filterToggle = document.querySelector('.mobile-filter-toggle');
    const filterOverlay = document.querySelector('.mobile-filter-overlay');
    const filterClose = document.querySelector('.mobile-filter-close');
    const filterBackdrop = document.querySelector('.mobile-filter-backdrop');

    if (!filterToggle || !filterOverlay) return;

    function openFilter() {
      filterOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeFilter() {
      filterOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    filterToggle.addEventListener('click', openFilter);
    if (filterClose) filterClose.addEventListener('click', closeFilter);
    if (filterBackdrop) filterBackdrop.addEventListener('click', closeFilter);
  }

  // ---- Sticky Buy Bar (Product page) ----
  function initStickyBuyBar() {
    const bar = document.querySelector('.sticky-buy-bar');
    const addBtn = document.querySelector('.product-detail__add-btn') ||
                   document.querySelector('.product-detail__cart-btn');

    if (!bar || !addBtn) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          bar.classList.remove('is-visible');
        } else {
          bar.classList.add('is-visible');
        }
      });
    }, { threshold: 0 });

    observer.observe(addBtn);
  }

  // ---- Init all on DOM ready ----

  // Categories dropdown toggle
  function initCategoriesDropdown() {
    document.querySelectorAll('.search__categories').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var wrap = btn.closest('.search__cat-wrap');
        if (!wrap) return;
        var dd = wrap.querySelector('.search__dropdown');
        if (!dd) return;
        var isOpen = dd.classList.contains('is-open');
        document.querySelectorAll('.search__dropdown').forEach(function (d) {
          d.classList.remove('is-open');
        });
        if (!isOpen) {
          dd.classList.add('is-open');
        }
      });
    });

    // Clicking a category item selects it
    document.querySelectorAll('.search__dropdown-item').forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.stopPropagation();
        var wrap = item.closest('.search__cat-wrap');
        if (!wrap) return;
        var btn = wrap.querySelector('.search__categories');
        if (!btn) return;
        // Get the text nodes of the button (skip the SVG)
        var svg = btn.querySelector('svg');
        // Replace button text content but keep the SVG
        var textNode = null;
        for (var i = 0; i < btn.childNodes.length; i++) {
          if (btn.childNodes[i].nodeType === 3 && btn.childNodes[i].textContent.trim()) {
            textNode = btn.childNodes[i];
            break;
          }
        }
        if (textNode) {
          textNode.textContent = '\n              ' + item.textContent.trim() + '\n              ';
        }
        // Close dropdown
        var dd = wrap.querySelector('.search__dropdown');
        if (dd) dd.classList.remove('is-open');
        // Focus the search field
        var searchField = wrap.closest('.search');
        if (searchField) {
          var input = searchField.querySelector('.search__field');
          if (input) input.focus();
        }
      });
    });

    // Click outside to close
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.search__cat-wrap')) {
        document.querySelectorAll('.search__dropdown').forEach(function (d) {
          d.classList.remove('is-open');
        });
      }
    });
  }
  function init() {
    initMobileMenu();
    initCategoriesDropdown();
    initBottomNav();
    initFilterDrawer();
    initStickyBuyBar();
  }

  window.toggleMobileFilter = function (show) {
    var overlay = document.getElementById('mobileFilterOverlay');
    if (!overlay) return;
    if (show === undefined) {
      show = !overlay.classList.contains('is-open');
    }
    if (show) {
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    } else {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  window.toggleFilterPanel = function () {
    if (window.innerWidth <= 1100) {
      window.toggleMobileFilter();
    } else {
      var layout = document.querySelector('.cat-layout');
      var btnText = document.querySelector('.filter-toggle-btn__text');
      if (layout && layout.classList.contains('filter-collapsed')) {
        layout.classList.remove('filter-collapsed');
        if (btnText) btnText.textContent = 'Hide Filters';
      } else if (layout) {
        layout.classList.add('filter-collapsed');
        if (btnText) btnText.textContent = 'Show Filters';
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
