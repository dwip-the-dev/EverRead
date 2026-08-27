# Daily Scripture Path

Yooo, that actually has a really clean product loop. Basically a religious reading app with the simplicity of Duolingo: pick your scripture → daily reading → track progress → come back tomorrow.



I’d structure it like this:



🏠 1. First launch — choose your book



Big visual cards:



📖 Bible — Christianity



☪️ Quran — Islam



🕉️ Bhagavad Gita — Hinduism



☸️ Dhammapada — Buddhism



✡️ Torah — Judaism



etc.





Each card:



Book cover/image



Book name



Religion/tradition



Maybe number of chapters





Once selected:



localStorage.setItem("selectedBook", "bible")



Then you never show onboarding again unless they choose Change Book in settings.



📚 2. Home screen



Something like:



> Good morning 👋

Your reading for today







Then:



Day 17



Genesis 17



> Today's passage

Genesis 17:1–14







[ Start Reading → ]



And underneath:



Your progress



████████░░ 78%



17 / 50 chapters





---



📖 3. Reading system



Don't necessarily make one chapter = one day.



Instead, your data could define reading plans:



{

  book: "bible",

  plan: "90-day",

  days: [

    {

      day: 1,

      readings: [

        { chapter: 1, verses: "1-31" },

        { chapter: 2, verses: "1-25" }

      ]

    }

  ]

}



That gives you WAY more flexibility later.



You could have:



⚡ 30-day plan



📖 90-day plan



🌱 180-day plan



🐢 1-year plan



Custom reading





And the user's progress remains local.





---



🌅 4. Daily quote



This could be one of the coolest parts.



Every day:



> Today's Reflection







Then a quote associated with the selected religion/book.



Important distinction: store the actual quote text in your dataset, rather than generating it dynamically with AI. That prevents weird/misquoted religious text.



Your data could look like:



{

  id: "bible-001",

  tradition: "Christianity",

  text: "...",

  reference: "John 3:16"

}



Then:



const quote = quotes[dayOfYear % quotes.length]



So it works completely offline and requires zero API calls.





---



💾 5. LocalStorage architecture



You could keep the whole MVP ridiculously simple:



{

  selectedBook: "bible",

  readingPlan: "90-day",



  progress: {

    completedDays: [1, 2, 3, 4],

    currentDay: 5

  },



  settings: {

    dailyReminder: true,

    fontSize: "medium"

  },



  streak: {

    current: 4,

    longest: 12,

    lastRead: "2026-08-27"

  }

}



One important thing: don't only store currentDay.



Store completed reading IDs/days too. That way if someone goes back and rereads something, skips ahead, or changes plans, you aren't fighting your own data model later.





---



🔥 6. The app could have 4 main tabs



Today

Today's reading + quote + continue button.



Book

All chapters with progress:



Genesis

────────────────

✓ Chapter 1

✓ Chapter 2

✓ Chapter 3

→ Chapter 4

○ Chapter 5

○ Chapter 6

...



Quotes

Previous daily quotes / saved favorites.



Profile

Reading statistics, streak, selected book, reading plan, settings.





---



🧠 One feature I'd DEFINITELY add



A "Continue where I left off" system.



Imagine the user closes the app halfway through Chapter 4.



Next time:



> Welcome back



Continue Genesis 4

63% complete



Continue reading →







That makes it feel like an actual app rather than a static scripture website.





---



🛠️ And technically...



For your current idea, you don't need a backend at all.



I'd make the architecture:



src/

├── data/

│   ├── books/

│   │   ├── bible.js

│   │   ├── quran.js

│   │   ├── gita.js

│   │   └── ...

│   │

│   ├── quotes/

│   │   ├── christianity.js

│   │   ├── islam.js

│   │   └── ...

│

├── components/

│   ├── BookCard

│   ├── ReadingCard

│   ├── ChapterList

│   ├── ProgressBar

│   └── QuoteCard

│

├── pages/

│   ├── Onboarding

│   ├── Home

│   ├── Book

│   ├── Quotes

│   └── Settings

│

├── lib/

│   ├── storage.js

│   ├── progress.js

│   └── dates.js

│

└── App.jsx



Then later, when you inevitably go "fuck it, I'm adding a backend" 😂, you can move the books/quotes/reading plans to an API without rewriting the entire frontend.



And honestly, I'd keep the religion selection neutral and respectful. Don't make it feel like the app is trying to tell someone which religion is "correct"; it's a reading/tracking tool, and the user chooses what they want to study.



This could actually look really polished with a calm editorial UI—large scripture typography, subtle book artwork, progress rings, daily card, etc. Not another generic Bootstrap religious website lol. Yeah — if you want this to be actually offline and bundled into the webapp, I’d collect the texts first, normalize them into one schema, and then build your reading-plan logic on top.



The key is copyright/licensing. Don't just scrape random scripture websites and bundle their translations. Use public-domain texts or datasets whose license explicitly permits redistribution.



📖 Bible



For English, World English Bible (WEB) is probably the easiest starting point. It is explicitly public domain. 



There are also machine-readable JSON datasets already structured by book/chapter/verse. For example, bible-data provides public-domain Bible versions in JSON/SQLite, including individual book JSON files. 



You'd want to transform it into roughly:



{

  id: "bible",

  name: "Bible",

  religion: "Christianity",

  chapters: [

    {

      id: 1,

      book: "Genesis",

      chapter: 1,

      verses: [

        {

          number: 1,

          text: "..."

        },

        {

          number: 2,

          text: "..."

        }

      ]

    }

  ]

}



But I'd actually go one level deeper:



Bible

 ├── Genesis

 │    ├── Chapter 1

 │    │    ├── Verse 1

 │    │    ├── Verse 2

 │    │    └── ...

 │    ├── Chapter 2

 │    └── ...

 ├── Exodus

 └── ...



That makes navigation/progress stupidly easy.





---



☪️ Quran



There are several machine-readable datasets.



quran-json already provides chapter-by-chapter JSON containing Quran text, transliteration and translations. 



There's also Quran-API, which provides Arabic plus English and several other translations and can be self-hosted. 



For your no-backend MVP, I'd download the dataset during development and commit the required JSON into your project rather than having the browser depend on an external API.



Structure:



{

  id: "quran",

  name: "Quran",

  religion: "Islam",

  chapters: [

    {

      id: 1,

      name: "Al-Fatihah",

      verses: [

        {

          number: 1,

          text: "..."

        }

      ]

    }

  ]

}



The Quran Foundation API is excellent if you eventually add your backend, but its current content API requires credentials, so it isn't what I'd build the initial frontend-only version around. 





---



🕉️ Bhagavad Gita



This one is particularly nice for your project.



There are datasets containing all 18 chapters and the verses in JSON. One public-domain dataset uses a 1935 Purohit Swami English translation and includes Sanskrit + transliteration + English. 



Another source documents the gita/gita repository as public domain and containing 701 verses across 18 chapters. 



So yours could become:



{

  id: "bhagavad-gita",

  name: "Bhagavad Gita",

  religion: "Hinduism",



  chapters: [

    {

      id: 1,

      name: "Arjuna Vishada Yoga",

      verses: [

        {

          number: 1,

          sanskrit: "...",

          transliteration: "...",

          translation: "..."

        }

      ]

    }

  ]

}



That extra Sanskrit/transliteration data would make your reader way cooler than just displaying English.





---



🔥 But here's how I'd structure YOUR actual data



Don't make your data itself contain the reading schedule.



Separate content from reading plans.



books/bible.json



{

  "id": "bible",

  "name": "Bible",

  "religion": "Christianity",

  "cover": "/books/bible.webp",

  "sections": [

    {

      "id": "genesis",

      "name": "Genesis",

      "chapters": [

        {

          "number": 1,

          "verses": [

            {

              "number": 1,

              "text": "..."

            }

          ]

        }

      ]

    }

  ]

}



books/quran.json



{

  "id": "quran",

  "name": "Quran",

  "religion": "Islam",

  "cover": "/books/quran.webp",

  "sections": [

    {

      "id": "al-fatihah",

      "name": "Al-Fatihah",

      "chapters": [

        {

          "number": 1,

          "verses": []

        }

      ]

    }

  ]

}



For Quran I'd probably call the top-level things surahs, not sections/chapters, because that's the terminology users expect.



books/gita.json



{

  "id": "gita",

  "name": "Bhagavad Gita",

  "religion": "Hinduism",

  "cover": "/books/gita.webp",

  "chapters": [

    {

      "number": 1,

      "name": "Arjuna Vishada Yoga",

      "verses": []

    }

  ]

}





---



📅 Then separately:



data/

├── books/

│   ├── bible.json

│   ├── quran.json

│   └── gita.json

│

├── plans/

│   ├── bible/

│   │   ├── 90-day.json

│   │   └── 365-day.json

│   │

│   ├── quran/

│   │   ├── 30-day.json

│   │   └── 60-day.json

│   │

│   └── gita/

│       └── 18-day.json

│

└── quotes/

    ├── christianity.json

    ├── islam.json

    └── hinduism.json



A plan could simply be:



{

  "book": "gita",

  "plan": "18-day",

  "days": [

    {

      "day": 1,

      "read": [

        {

          "chapter": 1,

          "verses": "1-47"

        }

      ]

    },

    {

      "day": 2,

      "read": [

        {

          "chapter": 2,

          "verses": "1-72"

        }

      ]

    }

  ]

}



And this is the important bit: you can make the plan reference content instead of duplicating the actual scripture.



So your app basically does:



User selects Gita

        ↓

Load gita.json

        ↓

Load gita/18-day.json

        ↓

Today = Day 7

        ↓

Plan says Chapter 7

        ↓

Find Chapter 7 in gita.json

        ↓

Render it

        ↓

User finishes

        ↓

localStorage → Day 7 completed



That architecture is clean as hell.



One more thing



For the first version, I'd not try to add 20 religions/books at once.



I'd build the entire engine around 3 books:



Bible + Quran + Bhagavad Gita



Once those three work, adding another book becomes basically:



get text

→ normalize JSON

→ add metadata

→ add cover

→ add reading plan

→ done



That's the point where your app becomes a generic scripture-reader engine, rather than an app hardcoded around three books. 🚀

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c55433e6-6985-448e-bcc3-1c8716bbb03d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
