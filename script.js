/* =========================================================
   KINDNESS ATLAS™ · ATLAS DA BONDADE — script.js
   JavaScript puro, sem dependências obrigatórias.
   (Lenis é carregado por CDN apenas para rolagem suave; se
   não carregar, a página funciona normalmente.)
   ========================================================= */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sem armazenamento */ } }
  };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------------------------------------------------------
     1. TRADUÇÕES (o português fica no próprio HTML)
     --------------------------------------------------------- */
  var EN = {
    'brand.name': 'Kindness Atlas',
    'brand.sub': 'Global edition',
    'nav.mission': 'Mission',
    'nav.feed': 'Positive Feed',
    'nav.map': 'Map',
    'nav.help': 'Help Now',
    'nav.premium': 'Premium',
    'cta.waitlistShort': 'Wishlist',
    'cta.waitlist': 'Join the Wishlist',
    'cta.download': 'Download the App',
    'cta.read': 'Read full story',
    'cta.title': 'Join the largest platform dedicated to showing the best of humanity.',
    'hero.eyebrow': 'Wishlist open · Android',
    'hero.l1': 'Every day, see',
    'hero.l2': 'the best of',
    'hero.l3': 'humanity.',
    'hero.sub': 'A global platform built to discover, translate, share and encourage human kindness.',
    'verb.discover': 'Discover',
    'verb.translate': 'Translate',
    'verb.share': 'Share',
    'verb.encourage': 'Encourage',
    'ps.greet': 'Good morning, Ana',
    'ps.today': 'Today on the Atlas',
    'ps.newsTag': 'Good news of the day',
    'ps.newsTitle': 'New therapy shows promising progress for Parkinson’s patients.',
    'ps.missionTag': 'Weekly mission',
    'ps.mission': 'Thank someone.',
    'ps.mapTag': 'Kindness Map',
    'ps.quoteTag': 'Japan · translated',
    'ps.map': 'Today: Kenya',
    'float.a1': 'Help Now',
    'float.a2': 'Someone 650 m away needs you',
    'float.b1': 'Translated from Japanese',
    'float.c': 'Transformative',
    'mission.over': '02 — Our mission',
    'mission.quote': '“In society, as in the Atlas, what matters is helping — not the size of the help.”',
    'mission.p1': 'Kindness Atlas was born from a simple belief: the world is full of kindness, but it rarely makes the headlines. Every day we gather real stories, scientific breakthroughs and gestures from ordinary people — and translate them so anyone, in any country, can be inspired.',
    'pillar.1t': 'Discover',
    'pillar.1d': 'A daily selection of the best the world has to offer.',
    'pillar.2t': 'Translate',
    'pillar.2d': 'Kindness without language barriers.',
    'pillar.3t': 'Share',
    'pillar.3d': 'Inspiration that travels across cultures.',
    'pillar.4t': 'Encourage',
    'pillar.4d': 'Small actions that change entire days.',
    'mq.1': 'Medicine', 'mq.2': 'Science', 'mq.3': 'Technology', 'mq.4': 'Education', 'mq.5': 'Environment', 'mq.6': 'Human Kindness',
    'today.over': '03 — Today on the Atlas',
    'today.title': 'Start your day with what went right.',
    'news.tag': 'Good News of the Day',
    'news.cat': 'Medicine',
    'news.title': 'New therapy shows promising progress for Parkinson’s patients.',
    'news.desc': 'Researchers report encouraging results in early clinical studies of a new therapeutic approach, bringing renewed hope to patients, families and caregivers around the world.',
    'fact.daily': 'Daily',
    'fact.over': 'Did you know?',
    'fact.text': 'Today, more children are attending school than at any other time in history.',
    'fact.foot': 'A new inspiring fact every day for Premium members.',
    'comm.over': '05 — Community highlights',
    'comm.title': 'Words that cross borders.',
    'comm.desc': 'Thoughts shared by people all over the world, automatically translated into your language.',
    'comm.br': 'Brazil',
    'comm.brq': '“Never underestimate a kind word.”',
    'comm.brorig': 'Translated from Portuguese',
    'comm.jp': 'Japan',
    'comm.jpq': '“Small gestures have invisible impacts.”',
    'comm.jporig': 'Translated from Japanese',
    'mis.over': '06 — Weekly missions',
    'mis.title': 'Small missions. At your own pace.',
    'mis.noRank': 'No rankings',
    'mis.noComp': 'No competition',
    'mis.1': 'Thank someone.',
    'mis.1h': 'A sincere “thank you” can light up someone’s day.',
    'mis.2': 'Donate something you don’t use.',
    'mis.2h': 'What sits idle for you may be essential to someone else.',
    'mis.3': 'Talk to someone who needs company.',
    'mis.3h': 'Listening is also a way of helping.',
    'hist.month': 'October',
    'hist.over': '07 — This week in history',
    'hist.title': 'In October 2009, a medical discovery was announced that went on to benefit millions of people.',
    'hist.desc': 'Every week, the Kindness Archive revisits a moment when humanity took a step forward. Remembering what went right is a way of believing in what still can.',
    'hist.cta': 'Explore the Kindness Archive',
    'feed.over': '08 — Positive feed',
    'feed.title': 'A feed that feels good.',
    'feed.desc': 'Six sections, one direction: showing human progress with rigor, context and hope.',
    'cat.med': 'Medicine', 'cat.sci': 'Science', 'cat.tech': 'Technology', 'cat.edu': 'Education', 'cat.env': 'Environment', 'cat.kind': 'Human Kindness',
    'feed.1': 'Volunteer medical teams bring care to remote communities.',
    'feed.1d': 'Healthcare professionals spend their vacations caring for people who live far from hospitals.',
    'feed.2': 'Researchers share open data to speed up discoveries.',
    'feed.3': 'Translation app connects refugees with essential services.',
    'feed.4': 'Community libraries bloom in underserved neighborhoods.',
    'feed.5': 'Residents replant a mangrove and marine life thrives again.',
    'feed.6': 'Neighbors organize to cook for seniors who live alone.',
    'arc.over': '09 — Kindness Archive',
    'arc.title': '30 years of good news, in one place.',
    'arc.desc': 'A positive archive of the last 30 years. Browse by decade, country and category and rediscover achievements that changed lives.',
    'arc.decade': 'Decade', 'arc.all': 'All', 'arc.country': 'Country', 'arc.allM': 'All', 'arc.global': 'Global', 'arc.ke': 'Kenya', 'arc.category': 'Category',
    'arc.i1': 'International scientific cooperation unites researchers from dozens of countries.',
    'arc.i2': 'Community schools expand access to adult education.',
    'arc.i3': 'Food donation networks spread across Brazilian cities.',
    'arc.i4': 'Medical discovery announced in October benefits millions of people.',
    'arc.i5': 'Mobile payments expand financial inclusion.',
    'arc.i6': 'Volunteers help rebuild communities after a natural disaster.',
    'arc.i7': 'Women lead the planting of millions of trees.',
    'arc.i8': 'Global scientific collaboration accelerates vaccine development.',
    'arc.i9': 'Local communities lead reforestation projects.',
    'arc.empty': 'No records for this combination — try another filter.',
    'arc.note': 'Illustrative examples from the archive.',
    'map.over': '10 — Kindness Map',
    'map.today': 'Today:',
    'map.desc': 'Every day, one country in the spotlight. Explore what people, communities and scientists are building there.',
    'map.t1': 'Social projects', 'map.t2': 'Inspiring stories', 'map.t3': 'Scientific advances',
    'map.p1': 'Women’s cooperatives in rural communities grow their income through crafts and sustainable farming.',
    'map.p2': 'A teacher travels for miles every day to make sure children in remote villages get their lessons.',
    'map.p3': 'Local researchers develop low-cost solar solutions to irrigate small farms.',
    'help.over': '11 — Help Now',
    'help.title': 'Those who need help find those who want to help.',
    'help.lead': 'Help Now connects people who need help with people willing to help — nearby, safely and at the right moment.',
    'help.m1': 'Individual', 'help.m2': 'Pair', 'help.m3': 'Group',
    'help.f1': 'Automatic distance', 'help.f1d': 'Instantly see how close you are.',
    'help.f2': 'Reference points', 'help.f2d': 'Meet at well-known public places.',
    'help.f3': 'Temporary chat', 'help.f3d': 'A conversation that expires when the help is done.',
    'help.f4': 'Emergency button', 'help.f4d': 'Immediate access to official help.',
    'sim.live': 'Nearby request', 'sim.dist': 'Distance', 'sim.ref': 'Reference point', 'sim.refv': 'Central Square', 'sim.helpers': 'Available',
    'sim.radius': 'Search radius', 'sim.chat': 'Temporary chat',
    'sim.b1': 'Hi! I’m at Central Square, wearing a blue shirt.',
    'sim.b2': 'Perfect, I’ll be there in 5 minutes. 🙂',
    'sim.sos': 'Emergency button',
    'safe.over': '12 — Transparency',
    'safe.title': 'Safety First',
    'safe.p1': 'Help Now is temporarily available to Premium users only.',
    'safe.p2': 'This decision was not made as a monetization strategy.',
    'safe.p3': 'It exists so Kindness Atlas can develop, test and validate advanced community protection mechanisms.',
    'safe.now': 'Today', 'safe.nowv': 'Premium · validation phase', 'safe.goal': 'Future goal', 'safe.goalv': 'Free for everyone',
    'safe.c1': 'Phone verification', 'safe.c2': 'Facial verification', 'safe.c3': 'Anti-fraud systems', 'safe.c4': 'Suspicious activity monitoring', 'safe.c5': 'Advanced safety tools',
    'safe.quote': '“We want help to be accessible to everyone.”',
    'prem.over': '13 — Premium Community',
    'prem.title': 'For those who want to go beyond inspiration.',
    'prem.desc': 'Support the mission and unlock features that make the Atlas part of your daily routine.',
    'prem.b1': 'Help Now (temporarily Premium)', 'prem.b2': 'Daily “Did You Know”', 'prem.b3': '2 positive thoughts per day', 'prem.b4': 'Explore any country',
    'prem.b5': 'Personal library', 'prem.b6': 'Letters to the Future', 'prem.b7': 'News narration', 'prem.b8': 'Weekly positive digest',
    'react.over': '14 — Official reactions',
    'react.title': 'React with meaning.',
    'react.desc': 'Tap a reaction and feel the difference.',
    'react.1': 'Inspiring', 'react.2': 'Admirable', 'react.3': 'Kindness', 'react.4': 'Smart', 'react.5': 'Transformative',
    'react.n1': 'No traditional likes', 'react.n2': 'No dislikes', 'react.n3': 'No rankings',
    'prin.over': '15 — Principles',
    'prin.title': 'What guides us, every day.',
    'prin.1': 'Every good deed matters', 'prin.2': 'Kindness is not a competition', 'prin.3': 'Inspiring is worth more than going viral',
    'prin.4': 'Technology should bring people closer', 'prin.5': 'Impact is worth more than popularity', 'prin.6': 'What matters is helping, not the size of the help',
    'foot.local': 'Global edition',
    'foot.tag': 'See the best of humanity, every day.',
    'foot.mission': 'Mission',
    'foot.archive': 'Kindness Archive',
    'foot.safety': 'Safety',
    'foot.rights': 'All rights reserved.',
    'foot.note': 'Content shown on this page is illustrative.',
    'modal.email': 'Your best email',
    'modal.ph': 'you@email.com',
    'modal.submit': 'Count me in',
    'modal.fine': 'We’ll only use your email to tell you about the launch. No spam.',
    'modal.okTitle': 'You’re on the list!',
    'modal.okText': 'Thank you for being part of this. We’ll let you know as soon as Kindness Atlas is available.',
    'modal.close': 'Close'
  };

  /* Textos dinâmicos usados pelo JavaScript */
  var T = {
    pt: {
      title: 'Atlas da Bondade · Kindness Atlas™ — Veja diariamente o melhor da humanidade',
      desc: 'Uma plataforma global criada para descobrir, traduzir, compartilhar e incentivar a bondade humana.',
      modes: [
        { label: '👤 Individual', desc: 'Uma pessoa ajuda outra. Ideal para tarefas rápidas, como carregar compras ou dar uma orientação.', req: '“Preciso de ajuda para levar compras até o 3º andar.”', dist: 0.65 },
        { label: '👥 Dupla', desc: 'Duas pessoas ajudam juntas — mais segurança e companhia para tarefas que pedem um pouco mais.', req: '“Preciso de ajuda para levar um sofá até um ponto de doação.”', dist: 1.2 },
        { label: '🤝 Grupo', desc: 'Um grupo se mobiliza para ações maiores, como mutirões, mudanças ou apoio comunitário.', req: '“Mutirão para revitalizar a praça do bairro neste sábado.”', dist: 2.4 }
      ],
      missions0: 'Toque em uma missão quando concluí-la. Ninguém está contando além de você.',
      missionsN: function (n) { return n === 3 ? 'Todas as missões concluídas. Obrigado por espalhar bondade — sem pressa, sem placar. 💚' : 'Você concluiu ' + n + ' de 3 missões — no seu ritmo, sem pressa.'; },
      sos: 'Simulação: no app, o botão de emergência aciona serviços oficiais (190 / 192) e compartilha sua localização com contatos de confiança.',
      react: 'Reação registrada. Aqui, cada reação é um gesto — não um placar.',
      modal: {
        waitlist: ['Entre na Lista de Desejo', 'Seja uma das primeiras pessoas a ver o melhor da humanidade, todos os dias.'],
        download: ['O app está chegando', 'O Kindness Atlas será lançado em breve para Android. Deixe seu e-mail e avisaremos no dia do lançamento.'],
        article: ['Matéria completa no app', 'As matérias completas, com fontes e narração, estarão disponíveis no aplicativo. Entre na lista para ler primeiro.']
      },
      errEmpty: 'Digite seu e-mail.',
      errInvalid: 'Digite um e-mail válido, como voce@email.com.',
      dup: 'Este e-mail já está na lista. Obrigado! 💙',
      errSend: 'Não foi possível enviar agora. Verifique sua conexão e tente novamente.',
      km: function (v) { return v < 1 ? Math.round(v * 1000) + ' m' : v.toFixed(1).replace('.', ',') + ' km'; }
    },
    en: {
      title: 'Kindness Atlas™ — See the best of humanity, every day',
      desc: 'A global platform built to discover, translate, share and encourage human kindness.',
      modes: [
        { label: '👤 Individual', desc: 'One person helps another. Ideal for quick tasks like carrying groceries or giving directions.', req: '“I need help carrying groceries up to the 3rd floor.”', dist: 0.65 },
        { label: '👥 Pair', desc: 'Two people help together — more safety and company for tasks that need a little more.', req: '“I need help taking a couch to a donation point.”', dist: 1.2 },
        { label: '🤝 Group', desc: 'A group comes together for bigger actions, like community clean-ups, moves or neighborhood support.', req: '“Community effort to revitalize the neighborhood square this Saturday.”', dist: 2.4 }
      ],
      missions0: 'Tap a mission when you complete it. Nobody is counting but you.',
      missionsN: function (n) { return n === 3 ? 'All missions completed. Thank you for spreading kindness — no rush, no scoreboard. 💚' : 'You completed ' + n + ' of 3 missions — at your own pace.'; },
      sos: 'Simulation: in the app, the emergency button contacts official services (911) and shares your location with trusted contacts.',
      react: 'Reaction saved. Here, every reaction is a gesture — not a score.',
      modal: {
        waitlist: ['Join the Wishlist', 'Be one of the first people to see the best of humanity, every day.'],
        download: ['The app is coming', 'Kindness Atlas launches soon on Android. Leave your email and we’ll let you know on launch day.'],
        article: ['Full story in the app', 'Full stories, with sources and narration, will be available in the app. Join the list to read first.']
      },
      errEmpty: 'Please enter your email.',
      errInvalid: 'Please enter a valid email, like you@email.com.',
      dup: 'This email is already on the list. Thank you! 💙',
      errSend: 'We couldn’t send it right now. Check your connection and try again.',
      km: function (v) { return v < 1 ? Math.round(v * 1000) + ' m' : (v * 0.621).toFixed(1) + ' mi'; }
    }
  };

  var lang = 'pt';
  var PT = new Map();
  var PT_PH = new Map();
  $$('[data-i18n]').forEach(function (el) { PT.set(el, el.innerHTML); });
  $$('[data-i18n-ph]').forEach(function (el) { PT_PH.set(el, el.getAttribute('placeholder')); });

  function setLang(next) {
    lang = next === 'en' ? 'en' : 'pt';
    $$('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      el.innerHTML = lang === 'en' && EN[key] ? EN[key] : PT.get(el);
    });
    $$('[data-i18n-ph]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-ph');
      el.setAttribute('placeholder', lang === 'en' && EN[key] ? EN[key] : PT_PH.get(el));
    });
    document.documentElement.lang = lang === 'en' ? 'en-US' : 'pt-BR';
    document.title = T[lang].title;
    var md = $('meta[name="description"]');
    if (md) md.setAttribute('content', T[lang].desc);
    $$('.lang__btn').forEach(function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    store.set('ka_lang', lang);
    splitWords();
    renderMode();
    renderRadius();
    renderMissions();
    if (modalType) fillModal(modalType);
  }

  /* ---------------------------------------------------------
     2. ROLAGEM SUAVE (Lenis via CDN, opcional)
     --------------------------------------------------------- */
  var lenis = null;
  function initLenis() {
    if (reduceMotion || typeof window.Lenis !== 'function') return;
    lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  function headerOffset() { return -($('#header').offsetHeight + 8); }
  function scrollToTarget(target) {
    if (lenis) lenis.scrollTo(target, { offset: headerOffset(), duration: 1.4 });
    else {
      var y = target === 0 ? 0 : target.getBoundingClientRect().top + window.pageYOffset + headerOffset();
      window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id.length < 2) return;
    var target = id === '#top' ? 0 : $(id);
    if (target === null) return;
    e.preventDefault();
    closeMenu();
    scrollToTarget(target);
  });

  /* ---------------------------------------------------------
     3. MENU MOBILE
     --------------------------------------------------------- */
  var menuBtn = $('#menuBtn');
  var mobileNav = $('#mobileNav');
  function closeMenu() {
    mobileNav.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.innerHTML = '<svg class="i"><use href="#i-menu"/></svg>';
  }
  menuBtn.addEventListener('click', function () {
    var open = !mobileNav.classList.contains('is-open');
    mobileNav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.innerHTML = '<svg class="i"><use href="#i-' + (open ? 'x' : 'menu') + '"/></svg>';
  });
  mobileNav.addEventListener('click', function (e) { if (e.target.closest('button')) closeMenu(); });

  /* ---------------------------------------------------------
     4. REVELAÇÃO AO ROLAR
     --------------------------------------------------------- */
  function initReveal() {
    var items = $$('.reveal');
    if (!('IntersectionObserver' in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------
     5. MISSÃO: palavras acendem conforme a rolagem
     --------------------------------------------------------- */
  var words = [];
  function splitWords() {
    var el = $('[data-words]');
    if (!el) return;
    var text = el.textContent;
    el.innerHTML = text.split(/\s+/).map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ');
    words = $$('.w', el);
    paintWords();
  }
  function paintWords() {
    if (!words.length) return;
    var q = $('#missionQuote');
    var r = q.getBoundingClientRect();
    var vh = window.innerHeight;
    var p = reduceMotion ? 1 : (vh * 0.88 - r.top) / (r.height + vh * 0.35);
    p = Math.max(0, Math.min(1, p));
    var lit = Math.round(p * words.length);
    words.forEach(function (w, i) { w.style.color = i < lit ? '#0F172A' : '#94A3B8'; });
  }

  /* ---------------------------------------------------------
     6. EFEITOS DE ROLAGEM (progresso, header, parallax)
     --------------------------------------------------------- */
  var header = $('#header');
  var bar = $('#progressBar');
  var floats = $$('.float');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.pageYOffset;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
      header.classList.toggle('is-scrolled', y > 12);
      if (!reduceMotion && y < window.innerHeight * 1.2) {
        floats.forEach(function (f) {
          var d = parseFloat(f.getAttribute('data-depth')) || 0;
          f.style.setProperty('--py', (-y * d / 400) + 'px');
        });
      }
      paintWords();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ---------------------------------------------------------
     7. MOCKUP 3D (inclinação com o mouse)
     --------------------------------------------------------- */
  function initTilt() {
    var hero = $('#hero');
    var stage = $('#phoneStage');
    if (!finePointer || reduceMotion || !stage) return;
    hero.addEventListener('pointermove', function (e) {
      var r = stage.getBoundingClientRect();
      var cx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      var cy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      stage.style.setProperty('--ry', (-14 + cx * 22) + 'deg');
      stage.style.setProperty('--rx', (6 - cy * 14) + 'deg');
      floats.forEach(function (f) {
        var d = parseFloat(f.getAttribute('data-depth')) || 0;
        f.style.setProperty('--px', (cx * d) + 'px');
      });
    });
    hero.addEventListener('pointerleave', function () {
      stage.style.setProperty('--ry', '-14deg');
      stage.style.setProperty('--rx', '6deg');
    });
  }

  /* Botões magnéticos */
  function initMagnetic() {
    if (!finePointer || reduceMotion) return;
    $$('.magnetic').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.setProperty('--bx', ((e.clientX - r.left - r.width / 2) * 0.18) + 'px');
        b.style.setProperty('--by', ((e.clientY - r.top - r.height / 2) * 0.28) + 'px');
      });
      b.addEventListener('pointerleave', function () {
        b.style.setProperty('--bx', '0px');
        b.style.setProperty('--by', '0px');
      });
    });
  }

  /* ---------------------------------------------------------
     8. MISSÕES DA SEMANA
     --------------------------------------------------------- */
  var done = store.get('ka_missions', []);
  function renderMissions() {
    $$('.mission-card').forEach(function (c) {
      var on = done.indexOf(c.getAttribute('data-mission')) > -1;
      c.classList.toggle('is-done', on);
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    var s = $('#missionStatus');
    if (s) s.textContent = done.length ? T[lang].missionsN(done.length) : T[lang].missions0;
  }
  $$('.mission-card').forEach(function (c) {
    c.addEventListener('click', function () {
      var id = c.getAttribute('data-mission');
      var i = done.indexOf(id);
      if (i > -1) done.splice(i, 1); else done.push(id);
      store.set('ka_missions', done);
      renderMissions();
    });
  });

  /* ---------------------------------------------------------
     9. ARQUIVO DA BONDADE (filtros)
     --------------------------------------------------------- */
  function filterArchive() {
    var d = $('#fDecade').value, c = $('#fCountry').value, k = $('#fCategory').value;
    var shown = 0;
    $$('#archiveList li').forEach(function (li) {
      var ok = (d === 'all' || li.getAttribute('data-decade') === d) &&
               (c === 'all' || li.getAttribute('data-country') === c) &&
               (k === 'all' || li.getAttribute('data-cat') === k);
      li.hidden = !ok;
      if (ok) { shown++; li.style.animation = 'none'; void li.offsetWidth; li.style.animation = ''; }
    });
    $('#archiveEmpty').hidden = shown > 0;
  }
  ['#fDecade', '#fCountry', '#fCategory'].forEach(function (s) { $(s).addEventListener('change', filterArchive); });

  /* ---------------------------------------------------------
     10. MAPA DA BONDADE (abas)
     --------------------------------------------------------- */
  $$('.tab').forEach(function (t) {
    t.addEventListener('click', function () {
      var n = t.getAttribute('data-tab');
      $$('.tab').forEach(function (x) { var on = x === t; x.classList.toggle('is-active', on); x.setAttribute('aria-selected', on ? 'true' : 'false'); });
      $$('.tab-panel').forEach(function (p) { p.classList.toggle('is-active', p.getAttribute('data-panel') === n); });
    });
  });

  /* ---------------------------------------------------------
     11. AJUDE AGORA (simulador)
     --------------------------------------------------------- */
  var mode = 0;
  var radiusInput = $('#radiusInput');
  function flash(el) { el.classList.add('flash'); setTimeout(function () { el.classList.remove('flash'); }, 600); }
  function renderMode() {
    var m = T[lang].modes[mode];
    $('#modeDesc').textContent = m.desc;
    $('#simMode').textContent = m.label;
    $('#simReq').textContent = m.req;
    $('#simDistance').textContent = T[lang].km(m.dist);
  }
  function renderRadius() {
    var r = parseInt(radiusInput.value, 10);
    radiusInput.style.setProperty('--fill', ((r - 1) / 9 * 100) + '%');
    $('#radiusVal').textContent = lang === 'en' ? (r * 0.621).toFixed(1) + ' mi' : r + ' km';
    $('#simHelpers').textContent = String(Math.round(4 + r * 4.4 + mode * 2));
  }
  $$('.mode').forEach(function (b) {
    b.addEventListener('click', function () {
      mode = parseInt(b.getAttribute('data-mode'), 10) - 1;
      $$('.mode').forEach(function (x) { x.classList.toggle('is-active', x === b); });
      renderMode();
      renderRadius();
      flash($('#simDistance'));
      flash($('#simHelpers'));
    });
  });
  radiusInput.addEventListener('input', function () { renderRadius(); flash($('#simHelpers')); });

  var chatLeft = 59 * 60 + 59;
  setInterval(function () {
    chatLeft = chatLeft > 0 ? chatLeft - 1 : 3599;
    var m = Math.floor(chatLeft / 60), s = chatLeft % 60;
    $('#chatTimer').textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }, 1000);

  $('#sosBtn').addEventListener('click', function () {
    var b = this;
    b.classList.remove('is-pressed'); void b.offsetWidth; b.classList.add('is-pressed');
    toast(T[lang].sos, 5200);
  });

  /* ---------------------------------------------------------
     12. REAÇÕES OFICIAIS
     --------------------------------------------------------- */
  var reacted = store.get('ka_reactions', []);
  $$('.react').forEach(function (b) {
    var id = b.getAttribute('data-testid');
    if (reacted.indexOf(id) > -1) { b.classList.add('is-on'); b.setAttribute('aria-pressed', 'true'); }
    b.addEventListener('click', function () {
      var on = !b.classList.contains('is-on');
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      var i = reacted.indexOf(id);
      if (on && i < 0) reacted.push(id);
      if (!on && i > -1) reacted.splice(i, 1);
      store.set('ka_reactions', reacted);
      b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
      if (on) {
        burst(b, b.querySelector('.react__emoji').textContent);
        toast(T[lang].react, 2600);
      }
    });
  });
  function burst(host, emoji) {
    if (reduceMotion) return;
    for (var k = 0; k < 6; k++) {
      var s = document.createElement('span');
      s.className = 'burst';
      s.textContent = emoji;
      s.style.setProperty('--bx', (Math.random() * 120 - 60) + 'px');
      s.style.setProperty('--by', (-50 - Math.random() * 70) + 'px');
      s.style.animationDelay = (k * 0.04) + 's';
      host.appendChild(s);
      setTimeout((function (n) { return function () { n.remove(); }; })(s), 1200);
    }
  }

  /* ---------------------------------------------------------
     13. MODAL LISTA DE DESEJO (envio via Formspree, sem backend)
     O endereço do Formspree fica no atributo action do <form> em index.html.
     --------------------------------------------------------- */
  var modal = $('#modal');
  var form = $('#waitlistForm');
  var emailInput = $('#emailInput');
  var emailError = $('#emailError');
  var modalType = null;
  var lastFocus = null;

  function fillModal(type) {
    var t = T[lang].modal[type] || T[lang].modal.waitlist;
    $('#modalTitle').textContent = t[0];
    $('#modalText').textContent = t[1];
  }
  function openModal(type) {
    modalType = type;
    lastFocus = document.activeElement;
    fillModal(type);
    $('#modalForm').hidden = false;
    $('#modalSuccess').hidden = true;
    emailError.textContent = '';
    emailInput.classList.remove('is-invalid');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    if (lenis) lenis.stop();
    document.body.style.overflow = 'hidden';
    setTimeout(function () { emailInput.focus(); }, 250);
  }
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalType = null;
    if (lenis) lenis.start();
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-open-modal]');
    if (opener) { e.preventDefault(); closeMenu(); openModal(opener.getAttribute('data-open-modal')); return; }
    if (e.target.closest('[data-close-modal]')) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') {
      var f = $$('button, input, [href]', modal).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var submitBtn = $('[data-testid="waitlist-submit-btn"]');
  var FORMSPREE_READY = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(form.getAttribute('action') || '') &&
    form.getAttribute('action').indexOf('SEU_ID') < 0;

  function showSuccess() {
    form.reset();
    emailInput.classList.remove('is-invalid');
    emailError.textContent = '';
    $('#modalForm').hidden = true;
    $('#modalSuccess').hidden = false;
    var btn = $('[data-testid="waitlist-success-close-btn"]');
    if (btn) btn.focus();
  }
  function setSending(on) {
    submitBtn.disabled = on;
    submitBtn.classList.toggle('is-loading', on);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (submitBtn.disabled) return;
    var email = emailInput.value.trim().toLowerCase();
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (!email || !valid) {
      emailError.textContent = email ? T[lang].errInvalid : T[lang].errEmpty;
      emailInput.classList.add('is-invalid');
      emailInput.focus();
      return;
    }
    var list = store.get('ka_waitlist', []);
    if (list.some(function (x) { return x.email === email; })) {
      toast(T[lang].dup, 3000);
      showSuccess();
      return;
    }
    var platform = (form.querySelector('input[name="platform"]:checked') || {}).value || 'android';
    var entry = { email: email, platform: platform, language: lang === 'en' ? 'en-US' : 'pt-BR', source: modalType || 'wishlist' };
    function remember() {
      entry.date = new Date().toISOString();
      list.push(entry);
      store.set('ka_waitlist', list);
    }

    if (!FORMSPREE_READY) {
      console.warn('[Kindness Atlas] Formspree não configurado: troque SEU_ID_AQUI no atributo action do formulário em index.html.');
      remember();
      showSuccess();
      return;
    }

    var gotcha = form.querySelector('input[name="_gotcha"]');
    var payload = {
      email: email,
      platform: entry.platform,
      language: entry.language,
      source: entry.source,
      _subject: 'Nova inscrição na Lista de Desejo · Kindness Atlas',
      _gotcha: gotcha ? gotcha.value : ''
    };
    setSending(true);
    fetch(form.getAttribute('action'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok) throw new Error((data && data.errors && data.errors[0] && data.errors[0].message) || 'HTTP ' + res.status);
      });
    }).then(function () {
      remember();
      showSuccess();
    }).catch(function (err) {
      console.error('[Kindness Atlas] Falha no envio ao Formspree:', err);
      emailError.textContent = T[lang].errSend;
    }).then(function () {
      setSending(false);
    });
  });
  emailInput.addEventListener('input', function () {
    if (emailInput.classList.contains('is-invalid')) { emailInput.classList.remove('is-invalid'); emailError.textContent = ''; }
  });

  /* ---------------------------------------------------------
     14. TOAST
     --------------------------------------------------------- */
  var toastEl = $('#toast');
  var toastTimer = null;
  function toast(msg, ms) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-show'); }, ms || 3000);
  }

  /* ---------------------------------------------------------
     15. INICIALIZAÇÃO
     --------------------------------------------------------- */
  $$('.lang__btn').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  var saved = store.get('ka_lang', null);
  var initial = saved || 'pt';

  $('#year').textContent = new Date().getFullYear();
  initLenis();
  setLang(initial);
  initReveal();
  initTilt();
  initMagnetic();
  onScroll();
})();
