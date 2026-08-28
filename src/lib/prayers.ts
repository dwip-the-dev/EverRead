import type { BookId } from "./library";

export type Prayer = {
  id: string;
  bookId: BookId;
  title: string;
  text: string;
  original?: string;
  transliteration?: string;
  note?: string;
};

export type CustomPrayer = {
  id: string;
  bookId: BookId;
  title: string;
  text: string;
  createdAt: number;
};

const CUSTOM_PRAYERS_KEY = "everread.prayers.v1";

export function readCustomPrayers(): CustomPrayer[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CUSTOM_PRAYERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function writeCustomPrayers(prayers: CustomPrayer[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CUSTOM_PRAYERS_KEY, JSON.stringify(prayers));
  window.dispatchEvent(new Event("everread:prayers"));
}

export function addCustomPrayer(prayer: Omit<CustomPrayer, "id" | "createdAt">) {
  const existing = readCustomPrayers();
  const newPrayer: CustomPrayer = {
    ...prayer,
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: Date.now(),
  };
  writeCustomPrayers([newPrayer, ...existing]);
  return newPrayer;
}

export function deleteCustomPrayer(id: string) {
  const existing = readCustomPrayers();
  writeCustomPrayers(existing.filter((p) => p.id !== id));
}

// ──────────────────────────────────────────────
// BUILT-IN PRAYERS FOR ALL 14 TRADITIONS
// ──────────────────────────────────────────────

export const BUILT_IN_PRAYERS: Prayer[] = [
  // ═══════════════ CHRISTIANITY ═══════════════
  {
    id: "bible-lords-prayer",
    bookId: "bible",
    title: "The Lord's Prayer",
    text: "Our Father, who art in heaven,\nhallowed be thy Name;\nthy kingdom come;\nthy will be done,\non earth as it is in heaven.\nGive us this day our daily bread.\nAnd forgive us our trespasses,\nas we forgive those who trespass against us.\nAnd lead us not into temptation;\nbut deliver us from evil.\nFor thine is the kingdom,\nthe power, and the glory,\nfor ever and ever. Amen.",
    note: "Matthew 6:9–13 — The prayer Jesus taught his disciples",
  },
  {
    id: "bible-psalm-23",
    bookId: "bible",
    title: "Psalm 23 — The Lord Is My Shepherd",
    text: "The Lord is my shepherd; I shall not want.\nHe maketh me to lie down in green pastures:\nHe leadeth me beside the still waters.\nHe restoreth my soul:\nHe leadeth me in the paths of righteousness for his name's sake.\nYea, though I walk through the valley of the shadow of death,\nI will fear no evil: for thou art with me;\nthy rod and thy staff they comfort me.\nThou preparest a table before me in the presence of mine enemies:\nthou anointest my head with oil; my cup runneth over.\nSurely goodness and mercy shall follow me all the days of my life:\nand I will dwell in the house of the Lord for ever.",
    note: "Psalm 23 (KJV) — A prayer of trust and comfort",
  },
  {
    id: "bible-serenity",
    bookId: "bible",
    title: "The Serenity Prayer",
    text: "God, grant me the serenity to accept the things I cannot change,\ncourage to change the things I can,\nand wisdom to know the difference.\nLiving one day at a time,\nenjoying one moment at a time;\naccepting hardship as a pathway to peace.\nAmen.",
    note: "Reinhold Niebuhr — A widely cherished prayer of acceptance",
  },
  {
    id: "bible-prayer-of-st-francis",
    bookId: "bible",
    title: "Prayer of St. Francis",
    text: "Lord, make me an instrument of your peace.\nWhere there is hatred, let me sow love;\nwhere there is injury, pardon;\nwhere there is doubt, faith;\nwhere there is despair, hope;\nwhere there is darkness, light;\nand where there is sadness, joy.\nO Divine Master,\ngrant that I may not so much seek\nto be consoled as to console;\nto be understood as to understand;\nto be loved as to love.\nFor it is in giving that we receive;\nit is in pardoning that we are pardoned;\nand it is in dying that we are born to eternal life. Amen.",
    note: "Attributed to St. Francis of Assisi",
  },

  // ═══════════════ ISLAM ═══════════════
  {
    id: "quran-al-fatiha",
    bookId: "quran",
    title: "Al-Fatiha — The Opening",
    text: "In the name of God, the Most Gracious, the Most Merciful.\nAll praise is due to God, Lord of all the worlds.\nThe Most Gracious, the Most Merciful.\nMaster of the Day of Judgment.\nYou alone we worship, and You alone we ask for help.\nGuide us on the Straight Path,\nthe path of those who have received Your grace;\nnot the path of those who have brought down wrath upon themselves,\nnor of those who have gone astray.",
    original: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ\nالرَّحْمَٰنِ الرَّحِيمِ\nمَالِكِ يَوْمِ الدِّينِ\nإِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ\nاهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ\nصِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    transliteration: "Bismillāhi r-raḥmāni r-raḥīm\nAl-ḥamdu lillāhi rabbi l-ʿālamīn\nAr-raḥmāni r-raḥīm\nMāliki yawmi d-dīn\nʾIyyāka naʿbudu wa ʾiyyāka nastaʿīn\nIhdinā ṣ-ṣirāṭa l-mustaqīm\nṢirāṭa lladhīna ʾanʿamta ʿalayhim, ghayri l-maghḍūbi ʿalayhim wa lā ḍ-ḍāllīn",
    note: "Surah 1 — Recited in every unit of the five daily prayers",
  },
  {
    id: "quran-ayat-al-kursi",
    bookId: "quran",
    title: "Ayat al-Kursi — The Throne Verse",
    text: "God! There is no deity except Him, the Ever-Living, the Sustainer of existence.\nNeither drowsiness overtakes Him nor sleep.\nTo Him belongs whatever is in the heavens and whatever is on the earth.\nWho is it that can intercede with Him except by His permission?\nHe knows what is before them and what will be after them,\nand they encompass not a thing of His knowledge except for what He wills.\nHis Kursi extends over the heavens and the earth,\nand their preservation tires Him not.\nAnd He is the Most High, the Most Great.",
    original: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
    note: "Surah 2:255 — One of the most powerful verses for protection",
  },
  {
    id: "quran-dua-morning",
    bookId: "quran",
    title: "Morning Supplication (Dua)",
    text: "O Allah, by Your grace the morning has come to us.\nBy Your grace the evening has come to us.\nBy Your grace we live, and by Your grace we die,\nand unto You is the resurrection.\nO Allah, I ask You for the good of this day —\nits victory, its help, its light, its blessings, and its guidance.",
    note: "A traditional morning dua recited at dawn",
  },

  // ═══════════════ HINDUISM — GITA ═══════════════
  {
    id: "gita-gayatri-mantra",
    bookId: "gita",
    title: "Gayatri Mantra",
    text: "We meditate on the divine radiance of that supreme being\nwho has brought forth all the worlds.\nMay that light illuminate our minds and guide our intellect.",
    original: "ॐ भूर्भुवः स्वः\nतत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि\nधियो यो नः प्रचोदयात्",
    transliteration: "Om bhūr bhuvaḥ svaḥ\ntat savitur vareṇyaṃ\nbhargo devasya dhīmahi\ndhiyo yo naḥ pracodayāt",
    note: "Rig Veda 3.62.10 — The most sacred Vedic mantra, chanted at dawn and dusk",
  },
  {
    id: "gita-shanti-mantra",
    bookId: "gita",
    title: "Shanti Mantra — Prayer for Peace",
    text: "May there be peace in the heavens, peace in the atmosphere.\nMay there be peace on earth, peace in the waters.\nMay the healing herbs and plants bring peace.\nMay there be peace throughout the entire universe.\nPeace, peace, everlasting peace.",
    original: "ॐ द्यौः शान्तिरन्तरिक्षँ शान्तिः\nपृथ्वी शान्तिरापः शान्तिः\nओषधयः शान्तिर्वनस्पतयः शान्तिः\nविश्वे देवाः शान्तिर्ब्रह्म शान्तिः\nसर्वँ शान्तिः शान्तिरेव शान्तिः\nसा मा शान्तिरेधि ॥\nॐ शान्तिः शान्तिः शान्तिः ॥",
    transliteration: "Om dyauḥ śāntir antarikṣaṃ śāntiḥ\npṛthvī śāntir āpaḥ śāntiḥ\noṣadhayaḥ śāntir vanaspatayaḥ śāntiḥ\nviśve devāḥ śāntir brahma śāntiḥ\nsarvaṃ śāntiḥ śāntir eva śāntiḥ\nsā mā śāntir edhi\nOm śāntiḥ śāntiḥ śāntiḥ",
    note: "Yajur Veda 36.17 — Invocation of universal peace",
  },
  {
    id: "gita-mahamrityunjaya",
    bookId: "gita",
    title: "Mahamrityunjaya Mantra",
    text: "We worship the three-eyed One who is fragrant and nourishes all beings.\nAs the cucumber is freed from bondage to the vine,\nMay He liberate us from death for the sake of immortality.",
    original: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्",
    transliteration: "Om tryambakaṃ yajāmahe sugandhiṃ puṣṭivardhanam\nurvārukamiva bandhanān mṛtyor mukṣīya māmṛtāt",
    note: "Rig Veda 7.59.12 — The great mantra of liberation from death",
  },

  // ═══════════════ HINDUISM — UPANISHADS ═══════════════
  {
    id: "upanishads-asato-ma",
    bookId: "upanishads",
    title: "Asato Ma Sat Gamaya",
    text: "Lead me from the unreal to the real.\nLead me from darkness to light.\nLead me from death to immortality.\nOm, peace, peace, peace.",
    original: "असतो मा सद्गमय ।\nतमसो मा ज्योतिर्गमय ।\nमृत्योर्मा अमृतं गमय ।\nॐ शान्तिः शान्तिः शान्तिः ॥",
    transliteration: "asato mā sad gamaya\ntamaso mā jyotir gamaya\nmṛtyor mā amṛtaṃ gamaya\nOm śāntiḥ śāntiḥ śāntiḥ",
    note: "Brihadaranyaka Upanishad 1.3.28",
  },

  // ═══════════════ HINDUISM — VEDAS ═══════════════
  {
    id: "vedas-surya-namaskar",
    bookId: "vedas",
    title: "Surya Namaskar Mantra",
    text: "Salutations to the one who is the friend of all.\nSalutations to the one who shines brilliantly.\nSalutations to the one who induces activity.\nSalutations to the one who illuminates.",
    original: "ॐ मित्राय नमः\nॐ रवये नमः\nॐ सूर्याय नमः\nॐ भानवे नमः",
    transliteration: "Om mitrāya namaḥ\nOm ravaye namaḥ\nOm sūryāya namaḥ\nOm bhānave namaḥ",
    note: "Sacred mantras for the Sun Salutation",
  },

  // ═══════════════ BUDDHISM ═══════════════
  {
    id: "dhammapada-three-refuges",
    bookId: "dhammapada",
    title: "The Three Refuges (Tisarana)",
    text: "I take refuge in the Buddha.\nI take refuge in the Dhamma.\nI take refuge in the Sangha.\n\nFor the second time, I take refuge in the Buddha.\nFor the second time, I take refuge in the Dhamma.\nFor the second time, I take refuge in the Sangha.\n\nFor the third time, I take refuge in the Buddha.\nFor the third time, I take refuge in the Dhamma.\nFor the third time, I take refuge in the Sangha.",
    original: "Buddhaṃ saraṇaṃ gacchāmi.\nDhammaṃ saraṇaṃ gacchāmi.\nSaṅghaṃ saraṇaṃ gacchāmi.",
    transliteration: "Buddhaṃ saraṇaṃ gacchāmi\nDhammaṃ saraṇaṃ gacchāmi\nSaṅghaṃ saraṇaṃ gacchāmi",
    note: "The foundational Buddhist practice of taking refuge",
  },
  {
    id: "dhammapada-metta-sutta",
    bookId: "dhammapada",
    title: "Metta Sutta — Loving-Kindness",
    text: "May all beings be happy and secure.\nMay all beings be happy at heart.\nWhatever living beings there may be —\nwhether they are weak or strong,\ntall, large, medium, short,\nsubtle or gross, seen or unseen,\nnear or far, born or seeking birth —\nmay all beings, without exception, be happy.\nLet none deceive another\nor despise any being in any state.\nLet none through anger or ill-will\nwish harm upon another.",
    note: "Sutta Nipata 1.8 — The Buddha's teaching on universal love",
  },

  // ═══════════════ JUDAISM ═══════════════
  {
    id: "tanakh-shema",
    bookId: "tanakh",
    title: "Shema Yisrael",
    text: "Hear, O Israel: the Lord our God, the Lord is one.\nYou shall love the Lord your God with all your heart,\nand with all your soul, and with all your might.\nKeep these words that I am commanding you today in your heart.\nRecite them to your children and talk about them\nwhen you are at home and when you are away,\nwhen you lie down and when you rise.",
    original: "שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד\nוְאָהַבְתָּ אֵת יְהוָה אֱלֹהֶיךָ\nבְּכָל לְבָבְךָ\nוּבְכָל נַפְשְׁךָ\nוּבְכָל מְאֹדֶךָ",
    transliteration: "Shema Yisrael Adonai Eloheinu Adonai Echad\nV'ahavta et Adonai Elohecha\nb'chol l'vavcha\nuv'chol nafsh'cha\nuv'chol m'odecha",
    note: "Deuteronomy 6:4–7 — The central declaration of Jewish faith",
  },
  {
    id: "tanakh-modeh-ani",
    bookId: "tanakh",
    title: "Modeh Ani — Morning Gratitude",
    text: "I give thanks to You, living and eternal King,\nfor You have mercifully restored my soul within me.\nGreat is Your faithfulness.",
    original: "מוֹדֶה אֲנִי לְפָנֶיךָ\nמֶלֶךְ חַי וְקַיָּם\nשֶׁהֶחֱזַרְתָּ בִּי נִשְׁמָתִי בְחֶמְלָה\nרַבָּה אֱמוּנָתֶךָ",
    transliteration: "Modeh ani l'fanecha\nmelech chai v'kayam\nshehechezarta bi nishmati b'chemlah\nrabbah emunatecha",
    note: "The first prayer upon waking each morning",
  },

  // ═══════════════ TAOISM ═══════════════
  {
    id: "taoteching-ch1",
    bookId: "taoteching",
    title: "Opening Meditation on the Tao",
    text: "The Tao that can be told is not the eternal Tao.\nThe name that can be named is not the eternal name.\nThe nameless is the beginning of heaven and earth.\nThe named is the mother of ten thousand things.\nEver desireless, one can see the mystery.\nEver desiring, one can see the manifestations.\nThese two spring from the same source\nbut differ in name;\nthis appears as darkness.\nDarkness within darkness.\nThe gate to all mystery.",
    note: "Tao Te Ching, Chapter 1 — Lao Tzu",
  },
  {
    id: "taoteching-ch33",
    bookId: "taoteching",
    title: "Knowing Oneself — Chapter 33",
    text: "Knowing others is intelligence;\nknowing yourself is true wisdom.\nMastering others is strength;\nmastering yourself is true power.\nIf you realize that you have enough,\nyou are truly rich.\nIf you stay in the center\nand embrace death with your whole heart,\nyou will endure forever.",
    note: "Tao Te Ching, Chapter 33 — Self-mastery",
  },

  // ═══════════════ CONFUCIANISM ═══════════════
  {
    id: "analects-golden-rule",
    bookId: "analects",
    title: "The Golden Rule of Reciprocity",
    text: "Do not impose on others what you do not wish for yourself.\nIs there one word that may serve as a rule of practice\nfor all one's life?\nIs not Reciprocity such a word?",
    note: "Analects 15.24 — Confucius on the universal ethic",
  },
  {
    id: "analects-daily-reflection",
    bookId: "analects",
    title: "Zengzi's Daily Reflection",
    text: "Each day I examine myself in three ways:\nIn my dealings with others,\nhave I been faithful and trustworthy?\nIn my interactions with friends,\nhave I been sincere?\nHave I practiced what I have been taught?",
    note: "Analects 1.4 — Zengzi's practice of daily self-examination",
  },

  // ═══════════════ SIKHISM ═══════════════
  {
    id: "granth-mool-mantar",
    bookId: "granth",
    title: "Mool Mantar — The Root Mantra",
    text: "One Universal Creator God.\nTruth is the Name.\nCreative Being Personified.\nNo Fear. No Hatred.\nImage of the Timeless One.\nBeyond Birth. Self-Existent.\nBy Guru's Grace.",
    original: "ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ\nਨਿਰਭਉ ਨਿਰਵੈਰੁ\nਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ\nਗੁਰ ਪ੍ਰਸਾਦਿ ॥",
    transliteration: "Ik Oaṅkār Sat Nām Kartā Purkh\nNirbhau Nirvair\nAkāl Mūrat Ajūnī Saibhaṃ\nGur Prasād",
    note: "The opening verse of Guru Granth Sahib — the essence of Sikh theology",
  },
  {
    id: "granth-ardas",
    bookId: "granth",
    title: "Ardas — The Sikh Prayer",
    text: "First, remember the Almighty God.\nThen remember Guru Nanak.\nThen Angad Guru, Amar Das, and Ram Das —\nmay they help us.\nRemember Arjan, Hargobind, and Har Rai.\nRemember Har Krishan, on seeing whom all pain vanishes.\nRemember Tegh Bahadur,\nand the nine treasures shall come hastening to your home.\nMay the Tenth Master, Guru Gobind Singh,\nhelp and protect us everywhere.\nO Immortal Being, our shield,\nour protector, our eternal Lord,\nhear us and bless us with Your grace. Waheguru.",
    note: "A shortened form of the Ardas — the communal Sikh supplication",
  },

  // ═══════════════ JAINISM ═══════════════
  {
    id: "jain-agamas-namokar",
    bookId: "jain-agamas",
    title: "Namokar Mantra — The Supreme Prayer",
    text: "I bow to the Arihantas (perfected souls).\nI bow to the Siddhas (liberated souls).\nI bow to the Acharyas (spiritual leaders).\nI bow to the Upadhyayas (teachers).\nI bow to all the Sadhus and Sadhvis (monks and nuns).\nThis fivefold salutation destroys all sins\nand is the most auspicious of all auspicious things.",
    original: "णमो अरिहंताणं\nणमो सिद्धाणं\nणमो आयरियाणं\nणमो उवज्झायाणं\nणमो लोए सव्वसाहूणं",
    transliteration: "Namo Arihantāṇaṃ\nNamo Siddhāṇaṃ\nNamo Āyariyāṇaṃ\nNamo Uvajjhāyāṇaṃ\nNamo Loe Savvasāhūṇaṃ",
    note: "The most important prayer in Jainism, recited daily",
  },

  // ═══════════════ SHINTOISM ═══════════════
  {
    id: "kojiki-oharai",
    bookId: "kojiki",
    title: "Oharai no Kotoba — Great Purification Prayer",
    text: "By the command of the Emperor,\nGather, hear ye all —\nThe various sins and offenses\nthat may be committed in error or by design,\nlet them be swept away and purified.\nAs the wind blows away the clouds\nfrom the sky of heaven,\nAs the morning and evening breezes\nblow away the morning and evening mists,\nSo shall all transgressions be cleansed\nand made pure.\nHear us, O Kami, and grant us purification.",
    note: "A traditional Shinto purification prayer (Norito)",
  },
  {
    id: "kojiki-kansha",
    bookId: "kojiki",
    title: "Kansha — Gratitude Prayer",
    text: "Before the sacred Kami,\nI bow with humble reverence.\nWith a pure, bright, and upright heart,\nI offer gratitude for the blessings of this day.\nMay I walk in harmony with heaven and earth,\nand may this thankful spirit guide my every step.",
    note: "A daily Shinto prayer of thanksgiving",
  },

  // ═══════════════ ZOROASTRIANISM ═══════════════
  {
    id: "avesta-ashem-vohu",
    bookId: "avesta",
    title: "Ashem Vohu — Hymn of Righteousness",
    text: "Righteousness is the best good.\nIt is happiness.\nHappiness comes to the one\nwho is righteous\nfor the sake of righteousness alone.",
    original: "Ashem Vohū vahishtem astī\nushtā astī ushtā ahmai\nhyat ashāi vahishtāi ashem",
    transliteration: "Ashem Vohū vahishtem astī\nushtā astī ushtā ahmai\nhyat ashāi vahishtāi ashem",
    note: "One of the most sacred Avestan prayers, recited throughout the day",
  },
  {
    id: "avesta-yatha-ahu",
    bookId: "avesta",
    title: "Yatha Ahu Vairyo — The Ahunvar",
    text: "The will of the Lord is the law of righteousness.\nThe gifts of Vohu Mano to the deeds done in this world for Mazda.\nHe who relieves the poor makes Ahura king.",
    original: "Yathā ahū vairyō athā ratush ashāt chīt hachā\nvangheush dazdā mananghō shyaothananām angheush Mazdāi\nxshathremchā ahurāi ā yim drigubyō dadat vāstārem",
    note: "The holiest of Zoroastrian prayers, revealed to Zarathustra by Ahura Mazda",
  },

  // ═══════════════ BAHÁʼÍ FAITH ═══════════════
  {
    id: "bahai-short-obligatory",
    bookId: "bahai",
    title: "Short Obligatory Prayer",
    text: "I bear witness, O my God,\nthat Thou hast created me to know Thee and to worship Thee.\nI testify, at this moment, to my powerlessness\nand to Thy might,\nto my poverty and to Thy wealth.\nThere is none other God but Thee,\nthe Help in Peril, the Self-Subsisting.",
    note: "Bahá'u'lláh — Recited daily between noon and sunset",
  },
  {
    id: "bahai-unity-prayer",
    bookId: "bahai",
    title: "Prayer for Unity",
    text: "O my God! O my God!\nUnite the hearts of Thy servants,\nand reveal to them Thy great purpose.\nMay they follow Thy commandments\nand abide in Thy law.\nHelp them, O God, in their endeavor,\nand grant them strength to serve Thee.\nO God! Leave them not to themselves,\nbut guide their steps by the light of Thy knowledge,\nand cheer their hearts by Thy love.\nVerily, Thou art their Helper and their Lord.",
    note: "Bahá'u'lláh — A prayer for the unity of humanity",
  },
];

export function getPrayersForBook(bookId: BookId): Prayer[] {
  return BUILT_IN_PRAYERS.filter((p) => p.bookId === bookId);
}
