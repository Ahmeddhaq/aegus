import { renderTemplate, removeGlobalStyles, ready, initPageEnhancements, injectPageStyles } from './common';

const template = `<div id="main">

        <div class="menu-overlay">
            <div class="menu-overlay-inner">
                <div class="menu-overlay-header">
                    <div class="menu-overlay-top">
                        <span class="menu-label">Menu</span>
                    </div>

                    <button class="menu-close" aria-label="Close menu">
                        <span></span>
                        <span></span>
                    </button>

                </div>

                <nav class="menu-links">
                    <a href="/">Home</a>
                    <a href="/about/">About</a>
                    <a href="/product/">Products</a>
                    <a href="/solution/" class="active">Solutions</a>
                    <a href="/technology/">Technology</a>
                    <a href="/contact/">Contact</a>
                </nav>

                <div class="menu-overlay-footer">
                    <p>Secure Offline AI for Professionals</p>
                </div>

            </div>
        </div>

        <div class="header">
            <img src="/assets/logo.svg" alt="logo" style="width: 120px;">
            <div class="nav">
                <a href="/">Home</a>
                <a href="/about/">About</a>
                <a href="/product/">Products</a>
                <a href="/solution/" class="active">Solutions</a>
                <a href="/technology/">Technology</a>
                <a href="/contact/">Contact</a>
            </div>
            <div class="actions">
                <div class="signin">
                    <a href="/signin/">Sign In</a>
                </div>
                <div class="register">
                    <a href="/register/">Register</a>
                </div>
                <div class="btn">Explore Products</div>
            </div>

            <div class="menu">
                <hr>
                <hr>
            </div>

        </div>

        <section class="solutions">

            <div class="solutions-inner">

                <div class="solutions-head">
                    <span class="pill">Solutions</span>
                    <h1>Security-First AI for<br>High-Stakes Industries.</h1>
                    <p>
                        USBot is built for environments where data sensitivity, confidentiality,
                        and control are non-negotiable. Our offline-first architecture ensures
                        intelligence without exposure.
                    </p>
                </div>

                <div class="solutions-grid">

                    <div class="solution-card">
                        <h2>Legal & Compliance</h2>
                        <p>
                            In a world where client confidentiality is paramount, USBot enables
                            legal professionals to analyze case files and discovery documents
                            without violating attorney-client privilege.
                        </p>
                        <p>
                            Automate document review and contract analysis with complete peace
                            of mind — no third-party server ever sees your files.
                        </p>
                    </div>

                    <div class="solution-card">
                        <h2>Research & Academic Excellence</h2>
                        <p>
                            Accelerate literature reviews and data synthesis while maintaining
                            full control over your research corpus.
                        </p>
                        <p>
                            USBot can index thousands of local PDFs, allowing researchers to
                            query their entire library instantly — privately, offline, and
                            securely.
                        </p>
                    </div>

                    <div class="solution-card">
                        <h2>Enterprise Strategy</h2>
                        <p>
                            Protect your trade secrets and intellectual property with AI that
                            never leaves your environment.
                        </p>
                        <p>
                            USBot empowers executive teams with generative AI for internal
                            reporting and strategic planning — without exposing proprietary
                            data to public model training.
                        </p>
                    </div>

                </div>

            </div>

        </section>

        <div class="footer">
            <div class="footer-inner">

                <div class="col logo-col">
                    <img src="/assets/logo.svg" alt="logo">
                    <p>Secure Offline AI for Professionals</p>
                </div>

                <div class="col">
                    <h3>Explore</h3>
                    <a href="/about/">About</a>
                    <a href="/product/">Products</a>
                    <a href="/solution/">Solutions</a>
                    <a href="#">Technology</a>
                    <a href="../contact/">Contact</a>
                </div>

                <div class="col">
                    <h3>Legal</h3>
                    <a href="#">Terms of Service</a>
                    <a href="#">Privacy Policy</a>
                </div>

            </div>
        </div>

    </div>`;

const solutionStyles = `@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

:root {
    /* COLORS */
    --color-bg: #f7f9fc;
    /* soft white */
    --color-text: #0f1222;
    /* deep navy text */
    --color-primary: #1a4cff;
    /* rich blue */

    --color-glass-bg: rgba(255, 255, 255, 0.65);
    --color-glass-border: rgba(15, 18, 34, 0.08);
    --color-pill-bg: #eef2ff;

    --header-bg: #ffffff;

    /* SPACING (8px scale) */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 24px;
    --space-6: 32px;
    --space-7: 40px;
    --space-8: 48px;
    --space-9: 60px;
    --space-10: 80px;

    /* FONT SIZES */
    --fs-xs: 10px;
    --fs-sm: 14px;
    --fs-md: 16px;
    --fs-lg: 1rem;
    --fs-xl: 2rem;
    --fs-xxl: 4rem;

    /* RADII */
    --radius-pill: 50px;
    --radius-lg: 30px;
    --radius-md: 24px;
    --radius-sm: 12px;

    /* BLUR */
    --blur-hero: blur(24px) saturate(1.2);
    --blur-footer: blur(22px) saturate(1.2);

    /* SHADOW (lighter, cleaner) */
    --glass-shadow: 0 10px 40px rgba(15, 18, 34, 0.08);

    /* LAYOUT */
    --container-width: 80%;
}

/* -------------------------------
   RESET
--------------------------------*/
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    overflow-x: hidden;
}

html,
body {
    width: 100%;
    min-height: 100%;
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: sf-pro, sans-serif;
}

@font-face {
    font-family: sf-pro;
    src: url(../fonts/SF-PRO.TTF);
}

/* -------------------------------
   BACKGROUND
--------------------------------*/
.bg {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
    pointer-events: none;
    z-index: 0;
}

.bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    mask-image: linear-gradient(to bottom,
            rgba(0, 0, 0, 1) 50%,
            rgba(0, 0, 0, 0) 100%);
    -webkit-mask-image: linear-gradient(to bottom,
            rgba(0, 0, 0, 1) 50%,
            rgba(0, 0, 0, 0) 100%);

}

/* -------------------------------
   MAIN WRAPPER
--------------------------------*/
#main {
    position: relative;
    width: 100%;
    min-height: 100vh;
}

/* -------------------------------
   HEADER
--------------------------------*/
.header {
    width: 100vw;
    position: fixed;

    backdrop-filter: blur(20px) saturate(200%);
    -webkit-backdrop-filter: blur(20px) saturate(200%);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4);
    background-color: #f3f3f3;
}

.header .nav {
    display: flex;
    align-items: center;
    gap: var(--space-5);

    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-md);

    /* background: var(--color-glass-bg); */
    /* border: 1px solid var(--color-glass-border); */
    backdrop-filter: var(--blur-hero);
    /* box-shadow: var(--glass-shadow); */
}

.header .nav a {
    color: var(--color-text);
    font-size: var(--fs-md);
    opacity: 0.9;
}

.header .btn {
    color: var(--color-bg);
    padding: var(--space-3) var(--space-6);
    background-color: var(--color-primary);
    border-radius: var(--radius-lg);
}

.actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.signin {
    margin-right: 30px;
}

.signin a {
    color: var(--color-text);
    font-size: var(--fs-md);
    font-weight: 600;
    opacity: 0.9;
    transition: color 0.2s ease, opacity 0.2s ease;
}

.signin a:hover {
    color: var(--color-primary);
    opacity: 1;
}

.register {
    margin-right: 20px;
}

.register a {
    color: var(--color-text);
    font-size: var(--fs-md);
    font-weight: 600;
    opacity: 0.9;
    transition: color 0.2s ease, opacity 0.2s ease;
}

.register a:hover {
    color: var(--color-primary);
    opacity: 1;
}


/* -------------------------------
   FOOTER
--------------------------------*/
.footer {
    width: 100%;
    padding: var(--space-9) 0;
    margin-top: var(--space-10);

    display: flex;
    justify-content: center;
    align-items: center;

    background: var(--color-glass-bg);
    border-top: 1px solid var(--color-glass-border);
    backdrop-filter: var(--blur-footer);
}

.footer-inner {
    width: var(--container-width);
    display: flex;
    justify-content: space-between;
    gap: var(--space-7);
}

.footer .col {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.footer .col h3 {
    font-size: var(--fs-sm);
    font-weight: 600;
    opacity: 0.7;
}

.footer .col a {
    font-size: var(--fs-sm);
    color: var(--color-text);
    opacity: 0.8;
    transition: 0.2s;
}

.footer .col a:hover {
    opacity: 1;
}

.logo-col img {
    width: 140px;
    margin-bottom: var(--space-3);
}

.logo-col p {
    font-size: var(--fs-sm);
    opacity: 0.6;
}

.menu {
    display: none;
}

.col h3 {
    color: #fff;
}

.menu-overlay {
    display: none;
}

/* -------------------------------
   MOBILE
--------------------------------*/
@media (max-width: 768px) {
    :root {
        --fs-xxl: 2.5rem;
        --fs-xl: 1.5rem;
        --container-width: 90%;
    }

    .cta p {
        width: 90%;
    }

    .header .nav,
    .header .btn {
        display: none;
    }


    .menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-3);
        overflow: hidden;
    }

    .menu hr {
        height: 1px;
        width: 30px;
        background-color: #fff;
    }

    /* -------------------------------
   MOBILE MENU (PRO)
--------------------------------*/
    .menu-overlay {
        position: fixed;
        top: 0;
        left: 100%;
        width: 100vw;
        height: 100vh;
        background: #0b0d16;
        z-index: 999;

        display: flex;
        justify-content: center;
    }

    .menu-overlay-inner {
        width: 100%;
        padding: 32px 28px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    /* Top */
    .menu-overlay-top {
        font-size: 12px;
        letter-spacing: 1px;
        text-transform: uppercase;
        opacity: 0.6;
        color: #fff;
    }

    .menu-overlay-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    /* Close button */
    .menu-close {
        width: 36px;
        height: 36px;
        background: none;
        border: none;
        position: relative;
        cursor: pointer;
    }

    .menu-close span {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 20px;
        height: 2px;
        background: #fff;
        transform-origin: center;
    }

    .menu-close span:first-child {
        transform: translate(-50%, -50%) rotate(45deg);
    }

    .menu-close span:last-child {
        transform: translate(-50%, -50%) rotate(-45deg);
    }

    .menu-close:hover {
        opacity: 0.8;
    }

    /* Links */
    .menu-links {
        display: flex;
        flex-direction: column;
        gap: 22px;
    }

    .menu-links a {
        font-size: 1.8rem;
        font-weight: 500;
        color: #fff;
        opacity: 0.9;
        transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .menu-links a:hover {
        opacity: 1;
        transform: translateX(4px);
    }

    .menu-links a.active {
        color: var(--color-primary);
        opacity: 1;
    }

    /* Footer */
    .menu-overlay-footer {
        font-size: 13px;
        opacity: 0.5;
        color: #fff;
    }


    .footer-inner {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-5);
    }

    .hero h1 img {
        width: 130px;
        left: 70%;
        top: -30px;
    }

    .hero,
    .vision,
    .cta {
        padding: var(--space-1) var(--space-4);
    }

    .buttons {
        transform: scale(0.8);
    }
}

.nav a {
    transition: all 0.3s ease;
}

.nav a:hover {
    color: var(--color-primary);
}

.active {
    color: var(--color-primary) !important;
}

/* -------------------------------
   SOLUTIONS SECTION
--------------------------------*/
.solutions {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: var(--space-10) 0;
    position: relative;
    z-index: 2;
}

.solutions-inner {
    width: var(--container-width);
    display: flex;
    flex-direction: column;
    gap: var(--space-9);
}

/* Head */
.solutions-head {
    max-width: 700px;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
}

.solutions-head h1 {
    font-size: var(--fs-xxl);
    font-weight: 600;
    overflow: hidden;
    line-height: 1.1;
}

.solutions-head p {
    font-size: var(--fs-md);
    opacity: 0.75;
    line-height: 1.6;
}

/* Pill */
.pill {
    width: fit-content;
    padding: 6px 14px;
    font-size: var(--fs-sm);
    border-radius: var(--radius-pill);
    background: var(--color-pill-bg);
    color: var(--color-primary);
    font-weight: 500;
}

/* Grid */
.solutions-grid {
    display: grid;
    overflow: visible;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
}

/* Card */
.solution-card {
    padding: var(--space-6);
    border-radius: var(--radius-md);
    background: var(--color-glass-bg);
    border: 1px solid var(--color-glass-border);
    backdrop-filter: blur(18px) saturate(160%);
    -webkit-backdrop-filter: blur(18px) saturate(160%);
    /* box-shadow: var(--glass-shadow); */

    display: flex;
    flex-direction: column;
    gap: var(--space-3);

    transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.solution-card h2 {
    font-size: var(--fs-lg);
    font-weight: 600;
}

.solution-card p {
    font-size: var(--fs-sm);
    opacity: 0.75;
    line-height: 1.6;
}

/* Hover (subtle, premium) */
.solution-card:hover {
    transform: translateY(-6px);
}

/* Mobile */
@media (max-width: 768px) {
    .solutions-grid {
        grid-template-columns: 1fr;
    }

    .solutions-head h1 {
        font-size: var(--fs-xl);
    }
}`;

async function start() {
    renderTemplate(template);
    removeGlobalStyles();
    injectPageStyles(solutionStyles, 'page-solution-styles');
    await initPageEnhancements();
}

ready(() => {
    void start();
});
