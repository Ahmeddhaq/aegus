import { renderTemplate, removeGlobalStyles, ready, injectPageStyles, initPageEnhancements } from './common';

const template = `<h2 class="brand-logo">
        <img src="/assets/logo.svg" alt="logo">
    </h2>
    <div class="profile-menu" id="profileMenu">
        <img src="/assets/userProfile.jpeg" alt="profile" class="profile-pic" id="profilePic" role="button" aria-haspopup="true" aria-expanded="false" style="width:40px;height:40px;border-radius:50%;cursor:pointer;">
        <div class="signout-popup" id="signoutPopup" role="menu" aria-hidden="true">
            <div class="user-name" id="userName">User</div>
            <button class="signout-btn" id="signOutBtn" type="button">Sign Out</button>
        </div>
    </div>
    <div id="main">
        <div class="download-page">
            <button id="download-btn" class="action-btn">Download App</button>
        </div>
    </div>`;

const dashboardStyles = `/* Dashboard Styles */

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
    src: url(../fonts/SF-PRO.TTF);
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
    min-height: 100%;
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
    src: url(../fonts/SF-PRO.TTF);
}

#main {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.download-page {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
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

interface AuthUserResponse {
    authenticated: boolean;
    user: {
        id: string;
        email: string;
        fullName?: string;
    };
    paid?: boolean;
}

async function fetchUser() {
    const response = await fetch('/api/auth/check', {
        credentials: 'include',
    });
    if (!response.ok) {
        window.location.href = '/register/';
        return null;
    }
    const payload = (await response.json()) as AuthUserResponse;
    if (!payload.authenticated) {
        window.location.href = '/register/';
        return null;
    }
    if (!payload.paid) {
        window.location.href = '/payment/';
        return null;
    }
    return payload.user;
}

async function signOut(): Promise<void> {
    await fetch('/api/auth/signout', {
        method: 'POST',
        credentials: 'include',
    });
    window.location.href = '/signin/';
}

function setupProfileDropdown(): void {
    const profilePic = document.getElementById('profilePic');
    const signoutPopup = document.getElementById('signoutPopup');
    const signOutBtn = document.getElementById('signOutBtn');
    if (!profilePic || !signoutPopup || !signOutBtn) {
        return;
    }

    const userName = document.getElementById('userName');
    const profilePicEl = profilePic as HTMLElement;
    const signoutPopupEl = signoutPopup as HTMLElement;
    const signOutBtnEl = signOutBtn as HTMLButtonElement;

    function hidePopup() {
        signoutPopupEl.classList.remove('visible');
        profilePicEl.setAttribute('aria-expanded', 'false');
        signoutPopupEl.setAttribute('aria-hidden', 'true');
    }

    function showPopup() {
        signoutPopupEl.classList.add('visible');
        profilePicEl.setAttribute('aria-expanded', 'true');
        signoutPopupEl.setAttribute('aria-hidden', 'false');
    }

    profilePicEl.addEventListener('click', (event) => {
        event.stopPropagation();
        if (signoutPopup.classList.contains('visible')) {
            hidePopup();
            return;
        }
        showPopup();
    });

    signoutPopupEl.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    document.addEventListener('click', () => {
        if (signoutPopup.classList.contains('visible')) {
            hidePopup();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hidePopup();
        }
    });

    signOutBtnEl.addEventListener('click', async (event) => {
        event.stopPropagation();
        try {
            await signOut();
        } catch (error) {
            console.error('Sign out failed', error);
            alert('Failed to sign out');
        }
    });
}

async function init(): Promise<void> {
    renderTemplate(template);
    removeGlobalStyles();
    injectPageStyles(dashboardStyles, 'page-dashboard-styles');
    await initPageEnhancements();
    const user = await fetchUser();
    if (!user) {
        return;
    }
    const userName = document.getElementById('userName');
    if (userName) {
        userName.textContent = user.fullName || user.email || 'User';
    }
    setupProfileDropdown();
    const downloadBtn = document.getElementById('download-btn');
    downloadBtn?.addEventListener('click', () => {
        window.location.href = '/api/download-app';
    });
}

ready(() => {
    void init();
});
