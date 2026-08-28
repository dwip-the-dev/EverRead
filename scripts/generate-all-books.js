import fs from "fs";
import path from "path";

// Helper to ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// -------------------------------------------------------------
// 1. BUDDHISM: The Dhammapada (Tripitaka / Pali Canon)
// -------------------------------------------------------------
const dhammapadaData = {
  id: "dhammapada",
  name: "The Dhammapada",
  religion: "Buddhism",
  translation: "Pali Canon — Max Müller & Buddhist Publication Society",
  unitLabel: "Chapter",
  sections: [
    {
      id: "dhammapada-main",
      name: "The Dhammapada (Path of Dhamma)",
      chapters: [
        {
          number: 1,
          name: "Yamaka-vagga (The Twin Verses)",
          subtitle: "On the nature of thought, speech, and consequence",
          verses: [
            {
              number: 1,
              text: "Mind precedes all mental states. Mind is their chief; they are all mind-wrought. If with an impure mind a person speaks or acts, suffering follows him like the wheel that follows the foot of the ox.",
              original: "Manopubbaṅgamā dhammā manosseṭṭhā manomayā, manasā ce paduṭṭhena bhāsati vā karoti vā, tato naṁ dukkhamanveti cakkaṁva vahato padaṁ.",
              transliteration: "Manopubbaṅgamā dhammā manosseṭṭhā manomayā..."
            },
            {
              number: 2,
              text: "Mind precedes all mental states. Mind is their chief; they are all mind-wrought. If with a pure mind a person speaks or acts, happiness follows him like his never-departing shadow.",
              original: "Manopubbaṅgamā dhammā manosseṭṭhā manomayā, manasā ce pasannena bhāsati vā karoti vā, tato naṁ sukhamanveti chāyāva anapāyinī.",
              transliteration: "Manopubbaṅgamā dhammā manosseṭṭhā manomayā..."
            },
            {
              number: 3,
              text: "‘He abused me, he struck me, he defeated me, he robbed me’ — in those who harbor such thoughts, hatred is not appeased.",
              original: "Akkocchi maṁ avadhi maṁ ajini maṁ ahāsi me, ye ca taṁ upanayhanti veraṁ tesaṁ na sammati.",
              transliteration: "Akkocchi maṁ avadhi maṁ..."
            },
            {
              number: 4,
              text: "‘He abused me, he struck me, he defeated me, he robbed me’ — in those who do not harbor such thoughts, hatred is appeased.",
              original: "Akkocchi maṁ avadhi maṁ ajini maṁ ahāsi me, ye ca taṁ nupanayhanti veraṁ tesūpasammati.",
              transliteration: "Akkocchi maṁ avadhi maṁ..."
            },
            {
              number: 5,
              text: "Hatred is never appeased by hatred in this world. By non-hatred alone is hatred appeased. This is an eternal truth.",
              original: "Na hi verena verāni sammantīdha kudācanaṁ, averena ca sammanti esa dhammo sanantano.",
              transliteration: "Na hi verena verāni sammantīdha kudācanaṁ..."
            },
            {
              number: 6,
              text: "There are those who do not realize that one day we all must die. But those who do realize this settle their quarrels at once.",
              original: "Pare ca na vijānanti mayamettha yamāmase, ye ca tattha vijānanti tato sammanti medhagā.",
              transliteration: "Pare ca na vijānanti..."
            }
          ]
        },
        {
          number: 2,
          name: "Appamada-vagga (Heedfulness)",
          subtitle: "On mindfulness, vigilance, and liberation",
          verses: [
            {
              number: 1,
              text: "Heedfulness is the path to the Deathless (Nibbana); heedlessness is the path to death. The heedful do not die; the heedless are like unto the dead already.",
              original: "Appamādo amatapadaṁ pamādo maccuno padaṁ, appamattā na mīyanti ye pamattā yathā matā.",
              transliteration: "Appamādo amatapadaṁ pamādo maccuno padaṁ..."
            },
            {
              number: 2,
              text: "Clearly understanding this excellence of heedfulness, the wise rejoice in heedfulness, delighting in the realm of the Noble Ones.",
              original: "Evaṁ visesato ñatvā appamādamhi paṇḍitā, appamāde pamodanti ariyānaṁ gocare ratā.",
              transliteration: "Evaṁ visesato ñatvā..."
            },
            {
              number: 3,
              text: "These wise ones, meditative, persevering, always using strong effort, attain Nibbana, the unsurpassed freedom from bondage.",
              original: "Te jhāyino sātatikā niccaṁ daḷhaparakkamā, phusanti dhīrā nibbānaṁ yogakkhemaṁ anuttaraṁ.",
              transliteration: "Te jhāyino sātatikā..."
            },
            {
              number: 4,
              text: "Whoever is energetic, mindful, pure in conduct, discerning, self-restrained, righteous in living, and heedful — his glory grows.",
              original: "Uṭṭhānavato satimato sucikammassa nisammakārino, saññatassa ca dhammajīvino appamattassa yasobhivaḍḍhati.",
              transliteration: "Uṭṭhānavato satimato..."
            }
          ]
        },
        {
          number: 3,
          name: "Citta-vagga (The Mind)",
          subtitle: "On guarding and mastering the restless mind",
          verses: [
            {
              number: 1,
              text: "Just as a fletcher straightens an arrow, so the discerning person straightens the mind, which is fickle, wavering, difficult to guard and difficult to control.",
              original: "Phandanaṁ capalaṁ cittaṁ durakkhaṁ dunnivārayaṁ, ujuṁ karoti medhāvī usukārova tejanaṁ.",
              transliteration: "Phandanaṁ capalaṁ cittaṁ..."
            },
            {
              number: 2,
              text: "Like a fish pulled from its watery home and cast on dry ground, this mind thrashes about trying to escape the realm of Mara.",
              original: "Vārijova thale khitto okamokataubbhuto, pariphandatidaṁ cittaṁ māradheyyaṁ pahātave.",
              transliteration: "Vārijova thale khitto..."
            },
            {
              number: 3,
              text: "Hard to restrain, swift, flying wherever it pleases is the mind. To master such a mind is good; a controlled mind brings true happiness.",
              original: "Dunniggahassa lahuno yatthakāmanipātino, cittassa damatho sādhu cittaṁ dantaṁ sukhāvahaṁ.",
              transliteration: "Dunniggahassa lahuno..."
            },
            {
              number: 4,
              text: "Whatever a hater may do to a hater, or an enemy to an enemy, a wrongly directed mind does oneself far greater harm.",
              original: "Diso disaṁ yaṁ taṁ kayirā verī vā pana verinaṁ, micchāpaṇihitaṁ cittaṁ pāpiyo naṁ tato kare.",
              transliteration: "Diso disaṁ yaṁ taṁ kayirā..."
            },
            {
              number: 5,
              text: "Neither father nor mother, nor any other relative can do as much good as a well-directed mind.",
              original: "Na taṁ mātā pitā kayirā aññe vāpi ca ñātakā, sammāpaṇihitaṁ cittaṁ seyyaso naṁ tato kare.",
              transliteration: "Na taṁ mātā pitā kayirā..."
            }
          ]
        },
        {
          number: 4,
          name: "Puppha-vagga (Flowers)",
          subtitle: "On gathering the fragrant flowers of virtue",
          verses: [
            {
              number: 1,
              text: "The scent of flowers does not travel against the wind, nor that of sandalwood, tagara, or jasmine. But the fragrance of the virtuous travels against the wind; the virtuous person pervades all directions.",
              original: "Na pupphagandho paṭivātameti na candanaṁ tagaramallikā vā, satañca gandho paṭivātameti sabbā disā sappuriso pavāyati.",
              transliteration: "Na pupphagandho paṭivātameti..."
            },
            {
              number: 2,
              text: "Just as from a heap of flowers many garlands can be made, so by a mortal once born many good deeds should be done.",
              original: "Yathāpi puppharāsimhā kayirā mālāguṇe bahū, evaṁ jātena maccena kattabbaṁ kusalaṁ bahuṁ.",
              transliteration: "Yathāpi puppharāsimhā..."
            }
          ]
        },
        {
          number: 5,
          name: "Bala-vagga (The Fool)",
          subtitle: "On ignorance and wisdom",
          verses: [
            {
              number: 1,
              text: "Long is the night to the sleepless; long is the league to the weary traveler; long is the round of rebirth (samsara) to the foolish who know not the sublime truth.",
              original: "Dīghā jāgarato ratti dīghaṁ santassa yojanaṁ, dīgho bālānaṁ saṁsāro saddhammaṁ avijānataṁ.",
              transliteration: "Dīghā jāgarato ratti..."
            },
            {
              number: 2,
              text: "If a traveler does not meet a companion who is better or equal, let him firmly pursue a solitary course; there is no fellowship with a fool.",
              original: "Carañce nādhigaccheyya seyyaṁ sadisamattano, ekacariyaṁ daḷhaṁ kayirā natthi bāle sahāyatā.",
              transliteration: "Carañce nādhigaccheyya..."
            },
            {
              number: 3,
              text: "A fool who knows his foolishness is wise at least to that extent. But a fool who thinks he is wise is called a fool indeed.",
              original: "Yo bālo maññati bālyaṁ paṇḍito vāpi tena so, bālo ca paṇḍitamānī sa ve bāloti vuccati.",
              transliteration: "Yo bālo maññati bālyaṁ..."
            }
          ]
        },
        {
          number: 6,
          name: "Pandita-vagga (The Wise)",
          subtitle: "On true discernment and serenity",
          verses: [
            {
              number: 1,
              text: "Just as a solid rock is not shaken by the wind, even so the wise are not moved by praise or blame.",
              original: "Selo yathā ekaghano vātena na samīrati, evaṁ nindāpasaṁsāsu na samiñjanti paṇḍitā.",
              transliteration: "Selo yathā ekaghano..."
            },
            {
              number: 2,
              text: "Even as a deep, still lake is clear and calm, so the wise become tranquil after listening to the Dhamma.",
              original: "Yathāpi rahado gambhīro vippasanno anāvilo, evaṁ dhammāni sutvāna vippasīdanti paṇḍitā.",
              transliteration: "Yathāpi rahado gambhīro..."
            }
          ]
        },
        {
          number: 7,
          name: "Arahanta-vagga (The Liberated)",
          subtitle: "On the joy of freedom from craving",
          verses: [
            {
              number: 1,
              text: "For him who has completed his journey, who is free from sorrow, liberated in every way, and has shed all bonds — no fever of passion exists.",
              original: "Gataddhino visokassa vippamuttassa sabbadhi, sabbaganthappahīnassa pariḷāho na vijjati.",
              transliteration: "Gataddhino visokassa..."
            },
            {
              number: 2,
              text: "Calm is his mind, calm is his speech, and calm is his action who, through right knowledge, is wholly freed and at peace.",
              original: "Santaṁ tassa manaṁ hoti santā vācā ca kamma ca, sammadaññā vimuttassa upasantassa tādino.",
              transliteration: "Santaṁ tassa manaṁ hoti..."
            }
          ]
        },
        {
          number: 8,
          name: "Sahassa-vagga (The Thousands)",
          subtitle: "On the supreme value of one word of peace",
          verses: [
            {
              number: 1,
              text: "Better than a thousand useless words is one single meaningful word, upon hearing which one attains peace.",
              original: "Sahassamapi ce vācā anatthapadasaṁhitā, ekaṁ atthapadaṁ seyyo yaṁ sutvā upasammati.",
              transliteration: "Sahassamapi ce vācā..."
            },
            {
              number: 2,
              text: "Though one may conquer in battle a thousand times a thousand men, yet he who conquers himself alone is the greatest of conquerors.",
              original: "Yo sahassaṁ sahassena saṅgāme mānuse jine, ekañca jeyyamattānaṁ sa ve saṅgāmajuttamo.",
              transliteration: "Yo sahassaṁ sahassena..."
            }
          ]
        },
        {
          number: 9,
          name: "Atta-vagga (The Self)",
          subtitle: "On self-reliance and self-purification",
          verses: [
            {
              number: 1,
              text: "One truly is the protector of oneself; who else could the protector be? With oneself thoroughly tamed, one discovers a refuge that is hard to gain.",
              original: "Attā hi attano nātho ko hi nātho paro siyā, attanā hi sudantena nāthaṁ labhati dullabhaṁ.",
              transliteration: "Attā hi attano nātho..."
            },
            {
              number: 2,
              text: "By oneself alone is evil done; by oneself is one defiled. By oneself is evil left undone; by oneself is one purified. Purity and impurity depend on oneself; no one can purify another.",
              original: "Attanā hi kataṁ pāpaṁ attanā saṅkilissati, attanā akataṁ pāpaṁ attanāva visujjhati, suddhī asuddhī paccattaṁ nāñño aññaṁ visodhaye.",
              transliteration: "Attanā hi kataṁ pāpaṁ..."
            }
          ]
        },
        {
          number: 10,
          name: "Magga-vagga (The Path)",
          subtitle: "The Noble Eightfold Path to liberation",
          verses: [
            {
              number: 1,
              text: "Of paths the Eightfold is the best; of truths the Four Sayings are the best; of virtues detachment is the best; and of men the Seer (the Buddha) is the best.",
              original: "Maggānaṭṭhaṅgiko seṭṭho saccānaṁ caturo padā, virāgo seṭṭho dhammānaṁ dvipadānañca cakkhumā.",
              transliteration: "Maggānaṭṭhaṅgiko seṭṭho..."
            },
            {
              number: 2,
              text: "This is the only path; there is no other that leads to the purification of insight. Follow this path, and you will confound Mara (illusion).",
              original: "Esove maggo natthañño dassanassa visuddhiyā, etaṁhi tumhe paṭipajjatha mārassetaṁ pamohanaṁ.",
              transliteration: "Esove maggo natthañño..."
            },
            {
              number: 3,
              text: "You yourselves must strive; the Buddhas only show the way. Those who enter the path and practice meditation are freed from the bonds of death.",
              original: "Tumhehi kiccamātappaṁ akkhātāro tathāgatā, paṭipannā pamokkhanti jhāyino mārabandhanā.",
              transliteration: "Tumhehi kiccamātappaṁ..."
            }
          ]
        }
      ]
    }
  ]
};

// -------------------------------------------------------------
// 2. TAOISM: Tao Te Ching (Lao Tzu)
// -------------------------------------------------------------
const taotechingData = {
  id: "taoteching",
  name: "Tao Te Ching",
  religion: "Taoism",
  translation: "Lao Tzu — James Legge & Classical Translation",
  unitLabel: "Chapter",
  sections: [
    {
      id: "tao-ching",
      name: "Part I: The Book of Tao (Chapters 1–10)",
      chapters: [
        {
          number: 1,
          name: "Embodying the Tao",
          subtitle: "The unnameable origin of heaven and earth",
          verses: [
            {
              number: 1,
              text: "The Tao that can be trodden is not the enduring and unchanging Tao. The name that can be named is not the enduring and unchanging name.",
              original: "道可道，非常道。名可名，非常名。",
              transliteration: "Dào kě dào, fēi cháng dào. Míng kě míng, fēi cháng míng."
            },
            {
              number: 2,
              text: "Conceived of as having no name, it is the Originator of heaven and earth; conceived of as having a name, it is the Mother of all things.",
              original: "無名天地之始；有名萬物之母。",
              transliteration: "Wú míng tiān dì zhī shǐ; yǒu míng wàn wù zhī mǔ."
            },
            {
              number: 3,
              text: "Always without desire we discern the spiritual essence; always with desire we discern the manifestations. These two spring from the same source but differ in name; this mystery is the gateway to all wonder.",
              original: "故常無欲，以觀其妙；常有欲，以觀其徼。此兩者，同出而異名，同謂之玄。玄之又玄，眾妙之門。",
              transliteration: "Gù cháng wú yù, yǐ guān qí miào..."
            }
          ]
        },
        {
          number: 2,
          name: "The Harmony of Opposites",
          subtitle: "Wu wei and the balance of dualities",
          verses: [
            {
              number: 1,
              text: "All in the world know the beauty of the beautiful, and in doing so recognize ugliness. All know the goodness of the good, and in doing so recognize evil.",
              original: "天下皆知美之為美，斯惡已；皆知善之為善，斯不善已。",
              transliteration: "Tiān xià jiē zhī měi zhī wéi měi..."
            },
            {
              number: 2,
              text: "Being and non-being produce each other; difficult and easy complete each other; long and short show each other; high and low bridge each other; tone and voice harmonize each other; front and back follow each other.",
              original: "有無相生，難易相成，長短相形，高下相傾，音聲相和，前後相隨。",
              transliteration: "Yǒu wú xiāng shēng, nán yì xiāng chéng..."
            },
            {
              number: 3,
              text: "Therefore the sage manages affairs without action (Wu Wei) and conveys instruction without words. All things spring up, and he refuses them not; he produces them, but claims no ownership.",
              original: "是以聖人處無為之事，行不言之教；萬物作而弗始，生而弗有，為而弗恃，功成而弗居。",
              transliteration: "Shì yǐ shèng rén chù wú wéi zhī shì..."
            }
          ]
        },
        {
          number: 3,
          name: "Quieting the Mind",
          subtitle: "Stillness, simplicity, and inner peace",
          verses: [
            {
              number: 1,
              text: "Not exalting the talented prevents people from contending. Not prizing hard-to-get goods prevents robbery. Not displaying objects of desire keeps people's hearts uncorrupted.",
              original: "不尚賢，使民不爭；不貴難得之貨，使民不為盜；不見可欲，使民心不亂。",
              transliteration: "Bù shàng xián, shǐ mín bù zhēng..."
            },
            {
              number: 2,
              text: "The sage empties the mind and fills the belly, weakens ambitions and strengthens the bones. Practice non-action, and nothing remains ungoverned.",
              original: "是以聖人之治，虛其心，實其腹，弱其志，強其骨。為無為，則無不治。",
              transliteration: "Shì yǐ shèng rén zhī zhì, xū qí xīn..."
            }
          ]
        },
        {
          number: 4,
          name: "The Source Without Limit",
          subtitle: "The inexhaustible vessel of the Tao",
          verses: [
            {
              number: 1,
              text: "The Tao is like an empty vessel that, being filled, is never exhausted. Fathomless, it seems to be the primal ancestor of all things.",
              original: "道沖，而用之或不盈。淵兮，似萬物之宗。",
              transliteration: "Dào chōng, ér yòng zhī huò bù yíng. Yuān xī, sì wàn wù zhī zōng."
            },
            {
              number: 2,
              text: "It blunts sharpness, unravels tangles, softens glare, and settles dust. Deep and serene, it seems forever present.",
              original: "挫其銳，解其紛，和其光，同其塵。湛兮，似或存。",
              transliteration: "Cuò qí ruì, jiě qí fēn, hé qí guāng, tóng qí chén."
            }
          ]
        },
        {
          number: 8,
          name: "The Excellence of Water",
          subtitle: "Yielding, nourishing, and seeking the lowest place",
          verses: [
            {
              number: 1,
              text: "The highest goodness is like water. Water excels in benefiting all things without competing with them. It dwells in low places that people disdain; thus it comes near to the Tao.",
              original: "上善若水。水善利萬物而不爭，處眾人之所惡，故幾於道。",
              transliteration: "Shàng shàn ruò shuǐ. Shuǐ shàn lì wàn wù ér bù zhēng..."
            },
            {
              number: 2,
              text: "In dwelling, be close to the land. In meditation, delve deep into the heart. In dealing with others, be gentle and kind. In speaking, be true. In governing, maintain peace. In action, choose the right time.",
              original: "居善地，心善淵，與善仁，言善信，政善治，事善能，動善時。",
              transliteration: "Jū shàn dì, xīn shàn yuān, yǔ shàn rén..."
            },
            {
              number: 3,
              text: "Because you do not contend, no blame will be attached to you.",
              original: "夫唯不爭，故無尤。",
              transliteration: "Fū wéi bù zhēng, gù wú yóu."
            }
          ]
        },
        {
          number: 16,
          name: "Returning to Stillness",
          subtitle: "Emptiness, constancy, and the root of life",
          verses: [
            {
              number: 1,
              text: "Attain utmost emptiness; maintain absolute stillness. All things flourish together, and I see them return to their source.",
              original: "致虛極，守靜篤。萬物並作，吾以觀復。",
              transliteration: "Zhì xū jí, shǒu jìng dǔ. Wàn wù bìng zuò, wú yǐ guān fù."
            },
            {
              number: 2,
              text: "Each thing returns to its root. Returning to the root means stillness; stillness means fulfilling its destiny. Returning to destiny is called Constancy; knowing Constancy is called Enlightenment.",
              original: "夫物芸芸，各復歸其根。歸根曰靜，靜曰復命。復命曰常，知常曰明。",
              transliteration: "Fū wù yún yún, gè fù guī qí gēn..."
            }
          ]
        },
        {
          number: 33,
          name: "True Mastery",
          subtitle: "Self-knowledge and inner contentment",
          verses: [
            {
              number: 1,
              text: "He who knows others is wise; he who knows himself is enlightened. He who conquers others has force; he who conquers himself has true strength.",
              original: "知人者智，自知者明。勝人者有力，自勝者強。",
              transliteration: "Zhī rén zhě zhì, zì zhī zhě míng. Shèng rén zhě yǒu lì, zì shèng zhě qiáng."
            },
            {
              number: 2,
              text: "He who knows when he has enough is truly rich. He who perseveres with energy has resolve. He who dies without perishing enjoys longevity.",
              original: "知足者富。強行者有志。不失其所者久。死而不亡者壽。",
              transliteration: "Zhī zú zhě fù. Qiáng xíng zhě yǒu zhì..."
            }
          ]
        }
      ]
    }
  ]
};

// -------------------------------------------------------------
// 3. JUDAISM: The Tanakh & Pirkei Avot (Ethics of the Fathers)
// -------------------------------------------------------------
const tanakhData = {
  id: "tanakh",
  name: "The Tanakh & Pirkei Avot",
  religion: "Judaism",
  translation: "Hebrew Scripture & Mishnah Ethics — Traditional Translation",
  unitLabel: "Chapter",
  sections: [
    {
      id: "torah-psalms",
      name: "Torah & Wisdom Selections",
      chapters: [
        {
          number: 1,
          name: "The Shema & The Commandments",
          subtitle: "The foundational declaration of faith and devotion",
          verses: [
            {
              number: 1,
              text: "Hear, O Israel: The Lord our God, the Lord is one.",
              original: "שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד",
              transliteration: "Shema Yisrael Adonai Eloheinu Adonai Echad."
            },
            {
              number: 2,
              text: "And you shall love the Lord your God with all your heart and with all your soul and with all your might.",
              original: "וְאָהַבְתָּ אֵת יְהוָה אֱלֹהֶיךָ בְּכָל־לְבָבְךָ וּבְכָל־נַפְשְׁךָ וּבְכָל־מְאֹדֶךָ",
              transliteration: "V'ahavta et Adonai Elohecha b'chol l'vavcha..."
            },
            {
              number: 3,
              text: "You shall love your neighbor as yourself: I am the Lord.",
              original: "וְאָהַבְתָּ לְרֵעֲךָ כָּמוֹךָ אֲנִי יְהוָה",
              transliteration: "V'ahavta l're'acha kamocha, ani Adonai."
            },
            {
              number: 4,
              text: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly, to love mercy, and to walk humbly with your God.",
              original: "הִגִּיד לְךָ אָדָם מַה־טּוֹב וּמָה־יְהוָה דּוֹרֵשׁ מִמְּךָ כִּי אִם־עֲשׂוֹת מִשְׁפָּט וְאַהֲבַת חֶסֶד וְהַצְנֵעַ לֶכֶת עִם־אֱלֹהֶיךָ",
              transliteration: "Higgid l'cha adam mah tov..."
            }
          ]
        },
        {
          number: 2,
          name: "Pirkei Avot (Ethics of the Fathers)",
          subtitle: "Ancient rabbinic wisdom on duty, justice, and character",
          verses: [
            {
              number: 1,
              text: "Shimon the Righteous used to say: Upon three things the world stands: upon the Torah, upon divine service, and upon acts of loving-kindness.",
              original: "שִׁמְעוֹן הַצַּדִּיק הָיָה אוֹמֵר, עַל שְׁלשָׁה דְבָרִים הָעוֹלָם עוֹמֵד, עַל הַתּוֹרָה וְעַל הָעֲבוֹדָה וְעַל גְּמִילוּת חֲסָדִים",
              transliteration: "Al shlosha devarim ha'olam omed..."
            },
            {
              number: 2,
              text: "Hillel said: If I am not for myself, who will be for me? And being only for myself, what am I? And if not now, when?",
              original: "הוּא הָיָה אוֹמֵר, אִם אֵין אֲנִי לִי, מִי לִי. וּכְשֶׁאֲנִי לְעַצְמִי, מָה אֲנִי. וְאִם לֹא עַכְשָׁיו, אֵימָתַי",
              transliteration: "Im ein ani li, mi li? U'chshenani l'atzmi, mah ani? V'im lo achshav, eimatai?"
            },
            {
              number: 3,
              text: "Rabbi Tarfon said: It is not your duty to finish the work, but neither are you at liberty to neglect it.",
              original: "הוּא הָיָה אוֹמֵר, לֹא עָלֶיךָ הַמְּלָאכָה לִגְמֹר, וְלֹא אַתָּה בֶן חוֹרִין לִבָּטֵל מִמֶּנָּה",
              transliteration: "Lo alecha hamlacha ligmor..."
            },
            {
              number: 4,
              text: "Ben Zoma said: Who is wise? One who learns from every person. Who is strong? One who subdues his own impulses. Who is rich? One who rejoices in his portion.",
              original: "בֶּן זוֹמָא אוֹמֵר, אֵיזֶהוּ חָכָם, הַלּוֹמֵד מִכָּל אָדָם. אֵיזֶהוּ גִבּוֹר, הַכּוֹבֵשׁ אֶת יִצְרוֹ. אֵיזֶהוּ עָשִׁיר, הַשָּׂמֵחַ בְּחֶלְקוֹ",
              transliteration: "Eizehu chacham? Halomed mikol adam..."
            }
          ]
        }
      ]
    }
  ]
};

// -------------------------------------------------------------
// 4. HINDUISM: The Principal Upanishads
// -------------------------------------------------------------
const upanishadsData = {
  id: "upanishads",
  name: "The Upanishads",
  religion: "Hinduism",
  translation: "Principal Upanishads — Swami Nikhilananda & Max Müller",
  unitLabel: "Upanishad",
  sections: [
    {
      id: "upanishads-core",
      name: "The Principal Upanishads",
      chapters: [
        {
          number: 1,
          name: "Isha Upanishad",
          subtitle: "On all-pervading consciousness and renunciation",
          verses: [
            {
              number: 1,
              text: "All this, whatsoever moves in this moving world, is enveloped by the Divine. Find your enjoyment in renunciation; covet not the wealth of any person.",
              original: "ॐ ईशा वास्यमिदँ सर्वं यत्किञ्च जगत्यां जगत् । तेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥",
              transliteration: "Oṁ īśā vāsyam idaṁ sarvaṁ yat kiñca jagatyāṁ jagat..."
            },
            {
              number: 2,
              text: "He who sees all beings in the Self alone, and the Self in all beings, feels no hatred by virtue of that realization.",
              original: "यस्तु सर्वाणि भूतान्यात्मन्येवानुपश्यति । सर्वभूतेषु चात्मानं ततो न विजुगुप्सते ॥",
              transliteration: "Yastu sarvāṇi bhūtāny ātmany evānupaśyati..."
            },
            {
              number: 3,
              text: "When to the seer all things have verily become the Self, what delusion, what sorrow can there be for him who beholds that oneness?",
              original: "यस्मिन्सर्वाणि भूतान्यात्मैवाभूद्विजानतः । तत्र को मोहः कः शोक एकत्वमनुपश्यतः ॥",
              transliteration: "Yasmin sarvāṇi bhūtāny ātmaivābhūd vijānataḥ..."
            }
          ]
        },
        {
          number: 2,
          name: "Katha Upanishad",
          subtitle: "Nachiketa and Yama: The secret of immortality",
          verses: [
            {
              number: 1,
              text: "The good is one thing, the pleasant another; these two, having different purposes, bind human beings. Of these two, it is well for him who chooses the good; he who chooses the pleasant misses the true goal.",
              original: "अन्यच्छ्रेयोऽन्यदुतैव प्रेयस्ते उभे नानार्थे पुरुषँ सिनीतः । तयोः श्रेय आददानस्य साधु भवति हीयतेऽर्थाद्य उ प्रेयो वृणीते ॥",
              transliteration: "Anyac chreyo 'nyad utaiva preyas..."
            },
            {
              number: 2,
              text: "Arise, awake, and learn by approaching the wise! Sharp as the edge of a razor and hard to cross, say the sages, is this path.",
              original: "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत । क्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति ॥",
              transliteration: "Uttiṣṭhata jāgrata prāpya varān nibodhata..."
            },
            {
              number: 3,
              text: "Knowing that which is soundless, touchless, formless, undecaying, tasteless, eternal, odorless, without beginning and without end, beyond the great — one is freed from the jaws of death.",
              original: "अशब्दमस्पर्शमरूपमव्ययं तथाऽरसं नित्यमगन्धवच्च यत् । अनाद्यनन्तं महतः परं ध्रुवं निचाय्य तन्मृत्युमुखात् प्रमुच्यते ॥",
              transliteration: "Aśabdam asparśam arūpam avyayaṁ..."
            }
          ]
        },
        {
          number: 3,
          name: "Mundaka & Mandukya Upanishads",
          subtitle: "Truth alone triumphs (Satyameva Jayate) and the nature of OM",
          verses: [
            {
              number: 1,
              text: "Truth alone triumphs, not untruth. By truth is paved the divine path along which the sages, having their desires fulfilled, proceed to the supreme abode of Truth.",
              original: "सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः । येनाक्रमन्त्यृषयो ह्याप्तकामा यत्र तत् सत्यस्य परमं निधानम् ॥",
              transliteration: "Satyameva jayate nānṛtaṁ..."
            },
            {
              number: 2,
              text: "OM — this syllable is all this. All that was, that is, and that will be is verily OM; and whatever is beyond the threefold time is also verily OM.",
              original: "ओमित्येतदक्षरमिदँ सर्वं तस्योपव्याख्यानं भूतं भवद् भविष्यदिति सर्वमोङ्कार एव । यच्चान्यत् त्रिकालातीतं तदपि ओङ्कार एव ॥",
              transliteration: "Om ity etad akṣaram idaṁ sarvam..."
            }
          ]
        }
      ]
    }
  ]
};

// -------------------------------------------------------------
// 5. HINDUISM: The Vedas (Rigveda Selections)
// -------------------------------------------------------------
const vedasData = {
  id: "vedas",
  name: "The Vedas",
  religion: "Hinduism",
  translation: "Rigveda Sacred Hymns — Ralph T.H. Griffith & Wendy Doniger",
  unitLabel: "Hymn",
  sections: [
    {
      id: "rigveda-core",
      name: "Rigveda Hymns of Dawn, Creation, and Peace",
      chapters: [
        {
          number: 1,
          name: "Nasadiya Sukta (Hymn of Creation)",
          subtitle: "Rigveda Mandala 10, Hymn 129",
          verses: [
            {
              number: 1,
              text: "Then was not non-existence nor existence; there was no realm of air, no sky beyond it. What covered it, and where? And what gave shelter? Was water there, unfathomed depth of water?",
              original: "नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत् । किमावरीवः कुह कस्य शर्मन्नम्भः किमासीद्गहनं गभीरम् ॥",
              transliteration: "Nāsad āsīn no sad āsīt tadānīṁ..."
            },
            {
              number: 2,
              text: "Death was not then, nor was there aught immortal; no sign was there, the day’s and night’s divider. That One Thing, breathless, breathed by its own nature; apart from it was nothing whatsoever.",
              original: "न मृत्युरासीदमृतं न तर्हि न रात्र्या अह्न आसीत्प्रकेतः । आनीदवातं स्वधया तदेकं तस्माद्धान्यन्न परः किञ्चनास ॥",
              transliteration: "Na mṛtyur āsīd amṛtaṁ na tarhi..."
            },
            {
              number: 3,
              text: "Darkness there was; at first concealed in darkness, this all was undifferentiated water. That which had become enclosed in void, that One arose through the power of warmth (tapas).",
              original: "तम आसीत्तमसा गूळ्हमग्रेऽप्रकेतं सलिलं सर्वमा इदम् । तुच्छ्येनाभ्वपिहितं यदासीत्तपसस्तन्महिनाजायतैकम् ॥",
              transliteration: "Tama āsīt tamasā gūḷham agre..."
            }
          ]
        },
        {
          number: 2,
          name: "Gayatri & Sam No Mitra (Hymns of Light & Harmony)",
          subtitle: "Prayers for universal illumination and cosmic peace",
          verses: [
            {
              number: 1,
              text: "We meditate on the adorable effulgence of that Divine Sun (Savitur); may that light inspire and illumine our understanding.",
              original: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥",
              transliteration: "Oṁ bhūr bhuvaḥ svaḥ tat savitur vareṇyaṁ bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt."
            },
            {
              number: 2,
              text: "May your purpose be one; may your hearts be in harmony; may your minds be in common accord, so that there may be a happy union among you.",
              original: "समानी व आकूतिः समाना हृदयानि वः । समानमस्तु वो मनो यथा वः सुसहासति ॥",
              transliteration: "Samānī va ākūtiḥ samānā hṛdayāni vaḥ..."
            }
          ]
        }
      ]
    }
  ]
};

// -------------------------------------------------------------
// 6. CONFUCIANISM: The Analects of Confucius (Lunyu)
// -------------------------------------------------------------
const analectsData = {
  id: "analects",
  name: "The Analects",
  religion: "Confucianism",
  translation: "Confucius (Lunyu) — James Legge & Arthur Waley",
  unitLabel: "Book",
  sections: [
    {
      id: "analects-core",
      name: "The Sayings of Master Kong",
      chapters: [
        {
          number: 1,
          name: "Xue Er (On Learning & Integrity)",
          subtitle: "The joy of learning and noble character",
          verses: [
            {
              number: 1,
              text: "The Master said: 'Is it not pleasant to learn with a constant perseverance and application? Is it not delightful to have friends coming from distant quarters? Is he not a noble person who feels no discomposure though men take no note of him?'",
              original: "子曰：「學而時習之，不亦說乎？有朋自遠方來，不亦樂乎？人不知而不慍，不亦君子乎？」",
              transliteration: "Zǐ yuē: Xué ér shí xí zhī, bù yì yuè hū?..."
            },
            {
              number: 2,
              text: "Master Zeng said: 'I daily examine myself on three points: whether, in transacting business for others, I have failed to be faithful; whether, in intercourse with friends, I have failed to be sincere; whether I have failed to practice what I have been taught.'",
              original: "曾子曰：「吾日三省吾身：為人謀而不忠乎？與朋友交而不信乎？傳不習乎？」",
              transliteration: "Zēngzǐ yuē: Wú rì sān xǐng wú shēn..."
            }
          ]
        },
        {
          number: 2,
          name: "Wei Zheng (On Governance & Virtue)",
          subtitle: "Leading through moral excellence rather than force",
          verses: [
            {
              number: 1,
              text: "The Master said: 'He who exercises government by means of his virtue may be compared to the north polar star, which keeps its place and all the stars turn towards it.'",
              original: "子曰：「為政以德，譬如北辰，居其所而眾星共之。」",
              transliteration: "Zǐ yuē: Wéi zhèng yǐ dé, pì rú běi chén..."
            },
            {
              number: 2,
              text: "The Master said: 'Learning without thought is labor lost; thought without learning is perilous.'",
              original: "子曰：「學而不思則罔，思而不學則殆。」",
              transliteration: "Zǐ yuē: Xué ér bù sī zé wǎng, sī ér bù xué zé dài."
            },
            {
              number: 3,
              text: "Zigong asked: 'Is there one single word that can guide one's entire life?' The Master said: 'Is not Reciprocity (Shu) such a word? What you do not want done to yourself, do not do to others.'",
              original: "子貢問曰：「有一言而可以終身行之者乎？」子曰：「其恕乎！己所不欲，勿施於人。」",
              transliteration: "Zǐgòng wèn yuē... Zǐ yuē: Qí shù hū! Jǐ suǒ bù yù, wù shī yú rén."
            }
          ]
        }
      ]
    }
  ]
};

// -------------------------------------------------------------
// 7. SIKHISM: Sri Guru Granth Sahib (Japji Sahib)
// -------------------------------------------------------------
const granthData = {
  id: "granth",
  name: "Sri Guru Granth Sahib",
  religion: "Sikhism",
  translation: "Japji Sahib & Sacred Hymns — Sant Singh Khalsa",
  unitLabel: "Pauri",
  sections: [
    {
      id: "japji-sahib",
      name: "Japji Sahib (Guru Nanak Dev Ji)",
      chapters: [
        {
          number: 1,
          name: "Mool Mantar & Pauris 1–5",
          subtitle: "The primal revelation of the One Supreme Reality",
          verses: [
            {
              number: 1,
              text: "One Universal Creator God, Truth by Name, Creative Being Personified, No Fear, No Hatred, Image of the Undying, Beyond Birth, Self-Existent, By the Guru’s Grace.",
              original: "ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥",
              transliteration: "Ik Oankar Sat Naam Kartaa Purakh Nirbhau Nirvair Akaal Moorat Ajoonee Saibhang Gur Prasaad."
            },
            {
              number: 2,
              text: "True in the primal beginning, True throughout the ages, True here and now, O Nanak, forever and ever True.",
              original: "॥ ਜਪੁ ॥ ਆਦਿ ਸਚੁ ਜੁਗਾਦਿ ਸਚੁ ॥ ਹੈ ਭੀ ਸਚੁ ਨਾਨਕ ਹੋਸੀ ਭੀ ਸਚੁ ॥",
              transliteration: "Aad Sach Jugaad Sach. Hai Bhee Sach Naanak Hosee Bhee Sach."
            },
            {
              number: 3,
              text: "By thinking, He cannot be reduced to thought, even by thinking hundreds of thousands of times. By remaining silent, inner silence is not obtained, even by remaining lovingly absorbed deep within.",
              original: "ਸੋਚੈ ਸੋਚਿ ਨ ਹੋਵਈ ਜੇ ਸੋਚੀ ਲਖ ਵਾਰ ॥ ਚੁਪੈ ਚੁਪ ਨ ਹੋਵਈ ਜੇ ਲਾਇ ਰਹਾ ਲਿਵ ਤਾਰ ॥",
              transliteration: "Sochai soch na hova-ee jay sochee lakh vaar..."
            },
            {
              number: 4,
              text: "How then shall we become truthful? How can the veil of illusion be torn away? O Nanak, it is written that you shall obey the Hukam, His Command, and walk in the Way of His Will.",
              original: "ਕਿਵ ਸਚਿਆਰਾ ਹੋਈਐ ਕਿਵ ਕੂੜੈ ਤੁਟੈ ਪਾਲਿ ॥ ਹੁਕਮਿ ਰਜਾਈ ਚਲਣਾ ਨਾਨਕ ਲਿਖਿਆ ਨਾਲਿ ॥",
              transliteration: "Kiv sachiaaraa ho-ee-ai kiv koorai tutai paal? Hukam rajaa-ee chalnaa naanak likhi-aa naal."
            }
          ]
        },
        {
          number: 2,
          name: "Salok & Closing Benediction",
          subtitle: "Air is the Guru, Water the Father, Earth the Mother",
          verses: [
            {
              number: 1,
              text: "Air is the Guru, Water is the Father, and Earth is the Great Mother of all. Day and night are the two nurses in whose lap the whole world plays.",
              original: "ਪਵਣੁ ਗੁਰੂ ਪਾਣੀ ਪਿਤਾ ਮਾਤਾ ਧਰਤਿ ਮਹਤੁ ॥ ਦਿਵਸੁ ਰਾਤਿ ਦੁਇ ਦਾਈ ਦਾਇਆ ਖੇਲੈ ਸਗਲ ਜਗਤੁ ॥",
              transliteration: "Pavan guroo paanee pitaa maataa dharat mahat..."
            },
            {
              number: 2,
              text: "Those who have meditated on the Naam and departed after working with the sweat of their brow — their faces are radiant, O Nanak, and many are liberated along with them!",
              original: "ਜਿਨੀ ਨਾਮੁ ਧਿਆਇਆ ਗਏ ਮਸਕਤਿ ਘਾਲਿ ॥ ਨਾਨਕ ਤੇ ਮੁਖ ਉਜਲੇ ਕੇਤੀ ਛੁਟੀ ਨਾਲਿ ॥",
              transliteration: "Jinee naam dhi-aa-i-aa ga-ay masakat ghaal..."
            }
          ]
        }
      ]
    }
  ]
};

// -------------------------------------------------------------
// 8. JAINISM: The Agamas & Tattvartha Sutra
// -------------------------------------------------------------
const jainData = {
  id: "jain-agamas",
  name: "The Jain Agamas & Tattvartha Sutra",
  religion: "Jainism",
  translation: "Acharya Umasvati — Nathmal Tatia & Sacred Texts Heritage",
  unitLabel: "Chapter",
  sections: [
    {
      id: "jain-core",
      name: "Tattvartha Sutra & Acaranga Sutra",
      chapters: [
        {
          number: 1,
          name: "The Three Jewels of Liberation (Ratnatraya)",
          subtitle: "Right faith, right knowledge, and right conduct",
          verses: [
            {
              number: 1,
              text: "Right faith (Samyak Darshana), right knowledge (Samyak Jnana), and right conduct (Samyak Charitra) together constitute the path to liberation.",
              original: "सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः ॥",
              transliteration: "Samyag-darśana-jñāna-cāritrāṇi mokṣa-mārgaḥ."
            },
            {
              number: 2,
              text: "Non-violence is the supreme religion (Ahimsa Paramo Dharmah). All living beings desire to live; no one wishes to be harmed or killed.",
              original: "अहिंसा परमो धर्मः । सर्वे जीवाः सुखमेधन्ते न कश्चिन्मरणं प्रियम् ॥",
              transliteration: "Ahiṁsā paramo dharmaḥ. Sarve jīvāḥ sukhamedhante..."
            },
            {
              number: 3,
              text: "Souls render service to one another (Parasparopagraho Jivanam). Life is interdependent.",
              original: "परस्परोपग्रहो जीवानाम् ॥",
              transliteration: "Parasparopagraho jīvānām."
            }
          ]
        }
      ]
    }
  ]
};

// -------------------------------------------------------------
// 9. SHINTOISM: The Kojiki & Sacred Norito
// -------------------------------------------------------------
const shintoData = {
  id: "kojiki",
  name: "The Kojiki & Sacred Norito",
  religion: "Shintoism",
  translation: "Chamberlain & Aston Classical Translation",
  unitLabel: "Section",
  sections: [
    {
      id: "kojiki-core",
      name: "Records of Ancient Matters & Divine Liturgies",
      chapters: [
        {
          number: 1,
          name: "The Age of the Gods (Kamiyo)",
          subtitle: "The harmony of heaven, earth, and kami",
          verses: [
            {
              number: 1,
              text: "The names of the Deities that were born in the Plain of High Heaven when the Heaven and Earth began were: the Deity Master-of-the-August-Center-of-Heaven, next the High-August-Producing-Wondrous Deity, next the Divine-Producing-Wondrous Deity.",
              original: "天地初發之時、於高天原成神名、天之御中主神、次高御產巢日神、次神產巢日神。",
              transliteration: "Ame-tsuchi no hajime no toki, Takama-no-hara ni nareru kami no na..."
            },
            {
              number: 2,
              text: "Live with a heart as bright and upright as the sun (Akaki kiyoki kokoro). Cultivate gratitude towards all beings and revere the divine spirit in nature.",
              original: "明き清き心をもて、天地の神々に仕え奉るべし。",
              transliteration: "Akaki kiyoki kokoro o mote, ame-tsuchi no kamigami ni..."
            }
          ]
        }
      ]
    }
  ]
};

// -------------------------------------------------------------
// 10. ZOROASTRIANISM: The Avesta (The Gathas of Zarathustra)
// -------------------------------------------------------------
const avestaData = {
  id: "avesta",
  name: "The Avesta & The Gathas",
  religion: "Zoroastrianism",
  translation: "The Gathas of Zarathustra — L.H. Mills & D.J. Irani",
  unitLabel: "Yasna",
  sections: [
    {
      id: "gathas-core",
      name: "The Sacred Gathas of Zarathustra",
      chapters: [
        {
          number: 1,
          name: "Ahunavaiti Gatha (Good Thoughts, Good Words, Good Deeds)",
          subtitle: "Humata, Hukhta, Hvarshta — The Triple Path of Asha",
          verses: [
            {
              number: 1,
              text: "With hands outstretched in reverent prayer, I first beseech Thee, O Mazda, Most Benevolent Spirit, for the grace of Righteousness (Asha) in all deeds, and the wisdom of the Good Mind (Vohu Manah).",
              original: "ahiyâ yâsâ nemanghâ ustânazastô rafedhrayâ manyêush mazdâ pourvîm...",
              transliteration: "Ahiyâ yâsâ nemanghâ ustânazastô rafedhrayâ..."
            },
            {
              number: 2,
              text: "Righteousness (Asha) is the highest good; it is illumination and bliss. Bliss comes to him who is righteous for the sake of the highest Righteousness alone.",
              original: "Ašem Vohû vahištem astî, uštâ astî, uštâ ahmâi hyat ašâi vahištâi ašem.",
              transliteration: "Ashem Vohu vahishtem asti, ushta asti, ushta ahmai..."
            },
            {
              number: 3,
              text: "Humata, Hukhta, Hvarshta: Good Thoughts, Good Words, Good Deeds. Strive always to promote life, foster truth, and heal the world.",
              original: "humata hukhta hvarshta...",
              transliteration: "Humata, Hukhta, Hvarshta."
            }
          ]
        }
      ]
    }
  ]
};

// -------------------------------------------------------------
// 11. BAHÁʼÍ FAITH: The Hidden Words & Kitáb-i-Aqdas
// -------------------------------------------------------------
const bahaiData = {
  id: "bahai",
  name: "The Hidden Words",
  religion: "Baháʼí Faith",
  translation: "Bahá'u'lláh — Shoghi Effendi Authorized Translation",
  unitLabel: "Part",
  sections: [
    {
      id: "hidden-words",
      name: "The Hidden Words of Bahá'u'lláh",
      chapters: [
        {
          number: 1,
          name: "From the Arabic",
          subtitle: "Meditations on the soul, love, and detachment",
          verses: [
            {
              number: 1,
              text: "O Son of Spirit! My first counsel is this: Possess a pure, kindly and radiant heart, that thine may be a sovereignty ancient, imperishable and everlasting.",
              original: "يا ابن الروح! في أوّل القول أملك قلباً جيّداً حسناً منيراً لتملك ملكاً دائماً باقياً أزلاً قديماً.",
              transliteration: "Yā Ibna'r-Rūḥ! Fī awwali'l-qawli'mlik qalban jayyidan..."
            },
            {
              number: 2,
              text: "O Son of Spirit! The best beloved of all things in My sight is Justice; turn not away therefrom if thou desirest Me, and neglect it not that I may confide in thee.",
              original: "يا ابن الروح! أحبّ الأشياء عندي الإنصاف لا ترغب عنه إن تكن إليّ راغباً.",
              transliteration: "Yā Ibna'r-Rūḥ! Aḥabbu'l-ashyā'i 'indī'l-Inṣāf..."
            },
            {
              number: 3,
              text: "O Son of Man! Breathe not the sins of others so long as thou art thyself a sinner. Shouldst thou transgress this command, accursed wouldst thou be, and to this I bear witness.",
              original: "يا ابن الإنسان! لا تنفس خطيئة أحد ما دمت خاطئاً.",
              transliteration: "Yā Ibna'l-Insān! Lā tanaffas khaṭī'ata aḥadin..."
            }
          ]
        },
        {
          number: 2,
          name: "From the Persian",
          subtitle: "On humility, service to humanity, and inner illumination",
          verses: [
            {
              number: 1,
              text: "O Son of Being! How couldst thou forget thine own faults and busy thyself with the faults of others? Whoso doeth this is accursed of Me.",
              original: "ای پسر وجود! چگونه خطای خود را فراموش کردی و بخطای دیگران پرداختی؟",
              transliteration: "Ey Pesare Vojud!..."
            },
            {
              number: 2,
              text: "O Friend! In the garden of thy heart plant naught but the rose of love, and from the nightingale of affection and desire loosen not thy hold.",
              original: "ای دوست! در روضه دل جز گل عشق مکار و از ذیل بلبل حبّ و شوق دست مدار.",
              transliteration: "Ey Doost! Dar rowzeye del..."
            }
          ]
        }
      ]
    }
  ]
};

// -------------------------------------------------------------
// WRITE BOOK FILES
// -------------------------------------------------------------
const books = [
  dhammapadaData,
  taotechingData,
  tanakhData,
  upanishadsData,
  vedasData,
  analectsData,
  granthData,
  jainData,
  shintoData,
  avestaData,
  bahaiData,
];

ensureDir("./src/data/books");
for (const b of books) {
  fs.writeFileSync(`./src/data/books/${b.id}.json`, JSON.stringify(b, null, 2));
  console.log(`Created book dataset: src/data/books/${b.id}.json`);
}

// -------------------------------------------------------------
// GENERATE PLANS FOR ALL NEW BOOKS
// -------------------------------------------------------------
function makeBookPlans(book) {
  const allVerses = [];
  book.sections.forEach((s) => {
    s.chapters.forEach((c) => {
      c.verses.forEach((v) => {
        allVerses.push({
          section: s.id,
          chapter: c.number,
          verse: v.number,
          totalChV: c.verses.length,
        });
      });
    });
  });

  const allChapters = [];
  book.sections.forEach((s) => {
    s.chapters.forEach((c) => {
      allChapters.push({
        section: s.id,
        chapter: c.number,
        from: 1,
        to: c.verses.length,
        full: true,
      });
    });
  });

  const dir = `./src/data/plans/${book.id}`;
  ensureDir(dir);

  // 1. Chapter-by-chapter / 7-Day or 14-Day Plan
  const daysCount = Math.max(7, allChapters.length);
  const plan7Days = [];
  for (let d = 1; d <= daysCount; d++) {
    const chIndex = (d - 1) % allChapters.length;
    plan7Days.push({
      day: d,
      read: [allChapters[chIndex]],
    });
  }

  const p1 = {
    id: "7-day",
    book: book.id,
    name: "7-Day Foundation",
    totalDays: 7,
    days: plan7Days.slice(0, 7),
  };
  fs.writeFileSync(`${dir}/7-day.json`, JSON.stringify(p1, null, 2));

  // 2. 21-Day Steady Journey
  const plan21Days = [];
  for (let d = 1; d <= 21; d++) {
    const chIndex = (d - 1) % allChapters.length;
    plan21Days.push({
      day: d,
      read: [allChapters[chIndex]],
    });
  }
  const p2 = {
    id: "21-day",
    book: book.id,
    name: "21-Day Habit",
    totalDays: 21,
    days: plan21Days,
  };
  fs.writeFileSync(`${dir}/21-day.json`, JSON.stringify(p2, null, 2));

  // 3. 30-Day Complete Reflection
  const plan30Days = [];
  for (let d = 1; d <= 30; d++) {
    const chIndex = (d - 1) % allChapters.length;
    plan30Days.push({
      day: d,
      read: [allChapters[chIndex]],
    });
  }
  const p3 = {
    id: "30-day",
    book: book.id,
    name: "30-Day Master",
    totalDays: 30,
    days: plan30Days,
  };
  fs.writeFileSync(`${dir}/30-day.json`, JSON.stringify(p3, null, 2));

  console.log(`Generated plans for ${book.id}`);
}

for (const b of books) {
  makeBookPlans(b);
}

// -------------------------------------------------------------
// GENERATE QUOTE ARCHIVES FOR ALL NEW BOOKS
// -------------------------------------------------------------
function makeQuotesForBook(book) {
  const quotes = [];
  let count = 1;
  book.sections.forEach((s) => {
    s.chapters.forEach((c) => {
      c.verses.forEach((v) => {
        quotes.push({
          id: `${book.id}-${String(count).padStart(3, "0")}`,
          book: book.id,
          tradition: book.religion,
          text: v.text,
          original: v.original,
          reference: `${book.name} — ${c.name || `${book.unitLabel} ${c.number}`}:${v.number}`,
        });
        count++;
      });
    });
  });

  ensureDir("./src/data/quotes");
  fs.writeFileSync(`./src/data/quotes/${book.id}.json`, JSON.stringify(quotes, null, 2));
  console.log(`Created quotes for ${book.id} (${quotes.length} quotes)`);
}

for (const b of books) {
  makeQuotesForBook(b);
}

console.log("All new sacred books, plans, and quotes generated successfully!");
