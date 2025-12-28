// ===================================
// Wedding Officiant Landing Page
// Interactive Features
// ===================================

// ===== SMOOTH SCROLL & NAVIGATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ===== TESTIMONIALS CAROUSEL =====
const testimonials = [
    {
        quote: "אתה הבחירה הכי טובה שעשינו לחתונה. מהשיחה הראשונה עד החיבוק האחרון - ליווית אותנו בהקשבה ובסבלנות, ובנית טקס שממחיש את מי שאנחנו כזוגות. יצרת לנו רגעים קסומים שלא נשכח אף פעם.",
        author: "זוהר ודן",
        date: "2024"
    },
    {
        quote: "הרגישות והאכפתיות שלך היא זו שמנצחת. לקחת את הסיפור האישי שלנו והפכת אותו לכזה שכולם התחברו אליו. נתת לאהבה שלנו מקום, שיתפת אותנו בכל ניואנס, הכל כדי שנהיה רגועות ומרוצות. פשוט תודה עליך!",
        author: "שיר ועדי",
        date: "2024"
    },
    {
        quote: "התהליך היה מדהים עם כל ההקשבה והסבלנות. החופה הייתה הרגע היפה והמדויק בחיי. הצלחת לשלב מסורת ומודרניות בצורה מושלמת, כמו שחיפשנו בדיוק.",
        author: "לירז וצליל",
        date: "2024"
    },
    {
        quote: "החופה הכי טובה שיכולנו לבקש! היית קשוב, מוכן לעזור תמיד והפכת את זה למושלם. ידעת במקצועיות לבחור את המילים הנכונות והמרגשות שהפכו את החופה למושלמת. אין אחד שלא בכה.",
        author: "חגי וגיא",
        date: "2024"
    },
    {
        quote: "לא נתקלנו באנשים כמוך! הרגשת והרגש שלך היו מלאים, לא עזבת אותנו לרגע. ריגשת את כולם ובמיוחד אותנו. אתה פשוט אדם מלאך, לב טוב, כל כך הרבה רגש.",
        author: "עידן ואלמוג",
        date: "2024"
    },
    {
        quote: "עשית לנו את הרגע הכי מרגש בחיים והפכת אותו לוואו! לא מפסיקים להחמיא ולהגיד שהחופה הייתה מדהימה. כולם מדברים על זה עד היום.",
        author: "אור ונעמה",
        date: "2024"
    }
];

let currentTestimonial = 0;

function updateTestimonial(index) {
    const quote = document.getElementById('testimonialQuote');
    const author = document.getElementById('testimonialAuthor');
    const dots = document.querySelectorAll('.testimonial-dot');

    // Fade out
    quote.style.opacity = '0';
    author.style.opacity = '0';

    setTimeout(() => {
        quote.textContent = `"${testimonials[index].quote}"`;
        author.textContent = testimonials[index].author;

        // Update active dot
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Fade in
        quote.style.opacity = '1';
        author.style.opacity = '1';
    }, 300);
}

function initTestimonials() {
    const navContainer = document.getElementById('testimonialNav');

    // Create navigation dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            updateTestimonial(index);
        });
        navContainer.appendChild(dot);
    });

    // Set initial testimonial
    updateTestimonial(0);

    // Add transition styles
    const testimonialQuote = document.getElementById('testimonialQuote');
    const testimonialAuthor = document.getElementById('testimonialAuthor');

    [testimonialQuote, testimonialAuthor].forEach(el => {
        el.style.transition = 'opacity 0.3s ease';
    });

    // Auto-rotate testimonials every 6 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial(currentTestimonial);
    }, 6000);
}

// Initialize testimonials when DOM is ready
document.addEventListener('DOMContentLoaded', initTestimonials);

// ===== CONTACT FORM HANDLING =====
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            weddingDate: document.getElementById('weddingDate').value,
            message: document.getElementById('message').value
        };

        // Show loading state
        const submitButton = contactForm.querySelector('.form-submit');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'שולח...';
        submitButton.disabled = true;

        // Submit to Netlify via Fetch
        try {
            const formDataObj = new FormData(contactForm);

            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formDataObj).toString(),
            });

            // Success message
            submitButton.textContent = '✓ הפנייה נשלחה בהצלחה!';
            submitButton.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';

            // Reset form
            contactForm.reset();

            // Show additional success message
            showNotification('תודה! הפנייה נשלחה בהצלחה. אחזור אליכם בהקדם האפשרי.', 'success');

            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);

        } catch (error) {
            // Error handling
            submitButton.textContent = 'אופס! משהו השתבש';
            submitButton.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';

            showNotification('שגיאה בשליחת הטופס. אנא נסו שוב או צרו קשר ישירות.', 'error');

            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        }
    });
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 50%;
        transform: translateX(50%) translateY(-150%);
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-family: var(--font-body-he);
        font-weight: 500;
        transition: transform 0.3s ease;
        max-width: 90%;
        text-align: center;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(50%) translateY(0)';
    }, 10);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(50%) translateY(-150%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ===== GALLERY LIGHTBOX (OPTIONAL) =====
// This can be extended when actual images/videos are added
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // TODO: Implement lightbox functionality when media is added
            console.log('Gallery item clicked');
        });
    });
});

// ===== LAZY LOADING FOR VIDEOS =====
// This will be useful when videos are added
function lazyLoadVideos() {
    const videos = document.querySelectorAll('video[data-src]');

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.src = video.dataset.src;
                video.load();
                videoObserver.unobserve(video);
            }
        });
    });

    videos.forEach(video => {
        videoObserver.observe(video);
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('DOMContentLoaded', () => {
    // Add keyboard navigation for testimonial carousel
    document.addEventListener('keydown', (e) => {
        const testimonialCard = document.getElementById('testimonialCard');
        if (document.activeElement === testimonialCard ||
            testimonialCard.contains(document.activeElement)) {

            if (e.key === 'ArrowLeft') {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                updateTestimonial(currentTestimonial);
            } else if (e.key === 'ArrowRight') {
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                updateTestimonial(currentTestimonial);
            }
        }
    });

    // Make testimonial card focusable
    const testimonialCard = document.getElementById('testimonialCard');
    testimonialCard.setAttribute('tabindex', '0');
    testimonialCard.setAttribute('role', 'region');
    testimonialCard.setAttribute('aria-label', 'המלצות זוגות');
});

// ===== GALLERY CAROUSEL =====
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.carousel-slide').length;

function initGalleryCarousel() {
    const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');

    if (!track || slides.length === 0) return;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `תמונה ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Navigation functions
    function goToSlide(index) {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        document.querySelectorAll('.carousel-dot')[currentSlide].classList.remove('active');

        // Update current index
        currentSlide = index;

        // Add active class to new slide
        slides[currentSlide].classList.add('active');
        document.querySelectorAll('.carousel-dot')[currentSlide].classList.add('active');
    }

    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        goToSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(prev);
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') prevSlide();
        if (e.key === 'ArrowLeft') nextSlide();
    });

    // Auto-play (optional - 5 seconds)
    setInterval(nextSlide, 5000);

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', initGalleryCarousel);

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c🎩 הנחיית חופות - החופה שלכם, הסיפור שלכם', 'font-size: 20px; font-weight: bold; color: #d4a373;');
console.log('%cBuilt with ❤️ for unforgettable wedding ceremonies', 'font-size: 12px; color: #1a365d;');
