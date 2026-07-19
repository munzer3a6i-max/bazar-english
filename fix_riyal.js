const fs = require('fs');
const files = ['order-confirmation.html','contact-us.html','checkout.html','product.html','login.html','signup.html','order-tracking.html'];

const riyalCss = "\n    .riyal-sym {\n      height: 1em;\n      width: auto;\n      display: inline-block;\n      vertical-align: middle;\n      position: relative;\n      top: -0.05em;\n    }\n";

for (const f of files) {
    let content = fs.readFileSync(f, 'utf8');
    
    if (content.includes('.riyal-sym {')) {
        console.log(f + ': already has .riyal-sym rule, skipping');
        continue;
    }
    
    const styleEndIdx = content.indexOf('</style>');
    if (styleEndIdx === -1) {
        console.log(f + ': no </style> found, skipping');
        continue;
    }
    
    content = content.substring(0, styleEndIdx) + riyalCss + '  ' + content.substring(styleEndIdx);
    fs.writeFileSync(f, content, 'utf8');
    console.log(f + ': added .riyal-sym rule');
}
