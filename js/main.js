/**
 * EJ'S KITCHEN - CORE CLIENT SCRIPT
 * Handles: Loader sequence, Navbar scroll behavior, Mobile Menu,
 * Hero Video Autoplay, and Smooth Navigation Scrolling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuration constants
  const CONFIG = {
    WHATSAPP_NUMBER: '+923008884153',
    WHATSAPP_DEFAULT_MSG: "Hi EJ's Kitchen! I would love to place an order from your homemade menu.",
    LOADER_DURATION_MS: 1200,
    SCROLL_THRESHOLD_PX: 40
  };

  // DOM Elements
  const body = document.body;
  const loader = document.getElementById('siteLoader');
  const heroSection = document.getElementById('hero');
  const header = document.getElementById('siteHeader');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const scrollIndicator = document.getElementById('heroScrollIndicator');
  const whatsappButtons = document.querySelectorAll('[data-action="whatsapp"]');

  /* ==========================================================================
     1. WHATSAPP LINK INITIALIZATION
     ========================================================================== */
  function initWhatsAppLinks() {
    const encodedMsg = encodeURIComponent(CONFIG.WHATSAPP_DEFAULT_MSG);
    const cleanNumber = CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;

    whatsappButtons.forEach(btn => {
      btn.setAttribute('href', waUrl);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    });
  }

  /* ==========================================================================
     2. LOADING EXPERIENCE
     ========================================================================== */
  function initLoadingExperience() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (loader) loader.classList.add('is-hidden');
      body.classList.remove('loading');
      return;
    }

    setTimeout(() => {
      if (loader) {
        loader.classList.add('is-hidden');
      }
      body.classList.remove('loading');
    }, CONFIG.LOADER_DURATION_MS);
  }

  /* ==========================================================================
     3. STICKY NAVBAR SCROLL INTERACTION & SCROLL INDICATOR
     ========================================================================== */
  function handleScroll() {
    const currentScrollY = window.scrollY || window.pageYOffset;

    // Header sticky scrolled background toggle
    if (header) {
      if (currentScrollY > CONFIG.SCROLL_THRESHOLD_PX) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Fade out scroll indicator on scroll
    if (scrollIndicator) {
      if (currentScrollY > 50) {
        scrollIndicator.classList.add('is-hidden');
      } else {
        scrollIndicator.classList.remove('is-hidden');
      }
    }

    // Scroll-Spy: Update active navigation link
    const sectionIds = ['hero', 'deals', 'menu', 'kitchen', 'reviews'];
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-link');
    const scrollPos = currentScrollY + 160;

    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (!section) return;

      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ==========================================================================
     4. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  function toggleMobileMenu(forceState) {
    if (!mobileMenu || !hamburgerBtn) return;

    const shouldOpen = typeof forceState === 'boolean' 
      ? forceState 
      : !mobileMenu.classList.contains('is-open');

    if (shouldOpen) {
      mobileMenu.classList.add('is-open');
      hamburgerBtn.classList.add('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.remove('is-open');
      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Close mobile menu when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu(false);
    });
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
      toggleMobileMenu(false);
    }
  });

  /* ==========================================================================
     5. SMOOTH SCROLL FOR INTERNAL ANCHORS
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* ==========================================================================
     6. HERO VIDEO AUTOPLAY INITIALIZATION
     ========================================================================== */
  function initHeroVideo() {
    const heroVideo = document.getElementById('heroVideo');
    if (!heroVideo) return;

    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const startPlay = () => {
          heroVideo.play();
          window.removeEventListener('click', startPlay);
          window.removeEventListener('scroll', startPlay);
          window.removeEventListener('touchstart', startPlay);
        };
        window.addEventListener('click', startPlay, { once: true });
        window.addEventListener('scroll', startPlay, { once: true });
        window.addEventListener('touchstart', startPlay, { once: true });
      });
    }
  }

  // Run initializers
  initWhatsAppLinks();
  initLoadingExperience();
  initHeroVideo();
});
