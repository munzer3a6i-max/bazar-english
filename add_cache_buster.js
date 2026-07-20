const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/src="\.\/js\/load-components\.js(\?v=\d+)?"/, 'src="./js/load-components.js?v=' + Date.now() + '"');
fs.writeFileSync('index.html', html, 'utf8');

const htmlFiles = fs.readdirSync('html').filter(f => f.endsWith('.html'));
for (const file of htmlFiles) {
    let p = 'html/' + file;
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/src="\.\.\/js\/load-components\.js(\?v=\d+)?"/, 'src="../js/load-components.js?v=' + Date.now() + '"');
    fs.writeFileSync(p, content, 'utf8');
}
