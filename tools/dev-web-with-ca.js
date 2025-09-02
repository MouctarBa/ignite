const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

function getMkcertCaroot() {
  // Prefer local mkcert binary added earlier
  const localMkcert = path.join(process.cwd(), 'tools', 'mkcert.exe');
  try {
    if (fs.existsSync(localMkcert)) {
      const { execFileSync } = require('child_process');
      const out = execFileSync(localMkcert, ['-CAROOT'], { encoding: 'utf8' }).trim();
      return out;
    }
  } catch {}
  // Fallback common Windows path
  const guessWin = path.join(process.env.LOCALAPPDATA || '', 'mkcert');
  if (fs.existsSync(guessWin)) return guessWin;
  return null;
}

const caroot = getMkcertCaroot();
if (caroot) {
  const caFile = path.join(caroot, 'rootCA.pem');
  if (fs.existsSync(caFile)) {
    process.env.NODE_EXTRA_CA_CERTS = caFile;
    console.log('Using NODE_EXTRA_CA_CERTS:', caFile);
  }
}

const child = spawn('npm', ['run', 'dev', '--workspace', 'apps/web'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

child.on('exit', (code) => process.exit(code ?? 0));

