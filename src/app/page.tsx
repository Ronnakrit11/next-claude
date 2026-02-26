"use client";

import Link from "next/link";
import {
  MessageSquare,
  Users,
  Zap,
  BarChart3,
  Shield,
  Globe,
  ArrowRight,
  Check,
  Bell,
  Search,
} from "lucide-react";

const platforms = [
  { name: "LINE", cls: "av-line", abbr: "L", color: "#06C755" },
  { name: "Facebook Messenger", cls: "av-fb", abbr: "M", color: "#1877F2" },
  { name: "WhatsApp", cls: "av-wa", abbr: "W", color: "#25D366" },
  { name: "Instagram", cls: "av-ig", abbr: "IG", color: "#E1306C" },
  { name: "Telegram", cls: "av-tg", abbr: "TG", color: "#229ED9" },
  { name: "Twitter / X", cls: "av-tt", abbr: "𝕏", color: "#fff" },
  { name: "SMS", cls: "av-sms", abbr: "SMS", color: "#FF6B00" },
  { name: "Email", cls: "av-email", abbr: "@", color: "#EA4335" },
  { name: "WeChat", cls: "av-wc", abbr: "WC", color: "#07C160" },
  { name: "Viber", cls: "av-vb", abbr: "V", color: "#7360F2" },
];

const features = [
  {
    icon: <MessageSquare size={20} />,
    name: "Unified Inbox",
    desc: "รวมทุกข้อความจากทุก platform เข้าในกล่องเดียว ไม่พลาดทุกการสนทนาของลูกค้า",
  },
  {
    icon: <Users size={20} />,
    name: "Team Collaboration",
    desc: "กระจายงานให้ทีม assign เคส ส่งต่อสนทนา และติดตามสถานะแบบ real-time",
  },
  {
    icon: <Zap size={20} />,
    name: "AI Auto-Reply",
    desc: "ระบบ AI ตอบโต้อัตโนมัติตลอด 24 ชั่วโมง เรียนรู้ข้อมูลธุรกิจและตอบคำถามได้อย่างแม่นยำ",
  },
  {
    icon: <BarChart3 size={20} />,
    name: "Analytics & Reports",
    desc: "วิเคราะห์ข้อมูลเชิงลึก ดู response time, customer satisfaction และ team performance",
  },
  {
    icon: <Globe size={20} />,
    name: "Multi-Channel Broadcast",
    desc: "ส่งข้อความหาลูกค้าพร้อมกันทุก channel ในครั้งเดียว สร้าง campaign ได้ง่ายดาย",
  },
  {
    icon: <Shield size={20} />,
    name: "Enterprise Security",
    desc: "ระบบรักษาความปลอดภัยระดับ enterprise พร้อม end-to-end encryption และ audit logs",
  },
];

const conversations = [
  { name: "สมชาย ใจดี", platform: "av-line", platformName: "LINE", active: true },
  { name: "Priya Kumar", platform: "av-fb", platformName: "Messenger" },
  { name: "ณัฐนิช ม.", platform: "av-wa", platformName: "WhatsApp" },
  { name: "alex_design", platform: "av-ig", platformName: "Instagram" },
  { name: "Dmitry V.", platform: "av-tg", platformName: "Telegram" },
];

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .h-root *, .h-root *::before, .h-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .h-root {
          min-height: 100vh;
          background: #0c0c0c;
          font-family: 'DM Sans', sans-serif;
          color: #f0ece4;
          overflow-x: hidden;
          position: relative;
        }

        .h-grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.022) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none;
          z-index: 0;
        }

        .h-glow-top {
          position: fixed;
          top: -25%;
          left: 50%;
          transform: translateX(-50%);
          width: 1000px;
          height: 700px;
          background: radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 68%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Navbar ── */
        .h-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 52px;
          background: rgba(12,12,12,0.88);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(201,168,76,0.07);
        }

        .h-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 500;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #c9a84c;
          text-decoration: none;
        }

        .h-nav-links {
          display: flex;
          align-items: center;
          gap: 38px;
          list-style: none;
        }

        .h-nav-link {
          font-size: 0.77rem;
          letter-spacing: 0.07em;
          color: #6a6560;
          text-decoration: none;
          transition: color 0.2s;
          font-weight: 400;
        }
        .h-nav-link:hover { color: #f0ece4; }

        .h-nav-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .h-nav-login {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.74rem;
          letter-spacing: 0.08em;
          color: #6a6560;
          text-decoration: none;
          padding: 8px 14px;
          transition: color 0.2s;
        }
        .h-nav-login:hover { color: #f0ece4; }

        .h-nav-cta {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0c0c0c;
          background: #c9a84c;
          text-decoration: none;
          padding: 10px 22px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.25s;
        }
        .h-nav-cta:hover { background: #e8c97a; }
        .h-nav-cta:hover .nav-arrow { transform: translateX(4px); }
        .nav-arrow { transition: transform 0.3s; }

        /* ── Hero ── */
        .h-hero {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 68px 52px 0;
          gap: 72px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .h-hero-left {
          flex: 1;
          padding-top: 48px;
          padding-bottom: 48px;
          animation: heroFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .h-badge {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 6px 14px 6px 10px;
          border: 1px solid rgba(201,168,76,0.28);
          background: rgba(201,168,76,0.04);
          margin-bottom: 36px;
          cursor: default;
          transition: border-color 0.3s;
        }
        .h-badge:hover { border-color: rgba(201,168,76,0.5); }

        .h-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c9a84c;
          box-shadow: 0 0 8px rgba(201,168,76,0.55);
          animation: pulseDot 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.55; transform: scale(0.82); }
        }

        .h-badge-text {
          font-size: 0.69rem;
          letter-spacing: 0.1em;
          color: #c9a84c;
          font-weight: 500;
        }

        .h-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.6rem, 5.5vw, 5.6rem);
          font-weight: 400;
          line-height: 1.04;
          letter-spacing: -0.025em;
          color: #f0ece4;
          margin-bottom: 26px;
        }

        .h-hero-title em {
          font-style: italic;
          color: #c9a84c;
        }

        .h-hero-sub {
          font-size: 1rem;
          line-height: 1.85;
          color: #6a6560;
          max-width: 460px;
          margin-bottom: 44px;
          font-weight: 300;
        }

        .h-hero-ctas {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 60px;
          flex-wrap: wrap;
        }

        .h-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 30px;
          background: #c9a84c;
          color: #0c0c0c;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.25s;
          position: relative;
          overflow: hidden;
        }
        .h-cta-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.14) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.5s;
        }
        .h-cta-primary:hover { background: #e8c97a; }
        .h-cta-primary:hover::after { transform: translateX(100%); }
        .h-cta-primary:hover .cta-arrow { transform: translateX(4px); }
        .cta-arrow { transition: transform 0.3s; }

        .h-cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 26px;
          border: 1px solid rgba(201,168,76,0.2);
          color: #6a6560;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.76rem;
          font-weight: 400;
          letter-spacing: 0.07em;
          text-decoration: none;
          transition: all 0.25s;
        }
        .h-cta-ghost:hover {
          border-color: rgba(201,168,76,0.42);
          color: #f0ece4;
        }

        .h-hero-stats {
          display: flex;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
        }

        .h-stat-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .h-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 500;
          color: #f0ece4;
          line-height: 1;
        }

        .h-stat-lbl {
          font-size: 0.67rem;
          color: #6a6560;
          letter-spacing: 0.07em;
          font-weight: 300;
        }

        .h-stat-sep {
          width: 1px;
          height: 34px;
          background: rgba(201,168,76,0.1);
        }

        /* ── Hero Right: Chat Mockup ── */
        .h-hero-right {
          flex: 1.15;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 100px;
          padding-bottom: 48px;
          position: relative;
          animation: heroFadeUp 0.7s 0.15s cubic-bezier(0.22,1,0.36,1) both;
        }

        .h-mockup-wrap {
          position: relative;
          width: 100%;
          max-width: 580px;
        }

        .h-mockup {
          width: 100%;
          background: #141414;
          border: 1px solid rgba(201,168,76,0.1);
          overflow: hidden;
          animation: floatMock 7s ease-in-out infinite;
          box-shadow:
            0 48px 120px rgba(0,0,0,0.65),
            0 0 80px rgba(201,168,76,0.035),
            inset 0 1px 0 rgba(201,168,76,0.07);
        }

        @keyframes floatMock {
          0%, 100% { transform: translateY(0) rotate(-0.4deg); }
          50%       { transform: translateY(-14px) rotate(0.4deg); }
        }

        .h-mock-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: #0f0f0f;
          border-bottom: 1px solid rgba(255,255,255,0.035);
        }

        .h-mock-dots {
          display: flex;
          gap: 7px;
        }

        .h-mock-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }
        .dot-r { background: #ff5f57; }
        .dot-y { background: #febc2e; }
        .dot-g { background: #28c840; }

        .h-mock-title-text {
          font-size: 0.67rem;
          color: #4a4540;
          letter-spacing: 0.1em;
          font-family: 'DM Sans', sans-serif;
        }

        .h-mock-icons {
          display: flex;
          gap: 10px;
          color: #4a4540;
        }

        .h-mock-body {
          display: flex;
          height: 380px;
        }

        /* Sidebar */
        .h-mock-sidebar {
          width: 192px;
          border-right: 1px solid rgba(255,255,255,0.035);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }

        .h-mock-search {
          padding: 10px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.025);
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .h-mock-search-bar {
          height: 4px;
          background: rgba(255,255,255,0.04);
          border-radius: 2px;
          flex: 1;
        }

        .h-conv-list {
          flex: 1;
          overflow: hidden;
        }

        .h-conv {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.02);
          cursor: pointer;
          transition: background 0.2s;
          position: relative;
        }

        .h-conv.h-conv-active {
          background: rgba(201,168,76,0.06);
        }

        .h-conv-active-bar {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #c9a84c;
        }

        .h-conv-av {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.52rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: #fff;
        }

        .av-line  { background: #06C755; }
        .av-fb    { background: linear-gradient(135deg, #1877F2, #42A5F5); }
        .av-wa    { background: #25D366; }
        .av-ig    { background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045); }
        .av-tg    { background: #229ED9; }
        .av-tt    { background: #000; border: 1px solid rgba(255,255,255,0.12); }
        .av-sms   { background: #FF6B00; }
        .av-email { background: #EA4335; }
        .av-wc    { background: #07C160; }
        .av-vb    { background: #7360F2; }

        .h-conv-info {
          flex: 1;
          overflow: hidden;
        }

        .h-conv-name {
          font-size: 0.6rem;
          color: #b0aaa4;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 4px;
        }

        .h-conv-preview-bar {
          height: 4px;
          background: rgba(255,255,255,0.055);
          border-radius: 2px;
          width: 80%;
        }

        .h-conv-platform-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* Chat area */
        .h-mock-chat {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .h-mock-chat-hdr {
          padding: 11px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .h-platform-badge {
          font-size: 0.52rem;
          padding: 2px 7px;
          background: rgba(6,199,85,0.12);
          color: #06C755;
          font-weight: 700;
          letter-spacing: 0.06em;
        }

        .h-chat-contact {
          font-size: 0.66rem;
          color: #b0aaa4;
          font-weight: 500;
        }

        .h-chat-status {
          margin-left: auto;
          font-size: 0.55rem;
          color: #06C755;
          letter-spacing: 0.06em;
        }

        .h-mock-messages {
          flex: 1;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow: hidden;
        }

        .h-msg {
          display: flex;
          gap: 8px;
          animation: msgIn 0.45s ease both;
        }

        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .h-msg-av {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .h-msg-bubble {
          max-width: 70%;
          padding: 8px 12px;
          border-radius: 0 8px 8px 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.04);
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .h-msg-line {
          height: 5px;
          background: rgba(255,255,255,0.11);
          border-radius: 3px;
        }

        .h-msg-line-short {
          width: 60%;
          height: 5px;
          background: rgba(255,255,255,0.07);
          border-radius: 3px;
        }

        .h-msg.h-msg-self { flex-direction: row-reverse; }

        .h-msg.h-msg-self .h-msg-bubble {
          background: rgba(201,168,76,0.1);
          border-color: rgba(201,168,76,0.14);
          border-radius: 8px 0 8px 8px;
        }

        .h-msg.h-msg-self .h-msg-line { background: rgba(201,168,76,0.22); }
        .h-msg.h-msg-self .h-msg-line-short { background: rgba(201,168,76,0.14); }

        .h-msg-typing {
          display: flex;
          gap: 8px;
          padding: 2px 0;
        }

        .h-typing-av {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          flex-shrink: 0;
          background: #06C755;
          margin-top: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.44rem;
          font-weight: 700;
          color: #fff;
        }

        .h-typing-bubble {
          padding: 10px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 0 8px 8px 8px;
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .h-typing-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          animation: typingBounce 1.4s ease-in-out infinite;
        }

        .h-typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .h-typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.2; }
          40%            { transform: translateY(-4px); opacity: 0.8; }
        }

        .h-mock-input-area {
          padding: 10px 14px;
          border-top: 1px solid rgba(255,255,255,0.03);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .h-mock-input-bar {
          flex: 1;
          height: 28px;
          background: rgba(255,255,255,0.035);
          border-radius: 4px;
        }

        .h-mock-send-btn {
          width: 28px;
          height: 28px;
          background: rgba(201,168,76,0.14);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Floating cards on mockup */
        .h-float-card {
          position: absolute;
          background: #141414;
          border: 1px solid rgba(201,168,76,0.18);
          padding: 11px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.45);
          z-index: 5;
          min-width: 160px;
        }

        .h-float-1 {
          top: -14px;
          right: -18px;
          animation: floatCard1 5s ease-in-out infinite;
        }

        .h-float-2 {
          bottom: 24px;
          left: -20px;
          animation: floatCard2 6s ease-in-out infinite;
          animation-delay: 0.8s;
        }

        @keyframes floatCard1 {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }

        @keyframes floatCard2 {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(7px); }
        }

        .h-float-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .fi-green { background: rgba(6,199,85,0.1); color: #06C755; }
        .fi-blue  { background: rgba(34,158,217,0.1); color: #229ED9; }

        .h-float-body {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .h-float-val {
          font-size: 0.74rem;
          color: #f0ece4;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
        }

        .h-float-lbl {
          font-size: 0.6rem;
          color: #6a6560;
          font-weight: 300;
        }

        /* ── Platform Marquee ── */
        .h-platforms {
          position: relative;
          z-index: 1;
          padding: 56px 0;
          border-top: 1px solid rgba(201,168,76,0.06);
          border-bottom: 1px solid rgba(201,168,76,0.06);
          overflow: hidden;
        }

        .h-platforms-eyebrow {
          text-align: center;
          font-size: 0.63rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #6a6560;
          margin-bottom: 28px;
        }

        .h-marquee-outer {
          overflow: hidden;
          position: relative;
        }

        .h-marquee-outer::before,
        .h-marquee-outer::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }

        .h-marquee-outer::before {
          left: 0;
          background: linear-gradient(90deg, #0c0c0c, transparent);
        }

        .h-marquee-outer::after {
          right: 0;
          background: linear-gradient(-90deg, #0c0c0c, transparent);
        }

        .h-marquee-track {
          display: flex;
          gap: 56px;
          animation: marqueeScroll 28s linear infinite;
          width: max-content;
          align-items: center;
        }

        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .h-plat-item {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          opacity: 0.45;
          transition: opacity 0.3s;
        }
        .h-plat-item:hover { opacity: 0.85; }

        .h-plat-icon {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 800;
          color: #fff;
          flex-shrink: 0;
        }

        .h-plat-name {
          font-size: 0.8rem;
          color: #c0bab4;
          font-weight: 400;
          white-space: nowrap;
        }

        /* ── Features ── */
        .h-section {
          position: relative;
          z-index: 1;
          max-width: 1240px;
          margin: 0 auto;
          padding: 104px 52px;
        }

        .h-eyebrow {
          font-size: 0.63rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 18px;
          font-weight: 500;
        }

        .h-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 4vw, 3.6rem);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #f0ece4;
          margin-bottom: 18px;
          max-width: 580px;
        }

        .h-section-title em { font-style: italic; color: #c9a84c; }

        .h-section-sub {
          font-size: 0.88rem;
          color: #6a6560;
          line-height: 1.85;
          max-width: 480px;
          font-weight: 300;
          margin-bottom: 64px;
        }

        .h-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(201,168,76,0.055);
          border: 1px solid rgba(201,168,76,0.055);
        }

        .h-feat-card {
          background: #0c0c0c;
          padding: 40px 36px;
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
        }

        .h-feat-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.04) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.35s;
          pointer-events: none;
        }

        .h-feat-card:hover { background: #111; }
        .h-feat-card:hover::after { opacity: 1; }

        .h-feat-icon {
          width: 44px;
          height: 44px;
          border: 1px solid rgba(201,168,76,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a84c;
          margin-bottom: 26px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .h-feat-card:hover .h-feat-icon {
          border-color: rgba(201,168,76,0.45);
          box-shadow: 0 0 20px rgba(201,168,76,0.06);
        }

        .h-feat-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.28rem;
          font-weight: 500;
          color: #f0ece4;
          margin-bottom: 14px;
          letter-spacing: -0.01em;
        }

        .h-feat-desc {
          font-size: 0.79rem;
          color: #6a6560;
          line-height: 1.75;
          font-weight: 300;
        }

        /* ── Stats Bar ── */
        .h-stats-bar {
          position: relative;
          z-index: 1;
          background: rgba(201,168,76,0.025);
          border-top: 1px solid rgba(201,168,76,0.06);
          border-bottom: 1px solid rgba(201,168,76,0.06);
          padding: 72px 52px;
        }

        .h-stats-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .h-stat-big {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
        }

        .h-stat-big-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.6rem;
          font-weight: 400;
          color: #f0ece4;
          line-height: 1;
        }

        .h-stat-big-val span { color: #c9a84c; }

        .h-stat-big-lbl {
          font-size: 0.7rem;
          color: #6a6560;
          letter-spacing: 0.1em;
          font-weight: 300;
        }

        /* ── Pricing ── */
        .h-pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(201,168,76,0.055);
          border: 1px solid rgba(201,168,76,0.055);
          margin-top: 64px;
        }

        .h-price-card {
          background: #0c0c0c;
          padding: 44px 36px;
          position: relative;
          transition: background 0.3s;
        }

        .h-price-card:hover { background: #0f0f0f; }

        .h-price-card.h-featured {
          background: rgba(201,168,76,0.04);
        }

        .h-price-badge {
          display: inline-block;
          font-size: 0.58rem;
          letter-spacing: 0.17em;
          text-transform: uppercase;
          color: #c9a84c;
          border: 1px solid rgba(201,168,76,0.28);
          padding: 3px 10px;
          margin-bottom: 28px;
          font-weight: 500;
        }

        .h-price-plan {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 500;
          color: #f0ece4;
          margin-bottom: 8px;
        }

        .h-price-desc {
          font-size: 0.76rem;
          color: #6a6560;
          font-weight: 300;
          margin-bottom: 32px;
          line-height: 1.65;
        }

        .h-price-amount {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.2rem;
          font-weight: 400;
          color: #f0ece4;
          line-height: 1;
          margin-bottom: 6px;
        }

        .h-price-amount sup {
          font-size: 1.2rem;
          vertical-align: top;
          margin-top: 10px;
          display: inline-block;
          color: #6a6560;
        }

        .h-price-period {
          font-size: 0.68rem;
          color: #6a6560;
          margin-bottom: 32px;
          letter-spacing: 0.05em;
        }

        .h-price-divider {
          height: 1px;
          background: rgba(201,168,76,0.06);
          margin-bottom: 28px;
        }

        .h-price-features-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 13px;
          margin-bottom: 36px;
        }

        .h-pf-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.78rem;
          color: #6a6560;
          font-weight: 300;
          line-height: 1.5;
        }

        .h-pf-check { color: #c9a84c; flex-shrink: 0; margin-top: 1px; }

        .h-price-btn {
          display: block;
          width: 100%;
          padding: 14px 24px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          border: 1px solid rgba(201,168,76,0.24);
          background: transparent;
          color: #c9a84c;
          transition: all 0.25s;
          text-decoration: none;
          text-align: center;
        }

        .h-price-btn:hover {
          background: rgba(201,168,76,0.07);
          border-color: rgba(201,168,76,0.45);
        }

        .h-price-btn.h-price-btn-solid {
          background: #c9a84c;
          border-color: #c9a84c;
          color: #0c0c0c;
        }

        .h-price-btn.h-price-btn-solid:hover {
          background: #e8c97a;
          border-color: #e8c97a;
        }

        /* ── CTA Section ── */
        .h-cta-section {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 120px 52px 100px;
          border-top: 1px solid rgba(201,168,76,0.06);
          overflow: hidden;
        }

        .h-cta-glow {
          position: absolute;
          bottom: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(201,168,76,0.055) 0%, transparent 68%);
          pointer-events: none;
        }

        .h-cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 5vw, 4.8rem);
          font-weight: 300;
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: #f0ece4;
          margin-bottom: 22px;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
        }

        .h-cta-title em { font-style: italic; color: #c9a84c; }

        .h-cta-sub {
          font-size: 0.9rem;
          color: #6a6560;
          margin-bottom: 48px;
          font-weight: 300;
          max-width: 440px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.8;
        }

        .h-cta-btns {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        /* ── Footer ── */
        .h-footer-wrap {
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(201,168,76,0.06);
          padding: 64px 52px 44px;
          max-width: 1240px;
          margin: 0 auto;
        }

        .h-footer-top {
          display: flex;
          justify-content: space-between;
          gap: 48px;
          margin-bottom: 52px;
        }

        .h-footer-brand-col {
          max-width: 280px;
        }

        .h-footer-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #c9a84c;
          text-decoration: none;
          display: block;
          margin-bottom: 16px;
        }

        .h-footer-tagline {
          font-size: 0.77rem;
          color: #6a6560;
          line-height: 1.75;
          font-weight: 300;
        }

        .h-footer-links-row {
          display: flex;
          gap: 64px;
        }

        .h-footer-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .h-footer-col-title {
          font-size: 0.58rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #6a6560;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .h-footer-link {
          font-size: 0.77rem;
          color: #454540;
          text-decoration: none;
          transition: color 0.2s;
          font-weight: 300;
        }

        .h-footer-link:hover { color: #b0aaa4; }

        .h-footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 32px;
          border-top: 1px solid rgba(201,168,76,0.04);
          flex-wrap: wrap;
          gap: 12px;
        }

        .h-footer-copy {
          font-size: 0.66rem;
          color: #454540;
          letter-spacing: 0.06em;
          font-weight: 300;
        }

        .h-footer-legal {
          display: flex;
          gap: 24px;
        }

        .h-brand-hero-mobile {
          display: none;
          padding-top: 20px;
          text-align: left;
        }

        /* ── Responsive ── */
        @media (max-width: 1080px) {
          .h-hero { flex-direction: column; padding: 90px 36px 56px; gap: 56px; }
          .h-hero-right { width: 100%; padding-top: 0; }
          .h-float-2 { display: none; }
          .h-nav-links { display: none; }
        }

        @media (max-width: 768px) {
          .h-nav { padding: 0 24px; }
          .h-hero { padding: 80px 24px 48px; gap: 44px; }
          .h-hero-stats { gap: 20px; }
          .h-hero-ctas { gap: 10px; }
          .h-float-1 { display: none; }
          .h-features-grid { grid-template-columns: 1fr; }
          .h-stats-inner { grid-template-columns: repeat(2, 1fr); }
          .h-pricing-grid { grid-template-columns: 1fr; }
          .h-section { padding: 64px 24px; }
          .h-stats-bar { padding: 56px 24px; }
          .h-cta-section { padding: 80px 24px; }
          .h-footer-wrap { padding: 48px 24px 36px; }
          .h-footer-top { flex-direction: column; }
          .h-footer-links-row { flex-wrap: wrap; gap: 36px; }
          .h-mock-sidebar { width: 150px; }
          .h-platforms { padding: 44px 0; }
          .h-brand-section { display: none; }
          .h-brand-hero-mobile { display: block; }
        }
      `}</style>

      <div className="h-root">
        <div className="h-grid-bg" />
        <div className="h-glow-top" />

        {/* ── Navbar ── */}
        <nav className="h-nav">
          <Link href="/" className="h-logo">Geek</Link>

          <ul className="h-nav-links">
            {["Features", "Integrations", "Pricing", "Enterprise"].map((item) => (
              <li key={item}>
                <a href="#" className="h-nav-link">{item}</a>
              </li>
            ))}
          </ul>

          <div className="h-nav-actions">
            <Link href="/login" className="h-nav-login">เข้าสู่ระบบ</Link>
            <Link href="/login" className="h-nav-cta">
              เริ่มฟรี
              <ArrowRight size={13} className="nav-arrow" />
            </Link>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="h-hero">
          {/* Left */}
          <div className="h-hero-left">
            <div className="h-badge">
              <span className="h-badge-dot" />
              <span className="h-badge-text">ใหม่ — AI Auto-Reply ตอบแทนคุณตลอด 24 ชม.</span>
            </div>

            <h1 className="h-hero-title">
              รวมแชทได้ไม่จำกัด <em>Channel.</em>
            </h1>

            <p className="h-hero-sub">
              รวม LINE, Facebook, WhatsApp, Instagram และอีกกว่า 10 แพลตฟอร์ม
              เข้าสู่ระบบเดียว บริหารทีม ติดตามลูกค้า และเติบโตอย่างมีประสิทธิภาพ
            </p>

            <div className="h-hero-ctas">
              <Link href="/login" className="h-cta-primary">
                เริ่มต้นฟรี 14 วัน
                <ArrowRight size={14} className="cta-arrow" />
              </Link>
              <a href="#" className="h-cta-ghost">
                ดูวิดีโอสาธิต
              </a>
            </div>

            <div className="h-hero-stats">
              <div className="h-stat-item">
                <span className="h-stat-val">10,000+</span>
                <span className="h-stat-lbl">ธุรกิจที่ไว้วางใจ</span>
              </div>
              <div className="h-stat-sep" />
              <div className="h-stat-item">
                <span className="h-stat-val">50M+</span>
                <span className="h-stat-lbl">ข้อความต่อเดือน</span>
              </div>
              <div className="h-stat-sep" />
              <div className="h-stat-item">
                <span className="h-stat-val">99.9%</span>
                <span className="h-stat-lbl">Uptime SLA</span>
              </div>
            </div>

            {/* Mobile-only brand name */}
            <div className="h-brand-hero-mobile">
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.6rem",
                fontWeight: 500,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#c9a84c",
              }}>
                Geek
              </span>
            </div>
          </div>

          {/* Right: Chat Mockup */}
          <div className="h-hero-right">
            <div className="h-mockup-wrap">
              {/* Floating card 1 */}
              <div className="h-float-card h-float-1">
                <div className="h-float-icon fi-green">
                  <Bell size={14} />
                </div>
                <div className="h-float-body">
                  <span className="h-float-val">+128 ข้อความใหม่</span>
                  <span className="h-float-lbl">ใน 5 นาทีที่ผ่านมา</span>
                </div>
              </div>

              {/* Floating card 2 */}
              <div className="h-float-card h-float-2">
                <div className="h-float-icon fi-blue">
                  <Zap size={14} />
                </div>
                <div className="h-float-body">
                  <span className="h-float-val">AI ตอบแล้ว 94%</span>
                  <span className="h-float-lbl">อัตราตอบอัตโนมัติ</span>
                </div>
              </div>

              {/* Mockup Window */}
              <div className="h-mockup">
                {/* Top bar */}
                <div className="h-mock-bar">
                  <div className="h-mock-dots">
                    <div className="h-mock-dot dot-r" />
                    <div className="h-mock-dot dot-y" />
                    <div className="h-mock-dot dot-g" />
                  </div>
                  <span className="h-mock-title-text">Geek Inbox</span>
                  <div className="h-mock-icons">
                    <Search size={12} />
                    <Bell size={12} />
                  </div>
                </div>

                <div className="h-mock-body">
                  {/* Sidebar conversations */}
                  <div className="h-mock-sidebar">
                    <div className="h-mock-search">
                      <Search size={10} className="h-mock-search-icon" style={{ color: "#4a4540", flexShrink: 0 }} />
                      <div className="h-mock-search-bar" />
                    </div>
                    <div className="h-conv-list">
                      {conversations.map((conv, i) => (
                        <div key={i} className={`h-conv ${conv.active ? "h-conv-active" : ""}`}>
                          {conv.active && <div className="h-conv-active-bar" />}
                          <div className={`h-conv-av ${conv.platform}`}>
                            {conv.name.slice(0, 1)}
                          </div>
                          <div className="h-conv-info">
                            <div className="h-conv-name">{conv.name}</div>
                            <div className="h-conv-preview-bar" />
                          </div>
                          <div
                            className="h-conv-platform-dot"
                            style={{
                              background:
                                conv.platform === "av-line" ? "#06C755"
                                  : conv.platform === "av-fb" ? "#1877F2"
                                  : conv.platform === "av-wa" ? "#25D366"
                                  : conv.platform === "av-ig" ? "#E1306C"
                                  : "#229ED9",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="h-mock-chat">
                    <div className="h-mock-chat-hdr">
                      <div className="h-conv-av av-line" style={{ width: 26, height: 26, fontSize: "0.5rem" }}>ส</div>
                      <span className="h-platform-badge">LINE</span>
                      <span className="h-chat-contact">สมชาย ใจดี</span>
                      <span className="h-chat-status">● Online</span>
                    </div>

                    <div className="h-mock-messages">
                      <div className="h-msg" style={{ animationDelay: "0.2s" }}>
                        <div className="h-conv-av av-line h-msg-av" style={{ width: 24, height: 24, fontSize: "0.48rem" }}>ส</div>
                        <div className="h-msg-bubble">
                          <div className="h-msg-line" />
                          <div className="h-msg-line" style={{ width: "85%" }} />
                          <div className="h-msg-line-short" />
                        </div>
                      </div>

                      <div className="h-msg h-msg-self" style={{ animationDelay: "0.5s" }}>
                        <div className="h-msg-bubble">
                          <div className="h-msg-line" style={{ width: "90%" }} />
                          <div className="h-msg-line-short" />
                        </div>
                      </div>

                      <div className="h-msg" style={{ animationDelay: "0.8s" }}>
                        <div className="h-conv-av av-line h-msg-av" style={{ width: 24, height: 24, fontSize: "0.48rem" }}>ส</div>
                        <div className="h-msg-bubble">
                          <div className="h-msg-line" />
                          <div className="h-msg-line-short" />
                        </div>
                      </div>

                      <div className="h-msg h-msg-self" style={{ animationDelay: "1.1s" }}>
                        <div className="h-msg-bubble">
                          <div className="h-msg-line" style={{ width: "75%" }} />
                          <div className="h-msg-line" />
                          <div className="h-msg-line-short" />
                        </div>
                      </div>

                      <div className="h-msg-typing" style={{ animationDelay: "1.4s" }}>
                        <div className="h-typing-av">ส</div>
                        <div className="h-typing-bubble">
                          <div className="h-typing-dot" />
                          <div className="h-typing-dot" />
                          <div className="h-typing-dot" />
                        </div>
                      </div>
                    </div>

                    <div className="h-mock-input-area">
                      <div className="h-mock-input-bar" />
                      <div className="h-mock-send-btn">
                        <ArrowRight size={11} style={{ color: "#c9a84c" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Brand Name ── */}
        <div className="h-brand-section" style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "24px 0 8px",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 500,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#c9a84c",
          }}>
            Geek
          </span>
        </div>

        {/* ── Platform Marquee ── */}
        <section className="h-platforms">
          <p className="h-platforms-eyebrow">เชื่อมต่อครบทุกแพลตฟอร์มที่คุณใช้</p>
          <div className="h-marquee-outer">
            <div className="h-marquee-track">
              {[...platforms, ...platforms].map((p, i) => (
                <div key={i} className="h-plat-item">
                  <div
                    className={`h-plat-icon ${p.cls}`}
                    style={{ background: p.cls === "av-ig" ? "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" : p.cls === "av-fb" ? "linear-gradient(135deg,#1877F2,#42A5F5)" : p.color }}
                  >
                    {p.abbr}
                  </div>
                  <span className="h-plat-name">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="h-section">
          <p className="h-eyebrow">ฟีเจอร์หลัก</p>
          <h2 className="h-section-title">
            ทุกสิ่งที่คุณต้องการ<br />
            ใน<em> Platform</em> เดียว
          </h2>
          <p className="h-section-sub">
            ออกแบบมาเพื่อทีม Customer Support ทุกขนาด ตั้งแต่ธุรกิจเล็กไปจนถึง Enterprise
          </p>

          <div className="h-features-grid">
            {features.map((feat, i) => (
              <div key={i} className="h-feat-card">
                <div className="h-feat-icon">{feat.icon}</div>
                <h3 className="h-feat-name">{feat.name}</h3>
                <p className="h-feat-desc">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Stats ── */}
        <div className="h-stats-bar">
          <div className="h-stats-inner">
            {[
              { val: "10K", sup: "+", lbl: "ธุรกิจที่ใช้งาน" },
              { val: "50M", sup: "+", lbl: "ข้อความต่อเดือน" },
              { val: "4.9", sup: "★", lbl: "คะแนนความพึงพอใจ" },
              { val: "99.9", sup: "%", lbl: "Uptime รับประกัน" },
            ].map((s, i) => (
              <div key={i} className="h-stat-big">
                <div className="h-stat-big-val">
                  {s.val}<span>{s.sup}</span>
                </div>
                <div className="h-stat-big-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Pricing ── */}
        <section className="h-section" style={{ paddingTop: "100px" }}>
          <p className="h-eyebrow">แพ็กเกจราคา</p>
          <h2 className="h-section-title">
            ราคาที่<em> ยุติธรรม</em><br />
            สำหรับทุกขนาดธุรกิจ
          </h2>
          <p className="h-section-sub">
            ไม่มีค่าใช้จ่ายแอบแฝง ยกเลิกได้ทุกเมื่อ ทดลองใช้ฟรี 14 วัน
          </p>

          <div className="h-pricing-grid">
            {/* Starter */}
            <div className="h-price-card">
              <span className="h-price-badge">Starter</span>
              <h3 className="h-price-plan">Starter</h3>
              <p className="h-price-desc">เหมาะสำหรับธุรกิจขนาดเล็กที่เพิ่งเริ่มต้น</p>
              <div className="h-price-amount">ฟรี</div>
              <div className="h-price-period">ตลอดไป</div>
              <div className="h-price-divider" />
              <ul className="h-price-features-list">
                {["2 แพลตฟอร์ม", "1 ผู้ใช้งาน", "1,000 ข้อความ/เดือน", "Basic Analytics"].map((f, i) => (
                  <li key={i} className="h-pf-item">
                    <Check size={13} className="h-pf-check" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/login" className="h-price-btn">เริ่มใช้งานฟรี</Link>
            </div>

            {/* Pro */}
            <div className="h-price-card h-featured">
              <span className="h-price-badge">แนะนำ</span>
              <h3 className="h-price-plan">Pro</h3>
              <p className="h-price-desc">สำหรับทีมที่ต้องการเครื่องมือครบครันและ AI Assistant</p>
              <div className="h-price-amount"><sup>฿</sup>990</div>
              <div className="h-price-period">ต่อเดือน / ต่อทีม</div>
              <div className="h-price-divider" />
              <ul className="h-price-features-list">
                {[
                  "ทุกแพลตฟอร์ม (10+)",
                  "ผู้ใช้ไม่จำกัด",
                  "ข้อความไม่จำกัด",
                  "AI Auto-Reply",
                  "Advanced Analytics",
                  "Priority Support",
                ].map((f, i) => (
                  <li key={i} className="h-pf-item">
                    <Check size={13} className="h-pf-check" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/login" className="h-price-btn h-price-btn-solid">เริ่ม 14 วันฟรี</Link>
            </div>

            {/* Enterprise */}
            <div className="h-price-card">
              <span className="h-price-badge">Enterprise</span>
              <h3 className="h-price-plan">Enterprise</h3>
              <p className="h-price-desc">สำหรับองค์กรขนาดใหญ่ที่ต้องการ SLA และ custom integration</p>
              <div className="h-price-amount">Custom</div>
              <div className="h-price-period">ติดต่อทีมขาย</div>
              <div className="h-price-divider" />
              <ul className="h-price-features-list">
                {[
                  "ทุกฟีเจอร์ใน Pro",
                  "Dedicated Account Manager",
                  "Custom Integration",
                  "SLA 99.99%",
                  "On-premise option",
                  "Custom AI Training",
                ].map((f, i) => (
                  <li key={i} className="h-pf-item">
                    <Check size={13} className="h-pf-check" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="mailto:sales@nexus.th" className="h-price-btn">ติดต่อทีมขาย</a>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="h-cta-section">
          <div className="h-cta-glow" />
          <p className="h-eyebrow" style={{ textAlign: "center" }}>พร้อมเริ่มต้นแล้วหรือยัง</p>
          <h2 className="h-cta-title">
            รวมทุกแชทเข้าด้วยกัน<br />
            เพิ่มยอดขายด้วย<em> Geek</em>
          </h2>
          <p className="h-cta-sub">
            ทดลองใช้ฟรี 14 วัน ไม่ต้องใช้บัตรเครดิต ยกเลิกได้ทุกเมื่อ
          </p>
          <div className="h-cta-btns">
            <Link href="/login" className="h-cta-primary">
              เริ่มใช้งานฟรีเลย
              <ArrowRight size={14} className="cta-arrow" />
            </Link>
            <a href="mailto:sales@nexus.th" className="h-cta-ghost">
              คุยกับทีมขาย
            </a>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer>
          <div className="h-footer-wrap">
            <div className="h-footer-top">
              <div className="h-footer-brand-col">
                <a href="#" className="h-footer-logo">Geek</a>
                <p className="h-footer-tagline">
                  ระบบรวมแชทอัจฉริยะสำหรับธุรกิจยุคใหม่ เชื่อมทุก platform ไว้ในที่เดียว
                </p>
              </div>

              <div className="h-footer-links-row">
                <div className="h-footer-col">
                  <span className="h-footer-col-title">Product</span>
                  {["Features", "Integrations", "Pricing", "Changelog"].map((l) => (
                    <a key={l} href="#" className="h-footer-link">{l}</a>
                  ))}
                </div>
                <div className="h-footer-col">
                  <span className="h-footer-col-title">Company</span>
                  {["About", "Blog", "Careers", "Press"].map((l) => (
                    <a key={l} href="#" className="h-footer-link">{l}</a>
                  ))}
                </div>
                <div className="h-footer-col">
                  <span className="h-footer-col-title">Support</span>
                  {["Documentation", "Help Center", "API Docs", "Status"].map((l) => (
                    <a key={l} href="#" className="h-footer-link">{l}</a>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-footer-bottom">
              <span className="h-footer-copy">© 2026 Geek. All rights reserved.</span>
              <div className="h-footer-legal">
                <a href="#" className="h-footer-link">Privacy Policy</a>
                <a href="#" className="h-footer-link">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
