document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Ensure navbar has scrolled style when menu is open
        const navbar = document.querySelector('.navbar');
        if (navMenu.classList.contains('active')) {
            navbar.classList.add('scrolled');
        } else if (window.scrollY === 0) {
            navbar.classList.remove('scrolled');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Check top scroll when closing menu
            if (window.scrollY === 0) {
                document.querySelector('.navbar').classList.remove('scrolled');
            }
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else if (!navMenu.classList.contains('active')) {
            navbar.classList.remove('scrolled');
        }
    });

    // Run once on load to establish correct state
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // 3. Active Link Switching based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 4. Scroll Animation with Intersection Observer
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(
        entries,
        observer
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-right, .slide-left');
    
    // Quick timeout to allow initial render, then add observer
    setTimeout(() => {
        animatedElements.forEach(item => {
            appearOnScroll.observe(item);
        });
    }, 100);

    // Initial trigger for elements already in viewport (like Hero text)
    document.querySelectorAll('.hero .fade-in').forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('appear');
        }, 100 * index);
    });
});
