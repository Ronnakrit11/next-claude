"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        :root {
          --gold: #c9a84c;
          --gold-light: #e8c97a;
          --gold-dim: rgba(201, 168, 76, 0.12);
          --dark: #0c0c0c;
          --dark-2: #141414;
          --text-primary: #f0ece4;
          --text-muted: #7a7570;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .l-root {
          min-height: 100vh;
          background: var(--dark);
          display: flex;
          font-family: 'DM Sans', sans-serif;
          color: var(--text-primary);
          position: relative;
          overflow: hidden;
        }

        /* Subtle grid background */
        .l-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201, 168, 76, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 168, 76, 0.025) 1px, transparent 1px);
          background-size: 72px 72px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Left panel ── */
        .l-left {
          width: 46%;
          display: flex;
          flex-direction: column;
          padding: 56px 64px;
          position: relative;
          border-right: 1px solid var(--gold-dim);
          z-index: 1;
        }

        .l-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: var(--gold);
        }

        /* Orbital decorations */
        .l-orb-wrap {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .l-orb {
          position: absolute;
          border-radius: 50%;
          border: 1px solid var(--gold-dim);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .l-orb-1 { width: 220px; height: 220px; }
        .l-orb-2 { width: 360px; height: 360px; border-color: rgba(201,168,76,0.07); }
        .l-orb-3 { width: 500px; height: 500px; border-color: rgba(201,168,76,0.04); }

        .l-orb-dot {
          position: absolute;
          width: 7px;
          height: 7px;
          background: var(--gold);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 16px rgba(201, 168, 76, 0.6);
        }

        /* Tick marks on outer circle */
        .l-orb-tick {
          position: absolute;
          width: 1px;
          height: 10px;
          background: var(--gold);
          opacity: 0.4;
          top: 50%;
          left: 50%;
          transform-origin: 0 0;
        }

        .l-tagline {
          margin-top: auto;
          padding-bottom: 16px;
        }

        .l-tagline h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 4.5vw, 4.5rem);
          font-weight: 300;
          line-height: 1.08;
          color: var(--text-primary);
          letter-spacing: -0.025em;
        }

        .l-tagline h1 em {
          font-style: italic;
          color: var(--gold);
        }

        .l-tagline p {
          margin-top: 28px;
          font-size: 0.8125rem;
          color: var(--text-muted);
          line-height: 1.9;
          max-width: 320px;
          font-weight: 300;
          letter-spacing: 0.025em;
        }

        /* ── Right panel ── */
        .l-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 56px;
          position: relative;
          z-index: 1;
        }

        /* Corner bracket decorations */
        .l-corner {
          position: absolute;
          width: 22px;
          height: 22px;
        }
        .l-corner-tl { top: 52px; left: 52px; border-top: 1px solid rgba(201,168,76,0.35); border-left: 1px solid rgba(201,168,76,0.35); }
        .l-corner-tr { top: 52px; right: 52px; border-top: 1px solid rgba(201,168,76,0.35); border-right: 1px solid rgba(201,168,76,0.35); }
        .l-corner-bl { bottom: 52px; left: 52px; border-bottom: 1px solid rgba(201,168,76,0.35); border-left: 1px solid rgba(201,168,76,0.35); }
        .l-corner-br { bottom: 52px; right: 52px; border-bottom: 1px solid rgba(201,168,76,0.35); border-right: 1px solid rgba(201,168,76,0.35); }

        .l-form-wrap {
          width: 100%;
          max-width: 380px;
          animation: fadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .l-form-hd {
          margin-bottom: 52px;
        }

        .l-form-hd h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.75rem;
          font-weight: 400;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .l-form-hd p {
          margin-top: 14px;
          font-size: 0.78rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          font-weight: 300;
        }

        /* Fields */
        .l-field {
          margin-bottom: 32px;
        }

        .l-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .l-input-wrap {
          position: relative;
        }

        .l-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(201, 168, 76, 0.18);
          padding: 10px 36px 10px 0;
          font-size: 0.9375rem;
          color: var(--text-primary);
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          outline: none;
          letter-spacing: 0.02em;
          transition: border-color 0.3s ease;
        }

        .l-input::placeholder {
          color: rgba(122, 117, 112, 0.35);
          font-size: 0.875rem;
        }

        .l-input:focus {
          border-bottom-color: rgba(201, 168, 76, 0.5);
        }

        /* Animated underline on focus */
        .l-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1px;
          width: 0;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
          transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .l-input:focus ~ .l-underline {
          width: 100%;
        }

        .l-pw-btn {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-55%);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          padding: 4px;
          line-height: 0;
          transition: color 0.2s;
        }

        .l-pw-btn:hover { color: var(--gold); }

        .l-forgot {
          display: flex;
          justify-content: flex-end;
          margin-top: 10px;
        }

        .l-link {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-decoration: none;
          letter-spacing: 0.06em;
          transition: color 0.2s;
        }

        .l-link:hover { color: var(--gold); }

        /* Submit button */
        .l-submit {
          width: 100%;
          margin-top: 48px;
          padding: 15px 28px;
          background: var(--gold);
          color: #0c0c0c;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.25s ease, transform 0.15s ease;
          position: relative;
          overflow: hidden;
        }

        .l-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }

        .l-submit:hover { background: var(--gold-light); }
        .l-submit:hover::after { transform: translateX(100%); }
        .l-submit:active { transform: scale(0.985); }

        .l-submit.loading {
          opacity: 0.65;
          pointer-events: none;
        }

        .l-arrow { transition: transform 0.3s ease; }
        .l-submit:hover .l-arrow { transform: translateX(5px); }

        /* Divider */
        .l-divider {
          display: flex;
          align-items: center;
          gap: 18px;
          margin: 38px 0;
        }

        .l-div-line {
          flex: 1;
          height: 1px;
          background: var(--gold-dim);
        }

        .l-div-txt {
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          color: var(--text-muted);
        }

        .l-register {
          text-align: center;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 300;
          letter-spacing: 0.02em;
        }

        .l-register a {
          color: var(--gold);
          text-decoration: none;
          font-weight: 400;
          transition: opacity 0.2s;
        }

        .l-register a:hover { opacity: 0.75; }

        /* ── Mobile header (brand shown when left panel hidden) ── */
        .l-mobile-header {
          display: none;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .l-root {
            flex-direction: column;
            min-height: 100svh; /* small viewport units for mobile browsers */
            min-height: 100vh;  /* fallback */
          }

          .l-left { display: none; }

          /* Show brand at top on mobile */
          .l-mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 28px 24px 0;
            position: relative;
            z-index: 2;
          }

          .l-mobile-brand {
            font-family: 'Cormorant Garamond', serif;
            font-size: 0.9375rem;
            font-weight: 400;
            letter-spacing: 0.45em;
            text-transform: uppercase;
            color: var(--gold);
          }

          /* Small decorative dot */
          .l-mobile-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--gold);
            box-shadow: 0 0 10px rgba(201, 168, 76, 0.5);
          }

          .l-right {
            flex: 1;
            padding: 36px 24px calc(36px + env(safe-area-inset-bottom, 0px));
            /* Prevent iOS bounce from exposing dark bg */
            padding-left: max(24px, env(safe-area-inset-left, 24px));
            padding-right: max(24px, env(safe-area-inset-right, 24px));
            align-items: flex-start;
          }

          /* Tuck corners inward on mobile */
          .l-corner-tl { top: 20px; left: 20px; }
          .l-corner-tr { top: 20px; right: 20px; }
          .l-corner-bl { bottom: 20px; left: 20px; }
          .l-corner-br { bottom: 20px; right: 20px; }

          .l-form-wrap {
            max-width: 100%;
            padding-top: 8px;
          }

          .l-form-hd {
            margin-bottom: 36px;
          }

          .l-form-hd h2 {
            font-size: 2.25rem;
          }

          /* ⚠️ 16px minimum prevents iOS auto-zoom on focus */
          .l-input {
            font-size: 1rem;
            padding-top: 14px;
            padding-bottom: 14px;
          }

          .l-field {
            margin-bottom: 28px;
          }

          /* Larger touch target for submit */
          .l-submit {
            margin-top: 36px;
            padding: 18px 28px;
            font-size: 0.8rem;
            /* Prevent double-tap zoom on iOS */
            touch-action: manipulation;
          }

          /* Larger tap area for pw toggle */
          .l-pw-btn {
            padding: 10px;
            right: -6px;
          }

          .l-divider {
            margin: 30px 0;
          }

          .l-register {
            font-size: 0.875rem;
          }
        }

        /* ── Very small screens (SE, Galaxy A series) ── */
        @media (max-width: 375px) {
          .l-right {
            padding-left: 20px;
            padding-right: 20px;
          }

          .l-form-hd h2 {
            font-size: 2rem;
          }

          .l-mobile-header {
            padding: 24px 20px 0;
          }
        }
      `}</style>

      <div className="l-root">
        {/* ── Mobile-only header ── */}
        <div className="l-mobile-header">
          <span className="l-mobile-brand">Geek</span>
          <span className="l-mobile-dot" />
        </div>

        {/* ── Left decorative panel ── */}
        <div className="l-left">
          <div className="l-brand">Geek</div>

          {/* Orbital geometry */}
          <div className="l-orb-wrap">
            <div className="l-orb l-orb-1" />
            <div className="l-orb l-orb-2" />
            <div className="l-orb l-orb-3" />
            <div className="l-orb-dot" />
            {/* Tick marks at 12, 3, 6, 9 o'clock on the middle ring */}
            {[0, 90, 180, 270].map((deg) => (
              <div
                key={deg}
                className="l-orb-tick"
                style={{
                  transform: `rotate(${deg}deg) translateY(-180px)`,
                }}
              />
            ))}
          </div>

          <div className="l-tagline">
            <h1>
              Enter the<br />
              <em>inner</em><br />
              sanctum.
            </h1>
            <p>
              A curated space for those who demand more.
              Sign in to access your exclusive workspace.
            </p>
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div className="l-right">
          <div className="l-corner l-corner-tl" />
          <div className="l-corner l-corner-tr" />
          <div className="l-corner l-corner-bl" />
          <div className="l-corner l-corner-br" />

          <div className="l-form-wrap">
            <div className="l-form-hd">
              <h2>Welcome<br />back.</h2>
              <p>Sign in to continue your session</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="l-field">
                <label className="l-label">Email Address</label>
                <div className="l-input-wrap">
                  <input
                    type="email"
                    className="l-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                  <span className="l-underline" />
                </div>
              </div>

              <div className="l-field">
                <label className="l-label">Password</label>
                <div className="l-input-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="l-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <span className="l-underline" />
                  <button
                    type="button"
                    className="l-pw-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <div className="l-forgot">
                  <a href="#" className="l-link">Forgot password?</a>
                </div>
              </div>

              <button
                type="submit"
                className={`l-submit${isLoading ? " loading" : ""}`}
              >
                {isLoading ? (
                  "Authenticating..."
                ) : (
                  <>
                    Sign In
                    <span className="l-arrow">
                      <ArrowRight size={14} />
                    </span>
                  </>
                )}
              </button>
            </form>

            <div className="l-divider">
              <div className="l-div-line" />
              <span className="l-div-txt">or</span>
              <div className="l-div-line" />
            </div>

            <p className="l-register">
              Don&apos;t have an account?{" "}
              <a href="#">Request access</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
