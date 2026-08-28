/* ==========================================================
   main.js
   Global Site Behaviour
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       Sticky Header
    =========================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader);


    /* ===========================
       Mobile Nav Toggle
    =========================== */

    const navToggle = document.getElementById("navToggle");
    const siteNav = document.getElementById("siteNav");

    if (navToggle && siteNav) {

        navToggle.addEventListener("click", () => {

            const isOpen = siteNav.classList.toggle("open");
            navToggle.classList.toggle("open", isOpen);
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            document.body.classList.toggle("nav-locked", isOpen);

        });

        siteNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                siteNav.classList.remove("open");
                navToggle.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("nav-locked");
            });
        });

    }


    /* ===========================
       Active Navigation
    =========================== */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".site-header nav a").forEach(link => {

        if (link.getAttribute("href") === currentPage) {

            link.classList.add("active");

        }

    });


    /* ===========================
       Smooth Scroll
    =========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target =
                document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });


    /* ===========================
       Animated Counters
    =========================== */

    const counters =
        document.querySelectorAll("[data-counter]");

    function animateCounter(counter) {

        const target =
            parseInt(counter.dataset.counter);

        let current = 0;

        const increment =
            Math.max(1, Math.ceil(target / 60));

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {

                current = target;

                clearInterval(timer);

            }

            counter.textContent = current;

        }, 20);

    }

    if (counters.length > 0) {

        const observer =
            new IntersectionObserver((entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        observer.unobserve(entry.target);

                    }

                });

            }, {

                threshold: 0.5

            });

        counters.forEach(counter => {

            observer.observe(counter);

        });

    }


    /* ===========================
       Theme Toggle (Optional)
    =========================== */

    const themeToggle =
        document.getElementById("themeToggle");

    if (themeToggle) {

        const savedTheme =
            localStorage.getItem("theme");

        if (savedTheme === "light") {

            document.body.classList.add("light-theme");

        }

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("light-theme");

            const theme =
                document.body.classList.contains("light-theme")
                    ? "light"
                    : "dark";

            localStorage.setItem("theme", theme);

        });

    }

});