document.addEventListener("DOMContentLoaded", () => {
    const basePath = window.location.pathname.endsWith('index.html') && !window.location.pathname.includes('/html/') ? './' : (window.location.pathname.endsWith('/') ? './' : '../');
    // Better logic for GitHub pages: if we are at root, base is ./, else ../
    const path = window.location.pathname;
    const isRoot = !path.toLowerCase().includes('/html/');
    const prefix = isRoot ? './' : '../';
    
    fetch(prefix + 'components/header.html')
        .then(response => response.text())
        .then(data => {
            // Rewrite relative links and image paths
            data = data.replace(/(href|src)="([^"]+)"/g, (match, attr, val) => {
                if (val.startsWith('http') || val.startsWith('#') || val.startsWith('mailto:') || val.startsWith('tel:')) return match;
                // If the link is a relative path to the root (like index.html or html/login.html), prepend prefix
                return `${attr}="${prefix}${val}"`;
            });
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) headerPlaceholder.outerHTML = data;
        });

    fetch(prefix + 'components/footer.html')
        .then(response => response.text())
        .then(data => {
            data = data.replace(/(href|src)="([^"]+)"/g, (match, attr, val) => {
                if (val.startsWith('http') || val.startsWith('#') || val.startsWith('mailto:') || val.startsWith('tel:')) return match;
                return `${attr}="${prefix}${val}"`;
            });
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) footerPlaceholder.outerHTML = data;
        });
});