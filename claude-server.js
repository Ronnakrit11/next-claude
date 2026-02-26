const http = require('http');
const { spawn } = require('child_process');
const os = require('os');

const PORT = 4000;
const PROJECT_DIR = '/Users/ronnakrit/Desktop/next js claude';

function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}

const HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Claude Remote</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #0d0d0d; color: #e0e0e0; min-height: 100vh; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; }
    h1 { font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 6px; }
    .sub { font-size: 13px; color: #666; margin-bottom: 20px; }
    label { font-size: 13px; color: #999; display: block; margin-bottom: 6px; }
    textarea {
      width: 100%; height: 130px; padding: 14px; border-radius: 10px;
      border: 1px solid #2a2a2a; background: #1a1a1a; color: #fff;
      font-size: 15px; resize: vertical; outline: none;
      transition: border-color 0.2s;
    }
    textarea:focus { border-color: #7c3aed; }
    .row { display: flex; gap: 10px; margin-top: 10px; }
    button {
      flex: 1; padding: 14px; border-radius: 10px; border: none;
      background: #7c3aed; color: white; font-size: 15px; font-weight: 600;
      cursor: pointer; transition: background 0.2s;
    }
    button:hover { background: #6d28d9; }
    button:disabled { background: #333; color: #666; cursor: not-allowed; }
    #clearBtn {
      flex: 0; padding: 14px 18px; background: #1a1a1a;
      border: 1px solid #2a2a2a; color: #999;
    }
    #clearBtn:hover { background: #222; }
    .status-bar {
      margin-top: 12px; padding: 10px 14px; border-radius: 8px;
      background: #1a1a1a; border: 1px solid #2a2a2a;
      font-size: 13px; display: flex; align-items: center; gap: 8px;
    }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #444; flex-shrink: 0; }
    .dot.running { background: #f59e0b; animation: pulse 1s infinite; }
    .dot.success { background: #10b981; }
    .dot.error { background: #ef4444; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
    #output {
      margin-top: 12px; padding: 14px; background: #111; border-radius: 10px;
      border: 1px solid #1e1e1e; font-family: 'SF Mono', Menlo, monospace;
      font-size: 12px; line-height: 1.6; white-space: pre-wrap;
      min-height: 200px; max-height: 60vh; overflow-y: auto; color: #ccc;
    }
    .tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
    .tag-claude { background: #7c3aed22; color: #a78bfa; border: 1px solid #7c3aed44; }
    .tag-git { background: #10b98122; color: #34d399; border: 1px solid #10b98144; }
    .tag-error { background: #ef444422; color: #f87171; border: 1px solid #ef444444; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Claude Remote</h1>
    <p class="sub">สั่งแก้ code แล้ว push GitHub อัตโนมัติ</p>

    <label>คำสั่งให้ Claude</label>
    <textarea id="prompt" placeholder="เช่น: แก้ bug ใน app/page.tsx&#10;เพิ่ม dark mode ให้ header&#10;refactor function ใน lib/utils.ts"></textarea>

    <div class="row">
      <button id="runBtn" onclick="run()">Run & Push</button>
      <button id="clearBtn" onclick="clearOutput()">Clear</button>
    </div>

    <div class="status-bar">
      <div class="dot" id="dot"></div>
      <span id="statusText">พร้อมใช้งาน</span>
    </div>

    <div id="output">// ผลลัพธ์จะแสดงที่นี่...</div>
  </div>

  <script>
    let running = false;

    async function run() {
      if (running) return;
      const prompt = document.getElementById('prompt').value.trim();
      if (!prompt) { alert('กรุณาใส่คำสั่งก่อน'); return; }

      running = true;
      const btn = document.getElementById('runBtn');
      const output = document.getElementById('output');
      const dot = document.getElementById('dot');
      const status = document.getElementById('statusText');

      btn.disabled = true;
      btn.textContent = 'กำลังทำงาน...';
      dot.className = 'dot running';
      status.textContent = 'Claude กำลังทำงาน...';
      output.textContent = '';

      try {
        const res = await fetch('/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          output.textContent += decoder.decode(value);
          output.scrollTop = output.scrollHeight;
        }

        dot.className = 'dot success';
        status.textContent = 'เสร็จแล้ว! Push GitHub สำเร็จ';
      } catch (e) {
        dot.className = 'dot error';
        status.textContent = 'เกิดข้อผิดพลาด: ' + e.message;
        output.textContent += '\n[ERROR] ' + e.message;
      }

      running = false;
      btn.disabled = false;
      btn.textContent = 'Run & Push';
    }

    function clearOutput() {
      document.getElementById('output').textContent = '// ผลลัพธ์จะแสดงที่นี่...';
      document.getElementById('dot').className = 'dot';
      document.getElementById('statusText').textContent = 'พร้อมใช้งาน';
    }

    // Submit on Cmd+Enter / Ctrl+Enter
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') run();
    });
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  // Serve UI
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(HTML);
    return;
  }

  // Run Claude + Git Push
  if (req.method === 'POST' && req.url === '/run') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      let parsed;
      try { parsed = JSON.parse(body); } catch {
        res.writeHead(400);
        res.end('Invalid JSON');
        return;
      }

      const { prompt } = parsed;
      if (!prompt) {
        res.writeHead(400);
        res.end('Missing prompt');
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'X-Content-Type-Options': 'nosniff',
      });

      res.write('──────────────────────────────\n');
      res.write('Claude Code กำลังทำงาน...\n');
      res.write('──────────────────────────────\n\n');

      const claude = spawn(
        'claude',
        ['-p', '--dangerously-skip-permissions', prompt],
        { cwd: PROJECT_DIR, env: { ...process.env, CLAUDECODE: undefined } }
      );

      claude.stdout.on('data', data => res.write(data.toString()));
      claude.stderr.on('data', data => res.write(`[stderr] ${data}`));

      claude.on('close', code => {
        if (code !== 0) {
          res.write(`\n[Claude ออกด้วย code ${code}]\n`);
          res.end();
          return;
        }

        res.write('\n──────────────────────────────\n');
        res.write('Claude เสร็จแล้ว — กำลัง push GitHub...\n');
        res.write('──────────────────────────────\n\n');

        const shortPrompt = prompt.replace(/['"]/g, '').slice(0, 60);
        const gitCmd = [
          `cd "${PROJECT_DIR}"`,
          'git add -A',
          `git diff --cached --stat`,
          `git commit -m "claude: ${shortPrompt}"`,
          'git push',
        ].join(' && ');

        const git = spawn('bash', ['-c', gitCmd], {
          cwd: PROJECT_DIR,
          env: { ...process.env },
        });

        git.stdout.on('data', data => res.write(data.toString()));
        git.stderr.on('data', data => res.write(data.toString()));

        git.on('close', gitCode => {
          if (gitCode === 0) {
            res.write('\n──────────────────────────────\n');
            res.write('Push GitHub สำเร็จ!\n');
            res.write('──────────────────────────────\n');
          } else {
            res.write(`\n[git ออกด้วย code ${gitCode}]\n`);
          }
          res.end();
        });
      });
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIP();
  console.log('\n──────────────────────────────');
  console.log('Claude Remote Server พร้อมแล้ว!');
  console.log('──────────────────────────────');
  console.log(`Local:   http://localhost:${PORT}`);
  console.log(`Mobile:  http://${ip}:${PORT}  ← เปิดบนมือถือ`);
  console.log('──────────────────────────────');
  console.log('กด Ctrl+C เพื่อหยุด\n');
});
