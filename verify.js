const fs = require('fs');
const files = ['cart.html', 'checkout.html', 'order-confirmation.html', 'order-tracking.html'];
for (const f of files) {
    const c = fs.readFileSync(f, 'utf8');
    const hasSearch = c.includes('search__field');
    const hasDelivery = c.includes('class="delivery"');
    const hasSubnav = c.includes('class="subnav"');
    const hasAccount = c.includes('class="account"');
    const hasLogoOnly = c.includes('logo-only navbar');
    const headerCount = (c.match(/<header>/g) || []).length;
    const headerEndCount = (c.match(/<\/header>/g) || []).length;
    console.log(f + ': search=' + hasSearch + ' delivery=' + hasDelivery + ' subnav=' + hasSubnav + ' account=' + hasAccount + ' logoOnly=' + hasLogoOnly + ' header=' + headerCount + '/' + headerEndCount);
}
