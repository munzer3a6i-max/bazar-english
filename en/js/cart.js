document.addEventListener('DOMContentLoaded', function() {
  // Prevent card navigation when clicking wishlist
  const wishlistBtns = document.querySelectorAll('.product-card__wishlist');
  wishlistBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.classList.toggle('active');
      const svg = this.querySelector('svg');
      if(this.classList.contains('active')) {
        svg.setAttribute('fill', 'var(--color-primary, #046c4e)');
        svg.setAttribute('stroke', 'var(--color-primary, #046c4e)');
      } else {
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
      }
    });
  });

  // Handle Add to Cart button (plus button on product cards)
  const cartPlusBtns = document.querySelectorAll('.product-card__plus');
  cartPlusBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const target = e.target;
      
      // If the button is not active yet, activate it.
      if(!this.classList.contains('active')) {
        this.classList.add('active');
        return;
      }
      
      // If it is already active, handle clicks on the quantity controls
      const plusIcon = target.closest('.icon-plus');
      const minusIcon = target.closest('.icon-minus');
      const trashIcon = target.closest('.icon-trash');
      const qtySpan = this.querySelector('.qty');
      
      if(qtySpan) {
        let qty = parseInt(qtySpan.textContent) || 1;
        
        if(plusIcon) {
          qty++;
          qtySpan.textContent = qty;
        } else if(minusIcon) {
          if(qty > 1) {
            qty--;
            qtySpan.textContent = qty;
          }
        } else if(trashIcon) {
          // Remove from cart (reset)
          this.classList.remove('active');
          qtySpan.textContent = "1";
          qty = 1;
        }
        
        // Update visibility of minus vs trash
        const tIcon = this.querySelector('.icon-trash');
        const mIcon = this.querySelector('.icon-minus');
        if(tIcon && mIcon) {
          if(qty > 1) {
            tIcon.style.display = 'none';
            mIcon.style.display = 'block';
          } else {
            tIcon.style.display = 'block';
            mIcon.style.display = 'none';
          }
        }
      }
    });
  });
});
