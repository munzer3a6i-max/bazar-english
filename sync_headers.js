const fs = require('fs');

// ─── 1. Read homepage ───────────────────────────────────────────────
const home = fs.readFileSync('homepage.html', 'utf8');

// ─── 2. Extract the homepage header HTML (from <!-- HEADER --> to </header>) ──
const headerHtmlStart = home.indexOf('    <!-- ============================ HEADER ============================ -->');
const headerHtmlEnd = home.indexOf('    </header>') + '    </header>'.length;
const headerHtml = home.substring(headerHtmlStart, headerHtmlEnd);
console.log('Header HTML length:', headerHtml.length);

// ─── 3. Extract the homepage header CSS (lines from HEADER TIER 1 to before PROMO STRIP) ──
const cssHeaderStart = home.indexOf('    /* =====================================================================\n   HEADER');
if (cssHeaderStart === -1) {
  // Try with \r\n
  var cssTier1 = home.indexOf('    /* =====================================================================\r\n   HEADER');
} else {
  var cssTier1 = cssHeaderStart;
}
const promoStripMarker = '    /* =====================================================================\r\n   PROMO STRIP';
const promoStripIdx = home.indexOf(promoStripMarker);
// The header CSS ends right before the PROMO STRIP section  
const headerCssEnd = promoStripIdx;
const headerCss = home.substring(cssTier1, headerCssEnd);
console.log('Header CSS length:', headerCss.length);

// ─── 4. Extract the :root block from homepage ──
const rootStart = home.indexOf('    :root {');
const rootEnd = home.indexOf('    }', rootStart) + '    }'.length;
const rootBlock = home.substring(rootStart, rootEnd);
console.log('Root block length:', rootBlock.length);

// ─── 5. Extract the reset/base CSS (from after :root } to before HEADER TIER 1) ──
const resetStart = rootEnd;
const resetCss = home.substring(resetStart, cssTier1);
console.log('Reset CSS length:', resetCss.length);

// ─── 6. Process each target file ──────────────────────────────────
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'homepage.html');

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;
  
  // ── 6a. Replace header HTML ──
  const fHeaderStart = content.indexOf('<header>');
  // Also check for comment before header
  const fCommentStart = content.lastIndexOf('<!--', fHeaderStart);
  let fHtmlStart;
  if (fCommentStart !== -1 && (fHeaderStart - fCommentStart) < 200) {
    // Check if the comment is on a line right before <header>
    const between = content.substring(fCommentStart, fHeaderStart);
    if (between.includes('HEADER') || between.trim().endsWith('-->')) {
      // Find the start of that line
      const lineStart = content.lastIndexOf('\n', fCommentStart) + 1;
      fHtmlStart = lineStart;
    } else {
      const lineStart = content.lastIndexOf('\n', fHeaderStart) + 1;
      fHtmlStart = lineStart;
    }
  } else {
    const lineStart = content.lastIndexOf('\n', fHeaderStart) + 1;
    fHtmlStart = lineStart;
  }
  
  const fHeaderEnd = content.indexOf('</header>');
  if (fHeaderEnd !== -1) {
    // Find end of </header> line
    let fHtmlEnd = content.indexOf('\n', fHeaderEnd);
    if (fHtmlEnd === -1) fHtmlEnd = content.length;
    
    content = content.substring(0, fHtmlStart) + headerHtml + content.substring(fHtmlEnd);
    changed = true;
    console.log(f + ': replaced header HTML');
  }
  
  // ── 6b. Replace header CSS ──
  // Find HEADER TIER 1 CSS
  const fCssTier1 = content.indexOf('   HEADER \u2014 TIER 1');
  if (fCssTier1 !== -1) {
    // Go back to find the /* ==== line before it
    const fCssStart = content.lastIndexOf('    /* ====', fCssTier1);
    
    // Find where header CSS ends - look for next non-HEADER section comment
    let fCssEnd = -1;
    let searchFrom = fCssTier1 + 20;
    while (true) {
      const nextSection = content.indexOf('    /* ====', searchFrom);
      if (nextSection === -1) {
        // Maybe it ends at </style>
        fCssEnd = content.indexOf('  </style>', searchFrom);
        break;
      }
      // Check if this section is still part of HEADER
      const sectionLabel = content.substring(nextSection, nextSection + 200);
      if (sectionLabel.includes('HEADER')) {
        searchFrom = nextSection + 20;
        continue;
      } else {
        fCssEnd = nextSection;
        break;
      }
    }
    
    if (fCssEnd !== -1) {
      content = content.substring(0, fCssStart) + headerCss + content.substring(fCssEnd);
      changed = true;
      console.log(f + ': replaced header CSS');
    }
  }
  
  // ── 6c. Ensure :root has all needed variables ──
  const fRootStart = content.indexOf(':root {');
  if (fRootStart !== -1) {
    const fRootEnd = content.indexOf('}', fRootStart) + 1;
    const fRoot = content.substring(fRootStart, fRootEnd);
    
    // Check for missing variables
    const neededVars = [
      ['--color-text-on-primary', '#ffffff'],
      ['--color-bg-subtle', '#fcfcfc'],
      ['--color-text-muted', '#7a7e73'],
      ['--color-text-gray', '#111827'],
      ['--color-text-gray-soft', '#6b7280'],
      ['--color-border-soft', '#e5e7eb'],
      ['--radius-pill', '18px'],
      ['--radius-card', '24px'],
      ['--radius-img', '12px'],
      ['--color-primary-hover', '#01543a'],
      ['--color-primary-dark', '#014d34'],
      ['--color-secondary', '#916f00'],
      ['--color-accent-gold', '#dfba73'],
    ];
    
    let insertions = '';
    for (const [varName, varValue] of neededVars) {
      if (!fRoot.includes(varName)) {
        insertions += '      ' + varName + ': ' + varValue + ';\n';
      }
    }
    
    if (insertions.length > 0) {
      // Insert before the closing }
      const insertPos = content.lastIndexOf('}', fRootEnd);
      content = content.substring(0, insertPos) + '      /* ---- Added for header ---- */\n' + insertions + '    ' + content.substring(insertPos);
      changed = true;
      console.log(f + ': added missing CSS variables');
    }
  }
  
  // ── 6d. Ensure .riyal-sym CSS rule exists ──
  if (!content.includes('.riyal-sym {')) {
    const styleEnd = content.indexOf('</style>');
    if (styleEnd !== -1) {
      const riyalCss = '\n    .riyal-sym {\n      height: 1em;\n      width: auto;\n      display: inline-block;\n      vertical-align: middle;\n      position: relative;\n      top: -0.05em;\n    }\n\n  ';
      content = content.substring(0, styleEnd) + riyalCss + content.substring(styleEnd);
      changed = true;
      console.log(f + ': added .riyal-sym rule');
    }
  }
  
  if (changed) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(f + ': SAVED');
  } else {
    console.log(f + ': no changes needed');
  }
  console.log('---');
}
