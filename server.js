const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const esbuild = require('esbuild');
const { 
  createSession, 
  verifySession, 
  registerUser, 
  signInUser, 
  signOutUser,
  getUser 
} = require('./lib/authUtils');

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const TS_ENTRY_DIR = __dirname;
const ENTRY_NAMES = new Set([
  'index',
  'about',
  'contact',
  'product',
  'solution',
  'technology',
  'register',
  'signin',
  'dashboard',
  'payment',
]);

const bundleCache = new Map();

function compileTsEntry(entryName) {
  if (!ENTRY_NAMES.has(entryName)) {
    throw new Error(`Unknown TS entry: ${entryName}`);
  }
  if (process.env.NODE_ENV !== 'production') {
    bundleCache.delete(entryName);
  }
  if (bundleCache.has(entryName)) {
    return bundleCache.get(entryName);
  }
  const entryFile = path.join(TS_ENTRY_DIR, `${entryName}.ts`);
  if (!fs.existsSync(entryFile)) {
    throw new Error(`Missing TS entry file: ${entryFile}`);
  }
  const result = esbuild.buildSync({
    entryPoints: [entryFile],
    bundle: true,
    platform: 'browser',
    format: 'esm',
    target: ['es2020'],
    write: false,
    logLevel: 'silent',
    loader: {
      '.ts': 'ts',
    },
  });
  const bundled = result.outputFiles?.[0]?.text;
  if (!bundled) {
    throw new Error(`Failed to bundle ${entryName}`);
  }
  bundleCache.set(entryName, bundled);
  return bundled;
}

function renderPage(entryName, title = 'Aegus') {
  const safeTitle = String(title).replace(/</g, '&lt;');
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${safeTitle}</title>
    <link rel="preload" href="/fonts/SF-PRO.TTF" as="font" type="font/ttf" crossorigin>
</head>
<body>
    <script type="module" src="/dist/${entryName}.js"></script>
</body>
</html>`;
}

if (!process.env.TEST_API || !process.env.TEST_SECRET) {
  console.warn('Missing TEST_API or TEST_SECRET in .env');
}

const razorpay = new Razorpay({
  key_id: process.env.TEST_API,
  key_secret: process.env.TEST_SECRET,
});

// ============== MIDDLEWARE ==============

/**
 * Middleware to verify session token from cookie
 */
async function verifySessionMiddleware(req, res, next) {
  const sessionToken = req.cookies.sessionToken;
  
  if (!sessionToken) {
    return res.status(401).json({ error: 'Unauthorized', code: 'NO_SESSION' });
  }

  const session = await verifySession(sessionToken);
  if (!session) {
    res.clearCookie('sessionToken');
    return res.status(401).json({ error: 'Session expired', code: 'SESSION_EXPIRED' });
  }

  req.user = {
    id: session.user_id,
    email: session.auth?.users?.[0]?.email,
  };
  next();
}

// ============== AUTHENTICATION ROUTES ==============

/**
 * POST /api/auth/register
 * Register a new user with email and password
 */
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Validation
    if (!email || !password || !fullName) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        code: 'INVALID_INPUT'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({ 
        error: 'Password must be at least 8 characters',
        code: 'WEAK_PASSWORD'
      });
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ 
        error: 'Invalid email format',
        code: 'INVALID_EMAIL'
      });
    }

    // Register user
    const { user } = await registerUser(email, password, fullName);

    // Create session
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const { sessionToken, expiresAt } = await createSession(user.id, ipAddress, userAgent);

    console.log('✅ User registered');

    // Set secure httpOnly cookie
    res.cookie('sessionToken', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName,
      },
      expiresAt,
    });
  } catch (error) {
    console.error('Register error:', error);
    
    if (error.message?.includes('duplicate') || error.code === '23505') {
      return res.status(409).json({ 
        error: 'Email already registered',
        code: 'EMAIL_EXISTS'
      });
    }

    res.status(500).json({ 
      error: 'Registration failed',
      code: 'REGISTER_ERROR'
    });
  }
});

/**
 * POST /api/auth/signin
 * Sign in user with email and password
 */
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password required',
        code: 'INVALID_INPUT'
      });
    }

    // Sign in user
    const { user, profile } = await signInUser(email, password);

    // Create session
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const { sessionToken, expiresAt } = await createSession(user.id, ipAddress, userAgent);

    console.log('✅ User signed in');

    // Set secure httpOnly cookie
    res.cookie('sessionToken', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: profile?.full_name,
      },
      expiresAt,
    });
  } catch (error) {
    console.error('Sign in error:', error);
    
    if (error.message?.includes('Invalid login credentials')) {
      return res.status(401).json({ 
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    res.status(500).json({ 
      error: 'Sign in failed',
      code: 'SIGNIN_ERROR'
    });
  }
});

/**
 * POST /api/auth/signout
 * Sign out user and clear session
 */
app.post('/api/auth/signout', async (req, res) => {
  try {
    const sessionToken = req.cookies.sessionToken;
    
    if (sessionToken) {
      const session = await verifySession(sessionToken);
      if (session) {
        await signOutUser(session.user_id);
      }
    }

    res.clearCookie('sessionToken');
    res.json({ success: true, message: 'Signed out successfully' });
  } catch (error) {
    console.error('Sign out error:', error);
    res.status(500).json({ 
      error: 'Sign out failed',
      code: 'SIGNOUT_ERROR'
    });
  }
});

/**
 * GET /api/auth/check
 * Check if user is authenticated
 */
app.get('/api/auth/check', async (req, res) => {
  try {
    const sessionToken = req.cookies.sessionToken;
    
    if (!sessionToken) {
      return res.status(401).json({ error: 'Unauthorized', code: 'NO_SESSION' });
    }

    const session = await verifySession(sessionToken);
    if (!session) {
      res.clearCookie('sessionToken');
      return res.status(401).json({ error: 'Session expired', code: 'SESSION_EXPIRED' });
    }

    // Get user and profile data
    const userData = await getUser(session.user_id);
    
    if (!userData) {
      return res.status(401).json({ error: 'User not found', code: 'USER_NOT_FOUND' });
    }

    res.json({
      authenticated: true,
      user: {
        id: userData.user.id,
        email: userData.user.email,
        fullName: userData.profile?.full_name,
      }
    });
  } catch (error) {
    console.error('Check auth error:', error);
    res.status(500).json({ 
      error: 'Check failed',
      code: 'CHECK_ERROR'
    });
  }
});

/**
 * GET /api/auth/google
 * Redirect to Supabase Google OAuth
 */
app.get('/api/auth/google', (req, res) => {
  try {
    // Construct Supabase OAuth URL
    const redirectUrl = encodeURIComponent(
      `${req.protocol}://${req.get('host')}/api/auth/google/callback`
    );

    // Redirect to Supabase OAuth endpoint
    const oauthUrl = `${process.env.SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${redirectUrl}`;
    
    res.redirect(oauthUrl);
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).json({ error: 'Google OAuth failed' });
  }
});

/**
 * GET /api/auth/google/callback
 * Handle Google OAuth callback from Supabase
 */
app.get('/api/auth/google/callback', async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'No authorization code' });
    }

    // Exchange code for session via Supabase
    const { data, error } = await adminClient.auth.exchangeCodeForSession(code);

    if (error) throw error;

    // Create session in database
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const { sessionToken } = await createSession(data.user.id, ipAddress, userAgent);

    // Set secure httpOnly cookie
    res.cookie('sessionToken', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    // Redirect to dashboard
    res.redirect('/dashboard/');
  } catch (error) {
    console.error('Google callback error:', error);
    res.redirect('/signin/?error=google_auth_failed');
  }
});

// ============== PAGE ACCESS GUARDS ==============

app.use('/dashboard', async (req, res, next) => {
  const sessionToken = req.cookies.sessionToken;

  if (!sessionToken) {
    return res.redirect('/register/');
  }

  const session = await verifySession(sessionToken);
  if (!session) {
    res.clearCookie('sessionToken');
    return res.redirect('/register/');
  }

  return next();
});

const PAGE_ROUTES = [
  { path: '/', entry: 'index', title: 'Aegus | Secure Offline AI' },
  { path: '/about/', entry: 'about', title: 'About Aegus' },
  { path: '/contact/', entry: 'contact', title: 'Contact Aegus' },
  { path: '/product/', entry: 'product', title: 'Explore Products' },
  { path: '/solution/', entry: 'solution', title: 'AI Solutions' },
  { path: '/technology/', entry: 'technology', title: 'Technology' },
  { path: '/register/', entry: 'register', title: 'Register' },
  { path: '/signin/', entry: 'signin', title: 'Sign In' },
  { path: '/dashboard/', entry: 'dashboard', title: 'Dashboard' },
  { path: '/payment/', entry: 'payment', title: 'Payment' },
];

for (const { path: routePath, entry, title } of PAGE_ROUTES) {
  app.get(routePath, (req, res, next) => {
    try {
      res.send(renderPage(entry, title));
    } catch (error) {
      next(error);
    }
  });
}

app.get('/dist/:entry.js', (req, res, next) => {
  const entryName = req.params.entry;
  if (!ENTRY_NAMES.has(entryName)) {
    return res.status(404).send('Entry not found');
  }

  try {
    const compiled = compileTsEntry(entryName);
    res.type('application/javascript').send(compiled);
  } catch (error) {
    next(error);
  }
});

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// ============== PAYMENT ROUTES ==============

/**
 * POST /api/create-order
 * Create a Razorpay order
 */
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount = 49900, currency = 'INR', email } = req.body || {};

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: `rcpt_${Date.now()}`,
    });

    res.json({
      keyId: process.env.TEST_API,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      email,
    });
  } catch (err) {
    console.error('create-order error:', err?.response?.data || err.message || err);
    res.status(500).json({ error: 'order_failed' });
  }
});

/**
 * POST /api/verify-payment
 * Verify payment signature from Razorpay
 */
app.post('/api/verify-payment', verifySessionMiddleware, (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body || {};
    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({ error: 'missing_fields' });
    }

    const hmac = crypto.createHmac('sha256', process.env.TEST_SECRET);
    hmac.update(`${orderId}|${paymentId}`);
    const digest = hmac.digest('hex');

    if (digest !== signature) {
      return res.status(400).json({ error: 'invalid_signature' });
    }

    return res.json({ status: 'ok' });
  } catch (err) {
    console.error('verify-payment error:', err);
    return res.status(500).json({ error: 'verify_failed' });
  }
});

// ============== SERVER STARTUP ==============

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

module.exports = app;
