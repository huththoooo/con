document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Hero Slideshow
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Art Gallery Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Sample art data
    const artData = [
        {
            id: 1,
            title: "Sunset Over Mountains",
            artist: "Emma Johnson",
            price: 1200,
            category: "painting",
            image: "https://source.unsplash.com/random/600x800/?painting,abstract,1",
            description: "A beautiful abstract representation of a mountain sunset using vibrant colors and bold strokes.",
            size: "24 x 36 in",
            year: "2022",
            medium: "Oil on canvas"
        },
        {
            id: 2,
            title: "Marble Sculpture",
            artist: "Michael Chen",
            price: 4500,
            category: "sculpture",
            image: "https://source.unsplash.com/random/600x800/?sculpture,marble,1",
            description: "Elegant marble sculpture depicting human form with intricate details and smooth finish.",
            size: "18 x 12 x 8 in",
            year: "2021",
            medium: "Carrara marble"
        },
        {
            id: 3,
            title: "Urban Landscape",
            artist: "Sophia Rodriguez",
            price: 800,
            category: "photography",
            image: "https://source.unsplash.com/random/600x800/?photography,city,night,1",
            description: "Nighttime cityscape capturing the vibrant energy of urban life with long exposure techniques.",
            size: "16 x 24 in",
            year: "2023",
            medium: "Archival pigment print"
        },
        {
            id: 4,
            title: "Digital Dreams",
            artist: "David Kim",
            price: 650,
            category: "digital",
            image: "https://source.unsplash.com/random/600x800/?digital,art,futuristic,1",
            description: "Futuristic digital artwork exploring the boundaries between reality and virtual spaces.",
            size: "20 x 30 in",
            year: "2023",
            medium: "Digital print on fine art paper"
        },
        {
            id: 5,
            title: "Floral Abstraction",
            artist: "Emma Johnson",
            price: 950,
            category: "painting",
            image: "https://source.unsplash.com/random/600x800/?painting,flowers,abstract,1",
            description: "Abstract floral composition with layered textures and expressive brushwork.",
            size: "20 x 20 in",
            year: "2021",
            medium: "Acrylic on canvas"
        },
        {
            id: 6,
            title: "Bronze Figure",
            artist: "Michael Chen",
            price: 3200,
            category: "sculpture",
            image: "https://source.unsplash.com/random/600x800/?sculpture,bronze,figure,1",
            description: "Bronze sculpture of a dancing figure capturing movement and grace in solid form.",
            size: "24 x 16 x 12 in",
            year: "2020",
            medium: "Bronze with patina"
        },
        {
            id: 7,
            title: "Wildlife Portrait",
            artist: "Sophia Rodriguez",
            price: 750,
            category: "photography",
            image: "https://source.unsplash.com/random/600x800/?photography,wildlife,portrait,1",
            description: "Intimate wildlife portrait showcasing the beauty and character of the animal kingdom.",
            size: "18 x 24 in",
            year: "2022",
            medium: "Archival pigment print"
        },
        {
            id: 8,
            title: "Cyberpunk City",
            artist: "David Kim",
            price: 550,
            category: "digital",
            image: "https://source.unsplash.com/random/600x800/?digital,art,cyberpunk,1",
            description: "Neon-lit cyberpunk cityscape with futuristic architecture and atmospheric lighting.",
            size: "16 x 24 in",
            year: "2023",
            medium: "Digital print on metallic paper"
        }
    ];

    // Load art items
    function loadArtItems(filter = 'all') {
        galleryGrid.innerHTML = '';
        
        const filteredArt = filter === 'all' 
            ? artData 
            : artData.filter(item => item.category === filter);
        
        filteredArt.forEach(item => {
            const artItem = document.createElement('div');
            artItem.className = 'art-item';
            artItem.dataset.category = item.category;
            artItem.innerHTML = `
                <div class="art-img">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="art-info">
                    <h3>${item.title}</h3>
                    <p class="artist-name">by ${item.artist}</p>
                    <p class="art-price">$${item.price.toLocaleString()}</p>
                </div>
                <span class="art-category">${item.category}</span>
            `;
            
            artItem.addEventListener('click', () => openArtModal(item));
            galleryGrid.appendChild(artItem);
        });
    }
    
    // Initialize gallery
    loadArtItems();
    
    // Filter buttons event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadArtItems(button.dataset.filter);
        });
    });

    // Art Modal
    const modal = document.getElementById('artModal');
    const closeModal = document.querySelector('.close-modal');
    
    function openArtModal(art) {
        document.getElementById('modalArtImage').src = art.image;
        document.getElementById('modalArtTitle').textContent = art.title;
        document.getElementById('modalArtist').textContent = `by ${art.artist}`;
        document.getElementById('modalCategory').textContent = art.category;
        document.getElementById('modalDescription').textContent = art.description;
        document.getElementById('modalPrice').textContent = `$${art.price.toLocaleString()}`;
        document.getElementById('modalSize').textContent = art.size;
        document.getElementById('modalYear').textContent = art.year;
        document.getElementById('modalMedium').textContent = art.medium;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // Shopping Cart
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalPrice = document.querySelector('.total-price');
    const addToCartButtons = document.querySelectorAll('#addToCart');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Toggle cart sidebar
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    cartOverlay.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Add to cart
    function addToCart(art) {
        const existingItem = cart.find(item => item.id === art.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...art,
                quantity: 1
            });
        }
        
        updateCart();
        showAddToCartNotification(art.title);
    }
    
    // Update cart UI
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            totalPrice.textContent = '$0.00';
            return;
        }
        
        let total = 0;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p class="cart-item-price">$${(item.price * item.quantity).toLocaleString()}</p>
                    <p class="cart-item-quantity">Quantity: ${item.quantity}</p>
                    <p class="cart-item-remove" data-id="${item.id}">Remove</p>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });
        
        totalPrice.textContent = `$${total.toLocaleString()}`;
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                removeFromCart(id);
            });
        });
    }
    
    // Remove from cart
    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }
    
    // Add to cart button in modal
    document.getElementById('addToCart').addEventListener('click', function() {
        const title = document.getElementById('modalArtTitle').textContent;
        const art = artData.find(item => item.title === title);
        
        if (art) {
            addToCart(art);
        }
    });
    
    // Show add to cart notification
    function showAddToCartNotification(title) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <p>${title} has been added to your cart</p>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Initialize cart
    updateCart();

    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(number => {
            const target = parseInt(number.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    number.textContent = target.toLocaleString();
                } else {
                    number.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats')) {
                    animateStats();
                }
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    document.querySelectorAll('.stats, .artist-card, .art-item, .about-image').forEach(el => {
        observer.observe(el);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Notification styles (added via JavaScript to keep CSS clean)
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--primary-color);
        color: var(--white);
        padding: 15px 25px;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        z-index: 3000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .notification.show {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);