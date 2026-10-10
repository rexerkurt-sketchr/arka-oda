/* Aralıklı tekrar: SM-2'nin kısa hali.
   Yanlış kart bugün içinde döner, doğru kart 1 gün, 3 gün, sonra ease ile uzar.
   Tavan 60 gündür; 2028'e kadar "öğrendim" deyip kaybolmasın. */
const SRS = (() => {
  const KEY = "arka-oda-v1";

  function blank() {
    return {
      v: 1,
      cards: {},
      streak: { n: 0, last: "", studied: 0 },
      freeze: 0,
      freezeNote: "",
      day: { key: "", newCount: 0, bonus: 0 },
      log: [],
      coachDone: false,
      taught: {}
    };
  }

  let store = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return blank();
      const data = JSON.parse(raw);
      if (!data || data.v !== 1) return blank();
      data.cards = data.cards || {};
      data.streak = data.streak || { n: 0, last: "", studied: 0 };
      data.day = data.day || { key: "", newCount: 0, bonus: 0 };
      data.log = Array.isArray(data.log) ? data.log : [];
      data.taught = data.taught || {};
      return data;
    } catch (err) {
      return blank();
    }
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(store));
  }

  function dayKey(date) {
    const d = date || new Date();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${m}-${day}`;
  }

  function shiftDay(key, delta) {
    const [y, m, d] = key.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    dt.setDate(dt.getDate() + delta);
    return dayKey(dt);
  }

  function rollDay() {
    const today = dayKey();
    if (store.day.key !== today) {
      store.day = { key: today, newCount: 0, bonus: 0 };
      save();
    }
  }

  function card(id) {
    return store.cards[id] || null;
  }

  function seen(id) {
    return !!(store.cards[id] && store.cards[id].seen);
  }

  function isDue(id, now) {
    const c = store.cards[id];
    if (!c || !c.seen) return false;
    return c.due <= (now || Date.now());
  }

  function newBudget() {
    rollDay();
    return Math.max(0, 6 + (store.day.bonus || 0) - (store.day.newCount || 0));
  }

  function grantBonus() {
    rollDay();
    store.day.bonus = (store.day.bonus || 0) + 4;
    save();
  }

  function consumeNew(count) {
    rollDay();
    store.day.newCount = (store.day.newCount || 0) + count;
    save();
  }

  function review(id, quality, now) {
    const t = now || Date.now();
    const prev = store.cards[id] || {
      ease: 2.3,
      reps: 0,
      interval: 0,
      due: 0,
      lapses: 0,
      seen: 0,
      correct: 0,
      last: 0
    };
    const next = Object.assign({}, prev);
    next.seen += 1;
    if (quality < 3) {
      next.lapses += 1;
      next.reps = 0;
      next.interval = 0;
      next.ease = Math.max(1.3, next.ease - 0.2);
      next.due = t + 20 * 60 * 1000;
    } else {
      next.correct += 1;
      if (next.reps === 0) next.interval = 1;
      else if (next.reps === 1) next.interval = 3;
      else next.interval = Math.round(next.interval * next.ease);
      if (quality === 3) next.interval = Math.max(1, Math.round(next.interval * 0.6));
      if (quality === 5 && next.reps >= 1) next.interval = Math.round(next.interval * 1.25);
      next.interval = Math.min(60, Math.max(1, next.interval));
      next.reps += 1;
      const gap = 5 - quality;
      next.ease = Math.max(1.3, next.ease + (0.1 - gap * (0.08 + gap * 0.02)));
      next.due = t + next.interval * 86400000;
    }
    next.last = t;
    store.cards[id] = next;
    store.log.push({ id, ok: quality >= 3, q: quality, t });
    if (store.log.length > 400) store.log = store.log.slice(-400);
    save();
    return next;
  }

  function markShowUp() {
    const today = dayKey();
    if (store.streak.last === today) return;
    const yesterday = shiftDay(today, -1);
    const before = shiftDay(today, -2);
    store.freezeNote = "";
    if (store.streak.last === yesterday) {
      store.streak.n += 1;
    } else if (store.streak.last === before && store.freeze > 0 && store.streak.n > 0) {
      store.freeze -= 1;
      store.streak.n += 1;
      store.freezeNote = "Dün uğramadın. Birikmiş bir istirahat hakkı vardı, seri duruyor.";
    } else {
      store.streak.n = 1;
    }
    store.streak.last = today;
    store.streak.studied = (store.streak.studied || 0) + 1;
    if (store.streak.studied % 5 === 0) store.freeze = Math.min(2, (store.freeze || 0) + 1);
    save();
  }

  function whenText(cardState) {
    if (!cardState) return "bugün içinde";
    if (cardState.interval <= 0) return "bugün içinde, yaklaşık 20 dakika sonra";
    if (cardState.interval === 1) return "yarın";
    return `${cardState.interval} gün sonra`;
  }

  function raw() {
    return JSON.parse(JSON.stringify(store));
  }

  function replace(data) {
    if (!data || data.v !== 1 || !data.cards) throw new Error("Bu dosya Arka Oda ilerlemesi değil.");
    store = data;
    save();
  }

  function reset() {
    store = blank();
    save();
  }

  function markCoach() {
    store.coachDone = true;
    save();
  }

  function markTaught(topicId) {
    store.taught[topicId] = true;
    save();
  }

  return {
    get store() {
      return store;
    },
    save,
    rollDay,
    seen,
    isDue,
    card,
    newBudget,
    grantBonus,
    consumeNew,
    review,
    markShowUp,
    whenText,
    raw,
    replace,
    reset,
    markCoach,
    markTaught,
    dayKey
  };
})();
