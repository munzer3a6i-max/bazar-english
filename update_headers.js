
const fs = require('fs');

const home = fs.readFileSync('homepage.html', 'utf8');
const homeLines = home.split('\n');

const cssStart = homeLines.findIndex(l => l.includes('HEADER — TIER 1'));
let cssStartLine = cssStart > 0 && homeLines[cssStart-1].includes('/* ====') ? cssStart - 1 : cssStart;

let cssEndLine = -1;
for(let i = cssStart + 1; i < homeLines.length; i++) {
    if(homeLines[i].includes('PROMO STRIP')) {
        cssEndLine = i > 1 ? i - 2 : i;
        break;
    }
}
const newCss = homeLines.slice(cssStartLine, cssEndLine).join('\n');
console.log('Homepage CSS extracted from ' + cssStartLine + ' to ' + cssEndLine);

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'homepage.html');

for(const f of files) {
    let fLines = fs.readFileSync(f, 'utf8').split('\n');
    const fCssStart = fLines.findIndex(l => l.includes('HEADER — TIER 1'));
    if(fCssStart !== -1) {
        let startLine = fCssStart > 0 && fLines[fCssStart-1].includes('/* ====') ? fCssStart - 1 : fCssStart;
        let endLine = -1;
        for(let i = fCssStart + 1; i < fLines.length; i++) {
            if(fLines[i].includes('/* ======') && !fLines[i+1].includes('HEADER') && !fLines[i+1].includes('header')) {
                endLine = i > 0 ? i - 1 : i;
                break;
            } else if (fLines[i].includes('</style>')) {
                endLine = i;
                break;
            }
        }
        if(endLine !== -1) {
            fLines.splice(startLine, endLine - startLine, newCss);
            fs.writeFileSync(f, fLines.join('\n'), 'utf8');
            console.log('Fixed CSS in ' + f + ' replaced lines ' + startLine + ' to ' + endLine);
        }
    }
}

