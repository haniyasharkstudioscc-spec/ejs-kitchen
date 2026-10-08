/**
 * ==========================================================================
 * EJ'S KITCHEN - INTERACTIVE MENU & SPECIAL DEALS CONTROLLER
 * Handles: Deals Carousel, 3D Category Carousel, Staggered Product Grid,
 * Scroll Reveals, Touch/Drag Swiping, and Customer Reviews Carousel.
 * ==========================================================================
 */

(function() {
  'use strict';

  // Ensure data is loaded
  if (typeof EJS_DATA === 'undefined') {
    console.error("EJS_DATA not found. Please ensure menu-data.js is loaded before menu-app.js.");
    return;
  }

  // State
  let activeCategoryIndex = 0;
  let activeDealIndex = 0;
  let activeReviewIndex = 0;

  // DOM Elements
  let dealsTrack = null;
  let dealsViewport = null;
  let dealsPrevBtn = null;
  let dealsNextBtn = null;
  let dealsCounter = null;

  let categoryTrack = null;
  let categoryPrevBtn = null;
  let categoryNextBtn = null;
  let categoryCounter = null;

  let productsGrid = null;

  let reviewsTrack = null;
  let reviewsViewport = null;
  let reviewsPrevBtn = null;
  let reviewsNextBtn = null;
  let reviewsCounter = null;

  /* ==========================================================================
     1. SCROLL REVEAL (IntersectionObserver)
     ========================================================================== */
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .gallery-reveal');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /* ==========================================================================
     2. SPECIAL MEAL DEALS CAROUSEL
     ========================================================================== */
  function renderDeals() {
    if (!dealsTrack) return;
    dealsTrack.innerHTML = '';

    EJS_DATA.deals.forEach((deal, idx) => {
      const card = document.createElement('div');
      card.className = `deal-card ${idx === activeDealIndex ? 'is-active' : ''}`;
      card.dataset.index = idx;

      const orderUrl = EJS_DATA.getWhatsAppOrderUrl(`${deal.name} (${deal.badge})`, 'deal');

      const itemsHtml = deal.items.map(item => `
        <li class="deal-item">
          <span class="deal-item-bullet">✦</span>
          <span>${item}</span>
        </li>
      `).join('');

      const originalPriceHtml = deal.originalPrice 
        ? `<span class="deal-original-price">${deal.originalPrice}</span>` 
        : '';

      const taglineHtml = deal.tagline
        ? `<p class="deal-tagline">${deal.tagline}</p>`
        : '';

      card.innerHTML = `
        <div>
          <div class="deal-card-header">
            <span class="deal-badge">${deal.badge}</span>
            <span class="deal-tag-hint">Meal Deal</span>
          </div>
          <div class="deal-card-body">
            <h3 class="deal-name">${deal.name}</h3>
            <div class="deal-divider"></div>
            <div class="deal-includes-label">Includes:</div>
            <ul class="deal-items-list">
              ${itemsHtml}
            </ul>
            ${taglineHtml}
          </div>
        </div>
        <div class="deal-card-footer">
          <div class="deal-price-block">
            <div class="deal-prices-row">
              ${originalPriceHtml}
              <span class="deal-price">${deal.price}</span>
            </div>
          </div>
          <a href="${orderUrl}" target="_blank" rel="noopener noreferrer" class="deal-order-btn" data-action="order-deal">
            <span>ORDER</span>
            <span class="deal-btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (!e.target.closest('a')) {
          setActiveDeal(idx);
        }
      });

      dealsTrack.appendChild(card);
    });

    updateDealsPosition();
  }

  function setActiveDeal(index) {
    if (index < 0) index = 0;
    if (index >= EJS_DATA.deals.length) index = EJS_DATA.deals.length - 1;
    activeDealIndex = index;

    const cards = dealsTrack.querySelectorAll('.deal-card');
    cards.forEach((card, idx) => {
      card.classList.toggle('is-active', idx === activeDealIndex);
    });

    if (dealsCounter) {
      const current = String(activeDealIndex + 1).padStart(2, '0');
      const total = String(EJS_DATA.deals.length).padStart(2, '0');
      dealsCounter.innerHTML = `<span class="deals-counter-current">${current}</span> / <span class="deals-counter-total">${total}</span>`;
    }

    if (dealsPrevBtn) dealsPrevBtn.disabled = (activeDealIndex === 0);
    if (dealsNextBtn) dealsNextBtn.disabled = (activeDealIndex === EJS_DATA.deals.length - 1);

    updateDealsPosition();
  }

  function updateDealsPosition() {
    if (!dealsTrack || !dealsViewport) return;

    const cards = dealsTrack.querySelectorAll('.deal-card');
    if (!cards.length) return;

    const card = cards[activeDealIndex];
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const computedStyle = window.getComputedStyle(dealsTrack);
    const gap = parseFloat(computedStyle.gap || computedStyle.columnGap) || (window.innerWidth <= 480 ? 12 : (window.innerWidth <= 768 ? 16 : 24));
    const viewportWidth = dealsViewport.offsetWidth;

    const targetOffset = (activeDealIndex * (cardWidth + gap)) - (viewportWidth / 2) + (cardWidth / 2);
    const maxOffset = (cards.length * (cardWidth + gap)) - gap - viewportWidth;

    const clampedOffset = Math.max(0, Math.min(targetOffset, Math.max(0, maxOffset)));
    dealsTrack.style.transform = `translateX(-${clampedOffset}px)`;
  }

  function initDealsCarousel() {
    dealsTrack = document.getElementById('dealsTrack');
    dealsViewport = document.getElementById('dealsViewport');
    dealsPrevBtn = document.getElementById('dealsPrevBtn');
    dealsNextBtn = document.getElementById('dealsNextBtn');
    dealsCounter = document.getElementById('dealsCounter');

    if (!dealsTrack) return;

    renderDeals();
    setActiveDeal(0);

    if (dealsPrevBtn) {
      dealsPrevBtn.addEventListener('click', () => setActiveDeal(activeDealIndex - 1));
    }
    if (dealsNextBtn) {
      dealsNextBtn.addEventListener('click', () => setActiveDeal(activeDealIndex + 1));
    }

    // Touch swipe & mouse drag support
    let isDragging = false;
    let startX = 0;

    dealsViewport.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const diffX = e.pageX - startX;
      if (diffX < -40) {
        setActiveDeal(activeDealIndex + 1);
      } else if (diffX > 40) {
        setActiveDeal(activeDealIndex - 1);
      }
    });

    // Mobile touch swipe
    let touchStartX = 0;
    dealsViewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    dealsViewport.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (diffX < -40) {
        setActiveDeal(activeDealIndex + 1);
      } else if (diffX > 40) {
        setActiveDeal(activeDealIndex - 1);
      }
    }, { passive: true });

    window.addEventListener('resize', updateDealsPosition);
  }

  /* ==========================================================================
     3. 3D MENU CATEGORY CAROUSEL & SELECTION ANIMATION
     ========================================================================== */
  function renderCategories() {
    if (!categoryTrack) return;
    categoryTrack.innerHTML = '';

    EJS_DATA.categories.forEach((cat, idx) => {
      const card = document.createElement('div');
      card.className = 'category-card';
      card.dataset.index = idx;
      card.dataset.categoryId = cat.id;

      card.innerHTML = `
        <div class="category-card-media">
          <div class="category-placeholder-art">
            ${cat.iconSvg}
            <span class="category-placeholder-tag">${cat.name}</span>
          </div>
          <img 
            src="${cat.coverImage}" 
            alt="${cat.name}" 
            class="category-card-img" 
            loading="lazy" 
            onerror="this.style.display='none'"
            onload="this.previousElementSibling.style.display='none'"
          >
        </div>
        <div class="category-card-header">
          <h3 class="category-card-title">${cat.displayName}</h3>
          <p class="category-card-meta">${cat.tagline}</p>
        </div>
        <div class="category-card-action">
          <span class="category-explore-text">
            <span>Explore</span>
            <span class="btn-arrow" aria-hidden="true">→</span>
          </span>
          <span class="category-active-pill">Selected</span>
        </div>
      `;

      card.addEventListener('click', () => {
        selectCategory(idx);
      });

      categoryTrack.appendChild(card);
    });

    updateCategoryPositions();
  }

  function updateCategoryPositions() {
    if (!categoryTrack) return;
    const cards = categoryTrack.querySelectorAll('.category-card');
    const total = EJS_DATA.categories.length;

    cards.forEach((card, idx) => {
      const relPos = idx - activeCategoryIndex;

      if (relPos === 0) {
        card.setAttribute('data-pos', '0');
      } else if (relPos === -1) {
        card.setAttribute('data-pos', '-1');
      } else if (relPos === 1) {
        card.setAttribute('data-pos', '1');
      } else if (relPos === -2) {
        card.setAttribute('data-pos', '-2');
      } else if (relPos === 2) {
        card.setAttribute('data-pos', '2');
      } else {
        card.setAttribute('data-pos', 'hidden');
      }
    });

    if (categoryCounter) {
      const current = String(activeCategoryIndex + 1).padStart(2, '0');
      const totalStr = String(total).padStart(2, '0');
      categoryCounter.innerHTML = `<span class="category-counter-current">${current}</span> / <span class="category-counter-total">${totalStr}</span>`;
    }

    if (categoryPrevBtn) categoryPrevBtn.disabled = (activeCategoryIndex === 0);
    if (categoryNextBtn) categoryNextBtn.disabled = (activeCategoryIndex === total - 1);
  }

  function selectCategory(index) {
    if (index < 0) index = 0;
    if (index >= EJS_DATA.categories.length) index = EJS_DATA.categories.length - 1;

    if (activeCategoryIndex === index && productsGrid && productsGrid.children.length > 0) {
      return;
    }

    activeCategoryIndex = index;
    updateCategoryPositions();

    const selectedCategory = EJS_DATA.categories[activeCategoryIndex];
    renderProducts(selectedCategory.id);
  }

  function initCategoryCarousel() {
    categoryTrack = document.getElementById('categoryTrack');
    categoryPrevBtn = document.getElementById('categoryPrevBtn');
    categoryNextBtn = document.getElementById('categoryNextBtn');
    categoryCounter = document.getElementById('categoryCounter');

    if (!categoryTrack) return;

    renderCategories();

    if (categoryPrevBtn) {
      categoryPrevBtn.addEventListener('click', () => selectCategory(activeCategoryIndex - 1));
    }
    if (categoryNextBtn) {
      categoryNextBtn.addEventListener('click', () => selectCategory(activeCategoryIndex + 1));
    }

    // Touch & Drag Gestures
    let touchStartX = 0;
    const viewport = document.getElementById('categoryCarouselViewport');

    if (viewport) {
      viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (diff < -40) {
          selectCategory(activeCategoryIndex + 1);
        } else if (diff > 40) {
          selectCategory(activeCategoryIndex - 1);
        }
      }, { passive: true });

      let isMouseDown = false;
      let mouseStartX = 0;
      viewport.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        mouseStartX = e.clientX;
      });

      window.addEventListener('mouseup', (e) => {
        if (!isMouseDown) return;
        isMouseDown = false;
        const diff = e.clientX - mouseStartX;
        if (diff < -40) {
          selectCategory(activeCategoryIndex + 1);
        } else if (diff > 40) {
          selectCategory(activeCategoryIndex - 1);
        }
      });
    }
  }

  /* ==========================================================================
     4. PRODUCT GRID WITH STAGGERED CATEGORY TRANSITION
     ========================================================================== */
  function renderProducts(categoryId) {
    if (!productsGrid) return;

    const items = EJS_DATA.products[categoryId] || [];

    // Fade out old items
    productsGrid.classList.add('is-transitioning');

    setTimeout(() => {
      productsGrid.innerHTML = '';

      items.forEach((item, idx) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${idx * 0.06}s`;

        const orderUrl = EJS_DATA.getWhatsAppOrderUrl(item.name, 'product');

        productCard.innerHTML = `
          <div class="product-image-box">
            <div class="product-placeholder-art">
              <svg class="product-placeholder-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.996 4.996 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.78 3.12-2.15 4.1z"/>
              </svg>
              <span class="product-placeholder-text">${item.name}</span>
            </div>
            <img 
              src="${item.image}" 
              alt="${item.name}" 
              class="product-img product-img-${item.id}" 
              loading="lazy" 
              onerror="this.style.display='none'"
              onload="this.previousElementSibling.style.display='none'"
            >
          </div>
          <div class="product-info">
            <div class="product-badge-row">
              <span class="product-badge">✦ ${item.badge || 'EJ’S SPECIAL'}</span>
            </div>
            <h4 class="product-name">${item.name}</h4>
            <p class="product-desc">${item.description}</p>
          </div>
          <div class="product-footer">
            <span class="product-price">${item.price}</span>
            <a href="${orderUrl}" target="_blank" rel="noopener noreferrer" class="product-order-btn" data-action="order-product">
              <span>ORDER</span>
              <span class="btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        `;

        productsGrid.appendChild(productCard);
      });

      productsGrid.classList.remove('is-transitioning');
    }, 180);
  }

  function initProductGrid() {
    productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    const initialCategory = EJS_DATA.categories[0];
    if (initialCategory) {
      renderProducts(initialCategory.id);
    }
  }

  /* ==========================================================================
     5. CUSTOMER REVIEWS CAROUSEL
     ========================================================================== */
  function renderReviews() {
    if (!reviewsTrack || !EJS_DATA.reviews) return;
    reviewsTrack.innerHTML = '';

    EJS_DATA.reviews.forEach((rev, idx) => {
      const card = document.createElement('div');
      card.className = `review-card ${idx === activeReviewIndex ? 'is-active' : ''}`;
      card.dataset.index = idx;
      if (rev.screenshot) {
        card.dataset.lightboxSrc = rev.screenshot;
        card.dataset.caption = `${rev.customerName} • WhatsApp Order Feedback (${rev.orderTag})`;
      }

      const screenshotHtml = rev.screenshot ? `
        <div class="review-screenshot-box">
          <img 
            src="${rev.screenshot}" 
            alt="${rev.customerName} WhatsApp review for EJ’s Kitchen" 
            class="review-screenshot-img" 
            loading="lazy"
            onerror="this.parentElement.style.display='none'; this.parentElement.nextElementSibling.style.display='block';"
          >
          <div class="review-expand-hint">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <span>View Full Screenshot</span>
          </div>
        </div>
        <div class="review-chat-bubble" style="display: none;">
          <div class="review-stars">★★★★★</div>
          <p class="review-text">“${rev.fallbackText || 'Super delicious and fresh! Loved every bite.'}”</p>
        </div>
      ` : `
        <div class="review-chat-bubble">
          <div class="review-stars">★★★★★</div>
          <p class="review-text">“${rev.fallbackText || 'Super delicious and fresh! Loved every bite.'}”</p>
        </div>
      `;

      card.innerHTML = `
        <div class="review-card-header">
          <div class="review-user-info">
            <div class="review-avatar">${rev.avatarLetter || rev.customerName.charAt(0)}</div>
            <div class="review-name-block">
              <span class="review-user-name">
                ${rev.customerName}
                <span class="review-verified-badge" title="Verified WhatsApp Order">✓</span>
              </span>
              <span class="review-user-meta">${rev.maskedPhone}</span>
            </div>
          </div>
          <div class="review-wa-badge" aria-label="WhatsApp Review">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.33C9.33 7.33 9 7.41 8.73 7.71C8.45 8.01 7.68 8.74 7.68 10.21C7.68 11.68 8.75 13.1 8.9 13.3C9.05 13.5 11.02 16.54 14.03 17.84C14.75 18.15 15.31 18.34 15.75 18.48C16.48 18.71 17.14 18.68 17.66 18.6C18.24 18.51 19.45 17.87 19.7 17.16C19.95 16.46 19.95 15.86 19.88 15.73C19.8 15.61 19.6 15.54 19.3 15.39C19 15.24 17.53 14.51 17.25 14.41C16.98 14.31 16.78 14.26 16.58 14.56C16.38 14.86 15.8 15.54 15.63 15.74C15.45 15.94 15.28 15.96 14.98 15.81C14.68 15.66 13.72 15.35 12.58 14.34C11.69 13.55 11.09 12.57 10.92 12.27C10.74 11.97 10.9 11.81 11.05 11.66C11.19 11.53 11.35 11.31 11.5 11.14C11.66 10.96 11.71 10.84 11.81 10.64C11.91 10.43 11.86 10.26 11.79 10.11C11.71 9.96 11.13 8.54 10.89 7.96C10.65 7.4 10.42 7.47 10.24 7.47C10.07 7.46 9.87 7.33 9.53 7.33Z"/>
            </svg>
          </div>
        </div>

        ${screenshotHtml}

        <div class="review-card-footer">
          <span class="review-order-pill">✦ ${rev.orderTag}</span>
          <span class="review-location-tag">Verified Customer</span>
        </div>
      `;

      card.addEventListener('click', () => {
        setActiveReview(idx);
      });

      reviewsTrack.appendChild(card);
    });

    updateReviewsPosition();
  }

  function setActiveReview(index) {
    if (!EJS_DATA.reviews) return;
    if (index < 0) index = 0;
    if (index >= EJS_DATA.reviews.length) index = EJS_DATA.reviews.length - 1;
    activeReviewIndex = index;

    const cards = reviewsTrack.querySelectorAll('.review-card');
    cards.forEach((card, idx) => {
      card.classList.toggle('is-active', idx === activeReviewIndex);
    });

    if (reviewsCounter) {
      const current = String(activeReviewIndex + 1).padStart(2, '0');
      const total = String(EJS_DATA.reviews.length).padStart(2, '0');
      reviewsCounter.innerHTML = `<span class="reviews-counter-current">${current}</span> / <span class="reviews-counter-total">${total}</span>`;
    }

    if (reviewsPrevBtn) reviewsPrevBtn.disabled = (activeReviewIndex === 0);
    if (reviewsNextBtn) reviewsNextBtn.disabled = (activeReviewIndex === EJS_DATA.reviews.length - 1);

    updateReviewsPosition();
  }

  function updateReviewsPosition() {
    if (!reviewsTrack || !reviewsViewport) return;

    const cards = reviewsTrack.querySelectorAll('.review-card');
    if (!cards.length) return;

    const card = cards[activeReviewIndex];
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const computedStyle = window.getComputedStyle(reviewsTrack);
    const gap = parseFloat(computedStyle.gap || computedStyle.columnGap) || (window.innerWidth <= 480 ? 12 : (window.innerWidth <= 768 ? 16 : 24));
    const viewportWidth = reviewsViewport.offsetWidth;

    const targetOffset = (activeReviewIndex * (cardWidth + gap)) - (viewportWidth / 2) + (cardWidth / 2);
    const maxOffset = (cards.length * (cardWidth + gap)) - gap - viewportWidth;

    const clampedOffset = Math.max(0, Math.min(targetOffset, Math.max(0, maxOffset)));
    reviewsTrack.style.transform = `translateX(-${clampedOffset}px)`;
  }

  function initReviewsCarousel() {
    reviewsTrack = document.getElementById('reviewsTrack');
    reviewsViewport = document.getElementById('reviewsViewport');
    reviewsPrevBtn = document.getElementById('reviewsPrevBtn');
    reviewsNextBtn = document.getElementById('reviewsNextBtn');
    reviewsCounter = document.getElementById('reviewsCounter');

    if (!reviewsTrack) return;

    renderReviews();
    setActiveReview(0);

    if (reviewsPrevBtn) {
      reviewsPrevBtn.addEventListener('click', () => setActiveReview(activeReviewIndex - 1));
    }
    if (reviewsNextBtn) {
      reviewsNextBtn.addEventListener('click', () => setActiveReview(activeReviewIndex + 1));
    }

    // Touch & Drag
    let isDragging = false;
    let startX = 0;

    reviewsViewport.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const diffX = e.pageX - startX;
      if (diffX < -40) {
        setActiveReview(activeReviewIndex + 1);
      } else if (diffX > 40) {
        setActiveReview(activeReviewIndex - 1);
      }
    });

    let touchStartX = 0;
    reviewsViewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    reviewsViewport.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (diffX < -40) {
        setActiveReview(activeReviewIndex + 1);
      } else if (diffX > 40) {
        setActiveReview(activeReviewIndex - 1);
      }
    }, { passive: true });

    window.addEventListener('resize', updateReviewsPosition);
  }

  /* ==========================================================================
     6. FULLSCREEN HIGH-RES IMAGE LIGHTBOX MODAL
     ========================================================================== */
  function initLightboxModal() {
    const modal = document.getElementById('imageLightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    const modalCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxCloseBtn');
    const backdrop = modal ? modal.querySelector('.lightbox-backdrop') : null;
    const container = modal ? modal.querySelector('.lightbox-container') : null;

    if (!modal || !modalImg) return;

    let previousScrollPosition = 0;

    function openLightbox(src, caption) {
      if (!src) return;
      previousScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      modalImg.src = src;
      modalImg.alt = caption || "Full Preview";
      if (modalCaption) modalCaption.textContent = caption || '';
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      setTimeout(() => {
        if (!modal.classList.contains('is-open')) {
          modalImg.src = '';
          if (modalCaption) modalCaption.textContent = '';
        }
      }, 300);
    }

    // Delegate click handler on document for any [data-lightbox-src]
    document.addEventListener('click', (e) => {
      // Don't trigger if clicked on an interactive order button or anchor link
      if (e.target.closest('a[href^="http"], a[href^="https"], a[data-action]')) {
        return;
      }
      const target = e.target.closest('[data-lightbox-src]');
      if (target) {
        const src = target.getAttribute('data-lightbox-src');
        const caption = target.getAttribute('data-caption') || '';
        openLightbox(src, caption);
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
      });
    }

    // Clicking on modal outside container closes modal
    modal.addEventListener('click', (e) => {
      if (container && !container.contains(e.target)) {
        closeLightbox();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

  /* ==========================================================================
     7. FINAL CTA & FLOATING WHATSAPP BUTTON
     ========================================================================== */
  function initFloatingWhatsApp() {
    const generalOrderUrl = EJS_DATA.getWhatsAppOrderUrl('', 'general');
    
    const ctaWaBtn = document.getElementById('finalCtaWhatsAppBtn');
    if (ctaWaBtn) {
      ctaWaBtn.setAttribute('href', generalOrderUrl);
      ctaWaBtn.setAttribute('target', '_blank');
      ctaWaBtn.setAttribute('rel', 'noopener noreferrer');
    }

    const floatingWaBtn = document.getElementById('floatingWhatsAppBtn');
    if (floatingWaBtn) {
      floatingWaBtn.setAttribute('href', generalOrderUrl);
      floatingWaBtn.setAttribute('target', '_blank');
      floatingWaBtn.setAttribute('rel', 'noopener noreferrer');
    }

    const footerWaLink = document.getElementById('footerWhatsAppLink');
    if (footerWaLink) {
      footerWaLink.setAttribute('href', generalOrderUrl);
      footerWaLink.setAttribute('target', '_blank');
      footerWaLink.setAttribute('rel', 'noopener noreferrer');
    }
  }

  /* ==========================================================================
     INIT ON DOM LOAD
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveals();
    initDealsCarousel();
    initCategoryCarousel();
    initProductGrid();
    initReviewsCarousel();
    initLightboxModal();
    initFloatingWhatsApp();
  });

})();
