// lightGallery — one instance per gallery slot (single image, no carousel)
document.querySelectorAll('.photo-slot').forEach(slot => {
    lightGallery(slot, {
        selector:        '.lg-item',
        download:        false,
        counter:         false,
        closable:        true,
        backdropDuration: 200,
    });
});

// lightGallery — giving back feature photo
const givingFeature = document.getElementById('giving-feature');
if (givingFeature) {
    lightGallery(givingFeature, {
        selector:         '.lg-item',
        download:         false,
        counter:          false,
        closable:         true,
        backdropDuration: 200,
    });
}

// Nav solidifies on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('solid', window.scrollY > 60);
}, { passive: true });

// Mobile menu
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const open = mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// Photo carousel component — works for any number of carousels on the page
document.querySelectorAll('.photo-carousel').forEach(carousel => {
    const wrap = carousel.closest('.photo-carousel-wrap');
    if (wrap) {
        wrap.querySelector('.carousel-btn.prev')?.addEventListener('click', () => {
            carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
        });
        wrap.querySelector('.carousel-btn.next')?.addEventListener('click', () => {
            carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
        });
    }
    lightGallery(carousel, {
        selector:        '.lg-item',
        download:        false,
        counter:         true,
        closable:        true,
        backdropDuration: 200,
    });
});


// Scroll-reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = [...entry.target.parentElement.querySelectorAll(':scope > .reveal')];
        const idx = Math.max(0, siblings.indexOf(entry.target));
        setTimeout(() => entry.target.classList.add('visible'), idx * 95);
        observer.unobserve(entry.target);
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
