const http = require('http');
const { spawn } = require('child_process');
const os = require('os');

const PORT = process.env.CLAUDE_PORT || 4000;
const PROJECT_DIR = process.env.PROJECT_DIR || process.cwd();

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

function countActions(output) {
  // Count tool use patterns from claude -p output
  const patterns = [
    /Read\(/g, /Edit\(/g, /Write\(/g, /Bash\(/g,
    /Glob\(/g, /Grep\(/g, /Task\(/g,
    /Reading/g, /Writing/g, /Editing/g,
  ];
  let count = 0;
  for (const p of patterns) {
    const m = output.match(p);
    if (m) count += m.length;
  }
  return count;
}

function runJob(jobId, prompt) {
  const job = jobs[jobId];
  const env = { ...process.env };
  delete env.CLAUDECODE;

  job.output += '── Claude กำลังเริ่มทำงาน ──\n\n';

  // Run via bash -c so env vars are properly inherited
  const escaped = prompt.replace(/\\/g, '\\\\').replace(/'/g, "'\\''");
  const claude = spawn('bash', ['-c', `claude -p --dangerously-skip-permissions '${escaped}'`], {
    cwd: PROJECT_DIR,
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const tailInterval = null; // not used, kept for close handler compatibility

  claude.stdout.on('data', d => {
    const clean = d.toString().replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '').replace(/\r/g, '');
    job.output += clean;
  });
  claude.stderr.on('data', d => {
    const clean = d.toString().replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '').replace(/\r/g, '');
    job.output += clean;
  });

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
      'git pull --rebase origin main',
      'git push',
    ].join(' && ');

    const git = spawn('bash', ['-c', gitCmd], {
      cwd: PROJECT_DIR,
      env: { ...process.env },
    });

    git.stdout.on('data', d => { job.output += d.toString(); });
    git.stderr.on('data', d => { job.output += d.toString(); });

    git.on('close', gitCode => {
      job.output += gitCode === 0
        ? '\n── Push GitHub สำเร็จ! ──\n'
        : `\n[git ออกด้วย code ${gitCode}]\n`;
      job.status = gitCode === 0 ? 'done' : 'error';
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
    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #0a0a0a; color: #e0e0e0; min-height: 100vh; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; }

    /* Banner */
    .banner {
      position: relative; overflow: hidden;
      background: linear-gradient(135deg, #13111c 0%, #1a1030 50%, #0f0f1a 100%);
      border: 1px solid #2a1f4a; border-radius: 14px;
      padding: 22px 24px 20px; margin-bottom: 20px;
    }
    .banner::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 60%),
                  radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.1) 0%, transparent 50%);
      pointer-events: none;
    }
    .banner-glow {
      position: absolute; top: -1px; left: 24px; right: 24px; height: 1px;
      background: linear-gradient(90deg, transparent, #7c3aed, #a78bfa, #7c3aed, transparent);
    }
    .banner-content { position: relative; z-index: 1; }
    .banner-badge {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.3);
      border-radius: 20px; padding: 3px 10px; margin-bottom: 10px;
      font-size: 11px; font-weight: 600; color: #a78bfa; letter-spacing: 0.05em;
    }
    .banner-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #7c3aed; animation: pulse 2s infinite; }
    h1 { font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 4px; letter-spacing: -0.5px; }
    h1 span { color: #a78bfa; }
    .sub { font-size: 13px; color: #6b7280; margin-bottom: 0; }
    label { font-size: 13px; color: #999; display: block; margin-bottom: 6px; }
    textarea {
      width: 100%; height: 120px; padding: 14px; border-radius: 10px;
      border: 1px solid #2a2a2a; background: #1a1a1a; color: #fff;
      font-size: 15px; resize: vertical; outline: none;
    }
    textarea:focus { border-color: #7c3aed; }
    .row { display: flex; gap: 10px; margin-top: 10px; }
    button {
      flex: 1; padding: 14px; border-radius: 10px; border: none;
      background: #7c3aed; color: white; font-size: 15px; font-weight: 600; cursor: pointer;
    }
    button:disabled { background: #2a2a2a; color: #555; }
    #clearBtn { flex: 0; padding: 14px 18px; background: #1a1a1a; border: 1px solid #2a2a2a; color: #888; }

    /* Progress card */
    .progress-card {
      margin-top: 12px; padding: 14px 16px; border-radius: 10px;
      background: #1a1a1a; border: 1px solid #2a2a2a;
      display: none;
    }
    .progress-card.visible { display: block; }
    .progress-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .progress-label { font-size: 13px; font-weight: 600; color: #fff; display: flex; align-items: center; gap: 8px; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #444; flex-shrink: 0; display: inline-block; }
    .dot.running { background: #f59e0b; animation: pulse 1s infinite; }
    .dot.done { background: #10b981; }
    .dot.error { background: #ef4444; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
    .progress-meta { font-size: 12px; color: #666; }

    .progress-bar-bg {
      width: 100%; height: 6px; background: #2a2a2a; border-radius: 3px; overflow: hidden;
    }
    .progress-bar-fill {
      height: 100%; background: #7c3aed; border-radius: 3px;
      transition: width 1s ease; width: 0%;
    }
    .progress-bar-fill.done { background: #10b981; }
    .progress-bar-fill.error { background: #ef4444; }

    .stats { display: flex; gap: 16px; margin-top: 10px; }
    .stat { flex: 1; background: #111; border-radius: 8px; padding: 10px 12px; border: 1px solid #222; }
    .stat-val { font-size: 20px; font-weight: 700; color: #fff; }
    .stat-label { font-size: 11px; color: #666; margin-top: 2px; }

    #output {
      margin-top: 12px; padding: 14px; background: #111; border-radius: 10px;
      border: 1px solid #1e1e1e; font-family: 'SF Mono', Menlo, monospace;
      font-size: 11px; line-height: 1.6; white-space: pre-wrap;
      min-height: 160px; max-height: 50vh; overflow-y: auto; color: #aaa;
    }
    .idle-msg { color: #444; font-style: italic; }
  </style>
</head>
<body>
  <div class="container">
    <div class="banner">
      <div class="banner-glow"></div>
      <div class="banner-content">
        <div class="banner-badge">
          <span class="banner-badge-dot"></span>
          LIVE
        </div>
        <h1>Claude <span>Remote</span></h1>
        <p class="sub">สั่งแก้ code แล้ว push GitHub อัตโนมัติ</p>
      </div>
    </div>

    <label>คำสั่งให้ Claude</label>
    <textarea id="prompt" placeholder="เช่น: แก้ bug ใน app/page.tsx&#10;เพิ่ม dark mode ให้ header"></textarea>

    <div class="row">
      <button id="runBtn" onclick="run()">Run & Push</button>
      <button id="clearBtn" onclick="clearAll()">Clear</button>
    </div>

    <!-- Progress Card -->
    <div class="progress-card" id="progressCard">
      <div class="progress-header">
        <div class="progress-label">
          <span class="dot" id="dot"></span>
          <span id="statusText">รอ...</span>
        </div>
        <div class="progress-meta" id="progressPct">0%</div>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" id="progressBar"></div>
      </div>
      <div class="stats">
        <div class="stat">
          <div class="stat-val" id="elapsedVal">0:00</div>
          <div class="stat-label">เวลาที่ผ่านไป</div>
        </div>
        <div class="stat">
          <div class="stat-val" id="actionsVal">0</div>
          <div class="stat-label">actions ที่ทำแล้ว</div>
        </div>
        <div class="stat">
          <div class="stat-val" id="etaVal">?</div>
          <div class="stat-label">เหลืออีกประมาณ</div>
        </div>
      </div>
    </div>

    <div id="output"><span class="idle-msg">// ผลลัพธ์จะแสดงที่นี่...</span></div>
  </div>

  <script>
    let polling = null;
    let running = false;
    let startTime = null;
    let timerInterval = null;

    // Auto-resume on page load if a job is running
    window.addEventListener('load', async () => {
      try {
        const res = await fetch('/active');
        if (!res.ok) return;
        const data = await res.json();
        if (data.jobId && (data.status === 'running')) {
          running = true;
          startTime = Date.now() - (data.elapsed || 0);
          document.getElementById('progressCard').classList.add('visible');
          document.getElementById('runBtn').disabled = true;
          document.getElementById('runBtn').textContent = 'กำลังทำงาน...';
          if (data.prompt) document.getElementById('prompt').value = data.prompt;
          setStatus('running', 'Claude กำลังทำงาน... (resumed)');
          timerInterval = setInterval(() => {
            document.getElementById('elapsedVal').textContent = fmtTime(Date.now() - startTime);
          }, 1000);
          startPolling(data.jobId);
        }
      } catch(e) {}
    });

    function fmtTime(ms) {
      const s = Math.floor(ms / 1000);
      const m = Math.floor(s / 60);
      return m + ':' + String(s % 60).padStart(2, '0');
    }

    function estimateProgress(elapsedMs, actions, status) {
      if (status === 'done') return 100;
      if (status === 'error') return 100;
      // Curve: fast early, slow middle, faster near end (fake but feels good)
      const sec = elapsedMs / 1000;
      let pct = 0;
      if (sec < 10) pct = (sec / 10) * 8;          // 0-8% in first 10s
      else if (sec < 30) pct = 8 + ((sec-10)/20)*12; // 8-20% next 20s
      else if (sec < 90) pct = 20 + ((sec-30)/60)*35; // 20-55% next 60s
      else if (sec < 180) pct = 55 + ((sec-90)/90)*25; // 55-80% next 90s
      else pct = Math.min(88, 80 + (sec-180)/60*4);    // cap at 88%
      // Bump for each action detected
      pct = Math.min(88, pct + actions * 2);
      return Math.round(pct);
    }

    function estimateETA(elapsedMs, pct) {
      if (pct <= 0) return '?';
      if (pct >= 100) return '✓';
      const totalEst = elapsedMs / (pct / 100);
      const remaining = totalEst - elapsedMs;
      return fmtTime(remaining);
    }

    async function run() {
      if (running) return;
      const prompt = document.getElementById('prompt').value.trim();
      if (!prompt) { alert('กรุณาใส่คำสั่งก่อน'); return; }

      running = true;
      startTime = Date.now();

      document.getElementById('progressCard').classList.add('visible');
      setStatus('running', 'กำลังส่งคำสั่ง...');
      document.getElementById('output').innerHTML = '';
      document.getElementById('runBtn').disabled = true;
      document.getElementById('runBtn').textContent = 'กำลังทำงาน...';
      setProgress(2, 0);

      // Start elapsed timer
      timerInterval = setInterval(() => {
        const el = Date.now() - startTime;
        document.getElementById('elapsedVal').textContent = fmtTime(el);
      }, 1000);

      try {
        const res = await fetch('/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });
        const { jobId } = await res.json();
        setStatus('running', 'Claude กำลังแก้ code...');
        startPolling(jobId);
      } catch (e) {
        setStatus('error', 'เชื่อมต่อไม่ได้: ' + e.message);
        done();
      }
    }

    function startPolling(jobId) {
      polling = setInterval(async () => {
        try {
          const res = await fetch('/status/' + jobId);
          const data = await res.json();

          const elapsed = Date.now() - startTime;
          const actions = data.actions || 0;
          const pct = estimateProgress(elapsed, actions, data.status);
          const eta = estimateETA(elapsed, pct);

          setProgress(pct, actions, eta);
          document.getElementById('output').textContent = data.output || '';
          document.getElementById('output').scrollTop = 99999;

          if (data.status === 'done') {
            setStatus('done', 'Push GitHub สำเร็จ!');
            setProgress(100, actions, '✓');
            done();
          } else if (data.status === 'error') {
            setStatus('error', 'เกิดข้อผิดพลาด');
            setProgress(100, actions, '-');
            done();
          } else {
            setStatus('running', 'Claude กำลังแก้ code...');
          }
        } catch (e) {
          setStatus('error', 'polling error');
          done();
        }
      }, 2000);
    }

    function setProgress(pct, actions, eta) {
      const bar = document.getElementById('progressBar');
      bar.style.width = pct + '%';
      document.getElementById('progressPct').textContent = pct + '%';
      if (actions !== undefined) document.getElementById('actionsVal').textContent = actions;
      if (eta !== undefined) document.getElementById('etaVal').textContent = eta;
    }

    function setStatus(state, text) {
      document.getElementById('dot').className = 'dot ' + state;
      document.getElementById('statusText').textContent = text;
      const bar = document.getElementById('progressBar');
      bar.className = 'progress-bar-fill ' + (state !== 'running' ? state : '');
    }

    function done() {
      clearInterval(polling);
      clearInterval(timerInterval);
      running = false;
      document.getElementById('runBtn').disabled = false;
      document.getElementById('runBtn').textContent = 'Run & Push';
    }

    function clearAll() {
      if (running) return;
      document.getElementById('output').innerHTML = '<span class="idle-msg">// ผลลัพธ์จะแสดงที่นี่...</span>';
      document.getElementById('progressCard').classList.remove('visible');
    }
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(HTML);
    return;
  }

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
      jobs[jobId] = { status: 'running', output: '', prompt, startTime: Date.now() };
      runJob(jobId, prompt);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ jobId }));
    });
    return;
  }

  // Latest active job (for auto-resume after refresh)
  if (req.method === 'GET' && req.url === '/active') {
    const active = Object.entries(jobs)
      .map(([id, j]) => ({ ...j, jobId: id }))
      .filter(j => j.status === 'running')
      .sort((a, b) => b.startTime - a.startTime)[0];
    if (!active) { res.writeHead(204); res.end(); return; }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      jobId: active.jobId,
      status: active.status,
      output: active.output,
      prompt: active.prompt,
      actions: countActions(active.output),
      elapsed: Date.now() - active.startTime,
    }));
    return;
  }

  const statusMatch = req.url.match(/^\/status\/([a-z0-9]+)$/);
  if (req.method === 'GET' && statusMatch) {
    const job = jobs[statusMatch[1]];
    if (!job) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'not found' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: job.status,
      output: job.output,
      actions: countActions(job.output),
      elapsed: Date.now() - job.startTime,
    }));
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
