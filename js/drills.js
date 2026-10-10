/* Matematik alıştırmaları parametrik: aynı kart dönünce sayılar değişir.
   Şıkkın yerini ezberlemek işe yaramaz. Her şablon kendi tekrar kartıdır. */

function arkaRng(seed) {
  let a = seed >>> 0;
  return {
    next() {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    },
    int(min, max) {
      return min + Math.floor(this.next() * (max - min + 1));
    },
    pick(list) {
      return list[this.int(0, list.length - 1)];
    }
  };
}

function arkaIntChoices(correct, wrongs) {
  const out = [String(correct)];
  wrongs.forEach((w) => {
    if (!Number.isFinite(w)) return;
    const s = String(w);
    if (!out.includes(s)) out.push(s);
  });
  let k = 1;
  while (out.length < 5 && k < 40) {
    const step = Math.ceil(k / 2);
    const v = correct + (k % 2 === 1 ? step : -step);
    const s = String(v);
    if (!out.includes(s)) out.push(s);
    k += 1;
  }
  return out.slice(0, 5);
}

function arkaStrChoices(correct, wrongs) {
  const out = [correct];
  wrongs.forEach((w) => {
    if (w !== correct && !out.includes(w)) out.push(w);
  });
  const spare = ["0", "1", "2", "1/2", "3/2", "5/4", "7/4", "5/3", "4/3", "5/6", "1/6", "2/5", "3/5"];
  spare.forEach((w) => {
    if (out.length < 5 && !out.includes(w) && w !== correct) out.push(w);
  });
  return out.slice(0, 5);
}

function arkaGcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function arkaFrac(n, d) {
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = arkaGcd(n, d);
  n /= g;
  d /= g;
  if (d === 1) return String(n);
  return `${n}/${d}`;
}

function arkaDrill(id, topic, make) {
  return { id, topic, drill: true, make };
}

function arkaBuildDrills() {
  const drills = [];

  drills.push(arkaDrill("mt-islem-oncelik", "mt-islem", (rng) => {
    const a = rng.int(2, 12);
    const b = rng.int(2, 9);
    const c = rng.int(2, 8);
    const correct = a + b * c;
    return {
      q: `${a} + ${b} × ${c} işleminin sonucu kaçtır?`,
      choices: arkaIntChoices(correct, [(a + b) * c, a + b + c, b * c, a * b + c]),
      why: `Çarpma, toplamadan önce yapılır. Önce ${b} × ${c} = ${b * c}. Sonra ${a} + ${b * c} = ${correct}. ${(a + b) * c} sonucu, ortada parantez varmış gibi hesaplamaktır; parantez yok.`
    };
  }));

  drills.push(arkaDrill("mt-islem-cikar", "mt-islem", (rng) => {
    const b = rng.int(2, 6);
    const c = rng.int(2, 6);
    const a = b * c + rng.int(4, 18);
    const correct = a - b * c;
    return {
      q: `${a} − ${b} × ${c} işleminin sonucu kaçtır?`,
      choices: arkaIntChoices(correct, [(a - b) * c, a - b - c, a - b, b * c]),
      why: `Önce çarpma: ${b} × ${c} = ${b * c}. Sonra çıkarma: ${a} − ${b * c} = ${correct}. Soldan sağa ${a} − ${b} yapıp sonra çarpmak, işlem sırasını bozar.`
    };
  }));

  drills.push(arkaDrill("mt-islem-parantez", "mt-islem", (rng) => {
    const a = rng.int(2, 9);
    const b = rng.int(2, 8);
    const c = rng.int(2, 6);
    const correct = (a + b) * c;
    return {
      q: `(${a} + ${b}) × ${c} işleminin sonucu kaçtır?`,
      choices: arkaIntChoices(correct, [a + b * c, a + b + c, a * c + b, a * b * c]),
      why: `Parantez önce biter: ${a} + ${b} = ${a + b}. Sonra ${a + b} × ${c} = ${correct}. Parantezi yok sayıp yalnızca ${b} × ${c} yapmak, bu sorunun başlıca tuzağıdır.`
    };
  }));

  drills.push(arkaDrill("mt-islem-negatif", "mt-islem", (rng) => {
    const a = rng.int(2, 9);
    const b = rng.int(2, 9);
    const correct = a * b;
    return {
      q: `(−${a}) × (−${b}) işleminin sonucu kaçtır?`,
      choices: arkaIntChoices(correct, [-correct, a + b, -(a + b), correct + a]),
      why: `İki eksi çarpımı artıdır. ${a} × ${b} = ${correct}, işaret de artı olduğu için sonuç ${correct}. Tek eksili çarpım eksi olurdu; burada iki eksi var.`
    };
  }));

  drills.push(arkaDrill("mt-islem-bolme", "mt-islem", (rng) => {
    const c = rng.pick([2, 3, 4, 5]);
    const b = c * rng.int(2, 8);
    const a = rng.int(3, 15);
    const correct = a + b / c;
    return {
      q: `${a} + ${b} ÷ ${c} işleminin sonucu kaçtır?`,
      choices: arkaIntChoices(correct, [(a + b) / c, a + b + c, b / c, a + c]),
      why: `Bölme, toplamadan önce gelir. ${b} ÷ ${c} = ${b / c}. Sonra ${a} + ${b / c} = ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-kesir-payda", "mt-kesir", (rng) => {
    const d = rng.pick([5, 6, 7, 8, 9]);
    const n1 = rng.int(1, d - 2);
    const n2 = rng.int(1, d - n1 - 1);
    const correct = arkaFrac(n1 + n2, d);
    return {
      q: `${n1}/${d} + ${n2}/${d} işleminin sonucu kaçtır?`,
      choices: arkaStrChoices(correct, [
        `${n1 + n2}/${d * 2}`,
        `${n1 + n2}/${d + d}`,
        arkaFrac(n1 + n2 + 1, d),
        `${n1}/${d}`
      ]),
      why: `Paydalar aynıysa paylar toplanır, payda değişmez. ${n1} + ${n2} = ${n1 + n2}, payda ${d} kalır. Sonuç ${correct}. Paydaları da toplamak bu işlemin hatasıdır.`
    };
  }));

  drills.push(arkaDrill("mt-kesir-yarim", "mt-kesir", (rng) => {
    const d = rng.pick([3, 4, 5, 6]);
    const correct = arkaFrac(d + 2, 2 * d);
    return {
      q: `1/2 + 1/${d} işleminin sonucu kaçtır?`,
      choices: arkaStrChoices(correct, [`2/${d}`, `1/${2 + d}`, `2/${2 * d}`, arkaFrac(1, d)]),
      why: `Paydalar farklı. Ortak payda ${2 * d}. 1/2 = ${d}/${2 * d} ve 1/${d} = 2/${2 * d}. Toplam ${d + 2}/${2 * d}, yani ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-kesir-cikar", "mt-kesir", (rng) => {
    const d = rng.pick([5, 6, 7, 8, 9]);
    const n1 = rng.int(3, d - 1);
    const n2 = rng.int(1, n1 - 1);
    const correct = arkaFrac(n1 - n2, d);
    return {
      q: `${n1}/${d} − ${n2}/${d} işleminin sonucu kaçtır?`,
      choices: arkaStrChoices(correct, [
        `${n1 - n2}/${d - n2}`,
        `${n1}/${d}`,
        arkaFrac(n1 + n2, d),
        `${n2}/${d}`
      ]),
      why: `Paydalar aynı. Paylar çıkarılır: ${n1} − ${n2} = ${n1 - n2}. Payda ${d} olduğu için sonuç ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-kesir-carp", "mt-kesir", (rng) => {
    const pairs = [
      [1, 2, 1, 3],
      [1, 2, 2, 5],
      [2, 3, 1, 4],
      [3, 4, 1, 5],
      [1, 3, 3, 4],
      [2, 5, 1, 2]
    ];
    const [a, b, c, d] = rng.pick(pairs);
    const correct = arkaFrac(a * c, b * d);
    return {
      q: `${a}/${b} × ${c}/${d} işleminin sonucu kaçtır?`,
      choices: arkaStrChoices(correct, [
        arkaFrac(a + c, b + d),
        arkaFrac(a * c, b),
        arkaFrac(a, d),
        `${a * c}/${b * d + 1}`
      ]),
      why: `Kesir çarpımında paylar kendi arasında, paydalar kendi arasında çarpılır. ${a} × ${c} = ${a * c}, ${b} × ${d} = ${b * d}. Sadeleştirilmiş sonuç ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-kesir-kac", "mt-kesir", (rng) => {
    const spec = rng.pick([
      [1, 2, 12],
      [1, 3, 12],
      [2, 3, 12],
      [3, 4, 12],
      [1, 4, 20],
      [3, 5, 20],
      [2, 5, 15],
      [1, 5, 20]
    ]);
    const n = spec[0];
    const d = spec[1];
    const whole = spec[2];
    const correct = (whole / d) * n;
    return {
      q: `${whole} sayısının ${n}/${d} kadarı kaçtır?`,
      choices: arkaIntChoices(correct, [whole / d, n * d, whole - correct, correct + d]),
      why: `Önce bütün ${d} eşit parçaya bölünür: ${whole} ÷ ${d} = ${whole / d}. Sonra bu parçanın ${n} katı alınır: ${whole / d} × ${n} = ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-yuzde-kac", "mt-yuzde", (rng) => {
    const spec = rng.pick([
      [10, 40],
      [10, 80],
      [20, 50],
      [25, 40],
      [25, 80],
      [50, 30],
      [5, 60],
      [20, 90]
    ]);
    const p = spec[0];
    const n = spec[1];
    const correct = (n * p) / 100;
    return {
      q: `${n} sayısının %${p}'i kaçtır?`,
      choices: arkaIntChoices(correct, [p, n / p, correct + p, n - correct]),
      why: `Yüzde, 100'de kaç olduğudur. ${n} × ${p} ÷ 100 = ${correct}. %${p} demek, sayının kendisine ${p} eklemek değildir.`
    };
  }));

  drills.push(arkaDrill("mt-yuzde-artis", "mt-yuzde", (rng) => {
    const spec = rng.pick([
      [20, 50],
      [10, 70],
      [25, 40],
      [50, 20],
      [20, 80]
    ]);
    const p = spec[0];
    const n = spec[1];
    const correct = n + (n * p) / 100;
    return {
      q: `${n} sayısı %${p} artarsa sonuç kaç olur?`,
      choices: arkaIntChoices(correct, [n + p, (n * p) / 100, n - (n * p) / 100, correct + p]),
      why: `Artış miktarı ${n} × ${p} ÷ 100 = ${(n * p) / 100}. Yeni sayı, eskisiyle bunun toplamıdır: ${n} + ${(n * p) / 100} = ${correct}. ${n + p} tuzağı, yüzdeyi düz sayı sanmaktır.`
    };
  }));

  drills.push(arkaDrill("mt-yuzde-indirim", "mt-yuzde", (rng) => {
    const spec = rng.pick([
      [10, 50],
      [20, 80],
      [25, 60],
      [50, 90],
      [25, 120],
      [10, 200]
    ]);
    const p = spec[0];
    const n = spec[1];
    const cut = (n * p) / 100;
    const correct = n - cut;
    return {
      q: `${n} liralık bir şeyde %${p} indirim olursa fiyat kaç lira olur?`,
      choices: arkaIntChoices(correct, [n - p, cut, n + cut, correct - p]),
      why: `İndirim tutarı ${n} × ${p} ÷ 100 = ${cut} liradır. Ödenecek fiyat ${n} − ${cut} = ${correct}. Fiyattan doğrudan ${p} çıkarmak, yüzdeyi lira sanmaktır.`
    };
  }));

  drills.push(arkaDrill("mt-yuzde-oran", "mt-yuzde", (rng) => {
    const spec = rng.pick([
      [20, 100],
      [15, 50],
      [30, 120],
      [8, 40],
      [12, 60]
    ]);
    const part = spec[0];
    const whole = spec[1];
    const correct = (part / whole) * 100;
    return {
      q: `${part}, ${whole} sayısının yüzde kaçıdır?`,
      choices: arkaIntChoices(correct, [part, whole / part, correct / 2, part + whole]),
      why: `Parça bütüne bölünür, sonra 100 ile çarpılır. ${part} ÷ ${whole} × 100 = ${correct}. Yani %${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-oran-denk", "mt-oran", (rng) => {
    const a = rng.int(2, 7);
    const b = rng.int(2, 8);
    const k = rng.int(2, 6);
    const c = b * k;
    const correct = a * k;
    return {
      q: `${a}/${b} = x/${c} olduğuna göre x kaçtır?`,
      choices: arkaIntChoices(correct, [a + k, c - b, a * b, k]),
      why: `Payda ${b}'den ${c}'ye ${k} katına çıkmış. Pay da aynı katı artar: ${a} × ${k} = ${correct}. İki taraf aynı çarpana tutulur.`
    };
  }));

  drills.push(arkaDrill("mt-oran-pay", "mt-oran", (rng) => {
    const a = rng.int(2, 5);
    const b = rng.int(2, 6);
    const k = rng.int(2, 5);
    const total = (a + b) * k;
    const correct = b * k;
    return {
      q: `Bir karışım ${a} ölçü çay ve ${b} ölçü sütten oluşuyor. ${total} ölçü karışım için kaç ölçü süt gerekir?`,
      choices: arkaIntChoices(correct, [a * k, a + b, total - a, b]),
      why: `Bir pay ${a} + ${b} = ${a + b} ölçüdür. ${total} ÷ ${a + b} = ${k}, yani her pay ${k} kez vardır. Süt ${b} pay olduğu için ${b} × ${k} = ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-oran-harita", "mt-oran", (rng) => {
    const km = rng.pick([2, 3, 4, 5]);
    const cm = rng.int(3, 8);
    const correct = km * cm;
    return {
      q: `Bir haritada 1 cm, ${km} km'yi gösteriyor. ${cm} cm kaç km'dir?`,
      choices: arkaIntChoices(correct, [km + cm, cm, km * cm + km, correct - km]),
      why: `Her santimetre ${km} kilometredir. ${cm} santimetre ${cm} × ${km} = ${correct} kilometre eder.`
    };
  }));

  drills.push(arkaDrill("mt-denklem-topla", "mt-denklem", (rng) => {
    const x = rng.int(3, 18);
    const a = rng.int(2, 12);
    const b = x + a;
    return {
      q: `Bir sayının ${a} fazlası ${b} ise sayı kaçtır?`,
      choices: arkaIntChoices(x, [b + a, a, b, b - a - 1]),
      why: `Sayıyı x diyelim: x + ${a} = ${b}. ${a}, karşıya eksi olarak geçer. x = ${b} − ${a} = ${x}.`
    };
  }));

  drills.push(arkaDrill("mt-denklem-kat", "mt-denklem", (rng) => {
    const x = rng.int(2, 12);
    const a = rng.int(2, 6);
    const b = a * x;
    return {
      q: `${a}x = ${b} denkleminde x kaçtır?`,
      choices: arkaIntChoices(x, [b - a, a, b, a * b]),
      why: `x'in yanındaki ${a}, çarpandır. Karşıya bölme olarak geçer: x = ${b} ÷ ${a} = ${x}.`
    };
  }));

  drills.push(arkaDrill("mt-denklem-iki", "mt-denklem", (rng) => {
    const x = rng.int(2, 10);
    const a = rng.int(2, 5);
    const b = rng.int(1, 8);
    const c = a * x + b;
    return {
      q: `${a}x + ${b} = ${c} denkleminde x kaçtır?`,
      choices: arkaIntChoices(x, [c - b, c - a, a + b, x + b]),
      why: `Önce ${b} karşıya geçer: ${a}x = ${c} − ${b} = ${c - b}. Sonra ${a}'e bölünür: x = ${c - b} ÷ ${a} = ${x}.`
    };
  }));

  drills.push(arkaDrill("mt-denklem-bolum", "mt-denklem", (rng) => {
    const a = rng.pick([2, 3, 4, 5]);
    const x = a * rng.int(2, 8);
    const b = x / a;
    return {
      q: `x ÷ ${a} = ${b} olduğuna göre x kaçtır?`,
      choices: arkaIntChoices(x, [b, a, b + a, x + a]),
      why: `Bölüneni bulmak için bölenle bölüm çarpılır. x = ${a} × ${b} = ${x}.`
    };
  }));

  drills.push(arkaDrill("mt-us-deger", "mt-us", (rng) => {
    const spec = rng.pick([
      [2, 3, 8],
      [2, 4, 16],
      [2, 5, 32],
      [3, 2, 9],
      [3, 3, 27],
      [5, 2, 25],
      [10, 2, 100],
      [10, 3, 1000]
    ]);
    const base = spec[0];
    const exp = spec[1];
    const correct = spec[2];
    return {
      q: `${base}^${exp} kaçtır?`,
      choices: arkaIntChoices(correct, [base * exp, base + exp, correct / base, correct * base]),
      why: `${base}^${exp}, ${base} sayısının ${exp} kez çarpılmasıdır; ${base} × ${exp} diye toplanmaz. Sonuç ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-us-carp", "mt-us", (rng) => {
    const base = rng.pick([2, 3, 5, 10]);
    const m = rng.int(1, 3);
    const n = rng.int(1, 3);
    const correct = base ** (m + n);
    return {
      q: `${base}^${m} × ${base}^${n} işleminin sonucu kaçtır?`,
      choices: arkaIntChoices(correct, [base ** (m * n), (base ** m) * n, m + n, base ** m + base ** n]),
      why: `Taban aynıysa üsler toplanır, tabanlar çarpılmaz. ${m} + ${n} = ${m + n}, yani ${base}^${m + n} = ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-us-sifir", "mt-us", (rng) => {
    const base = rng.pick([2, 3, 4, 5, 7, 8, 10]);
    return {
      q: `${base}^0 kaçtır?`,
      choices: arkaIntChoices(1, [0, base, base * 0, 10]),
      why: `Sıfırdan farklı bir sayının sıfırıncı kuvveti 1'dir. ${base}^0 = 1. Sonuç 0 değildir; üs sıfır, çarpımın değeri 1'dir.`
    };
  }));

  drills.push(arkaDrill("mt-us-kat", "mt-us", (rng) => {
    const spec = rng.pick([
      [2, 2, 2, 16],
      [2, 3, 2, 64],
      [3, 2, 2, 81],
      [5, 2, 1, 25],
      [10, 2, 2, 10000]
    ]);
    const base = spec[0];
    const m = spec[1];
    const n = spec[2];
    const correct = spec[3];
    return {
      q: `(${base}^${m})^${n} işleminin sonucu kaçtır?`,
      choices: arkaIntChoices(correct, [base ** (m + n), base * m * n, m * n, base ** m]),
      why: `Parantezli üste üs gelince üsler çarpılır. ${m} × ${n} = ${m * n}, yani ${base}^${m * n} = ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-problem-yas", "mt-problem", (rng) => {
    const age = rng.int(12, 17);
    const gap = rng.int(2, 5);
    const other = age - gap;
    const correct = age + other;
    return {
      q: `Ece ${age} yaşında. Kardeşi ${gap} yaş küçük. İkisinin yaşları toplamı kaçtır?`,
      choices: arkaIntChoices(correct, [age, other, age + gap, age * gap]),
      why: `Kardeş ${age} − ${gap} = ${other} yaşındadır. Toplam ${age} + ${other} = ${correct}. Küçük olanın yaşı, aradaki farkın kendisi değildir.`
    };
  }));

  drills.push(arkaDrill("mt-problem-sayi", "mt-problem", (rng) => {
    const x = rng.int(3, 12);
    const k = rng.int(2, 4);
    const m = rng.int(1, 6);
    const total = k * x + m;
    return {
      q: `Bir sayının ${k} katının ${m} fazlası ${total}. Sayı kaçtır?`,
      choices: arkaIntChoices(x, [total - m, total - k, k * x, x + m]),
      why: `Önce fazlalık çıkar: ${total} − ${m} = ${total - m}. Bu, sayının ${k} katıdır. ${total - m} ÷ ${k} = ${x}.`
    };
  }));

  drills.push(arkaDrill("mt-problem-sure", "mt-problem", (rng) => {
    const total = rng.pick([90, 97, 110, 120, 135]);
    const done = rng.int(25, 70);
    const correct = total - done;
    return {
      q: `Bir film ${total} dakika. ${done} dakikası izlendi. Kalan süre kaç dakikadır?`,
      choices: arkaIntChoices(correct, [done, total, total + done, correct - 10]),
      why: `Kalan, bütünden izlenen çıkarılınca bulunur. ${total} − ${done} = ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-problem-fiyat", "mt-problem", (rng) => {
    const spec = rng.pick([
      [20, 50],
      [25, 80],
      [10, 60],
      [50, 40]
    ]);
    const p = spec[0];
    const n = spec[1];
    const correct = n - (n * p) / 100;
    return {
      q: `${n} liralık kitabın fiyatı %${p} inerse yeni fiyat kaç lira olur?`,
      choices: arkaIntChoices(correct, [n - p, (n * p) / 100, n + p, correct + 5]),
      why: `İnen tutar ${n} × ${p} ÷ 100 = ${(n * p) / 100} liradır. Yeni fiyat ${n} − ${(n * p) / 100} = ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-veri-ort", "mt-veri", (rng) => {
    const base = rng.int(3, 8);
    const nums = [base, base + 2, base + 4, base + 2];
    const sum = nums.reduce((s, n) => s + n, 0);
    const correct = sum / nums.length;
    return {
      q: `${nums.join(", ")} sayılarının aritmetik ortalaması kaçtır?`,
      choices: arkaIntChoices(correct, [nums[0], sum, nums[nums.length - 1], correct + 1]),
      why: `Ortalama, toplamın adede bölünmesidir. ${nums.join(" + ")} = ${sum}. ${sum} ÷ ${nums.length} = ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-veri-aralik", "mt-veri", (rng) => {
    const low = rng.int(2, 8);
    const high = low + rng.int(5, 14);
    const mid = low + 2;
    const correct = high - low;
    return {
      q: `${low}, ${mid}, ${high}, ${mid + 1} sayılarından açıklık (en büyük − en küçük) kaçtır?`,
      choices: arkaIntChoices(correct, [high, low, high - mid, correct + 1]),
      why: `Açıklık, en büyük ile en küçüğün farkıdır. En büyük ${high}, en küçük ${low}. ${high} − ${low} = ${correct}. Ortadaki sayılar bu hesaba girmez.`
    };
  }));

  drills.push(arkaDrill("mt-veri-mod", "mt-veri", (rng) => {
    const mode = rng.int(3, 9);
    const other = mode + rng.int(2, 5);
    const nums = [mode, other, mode, other + 1];
    return {
      q: `${nums.join(", ")} sayılarından tepe değer (en çok tekrar eden) kaçtır?`,
      choices: arkaIntChoices(mode, [other, other + 1, mode + other, nums.length]),
      why: `${mode} iki kez geçiyor, diğerleri birer kez. En sık görülen değer ${mode}. Tepe değer, en büyük sayı demek değildir.`
    };
  }));

  drills.push(arkaDrill("mt-kume-kesisim", "mt-kume", (rng) => {
    const shared = rng.int(1, 3);
    const onlyA = rng.int(1, 4);
    const onlyB = rng.int(1, 4);
    return {
      q: `A kümesinin ${onlyA + shared}, B kümesinin ${onlyB + shared} elemanı vardır. Ortak eleman sayısı ${shared} olduğuna göre kesişim kümesinin eleman sayısı kaçtır?`,
      choices: arkaIntChoices(shared, [onlyA + onlyB + shared, onlyA, onlyB, onlyA + shared]),
      why: `Kesişim, yalnızca ortak elemanlardır. Ortak sayı soruda ${shared} olarak verilmiştir. Birleşim olsaydı ${onlyA} + ${onlyB} + ${shared} = ${onlyA + onlyB + shared} olurdu.`
    };
  }));

  drills.push(arkaDrill("mt-kume-birlesim", "mt-kume", (rng) => {
    const both = rng.int(1, 4);
    const onlyA = rng.int(2, 6);
    const onlyB = rng.int(2, 6);
    const a = onlyA + both;
    const b = onlyB + both;
    const correct = a + b - both;
    return {
      q: `${a} kişi korku filmi, ${b} kişi bilimkurgu seviyor. ${both} kişi ikisini de seviyor. En az birini seven kaç kişidir?`,
      choices: arkaIntChoices(correct, [a + b, a + b + both, a - both, b]),
      why: `İkisini de sevenler, düz toplamda iki kez sayılır. ${a} + ${b} − ${both} = ${correct}. Ortak olanı bir kez düşmek yeter.`
    };
  }));

  drills.push(arkaDrill("mt-olasilik-zar", "mt-olasilik", (rng) => {
    const face = rng.int(1, 6);
    return {
      q: `Dürüst bir zar atılıyor. ${face} gelme olasılığı kaçtır?`,
      choices: arkaStrChoices("1/6", ["1/2", "1/3", `${face}/6`, "6/1"]),
      why: `Zarda 6 yüz vardır ve her yüz eşittir. İstenen 1 yüz olduğu için olasılık 1/6'dır. İstenen sayının kendisi, olasılığın payı olmak zorunda değildir.`
    };
  }));

  drills.push(arkaDrill("mt-olasilik-buyuk", "mt-olasilik", (rng) => {
    const specs = [
      [4, 2, "1/3", "5 ve 6"],
      [3, 3, "1/2", "4, 5 ve 6"],
      [5, 1, "1/6", "yalnız 6"],
      [2, 4, "2/3", "3, 4, 5 ve 6"]
    ];
    const spec = rng.pick(specs);
    const limit = spec[0];
    const count = spec[1];
    const correct = spec[2];
    return {
      q: `Bir zar atılıyor. ${limit}'ten büyük gelme olasılığı kaçtır?`,
      choices: arkaStrChoices(correct, ["1/2", "1/6", "1/3", "2/3", "5/6"].filter((x) => x !== correct)),
      why: `${limit}'ten büyük yüzler: ${spec[3]}. Bu ${count} yüzdür. Zarın 6 yüzü olduğu için olasılık ${count}/6, yani ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-olasilik-torba", "mt-olasilik", (rng) => {
    const red = rng.int(1, 4);
    const blue = rng.int(2, 6);
    const total = red + blue;
    const correct = arkaFrac(red, total);
    return {
      q: `Bir torbada ${red} kırmızı ve ${blue} mavi taş vardır. Çekilen taşın kırmızı olma olasılığı kaçtır?`,
      choices: arkaStrChoices(correct, [
        arkaFrac(blue, total),
        arkaFrac(red, blue),
        arkaFrac(1, total),
        "1/2"
      ]),
      why: `İstenen kırmızı sayısı ${red}, tüm taş ${red} + ${blue} = ${total}. Olasılık ${red}/${total}, sadeleştirilince ${correct}. Renk sayısı iki diye sonuç 1/2 olmak zorunda değildir; taş sayıları eşit değil.`
    };
  }));

  drills.push(arkaDrill("mt-dogru-butunler", "mt-dogru", (rng) => {
    const a = rng.pick([20, 25, 30, 35, 40, 50, 65, 70, 110, 120]);
    const correct = 180 - a;
    return {
      q: `Bir doğru üstünde yan yana duran iki açıdan biri ${a}°. Diğeri kaç derecedir?`,
      choices: arkaIntChoices(correct, [90 - a > 0 ? 90 - a : a, a, 360 - a, correct + 10]),
      why: `Doğru üstü düz açıdır, 180 derece. Bütünler açı 180 − ${a} = ${correct}. ${a} ters açı olurdu; burada yan yana duran açı soruluyor.`
    };
  }));

  drills.push(arkaDrill("mt-dogru-tumler", "mt-dogru", (rng) => {
    const a = rng.pick([15, 20, 25, 30, 35, 40, 55, 60]);
    const correct = 90 - a;
    return {
      q: `Tümler iki açıdan biri ${a}°. Diğeri kaç derecedir?`,
      choices: arkaIntChoices(correct, [180 - a, a, 90, correct + a]),
      why: `Tümler açılar 90 dereceyi tamamlar. 90 − ${a} = ${correct}. 180 − ${a} = ${180 - a} bütünler açıdır; soru tümler diyor.`
    };
  }));

  drills.push(arkaDrill("mt-dogru-ters", "mt-dogru", (rng) => {
    const a = rng.pick([30, 40, 50, 55, 65, 70, 80]);
    const correct = 180 - a;
    return {
      q: `İki doğru kesişiyor. Açılardan biri ${a}°. Bu açının komşusu kaç derecedir?`,
      choices: arkaIntChoices(correct, [a, 90, 360 - a, correct - 10]),
      why: `Kesişen doğrularda ters açılar eşittir; komşu açı ise 180'i tamamlar. 180 − ${a} = ${correct}. ${a} yalnız ters açının ölçüsüdür.`
    };
  }));

  drills.push(arkaDrill("mt-pisagor-hip", "mt-pisagor", (rng) => {
    const triple = rng.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]]);
    const a = triple[0];
    const b = triple[1];
    const correct = triple[2];
    return {
      q: `Dik kenarları ${a} cm ve ${b} cm olan bir dik üçgende hipotenüs kaç cm'dir?`,
      choices: arkaIntChoices(correct, [a + b, a * b, correct * correct, a + correct]),
      why: `Hipotenüsün karesi, dik kenarların kareleri toplamıdır. ${a}² + ${b}² = ${a * a} + ${b * b} = ${correct * correct}. Hipotenüs ${correct} cm'dir. ${a} + ${b} = ${a + b} kenarları toplamaktır.`
    };
  }));

  drills.push(arkaDrill("mt-pisagor-bacak", "mt-pisagor", (rng) => {
    const triple = rng.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]]);
    const a = triple[0];
    const b = triple[1];
    const c = triple[2];
    return {
      q: `Hipotenüsü ${c} cm, bir dik kenarı ${a} cm olan dik üçgende diğer dik kenar kaç cm'dir?`,
      choices: arkaIntChoices(b, [c - a, a + c, c, b + a]),
      why: `Bilinmeyen kenarın karesi, hipotenüsün karesinden bilinen dik kenarın karesi çıkarılınca bulunur. ${c}² − ${a}² = ${c * c} − ${a * a} = ${b * b}. Sonuç ${b}. ${c} − ${a} = ${c - a} çıkarmadır, Pisagor değildir.`
    };
  }));

  drills.push(arkaDrill("mt-ucgenalan-hesap", "mt-ucgenalan", (rng) => {
    const base = rng.pick([6, 8, 10, 12, 14, 16]);
    const height = rng.pick([3, 4, 5, 6, 7, 9]);
    const correct = (base * height) / 2;
    return {
      q: `Tabanı ${base} cm, yüksekliği ${height} cm olan bir üçgenin alanı kaç santimetrekaredir?`,
      choices: arkaIntChoices(correct, [base * height, base + height, correct * 2, base * 2]),
      why: `Üçgenin alanı taban × yükseklik ÷ 2'dir. ${base} × ${height} = ${base * height}. ${base * height} ÷ 2 = ${correct}. ${base * height} ikiye bölünmemiş hâldir; o, aynı taban ve yüksekliğe sahip dikdörtgenin alanı olurdu.`
    };
  }));

  drills.push(arkaDrill("mt-ucgenalan-yukseklik", "mt-ucgenalan", (rng) => {
    const base = rng.pick([4, 6, 8, 10]);
    const height = rng.pick([4, 6, 8, 10]);
    const area = (base * height) / 2;
    return {
      q: `Alanı ${area} cm², tabanı ${base} cm olan bir üçgenin yüksekliği kaç cm'dir?`,
      choices: arkaIntChoices(height, [area, area / base, base, height * 2]),
      why: `Alan = taban × yükseklik ÷ 2. Yüksekliği bulmak için alanı 2 ile çarp, tabana böl. ${area} × 2 = ${area * 2}. ${area * 2} ÷ ${base} = ${height}.`
    };
  }));

  drills.push(arkaDrill("mt-dortgen-aci", "mt-dortgen", (rng) => {
    const a = rng.pick([70, 80, 90, 100]);
    const b = rng.pick([60, 75, 85, 95]);
    const c = rng.pick([50, 80, 100, 110]);
    const correct = 360 - (a + b + c);
    return {
      q: `Bir dörtgenin üç iç açısı ${a}°, ${b}° ve ${c}°. Dördüncü açı kaç derecedir?`,
      choices: arkaIntChoices(correct, [a + b + c, 180, a, correct + 20]),
      why: `Dörtgenin iç açıları toplamı 360 derecedir. ${a} + ${b} + ${c} = ${a + b + c}. Dördüncü açı 360 − ${a + b + c} = ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-dortgen-paralel", "mt-dortgen", (rng) => {
    const base = rng.int(5, 12);
    const height = rng.int(3, 9);
    const side = height + rng.int(2, 5);
    const correct = base * height;
    return {
      q: `Bir paralelkenarın tabanı ${base} cm, yüksekliği ${height} cm, eğik kenarı ${side} cm'dir. Alanı kaç santimetrekaredir?`,
      choices: arkaIntChoices(correct, [base * side, 2 * (base + side), base + height, correct + side]),
      why: `Paralelkenarın alanı taban × yüksekliktir. ${base} × ${height} = ${correct}. Eğik kenar ${side} cm'dir; yükseklik değildir. ${base} × ${side} = ${base * side} kenarı yükseklik sanmaktır.`
    };
  }));

  drills.push(arkaDrill("mt-cember-cap", "mt-cember", (rng) => {
    const r = rng.int(3, 12);
    const correct = r * 2;
    return {
      q: `Yarıçapı ${r} cm olan bir çemberin çapı kaç cm'dir?`,
      choices: arkaIntChoices(correct, [r, r * 3, r * r, correct + r]),
      why: `Çap, yarıçapın iki katıdır ve merkezden geçer. ${r} × 2 = ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-cember-cevre", "mt-cember", (rng) => {
    const r = rng.int(3, 10);
    const correct = 2 * 3 * r;
    return {
      q: `Yarıçapı ${r} cm olan bir çemberde π = 3 alınırsa çevre kaç cm olur?`,
      choices: arkaIntChoices(correct, [3 * r * r, 3 * r, r * 2, correct + r]),
      why: `Çevre 2 × π × r'dir. π = 3 ise 2 × 3 × ${r} = ${correct}. ${3 * r * r}, aynı yarıçapta dairenin alanıdır.`
    };
  }));

  drills.push(arkaDrill("mt-cember-alan", "mt-cember", (rng) => {
    const r = rng.int(3, 9);
    const correct = 3 * r * r;
    return {
      q: `Yarıçapı ${r} cm olan bir dairede π = 3 alınırsa alan kaç santimetrekare olur?`,
      choices: arkaIntChoices(correct, [2 * 3 * r, 3 * r, r * r, correct + r]),
      why: `Dairenin alanı π × r × r'dir. π = 3 ise 3 × ${r} × ${r} = ${correct}. ${2 * 3 * r} çevredir.`
    };
  }));

  drills.push(arkaDrill("mt-aci-ucuncu", "mt-aci", (rng) => {
    const a = rng.pick([40, 45, 50, 55, 60, 70]);
    const b = rng.pick([30, 35, 40, 50, 60].filter((n) => n !== a && a + n < 160));
    const correct = 180 - a - b;
    return {
      q: `Bir üçgenin iki açısı ${a}° ve ${b}°. Üçüncü açı kaç derecedir?`,
      choices: arkaIntChoices(correct, [a + b, 180 - a, 90, correct + b]),
      why: `Üçgenin iç açılar toplamı 180 derecedir. ${a} + ${b} = ${a + b}. Üçüncü açı 180 − ${a + b} = ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-aci-ikiz", "mt-aci", (rng) => {
    const vertex = rng.pick([20, 30, 40, 50, 80]);
    const correct = (180 - vertex) / 2;
    return {
      q: `İkizkenar bir üçgende tepe açısı ${vertex}°. Bir taban açısı kaç derecedir?`,
      choices: arkaIntChoices(correct, [vertex, 180 - vertex, correct * 2, 90]),
      why: `Taban açıları birbirine eşittir. Tepeden kalan 180 − ${vertex} = ${180 - vertex}. Bu iki eşit açıya bölünür: ${180 - vertex} ÷ 2 = ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-aci-dik", "mt-aci", (rng) => {
    const a = rng.pick([20, 25, 30, 35, 40, 45]);
    const correct = 90 - a;
    return {
      q: `Dik bir üçgende dar açılardan biri ${a}°. Diğer dar açı kaç derecedir?`,
      choices: arkaIntChoices(correct, [90, 180 - a, a, correct + 10]),
      why: `Dik açı 90 derecedir. Üçgende kalan iki açının toplamı da 90'dır. ${90} − ${a} = ${correct}.`
    };
  }));

  drills.push(arkaDrill("mt-alan-dikdortgen", "mt-alan", (rng) => {
    const w = rng.int(3, 9);
    const h = rng.int(w + 1, 12);
    const correct = w * h;
    return {
      q: `Eni ${w} m, boyu ${h} m olan dikdörtgen bir odanın alanı kaç metrekaredir?`,
      choices: arkaIntChoices(correct, [2 * (w + h), w + h, correct + w, h]),
      why: `Dikdörtgenin alanı en çarpı boydur. ${w} × ${h} = ${correct}. Çevre olsaydı 2 × (${w} + ${h}) = ${2 * (w + h)} olurdu; soru alanı soruyor.`
    };
  }));

  drills.push(arkaDrill("mt-alan-kare", "mt-alan", (rng) => {
    const s = rng.int(3, 12);
    const correct = s * s;
    return {
      q: `Bir karenin bir kenarı ${s} cm ise alanı kaç santimetrekaredir?`,
      choices: arkaIntChoices(correct, [s * 4, s * 2, correct + s, s]),
      why: `Karenin alanı kenarın karesidir. ${s} × ${s} = ${correct}. ${s} × 4 = ${s * 4} çevredir.`
    };
  }));

  drills.push(arkaDrill("mt-alan-kenar", "mt-alan", (rng) => {
    const w = rng.int(3, 8);
    const h = rng.int(4, 10);
    const area = w * h;
    return {
      q: `Alanı ${area} olan bir dikdörtgenin bir kenarı ${w} ise diğer kenar kaçtır?`,
      choices: arkaIntChoices(h, [area, w, area - w, w * 2]),
      why: `Alan = en × boy. ${area} ÷ ${w} = ${h}. Diğer kenar ${h}.`
    };
  }));

  return drills;
}

function arkaTestDrills() {
  const drills = arkaBuildDrills();
  const errors = [];
  drills.forEach((drill) => {
    for (let seed = 1; seed <= 24; seed += 1) {
      let made;
      try {
        made = drill.make(arkaRng(seed * 97 + drill.id.length * 13));
      } catch (err) {
        errors.push(`${drill.id} seed ${seed}: ${err.message}`);
        continue;
      }
      if (!made || !made.q || !made.why || !made.choices) {
        errors.push(`${drill.id} seed ${seed}: eksik alan`);
        continue;
      }
      if (made.choices.length !== 5) errors.push(`${drill.id} seed ${seed}: ${made.choices.length} şık`);
      if (new Set(made.choices).size !== 5) errors.push(`${drill.id} seed ${seed}: tekrarlı şık ${made.choices.join(" | ")}`);
      const value = made.choices[0];
      const token = String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const mentioned = new RegExp(`(^|[^0-9])${token}([^0-9]|$)`).test(made.why);
      if (!mentioned) errors.push(`${drill.id} seed ${seed}: açıklama ${value} demiyor`);
    }
  });
  return { count: drills.length, errors };
}
