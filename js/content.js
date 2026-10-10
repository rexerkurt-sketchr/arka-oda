const ARKA = {
  topics: [
    { id: "tr-sozcuk", subject: "turkce", title: "Sözcükte anlam", teach: "Sözcüğün sözlük anlamı her cümlede aynı işi görmez.\nGerçek anlam, sözcüğün olduğu gibi durduğu haldir: karanlık oda, gerçekten ışıksızdır.\nMecaz, sözcüğü başka bir şeye ödünç vermektir: karanlık açıklama, ışıksız değil, anlaşılmazdır.\nEş anlam yakın kardeştir, zıt anlam ters yöndür. Deyim ise sözcüklerin toplamından başka bir şey söyler: gözüne uyku girmedi, gözle ilgili bir hastalık değildir." },
    { id: "tr-cumle", subject: "turkce", title: "Cümlede anlam", teach: "Cümleyi çevirmek değil, cümledeki ilişkiyi görmek yeter.\nNeden-sonuç: olan bir şey başka bir şeyi doğurmuş. Çünkü, için, -dığı için.\nAmaç: henüz istenen bir sonuç var. Diye, maksadıyla, için. Buradaki için, sebep değil niyettir.\nKoşul: biri olursa diğeri olur. -se/-sa.\nÖznel yargı ölçülemez, kişiye aittir: en sıkıcı, bence, güzel. Nesnel yargı kontrol edilebilir: 97 dakika, 1982." },
    { id: "tr-anafikir", subject: "turkce", title: "Paragrafın ana fikri", teach: "Konu, parçanın ne hakkında olduğudur. Kısa bir etiket.\nAna fikir, o konuda yazarın yargısıdır. Etiket yetmez.\nÖrnekleri sil. Ayakta kalan cümle ana fikirdir.\nŞıklar dört şekilde tuzağa düşer: bir ayrıntıyı bütün sanmak, parçanın demediği bir kurala atlamak, yargıyı ters çevirmek, fazla genişletmek." },
    { id: "tr-yapi", subject: "turkce", title: "Başlık ve akış", teach: "Başlık, ana fikrin kısa adıdır. İlginç bir ayrıntı başlık olmaz.\nAkışı bozan cümle, parçanın yargısına değil başka bir işe bakar.\nGiriş genellikle yargıyı ya da sorunu kurar. Sonuç, yeni bir örnek açmaz; yargıyı kapatır.\nKonu ile ana fikri karıştırma: konu 'ışık', ana fikir 'ışık dikkati toplar'." },
    { id: "tr-yazim", subject: "turkce", title: "Yazım ve noktalama", teach: "de/da iki türlüdür.\nBulunma eki bitişiktir ve ünlüye uyar: evde, okulda. Sert ünsüzden sonra ta/te olur: kitapta.\nBağlaç olan de/da her zaman ayrıdır, te olmaz: sen de, yarın da.\nKi bağlacı ayrıdır: duydum ki. Belki, çünkü, oysaki ayrı değildir; onlar tek sözcüktür.\nÖzne ile yüklemin arasına virgül girmez. Ali geldi. Ali, geldi değil." },
    { id: "tr-tur", subject: "turkce", title: "Sözcük türleri", teach: "Türe, sözcüğün o cümlede gördüğü işe bak.\nİsim: varlık, kavram. Sıfat: adı niteler, evin önünde durur.\nZamir adın yerine geçer: o, bu, ben.\nZarf yüklemi niteler: nasıl, ne zaman, ne kadar. Hızlı yürüdü: hızlı zarftır.\nEdat tek başına anlam taşımaz, kendinden öncekiyle öbek olur: kadar, gibi, için.\nBağlaç cümleleri ya da eş görevlileri bağlar: ama, ve, çünkü." },
    { id: "tr-oge", subject: "turkce", title: "Cümlenin ögeleri", teach: "Sıra bozulmaz.\n1. Yüklem: çekimli fiil ya da ek-fiil. Cümlenin omurgası.\n2. Özne: kim, ne? Gizli olabilir. Okudu dediğinde özne 'o'dur.\n3. Belirtili nesne: neyi, kimi? -i hâlindedir. Romanı okudu.\nBelirtisiz nesne yalındır: roman okudu.\n4. Yer tamlayıcısı: nerede, nereye, nereden, kime?\n5. Zarf tümleci: ne zaman, nasıl, neden, ne kadar?" },
    { id: "tr-bozuk", subject: "turkce", title: "Anlatım bozukluğu", teach: "Bozuk cümle 'kulağa yanlış gelmek'ten ibaret değildir. Türünü bul.\nGereksiz sözcük: aynı işi iki kez görenler. Geri iade, tekrar yeniden, yaklaşık iki saat kadar.\nÖzne-yüklem: herkes, bütün sınıf, birçok insan tekildir. Geldiler değil, geldi.\nBağlaç: hem, ancak hem de ile biter. Fakat ile bitmez.\nBelirsiz özne: iki kişi varken 'öptü ve ağladı' kimin ağladığı belli değilse bozukluk vardır." },
    { id: "mt-islem", subject: "matematik", title: "İşlem ve işaret", teach: "Nefretin başladığı yer burası. Kural kısadır.\nParantez varsa önce o biter.\nSonra çarpma ve bölme, soldan sağa.\nEn son toplama ve çıkarma.\nİki eksi çarpımı artıdır. Bir eksi, sonucu eksi yapar.\nSınav tuzağı, çarpmadan önce soldaki toplamayı yapmaktır." },
    { id: "mt-kesir", subject: "matematik", title: "Kesirler", teach: "Pay üstte, payda altta. Payda, bütünün kaç parçaya bölündüğüdür.\nPaydalar aynıysa yalnız paylar toplanır ya da çıkarılır.\nPaydalar farklıysa ortak payda bulunur. 1/2 + 1/4 için ortak payda 4'tür.\nÇarpmada pay payla, payda paydayla çarpılır.\nBir sayının 2/3'ü: önce 3'e böl, sonra 2 ile çarp." },
    { id: "mt-yuzde", subject: "matematik", title: "Yüzde", teach: "Yüzde, 100'de kaç demektir.\n%20, 20/100 yani 1/5'tir.\nBir sayının yüzde kaçı: sayı × yüzde ÷ 100.\nArtışta bu tutarı ekle. İndirimde çıkar.\nEn sık hata, yüzdeyi düz lira sanmaktır. 80 liradan %25 indirim, 80 − 25 değildir. 25 lira değil, 80'in çeyreği olan 20 liradır." },
    { id: "mt-oran", subject: "matematik", title: "Oran ve orantı", teach: "İki miktar aynı çarpana bağlıysa orantı vardır.\n2/5 = x/20 ise payda 4 katına çıkmıştır, pay da 4 katına çıkar.\nKarışımda payları topla. 2 çay + 3 süt = 5 pay. 10 ölçü, her paydan 2 ölçü demektir.\nHaritada 1 cm = 4 km ise 5 cm = 20 km. Çarp, toplama." },
    { id: "mt-denklem", subject: "matematik", title: "Bir bilinmeyen", teach: "x, bilmediğin sayıdır. Cümleyi önce denkleme çevir, sonra x'i yalnız bırak.\nYanındaki sayı toplanmışsa karşıya eksi geçer.\nÇarpılmışsa karşıya bölme geçer.\nBölünmüşse karşıya çarpma geçer.\nBir adımda bir iş. 3x + 2 = 14 ise önce 2 iner, 3x = 12, sonra x = 4." },
    { id: "mt-us", subject: "matematik", title: "Üslü sayılar", teach: "2³, 2'nin 3 kez çarpılmasıdır: 2×2×2 = 8. 2×3 = 6 değildir.\nAynı taban çarpılınca üsler toplanır: 2³ × 2² = 2⁵.\nÜste üs gelince üsler çarpılır: (2³)² = 2⁶.\nSıfırdan farklı bir sayının sıfırıncı kuvveti 1'dir. 5⁰ = 1." },
    { id: "mt-problem", subject: "matematik", title: "Kısa problem", teach: "Problem, uzun görünen bir denklemdir.\nÖnce isteneni adlandır: sayı x, kalan süre, yaş.\nSonra cümledeki işlemi aynı sırayla yaz.\n'3 katının 2 fazlası 17' demek 3x + 2 = 17.\nYaş farkı, küçük olanın yaşı değildir. 16 yaşında ve 4 yaş küçükse kardeş 12'dir." },
    { id: "mt-veri", subject: "matematik", title: "Ortalama ve tablo", teach: "Bu kapı, matematik sevmeyen için en ucuz netlerdendir. Yorum yeter.\nAritmetik ortalama: topla, kaç sayı varsa ona böl.\nAçıklık: en büyük eksi en küçük. Ortadakiler karışmaz.\nTepe değer: en çok tekrar eden. En büyük değil.\nGrafikte önce eksenin ne saydığını oku, sonra çubuğa bak." },
    { id: "mt-kume", subject: "matematik", title: "Kümeler", teach: "Küme, elemanların torbasıdır. Aynı eleman iki kez yazılmaz.\nKesişim ∩ yalnız ortak olanlardır.\nBirleşim ∪ hepsidir, ortaklar bir kez sayılır.\nİki grupta 'en az birini seven': A + B − ortak. Ortak olan düz toplamda iki kez sayıldığı için bir kez düşülür." },
    { id: "mt-olasilik", subject: "matematik", title: "Basit olasılık", teach: "Olasılık = istenen / tümü.\nDürüst zarda 6 yüz vardır. Tek bir yüz 1/6.\n5'ten büyük, yalnız 6'dır. 5 ve 6 değildir; o, '5 veya daha büyük' olurdu.\nTorbada 4 siyah 1 kırmızı varsa kırmızı 1/5'tir. İki renk var diye 1/2 çıkmaz. Sayılar eşit değil." },
    { id: "mt-dogru", subject: "geometri", title: "Doğru ve açı", teach: "Düz açı, bir doğru üstündeki 180 derecedir. Yan yana duran iki açı onu tamamlıyorsa bütünlerdir: biri 40 ise diğeri 140.\nTümler açılar 90'ı tamamlar. Biri 25 ise diğeri 65.\nİki doğru kesişince ters açılar eşittir. Yanındaki açı ise 180'i tamamlar.\nÖnce açının düz mü, dik mi, ters mi olduğunu söyle. Sonra çıkar." },
    { id: "mt-aci", subject: "geometri", title: "Üçgende açı", teach: "Üçgenin iç açıları toplamı 180 derecedir. Bu cümle çok soru çözer.\nİki açı verilmişse üçüncü, 180'den onların farkıdır.\nİkizkenarda taban açıları eşittir. Tepeden kalanı ikiye böl.\nDik üçgende bir açı 90'dır. Kalan iki dar açının toplamı da 90'dır." },
    { id: "mt-pisagor", subject: "geometri", title: "Dik üçgende kenar", teach: "Dik üçgende dik açının karşısındaki uzun kenara hipotenüs denir.\nKısa kenarların kareleri toplanır, hipotenüsün karesi çıkar.\n3² + 4² = 9 + 16 = 25 = 5². Bu 3-4-5 üçgenidir.\n6-8-10, bunun iki katıdır. 5-12-13 de sık gelir.\nKenarları toplamak hipotenüsü vermez. 3+4, 5 etmez." },
    { id: "mt-ucgenalan", subject: "geometri", title: "Üçgenin alanı", teach: "Üçgenin alanı, taban çarpı yükseklik, sonra ikiye bölmektir.\nYükseklik, tabana dik inen çizgidir. Eğik kenar yükseklik değildir.\nTaban 10, yükseklik 6 ise alan 10×6÷2 = 30.\nİkiye bölmeyi unutmak, üçgeni dikdörtgen sanmaktır." },
    { id: "mt-alan", subject: "geometri", title: "Kare ve dikdörtgen", teach: "Dikdörtgenin alanı en çarpı boydur.\nKarenin alanı kenar çarpı kenardır. Kenar × 4 çevredir, alan değil.\nÇevre, dışarıdan dolaşmaktır. Alan, içini doldurmaktır.\nAlan verilip bir kenar sorulursa, alanı bilinen kenara böl." },
    { id: "mt-dortgen", subject: "geometri", title: "Dörtgen", teach: "Dörtgenin iç açıları toplamı 360 derecedir. Üç açı verilmişse dördüncü, 360'dan onların farkıdır.\nParalelkenarın alanı taban çarpı yüksekliktir. Yükseklik, eğik kenar değildir; tabana dik inen uzunluktur.\nDikdörtgen, açıları 90 olan özel bir dörtgendir. Onun alanı hâlâ en çarpı boydur." },
    { id: "mt-cember", subject: "geometri", title: "Çember ve daire", teach: "Çemberin kenarı çizgidir. Daire, içiyle birlikte o bölgedir.\nYarıçap merkezden kenara iner. Çap, yarıçapın iki katıdır; merkezden geçer.\nÇevre 2 × π × r. Alan π × r × r.\nBu kapıda π = 3 alınır. Yarıçap 5 ise çevre 2×3×5 = 30, alan 3×5×5 = 75.\nÇevre ile alanı karıştırma: çevre kenarı dolaşır, alan içini doldurur." }
  ],
  questions: [],
  flavors: [
    { tag: "Korku", text: "John Carpenter'ın The Thing'i (1982) canavarı göstermekten çok masadaki güveni bozar. Kan testi sahnesinde korku, yaratığın dişinde değil, kimin hâlâ insan olduğunun bilinmemesindedir." },
    { tag: "Korku", text: "A Nightmare on Elm Street (1984) tehlikeyi evin dışından yatağın içine taşır. Uyku güvenli yer olmaktan çıkınca kaçacak oda kalmaz. Wes Craven'in asıl hamlesi budur." },
    { tag: "Korku", text: "The Shining (1980) bağıran bir canavar kurmaz. Kubrick oteli koridorla uzatır. Tekrar eden mekân, açıklamasız bir tehditten daha uzun süre akılda kalır." },
    { tag: "Korku", text: "They Live (1988) dünyayı bir gözlükle okutur. Reklamların altında emir cümleleri belirir. Korku burada bir dil meselesidir: gördüğün cümle, sandığın cümle değildir." },
    { tag: "Lovecraft", text: "Howard Phillips Lovecraft 1890-1937 arasında yaşadı. Öykülerinin çoğu artık kamu malı sayılır. Burada hikâyeyi kopyalamıyoruz; yalnız kapıyı aralıyoruz." },
    { tag: "Lovecraft", text: "The Colour Out of Space'te korku bir diş ya da pençe değildir. Tarlayı bozan şeyin adı konulamayan bir renktir. Adlandıramadığın şey, formülü eksik bir probleme benzer." },
    { tag: "Lovecraft", text: "Kozmik korkunun cümlesi kısadır: evren düşman değildir, sadece aldırmıyordur. Bu, 'ben merkezdeyim' alışkanlığını bozar. Merkezde olmamak da bir bilgi türüdür." },
    { tag: "Resim", text: "Magritte'in L'Empire des lumières tablosunda altta gece sokağı, üstte gündüz gökyüzü vardır. İkisi tek başına normaldir. Bir arada olunca zihin itiraz eder. Tuhaflık, parçalarda değil ilişkidedir." },
    { tag: "Resim", text: "Caravaggio figürü karanlıktan tek bir ışıkla çıkarır. Yüzün tamamı değil, bir el ya da bakış görünür. Işık süs değildir; dikkati bir noktaya toplar. Çalışırken de her şeyi birden aydınlatmaya gerek yok." },
    { tag: "Resim", text: "Edward Hopper'ın lokantasında kimse kimseye bakmaz. Yalnızlık bağırarak değil, aradaki mesafeyle anlatılır. Sessiz bir sahne de yüksek sesli bir sahne kadar iş yapabilir." },
    { tag: "İngilizce", text: "The light under the door was the wrong color.\nKapının altındaki ışık yanlış renkteydi.\nwrong = yanlış, color = renk. Bugünkü tek cümle bu." },
    { tag: "İngilizce", text: "He read the same page twice.\nAynı sayfayı iki kez okudu.\ntwice = iki kez. Tekrar, bu odanın da yöntemi." },
    { tag: "İngilizce", text: "Not every shadow is a monster.\nHer gölge canavar değildir.\nshadow = gölge. Cümle kısa, iddia net." },
    { tag: "İngilizce", text: "Fear likes a closed door.\nKorku kapalı kapıyı sever.\nfear = korku, closed = kapalı." }
  ],
  ways: [
    { title: "Tur kısa kalsın", text: "Varsayılan tur 8 sorudur, yaklaşık 10 dakika. Bitince kapanır. 'Biraz daha' ancak sen istersen çıkar. Sonsuz liste, sıkılmanın en hızlı yoludur." },
    { title: "Önce Türkçe", text: "Tur Türkçeyle açılır. Sayı sorusu bir matematik, bir geometri diye sırayla girer. İkisi de ayrı dağ gibi beklemez. Yol ekranından tek kapı da seçebilirsin." },
    { title: "Yanlış, anlatımın yeridir", text: "Yanlış şık bir ceza puanı gibi durmaz. Hemen yanında kuralın o soruya uygulanışı vardır. Doğru bildiğin kart da kaybolmaz; günler sonra geri gelir." },
    { title: "Sayı ezberi işe yaramaz", text: "Matematik kartı dönünce sayılar değişir. Şıkkın yerini hatırlamak yetmez. Türkçede de şıkların sırası karışır." },
    { title: "Ara kapısı", text: "Sıkıldım dersen soru kaybolmaz. 80'ler korkusu, Lovecraft, bir resim ya da tek bir İngilizce cümle gelir, sonra aynı soruya dönersin. Bu, dersin yerine geçmez; nefesi uzatır." },
    { title: "Boş gün konuyu silmez", text: "Üst üste gün sayılır ama bir gün ara, öğrenileni sıfırlamaz. Beş çalışmada bir istirahat hakkı birikir. Seri, başkasının serisiyle yarışmaz." },
    { title: "2028 bugünkü 8 sorudur", text: "Sınav uzak. Bugünkü iş, bugünkü turdur. Günde bir tur, haftada beş gün, yirmi aya yayılınca temel oturur. Bir gece her şeyi bitirme planı, üçüncü günde biter." },
    { title: "YDT burada değil", text: "Hacettepe Amerikan Kültürü ve Edebiyatı DİL puanıdır. Puanın yaklaşık yüzde 60'ı yabancı dil testi, yüzde 40'ı TYT. Bu oda o yüzde 40'ın Türkçe ve matematik kapısıdır. YDS ayrı bir sınavdır; yerleşmede kullanılan test YDT'dir." }
  ]
};

function q(id, topic, prompt, choices, a, why) {
  ARKA.questions.push({ id, topic, q: prompt, choices, a, why });
}

q("tr-sozcuk-1", "tr-sozcuk", "Kapı gıcırdadığında içerideki sessizlik daha da koyulaştı.\n\nBu cümlede “koyulaştı” hangi anlamda kullanılmıştır?", [
  "Rengi siyaha döndü",
  "Daha yoğun ve ağır hale geldi",
  "Yavaşça dağıldı",
  "Birdenbire kesildi",
  "Aydınlık kazandı"
], 1, "Sessizlik bir renk değildir. Koyulaşmak burada mecazdır: sessizlik artmış, daha baskın olmuştur. İlk şık sözcüğün gerçek anlamıdır; bu cümle o anlamı kaldırmıyor.");

q("tr-sozcuk-2", "tr-sozcuk", "Hangi cümlede “karanlık” sözcüğü mecaz anlamda kullanılmıştır?", [
  "Oda karanlıktı, lamba yanmıyordu.",
  "Karanlık sokakta yürümek zordu.",
  "Bu açıklama çok karanlık, ne demek istediği anlaşılmıyor.",
  "Perde kalın olduğu için oda karanlık kaldı.",
  "Geceyle birlikte karanlık çöktü."
], 2, "Açıklama ışıksız olamaz. Burada karanlık, kapalı ve anlaşılmaz demektir. Diğer cümlelerde karanlık gerçekten ışığın yokluğudur.");

q("tr-sozcuk-3", "tr-sozcuk", "“Bu sahne filmin en ürkütücü yeridir.” cümlesindeki “ürkütücü” sözcüğünün eş anlamlısı hangisidir?", [
  "Sıkıcı",
  "Korkutucu",
  "Komik",
  "Aydınlık",
  "Sıradan"
], 1, "Ürkütmek, korkutmakla aynı yöndedir. Sıkıcı başka bir şikâyettir; aydınlık ise zıt tarafa düşer, eş anlam olmaz.");

q("tr-sozcuk-4", "tr-sozcuk", "“Sınavdan önceki gece gözüne uyku girmedi.” cümlesindeki deyimin anlamı hangisidir?", [
  "Gözleri ağrıdı",
  "Hiç uyuyamadı",
  "Karanlıkta okudu",
  "Çok erken uyandı",
  "Rüya gördü"
], 1, "Deyim, sözcük sözcük toplanmaz. Gözüne uyku girmedi, gözün hastalandığı anlamına gelmez; kişi uyuyamamıştır.");

q("tr-cumle-1", "tr-cumle", "Hangi cümlede neden-sonuç ilişkisi vardır?", [
  "Kütüphane sessiz olsun diye fısıldadı.",
  "Yağmur yağdığı için çekim ertelendi.",
  "Gelirsen bu sahneyi birlikte izleriz.",
  "Film kısaydı ama etkileyiciydi.",
  "Bence bu roman yılın en iyisi."
], 1, "Yağmur gerçekleşmiş, çekim de bu yüzden ertelenmiş. Bu neden-sonuçtur. “Diye” amaç bildirir, “-se” koşul bildirir, “ama” karşıtlık, “bence” öznel yargıdır.");

q("tr-cumle-2", "tr-cumle", "“Işığı kapatırsan perde daha net görünür.” cümlesinde hangi anlam ilişkisi vardır?", [
  "Koşul",
  "Yakınma",
  "Özlem",
  "Abartma",
  "Benzetme"
], 0, "“-sa” eki koşul kurar: ışık kapanırsa netlik olur. Benzetme olsaydı “gibi” ile bir şeye benzetilirdi. Burada bir şart var.");

q("tr-cumle-3", "tr-cumle", "Hangi cümle öznel bir yargı bildirir?", [
  "Film 97 dakika sürüyor.",
  "Film 1982'de çekilmiş.",
  "Bu film, gördüğüm en rahatsız edici iş.",
  "Afişte üç renk kullanılmış.",
  "Yönetmen bir röportaj vermiş."
], 2, "97 dakika, yıl ve renk sayısı kontrol edilebilir; bunlar nesneldir. “En rahatsız edici” ölçülemez, söyleyen kişiye aittir. Öznel yargı budur.");

q("tr-cumle-4", "tr-cumle", "“Finali bozmamak için kimseye anlatmadı.” cümlesinde “için” hangi anlamdadır?", [
  "Amaç",
  "Yer",
  "Karşılaştırma",
  "Kesin yargı",
  "Yaklaşma"
], 0, "“İçin” bazen neden, bazen amaçtır. Burada anlatmamanın gerekçesi, istenen bir sonuçtur: final bozulmasın. Gerçekleşmiş bir olay sonucu doğurmuyor; niyet var. Bu yüzden amaçtır.");

q("tr-anafikir-1", "tr-anafikir", "Seksenlerin birçok korku filminde yaratık uzun süre gösterilmez. Işık yüzünü ortaya çıkardığında seyirci rahatlar; çünkü bilinmeyen, bilinen olmuştur. Yönetmen bu yüzden sesi ve gölgeyi öne alır. Amaç yalnızca daha çok korkutmak değil, seyircinin kendi hayalini çalıştırmaktır.\n\nBu parçanın ana fikri hangisidir?", [
  "Korku filmleri yalnızca karanlıkta çekilmelidir.",
  "Yaratığı saklamak, korkuyu seyircinin hayaline bırakır.",
  "1980'lerden sonra korku filmi çekilmemiştir.",
  "Ses, görüntüden her zaman üstündür.",
  "Seyirci yaratığın yüzünü hemen görmek ister."
], 1, "Örnekler silinince kalan yargı şudur: göstermek korkuyu azaltır, saklamak hayali çalıştırır. Diğer şıklar ya parçanın demediği bir kuraldır ya da yargının tersidir. “Her zaman” da parçada yoktur.");

q("tr-anafikir-2", "tr-anafikir", "Yeni bir enstrümanda uzun teori anlatımı çabuk sıkar. Kısa bir parça çalıp yanlış notanın hemen düzeltilmesi, kuralı somutlaştırır. Aynı pasaj birkaç gün sonra yeniden çalınınca parmak hatırlamaya başlar. Çalışmanın kısa olması, ertesi gün yeniden oturmayı kolaylaştırır.\n\nBu parçada asıl anlatılmak istenen hangisidir?", [
  "Enstrüman öğrenmek teori bilmeden imkânsızdır.",
  "Parmak egzersizi her gün iki saat sürmelidir.",
  "Kısa deneme, anında düzeltme ve ara ara tekrar, beceriyi kalıcı kılar.",
  "Uzun anlatım her zaman kısa çalışmadan üstündür.",
  "Yanlış nota, çalışmanın boşa gittiğini gösterir."
], 2, "Parça üç şeyi birden söyler: kısa deneme, hemen düzeltme, günler sonraki tekrar. Ana fikir bunların toplamıdır. Tek bir ayrıntıyı, örneğin süreyi, bütün sanmamak gerekir. Parça uzun anlatımı övmüyor.");

q("tr-anafikir-3", "tr-anafikir", "Caravaggio, figürlerini karanlık bir zeminden şiddetli bir ışıkla çıkarır. Işık yüzün tamamını değil, bir eli ya da bakışı gösterir. Görünmeyen kısım da sahnenin parçası olur. Bu tercih süs için değil, dikkati tek bir noktaya toplamak içindir.\n\nBu parçanın ana fikri hangisidir?", [
  "Caravaggio yalnız karanlık zeminlere resim yapmıştır.",
  "Işık, bu resimlerde dikkati belirli bir noktaya toplar.",
  "Görünmeyen her şey resimden çıkarılmalıdır.",
  "Bir resmin değeri kullandığı renk sayısınadır.",
  "Süs, resmin asıl amacıdır."
], 1, "Konu Caravaggio'nun ışığıdır. Yargı ise ışığın süs değil, dikkat aracı olduğudur. Son şık parçanın tersini söyler. İlk şık fazla kesin bir kural uydurur.");

q("tr-anafikir-4", "tr-anafikir", "Bir paragrafın her cümlesi aynı ağırlıkta değildir. Bazı cümleler örnek verir, bazıları asıl yargıyı taşır. Örnek silinse de yargı kalıyorsa ana fikir örnekte değil, yargıdadır. Soru “asıl anlatılmak istenen” diyorsa ayrıntıya değil bu yargıya bakılır.\n\nBu parçadan çıkarılacak sonuç hangisidir?", [
  "Ana fikir, örnek kalksa da ayakta kalan yargıdır.",
  "Her cümle ana fikri ayrı bir yönde değiştirir.",
  "Paragrafta örnek bulunmamalıdır.",
  "Ayrıntı, yargıdan daha önemlidir.",
  "Ana fikir yalnızca son cümlede aranır."
], 0, "Parça kendi yöntemini anlatıyor: örnek silinir, yargı kalır. Son cümlede aranır diye bir kural koymuyor. Örneği yasaklamıyor; örneği yargıyla karıştırmamak gerektiğini söylüyor.");

q("tr-yapi-1", "tr-yapi", "Magritte, gece sokağının üzerine gündüz gökyüzü koyar. İki parça da tek başına tanıdıktır. Bir araya gelince zihin itiraz eder. Ressam tuhaflığı bağırarak değil, normal olanı yanlış yere koyarak kurar.\n\nBu parçaya en uygun başlık hangisidir?", [
  "Magritte'in çocukluğu",
  "Gündüz gökyüzü nasıl boyanır",
  "Tuhaflık, tanıdık olanın yanlış yerinden doğar",
  "Sokak lambalarının tarihi",
  "Resimde yalnızca gece kullanılmalıdır"
], 2, "Başlık, ayrıntının adı değil yargının adıdır. Çocukluk ve lamba parçada yok. Boyama tarifi de yok. Parça, tanıdık iki şeyin yanlış birleşimini anlatıyor.");

q("tr-yapi-2", "tr-yapi", "Caravaggio figürü karanlıktan bir ışıkla çıkarır. Işık yüzün tamamını değil, bir eli gösterir. Bu tercih süs için değil, dikkati toplamak içindir.\n\nBu parçanın konusu hangisidir?", [
  "Işık, resimde yalnızca süs olarak kullanılmalıdır.",
  "Caravaggio'nun ışığı kullanma biçimi",
  "Her ressam karanlık zemin seçmek zorundadır.",
  "Seyirci resme bakmamalıdır.",
  "Dikkat toplanırsa resim değersizleşir."
], 1, "Konu yargı içermeyen etikettir: neyden söz ediliyor? “Caravaggio'nun ışığı”. Diğer şıklar bir yargı taşıyor; onlar olsa olsa ana fikir adayıdır, konu değil.");

q("tr-yapi-3", "tr-yapi", "Hangi cümle, “kısa ve tekrarlı çalışma kalıcıdır” diyen bir paragrafın akışını bozar?", [
  "Aynı soru birkaç gün sonra yeniden sorulunca kural yerleşir.",
  "Uzun ama bir kez yapılan çalışma çabuk unutulur.",
  "Bu yönetmenin 1985'te çektiği film üç ödül almıştır.",
  "Kısa tur, ertesi gün yeniden oturmayı kolaylaştırır.",
  "Unutma, çalışılmayan boşlukta büyür."
], 2, "Ödül alan film, çalışmanın kalıcılığıyla ilgili değildir. Diğer cümleler aynı yargının örnekleri ya da gerekçeleridir. Akışı bozan, konuyu değiştiren cümledir.");

q("tr-yapi-4", "tr-yapi", "Bir paragrafın sonuç cümlesi hangisine daha yakındır?", [
  "Yeni bir örnek daha verip konuyu genişletmeye",
  "Yargıyı toparlayıp kapatmaya",
  "Başlığı silmeye",
  "Konuyla ilgisiz bir tarih eklemeye",
  "İlk cümlenin sözcüklerini rastgele değiştirmeye"
], 1, "Sonuç, parçayı yeni bir bahane ile açmaz. Söylenen yargıyı kapatır. Yeni örnek genellikle gelişme bölümünün işidir.");

q("tr-yazim-1", "tr-yazim", "Hangi cümlede “de” bağlaç olduğu için ayrı yazılmalıdır?", [
  "Bahçede güller açmış.",
  "Kalemde mürekkep bitmiş.",
  "Sen de bu kapıdan geç.",
  "Masada bir kitap duruyor.",
  "Okulda sınav vardı."
], 2, "“Sen de” içindeki de, “dahi / bile” anlamındadır ve bağlaçtır; ayrı yazılır. Diğerlerinde de, bulunma ekidir: bahçede, kalemde, masada, okulda. Ek bitişiktir.");

q("tr-yazim-2", "tr-yazim", "Hangisinin yazımı doğrudur?", [
  "Duydumki kapı çalındı.",
  "Duydum ki kapı çalındı.",
  "Duydum ki, kapı çalındı.",
  "Duydumki, kapı çalındı.",
  "Duydum kiki kapı çalındı."
], 1, "Bağlaç olan ki ayrı yazılır ve kendisinden sonra virgül konmaz. “Belki” ve “çünkü” ise zaten tek sözcüktür; buradaki ki o sözcüklerden biri değil.");

q("tr-yazim-3", "tr-yazim", "Hangi cümlede virgül yanlış yerde kullanılmıştır?", [
  "Su, ekmek ve tuz aldım.",
  "Ali, okula gitti.",
  "Evet, geliyorum.",
  "Film bitince ışıklar yandı.",
  "İstanbul, Ankara ve İzmir'i saydı."
], 1, "Özne ile yüklem arasına virgül girmez: Ali okula gitti. “Ali, okula gitti” bu yüzden yanlıştır. Sıralı adlar ve “evet”ten sonraki virgül yerindedir.");

q("tr-yazim-4", "tr-yazim", "Hangi cümlenin yazımı doğrudur?", [
  "Herkez bu sahneyi beğendi.",
  "Birşey olmamış gibi duruyordu.",
  "Yalnız ışık sönüktü.",
  "Yanlız ışık sönüktü.",
  "Herbiri yerinden kalktı."
], 2, "Doğru biçimler: herkes, bir şey, yalnız, her biri. “Yalnız” tek başına bir sözcüktür; “yanlız” diye bir yazım yoktur. C şıkkı bunlardan doğru olanıdır.");

q("tr-tur-1", "tr-tur", "“Uzun koridorda kimse yoktu.” cümlesinde “uzun” sözcüğü hangi türdedir?", [
  "Sıfat",
  "Zamir",
  "Bağlaç",
  "Edat",
  "Ünlem"
], 0, "Uzun, koridor adını niteliyor. Adı niteleyen sözcük sıfattır. Koridorun kendisi isimdir; soru “uzun”u soruyor.");

q("tr-tur-2", "tr-tur", "“Dün hızlı yürüdü.” cümlesinde “hızlı” sözcüğü hangi görevdedir?", [
  "Zarf",
  "İsim",
  "Bağlaç",
  "Edat",
  "Ünlem"
], 0, "Hızlı, yürüdü yükleminin nasıl yapıldığını söylüyor. Yüklemi niteleyen sözcük zarftır. “Hızlı adam” deseydik sıfat olurdu; burada adam yok, yürümek var.");

q("tr-tur-3", "tr-tur", "“O, kapının önünde bekledi.” cümlesinde “o” sözcüğü hangi türdedir?", [
  "Zamir",
  "Sıfat",
  "Edat",
  "Bağlaç",
  "Zarf"
], 0, "O, bir adın yerine geçiyor. Adın yerine geçen sözcük zamirdir. Kim olduğu cümlede ayrıca söylenmemiş.");

q("tr-tur-4", "tr-tur", "“Sabaha kadar ışık yandı.” cümlesinde “kadar” sözcüğü hangi türdedir?", [
  "Edat",
  "Bağlaç",
  "Zamir",
  "İsim",
  "Ünlem"
], 0, "Kadar, tek başına bir varlık adı değildir. “Sabaha” ile birlikte sınır bildirir. Bu işi gören sözcük edattır.");

q("tr-oge-1", "tr-oge", "“Gece kütüphanede sessizce roman okudu.” cümlesinin yüklemi hangisidir?", [
  "Okudu",
  "Gece",
  "Kütüphanede",
  "Sessizce",
  "Roman"
], 0, "Yüklem, yargıyı taşıyan çekimli fiildir. Bu cümlede okudu. Diğerleri yüklemi tamamlar: gece ve sessizce zarf, kütüphanede yer tamlayıcısı, roman belirtisiz nesnedir.");

q("tr-oge-2", "tr-oge", "“Gece kütüphanede sessizce roman okudu.” cümlesinde yer tamlayıcısı hangisidir?", [
  "Kütüphanede",
  "Gece",
  "Sessizce",
  "Roman",
  "Okudu"
], 0, "Nerede? Kütüphanede. Yer sorusuna cevap veren öge yer tamlayıcısıdır. Gece, ne zaman sorusunun cevabıdır; o zarf tümlecidir.");

q("tr-oge-3", "tr-oge", "“Romanı raftan indirdi.” cümlesinde belirtili nesne hangisidir?", [
  "Romanı",
  "Raftan",
  "İndirdi",
  "O",
  "Gece"
], 0, "Neyi indirdi? Romanı. -i hâli, nesneyi belirli kılar. Raftan, nereden sorusuna gider; yer tamlayıcısıdır. Özne gizli “o”dur ama şık olarak nesne değildir.");

q("tr-oge-4", "tr-oge", "“Biz dün uzun uzun konuştuk.” cümlesinin öznesi hangisidir?", [
  "Biz",
  "Dün",
  "Uzun uzun",
  "Konuştuk",
  "Gizli özne"
], 0, "Kim konuştu? Biz. Özne cümlede açıkça vardır, gizli değildir. Dün ve uzun uzun, ne zaman ve nasıl sorularının cevabıdır; zarf tümlecidir.");

q("tr-bozuk-1", "tr-bozuk", "Hangi cümlede gereksiz sözcük vardır?", [
  "Soruyu yeniden okudu.",
  "Soruyu tekrar yeniden okudu.",
  "Soruyu sessizce okudu.",
  "Soruyu bir kez okudu.",
  "Soruyu sonuna kadar okudu."
], 1, "Tekrar ve yeniden aynı işi görür. Biri yeter. “Soruyu yeniden okudu” bozuk değildir. Gereksiz sözcük, anlamı büyütmeden ikinci kez söylenen sözcüktür.");

q("tr-bozuk-2", "tr-bozuk", "Hangi cümlede özne-yüklem uyumsuzluğu vardır?", [
  "Herkes bu sahneyi beğenmiş.",
  "Herkes bu sahneyi beğenmişler.",
  "Öğrenciler salonu boşaltmış.",
  "İkisi de kapıda kalmış.",
  "Biz filmi baştan izledik."
], 1, "Herkes tekildir. Yüklem de tekil olur: beğenmiş. “Beğenmişler” çoğul bir özne arar. Öğrenciler çoğuldur, o cümlede uyum bozulmaz.");

q("tr-bozuk-3", "tr-bozuk", "Hangi cümlede anlatım bozukluğu vardır?", [
  "Film yaklaşık iki saat sürdü.",
  "Film yaklaşık iki saat kadar sürdü.",
  "Film iki saat sürdü.",
  "Film gece yarısına kadar sürdü.",
  "Film beklediğimizden uzun sürdü."
], 1, "Yaklaşık ile kadar aynı belirsizliği iki kez söyler. Biri yeter: yaklaşık iki saat, ya da iki saat kadar. İkisi bir arada gereksiz tekrardır.");

q("tr-bozuk-4", "tr-bozuk", "Hangi cümlede özne belirsizliğinden doğan anlatım bozukluğu vardır?", [
  "Çocuk annesini öptü ve ağlamaya başladı.",
  "Çocuk annesini öptü, sonra annesi ağlamaya başladı.",
  "Çocuk annesini öptükten sonra kendi ağlamaya başladı.",
  "İkisi de sustu.",
  "Anne çocuğunu kapıda karşıladı."
], 0, "İlk cümlede öpen çocuktur ama ağlayan kim, belli değil. Özne değişecekse ikinci cümlede adın yeniden söylenmesi gerekir. Diğer şıklarda kimin ne yaptığı açıktır.");

q("mt-islem-oyku", "mt-islem", "Bir sahnede 5 lamba yanıyor. Her lambanın 3 yedek ampulü var. Ayrıca elde 2 ampul duruyor. Toplam ampul kaçtır?", [
  "17",
  "10",
  "15",
  "8",
  "25"
], 0, "Her lamba için 3 yedek: 5 × 3 = 15. Eldeki 2 sonra eklenir: 15 + 2 = 17. 5 + 3 + 2 = 10, çarpmayı toplama sanmaktır.");

q("mt-kesir-oyku", "mt-kesir", "12 karelik bir storyboard'un 2/3'ü çizilmiş. Kaç kare çizilmiştir?", [
  "8",
  "6",
  "9",
  "4",
  "12"
], 0, "12 üç eşit parçaya bölünür: 12 ÷ 3 = 4. İki parça çizilmiştir: 4 × 2 = 8. Yarım sanıp 6 demek, 2/3'ü 1/2 okumaktır.");

q("mt-yuzde-oyku", "mt-yuzde", "80 liralık bir kitapta %25 indirim olursa ödenecek fiyat kaç lira olur?", [
  "60",
  "55",
  "20",
  "25",
  "75"
], 0, "80'in %25'i çeyrektir: 20 lira iner. 80 − 20 = 60. 55, yüzdeyi düz 25 lira sanıp 80 − 25 yapmaktır. 20 ise indirim tutarıdır, yeni fiyat değil.");

q("mt-oran-oyku", "mt-oran", "Bir haritada 1 cm, 4 km'yi gösteriyor. Haritada 5 cm olan yol gerçekte kaç km'dir?", [
  "20",
  "9",
  "5",
  "16",
  "4"
], 0, "Her santimetre 4 kilometredir. 5 × 4 = 20. 5 + 4 = 9, çarpmayı toplama sanmaktır.");

q("mt-denklem-oyku", "mt-denklem", "Bir sayının 4 fazlası 19 ise sayı kaçtır?", [
  "15",
  "23",
  "4",
  "19",
  "76"
], 0, "x + 4 = 19. 4 karşıya eksi geçer: x = 19 − 4 = 15. 23, fazlayı bir kez daha eklemektir.");

q("mt-us-oyku", "mt-us", "Bir söylenti her saat ikiye katlanıyor. Başlangıçta 1 kişi biliyor. 5 kez ikiye katlandıktan sonra kaç kişi bilir?", [
  "32",
  "10",
  "25",
  "16",
  "64"
], 0, "Katlanma çarpmadır, toplama değil. 2⁵ = 32. 2 × 5 = 10 tuzağı, üssü çarpım sanmaktır. 16, bir katlanmayı eksik saymaktır.");

q("mt-problem-oyku", "mt-problem", "Ece 16 yaşında. Kardeşi 4 yaş küçük. İkisinin yaşları toplamı kaçtır?", [
  "28",
  "20",
  "12",
  "16",
  "32"
], 0, "Kardeş 16 − 4 = 12 yaşındadır. Toplam 16 + 12 = 28. 20, yaşa farkı eklemektir. 12 yalnız kardeşin yaşıdır.");

q("mt-veri-oyku", "mt-veri", "Dört denemenin netleri 4, 8, 6 ve 6'dır. Aritmetik ortalama kaçtır?", [
  "6",
  "8",
  "24",
  "4",
  "5"
], 0, "Toplam 4 + 8 + 6 + 6 = 24. Dört deneme var: 24 ÷ 4 = 6. 24 toplamdır, ortalama değil. 8 en yüksek nettir, ortalama olmak zorunda değildir.");

q("mt-kume-oyku", "mt-kume", "A = {1, 2, 3, 4} ve B = {3, 4, 5}. A ∩ B kümesinin eleman sayısı kaçtır?", [
  "2",
  "4",
  "5",
  "1",
  "7"
], 0, "Kesişim yalnız ortak elemanlardır: 3 ve 4. Sayı 2'dir. Birleşim olsaydı {1, 2, 3, 4, 5} olur, eleman sayısı 5 olurdu.");

q("mt-olasilik-oyku", "mt-olasilik", "Bir zar atılıyor. 5'ten büyük gelme olasılığı kaçtır?", [
  "1/6",
  "1/3",
  "1/2",
  "5/6",
  "2/6"
], 0, "5'ten büyük olan yalnız 6'dır. İstenen 1 yüz, tümü 6 yüz: 1/6. 1/3, 5 ve 6'yı birlikte saymaktır; o da “5 veya daha büyük” olurdu.");

q("mt-dogru-oyku", "mt-dogru", "Bir doğru üstünde yan yana duran iki açı var. Biri 35°. Diğeri kaç derecedir?", [
  "145",
  "55",
  "35",
  "325",
  "90"
], 0, "Doğru üstündeki açı 180 derecedir. Yanındaki 180 − 35 = 145. 55, 90'ı tamamlayan tümler açıdır; burada bütünler açı soruluyor.");

q("mt-pisagor-oyku", "mt-pisagor", "Bir afişin dik kenarları 6 cm ve 8 cm. Köşegeni kaç cm'dir?", [
  "10",
  "14",
  "12",
  "48",
  "100"
], 0, "Köşegen, dik açının karşısındaki hipotenüstür. 6² + 8² = 36 + 64 = 100. 100, 10'un karesidir. Köşegen 10 cm. 14, kenarları toplamaktır.");

q("mt-ucgenalan-oyku", "mt-ucgenalan", "Tabanı 10 cm, yüksekliği 6 cm olan bir üçgen afişin alanı kaç santimetrekaredir?", [
  "30",
  "60",
  "16",
  "15",
  "32"
], 0, "Üçgenin alanı taban × yükseklik ÷ 2'dir. 10 × 6 = 60, 60 ÷ 2 = 30. 60, ikiye bölmeyi unutmaktır.");

q("mt-dortgen-oyku", "mt-dortgen", "Bir dörtgenin üç iç açısı 80°, 90° ve 100°'dir. Dördüncü açı kaç derecedir?", [
  "90",
  "270",
  "80",
  "180",
  "10"
], 0, "Dörtgenin iç açıları toplamı 360 derecedir. 80 + 90 + 100 = 270. Dördüncü açı 360 − 270 = 90. 270, üç açının toplamıdır.");

q("mt-cember-oyku", "mt-cember", "Yarıçapı 5 cm olan bir çemberde π = 3 alınırsa çevre kaç cm olur?", [
  "30",
  "75",
  "15",
  "10",
  "25"
], 0, "Çevre 2 × π × r. π = 3 ve r = 5 ise 2 × 3 × 5 = 30. 75, aynı çemberin alanıdır: 3 × 5 × 5. Soru çevreyi soruyor.");

q("mt-aci-oyku", "mt-aci", "Bir üçgenin iki açısı 50° ve 60°'dir. Üçüncü açı kaç derecedir?", [
  "70",
  "110",
  "90",
  "50",
  "180"
], 0, "İç açılar toplamı 180'dir. 50 + 60 = 110. Üçüncü açı 180 − 110 = 70. 110, iki açının toplamıdır, üçüncü açı değil.");

q("mt-alan-oyku", "mt-alan", "Eni 5 m, boyu 8 m olan dikdörtgen bir odanın alanı kaç metrekaredir?", [
  "40",
  "26",
  "13",
  "80",
  "16"
], 0, "Alan, en çarpı boydur: 5 × 8 = 40. 2 × (5 + 8) = 26 çevredir, alan değil. Soru içini soruyor, kenarların toplamını değil.");
