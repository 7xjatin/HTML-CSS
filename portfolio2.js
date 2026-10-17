
/* ========================================
   JATIN SHARMA — PORTFOLIO JAVASCRIPT
   Theme • Mobile menu • Typing effect
   Skills tabs • Form validation • Animations
=========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. FOOTER YEAR
    // =====================================

    const year = document.getElementById("yr");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // =====================================
    // 2. LIGHT / DARK THEME SWITCHER
    // =====================================

    const themeButton = document.getElementById("theme");
    const body = document.body;

    // Restore the saved theme when available.
    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem("portfolio-theme");
    } catch (error) {
        // Continue normally if storage is unavailable.
    }

    if (savedTheme === "light") {
        body.classList.add("light");
    }

    function updateThemeButton() {
        if (!themeButton) return;

        const isLight = body.classList.contains("light");

        themeButton.textContent = isLight ? "Dark mode" : "Light mode";
        themeButton.setAttribute(
            "aria-label",
            isLight ? "Switch to dark theme" : "Switch to light theme"
        );
    }

    updateThemeButton();

    if (themeButton) {
        themeButton.addEventListener("click", () => {
            body.classList.toggle("light");

            const currentTheme = body.classList.contains("light")
                ? "light"
                : "dark";

            try {
                localStorage.setItem("portfolio-theme", currentTheme);
            } catch (error) {
                // Theme still works for this page session.
            }

            updateThemeButton();
        });
    }


    // =====================================
    // 3. MOBILE NAVIGATION MENU
    // =====================================

    const burger = document.getElementById("burger");
    const menu = document.getElementById("menu");

    function closeMenu() {
        if (!menu || !burger) return;

        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.textContent = "Menu";
    }

    if (burger && menu) {
        burger.addEventListener("click", () => {
            const isOpen = menu.classList.toggle("open");

            burger.setAttribute("aria-expanded", String(isOpen));
            burger.textContent = isOpen ? "Close" : "Menu";
        });

        // Close the menu after selecting a navigation link.
        menu.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Close when clicking outside the navigation.
        document.addEventListener("click", (event) => {
            if (
                menu.classList.contains("open") &&
                !menu.contains(event.target) &&
                !burger.contains(event.target)
            ) {
                closeMenu();
            }
        });

        // Close with Escape.
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
                burger.focus();
            }
        });

        // Reset the mobile menu when returning to desktop width.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 650) {
                closeMenu();
            }
        });
    }


    // =====================================
    // 4. HERO TYPING EFFECT
    // =====================================

    const roleElement = document.getElementById("role");

    const roles = [
        "BBA Student",
        "Web Designer",
        "Digital Marketing Learner",
        "Aspiring Product Manager"
    ];

    let roleIndex = 0;
    let characterIndex = roles[0].length;
    let deleting = false;
    let typingTimer;

    function typeRole() {
        if (!roleElement) return;

        const currentRole = roles[roleIndex];

        if (deleting) {
            characterIndex--;
        } else {
            characterIndex++;
        }

        roleElement.textContent = currentRole.substring(
            0,
            characterIndex
        );

        let delay = deleting ? 45 : 85;

        if (!deleting && characterIndex === currentRole.length) {
            deleting = true;
            delay = 1400;
        } else if (deleting && characterIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 350;
        }

        typingTimer = setTimeout(typeRole, delay);
    }

    // Avoid unnecessary animation for reduced-motion preferences.
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (roleElement && !reducedMotion) {
        roleElement.textContent = roles[0];
        typingTimer = setTimeout(typeRole, 1800);
    }


    // =====================================
    // 5. INTERACTIVE SKILLS TABS
    // =====================================

    const tabs = document.querySelectorAll(".tab");
    const panel = document.getElementById("panel");

    const skills = {
        html: {
            title: "HTML — Structure",
            description:
                "I use HTML to create structured web pages with headings, sections, links, forms and semantic elements."
        },

        css: {
            title: "CSS — Design",
            description:
                "I use CSS to style web pages with layouts, typography, colors, transitions and responsive designs for mobile and desktop."
        },

        js: {
            title: "JavaScript — Interactivity",
            description:
                "I am learning JavaScript to add interactive features such as navigation menus, theme switching, form validation and dynamic content."
        },

        mkt: {
            title: "Digital Marketing",
            description:
                "I am learning digital marketing concepts, including content strategy, SEO fundamentals, audience research and online brand promotion."
        }
    };

    function showSkill(key) {
        if (!panel || !skills[key]) return;

        const skill = skills[key];

        // Use textContent to safely insert text.
        panel.replaceChildren();

        const heading = document.createElement("h3");
        heading.textContent = skill.title;
        heading.style.color = "var(--accent)";
        heading.style.marginBottom = "10px";

        const description = document.createElement("p");
        description.textContent = skill.description;
        description.style.marginBottom = "0";

        panel.append(heading, description);
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            tabs.forEach((item) => {
                item.setAttribute("aria-selected", "false");
                item.setAttribute("tabindex", "-1");
            });

            tab.setAttribute("aria-selected", "true");
            tab.setAttribute("tabindex", "0");

            showSkill(tab.dataset.k);
        });

        // Keyboard navigation for accessible tabs.
        tab.addEventListener("keydown", (event) => {
            let nextIndex = index;

            if (event.key === "ArrowRight") {
                nextIndex = (index + 1) % tabs.length;
            } else if (event.key === "ArrowLeft") {
                nextIndex = (index - 1 + tabs.length) % tabs.length;
            } else if (event.key === "Home") {
                nextIndex = 0;
            } else if (event.key === "End") {
                nextIndex = tabs.length - 1;
            } else {
                return;
            }

            event.preventDefault();
            tabs[nextIndex].focus();
            tabs[nextIndex].click();
        });
    });

    // Display the initially selected skill.
    const activeTab = document.querySelector(
        '.tab[aria-selected="true"]'
    );

    if (activeTab) {
        tabs.forEach((tab) => {
            tab.setAttribute(
                "tabindex",
                tab === activeTab ? "0" : "-1"
            );
        });

        showSkill(activeTab.dataset.k);
    }


    // =====================================
    // 6. CONTACT FORM VALIDATION
    // =====================================

    const form = document.getElementById("form");

    if (form) {
        const nameInput = document.getElementById("n");
        const emailInput = document.getElementById("e");
        const messageInput = document.getElementById("m");

        const nameError = document.getElementById("en");
        const emailError = document.getElementById("ee");
        const messageError = document.getElementById("em");
        const status = document.getElementById("status");

        function setError(input, errorElement, message) {
            errorElement.textContent = message;
            input.setAttribute(
                "aria-invalid",
                message ? "true" : "false"
            );
        }

        function validateName() {
            const value = nameInput.value.trim();

            const error = value.length < 2
                ? "Please enter your name (at least 2 characters)."
                : "";

            setError(nameInput, nameError, error);
            return !error;
        }

        function validateEmail() {
            const value = emailInput.value.trim();

            const validEmail =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            const error = !validEmail
                ? "Please enter a valid email address."
                : "";

            setError(emailInput, emailError, error);
            return !error;
        }

        function validateMessage() {
            const value = messageInput.value.trim();

            const error = value.length < 10
                ? "Your message must contain at least 10 characters."
                : "";

            setError(messageInput, messageError, error);
            return !error;
        }

        // Validate fields as the visitor types.
        nameInput.addEventListener("input", validateName);
        emailInput.addEventListener("input", validateEmail);
        messageInput.addEventListener("input", validateMessage);

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const nameValid = validateName();
            const emailValid = validateEmail();
            const messageValid = validateMessage();

            if (!nameValid || !emailValid || !messageValid) {
                status.textContent =
                    "Please correct the highlighted fields.";

                if (!nameValid) {
                    nameInput.focus();
                } else if (!emailValid) {
                    emailInput.focus();
                } else {
                    messageInput.focus();
                }

                return;
            }

            // This is only a frontend validation demo.
            // No message is sent without a backend or email service.
            status.textContent =
                "Form validated successfully! Connect an email service to send your message.";

            status.setAttribute("role", "status");
        });
    }


    // =====================================
    // 7. SMOOTH SECTION NAVIGATION
    // =====================================

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: reducedMotion ? "auto" : "smooth",
                    block: "start"
                });

                // Keep the URL and browser navigation in sync.
                if (window.location.hash !== targetId) {
                    history.pushState(null, "", targetId);
                }
            }
        });
    });


    // =====================================
    // 8. REVEAL SECTIONS ON SCROLL
    // =====================================

    const revealElements = document.querySelectorAll(
        ".facts, .item, .proj, #form"
    );

    if ("IntersectionObserver" in window && !reducedMotion) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal-ready");
            observer.observe(element);
        });
    }

    console.log("Jatin Sharma's portfolio is ready!");
});
