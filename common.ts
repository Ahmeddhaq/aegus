declare const Lenis: { new (): { raf(time: number): void }; } | undefined;
declare const gsap: { to(target: unknown, vars: Record<string, unknown>): void; registerPlugin?: (...plugins: unknown[]) => void } | undefined;
declare const ScrollTrigger: unknown;

export const globalStyles = `/* -------------------------------
   DESIGN SYSTEM
--------------------------------*/
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
    height: 100%;
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: sf-pro, sans-serif;
}

@font-face {
    font-family: sf-pro;
    src: url(./fonts/SF-PRO.TTF);
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
    opacity: 0.8;
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
    height: 100%;
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

    /* position: relative; */
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4);
    background-color: #f3f3f3;
    gap: 10px;
}

.header .nav {
    display: flex;
    align-items: center;
    gap: var(--space-5);
    margin-left: 0;

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

.register{
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
   HERO
--------------------------------*/
.hero {
    position: relative;
    text-align: center;
    width: 100%;
    height: 80vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);

    z-index: 10;
}

.hero h1 {
    overflow-x: visible;
    position: relative;
    /* overflow: hidden; */
    font-size: var(--fs-xxl);
    line-height: 100%;
    color: var(--color-primary);
}

.hero h1 img {
    position: absolute;
    width: 200px;
    top: -40px;
    left: 75%;
}

.hero p {
    font-size: var(--fs-md);
    opacity: 0.9;
}

/* BUTTONS */
.buttons {
    display: flex;
    align-items: center;
    gap: var(--space-5);
}

.buttons .btn1,
.header .btn {
    cursor: pointer;
    padding: var(--space-3) var(--space-6);
    background-color: var(--color-primary);
    border-radius: var(--radius-lg);
    transition: 0.3s ease;
    color: var(--color-bg);
}

.buttons .btn1:hover {
    background-color: #001c82;
}

.header .btn:hover {
    background-color: #001c82;
}

.buttons .btn2 {
    cursor: pointer;
    padding: var(--space-3) var(--space-6);
    background-color: var(--color-text);
    color: var(--color-bg);
    border-radius: var(--radius-lg);
    transition: 0.3s ease;
}

.buttons .btn2:hover {
    background-color: #8b8b8b;
}

/* -------------------------------
   VISION
--------------------------------*/
.vision {
    width: 100%;
    min-height: 80vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-5);
}

.tittle {
    font-size: var(--fs-xs);
    padding: var(--space-2) var(--space-5);
    border-radius: var(--radius-pill);
    background-color: var(--color-pill-bg);
}

/* -------------------------------
   CTA
--------------------------------*/
.cta {
    width: 100%;
    height: 80vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-5);
    text-align: center;
}

.cta h1 {
    overflow: hidden;
    font-size: var(--fs-xxl);
    line-height: 100%;
}

.cta p {
    font-size: var(--fs-md);
    width: 50%;
    opacity: 0.9;
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

    .vision .card-container {
        margin-top: 2rem;
        transform: scale(1.3);
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

/* Dashboard Styles */

/* Import design system from main styles */
:root {
    /* COLORS */
    --color-bg: #f7f9fc;
    --color-text: #0f1222;
    --color-primary: #1a4cff;
    --color-glass-bg: rgba(255, 255, 255, 0.65);
    --color-glass-border: rgba(15, 18, 34, 0.08);
    --header-bg: #ffffff;

    /* SPACING */
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

    /* SHADOW */
    --glass-shadow: 0 10px 40px rgba(15, 18, 34, 0.08);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    overflow-x: hidden;
}

.brand-logo {
    position: absolute;
    top: 40px;
    left: 40px;
    width: 120px;
    height: auto;
    display: block;
    margin: 0;
}

.brand-logo img {
    width: 100%;
    height: auto;
}

.profile-menu {
    position: fixed;
    top: 40px;
    right: 40px;
    z-index: 1000;
    display: inline-block;
    overflow: visible;
}

.profile-pic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
    transition: transform 0.2s;
}

.profile-pic:hover {
    transform: scale(1.05);
}

.signout-popup {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    left: auto;
    transform: translateY(-6px);
    background: white;
    border: 1px solid #d0d0d0;
    border-radius: 8px;
    padding: 8px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    min-width: 140px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 160ms ease, transform 160ms ease, visibility 0s linear 160ms;
    z-index: 1001;
    font-family: sf-pro;
    src: url(./fonts/SF-PRO.TTF);
}


.signout-popup.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
    transition: opacity 160ms ease, transform 160ms ease, visibility 0s;
}

.user-name {
    font-size: 12px;
    font-weight: 600;
    color: #0f1222;
    padding: 6px 8px 8px;
    font-family: inherit;
}

@media (prefers-reduced-motion: reduce) {
    .signout-popup,
    .signout-popup.visible {
        transition: none;
        transform: none;
    }
}

.signout-btn {
    width: 100%;
    padding: 10px 12px;
    background: #1a4cff;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    display: block;
    font-family: inherit;
}

.signout-btn:hover {
    background: #1a4cff;
}

html,
body {
    width: 100%;
    height: 100%;
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: 'Inter', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    min-height: 100vh;
    position: relative;
}

@font-face {
    font-family: sf-pro;
    src: url(./fonts/SF-PRO.TTF);
}

#main {
    position: relative;
    width: 100%;
    min-height: 100vh;
}

/* HEADER */
.header {
    width: 100vw;
    position: sticky;
    top: 0;
    backdrop-filter: blur(20px) saturate(200%);
    -webkit-backdrop-filter: blur(20px) saturate(200%);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4);
    background-color: #f3f3f3;
    gap: 10px;
}

.header .nav {
    display: flex;
    align-items: center;
    gap: var(--space-5);
    margin-left: 0;
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-md);
    backdrop-filter: var(--blur-hero);
}

.header .nav a {
    color: var(--color-text);
    font-size: var(--fs-md);
    opacity: 0.9;
    transition: color 0.2s ease, opacity 0.2s ease;
}

.header .nav a:hover {
    color: var(--color-primary);
    opacity: 1;
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

/* DASHBOARD CONTAINER */
.dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--space-10) var(--space-5);
    min-height: calc(100vh - 200px);
}

.dashboard-content h1 {
    font-size: var(--fs-xxl);
    color: var(--color-text);
    margin-bottom: var(--space-2);
}

.dashboard-content > p {
    font-size: var(--fs-md);
    opacity: 0.8;
    margin-bottom: var(--space-8);
}

/* DASHBOARD GRID */
.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-5);
    margin-bottom: var(--space-10);
}

.dashboard-card {
    background: white;
    padding: var(--space-6);
    border-radius: var(--radius-md);
    box-shadow: 0 2px 12px rgba(15, 18, 34, 0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dashboard-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(15, 18, 34, 0.12);
}

.dashboard-card h3 {
    font-size: var(--fs-md);
    opacity: 0.7;
    margin-bottom: var(--space-3);
    font-weight: 600;
}

.dashboard-card p {
    font-size: var(--fs-lg);
    font-weight: 600;
    color: var(--color-text);
}

.status {
    display: inline-block;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-pill);
    font-size: var(--fs-sm);
    font-weight: 600;
}

.status.active {
    background-color: #e8f5e9;
    color: #2e7d32;
}

/* QUICK ACTIONS */
.quick-actions {
    background: white;
    padding: var(--space-6);
    border-radius: var(--radius-md);
    box-shadow: 0 2px 12px rgba(15, 18, 34, 0.06);
}

.quick-actions h2 {
    font-size: var(--fs-xl);
    margin-bottom: var(--space-5);
    color: var(--color-text);
}

.actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-4);
}

.action-btn {
    padding: var(--space-4) var(--space-6);
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    font-size: var(--fs-md);
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
}

.action-btn:hover {
    background-color: #0d3ad6;
    transform: translateY(-2px);
}

/* FOOTER */
.footer {
    background-color: #0a0d14;
    color: white;
    padding: var(--space-10) var(--space-5);
    margin-top: var(--space-10);
}

.footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-8);
}

.footer .col h3 {
    margin-bottom: var(--space-4);
    font-size: var(--fs-lg);
}

.footer .col a {
    display: block;
    color: rgba(255, 255, 255, 0.8);
    font-size: var(--fs-md);
    margin-bottom: var(--space-3);
    transition: color 0.2s ease;
}

.footer .col a:hover {
    color: white;
}

.footer .logo-col img {
    height: 50px;
    margin-bottom: var(--space-3);
}

.footer .logo-col p {
    opacity: 0.8;
    font-size: var(--fs-md);
}`;

type ScriptAttributes = {
    integrity?: string;
    crossorigin?: string;
    referrerPolicy?: string;
};

const scriptCache = new Map<string, Promise<void>>();
const LENIS_SRC = 'https://unpkg.com/lenis@1.3.15/dist/lenis.min.js';
const GSAP_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js';
const SCROLL_TRIGGER_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js';

export function loadExternalScript(src: string, id?: string, attrs?: ScriptAttributes): Promise<void> {
    const existing = id ? document.getElementById(id) : null;
    if (existing) {
        return Promise.resolve();
    }

    const cacheKey = id || src;
    if (scriptCache.has(cacheKey)) {
        return scriptCache.get(cacheKey)!;
    }

    const promise = new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        if (id) script.id = id;
        if (attrs?.integrity) script.integrity = attrs.integrity;
        if (attrs?.crossorigin) script.crossOrigin = attrs.crossorigin;
        if (attrs?.referrerPolicy) script.referrerPolicy = attrs.referrerPolicy;
        script.addEventListener('load', () => resolve());
        script.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)));
        document.body.appendChild(script);
    });

    scriptCache.set(cacheKey, promise);
    return promise;
}

export function renderTemplate(template: string): void {
    document.body.innerHTML = template;
}

export function ensureGlobalStyles(id = 'aegus-global-styles'): void {
    if (document.getElementById(id)) {
        return;
    }
    const style = document.createElement('style');
    style.id = id;
    style.textContent = globalStyles;
    document.head.appendChild(style);
}

export function removeGlobalStyles(id = 'aegus-global-styles'): void {
    const style = document.getElementById(id);
    if (style) {
        style.remove();
    }
}

export function injectPageStyles(css: string, id: string): void {
    if (!css) {
        return;
    }
    if (document.getElementById(id)) {
        return;
    }
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
}

let lenisInstance: { raf(time: number): void } | null = null;

export async function initSmoothScroll(): Promise<void> {
    await loadExternalScript(LENIS_SRC, 'lenis-script');
    if (typeof Lenis === 'undefined') {
        return;
    }
    if (!lenisInstance) {
        lenisInstance = new Lenis();
        const loop = (time: number) => {
            lenisInstance?.raf(time);
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}

export async function initAnimations(): Promise<void> {
    await loadExternalScript(GSAP_SRC, 'gsap-script', {
        integrity: 'sha512-NcZdtrT77bJr4STcmsGAESr06BYGE8woZdSdEgqnpyqac7sugNO+Tr4bGwGF3MsnEkGKhU2KL2xh6Ec+BqsaHA==',
        crossorigin: 'anonymous',
        referrerPolicy: 'no-referrer',
    });
    await loadExternalScript(SCROLL_TRIGGER_SRC, 'scrolltrigger-script', {
        integrity: 'sha512-P2IDYZfqSwjcSjX0BKeNhwRUH8zRPGlgcWl5n6gBLzdi4Y5/0O4zaXrtO4K9TZK6Hn1BenYpKowuCavNandERg==',
        crossorigin: 'anonymous',
        referrerPolicy: 'no-referrer',
    });
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin?.(ScrollTrigger);
    }
}

const CARD_IMAGES = {
    small: '/assets/Cards (5).svg',
    large: '/assets/Cards (6).svg',
};

export function initCardImage(): void {
    const container = document.querySelector<HTMLDivElement>('.card-container');
    if (!container) {
        return;
    }
    const media = window.matchMedia('(max-width: 600px)');
    const update = (event: MediaQueryListEvent | MediaQueryList) => {
        const src = event.matches ? CARD_IMAGES.large : CARD_IMAGES.small;
        container.innerHTML = `<img src="${src}" alt="cards">`;
    };
    update(media as MediaQueryList);
    if ('addEventListener' in media) {
        media.addEventListener('change', update as EventListener);
    } else {
        (media as MediaQueryList).addListener(update as any);
    }
}

export function setupMenu(): void {
    const menu = document.querySelector<HTMLDivElement>('.header .menu');
    const overlay = document.querySelector<HTMLDivElement>('.menu-overlay');
    const lines = Array.from(document.querySelectorAll<HTMLHRElement>('.header .menu hr'));
    const closeBtn = document.querySelector<HTMLButtonElement>('.menu-close');
    if (!menu || !overlay || lines.length < 2 || !closeBtn) {
        return;
    }

    let isOpen = false;

    const applyGsap = (target: HTMLElement, animation: Record<string, unknown>) => {
        if (typeof gsap !== 'undefined') {
            gsap.to(target, animation);
            return true;
        }
        return false;
    };

    const openMenu = (): void => {
        const animated = applyGsap(lines[0], { rotate: 45, y: 6, duration: 0.25 });
        applyGsap(lines[1], { rotate: -45, y: -6, duration: 0.25 });
        if (!animated) {
            lines[0].style.transform = 'rotate(45deg) translateY(6px)';
            lines[1].style.transform = 'rotate(-45deg) translateY(-6px)';
        }
        if (!applyGsap(overlay, { left: 0, duration: 0.7, ease: 'power3.inOut' })) {
            overlay.style.left = '0';
        }
        isOpen = true;
    };

    const closeMenu = (): void => {
        applyGsap(lines[0], { rotate: 0, y: 0, duration: 0.25 });
        applyGsap(lines[1], { rotate: 0, y: 0, duration: 0.25 });
        if (!gsap) {
            lines[0].style.transform = '';
            lines[1].style.transform = '';
        }
        if (!applyGsap(overlay, { left: '100%', duration: 0.7, ease: 'power3.inOut' })) {
            overlay.style.left = '100%';
        }
        isOpen = false;
    };

    menu.addEventListener('click', (event) => {
        event.preventDefault();
        isOpen ? closeMenu() : openMenu();
    });

    closeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        closeMenu();
    });
}

export async function initPageEnhancements(): Promise<void> {
    try {
        await Promise.all([loadExternalScript(LENIS_SRC, 'lenis-script'), initAnimations()]);
        await loadExternalScript('/script.js', 'legacy-scroll-script');
        const win = window as typeof window & {
            __lenis?: { raf(time: number): void } | null;
            __lenisRafActive?: boolean;
        };
        if (!win.__lenisRafActive) {
            await initSmoothScroll();
        }
        return;
    } catch (error) {
        console.error('Failed to load legacy scroll scripts', error);
    }
    await Promise.all([initSmoothScroll(), initAnimations()]);
    setupMenu();
    initCardImage();
}

export function ready(callback: () => void | Promise<void>): void {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            void callback();
        });
        return;
    }
    void callback();
}
