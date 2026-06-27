document.addEventListener('DOMContentLoaded', () => {
    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 1800);
        });
    }

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===== MOBILE MENU TOGGLE =====
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    const iconMenu = document.getElementById('menu-icon');
    const iconClose = document.getElementById('close-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (btn) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            iconMenu.classList.toggle('hidden');
            iconClose.classList.toggle('hidden');
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            iconMenu.classList.remove('hidden');
            iconClose.classList.add('hidden');
        });
    });

    // ===== SCROLL REVEAL ANIMATIONS =====
    const observerOptions = { 
        root: null, 
        rootMargin: '0px 0px -80px 0px', 
        threshold: 0.1 
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
    });

    // ===== PARALLAX EFFECT =====
    const parallaxElements = document.querySelectorAll('.parallax-slow');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.3;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== REVIEWS CAROUSEL (Infinite Smooth Scroll) =====
    const track = document.getElementById('reviewTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (track) {
        let position = 0;
        let cardWidth = 0;
        let totalWidth = 0;
        let autoPlayInterval = null;
        const speed = 1.2;

        function calculateDimensions() {
            const firstCard = track.querySelector('.review-card');
            if (!firstCard) return;

            const gap = 24;
            const cardWidthFull = firstCard.offsetWidth + gap;
            totalWidth = track.scrollWidth / 2;
            cardWidth = cardWidthFull;
        }

        function moveTrack() {
            position += speed;

            if (position >= totalWidth) {
                position = 0;
                track.style.transition = 'none';
                track.style.transform = `translateX(0px)`;
                void track.offsetHeight;
                track.style.transition = 'transform 1000ms linear';
            }

            track.style.transform = `translateX(-${position}px)`;
        }

        function startAutoPlay() {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(moveTrack, 30);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        const carouselContainer = document.querySelector('#reviews .relative');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoPlay);
            carouselContainer.addEventListener('mouseleave', startAutoPlay);
        }

        function goToPrev() {
            stopAutoPlay();
            const firstCard = track.querySelector('.review-card');
            if (!firstCard) return;

            const gap = 24;
            const cardWidthFull = firstCard.offsetWidth + gap;
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

        if (prevBtn) prevBtn.addEventListener('click', goToPrev);
        if (nextBtn) nextBtn.addEventListener('click', goToNext);

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

        setTimeout(() => {
            calculateDimensions();
            position = 0;
            track.style.transition = 'transform 1000ms linear';
            startAutoPlay();
        }, 500);
    }

    // ===== GALLERY FILTERING =====
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            galleryItems.forEach(item => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // ===== LIGHTBOX =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxCaption = document.getElementById('lightboxCaption');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h4')?.textContent || '';

            if (lightboxImg && img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                if (lightboxCaption) lightboxCaption.textContent = title;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===== MENU ITEM INTERACTION =====
    document.querySelectorAll('.menu-item-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.96)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // ===== NAVBAR ACTIVE STATE =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-tm-red');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('text-tm-red');
            }
        });
    });

    // ===== COUNTER ANIMATION (for stats if present) =====
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ===== MAGNETIC BUTTON EFFECT (desktop only) =====
    if (window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.btn-magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ===== TEXT SCRAMBLE EFFECT (for hero subtitle) =====
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }

        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }

        update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="text-tm-red">${char}</span>`;
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }

        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    const scrambleEl = document.querySelector('.scramble-text');
    if (scrambleEl) {
        const fx = new TextScramble(scrambleEl);
        const phrases = [
            'Authentic Vietnamese flavours',
            'Soul-warming Phở',
            'Fresh Summer Rolls',
            'A little slice of Hanoi'
        ];
        let counter = 0;
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 2500);
            });
            counter = (counter + 1) % phrases.length;
        };
        setTimeout(next, 2000);
    }
});
