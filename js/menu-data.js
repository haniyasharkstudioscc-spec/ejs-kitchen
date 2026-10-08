/**
 * ==========================================================================
 * EJ'S KITCHEN - MENU & DEALS DATA STRUCTURE (PART 2)
 * Editable placeholders for deals, categories, and products.
 * Replace placeholder strings with real EJ's Kitchen items anytime.
 * ==========================================================================
 */

const EJS_DATA = {
  // WhatsApp Global Configuration (0300-8884153)
  whatsapp: {
    phoneNumber: '+923008884153',
    displayNumber: '0300-8884153',
    defaultGreeting: "Hi EJ's Kitchen, I'd like to order"
  },

  // Social Links
  social: {
    instagram: 'https://www.instagram.com/ej.skitchen?stkn=M2hneWk0cjl0YjY4',
    instagramHandle: '@ej.skitchen',
    location: 'AL REHMAN GARDEN PHASE 2'
  },

  // ========================================================================
  // SPECIAL MEAL DEALS (From EJ's Kitchen Deals Poster)
  // ========================================================================
  deals: [
    {
      id: 'deal-1',
      badge: 'DEAL 1',
      name: 'SOLO CRAVINGS',
      items: [
        'Nugget Wrap',
        'Plain Fries'
      ],
      originalPrice: 'Rs. 650',
      price: 'Rs. 550',
      tagline: 'Perfect for one hungry soul!',
      available: true
    },
    {
      id: 'deal-2',
      badge: 'DEAL 2',
      name: 'PASTA COMBO',
      items: [
        'Pasta (Creamy, cheesy or spicy)',
        'Plain Fries'
      ],
      originalPrice: 'Rs. 700',
      price: 'Rs. 649',
      tagline: 'Creamy, cheesy or spicy – your choice!',
      available: true
    },
    {
      id: 'deal-3',
      badge: 'DEAL 3',
      name: 'CLUB CLASSIC',
      items: [
        'Club Sandwich',
        'Plain Fries'
      ],
      originalPrice: 'Rs. 700',
      price: 'Rs. 649',
      tagline: 'A complete homemade meal in one box!',
      available: true
    },
    {
      id: 'deal-4',
      badge: 'DEAL 4',
      name: 'WRAP DUO',
      items: [
        '2 Signature Wraps',
        'Plain Fries'
      ],
      originalPrice: 'Rs. 1,100',
      price: 'Rs. 999',
      tagline: 'Perfect for sharing with your bestie!',
      available: true
    },
    {
      id: 'deal-5',
      badge: 'DEAL 5',
      name: 'BESTIE FEAST',
      items: [
        '2 Pastas',
        '1 Plain Fries'
      ],
      originalPrice: 'Rs. 1,200',
      price: 'Rs. 1,099',
      tagline: 'Double the pasta, double the happiness!',
      available: true
    },
    {
      id: 'deal-6',
      badge: 'DEAL 6',
      name: 'SNACK BOX',
      items: [
        'Momos (4 pcs)',
        'Nuggets',
        'Fries'
      ],
      originalPrice: '',
      price: 'Rs. 699',
      tagline: 'Your ultimate evening-cravings box!',
      available: true
    },
    {
      id: 'deal-7',
      badge: 'DEAL 7',
      name: 'FAMILY FEAST',
      items: [
        '2 Pastas',
        '2 Sandwiches',
        'Loaded Fries'
      ],
      originalPrice: 'Rs. 2,300',
      price: 'Rs. 1,999',
      tagline: 'Perfect for 3–4 people!',
      available: true
    },
    {
      id: 'deal-8',
      badge: 'DEAL 8',
      name: 'SWEET ENDING',
      items: [
        '2 Cupcakes',
        'Brownies',
        'Plain Cookies'
      ],
      originalPrice: 'Rs. 900',
      price: 'Rs. 799',
      tagline: 'Because every meal deserves dessert!',
      available: true
    }
  ],

  // ========================================================================
  // MENU CATEGORIES (Single line, clean typography)
  // ========================================================================
  categories: [
    {
      id: 'desserts',
      name: 'DESSERTS',
      displayName: 'DESSERTS',
      tagline: 'Warm, gooey, fresh & homemade daily',
      assetPath: 'menu items/',
      coverImage: 'menu items/cup cakes.jpeg',
      iconSvg: `
        <svg viewBox="0 0 24 24" class="category-placeholder-icon" aria-hidden="true">
          <path d="M12 2C9.24 2 7 4.24 7 7c0 .73.16 1.41.44 2.03C5.03 9.8 3.5 12.2 3.5 15c0 3.87 3.13 7 7 7h3c3.87 0 7-3.13 7-7 0-2.8-1.53-5.2-3.94-5.97.28-.62.44-1.3.44-2.03 0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3 0 .42-.09.81-.25 1.17l-.37.83.89.2C16.84 9.54 18 11.13 18 13c0 2.76-2.24 5-5 5h-2c-2.76 0-5-2.24-5-5 0-1.87 1.16-3.46 2.73-3.8l.89-.2-.37-.83C9.09 7.81 9 7.42 9 7c0-1.66 1.34-3 3-3z"/>
        </svg>
      `
    },
    {
      id: 'cuisines',
      name: 'CUISINES',
      displayName: 'CUISINES',
      tagline: 'Pastas, wraps, steaks & club sandwiches',
      assetPath: 'menu items/',
      coverImage: 'menu items/baked pasta.jpeg',
      iconSvg: `
        <svg viewBox="0 0 24 24" class="category-placeholder-icon" aria-hidden="true">
          <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.48l.96-7.85c.15-1.22-.8-2.31-2.02-2.31h-1.87V9.5c0-.83-.67-1.5-1.5-1.5H7.08c-.83 0-1.5.67-1.5 1.5v1.85H3.71c-1.22 0-2.17 1.09-2.02 2.31l.96 7.85c.1.84.79 1.48 1.63 1.48h1.66c.85 0 1.54-.65 1.63-1.5l.5-4.85h7.86l.5 4.85c.09.85.78 1.5 1.63 1.5zM12 2C8.13 2 5 5.13 5 9h14c0-3.87-3.13-7-7-7z"/>
        </svg>
      `
    },
    {
      id: 'main-course',
      name: 'MAIN COURSE',
      displayName: 'MAIN COURSE',
      tagline: 'Karahi, handi, biryani & Chinese specials',
      assetPath: 'menu items/',
      coverImage: 'menu items/Chicken karahi.jpeg',
      iconSvg: `
        <svg viewBox="0 0 24 24" class="category-placeholder-icon" aria-hidden="true">
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
        </svg>
      `
    },
    {
      id: 'sides',
      name: 'SIDE ORDERS',
      displayName: 'SIDE ORDERS',
      tagline: 'Fries, salads, momos & appetizers',
      assetPath: 'menu items/',
      coverImage: 'menu items/loaded fries.jpeg',
      iconSvg: `
        <svg viewBox="0 0 24 24" class="category-placeholder-icon" aria-hidden="true">
          <path d="M12 3C7.03 3 3 7.03 3 12c0 3.32 1.8 6.22 4.47 7.78L6 21h12l-1.47-1.22C19.2 18.22 21 15.32 21 12c0-4.97-4.03-9-9-9zm0 2c3.87 0 7 3.13 7 7 0 2.38-1.19 4.47-3 5.74V16H8v1.74c-1.81-1.27-3-3.36-3-5.74 0-3.87 3.13-7 7-7z"/>
        </svg>
      `
    }
  ],

  // ========================================================================
  // MENU PRODUCTS (Organized by Category ID with Real Menu Items & Images)
  // ========================================================================
  products: {
    'desserts': [
      {
        id: 'des-01',
        name: 'Donuts',
        description: 'Flavours: Plain donut (Rs. 250), Chocolate donut (Rs. 300), Glaze donut (Rs. 250).',
        price: 'From Rs. 250',
        image: 'menu items/donuts.jpeg',
        badge: 'Popular'
      },
      {
        id: 'des-02',
        name: 'Cupcakes',
        description: 'Flavours: Vanilla cupcake (Rs. 200), Chocolate cupcake (Rs. 250), Red velvet cupcake (Rs. 250).',
        price: 'From Rs. 200',
        image: 'menu items/cup cakes.jpeg',
        badge: 'Bestseller'
      },
      {
        id: 'des-03',
        name: 'Brownies',
        description: 'Rich, fudgy homemade chocolate brownies baked fresh with premium cocoa.',
        price: 'Rs. 250',
        image: 'menu items/brownies.jpeg',
        badge: 'Fudgy'
      },
      {
        id: 'des-04',
        name: 'Bento Cake',
        description: 'Custom handcrafted mini celebration bento cake made specially for you.',
        price: 'Varies on order',
        image: 'menu items/bento cake.jpeg',
        badge: 'Custom Order'
      },
      {
        id: 'des-05',
        name: 'Cookies',
        description: 'Flavours: Chocolate chip cookie (Rs. 350), Plain cookie (Rs. 300).',
        price: 'From Rs. 300',
        image: 'menu items/cookies.jpeg',
        badge: 'Crunchy'
      },
      {
        id: 'des-06',
        name: 'Marble Cake',
        description: 'Tender vanilla & rich chocolate swirl cake loaf, baked to perfection.',
        price: 'Rs. 600',
        image: 'menu items/marbel cake.jpeg',
        badge: 'Signature'
      },
      {
        id: 'des-07',
        name: 'Banana Bread',
        description: 'Moist homemade banana bread loaf baked fresh daily with pure love.',
        price: 'Rs. 600',
        image: 'menu items/banana bread.jpeg',
        badge: 'Fresh Baked'
      }
    ],

    'cuisines': [
      {
        id: 'cui-01',
        name: 'Pasta (Red Sauce Pasta)',
        description: 'Classic homemade pasta tossed in our seasoned rich tomato herb sauce.',
        price: 'Rs. 500',
        image: 'menu items/red sauce pasta.jpeg',
        badge: 'Classic'
      },
      {
        id: 'cui-02',
        name: 'White Sauce Pasta',
        description: 'Silky creamy Alfredo sauce pasta with garlic, herbs, and tender chicken.',
        price: 'Rs. 550',
        image: 'menu items/white sauce pasta.jpeg',
        badge: 'Creamy'
      },
      {
        id: 'cui-03',
        name: 'Baked Pasta',
        description: 'Oven-baked macaroni layered with rich melted cheese and herbs.',
        price: 'Rs. 650',
        image: 'menu items/baked pasta.jpeg',
        badge: 'Cheesy Bestseller'
      },
      {
        id: 'cui-04',
        name: 'Steak with White Sauce',
        description: 'Juicy grilled chicken steak served with signature creamy mushroom/white sauce.',
        price: 'Rs. 850',
        image: 'menu items/steak with white sauce.jpeg',
        badge: 'Chef Special'
      },
      {
        id: 'cui-05',
        name: 'Nugget Wrap',
        description: 'Crisp golden chicken nuggets wrapped in soft flatbread with secret sauces.',
        price: 'Rs. 300',
        image: 'menu items/Nugget wrap.jpeg',
        badge: 'Quick Bite'
      },
      {
        id: 'cui-06',
        name: 'Signature Wrap',
        description: 'Loaded homemade signature wrap packed with seasoned chicken and fresh fillings.',
        price: 'Rs. 450',
        image: 'menu items/Signature wrap.jpeg',
        badge: 'Signature'
      },
      {
        id: 'cui-07',
        name: 'Chicken Tortilla Wrap',
        description: 'Tender spiced chicken tossed with crisp lettuce and dressing in toasted tortilla.',
        price: 'Rs. 450',
        image: 'menu items/chicken tortila wrap.jpeg',
        badge: 'Toasted'
      },
      {
        id: 'cui-08',
        name: 'Mini Pizza',
        description: 'Handmade mini pizza with rich tomato sauce, chicken, and melted mozzarella.',
        price: 'Rs. 500',
        image: 'menu items/Mini Pizza.jpeg',
        badge: 'Cheesy'
      },
      {
        id: 'cui-09',
        name: 'Club Sandwiches',
        description: 'Triple-decker toasted sandwich with tender chicken, egg, and fresh veggies.',
        price: 'Rs. 500',
        image: 'menu items/Club sandwitches.jpeg',
        badge: 'Classic Club'
      }
    ],

    'main-course': [
      {
        id: 'main-01',
        name: 'Chicken Karahi',
        description: 'Traditional slow-simmered chicken karahi with fresh ginger, coriander & spices.',
        price: 'Charges vary on order',
        image: 'menu items/Chicken karahi.jpeg',
        badge: 'Desi Classic'
      },
      {
        id: 'main-02',
        name: 'Boneless Chicken Cheese Handi',
        description: 'Melt-in-your-mouth boneless chicken handi infused with molten cheese.',
        price: 'Charges vary on order',
        image: 'menu items/Bonless chicken cheese handi.jpeg',
        badge: 'Speciality'
      },
      {
        id: 'main-03',
        name: 'White Chicken Karahi',
        description: 'Creamy white karahi cooked with white pepper, yogurt, and aromatic spices.',
        price: 'Charges vary on order',
        image: 'menu items/white chicken karahi.jpeg',
        badge: 'Rich Gravy'
      },
      {
        id: 'main-04',
        name: 'Creamy Cheese Karahi',
        description: 'Signature rich karahi blended with fresh cream, melted cheese, and herbs.',
        price: 'Charges vary on order',
        image: 'menu items/caremy cheese karahi.jpeg',
        badge: 'Chef Choice'
      },
      {
        id: 'main-05',
        name: 'Chicken Biryani',
        description: 'Fragrant basmati rice layered with spiced chicken, saffron, and fried onions.',
        price: 'Charges vary on order',
        image: 'menu items/Chicken biryani.jpeg',
        badge: 'Lahori Biryani'
      },
      {
        id: 'main-06',
        name: 'Crispy Chicken Rice',
        description: 'Seasoned savory rice topped with golden crispy fried chicken strips and sauce.',
        price: 'Charges vary on order',
        image: 'menu items/crispy chicken rice.jpeg',
        badge: 'Crunchy'
      },
      {
        id: 'main-07',
        name: 'Egg Fried Rice',
        description: 'Wok-tossed aromatic rice with scrambled eggs, scallions, and soy seasonings.',
        price: 'Charges vary on order',
        image: 'menu items/egg fried rice.jpeg',
        badge: 'Classic'
      },
      {
        id: 'main-08',
        name: 'Chicken Manchurian',
        description: 'Tender chicken in sweet, tangy & zesty Indo-Chinese Manchurian sauce.',
        price: 'Charges vary on order',
        image: 'menu items/chicken maunchurin.jpeg',
        badge: 'Indo-Chinese'
      }
    ],

    'sides': [
      {
        id: 'side-01',
        name: 'Plain Fries',
        description: 'Golden, crispy salted potato fries made fresh on order.',
        price: 'Rs. 200',
        image: 'menu items/plain fries.jpeg',
        badge: 'Crispy'
      },
      {
        id: 'side-02',
        name: 'Loaded Fries',
        description: 'Crisp fries smothered in molten cheese, seasoned chicken, and special sauces.',
        price: 'Rs. 600',
        image: 'menu items/loaded fries.jpeg',
        badge: 'Loaded'
      },
      {
        id: 'side-03',
        name: 'Mayo Fries',
        description: 'Crispy fries drizzled with our signature seasoned garlic mayo blend.',
        price: 'Rs. 450',
        image: 'menu items/Mayo fries.jpeg',
        badge: 'Creamy'
      },
      {
        id: 'side-04',
        name: 'Signature Fries',
        description: 'House special seasoned fries with proprietary spice mix and double dipping sauce.',
        price: 'Rs. 650',
        image: 'menu items/signature fries.jpeg',
        badge: 'House Special'
      },
      {
        id: 'side-05',
        name: 'Fruit Salad',
        description: 'Freshly cut seasonal fruits tossed in light, refreshing sweet dressing.',
        price: 'Rs. 400',
        image: 'menu items/fruit salad.jpeg',
        badge: 'Fresh & Healthy'
      },
      {
        id: 'side-06',
        name: 'Russian Salad',
        description: 'Classic creamy Russian salad with diced potatoes, apples, peas, and rich dressing.',
        price: 'Rs. 500',
        image: 'menu items/russian salad.jpeg',
        badge: 'Creamy Classic'
      },
      {
        id: 'side-07',
        name: 'Momos (4 pcs)',
        description: 'Steamed homemade dumplings filled with seasoned juicy chicken and spicy dip.',
        price: 'Rs. 450 (4pc)',
        image: 'menu items/momos.jpeg',
        badge: 'Steamed Fresh'
      }
    ]
  },

  // ========================================================================
  // CUSTOMER REVIEWS (Genuine WhatsApp Feedback & Screenshots)
  // ========================================================================
  reviews: [
    {
      id: 'rev-01',
      customerName: 'Cupcake Review',
      location: 'Lahore',
      maskedPhone: 'WhatsApp Order',
      orderTag: 'Cupcakes Special',
      screenshot: 'pics of reviews and gallery/cupcake review.jpeg',
      fallbackText: 'The cupcakes were really good! Fresh, soft and not too sweet. Loved how cute they looked and specially the little detail.. honestly they were Soo good 🌸 Definitely recommended ❤️',
      avatarLetter: '🧁'
    },
    {
      id: 'rev-02',
      customerName: 'Customer Feedback',
      location: 'Lahore',
      maskedPhone: 'WhatsApp Order',
      orderTag: 'Sandwiches & Homemade Dip',
      screenshot: 'pics of reviews and gallery/revieww.jpeg',
      fallbackText: 'Loved the sandwiches! They were fresh, soft, and packed with flavor. The sauce was absolutely delicious and paired perfectly with the sandwiches. Highly recommended—will definitely order again! 🥪❤️',
      avatarLetter: '★'
    },
    {
      id: 'rev-03',
      customerName: 'Daz Review',
      location: 'Lahore',
      maskedPhone: 'WhatsApp Order',
      orderTag: 'Pasta & Momos Special',
      screenshot: 'pics of reviews and gallery/hudas review.jpeg',
      fallbackText: 'Food was 10/10! So fresh and flavorful. Thank you for the amazing meal. Keep up the great work! 🌸',
      avatarLetter: 'D'
    },
    {
      id: 'rev-04',
      customerName: 'Customer Feedback',
      location: 'Lahore',
      maskedPhone: 'WhatsApp Order',
      orderTag: 'Special Deals & Savouries',
      screenshot: 'pics of reviews and gallery/reviewww.jpeg',
      fallbackText: 'JazakAllah! Sb buht hi zabardast aur mazedar tha Har cheez bilkul fresh aur hygienic thi, packaging bhi buht saf-suthri thi Sandwiches, nuggets aur momos sab ka taste ek dum perfect tha! InshaAllah dbra zaroor order krungi apsy 🌸 Highly recommended frm my side! ⭐⭐⭐⭐⭐',
      avatarLetter: '★'
    }
  ],

  // Helper method to generate WhatsApp URL dynamically
  getWhatsAppOrderUrl: function(itemName, type = 'product') {
    const cleanNumber = this.whatsapp.phoneNumber.replace(/[^0-9]/g, '');
    let msg = '';
    
    if (type === 'deal') {
      msg = `Hi EJ's Kitchen, I'd like to order the special deal: ${itemName}.`;
    } else if (type === 'general') {
      msg = `Hi EJ's Kitchen! I would love to place an order from your homemade menu.`;
    } else {
      msg = `Hi EJ's Kitchen, I'd like to order ${itemName}.`;
    }

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
  }
};
