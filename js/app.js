ARKA.questions = ARKA.questions.concat(arkaBuildDrills());

const ui = {
  screen: SRS.store.coachDone ? "home" : "coach",
  coach: 0,
  session: null,
  notice: SRS.store.freezeNote || "",
  confirmReset: false
};

if (SRS.store.freezeNote) {
  SRS.store.freezeNote = "";
  SRS.save();
}

let deferredPrompt = null;
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  render();
});

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));
}

function topicById(id) {
  return ARKA.topics.find((topic) => topic.id === id);
}

function subjectOf(entry) {
  const topic = topicById(entry.topic);
  return topic ? topic.subject : "";
}

function allQuestions() {
  return ARKA.questions.concat(SRS.store.imported || []);
}

function questionsFor(topicId) {
  return allQuestions().filter((item) => item.topic === topicId);
}

function daysLeft() {
  const target = new Date(2028, 5, 17);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((target - now) / 86400000));
}

function materialize(entry, seed) {
  const rng = arkaRng(seed);
  const raw = entry.make
    ? entry.make(rng)
    : { q: entry.q, choices: entry.choices.slice(), why: entry.why };
  const value = entry.make ? raw.choices[0] : entry.choices[entry.a];
  const pairs = raw.choices.map((choice) => ({ choice, ok: choice === value }));
  for (let i = pairs.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng.next() * (i + 1));
    const swap = pairs[i];
    pairs[i] = pairs[j];
    pairs[j] = swap;
  }
  const topic = topicById(entry.topic);
  return {
    cardId: entry.id,
    topic: entry.topic,
    subject: topic.subject,
    title: topic.title,
    q: raw.q,
    choices: pairs.map((pair) => pair.choice),
    a: pairs.findIndex((pair) => pair.ok),
    why: raw.why,
    drill: !!entry.make,
    seed
  };
}

function dueQuestions(topicId) {
  return allQuestions()
    .filter((item) => SRS.isDue(item.id) && (!topicId || item.topic === topicId))
    .sort((a, b) => SRS.card(a.id).due - SRS.card(b.id).due);
}

function buildQueue(size, topicId) {
  const budget = SRS.newBudget();
  const pool = allQuestions().filter((item) => !topicId || item.topic === topicId);
  const topicOrder = Object.fromEntries(ARKA.topics.map((topic, index) => [topic.id, index]));
  const byTopic = (a, b) => (topicOrder[a.topic] || 0) - (topicOrder[b.topic] || 0);
  const unseen = pool.filter((item) => !item.make && !SRS.seen(item.id)).sort(byTopic);
  const unseenDrills = pool.filter((item) => item.make && !SRS.seen(item.id)).sort(byTopic);
  const queue = [];
  const used = new Set();

  function push(item) {
    if (!item || used.has(item.id) || queue.length >= size) return false;
    used.add(item.id);
    queue.push(item);
    return true;
  }

  dueQuestions(topicId).slice(0, Math.min(3, size)).forEach(push);

  let fresh = Math.min(budget, size - queue.length);
  const turkish = unseen.filter((item) => subjectOf(item) === "turkce");
  const mathFixed = unseen.filter((item) => subjectOf(item) === "matematik");
  const geoFixed = unseen.filter((item) => subjectOf(item) === "geometri");
  const mathDrills = unseenDrills.filter((item) => subjectOf(item) === "matematik");
  const geoDrills = unseenDrills.filter((item) => subjectOf(item) === "geometri");
  let geoTurn = false;
  while (fresh > 0 && queue.length < size && (turkish.length || mathFixed.length || geoFixed.length || mathDrills.length || geoDrills.length)) {
    if (turkish.length) {
      if (push(turkish.shift())) fresh -= 1;
    }
    if (fresh > 0 && queue.length < size) {
      geoTurn = !geoTurn;
      const primaryDrills = geoTurn ? geoDrills : mathDrills;
      const secondaryDrills = geoTurn ? mathDrills : geoDrills;
      const primaryFixed = geoTurn ? geoFixed : mathFixed;
      const secondaryFixed = geoTurn ? mathFixed : geoFixed;
      const next = primaryDrills.shift() || secondaryDrills.shift() || primaryFixed.shift() || secondaryFixed.shift();
      if (!next || !push(next)) break;
      fresh -= 1;
    }
  }

  dueQuestions(topicId).forEach((item) => {
    if (queue.length < size) push(item);
  });

  const turkishIndex = queue.findIndex((item) => subjectOf(item) === "turkce");
  if (turkishIndex > 0) {
    const [first] = queue.splice(turkishIndex, 1);
    queue.unshift(first);
  }
  return queue;
}

function startSession(options) {
  const topicId = options && options.topicId;
  const size = options && options.size ? options.size : 8;
  const cram = options && options.cram;
  let entries;
  if (cram) {
    entries = allQuestions()
      .filter((item) => SRS.seen(item.id))
      .sort((a, b) => (SRS.card(a.id).last || 0) - (SRS.card(b.id).last || 0))
      .slice(0, size);
  } else {
    entries = buildQueue(size, topicId);
  }
  if (!entries.length) {
    ui.session = { empty: true, topicId: topicId || "" };
    ui.screen = "session";
    render();
    return;
  }
  ui.session = {
    queue: entries.map((entry, index) => materialize(entry, (Date.now() + index * 997) >>> 0)),
    index: 0,
    phase: "ask",
    tAsk: Date.now(),
    pause: 0,
    log: [],
    flavored: false,
    overlay: null
  };
  ui.screen = "session";
  persistSession();
  render();
}

function persistSession() {
  if (!ui.session || ui.session.empty) sessionStorage.removeItem("arka-session");
  else sessionStorage.setItem("arka-session", JSON.stringify(ui.session));
}

function currentItem() {
  return ui.session.queue[ui.session.index];
}

function gradeAndAdvance(quality) {
  const session = ui.session;
  const item = currentItem();
  let q = quality;
  if (item.retry && q > 3) q = 3;
  const wasNew = !SRS.seen(item.cardId);
  const card = SRS.review(item.cardId, q);
  if (wasNew) SRS.consumeNew(1);
  SRS.markShowUp();
  session.log.push({ ok: q >= 3, subject: item.subject, topic: item.topic });
  session.pending = null;
  if (q < 3 && item.drill && !item.retry) {
    const template = allQuestions().find((entry) => entry.id === item.cardId);
    if (template) {
      const fresh = materialize(template, (Date.now() + 17) >>> 0);
      fresh.retry = true;
      session.queue.splice(session.index + 3, 0, fresh);
    }
  }
  session.index += 1;
  if (!session.flavored && session.index === 4 && session.index < session.queue.length) {
    session.flavored = true;
    session.phase = "flavor";
    session.flavor = pickFlavor();
  } else if (session.index >= session.queue.length) {
    ui.screen = "result";
    sessionStorage.removeItem("arka-session");
  } else {
    session.phase = "ask";
    session.tAsk = Date.now();
    session.pause = 0;
    session.overlay = null;
  }
  persistSession();
  render();
}

function pickFlavor() {
  const list = ARKA.flavors;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

function topicStat(topicId) {
  const cards = questionsFor(topicId);
  let introduced = 0;
  let seen = 0;
  let correct = 0;
  let due = 0;
  cards.forEach((card) => {
    const state = SRS.card(card.id);
    if (!state || !state.seen) return;
    introduced += 1;
    seen += state.seen;
    correct += state.correct;
    if (SRS.isDue(card.id)) due += 1;
  });
  return { total: cards.length, introduced, seen, correct, due };
}

function subjectRate(subject) {
  const topics = ARKA.topics.filter((topic) => topic.subject === subject);
  const totals = topics.reduce((sum, topic) => {
    const stat = topicStat(topic.id);
    sum.introduced += stat.introduced;
    sum.total += stat.total;
    return sum;
  }, { introduced: 0, total: 0 });
  return totals.total ? Math.round((totals.introduced / totals.total) * 100) : 0;
}

function nextOpenTopic(subject) {
  const topics = ARKA.topics.filter((topic) => topic.subject === subject);
  return topics.find((topic) => topicStat(topic.id).introduced < topicStat(topic.id).total) || topics[0];
}

function lessonOf(topicId) {
  return ARKA.lessons[topicId] || null;
}

function lessonLinks(lesson) {
  if (!lesson) return "";
  const extra = lesson.also
    ? `<br><a href="${lesson.also}" target="_blank" rel="noopener">${esc(lesson.alsoLabel)}</a>`
    : "";
  return `<p><a href="${lesson.video}" target="_blank" rel="noopener">${esc(lesson.label)}</a>${extra}</p>`;
}

function standalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
}

function render() {
  const app = document.getElementById("app");
  const nav = document.getElementById("nav");
  const showNav = ["home", "path", "progress", "goal", "ways", "papers"].includes(ui.screen);
  nav.hidden = !showNav;
  if (showNav) {
    nav.innerHTML = [
      ["home", "Oda"],
      ["path", "Yol"],
      ["progress", "Defter"],
      ["goal", "Hedef"]
    ].map(([id, label]) => `<button data-act="go" data-screen="${id}" class="${ui.screen === id ? "on" : ""}">${label}</button>`).join("");
  }
  const screens = { coach: renderCoach, home: renderHome, session: renderSession, result: renderResult, path: renderPath, progress: renderProgress, goal: renderGoal, ways: renderWays, papers: renderPapers };
  app.innerHTML = (screens[ui.screen] || renderHome)();
}

function renderCoach() {
  const cards = [
    { kicker: "Kapı", title: "Burası dershane panosu değil.", text: "Günde bir tur, yaklaşık 10 dakika. 2028 Haziran'ına kadar aynı kapıdan girip çıkacaksın. Tur bitince uygulama da biter." },
    { kicker: "Matematik", title: "Hedef 40 net değil.", text: "2026 TYT'de temel matematik ortalaması, tüm adaylarda yaklaşık 6 netti. 12 net, matematik seven biri olmanı gerektirmez. Kalabalığın önüne geçer." },
    { kicker: "Yöntem", title: "Yanlış, konunun anlatıldığı yer.", text: "Doğru bildiğin kart kaybolmaz, günler sonra döner. Arada bir 80'ler korkusu, Lovecraft ya da bir resim. Dersin yerine değil, nefes için." }
  ];
  const card = cards[ui.coach];
  return `<p class="kicker">${esc(card.kicker)} · ${ui.coach + 1}/3</p>
    <h1>${esc(card.title)}</h1>
    <p class="sub">${esc(card.text)}</p>
    <button class="primary" data-act="coach-next">${ui.coach === 2 ? "Odaya gir" : "Devam"}</button>
    <button class="ghost" data-act="coach-skip">Geç</button>`;
}

function renderHome() {
  const due = dueQuestions().length;
  const turkish = nextOpenTopic("turkce");
  const math = nextOpenTopic("matematik");
  const geo = nextOpenTopic("geometri");
  const streak = SRS.store.streak.n;
  const install = deferredPrompt && !standalone()
    ? `<button class="ghost" data-act="install">Telefonuna ekle</button>`
    : "";
  const notice = ui.notice ? `<div class="card"><p>${esc(ui.notice)}</p></div>` : "";
  return `<p class="kicker">Arka Oda · TYT</p>
    <h1>Gece turu.</h1>
    <p class="sub">Hacettepe Amerikan Kültürü ve Edebiyatı · 2028'e yaklaşık ${daysLeft()} gün. Tarih ÖSYM takvimiyle netleşir.</p>
    ${notice}
    <button class="primary" data-act="start">Bugünkü tur<small>Türkçe ile açılır · en çok 8 soru · yaklaşık 10 dakika</small></button>
    <div class="bars">
      <div><div class="bar-label"><span>Türkçe · ${esc(turkish.title)}</span><span>${subjectRate("turkce")}%</span></div><div class="track"><div class="fill" style="width:${subjectRate("turkce")}%"></div></div></div>
      <div><div class="bar-label"><span>Matematik · ${esc(math.title)}</span><span>${subjectRate("matematik")}%</span></div><div class="track"><div class="fill math" style="width:${subjectRate("matematik")}%"></div></div></div>
      <div><div class="bar-label"><span>Geometri · ${esc(geo.title)}</span><span>${subjectRate("geometri")}%</span></div><div class="track"><div class="fill geo" style="width:${subjectRate("geometri")}%"></div></div></div>
    </div>
    <p class="note">${due ? `${due} kartın vakti gelmiş, tur onları öne alır.` : "Bugün bekleyen tekrar yok. Tur yeni kart açar."} ${streak ? `Üst üste ${streak} gün.` : "İlk tur hazır."}</p>
    ${renderIdil(math, geo)}
    <button class="ghost" data-act="go" data-screen="papers">Çıkmış kitapçıklar</button>
    <button class="ghost" data-act="go" data-screen="ways">Sıkılınca ne olur</button>
    ${install}
    <p class="meta" style="margin-top:18px">İlerleme bu tarayıcıda durur. Defter'den yedek al.</p>`;
}

function renderSession() {
  const session = ui.session;
  if (!session || session.empty) {
    const unseen = allQuestions().filter((item) => !SRS.seen(item.id)).length;
    return `<p class="kicker">Tur</p><h2>${unseen ? "Bugünkü yeni kart hakkı bitti." : "Açık yeni kart kalmadı."}</h2>
      <p class="sub">Öğrenilenler silinmedi. ${unseen ? "Dört kart daha açabilirsin." : "Eskiler karışınca sayılar yine değişir."}</p>
      ${unseen ? `<button class="primary" data-act="bonus">4 yeni kart aç</button>` : ""}
      <button class="ghost" data-act="cram">Eskileri karıştır</button>
      <button class="text-btn" data-act="go" data-screen="home">Odaya dön</button>`;
  }
  if (session.overlay) return renderFlavor(session.overlay, "overlay-close");
  if (session.phase === "flavor") return renderFlavor(session.flavor, "flavor-next");
  const item = currentItem();
  const dots = session.queue.map((_, index) => `<i class="dot ${index < session.index ? "done" : ""} ${index === session.index ? "on" : ""}"></i>`).join("");
  const pending = session.pending;
  let choices = item.choices.map((choice, index) => {
    let cls = "choice";
    if (pending) {
      if (index === item.a) cls += " right";
      else if (index === pending.picked) cls += " wrong";
      else cls += " dim";
    }
    return `<button class="${cls}" data-act="pick" data-index="${index}" ${pending ? "disabled" : ""}><span class="k">${"ABCDE"[index]}</span><span>${esc(choice)}</span></button>`;
  }).join("");
  let feedback = "";
  if (pending) {
    const topic = topicById(item.topic);
    const lesson = lessonOf(item.topic);
    const idil = lesson
      ? `<div class="why"><strong>İdil:</strong> ${esc(lesson.move)}${lessonLinks(lesson)}</div>`
      : "";
    feedback = `<div class="why ${pending.ok ? "" : "bad"}">${esc(item.why)}</div>
      ${idil}
      <details ${pending.ok ? "" : "open"}><summary>Konunun kısa hali</summary><div class="teach">${esc(topic.teach)}</div></details>
      ${pending.ok
        ? `<div class="split"><button class="ghost" data-act="grade" data-quality="3">Emin değildim</button><button class="primary" data-act="grade" data-quality="auto">Devam</button></div>`
        : `<button class="primary" data-act="grade" data-quality="1">Anladım, devam</button>`}`;
  }
  const pill = item.subject === "matematik" ? "math" : (item.subject === "geometri" ? "geo" : "");
  return `<div class="top-actions"><span class="pill ${pill}">${esc(item.title)}</span><button class="text-btn" data-act="bored">Sıkıldım</button></div>
    <div class="dots">${dots}</div>
    <p class="prompt">${esc(item.q)}</p>
    ${choices}
    ${feedback}
    <button class="text-btn" data-act="abandon">Turu bırak</button>`;
}

function renderFlavor(flavor, act) {
  return `<p class="kicker">${esc(flavor.tag)}</p>
    <h2>Ara kapısı.</h2>
    <p class="sub" style="white-space:pre-wrap">${esc(flavor.text)}</p>
    <button class="primary" data-act="${act}">Soruya dön</button>`;
}

function renderResult() {
  const log = ui.session ? ui.session.log : [];
  const ok = log.filter((item) => item.ok).length;
  const flavor = pickFlavor();
  const again = SRS.newBudget() > 0;
  return `<p class="kicker">Tur bitti</p>
    <h1>${ok}/${log.length}</h1>
    <p class="sub">Doğru bildiklerin günler sonra döner. Yanlışlar bugün içinde, yaklaşık 20 dakika sonra yeniden kapıyı çalar.</p>
    <div class="card"><p class="kicker">${esc(flavor.tag)}</p><p style="white-space:pre-wrap">${esc(flavor.text)}</p></div>
    <button class="primary" data-act="go" data-screen="home" style="margin-top:14px">Yeter, kapat</button>
    ${again ? `<button class="ghost" data-act="start-short">4 soru daha</button>` : `<button class="ghost" data-act="bonus-start">Bugün 4 kart daha aç</button>`}`;
}

function renderPath() {
  const groups = [
    ["turkce", "Türkçe"],
    ["matematik", "Matematik"],
    ["geometri", "Geometri"]
  ];
  const body = groups.map(([subject, label]) => {
    const items = ARKA.topics.filter((topic) => topic.subject === subject).map((topic) => {
      const stat = topicStat(topic.id);
      const pct = stat.total ? Math.round((stat.introduced / stat.total) * 100) : 0;
      return `<button class="ghost path-item" data-act="focus" data-topic="${topic.id}"><strong>${esc(topic.title)}</strong><span>${stat.introduced}/${stat.total} kart · %${pct}${stat.due ? ` · ${stat.due} tekrar` : ""}</span></button>`;
    }).join("");
    return `<div class="sec">${label}</div>${items}`;
  }).join("");
  return `<p class="kicker">Yol</p><h2>Kapılar sırayla.</h2><p class="sub">İstediğin kapıdan 6 soruluk tur açılır. Evdeki tur Türkçe, matematik ve geometriyi karıştırır.</p>${body}`;
}

function renderProgress() {
  const log = SRS.store.log || [];
  const ok = log.filter((item) => item.ok).length;
  const rate = log.length ? Math.round((ok / log.length) * 100) : 0;
  const reset = ui.confirmReset
    ? `<button class="ghost warn" data-act="reset-yes">Evet, ilerlemeyi sil</button>`
    : `<button class="ghost" data-act="reset-ask">İlerlemeyi sil</button>`;
  return `<p class="kicker">Defter</p>
    <h2>${log.length} soru</h2>
    <p class="sub">İsabet %${rate}. Üst üste ${SRS.store.streak.n || 0} gün. İstirahat hakkı: ${SRS.store.freeze || 0}.</p>
    <p class="note">Bu yüzde sınav neti değildir. Kartların burada ne kadar oturduğudur.</p>
    <div class="split" style="margin-top:14px">
      <button class="ghost" data-act="export">Yedek al</button>
      <button class="ghost" data-act="import">Yedek yükle</button>
    </div>
    <input id="import-file" type="file" accept="application/json" hidden>
    ${reset}
    <p class="meta" style="margin-top:16px">Yeni kart sınırı günde 6. Bitince tur tekrarları çevirir. İstersen o gün 4 kart daha açılır.</p>`;
}

function renderGoal() {
  return `<p class="kicker">Hedef</p>
    <h2>Hacettepe, Amerikan Kültürü ve Edebiyatı.</h2>
    <p class="sub">Edebiyat Fakültesi, İngilizce, puan türü DİL. Program kodu 104810044.</p>
    <div class="card"><p>2026 yerleştirmede taban puan yaklaşık 454, başarı sırası 6.711, kontenjan 50. 2025'te sıra 5.465, kontenjan 65'ti. Bu bir sözleşme değil. 2028'de kayar.</p></div>
    <div class="card" style="margin-top:10px"><p>DİL puanının yaklaşık %40'ı TYT, %60'ı YDT'dir. YDT 80 soruluk yabancı dil testidir. YDS başka bir sınavdır; üniversite yerleştirmesinde kullanılan test YDT'dir. Bu odanın işi TYT'nin Türkçe ve matematik kapısı.</p></div>
    <div class="card" style="margin-top:10px"><p>2026 TYT'de Türkçe ortalaması yaklaşık 20 net, temel matematik yaklaşık 6 netti. Türkçede 28, matematikte 12-15, sevmeden de ulaşılabilen bir aralıktır. Temel matematikteki 40 sorunun kabaca 10'u geometridir. Sosyal ve fen de TYT'de vardır; bu odanın kapısı onlar değil.</p></div>
    <p class="note" style="margin-top:14px">Buradaki sorular ÖSYM kitapçığı değildir. 2026 kitapçıkları teliflidir, resmi sayfadan açılır. Hugging Face ve GitHub'daki büyük YKS dosyaları da ya yayınevi sorusu ya da e-postayla açılan araştırma verisidir. TurkishMMLU'nun Türkçe bölümü paragraf değil, edebiyat bilgisidir ve çözüm açıklaması yoktur. O yüzden Türkçe burada yazıldı. Matematik kalıptan üretilir; kart dönünce sayılar değişir.</p>
    <p class="note"><a href="https://www.osym.gov.tr/TR,34130/2026-yks-tyt-ayt-ve-ydt-temel-soru-kitapciklari-ve-cevap-anahtarlari.html" target="_blank" rel="noopener">2026 ÖSYM kitapçıkları</a><br>
    <a href="https://yokatlas.yok.gov.tr/lisans.php?y=104810044" target="_blank" rel="noopener">YÖK Atlas program sayfası</a></p>`;
}

function renderIdil(math, geo) {
  const row = (topic) => {
    const lesson = lessonOf(topic.id);
    return `<div class="idil-row"><strong>${topic.subject === "geometri" ? "Geometri" : "Matematik"}: ${esc(topic.title)}</strong><p>${esc(lesson.move)}</p>${lessonLinks(lesson)}<button class="ghost" data-act="focus" data-topic="${topic.id}">Bu kapıyı çöz</button></div>`;
  };
  return `<div class="card idil"><p class="kicker">İdil ile</p>${row(math)}${row(geo)}</div>`;
}

function renderPapers() {
  const years = ARKA.papers.map((paper) => `<a class="ghost" href="${paper.url}" target="_blank" rel="noopener"><strong>${esc(paper.year)} TYT</strong><span>${esc(paper.note)}</span></a>`).join("");
  const watches = [
    ["2026 çıkmış orantı sorusu", "Çözüm videosu, sorunun kendisi videoda.", "https://www.youtube.com/watch?v=cr8sB53UATg"],
    ["TYT matematik kampı", "Rehber Matematik. Bölümler kesir, yüzde, üslü sayı, küme diye ayrılmış.", "https://www.youtube.com/watch?v=nTEVxJLPeKE"],
    ["TYT geometri kampı", "Rehber Matematik, 49 gün. Doğru, üçgen, dik üçgen, dörtgen, çember.", "https://www.youtube.com/playlist?list=PLVoSZ0D0CB3ovGqsyyKyl129FIZEXQm60"]
  ].map(([title, note, url]) => `<a class="ghost" href="${url}" target="_blank" rel="noopener"><strong>${esc(title)}</strong><span>${esc(note)}</span></a>`).join("");
  return `<p class="kicker">Çıkmış</p>
    <h2>Kitapçık ÖSYM'de, çözüm videoda.</h2>
    <p class="sub">Soru metnini buraya koymuyorum. İdil aynı konunun nasıl çözüleceğini odada söylüyor. Aşağıdaki sayfalar resmi kitapçık, videolar da o türün anlatıldığı yer.</p>
    <div class="sec">Kitapçıklar</div>
    <div class="stack">${years}</div>
    <div class="sec">Çözüm</div>
    <div class="stack">${watches}</div>`;
}

function renderWays() {
  const items = ARKA.ways.map((way) => `<div class="card"><strong>${esc(way.title)}</strong><p>${esc(way.text)}</p></div>`).join("");
  return `<p class="kicker">Sıkılınca</p><h2>Tur bitecek şekilde kuruldu.</h2><div class="stack" style="margin-top:14px">${items}</div>`;
}

document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-act]");
  if (!button) return;
  const act = button.dataset.act;
  if (act === "go") {
    ui.screen = button.dataset.screen;
    ui.session = ui.screen === "result" ? ui.session : null;
    if (ui.screen !== "session") sessionStorage.removeItem("arka-session");
    render();
  } else if (act === "coach-next") {
    if (ui.coach >= 2) finishCoach();
    else { ui.coach += 1; render(); }
  } else if (act === "coach-skip") finishCoach();
  else if (act === "start") startSession({ size: 8 });
  else if (act === "start-short") startSession({ size: 4 });
  else if (act === "focus") startSession({ size: 6, topicId: button.dataset.topic });
  else if (act === "bonus") {
    SRS.grantBonus();
    startSession({ size: 4, topicId: ui.session && ui.session.topicId });
  } else if (act === "bonus-start") {
    SRS.grantBonus();
    startSession({ size: 4 });
  } else if (act === "cram") startSession({ size: 8, cram: true });
  else if (act === "pick") pick(Number(button.dataset.index));
  else if (act === "grade") gradeFromButton(button.dataset.quality);
  else if (act === "bored") openOverlay();
  else if (act === "overlay-close") closeOverlay();
  else if (act === "flavor-next") {
    ui.session.phase = "ask";
    ui.session.tAsk = Date.now();
    ui.session.pause = 0;
    persistSession();
    render();
  } else if (act === "abandon") {
    ui.session = null;
    sessionStorage.removeItem("arka-session");
    ui.screen = "home";
    render();
  } else if (act === "install" && deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt = null;
    render();
  } else if (act === "export") exportProgress();
  else if (act === "import") document.getElementById("import-file").click();
  else if (act === "reset-ask") { ui.confirmReset = true; render(); }
  else if (act === "reset-yes") {
    SRS.reset();
    ui.confirmReset = false;
    ui.screen = "coach";
    ui.coach = 0;
    render();
  }
});

function finishCoach() {
  SRS.markCoach();
  SRS.store.freezeNote = "";
  SRS.save();
  ui.notice = "";
  ui.screen = "home";
  render();
}

function pick(index) {
  const session = ui.session;
  if (!session || session.phase !== "ask" || session.pending) return;
  const item = currentItem();
  session.pending = { picked: index, ok: index === item.a };
  session.phase = "feedback";
  persistSession();
  render();
}

function gradeFromButton(flag) {
  const session = ui.session;
  if (!session || !session.pending) return;
  if (flag === "1") {
    gradeAndAdvance(1);
    return;
  }
  if (flag === "3") {
    gradeAndAdvance(3);
    return;
  }
  const item = currentItem();
  const elapsed = Date.now() - session.tAsk - (session.pause || 0);
  const limit = Math.min(50000, 10000 + item.q.length * 55);
  gradeAndAdvance(elapsed < limit ? 5 : 4);
}

function openOverlay() {
  if (!ui.session || ui.session.phase !== "ask") return;
  ui.session.pauseStart = Date.now();
  ui.session.overlay = pickFlavor();
  persistSession();
  render();
}

function closeOverlay() {
  const session = ui.session;
  if (session.pauseStart) session.pause += Date.now() - session.pauseStart;
  session.pauseStart = 0;
  session.overlay = null;
  persistSession();
  render();
}

function exportProgress() {
  const blob = new Blob([JSON.stringify(SRS.raw(), null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "arka-oda-ilerleme.json";
  link.click();
  URL.revokeObjectURL(link.href);
}

document.addEventListener("change", (event) => {
  if (event.target.id !== "import-file" || !event.target.files[0]) return;
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (data && data.v === 1 && data.cards) {
        SRS.replace(data);
        ui.screen = "home";
        ui.notice = "Yedek yüklendi.";
      } else if (data && Array.isArray(data.questions)) {
        const clean = data.questions.filter((item) => item && item.id && item.topic && item.q && Array.isArray(item.choices) && item.choices.length === 5 && item.why && topicById(item.topic));
        SRS.store.imported = (SRS.store.imported || []).concat(clean);
        SRS.save();
        ui.notice = `${clean.length} soru eklendi.`;
      } else {
        ui.notice = "Bu dosya tanınmadı.";
      }
    } catch (err) {
      ui.notice = "Dosya okunamadı.";
    }
    render();
  };
  reader.readAsText(file);
});

document.addEventListener("keydown", (event) => {
  if (!ui.session || ui.session.phase !== "ask") return;
  const n = Number(event.key);
  if (n >= 1 && n <= 5) pick(n - 1);
});

const saved = sessionStorage.getItem("arka-session");
if (saved && SRS.store.coachDone) {
  try {
    ui.session = JSON.parse(saved);
    ui.screen = "session";
  } catch (err) {
    sessionStorage.removeItem("arka-session");
  }
}

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

render();
