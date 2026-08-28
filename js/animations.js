/* ==========================================================
   animations.js
   Scroll Animations
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       Elements to Animate
    ====================================== */

    const animatedElements = document.querySelectorAll(

        ".hero-content,\
        .hero-dashboard,\
        .project-card,\
        .glass-card,\
        .card,\
        .timeline-item,\
        .certificate-card,\
        .future-card,\
        .roadmap-item,\
        .metric,\
        .kpi,\
        .insight-card"

    );

    /* ======================================
       Reveal Observer
    ====================================== */

    const revealObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("fade-up");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    animatedElements.forEach((element) => {

        revealObserver.observe(element);

    });

    /* ======================================
       Stagger Project Cards
    ====================================== */

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card, index) => {

        card.style.animationDelay = `${index * 0.15}s`;

    });

    /* ======================================
       Floating Dashboard
    ====================================== */

    const dashboard = document.querySelector(".dashboard");

    if (dashboard) {

        dashboard.classList.add("float");

    }

    /* ======================================
       Hero Parallax
    ====================================== */

    const hero = document.querySelector(".hero");

    if (hero) {

        window.addEventListener("scroll", () => {

            const offset = window.scrollY;

            hero.style.backgroundPositionY = `${offset * 0.25}px`;

        });

    }

    /* ======================================
       Mouse Tilt Effect
    ====================================== */

    const tiltCards = document.querySelectorAll(

        ".project-card, .glass-card"

    );

    tiltCards.forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 10;

            const rotateX = ((rect.height / 2 - y) / rect.height) * 10;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-6px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

    /* ======================================
       Active Section Highlight
    ====================================== */

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll(".site-header nav a");

    const sectionObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const id = entry.target.getAttribute("id");

                if (!id) return;

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (link.getAttribute("href") === "#" + id) {

                        link.classList.add("active");

                    }

                });

            });

        },

        {
            threshold: 0.4
        }

    );

    sections.forEach(section => {

        sectionObserver.observe(section);

    });

});