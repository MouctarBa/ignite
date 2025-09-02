// Simple HTTPS reverse proxy for local development
// Terminates TLS on port 1338 and proxies to Strapi on http://127.0.0.1:1337
// Uses mkcert-generated certs in certs/localhost.pem and certs/localhost-key.pem

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const SOURCE_PORT = parseInt(process.env.PROXY_SOURCE_PORT || '1338', 10);
const TARGET_HOST = process.env.PROXY_TARGET_HOST || '127.0.0.1';
const TARGET_PORT = parseInt(process.env.PROXY_TARGET_PORT || '1337', 10);

const certPath = path.join(process.cwd(), 'certs', 'localhost.pem');
const keyPath = path.join(process.cwd(), 'certs', 'localhost-key.pem');

if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
  console.error('Certificate or key not found. Expected at:', certPath, keyPath);
  process.exit(1);
}

const httpsOptions = {
  cert: fs.readFileSync(certPath),
  key: fs.readFileSync(keyPath),
};

const server = https.createServer(httpsOptions, (req, res) => {
  const options = {
    hostname: TARGET_HOST,
    port: TARGET_PORT,
    method: req.method,
    path: req.url,
    headers: {
      ...req.headers,
      // ensure upstream sees the internal host and https proto
      host: `${TARGET_HOST}:${TARGET_PORT}`,
      'x-forwarded-proto': 'https',
    },
  };

  const proxyReq = http.request(options, (proxyRes) => {
    // Pass through status and headers
    res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy error:', err.message);
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
    }
    res.end('Bad Gateway');
  });

  req.pipe(proxyReq);
});

server.listen(SOURCE_PORT, () => {
  console.log(
    `HTTPS proxy listening on https://localhost:${SOURCE_PORT} -> http://${TARGET_HOST}:${TARGET_PORT}`
  );
});

