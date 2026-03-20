// ===== SCREEN MANAGEMENT =====
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  const screen = document.getElementById(screenId);
  if (screen) {
    screen.classList.remove('hidden');
    if (screenId === 'seniors-screen') window._loadSeniors && window._loadSeniors();
  }
}

function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.add('hidden'));
  event.target.classList.add('active');
  document.getElementById(tab + '-form').classList.remove('hidden');
}

function setActiveNav(btn) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  btn.classList.add('active');
}

// ===== AI PANEL =====
let aiOpen = false;
function toggleAI() {
  aiOpen = !aiOpen;
  const panel = document.getElementById('ai-panel');
  const overlay = document.getElementById('ai-overlay');
  if (aiOpen) {
    panel.classList.remove('hidden');
    overlay.classList.remove('hidden');
    setTimeout(() => document.getElementById('ai-input').focus(), 300);
  } else {
    panel.classList.add('hidden');
    overlay.classList.add('hidden');
  }
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3000);
}

// ===== SPLASH =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) splash.style.opacity = '0';
    setTimeout(() => { if (splash) splash.style.display = 'none'; }, 500);
  }, 2200);
});

// Daily Questions rotation
const dailyQuestions = [
  'ত্রিকোণমিতি সহজে মনে রাখার উপায় কী?',
  'ইংরেজিতে ভালো করার সেরা উপায় কী?',
  'পদার্থবিজ্ঞানের কোন চ্যাপ্টার সবচেয়ে কঠিন?',
  'SSC পরীক্ষায় A+ পাওয়ার সেরা টিপস কী?',
  'গণিতে দ্রুত সমাধান করার কোনো টিপস আছে?',
];
document.addEventListener('DOMContentLoaded', () => {
  const idx = new Date().getDate() % dailyQuestions.length;
  const el = document.getElementById('daily-question-text');
  if (el) el.textContent = dailyQuestions[idx];
});
