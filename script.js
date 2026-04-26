// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== ANIMATED COUNTER =====
function animateCount(el, target) {
  let start = 0;
  const duration = 1800;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start);
  }, 16);
}

// ===== FADE-IN ON SCROLL =====
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ===== COUNTER OBSERVER =====
const counters = document.querySelectorAll('[data-target]');
const countedEls = new Set();

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countedEls.has(entry.target)) {
      countedEls.add(entry.target);
      animateCount(entry.target, parseInt(entry.target.dataset.target));
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

// ===== FORM SUBMIT =====
async function submitForm() {
  const namaOrtu = document.querySelector('input[placeholder="Nama orang tua/ wali murid"]').value.trim();
  const namaAnak = document.querySelector('input[placeholder="Nama lengkap"]').value.trim();
  const umur     = document.querySelector('input[placeholder="Umur calon siswa"]').value.trim();
  const unit     = document.querySelector('select').value;
  const pesan    = document.querySelector('textarea').value.trim();

  if (!namaOrtu || !namaAnak || !umur || !unit) {
    alert('Mohon lengkapi semua field yang wajib diisi.');
    return;
  }

  // ===== KIRIM KE GOOGLE SHEET =====
  // const SHEET_URL = 'https://link.sheet'; // ganti dengan URL Apps Script deploy
  // try {
  //   await fetch(SHEET_URL, {
  //     method: 'POST',
  //     mode: 'no-cors',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ namaOrtu, namaAnak, umur, unit, pesan })
  //   });
  // } catch (e) {
  //   console.error('Gagal kirim ke sheet:', e);
  // }

  // ===== REDIRECT KE WHATSAPP =====
  const NOMOR_WA = '6281274340915';
  const teks = encodeURIComponent(
    `*Pendaftaran Baru - An-Najihah Arizona*\n\n` +
    `Nama Calon Siswa : ${namaAnak}\n` +
    `Umur : ${umur}\n` +
    `Nama Orang Tua : ${namaOrtu}\n` +
    `Program Diminati : ${unit}\n` +
    `Pesan : ${pesan || '-'}`
  );
  window.open(`https://wa.me/${NOMOR_WA}?text=${teks}`, '_blank');

  // ===== TAMPILKAN SUKSES =====
  document.getElementById('formSuccess').style.display = 'block';
  document.querySelector('.kontak-form h4').style.display = 'none';
  document.querySelectorAll('.form-group, .form-row, .btn-submit').forEach(el => el.style.display = 'none');
}
