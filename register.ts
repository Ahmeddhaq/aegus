import { renderTemplate, removeGlobalStyles, ready, initPageEnhancements, injectPageStyles } from './common';

const template = `<div class="page-container">
      <h2 class="brand-logo">
        <img src="/assets/logo.svg" alt="logo">
      </h2>
  <div class="halftone-bg"></div>
  <div class="content-wrapper">
    <div class="signup-card">

      <h1 class="title">Create Account</h1>
      <p class="subtitle">Join us to get started</p>

      <div class="social-buttons">
        <button class="social-btn" id="google-signup">
          <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Sign up with Google</span>
        </button>

        <button class="social-btn" disabled style="opacity: 0.5; cursor: not-allowed;">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.05 20.28c-.98.95-2.05 1.72-3.21 1.72-1.13 0-1.5-.69-2.84-.69-1.33 0-1.75.67-2.82.69-1.11.02-2.08-.71-3.06-1.69-2-1.98-3.05-5.63-3.05-8.18 0-4.03 2.5-6.15 4.94-6.15 1.27 0 2.47.88 3.25.88.77 0 2.21-.91 3.71-.91 1.57 0 3.53.89 4.65 2.48-3.03 1.82-2.54 5.94.47 7.17-.73 1.81-1.53 3.62-2.3 4.68zM12.03 5.07c.65-1.58-.41-3.07-1.53-4.07 0 0-.11-.09-.11-.09-.09.11-.18.23-.26.35-.81 1.18-.89 2.73-.13 4.01.11.19.24.36.39.51.15.15.32.28.5.39.41.25.81.36 1.14.36.01-1.46 0-1.46 0-1.46z"/>
          </svg>
          <span>Sign up with Apple (Coming soon)</span>
        </button>
      </div>

      <div class="divider">
        <span>OR</span>
      </div>

      <div id="register-error" class="form-error" role="alert"></div>

      <form class="signup-form">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" required>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required>
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" placeholder="Create a password (min 8 chars, 1 uppercase, 1 number)" required>
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm your password" required>
        </div>

        <button type="submit" class="submit-btn">Create Account</button>
      </form>

      <div class="footer-text">
        <p>Already have an account?</p>
        <a href="/signin/" class="signin-link">Sign In</a>
      </div>
    </div>
  </div>
</div>`;

const registerStyles = `/* -------------------------------
   DESIGN SYSTEM
--------------------------------*/
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

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

@font-face {
    font-family: sf-pro;
    src: url(./fonts/SF-PRO.TTF);
}

html,
body {
    width: 100%;
  min-height: 100%;
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: sf-pro, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    min-height: 100vh;
}

.content-wrapper {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    overflow: hidden;
}

.signup-card {
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    text-align: left;
    padding-top: 40px;
}

img {
    padding-top: 40px;
    width: 120px;
    height: auto;
    margin-bottom: 32px;
    display: block;
    align-self: flex-start;
}

.page-container {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.page-container img {
    position: absolute;
    top: 40px;      
    left: 40px;     
    width: 120px;   
    height: auto;
}

.title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
    color: #1a4cff;
}

  .subtitle {
    font-size: 13px;
    color: #888;
    margin-bottom: 32px;
    text-transform: lowercase;
}

.social-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
}

.social-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px;
    border: 1px solid #e5e5e5;
    border-radius: 24px;
    background: white;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: background 0.2s;
}

.social-btn:hover {
    background: #f9f9f9;
}

.divider {
    position: relative;
    text-align: center;
    margin: 32px 0;
}

.divider::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #eee;
    z-index: 1;
}

.divider span {
    position: relative;
    z-index: 2;
    background: white;
    padding: 0 12px;
    color: #aaa;
    font-size: 11px;
}

  .form-error {
    display: none;
    margin: 12px 0 0;
    padding: 10px 12px;
    border-radius: 12px;
    background: #fff3f3;
    color: #b10000;
    font-size: 12px;
    border: 1px solid #ffd6d6;
  }

  .form-error.visible {
    display: block;
  }

.form-group {
    margin-bottom: 10px;
}

.form-group label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 0px;
}

input {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid #eee;
    border-radius: 12px;
    font-size: 13px;
    outline: none;
    transition: border-color 0.2s;
}

input:focus {
    border-color: #000;
}

input::placeholder {
    color: #ccc;
}

.submit-btn {
    width: 100%;
    padding: 14px;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 24px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 12px;
    transition: opacity 0.2s;
}

.submit-btn:hover {
    opacity: 0.9;
}

.footer-text {
    margin-top: 32px;
    text-align: center;
}

.footer-text p {
    font-size: 12px;
    color: #aaa;
    margin-bottom: 8px;
}

.signin-link {
    font-size: 12px;
    font-weight: 700;
    color: #000;
    text-decoration: underline;
}

@media (max-width: 768px) {
    .halftone-bg {
      display: none;
    }
    .content-wrapper {
      justify-content: center;
      padding: 20px;
    }
}`;

async function start() {
    renderTemplate(template);
    removeGlobalStyles();
    injectPageStyles(registerStyles, 'page-register-styles');
    await initPageEnhancements();
  setupRegister();
}

function showRegisterError(message: string): void {
  const errorEl = document.getElementById('register-error');
  if (!errorEl) {
    alert(message);
    return;
  }
  errorEl.textContent = message;
  errorEl.classList.add('visible');
}

function clearRegisterError(): void {
  const errorEl = document.getElementById('register-error');
  if (!errorEl) {
    return;
  }
  errorEl.textContent = '';
  errorEl.classList.remove('visible');
}

async function submitRegister(fullName: string, email: string, password: string): Promise<void> {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password, fullName }),
  });

  if (!response.ok) {
    let message = 'Registration failed. Please try again.';
    try {
      const payload = await response.json();
      if (payload?.error) {
        message = payload.error;
      }
    } catch {
      
    }
    throw new Error(message);
  }
}

function setupRegister(): void {
  const form = document.querySelector('.signup-form') as HTMLFormElement | null;
  const inputs = form?.querySelectorAll('input') ?? [];
  const fullNameInput = inputs[0] as HTMLInputElement | undefined;
  const emailInput = inputs[1] as HTMLInputElement | undefined;
  const passwordInput = inputs[2] as HTMLInputElement | undefined;
  const confirmInput = inputs[3] as HTMLInputElement | undefined;
  const submitButton = form?.querySelector('button[type="submit"]') as HTMLButtonElement | null;
  const googleButton = document.getElementById('google-signup') as HTMLButtonElement | null;

  if (googleButton) {
    googleButton.addEventListener('click', () => {
      window.location.href = '/api/auth/google';
    });
  }

  if (!form || !fullNameInput || !emailInput || !passwordInput || !confirmInput || !submitButton) {
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearRegisterError();

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    if (!fullName || !email || !password || !confirmPassword) {
      showRegisterError('All fields are required.');
      return;
    }

    if (password.length < 8) {
      showRegisterError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      showRegisterError('Passwords do not match.');
      return;
    }

    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Creating...';

    try {
      await submitRegister(fullName, email, password);
      window.location.href = '/payment/';
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      showRegisterError(message);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText || 'Create Account';
    }
  });
}

ready(() => {
    void start();
});
