// Builds the site into dist/ from the files in content/. Edit content through /admin.
const fs = require('fs');

const read = (name) => JSON.parse(fs.readFileSync(`content/${name}.json`, 'utf8'));
const e = (value) => String(value ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const p = read('profile'), a = read('about'), x = read('experience'),
  m = read('moots'), w = read('writing'), l = read('leadership');

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${e(p.pageTitle)}</title>
  <meta name="description" content="${e(p.metaDescription)}">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%236f1d1b'/%3E%3Ctext x='16' y='23' font-family='Georgia,serif' font-style='italic' font-size='20' text-anchor='middle' fill='%23fbf7ea'%3EA%3C/text%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Instrument+Serif:ital@0;1&family=Mrs+Saint+Delafield&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>

  <header class="nav">
    <a class="nav__name" href="#top">${e(p.name)}</a>
    <nav aria-label="Main">
      <a href="#about">About</a>
      <a href="#experience">Experience</a>
      <a href="#moots">Moots</a>
      <a href="#writing">Writing</a>
      <a href="#leadership">Leadership</a>
    </nav>
    <a class="pill" href="mailto:${e(p.email)}">Get in touch</a>
  </header>

  <main id="main">
    <section class="hero" id="top">
      <h1 class="hero__title"><span>Hi, <em>I'm</em></span> <span>${e(p.firstName)}</span></h1>

      <div class="hero__stage">
        <div class="hero__notes hero__notes--left">
          <p>${e(p.heroLeft)}</p>
          <svg viewBox="0 0 70 34" aria-hidden="true"><path d="M3 22c11 8 18-15 26-8 6 6-6 14-7 6-1-9 22-14 42-7m-9-8 10 8-11 6"/></svg>
          <p class="hero__stat"><strong>${e(p.cgpa)}</strong> CGPA out of 10</p>
        </div>

        <figure class="portrait">
          <img src="${e(p.photo)}" alt="Portrait of ${e(p.name)}" onerror="this.remove()">
          <div class="portrait__mono" aria-hidden="true">AC</div>
        </figure>

        <div class="hero__notes hero__notes--right">
          <p>${e(p.heroRight)}</p>
          <svg viewBox="0 0 70 34" aria-hidden="true"><path d="M67 8C54 2 46 28 36 22c-7-5 5-14 8-6 3 9-20 16-40 8m8 9L3 24l11-6"/></svg>
          <p class="hero__stat"><strong>${e(p.mootWins)}</strong> moot wins and <strong>${e(p.bestMemorials)}</strong> best memorials</p>
          <a class="pill pill--large" href="#experience">See my work</a>
        </div>
      </div>
    </section>

    <section class="about" id="about">
      <div class="about__head">
        <p class="script">${e(a.greeting)}</p>
        <h2>${e(a.headlineLine1)}<br>${e(a.headlineLine2)}</h2>
      </div>

      <div class="about__grid">
        <p class="about__lead">${e(a.lead)}</p>
        <div class="about__body">
${a.paragraphs.map(t => `          <p>${e(t)}</p>`).join('\n')}
          <a class="pill pill--large" href="${e(p.linkedin)}" rel="noopener">Connect on LinkedIn</a>
        </div>

        <aside class="polaroid" aria-label="Academic highlight">
          <div class="polaroid__tile"><span>${e(p.cgpa)}</span></div>
          <p>CGPA / 10</p>
        </aside>

        <dl class="education">
${a.education.map(x => `          <div><dt>${e(x.qualification)}</dt><dd>${e(x.institution)}${x.board ? `<br>${e(x.board)}` : ''}</dd><dd class="education__score">${e(x.score)}</dd></div>`).join('\n')}
        </dl>
      </div>
    </section>

    <div class="marquee" aria-hidden="true">
      <div class="marquee__track">
        <span>On the record</span><span>On the record</span><span>On the record</span><span>On the record</span>
        <span>On the record</span><span>On the record</span><span>On the record</span><span>On the record</span>
      </div>
    </div>

    <section class="experience" id="experience">
      <h2 class="section-title">Experience</h2>
      <ol class="timeline">
${x.items.map(i => `        <li><time>${e(i.date)}</time><div><h3>${e(i.organisation)}</h3><p class="timeline__role">${e(i.role)}</p><p>${e(i.description)}</p></div></li>`).join('\n')}
      </ol>
    </section>

    <section class="moots" id="moots">
      <div class="moots__inner">
        <h2 class="section-title section-title--light">Moot court</h2>
        <div class="cards">
${m.items.map(i => `          <article class="card"><p class="card__result">${e(i.result)}</p><h3>${e(i.competition)}</h3><p>${e(i.details)}</p></article>`).join('\n')}
        </div>
        <p class="moots__note">${e(m.note)}</p>
      </div>
    </section>

    <section class="writing" id="writing">
      <h2 class="section-title">Writing &amp; research</h2>
      <div class="works">
${w.works.map(i => `        <article><p class="label">${e(i.type)}</p><h3>${e(i.title)}</h3><p>${e(i.description)}</p></article>`).join('\n')}
      </div>
      <div class="certs">
        <p class="label">Certifications</p>
        <ul>
${w.certifications.map(i => `          <li><strong>${e(i.title)}</strong> ${e(i.issuer)}</li>`).join('\n')}
        </ul>
      </div>
    </section>

    <section class="leadership" id="leadership">
      <h2 class="section-title">Leadership &amp; service</h2>
      <div class="leadership__grid">
        <ul class="roles">
${l.roles.map(i => `          <li><strong>${e(i.title)}</strong> ${e(i.organisation)}</li>`).join('\n')}
        </ul>
        <div class="campus">
          <p class="label">On campus</p>
          <ul>
${l.campus.map(i => `            <li>${e(i.role)} <span>${e(i.year)}</span></li>`).join('\n')}
          </ul>
        </div>
      </div>
    </section>
  </main>

  <footer class="contact" id="contact">
    <p class="script script--light">Let's talk</p>
    <h2>Have a brief for me?</h2>
    <div class="contact__links">
      <a href="mailto:${e(p.email)}">${e(p.email)}</a>
      <a href="${e(p.linkedin)}" rel="noopener">LinkedIn</a>
    </div>
    <p class="contact__fine">${e(p.name)} · ${e(p.location)}</p>
  </footer>
</body>
</html>
`;

fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist');
fs.writeFileSync('dist/index.html', html);
fs.copyFileSync('styles.css', 'dist/styles.css');
fs.cpSync('assets', 'dist/assets', { recursive: true });
fs.cpSync('admin', 'dist/admin', { recursive: true });
