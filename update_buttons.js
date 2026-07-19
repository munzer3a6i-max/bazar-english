const fs = require('fs');

const filePath = 'd:/Files/Bazar/index.html';
let content = fs.readFileSync(filePath, 'utf8');

const cssTarget = `    .product-card__plus {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      border: 1px solid var(--color-border);
      background: var(--color-bg-surface);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-primary);
      transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
    }`;

const cssReplacement = `    .product-card__plus {
      height: 36px;
      border-radius: 10px;
      border: 1px solid var(--color-border);
      background: var(--color-bg-surface);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-primary);
      transition: all 0.2s ease;
      overflow: hidden;
      cursor: pointer;
    }
    .product-card__plus .state-default {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .product-card__plus .state-active {
      display: none;
    }
    .product-card__plus.active {
      width: 100px;
      background: var(--color-primary);
      color: #fff;
      border-color: var(--color-primary);
      padding: 0 10px;
    }
    .product-card__plus.active .state-default {
      display: none;
    }
    .product-card__plus.active .state-active {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .product-card__plus.active .icon-trash,
    .product-card__plus.active .icon-plus {
      width: 18px;
      height: 18px;
    }
    .product-card__plus.active .qty {
      font-size: 16px;
      font-weight: 700;
    }`;

if (content.includes(cssTarget)) {
  content = content.replace(cssTarget, cssReplacement);
}

const buttonPattern = /<button class="product-card__plus"[\s\S]*?<\/button>/g;

const newButton = `<button class="product-card__plus" aria-label="أضف للسلة" onclick="this.classList.toggle('active')">
  <span class="state-default">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  </span>
  <span class="state-active">
    <svg class="icon-trash" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" onclick="this.parentElement.parentElement.classList.remove('active'); event.stopPropagation();">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
    <span class="qty">1</span>
    <svg class="icon-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" onclick="event.stopPropagation();">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  </span>
</button>`;

content = content.replace(buttonPattern, (match) => {
  if (match.includes('state-default')) return match;
  return newButton;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('done');
