const fs = require('fs');

// Ordering flow pages that get the simplified header
const orderingFlowFiles = ['cart.html', 'checkout.html', 'order-confirmation.html', 'order-tracking.html'];

// ─── Simplified header CSS (topbar + logo-only navbar, no search/account/subnav) ───
const simplifiedHeaderCss = `    /* =====================================================================
   HEADER — TIER 1: TOP BAR
   ===================================================================== */
    .topbar {
      background: var(--color-primary);
      color: var(--color-text-on-primary);
      font-size: 12px;
      line-height: 20px;
    }

    .topbar .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-block: 8px;
    }

    .topbar__group {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .topbar__item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }

    .topbar__item svg {
      width: 13px;
      height: 13px;
    }

    .topbar__lang {
      color: inherit;
      font-size: 12px;
      padding: 0;
    }

    /* =====================================================================
   HEADER — TIER 2: MAIN NAVBAR (logo-only for ordering flow)
   ===================================================================== */
    .navbar {
      background: var(--color-bg-surface);
      border-bottom: 1px solid #E5E7EB;
    }

    .navbar .container {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 16px 32px;
      height: 95px;
    }

    .logo {
      line-height: 1;
      text-align: right;
    }

    .logo__title {
      font-size: 32px;
      line-height: 46px;
      font-weight: 700;
      color: var(--color-primary);
    }

    .logo__subtitle {
      font-family: var(--font-en);
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.2px;
      color: var(--color-secondary);
    }

`;

// ─── Simplified header HTML (topbar + logo only, no search/delivery/account/subnav) ───
const simplifiedHeaderHtml = `    <!-- ============================ HEADER ============================ -->
    <header>

      <!-- Tier 1: top bar -->
      <div class="topbar">
        <div class="container">
          <div class="topbar__group">
            <button class="topbar__lang">English</button>
            <span class="divider"></span>
            <span class="topbar__item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              920012345
            </span>
            <span class="divider"></span>
            <a class="topbar__item" href="#">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M16.5 9.4 7.5 4.21" />
                <path
                  d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              \u062A\u062A\u0628\u0639 \u0637\u0644\u0628\u0643
            </a>
          </div>

          <div class="topbar__group">
            <span class="topbar__item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z" />
                <path d="M8 7h8M8 11h8M8 15h5" />
              </svg>
              \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0636\u0631\u064A\u0628\u064A: \u0663\u0661\u0660\u0664\u0668\u0669\u0662\u0667\u0664\u0667\u0660\u0660\u0660\u0660\u0663
            </span>
            <span class="divider"></span>
            <span class="topbar__item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
              \u0645\u0639\u0631\u0648\u0641 \u0627\u0644\u0630\u0647\u0628\u064A \u0631\u0642\u0645 \u0662\u0669\u0668\u0664\u0663
            </span>
            <span class="divider"></span>
            <span class="topbar__item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              \u0645\u062A\u062C\u0631 \u0633\u0639\u0648\u062F\u064A \u0631\u0633\u0645\u064A \u0645\u0648\u062B\u0642
            </span>
          </div>
        </div>
      </div>

      <!-- Tier 2: logo-only navbar -->
      <div class="navbar">
        <div class="container">
          <a class="logo" href="#">
            <div class="logo__title">\u0628\u0627\u0632\u0627\u0631 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</div>
            <div class="logo__subtitle">SAUDI BAZAAR</div>
          </a>
        </div>
      </div>

    </header>`;

// ─── Process each ordering flow file ───
for (const f of orderingFlowFiles) {
  let content = fs.readFileSync(f, 'utf8');
  
  // 1. Replace header CSS (from "HEADER — TIER 1" to just before next non-header section)
  const cssTier1Idx = content.indexOf('   HEADER \u2014 TIER 1');
  if (cssTier1Idx !== -1) {
    const cssStart = content.lastIndexOf('    /* ====', cssTier1Idx);
    
    // Find where header CSS ends
    let cssEnd = -1;
    let searchFrom = cssTier1Idx + 20;
    while (true) {
      const nextSection = content.indexOf('    /* ====', searchFrom);
      if (nextSection === -1) {
        cssEnd = content.indexOf('  </style>', searchFrom);
        break;
      }
      const sectionLabel = content.substring(nextSection, nextSection + 200);
      if (sectionLabel.includes('HEADER')) {
        searchFrom = nextSection + 20;
        continue;
      } else {
        cssEnd = nextSection;
        break;
      }
    }
    
    if (cssEnd !== -1) {
      content = content.substring(0, cssStart) + simplifiedHeaderCss + content.substring(cssEnd);
      console.log(f + ': replaced header CSS with simplified version');
    }
  }
  
  // 2. Replace header HTML
  const htmlHeaderStart = content.indexOf('    <!-- ============================ HEADER');
  if (htmlHeaderStart === -1) {
    // Try finding <header> directly
    var htmlStart = content.indexOf('    <header>');
    if (htmlStart === -1) {
      console.log(f + ': could not find header HTML');
      continue;
    }
  } else {
    var htmlStart = htmlHeaderStart;
  }
  
  const htmlEnd = content.indexOf('    </header>');
  if (htmlEnd !== -1) {
    const afterHeader = htmlEnd + '    </header>'.length;
    content = content.substring(0, htmlStart) + simplifiedHeaderHtml + content.substring(afterHeader);
    console.log(f + ': replaced header HTML with simplified version');
  }
  
  fs.writeFileSync(f, content, 'utf8');
  console.log(f + ': SAVED');
  console.log('---');
}
