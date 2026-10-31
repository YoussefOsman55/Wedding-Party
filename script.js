/* =====================================================================
   script.js
   ---------------------------------------------------------------------
   ✏️  كل اللي تحتاج تعدّله موجود في الـ CONFIG اللي تحت (أول الملف).
   باقي الملف (من "لا تعدّل تحت الخط ده") هو الكود اللي بيشغّل الموقع.
   ===================================================================== */

const CONFIG = {

  /* ───────────── 1) الأسماء ───────────── */
  // ✏️ اسم العريس (هيظهر بالإنجليزي وبيتحول Capital تلقائي)
  groomName: "Farid Elmorshdy",
  // ✏️ اسم العروسة
  brideName: "Basma Elshafai",
  // الحروف الأولى للمونوجرام: سيبها "" عشان تتاخد تلقائي من الأسماء، أو اكتبها بنفسك زي "FB"
  monogram: "",

  /* ───────────── 2) النصوص ───────────── */
  // ✏️ السطر اللي فوق الأسماء
  introLine: "Together with their families",
  // ✏️ السطر اللي تحت الأسماء
  inviteLine: "Invite you to join their forever",
  // ✏️ الجملة العربي جوه اللوحة البوردو (ممكن تحط كلمات أغنيتك المفضلة)
  arabicLine: "يا رب تفضل حلاوة سلام أول لقا بايدينا",
  // ✏️ الرسالة الإنجليزي
  englishMessage: "As music fills the air and our hearts become one, we invite you to celebrate the beginning of our greatest adventure",
  // ✏️ الجملة اللي في آخر الصفحة
  footerText: "We can't wait to celebrate with you",
  // ✏️ عنوان التاب في المتصفح
  pageTitle: "Farid & Basma — Wedding Invitation",

  /* ───────────── 3) التاريخ والوقت ───────────── */
  // ✏️ تاريخ ووقت الفرح بصيغة: "YYYY-MM-DDTHH:MM:00+HH:MM"
  // الـ +03:00 = توقيت القاهرة الصيفي، و +02:00 = التوقيت الشتوي. غيّرها حسب شهر الفرح.
  weddingDate: "2027-09-16T19:00:00+03:00",
  // المنطقة الزمنية اللي بيتعرض بيها التاريخ (سيبها كده لو الفرح في مصر)
  timeZone: "Africa/Cairo",
  // لو عايز تكتب التاريخ/اليوم/الساعة بإيدك بدل الحساب التلقائي، املا الخانات دي (وإلا سيبها ""):
  dateTextOverride: "",      // مثال: "16TH SEPTEMBER 2027"
  weekdayTextOverride: "",   // مثال: "THURSDAY"
  timeTextOverride: "",      // مثال: "7:00PM"

  /* ───────────── 4) المكان ───────────── */
  // ✏️ اسم القاعة / القصر
  venueName: "Muhammad Ali Palace",
  // ✏️ المنطقة والمدينة
  venueCity: "Shubra, Cairo",
  // ✏️ لينك اللوكيشن (انسخه من Google Maps ← Share ← Copy link)
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Muhammad+Ali+Palace+Shubra+Cairo",

  /* ───────────── 5) تأكيد الحضور (RSVP) ───────────── */
  // ✏️ لينك الزرار. أمثلة:
  //   واتساب:  "https://wa.me/201000000000?text=I%20will%20attend"   (الرقم بكود الدولة من غير + أو أصفار)
  //   فورم:    "https://forms.gle/xxxxxxxx"
  //   إيميل:   "mailto:you@example.com?subject=RSVP"
  rsvpLink: "https://wa.me/201000000000?text=Hello!%20I%20would%20love%20to%20attend%20the%20wedding",

  /* ───────────── 6) الأغنية ───────────── */
  // ✏️ حط ملف الأغنية جوه فولدر assets وغيّر الاسم هنا. لو مفيش أغنية خليها "" والزرار هيختفي.
  songFile: "assets/song.mp3",
  // ✏️ تبدأ من أنهي ثانية في الأغنية (مثلاً 30 لو عايز تبدأ من أول المقطع اللي بتحبه)
  songStartAtSeconds: 0,
  // ✏️ مستوى الصوت من 0 لـ 1
  songVolume: 0.7,

  /* ───────────── 7) الصور (اختياري) ───────────── */
  // لو سيبتهم "" الموقع بيستخدم رسومات جاهزة (SVG). عشان تحط صورة/رسمة بتاعتك حط مسارها هنا:
  heroFigureImage: "",   // ✏️ مثال: "assets/singer.png"  (صورة PNG بخلفية شفافة، الأفضل طولها أكبر من عرضها)
  palaceImage: "",       // ✏️ مثال: "assets/palace.png"  (صورة القاعة اللي في آخر الصفحة)
};

/* =====================================================================
   ⛔ لا تعدّل تحت الخط ده إلا لو عارف بتعمل إيه
   ===================================================================== */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- تاريخ ووقت ---------- */
const when = new Date(CONFIG.weddingDate);
const fmt = (opts) => new Intl.DateTimeFormat("en-GB", { timeZone: CONFIG.timeZone, ...opts });
const ordinal = (n) => {
  const v = n % 100;
  if (v >= 11 && v <= 13) return "TH";
  return ({ 1: "ST", 2: "ND", 3: "RD" })[n % 10] || "TH";
};

function renderDateTime() {
  const day = +fmt({ day: "numeric" }).format(when);
  const month = fmt({ month: "long" }).format(when).toUpperCase();
  const year = fmt({ year: "numeric" }).format(when);
  const weekday = fmt({ weekday: "long" }).format(when).toUpperCase();
  const parts = fmt({ hour: "numeric", minute: "2-digit", hour12: true }).formatToParts(when);
  const h = parts.find((p) => p.type === "hour").value;
  const m = parts.find((p) => p.type === "minute").value;
  const ap = parts.find((p) => p.type === "dayPeriod").value.toUpperCase();

  $("#dateLine").innerHTML = CONFIG.dateTextOverride || `${day}<sup>${ordinal(day)}</sup> ${month} ${year}`;
  $("#weekdayLine").textContent = CONFIG.weekdayTextOverride || weekday;
  $("#timeLine").textContent = CONFIG.timeTextOverride || `${h}:${m}${ap}`;
}

/* ---------- العد التنازلي ---------- */
function tick() {
  let diff = Math.max(0, when - Date.now());
  const d = Math.floor(diff / 864e5); diff -= d * 864e5;
  const h = Math.floor(diff / 36e5);  diff -= h * 36e5;
  const m = Math.floor(diff / 6e4);   diff -= m * 6e4;
  const s = Math.floor(diff / 1e3);
  const p = (n) => String(n).padStart(2, "0");
  $("#cdD").textContent = p(d); $("#cdH").textContent = p(h);
  $("#cdM").textContent = p(m); $("#cdS").textContent = p(s);
}

/* ---------- النصوص والمونوجرام ---------- */
function bindTexts() {
  $$("[data-bind]").forEach((el) => { el.textContent = CONFIG[el.dataset.bind] ?? ""; });
  document.title = CONFIG.pageTitle;
  const letters = CONFIG.monogram || (CONFIG.groomName[0] + CONFIG.brideName[0]);
  $$("[data-monogram]").forEach((el) => {
    el.innerHTML = [...letters].map((c) => `<span>${c.toUpperCase()}</span>`).join("");
  });
  $("#rsvpBtn").href = CONFIG.rsvpLink || "#";
  $("#mapBtn").href = CONFIG.mapsLink || "#";
}

/* =====================================================================
   الرسومات (SVG) — تقدر تستبدلها بصور من CONFIG.heroFigureImage / palaceImage
   ===================================================================== */

/* السلم + السجادة الحمرا (بيتولّد بالكود) */
function buildStairs() {
  const W = 400, H = 470, steps = 11;
  let s = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="carpet" x1="0" x2="1"><stop offset="0" stop-color="#4a0b19"/><stop offset=".5" stop-color="#7a1428"/><stop offset="1" stop-color="#4a0b19"/></linearGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe3cc" stop-opacity=".9"/><stop offset=".18" stop-color="#efe3cc" stop-opacity="0"/></linearGradient>
  </defs>`;
  // مراحل السلم
  const ys = Array.from({ length: steps + 1 }, (_, i) => H * Math.pow(i / steps, 1.35));
  const halfCarpet = (y) => 44 + (y / H) * 84;
  for (let i = 0; i < steps; i++) {
    const y0 = ys[i], y1 = ys[i + 1], riser = (y1 - y0) * 0.32;
    s += `<rect x="0" y="${y0}" width="${W}" height="${y1 - y0}" fill="${i % 2 ? "#d9c294" : "#e4d1a6"}"/>`;
    s += `<rect x="0" y="${y1 - riser}" width="${W}" height="${riser}" fill="#b99a62" opacity=".55"/>`;
  }
  // السجادة
  for (let i = 0; i < steps; i++) {
    const y0 = ys[i], y1 = ys[i + 1], a = halfCarpet(y0), b = halfCarpet(y1);
    s += `<polygon points="${W / 2 - a},${y0} ${W / 2 + a},${y0} ${W / 2 + b},${y1} ${W / 2 - b},${y1}" fill="url(#carpet)"/>`;
    s += `<line x1="${W / 2 - b}" y1="${y1}" x2="${W / 2 + b}" y2="${y1}" stroke="#2c0610" stroke-opacity=".55" stroke-width="2"/>`;
  }
  // حواف السجادة الدهبية
  s += `<polyline points="${W / 2 - 44},0 ${W / 2 - 128},${H}" stroke="#b8924a" stroke-width="2.5" fill="none"/>
        <polyline points="${W / 2 + 44},0 ${W / 2 + 128},${H}" stroke="#b8924a" stroke-width="2.5" fill="none"/>`;
  // درابزين على الجنبين
  for (const side of [0, 1]) {
    for (let i = 1; i < 18; i++) {
      const t = i / 18, y = H * Math.pow(t, 1.35);
      const x = side ? W - (38 + t * 34) : 38 + t * 34;
      const bw = 2 + t * 5, bh = 18 + t * 46;
      s += `<rect x="${x - bw / 2}" y="${y - bh}" width="${bw}" height="${bh}" rx="${bw / 2}" fill="#cdb585" stroke="#9c7f4c" stroke-width=".6"/>`;
    }
    const x0 = side ? W - 40 : 40, x1 = side ? W - 74 : 74;
    s += `<polyline points="${x0},${H * 0.03} ${x1},${H}" stroke="#a88a55" stroke-width="5" fill="none" stroke-linecap="round" transform="translate(0,-8)"/>`;
  }
  s += `<rect width="${W}" height="${H}" fill="url(#fade)"/></svg>`;
  $("#stairs").innerHTML = s;
}

/* الشخصية اللي فوق السلم (رسمة بسيطة أصلية — بدّلها بصورتك من heroFigureImage) */
function buildFigure() {
  const el = $("#figure");
  if (CONFIG.heroFigureImage) { el.innerHTML = `<img src="${CONFIG.heroFigureImage}" alt="" />`; return; }
  el.innerHTML = `<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 40C38 42 30 62 28 92L20 156H80L72 92C70 62 62 42 50 40Z" fill="#efe0b8" stroke="#b8924a" stroke-width="1.4"/>
    <path d="M36 70c4 18 2 44-6 84M64 70c-4 18-2 44 6 84" stroke="#caa95f" stroke-width="1" fill="none" opacity=".7"/>
    <path d="M30 62c-10 14-14 38-8 56 6-6 14-4 18-14-4-14-6-30-10-42z" fill="#d9bb72" opacity=".9"/>
    <path d="M70 62c10 14 12 36 6 54-6-6-12-2-16-12 4-14 6-28 10-42z" fill="#d9bb72" opacity=".9"/>
    <rect x="44" y="38" width="12" height="9" fill="#d3ae8d"/>
    <ellipse cx="50" cy="27" rx="11" ry="13" fill="#dcb999"/>
    <path d="M38 24c0-12 8-16 12-16s14 4 12 17c-3-6-8-8-12-8s-9 2-12 7z" fill="#1b1411"/>
    <circle cx="50" cy="8" r="6" fill="#1b1411"/>
    <rect x="39" y="23" width="9.5" height="6" rx="2.5" fill="#0d0907"/><rect x="51.5" y="23" width="9.5" height="6" rx="2.5" fill="#0d0907"/>
    <rect x="48" y="25" width="4" height="1.5" fill="#0d0907"/>
  </svg>`;
}

/* العازفين: ناي وعود (رسمات سيلويت بسيطة) */
function buildMusicians() {
  const head = (x, y) => `<circle cx="${x}" cy="${y}" r="14" fill="#cfa98a"/><path d="M${x - 14} ${y - 2}c0-16 10-18 14-18s14 4 14 18c-3-8-8-10-14-10s-11 2-14 10z" fill="#1c1511"/>`;
  const suit = `<path d="M40 74Q70 62 100 74L106 128H34Z" fill="#14100d"/><path d="M62 70h16l-8 34z" fill="#f4efe6"/><path d="M63 71l7 5 7-5-3 6h-8z" fill="#14100d"/>`;
  const legs = `<rect x="38" y="126" width="26" height="72" rx="6" fill="#14100d"/><rect x="76" y="126" width="26" height="72" rx="6" fill="#14100d"/><ellipse cx="52" cy="200" rx="22" ry="7" fill="#0a0706"/><ellipse cx="94" cy="200" rx="22" ry="7" fill="#0a0706"/>`;
  const chair = `<rect x="14" y="118" width="14" height="86" rx="4" fill="#3a2418"/><rect x="14" y="118" width="108" height="10" rx="4" fill="#4a2e1e"/>`;
  // ناي
  $("#musL").innerHTML = chair + legs + suit + head(70, 52) +
    `<path d="M44 82q-8 22 22 6" stroke="#14100d" stroke-width="13" stroke-linecap="round" fill="none"/>
     <path d="M96 82q8 14-18-2" stroke="#14100d" stroke-width="13" stroke-linecap="round" fill="none"/>
     <line x1="64" y1="62" x2="124" y2="118" stroke="#8a5a2a" stroke-width="5" stroke-linecap="round"/>
     <g fill="#3a2410"><circle cx="86" cy="80" r="1.6"/><circle cx="94" cy="87" r="1.6"/><circle cx="102" cy="94" r="1.6"/><circle cx="110" cy="101" r="1.6"/></g>`;
  // عود
  $("#musR").innerHTML = `<g transform="translate(140 0) scale(-1 1)">${chair}</g>` + legs + suit + head(70, 52) +
    `<g transform="rotate(-28 70 120)"><ellipse cx="70" cy="128" rx="34" ry="40" fill="#a26a35" stroke="#5a3417" stroke-width="2"/>
      <circle cx="70" cy="126" r="10" fill="#2a170a"/><circle cx="70" cy="126" r="6" fill="none" stroke="#d9b277" stroke-width="1"/>
      <rect x="64" y="52" width="12" height="44" fill="#3a2410"/><path d="M62 52h16l-3-14H65z" fill="#2a170a"/></g>
     <path d="M96 80q-6 22-30 26" stroke="#14100d" stroke-width="13" stroke-linecap="round" fill="none"/>
     <path d="M44 84q4 20 24 28" stroke="#14100d" stroke-width="13" stroke-linecap="round" fill="none"/>`;
}

/* الثريا */
function buildChandelier() {
  let candles = "", drops = "";
  [[22, 74], [48, 62], [75, 56], [102, 62], [128, 74]].forEach(([x, y], i) => {
    candles += `<rect x="${x - 3}" y="${y - 22}" width="6" height="18" fill="#efe3cc" stroke="#b8924a" stroke-width=".8"/>
                <path d="M${x} ${y - 36}c-4 5-4 9 0 12 4-3 4-7 0-12z" fill="#f4c24a"/>`;
    drops += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 24 + (i % 2) * 10}" stroke="#b8924a" stroke-width=".8"/><path d="M${x} ${y + 24 + (i % 2) * 10}l-3 6 3 5 3-5z" fill="#d9b86b"/>`;
  });
  $("#chandelier").innerHTML = `<svg viewBox="0 0 150 190" xmlns="http://www.w3.org/2000/svg">
    <line x1="75" y1="0" x2="75" y2="46" stroke="#7f5f27" stroke-width="2" stroke-dasharray="4 2"/>
    <circle cx="75" cy="50" r="6" fill="#b8924a"/>
    <path d="M75 56C75 80 70 92 75 112" stroke="#8a6a2e" stroke-width="3" fill="none"/>
    <path d="M22 84C26 100 56 96 75 104C94 96 124 100 128 84" stroke="#b8924a" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M48 70C52 88 64 90 75 98C86 90 98 88 102 70" stroke="#b8924a" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M75 112l-9 14h18z" fill="#b8924a"/><path d="M75 126v22" stroke="#b8924a" stroke-width="1.5"/><path d="M75 148l-4 8 4 7 4-7z" fill="#d9b86b"/>
    ${candles}${drops}</svg>`;
}

/* الورد (أنثوريوم) والعود على جنب قسم التفاصيل */
function buildSideArt() {
  const flower = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})">
      <path d="M0 40C-26 36-34 8 0-24 34 8 26 36 0 40z" fill="#4e0c1c" stroke="#2c0610" stroke-width="1"/>
      <path d="M0-20C-14 0-12 24 0 36" stroke="#7a1a2e" fill="none" stroke-width="1.2"/>
      <path d="M0 14C8 2 12-10 14-24" stroke="#d9b86b" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M0 40C2 80 -6 110 -4 150" stroke="#506a3a" stroke-width="3" fill="none"/></g>`;
  const leaf = (x, y, r) => `<path transform="translate(${x} ${y}) rotate(${r})" d="M0 0C14-14 30-14 40 0 30 14 14 14 0 0z" fill="#506a3a"/>`;
  const oud = `<g transform="translate(36 380) rotate(14)">
      <ellipse cx="0" cy="40" rx="34" ry="44" fill="#a8743c" stroke="#5a3417" stroke-width="2"/>
      <circle cx="0" cy="38" r="11" fill="#2a170a"/><circle cx="0" cy="38" r="7" fill="none" stroke="#e3c088" stroke-width="1"/>
      <rect x="-6" y="-48" width="12" height="52" fill="#3a2410"/><path d="M-9-48h18l-4-18h-10z" fill="#2a170a"/></g>`;
  const svg = (inner, vb, top) => `<svg viewBox="${vb}" style="top:${top}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  const html = svg(flower(36, 50, -14) + flower(74, 110, 18) + leaf(8, 140, -40) + leaf(52, 156, 30), "0 0 120 220", "0") +
               svg(oud, "-20 300 120 220", "45%");
  $$(".side-art").forEach((el) => (el.innerHTML = html));
}

/* القصر والمياه (بيتولّد بالكود) */
function buildPalace() {
  const el = $("#palace");
  if (CONFIG.palaceImage) { el.innerHTML = `<img src="${CONFIG.palaceImage}" alt="" />`; return; }
  const cols = (x0, x1, y, h, n) =>
    Array.from({ length: n }, (_, i) => `<rect x="${x0 + (i * (x1 - x0)) / (n - 1) - 3}" y="${y}" width="6" height="${h}" fill="#f1e2bf"/>`).join("");
  const building = `
    <rect x="30" y="92" width="420" height="68" fill="#c9a56a"/>
    <rect x="30" y="86" width="420" height="8" fill="#a98448"/>
    ${cols(52, 190, 100, 54, 8)}${cols(290, 428, 100, 54, 8)}
    <rect x="190" y="70" width="100" height="90" fill="#d8b87a"/>
    <polygon points="182,70 240,38 298,70" fill="#b8924a"/><polygon points="196,68 240,44 284,68" fill="#d8b87a"/>
    ${cols(200, 280, 76, 78, 6)}
    <path d="M214 38a26 26 0 0 1 52 0z" fill="#9aa59b" transform="translate(0 -4)"/><path d="M240 6v14" stroke="#8a6a2e" stroke-width="3"/>
    <g fill="#5a3417" opacity=".55"><rect x="62" y="112" width="8" height="20"/><rect x="100" y="112" width="8" height="20"/><rect x="138" y="112" width="8" height="20"/><rect x="334" y="112" width="8" height="20"/><rect x="372" y="112" width="8" height="20"/><rect x="410" y="112" width="8" height="20"/></g>`;
  const lion = (x, f) => `<g transform="translate(${x} 160) scale(${f} 1)"><rect x="0" y="-18" width="38" height="18" rx="4" fill="#d6c19a"/><rect x="26" y="-34" width="16" height="22" rx="5" fill="#d6c19a"/><circle cx="36" cy="-30" r="9" fill="#c4ac80"/><rect x="-6" y="0" width="52" height="8" fill="#b79c6a"/></g>`;
  el.innerHTML = `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7b948a"/><stop offset="1" stop-color="#3f5a55"/></linearGradient></defs>
    <rect y="160" width="480" height="140" fill="url(#water)"/>
    <g transform="translate(0 320) scale(1 -1)" opacity=".28">${building}</g>
    <g stroke="#e9efe6" stroke-opacity=".25" stroke-width="1.5"><line x1="40" y1="200" x2="150" y2="200"/><line x1="200" y1="214" x2="330" y2="214"/><line x1="90" y1="236" x2="230" y2="236"/><line x1="300" y1="250" x2="440" y2="250"/></g>
    ${building}${lion(36, 1)}${lion(444, -1)}
  </svg>`;
}

/* =====================================================================
   الموسيقى + فتح الدعوة
   ===================================================================== */
const audio = $("#song");
const musicBtn = $("#musicBtn");

function setupAudio() {
  if (!CONFIG.songFile) return;
  audio.src = CONFIG.songFile;
  audio.volume = CONFIG.songVolume;
  audio.addEventListener("loadedmetadata", () => {
    if (CONFIG.songStartAtSeconds > 0) audio.currentTime = CONFIG.songStartAtSeconds;
  }, { once: true });
  audio.addEventListener("loadedmetadata", () => {
    audio.addEventListener("ended", () => { audio.currentTime = CONFIG.songStartAtSeconds || 0; audio.play(); });
  }, { once: true });
  musicBtn.hidden = false;
  musicBtn.classList.add("muted");
  musicBtn.addEventListener("click", () => (audio.paused ? audio.play() : audio.pause()));
  audio.addEventListener("play", () => { musicBtn.classList.add("playing"); musicBtn.classList.remove("muted"); });
  audio.addEventListener("pause", () => { musicBtn.classList.remove("playing"); musicBtn.classList.add("muted"); });
}

function openInvitation() {
  $("#intro").classList.add("open");
  document.body.classList.remove("locked");
  if (CONFIG.songFile) audio.play().catch(() => {});
  window.scrollTo(0, 0);
}

/* ظهور العناصر وقت السكرول */
function setupReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.2 });
  $$(".reveal").forEach((el) => io.observe(el));
}

/* ---------- تشغيل كل حاجة ---------- */
document.body.classList.add("locked");
bindTexts();
renderDateTime();
tick(); setInterval(tick, 1000);
buildStairs(); buildFigure(); buildMusicians(); buildChandelier(); buildSideArt(); buildPalace();
setupAudio();
setupReveal();
$("#openBtn").addEventListener("click", openInvitation);
