$ErrorActionPreference = "Stop"
try {
    $file = "d:\Files\Bazar\homepage.html"
    $lines = [System.IO.File]::ReadAllLines($file, [System.Text.Encoding]::UTF8)

    $trustIdx = -1
    $styleIdx = -1
    
    for ($i = 0; $i -lt $lines.Length; $i++) {
        if ($lines[$i] -match "TRUST / GUARANTEES") {
            $trustIdx = $i
        }
        if ($lines[$i] -match "</style>") {
            $styleIdx = $i
        }
    }

    if ($trustIdx -eq -1 -or $styleIdx -eq -1) {
        throw "Could not find tags: trust=$trustIdx, style=$styleIdx"
    }

    $css = @"
    /* =====================================================================
       BRANDS SECTION
       ===================================================================== */
    .brands__grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
    }
    .brand-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: #fff;
      border: 1px solid #eaeaea;
      border-radius: 16px;
      text-decoration: none;
      color: inherit;
    }
    .brand-card__logo {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      width: 100%;
    }
    .brand-card__logo svg {
      height: 100%;
      width: auto;
      max-width: 100%;
    }
    .brand-card__badge {
      background: #e8f5e9;
      color: #2e7d32;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 20px;
    }
    @media (max-width: 992px) {
      .brands__grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 576px) {
      .brands__grid { grid-template-columns: repeat(2, 1fr); }
    }
"@

    $html = @"
    <!-- =========================== BRANDS ====================== -->
    <section class="brands container" style="margin-bottom: 40px;">
      <div class="section-head">
        <div>
          <div class="section-head__title">منتجات حسب البراند</div>
        </div>
        <a class="section-viewall" href="#" style="color: #016342; font-weight: 700; text-decoration: none; font-size: 14px;">
          جميع الماركات
        </a>
      </div>

      <div class="brands__grid">
        <a href="#" class="brand-card">
          <div class="brand-card__logo">
            <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="5" width="140" height="40" rx="20" fill="#0A2240" />
              <text x="80" y="32" font-family="Arial, sans-serif" font-weight="900" font-size="22" fill="white" text-anchor="middle">DeLonghi</text>
            </svg>
          </div>
          <span class="brand-card__badge">وكيل معتمد</span>
        </a>
        <a href="#" class="brand-card">
          <div class="brand-card__logo">
            <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="80" y="34" font-family="Arial, sans-serif" font-weight="700" font-size="26" fill="#333" text-anchor="middle">KENWOOD</text>
            </svg>
          </div>
          <span class="brand-card__badge">وكيل معتمد</span>
        </a>
        <a href="#" class="brand-card">
          <div class="brand-card__logo">
            <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="80" y="34" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#0D52D6" text-anchor="middle">PHILIPS</text>
            </svg>
          </div>
          <span class="brand-card__badge">وكيل معتمد</span>
        </a>
        <a href="#" class="brand-card">
          <div class="brand-card__logo">
            <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="25" r="16" fill="#A50034" />
              <text x="50" y="30" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="white" text-anchor="middle">L</text>
              <text x="56" y="22" font-family="Arial, sans-serif" font-weight="bold" font-size="10" fill="white" text-anchor="middle">G</text>
              <text x="100" y="34" font-family="Arial, sans-serif" font-weight="bold" font-size="28" fill="#666" text-anchor="middle">LG</text>
            </svg>
          </div>
          <span class="brand-card__badge">وكيل معتمد</span>
        </a>
        <a href="#" class="brand-card">
          <div class="brand-card__logo">
            <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="80" y="34" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#1428A0" text-anchor="middle">SAMSUNG</text>
            </svg>
          </div>
          <span class="brand-card__badge">وكيل معتمد</span>
        </a>
      </div>
    </section>
"@

    $newList = [System.Collections.Generic.List[string]]::new()
    for ($i = 0; $i -lt $lines.Length; $i++) {
        if ($i -eq $styleIdx) {
            $newList.Add($css)
        }
        if ($i -eq $trustIdx) {
            $newList.Add($html)
        }
        $newList.Add($lines[$i])
    }

    [System.IO.File]::WriteAllLines($file, $newList, [System.Text.Encoding]::UTF8)
    "SUCCESS" | Out-File "d:\Files\Bazar\success_brands.txt" -Encoding utf8
} catch {
    $_.Exception.Message | Out-File "d:\Files\Bazar\success_brands.txt" -Encoding utf8
}
