document.addEventListener('DOMContentLoaded', () => {
    // ===== Mobile Menu Toggle =====
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    const iconMenu = document.getElementById('menu-icon');
    const iconClose = document.getElementById('close-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        iconMenu.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            iconMenu.classList.remove('hidden');
            iconClose.classList.add('hidden');
        });
    });

    // ===== Fade-up Scroll Animations =====
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // ===== Reviews Carousel (Infinite Smooth Scroll) =====
    const track = document.getElementById('reviewTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (track) {
        let position = 0;
        let cardWidth = 0;
        let totalWidth = 0;
        let isTransitioning = false;
        let autoPlayInterval = null;
        const speed = 3.2; // Pixels per frame — smooth and steady

        // Calculate card dimensions
        function calculateDimensions() {
            const firstCard = track.querySelector('.review-card');
            if (!firstCard) return;
            
            const gap = 24; // 1.5rem gap
            const cardWidthFull = firstCard.offsetWidth + gap;
            const containerWidth = track.parentElement.offsetWidth;
            
            // How many cards per view?
            let cardsPerView = 1;
            if (window.innerWidth >= 1024) cardsPerView = 3;
            else if (window.innerWidth >= 768) cardsPerView = 2;
            
            // The visible width is containerWidth, but we want to move by cardWidthFull each time
            // Actually for smooth scroll, we move continuously
            cardWidth = cardWidthFull;
            totalWidth = track.scrollWidth / 2; // Half because we duplicated
        }

        // Move the track
        function moveTrack() {
            if (isTransitioning) return;
            
            position += speed;
            
            // When we've scrolled past one full set, reset without jumping
            if (position >= totalWidth) {
                position = 0;
                track.style.transition = 'none';
                track.style.transform = `translateX(0px)`;
                // Force reflow
                void track.offsetHeight;
                track.style.transition = 'transform 1000ms linear';
            }
            
            track.style.transform = `translateX(-${position}px)`;
        }

        // Start auto-play
        function startAutoPlay() {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(moveTrack, 30); // ~33fps smooth scroll
        }

        // Stop auto-play
        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        // Pause on hover
        const carouselContainer = document.querySelector('#reviews .relative');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoPlay);
            carouselContainer.addEventListener('mouseleave', startAutoPlay);
        }

        // Navigation buttons — jump by 1 card
        function goToPrev() {
            stopAutoPlay();
            const firstCard = track.querySelector('.review-card');
            if (!firstCard) return;
            
            const gap = 24;
            const cardWidthFull = firstCard.offsetWidth + gap;
            
            // Snap to nearest card position
            const remainder = position % cardWidthFull;
            let newPos = position - remainder - cardWidthFull;
            if (newPos < 0) newPos = totalWidth - cardWidthFull;
            
            position = newPos;
            track.style.transition = 'transform 800ms ease-in-out';
            track.style.transform = `translateX(-${position}px)`;
            
            setTimeout(() => {
                track.style.transition = 'transform 1000ms linear';
                startAutoPlay();
            }, 900);
        }

        function goToNext() {
            stopAutoPlay();
            const firstCard = track.querySelector('.review-card');
            if (!firstCard) return;
            
            const gap = 24;
            const cardWidthFull = firstCard.offsetWidth + gap;
            
            // Snap to nearest card position
            const remainder = position % cardWidthFull;
            let newPos = position - remainder + cardWidthFull;
            if (newPos >= totalWidth) newPos = 0;
            
            position = newPos;
            track.style.transition = 'transform 800ms ease-in-out';
            track.style.transform = `translateX(-${position}px)`;
            
            setTimeout(() => {
                track.style.transition = 'transform 1000ms linear';
                startAutoPlay();
            }, 900);
        }

        // Attach event listeners
        if (prevBtn) prevBtn.addEventListener('click', goToPrev);
        if (nextBtn) nextBtn.addEventListener('click', goToNext);

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                calculateDimensions();
                position = 0;
                track.style.transition = 'none';
                track.style.transform = 'translateX(0px)';
                void track.offsetHeight;
                track.style.transition = 'transform 1000ms linear';
            }, 300);
        });

        // Initialize
        setTimeout(() => {
            calculateDimensions();
            position = 0;
            track.style.transition = 'transform 1000ms linear';
            startAutoPlay();
        }, 500);
    }
});