document.addEventListener('DOMContentLoaded', () => {
  // Select sidebar and navbar links that point to dashboard pages
  const menuItems = document.querySelectorAll('.mitem, .nc-fav, .nc-login');

  menuItems.forEach(item => {
    item.addEventListener('click', async (e) => {
      e.preventDefault();

      const targetUrl = item.getAttribute('href');
      // If it's just a hash or something we don't handle
      if (!targetUrl || targetUrl === '#') return;

      try {
        // Fetch the new page
        const response = await fetch(targetUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const htmlText = await response.text();

        // Create a temporary DOM element to parse the HTML string
        const tempDoc = new DOMParser().parseFromString(htmlText, 'text/html');

        // Extract the new main section
        const newMain = tempDoc.querySelector('.main');
        const currentMain = document.querySelector('.main');
        if (newMain && currentMain) {
          // Replace the current main content with the new main content
          currentMain.innerHTML = newMain.innerHTML;
        }

        // Update active classes on sidebar links
        menuItems.forEach(link => {
          if (link.getAttribute('href') === targetUrl) {
            link.classList.add('is-active');
          } else {
            link.classList.remove('is-active');
          }
        });

        // Extract and swap specific CSS for the dashboard page
        const newStylesheets = tempDoc.querySelectorAll('link[rel="stylesheet"]');
        const currentStylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        
        // Find the specific account-* css link
        let newAccountCssHref = null;
        newStylesheets.forEach(sheet => {
          if (sheet.href && sheet.href.includes('account-')) {
            newAccountCssHref = sheet.getAttribute('href');
          }
        });

        if (newAccountCssHref) {
          let updated = false;
          currentStylesheets.forEach(sheet => {
            if (sheet.href && sheet.href.includes('account-')) {
              sheet.setAttribute('href', newAccountCssHref);
              updated = true;
            }
          });
          // If we didn't find one to replace, we append it (fallback)
          if (!updated) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = newAccountCssHref;
            document.head.appendChild(link);
          }
        }

        // Update the page title
        document.title = tempDoc.title;

        // Update browser history
        window.history.pushState({ path: targetUrl }, '', targetUrl);

        // Re-initialize any page-specific JS logic
        if (window.AccountScripts) {
          window.AccountScripts.init(targetUrl);
        }

      } catch (error) {
        console.error('Error fetching the page:', error);
        alert('SPA Fetch Error: ' + error.message + '\n\nIf you are running this from a file:/// URL, fetch is blocked by CORS. Please use Live Server.');
      }
    });
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', (e) => {
    // A simple reload on popstate to ensure we display the correct page
    // and don't complicate the history state management too much.
    // Alternatively, we could fetch the page again.
    window.location.reload();
  });
});
