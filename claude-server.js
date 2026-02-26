const http = require('http');
const { spawn } = require('child_process');
const os = require('os');

const PORT = 4000;
const PROJECT_DIR = '/Users/ronnakrit/Desktop/next js claude';

// Store jobs in memory
const jobs = {};

function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

function runJob(jobId, prompt) {
  const job = jobs[jobId];

  const env = { ...process.env };
  delete env.CLAUDECODE;

  job.output += '── Claude กำลังทำงาน ──\n\n';

  const claude = spawn('claude', ['-p', '--dangerously-skip-permissions', prompt], {
    cwd: PROJECT_DIR,
    env,
  });

  claude.stdout.on('data', d => { job.output += d.toString(); });
  claude.stderr.on('data', d => { job.output += '[err] ' + d.toString(); });

  claude.on('close', code => {
    if (code !== 0) {
      job.output += `\n[Claude ออกด้วย code ${code}]\n`;
      job.status = 'error';
      return;
    }

    job.output += '\n── Claude เสร็จ กำลัง push GitHub ──\n\n';

    const shortPrompt = prompt.replace(/["'`]/g, '').slice(0, 60);
    const gitCmd = [
      `cd "${PROJECT_DIR}"`,
      'git add -A',
      'git diff --cached --stat',
      `git commit -m "claude: ${shortPrompt}" --allow-empty`,
      'git push',
    ].join(' && ');

    const git = spawn('bash', ['-c', gitCmd], {
      cwd: PROJECT_DIR,
      env: { ...process.env },
    });

    git.stdout.on('data', d => { job.output += d.toString(); });
    git.stderr.on('data', d => { job.output += d.toString(); });

    git.on('close', gitCode => {
      if (gitCode === 0) {
        job.output += '\n── Push GitHub สำเร็จ! ──\n';
        job.status = 'done';
      } else {
        job.output += `\n[git ออกด้วย code ${gitCode}]\n`;
        job.status = 'error';
      }
    });
  });
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
      cursor: pointer;
    }
    button:disabled { background: #333; color: #666; }
    #clearBtn { flex: 0; padding: 14px 18px; background: #1a1a1a; border: 1px solid #2a2a2a; color: #999; }
    .status-bar {
      margin-top: 12px; padding: 10px 14px; border-radius: 8px;
      background: #1a1a1a; border: 1px solid #2a2a2a;
      font-size: 13px; display: flex; align-items: center; gap: 8px;
    }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #444; flex-shrink: 0; }
    .dot.running { background: #f59e0b; animation: pulse 1s infinite; }
    .dot.done { background: #10b981; }
    .dot.error { background: #ef4444; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    #output {
      margin-top: 12px; padding: 14px; background: #111; border-radius: 10px;
      border: 1px solid #1e1e1e; font-family: 'SF Mono', Menlo, monospace;
      font-size: 12px; line-height: 1.6; white-space: pre-wrap;
      min-height: 200px; max-height: 60vh; overflow-y: auto; color: #ccc;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Claude Remote</h1>
    <p class="sub">สั่งแก้ code แล้ว push GitHub อัตโนมัติ</p>
    <label>คำสั่งให้ Claude</label>
    <textarea id="prompt" placeholder="เช่น: แก้ bug ใน app/page.tsx&#10;เพิ่ม dark mode ให้ header"></textarea>
    <div class="row">
      <button id="runBtn" onclick="run()">Run & Push</button>
      <button id="clearBtn" onclick="clearAll()">Clear</button>
    </div>
    <div class="status-bar">
      <div class="dot" id="dot"></div>
      <span id="statusText">พร้อมใช้งาน</span>
    </div>
    <div id="output">// ผลลัพธ์จะแสดงที่นี่...</div>
  </div>

  <script>
    let polling = null;
    let running = false;

    async function run() {
      if (running) return;
      const prompt = document.getElementById('prompt').value.trim();
      if (!prompt) { alert('กรุณาใส่คำสั่งก่อน'); return; }

      running = true;
      setUI('running', 'กำลังส่งคำสั่ง...');
      document.getElementById('output').textContent = '';
      document.getElementById('runBtn').disabled = true;

      try {
        const res = await fetch('/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });
        const { jobId } = await res.json();
        setUI('running', 'Claude กำลังทำงาน...');
        startPolling(jobId);
      } catch (e) {
        setUI('error', 'เชื่อมต่อไม่ได้: ' + e.message);
        done();
      }
    }

    function startPolling(jobId) {
      polling = setInterval(async () => {
        try {
          const res = await fetch('/status/' + jobId);
          const data = await res.json();

          document.getElementById('output').textContent = data.output;
          document.getElementById('output').scrollTop = 99999;

          if (data.status === 'done') {
            setUI('done', 'Push GitHub สำเร็จ!');
            done();
          } else if (data.status === 'error') {
            setUI('error', 'เกิดข้อผิดพลาด');
            done();
          } else {
            setUI('running', 'Claude กำลังทำงาน...');
          }
        } catch (e) {
          setUI('error', 'polling error: ' + e.message);
          done();
        }
      }, 2000);
    }

    function done() {
      clearInterval(polling);
      running = false;
      document.getElementById('runBtn').disabled = false;
      document.getElementById('runBtn').textContent = 'Run & Push';
    }

    function setUI(state, text) {
      document.getElementById('dot').className = 'dot ' + state;
      document.getElementById('statusText').textContent = text;
      if (state === 'running') {
        document.getElementById('runBtn').textContent = 'กำลังทำงาน...';
      }
    }

    function clearAll() {
      document.getElementById('output').textContent = '// ผลลัพธ์จะแสดงที่นี่...';
      document.getElementById('dot').className = 'dot';
      document.getElementById('statusText').textContent = 'พร้อมใช้งาน';
    }
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  // UI
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(HTML);
    return;
  }

  // Start job
  if (req.method === 'POST' && req.url === '/run') {
    let body = '';
    req.on('data', c => (body += c));
    req.on('end', () => {
      let parsed;
      try { parsed = JSON.parse(body); } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }

      const { prompt } = parsed;
      const jobId = makeId();
      jobs[jobId] = { status: 'running', output: '' };

      runJob(jobId, prompt);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ jobId }));
    });
    return;
  }

  // Poll status
  const statusMatch = req.url.match(/^\/status\/([a-z0-9]+)$/);
  if (req.method === 'GET' && statusMatch) {
    const job = jobs[statusMatch[1]];
    if (!job) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Job not found' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: job.status, output: job.output }));
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
  console.log('──────────────────────────────\n');
});
