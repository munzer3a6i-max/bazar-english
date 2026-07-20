document.addEventListener("DOMContentLoaded", () => {
    const basePath = window.location.pathname.endsWith('index.html') && !window.location.pathname.includes('/html/') ? './' : (window.location.pathname.endsWith('/') ? './' : '../');
    // Better logic for GitHub pages: if we are at root, base is ./, else ../
    const path = window.location.pathname;
    const isRoot = path === '/' || path.endsWith('/bazar/') || path.endsWith('/bazar/index.html');
    const prefix = isRoot ? './' : '../';
    
    fetch(prefix + 'components/header.html')
        .then(response => response.text())
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) headerPlaceholder.outerHTML = data;
        });

    fetch(prefix + 'components/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) footerPlaceholder.outerHTML = data;
        });
});