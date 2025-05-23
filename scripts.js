// Main JavaScript for MIA Institute of Knowledge Website

// DOM Elements
const languageBtns = document.querySelectorAll('.language-btn');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const testimonialDots = document.querySelectorAll('.dot');
const testimonialBtnPrev = document.querySelector('.testimonial-btn.prev');
const testimonialBtnNext = document.querySelector('.testimonial-btn.next');
const tourHotspots = document.querySelectorAll('.tour-hotspot');
const backToTopBtn = document.getElementById('back-to-top');

// Navbar translations
const navTranslations = {
    en: {
        home: "Home",
        about: "About Us",
        academics: "Academics",
        admissions: "Admissions",
        studentLife: "Student Life",
        parents: "Parents",
        contact: "Contact",
        donate: "Donate"
    },
    fr: {
        home: "Accueil",
        about: "À Propos",
        academics: "Académique",
        admissions: "Admissions",
        studentLife: "Vie Étudiante",
        parents: "Parents",
        contact: "Contact",
        donate: "Faire un Don"
    },
    ar: {
        home: "الرئيسية",
        about: "من نحن",
        academics: "الأكاديمية",
        admissions: "القبول",
        studentLife: "حياة الطلاب",
        parents: "الآباء",
        contact: "اتصل بنا",
        donate: "تبرع"
    }
};

// Language Switcher
function changeLanguage(lang) {
    // Update active button
    languageBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === lang.toUpperCase()) {
            btn.classList.add('active');
        }
    });

    // Hide all language elements
    document.querySelectorAll('.en, .fr, .ar').forEach(el => {
        el.style.display = 'none';
    });

    // Show selected language elements
    document.querySelectorAll('.' + lang).forEach(el => {
        el.style.display = '';
    });

    // Update navigation text
    updateNavigation(lang);

    // Handle RTL for Arabic
    if (lang === 'ar') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }

    // Store language preference
    localStorage.setItem('miaLanguage', lang);
}

// Update navigation text based on selected language
function updateNavigation(lang) {
    // Update desktop navigation
    const navLinks = document.querySelectorAll('.nav-links li a');
    navLinks.forEach(link => {
        if (link.classList.contains('nav-link')) {
            if (link.textContent.includes('Home') || link.href.includes('index.html')) {
                link.textContent = navTranslations[lang].home;
            } else if (link.textContent.includes('About') || link.href.includes('about.html')) {
                link.textContent = navTranslations[lang].about;
            } else if (link.textContent.includes('Academics') || link.href.includes('academics.html')) {
                link.textContent = navTranslations[lang].academics;
            } else if (link.textContent.includes('Admissions') || link.href.includes('admissions.html')) {
                link.textContent = navTranslations[lang].admissions;
            } else if (link.textContent.includes('Student') || link.href.includes('student-life.html')) {
                link.textContent = navTranslations[lang].studentLife;
            } else if (link.textContent.includes('Parents') || link.href.includes('parents.html')) {
                link.textContent = navTranslations[lang].parents;
            } else if (link.textContent.includes('Contact') || link.href.includes('contact.html')) {
                link.textContent = navTranslations[lang].contact;
            }
        } else if (link.classList.contains('donate-btn')) {
            link.textContent = navTranslations[lang].donate;
        }
    });

    // Update mobile navigation
    const mobileLinks = document.querySelectorAll('.mobile-nav-links li a');
    mobileLinks.forEach(link => {
        if (link.href.includes('index.html')) {
            link.textContent = navTranslations[lang].home;
        } else if (link.href.includes('about.html')) {
            link.textContent = navTranslations[lang].about;
        } else if (link.href.includes('academics.html')) {
            link.textContent = navTranslations[lang].academics;
        } else if (link.href.includes('admissions.html')) {
            link.textContent = navTranslations[lang].admissions;
        } else if (link.href.includes('student-life.html')) {
            link.textContent = navTranslations[lang].studentLife;
        } else if (link.href.includes('parents.html')) {
            link.textContent = navTranslations[lang].parents;
        } else if (link.href.includes('contact.html')) {
            link.textContent = navTranslations[lang].contact;
        } else if (link.classList.contains('donate')) {
            link.textContent = navTranslations[lang].donate;
        }
    });
}

// Initialize language from localStorage or default to English
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('miaLanguage') || 'en';
    changeLanguage(savedLanguage);
    
    // Ensure mobile menu is properly initialized
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
});

// Add click event to language buttons
languageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.textContent.toLowerCase();
        changeLanguage(lang);
    });
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    if (mobileNav) {
        mobileNav.classList.toggle('active');
        
        // Toggle between menu and close icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
}

// Ensure mobile menu button has event listener
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Testimonial Slider
let currentTestimonial = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');

function showTestimonial(index) {
    // Hide all testimonials
    testimonialSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Update dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show selected testimonial and activate dot
    if (testimonialSlides[index]) {
        testimonialSlides[index].classList.add('active');
    }
    
    if (testimonialDots[index]) {
        testimonialDots[index].classList.add('active');
    }
    
    // Update current index
    currentTestimonial = index;
}

// Add click events to testimonial navigation
if (testimonialBtnPrev) {
    testimonialBtnPrev.addEventListener('click', () => {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) {
            newIndex = testimonialSlides.length - 1;
        }
        showTestimonial(newIndex);
    });
}

if (testimonialBtnNext) {
    testimonialBtnNext.addEventListener('click', () => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonialSlides.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    });
}

// Add click events to testimonial dots
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto-rotate testimonials
if (testimonialSlides.length > 0) {
    setInterval(() => {
        if (document.hasFocus()) {
            let newIndex = currentTestimonial + 1;
            if (newIndex >= testimonialSlides.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        }
    }, 8000);
}

// Virtual Tour Hotspots
tourHotspots.forEach(hotspot => {
    hotspot.addEventListener('click', () => {
        const area = hotspot.getAttribute('data-area');
        
        // Hide all area info
        document.querySelectorAll('.tour-area-info').forEach(info => {
            info.style.display = 'none';
        });
        
        // Show selected area info
        const areaInfo = document.getElementById(`${area}-info`);
        if (areaInfo) {
            areaInfo.style.display = 'block';
        }
    });
});

// Back to Top Button
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-title, .about-image, .program-card, .news-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animation on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Set initial styles for animated elements
    const elements = document.querySelectorAll('.section-title, .about-image, .program-card, .news-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation check on load
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
});

// Form Validation
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        // Simple validation
        if (emailInput.value.trim() === '') {
            alert('Please enter your email address.');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
    });
}
