// Global initialization object for account pages
window.AccountScripts = {
  // Initialize specific pages based on URL/Path
  init: function(urlPath) {
    if (urlPath.includes('account-orders.html')) {
      this.initOrders();
    }
    if (urlPath.includes('account-returns.html')) {
      this.initReturns();
    }
    // Add other page initializations here if needed
  },

  
  initReturns: function() {
    const filters = document.querySelectorAll('.fchip');
    const cards = document.querySelectorAll('.rcard');

    if (!filters.length || !cards.length) return;

    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(f => f.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filterValue = btn.getAttribute('data-filter');

        cards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = 'flex';
          } else {
            if (card.getAttribute('data-status') === filterValue) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  },

  initOrders: function() {
    const filters = document.querySelectorAll('.fchip');
    const orders = document.querySelectorAll('.rcard');

    if (!filters.length || !orders.length) return;

    filters.forEach(btn => {
      // Remove previous event listeners by cloning if necessary, 
      // but since the DOM elements are fresh after SPA injection, it's fine.
      btn.addEventListener('click', () => {
        // Remove active class from all
        filters.forEach(f => f.classList.remove('is-active'));
        // Add active class to clicked
        btn.classList.add('is-active');

        const filterValue = btn.getAttribute('data-filter');

        orders.forEach(order => {
          if (filterValue === 'all') {
            order.style.display = 'flex';
          } else {
            if (order.getAttribute('data-status') === filterValue) {
              order.style.display = 'flex';
            } else {
              order.style.display = 'none';
            }
          }
        });
      });
    });
  }
};

// Initialize on first load
document.addEventListener('DOMContentLoaded', () => {
  window.AccountScripts.init(window.location.pathname);
});
