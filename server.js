const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const esbuild = require('esbuild');
const { adminClient } = require('./lib/supabaseClient');
const { 
  createSession, 
  verifySession, 
  registerUser, 
  signInUser, 
  signOutUser,
  getUser,
  updateUserProfile
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

async function getPaidStatus(userId) {
  const userData = await getUser(userId);
  return {
    paid: Boolean(userData?.profile?.is_paid),
    userData,
  };
}







app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    
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

    
    const { user } = await registerUser(email, password, fullName);

    
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const { sessionToken, expiresAt } = await createSession(user.id, ipAddress, userAgent);

    console.log('✅ User registered');

    
    res.cookie('sessionToken', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
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
      paid: false,
      paymentRequired: true,
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





app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password required',
        code: 'INVALID_INPUT'
      });
    }

    
    const { user, profile } = await signInUser(email, password);
    const paid = Boolean(profile?.is_paid);

    
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const { sessionToken, expiresAt } = await createSession(user.id, ipAddress, userAgent);

    console.log('✅ User signed in');

    
    res.cookie('sessionToken', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
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
      paid,
      paymentRequired: !paid,
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

    
    const { paid, userData } = await getPaidStatus(session.user_id);
    
    if (!userData) {
      return res.status(401).json({ error: 'User not found', code: 'USER_NOT_FOUND' });
    }

    res.json({
      authenticated: true,
      user: {
        id: userData.user.id,
        email: userData.user.email,
        fullName: userData.profile?.full_name,
      },
      paid,
    });
  } catch (error) {
    console.error('Check auth error:', error);
    res.status(500).json({ 
      error: 'Check failed',
      code: 'CHECK_ERROR'
    });
  }
});





app.get('/api/auth/google', (req, res) => {
  try {
    
    const redirectUrl = encodeURIComponent(
      `${req.protocol}://${req.get('host')}/api/auth/google/callback`
    );

    
    const oauthUrl = `${process.env.SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${redirectUrl}`;
    
    res.redirect(oauthUrl);
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).json({ error: 'Google OAuth failed' });
  }
});





app.get('/api/auth/google/callback', async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'No authorization code' });
    }

    
    const { data, error } = await adminClient.auth.exchangeCodeForSession(code);

    if (error) throw error;

    const fullName = data.user.user_metadata?.full_name || data.user.user_metadata?.name || data.user.email || '';
    const { data: profileData, error: profileError } = await adminClient
      .from('user_profiles')
      .select('id')
      .eq('id', data.user.id)
      .single();

    if (profileError || !profileData) {
      const { error: upsertError } = await adminClient
        .from('user_profiles')
        .upsert({
          id: data.user.id,
          email: data.user.email,
          full_name: fullName,
        });

      if (upsertError) {
        console.warn('Profile upsert failed for Google user:', upsertError);
      }
    }

    
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const { sessionToken } = await createSession(data.user.id, ipAddress, userAgent);

    
    res.cookie('sessionToken', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      path: '/',
    });

    const { paid } = await getPaidStatus(data.user.id);
    res.redirect(paid ? '/dashboard/' : '/payment/');
  } catch (error) {
    console.error('Google callback error:', error);
    res.redirect('/signin/?error=google_auth_failed');
  }
});



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

  const { paid } = await getPaidStatus(session.user_id);
  if (!paid) {
    return res.redirect('/payment/');
  }

  return next();
});

app.use('/payment', async (req, res, next) => {
  const sessionToken = req.cookies.sessionToken;
  if (!sessionToken) {
    return res.redirect('/signin/');
  }

  const session = await verifySession(sessionToken);
  if (!session) {
    res.clearCookie('sessionToken');
    return res.redirect('/signin/');
  }

  const { paid } = await getPaidStatus(session.user_id);
  if (paid) {
    return res.redirect('/dashboard/');
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


app.use(express.static(path.join(__dirname)));







app.post('/api/create-order', verifySessionMiddleware, async (req, res) => {
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





app.post('/api/verify-payment', verifySessionMiddleware, async (req, res) => {
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

    const paidAt = new Date().toISOString();
    await updateUserProfile(req.user.id, {
      is_paid: true,
      payment_id: paymentId,
      payment_at: paidAt,
    });

    return res.json({ status: 'ok' });
  } catch (err) {
    console.error('verify-payment error:', err);
    return res.status(500).json({ error: 'verify_failed' });
  }
});





app.get('/api/billing/status', verifySessionMiddleware, async (req, res) => {
  try {
    const { paid } = await getPaidStatus(req.user.id);
    return res.json({ paid });
  } catch (error) {
    console.error('billing status error:', error);
    return res.status(500).json({ error: 'billing_status_failed' });
  }
});



if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

module.exports = app;
