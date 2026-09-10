// Site-wide strings + the language switcher. Per-app copy (hero, features,
// screenshot captions, plan names) lives in js/strings-<app>.js, which sets
// window.APP_STRINGS before this file runs; setLang merges it over the common
// set below, so an app file only has to carry what differs.
//
// Language keys: en, ru, and one key per local language — 'sr-latn' /
// 'sr-cyrl' (Serbian), 'cnr' (Montenegrin), 'hr' (Croatian). Each page offers
// its own subset through its .lang-btn buttons (the Serbian page EN/RU/SR/СР,
// the Montenegrin page EN/RU/MNE, …); a stored or linked choice the page does
// not offer falls back to the page's own local language (see initI18n), so
// moving between the app pages keeps "local language" selected.
const LOCAL_LANGS = ['sr-latn', 'sr-cyrl', 'cnr', 'hr'];

const translations = {
  en: {
    lang: 'en',

    // App selector (header)
    app_srb: 'Serbian',
    app_mne: 'Montenegrin',
    app_hrv: 'Croatian',
    app_slv: 'Slovenian',
    app_soon: 'soon',

    // Pricing
    pricing_heading: 'Pricing',
    pricing_intro: 'Everything is unlocked for your first 14 days. After that, search, meanings and examples stay free forever — the grammar tables are part of Govori Plus.',
    pricing_plans_heading: 'Three ways to get Plus',
    plan_lifetime_kind: 'Lifetime',
    plan_lifetime_billing: 'One-time purchase · yours forever',
    plan_lifetime_price: '$14.99',
    plan_lifetime_per: 'once',
    plan_lifetime_badge: 'Best value',
    plan_annual_kind: 'Yearly',
    plan_annual_billing: 'Billed once a year · ≈ $0.83 a month',
    plan_annual_price: '$9.99',
    plan_annual_per: '/ year',
    plan_monthly_kind: 'Monthly',
    plan_monthly_billing: 'Cancel anytime',
    plan_monthly_price: '$1.99',
    plan_monthly_per: '/ month',
    pricing_note: 'Prices in US dollars; the App Store and Google Play show them in your local currency. Purchases are made inside the app.',
    pricing_table_heading: 'What you get',
    pricing_col_free: 'Free',
    pricing_col_plus: 'Plus',
    pricing_trial_chip: 'first 14 days',
    pf_search: 'Search by any word form — Latin or Cyrillic, with or without diacritics',
    pf_meanings: 'English and Russian meanings',
    pf_examples: 'Usage examples with translations',
    pf_audio: 'Audio pronunciation for the 2,500 core words',
    pf_labels: 'Accent, gender, aspect, register and regional labels',
    pf_scripts: 'Latin ⇄ Cyrillic — the whole app switches',
    pf_favorites: 'Favorites, recent lookups, export as image or text',
    pf_offline: 'Fully offline, no ads, no account',
    pf_declension: 'Noun and adjective declension tables',
    pf_conjugation: 'Verb conjugation tables — every tense',
    pf_other: 'Pronoun, numeral and all other inflection tables',
    pf_new: 'New features as they ship',

    // Footer
    footer_faq: 'FAQ',
    footer_faq_href: 'faq.html',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Use',
    footer_contact: 'Contact',
    footer_made: 'Made in Belgrade',
    footer_built: 'Built for iOS 16+ and Android 8+',

    // Privacy page
    priv_title: 'Privacy Policy',
    priv_updated: 'Last updated: August 17, 2026',
    priv_collect_h: 'What we collect',
    priv_collect_site: 'This website collects nothing. There is no sign-up form, no account, and no mailing list.',
    priv_collect_app: 'The Govori app requires no account and works fully offline. To improve stability and usability, it collects anonymous crash reports and performance diagnostics (Firebase Crashlytics) and anonymous usage statistics (Firebase Analytics): which features are used, and which words are searched for — including searches that return nothing, which is how the list of missing words is built. These are tied to a random installation identifier, never to an account or to your name, and are read as aggregate trends. If you submit in-app feedback, your report and the app version are stored along with that same random identifier. None of this data is linked to your identity or used for advertising; it is used solely to fix bugs and improve the app.',
    priv_teacher_p: 'If you contact us through the in-app "I\'m a teacher" form, the details you provide (name, email, institution, class size, message) are voluntary and are used only to respond to your inquiry.',
    priv_use_h: 'How we use it',
    priv_use_p: 'Diagnostics and usage statistics are used to fix crashes and decide what to improve next. Feedback you send from inside the app is used to correct dictionary entries and to reply to you if you asked something. That’s it — nothing is used for advertising, and nothing is sold.',
    priv_access_h: 'Who has access',
    priv_access_p: 'Only the developer (that’s me) and Google’s Firebase services, which receive crash reports, anonymous usage statistics and in-app feedback on my behalf. Nothing is sold, shared for advertising, or used to build a profile of you.',
    priv_retention_h: 'Retention',
    priv_retention_p: 'Diagnostics and feedback are kept only as long as they are useful for fixing the app. To have anything you sent deleted, email <a href="mailto:support@govoridictionaries.com">support@govoridictionaries.com</a>.',
    priv_cookies_h: 'Cookies & tracking',
    priv_cookies_p: 'This website uses no cookies, no analytics, and no tracking scripts.',
    priv_contact_h: 'Contact',
    priv_contact_p: 'Questions? Email <a href="mailto:support@govoridictionaries.com">support@govoridictionaries.com</a>.',
    priv_back: '← Back to home',
  },

  ru: {
    lang: 'ru',

    app_srb: 'Сербский',
    app_mne: 'Черногорский',
    app_hrv: 'Хорватский',
    app_slv: 'Словенский',
    app_soon: 'скоро',

    pricing_heading: 'Цены',
    pricing_intro: 'Первые 14 дней открыто всё. Потом поиск, значения и примеры остаются бесплатными навсегда, а грамматические таблицы входят в Govori Plus.',
    pricing_plans_heading: 'Три способа получить Plus',
    plan_lifetime_kind: 'Навсегда',
    plan_lifetime_billing: 'Разовая покупка · навсегда ваша',
    plan_lifetime_price: '$14.99',
    plan_lifetime_per: 'один раз',
    plan_lifetime_badge: 'Выгодно',
    plan_annual_kind: 'На год',
    plan_annual_billing: 'Оплата раз в год · ≈ $0.83 в месяц',
    plan_annual_price: '$9.99',
    plan_annual_per: '/ год',
    plan_monthly_kind: 'На месяц',
    plan_monthly_billing: 'Отмена в любой момент',
    plan_monthly_price: '$1.99',
    plan_monthly_per: '/ мес',
    pricing_note: 'Цены в долларах США; App Store и Google Play показывают их в вашей валюте. Покупка совершается внутри приложения.',
    pricing_table_heading: 'Что входит',
    pricing_col_free: 'Бесплатно',
    pricing_col_plus: 'Plus',
    pricing_trial_chip: 'первые 14 дней',
    pf_search: 'Поиск по любой форме слова — латиницей или кириллицей, с диакритикой и без',
    pf_meanings: 'Значения на русском и английском',
    pf_examples: 'Примеры употребления с переводом',
    pf_audio: 'Озвучка 2 500 самых нужных слов',
    pf_labels: 'Ударение, род, вид, регистр и региональные пометы',
    pf_scripts: 'Латиница ⇄ кириллица — переключается всё приложение',
    pf_favorites: 'Избранное, история поиска, экспорт картинкой или текстом',
    pf_offline: 'Полностью офлайн, без рекламы и без аккаунта',
    pf_declension: 'Таблицы склонения существительных и прилагательных',
    pf_conjugation: 'Таблицы спряжения глаголов — все времена',
    pf_other: 'Местоимения, числительные и все остальные таблицы форм',
    pf_new: 'Новые функции по мере выхода',

    footer_faq: 'Вопросы и ответы',
    footer_faq_href: 'faq-ru.html',
    footer_privacy: 'Политика конфиденциальности',
    footer_terms: 'Условия использования',
    footer_contact: 'Контакты',
    footer_made: 'Сделано в Белграде',
    footer_built: 'Для iOS 16+ и Android 8+',

    priv_title: 'Политика конфиденциальности',
    priv_updated: 'Последнее обновление: 17 августа 2026',
    priv_collect_h: 'Что мы собираем',
    priv_collect_site: 'Этот сайт не собирает ничего: ни формы регистрации, ни аккаунтов, ни рассылки.',
    priv_collect_app: 'Приложение Govori не требует аккаунта и работает полностью офлайн. Ради стабильности и удобства оно собирает обезличенные отчёты о сбоях и диагностику производительности (Firebase Crashlytics), а также обезличенную статистику использования (Firebase Analytics): какими функциями пользуются и какие слова ищут, включая запросы, по которым ничего не нашлось, — из них и складывается список недостающих слов. Всё это привязано к случайному идентификатору установки, а не к аккаунту и не к вашему имени, и читается как общие тенденции. Если вы отправляете отзыв из приложения, вместе с ним сохраняются версия приложения и тот же случайный идентификатор. Эти данные не связаны с вашей личностью и не используются для рекламы; они нужны исключительно для исправления ошибок и улучшения приложения.',
    priv_teacher_p: 'Если вы обращаетесь к нам через форму «Я преподаватель» в приложении, указанные вами данные (имя, эл. почта, организация, размер группы, сообщение) предоставляются добровольно и используются только для ответа на ваш запрос.',
    priv_use_h: 'Как мы используем данные',
    priv_use_p: 'Диагностика и статистика использования нужны, чтобы чинить сбои и решать, что улучшать дальше. Отзывы, отправленные из приложения, используются для исправления словарных статей и для ответа вам, если вы что-то спросили. И только — ничего не используется для рекламы и ничего не продаётся.',
    priv_access_h: 'Кто имеет доступ',
    priv_access_p: 'Только разработчик (то есть я) и сервисы Firebase от Google, которые по моему поручению принимают отчёты о сбоях, анонимную статистику использования и отзывы из приложения. Ничего не продаётся, не передаётся для рекламы и не используется для составления вашего профиля.',
    priv_retention_h: 'Хранение',
    priv_retention_p: 'Диагностика и отзывы хранятся ровно столько, сколько они полезны для исправления приложения. Чтобы удалить отправленное вами, напишите на <a href="mailto:support@govoridictionaries.com">support@govoridictionaries.com</a>.',
    priv_cookies_h: 'Cookie и слежка',
    priv_cookies_p: 'Этот сайт не использует cookie, аналитику и скрипты отслеживания.',
    priv_contact_h: 'Контакты',
    priv_contact_p: 'Вопросы? Напишите на <a href="mailto:support@govoridictionaries.com">support@govoridictionaries.com</a>.',
    priv_back: '← На главную',
  },

  'sr-latn': {
    lang: 'sr-Latn',

    app_srb: 'Srpski',
    app_mne: 'Crnogorski',
    app_hrv: 'Hrvatski',
    app_slv: 'Slovenački',
    app_soon: 'uskoro',

    pricing_heading: 'Cene',
    pricing_intro: 'Prvih 14 dana sve je otključano. Posle toga pretraga, značenja i primeri ostaju zauvek besplatni, a gramatičke tabele su deo Govori Plus-a.',
    pricing_plans_heading: 'Tri načina da dobijete Plus',
    plan_lifetime_kind: 'Zauvek',
    plan_lifetime_billing: 'Jednokratna kupovina · zauvek vaše',
    plan_lifetime_price: '$14.99',
    plan_lifetime_per: 'jednom',
    plan_lifetime_badge: 'Najisplativije',
    plan_annual_kind: 'Godišnje',
    plan_annual_billing: 'Naplata jednom godišnje · ≈ $0.83 mesečno',
    plan_annual_price: '$9.99',
    plan_annual_per: '/ god.',
    plan_monthly_kind: 'Mesečno',
    plan_monthly_billing: 'Otkažite kad god želite',
    plan_monthly_price: '$1.99',
    plan_monthly_per: '/ mes.',
    pricing_note: 'Cene su u američkim dolarima; App Store i Google Play prikazuju ih u vašoj valuti. Kupovina se obavlja u aplikaciji.',
    pricing_table_heading: 'Šta dobijate',
    pricing_col_free: 'Besplatno',
    pricing_col_plus: 'Plus',
    pricing_trial_chip: 'prvih 14 dana',
    pf_search: 'Pretraga po bilo kom obliku reči — latinicom ili ćirilicom, sa dijakriticima ili bez',
    pf_meanings: 'Značenja na engleskom i ruskom',
    pf_examples: 'Primeri upotrebe s prevodom',
    pf_audio: 'Izgovor 2.500 najvažnijih reči',
    pf_labels: 'Akcenat, rod, vid, registar i regionalne oznake',
    pf_scripts: 'Latinica ⇄ ćirilica — prebacuje se cela aplikacija',
    pf_favorites: 'Omiljene reči, istorija pretrage, izvoz kao slika ili tekst',
    pf_offline: 'Potpuno oflajn, bez reklama i bez naloga',
    pf_declension: 'Tabele deklinacije imenica i prideva',
    pf_conjugation: 'Tabele konjugacije glagola — sva vremena',
    pf_other: 'Zamenice, brojevi i sve ostale tabele oblika',
    pf_new: 'Nove funkcije čim izađu',

    footer_faq: 'Česta pitanja',
    footer_faq_href: 'faq.html',
    footer_privacy: 'Politika privatnosti',
    footer_terms: 'Uslovi korišćenja',
    footer_contact: 'Kontakt',
    footer_made: 'Napravljeno u Beogradu',
    footer_built: 'Za iOS 16+ i Android 8+',

    priv_title: 'Politika privatnosti',
    priv_updated: 'Poslednje ažuriranje: 17. avgust 2026.',
    priv_collect_h: 'Šta prikupljamo',
    priv_collect_site: 'Ovaj sajt ne prikuplja ništa. Nema forme za prijavu, naloga ni mejling liste.',
    priv_collect_app: 'Aplikacija Govori ne zahteva nalog i radi potpuno oflajn. Radi poboljšanja stabilnosti i upotrebljivosti, prikuplja anonimne izveštaje o greškama i dijagnostiku performansi (Firebase Crashlytics), kao i anonimnu statistiku korišćenja (Firebase Analytics): koje se funkcije koriste i koje se reči traže — uključujući i pretrage bez rezultata, od kojih nastaje spisak reči koje nedostaju. Sve je vezano za nasumični identifikator instalacije, nikada za nalog niti za vaše ime, i čita se kao zbirni trend. Ako pošaljete povratne informacije iz aplikacije, uz njih se čuvaju verzija aplikacije i taj isti nasumični identifikator. Ovi podaci nisu povezani sa vašim identitetom niti se koriste za oglašavanje; koriste se isključivo za ispravku grešaka i poboljšanje aplikacije.',
    priv_teacher_p: 'Ako nam se obratite putem forme „Ja sam predavač“ u aplikaciji, podaci koje navedete (ime, imejl, institucija, veličina grupe, poruka) daju se dobrovoljno i koriste se isključivo za odgovor na vaš upit.',
    priv_use_h: 'Kako koristimo podatke',
    priv_use_p: 'Dijagnostika i statistika korišćenja služe da se otklone padovi i odluči šta sledeće poboljšati. Povratne informacije poslate iz aplikacije koriste se za ispravku rečničkih odrednica i za odgovor vama, ako ste nešto pitali. To je sve — ništa se ne koristi za oglašavanje i ništa se ne prodaje.',
    priv_access_h: 'Ko ima pristup',
    priv_access_p: 'Samo programer (to sam ja) i Google-ovi Firebase servisi, koji u moje ime primaju izveštaje o greškama, anonimnu statistiku korišćenja i povratne informacije iz aplikacije. Ništa se ne prodaje, ne deli radi oglašavanja niti koristi za pravljenje vašeg profila.',
    priv_retention_h: 'Čuvanje podataka',
    priv_retention_p: 'Dijagnostika i povratne informacije čuvaju se samo dok su korisne za ispravku aplikacije. Da biste obrisali ono što ste poslali, pišite na <a href="mailto:support@govoridictionaries.com">support@govoridictionaries.com</a>.',
    priv_cookies_h: 'Kolačići i praćenje',
    priv_cookies_p: 'Ovaj sajt ne koristi kolačiće, analitiku ni skripte za praćenje.',
    priv_contact_h: 'Kontakt',
    priv_contact_p: 'Pitanja? Pišite na <a href="mailto:support@govoridictionaries.com">support@govoridictionaries.com</a>.',
    priv_back: '← Nazad na početnu',
  },

  'sr-cyrl': {
    lang: 'sr',

    app_srb: 'Српски',
    app_mne: 'Црногорски',
    app_hrv: 'Хрватски',
    app_slv: 'Словеначки',
    app_soon: 'ускоро',

    pricing_heading: 'Цене',
    pricing_intro: 'Првих 14 дана све је откључано. После тога претрага, значења и примери остају заувек бесплатни, а граматичке табеле су део Govori Plus-а.',
    pricing_plans_heading: 'Три начина да добијете Plus',
    plan_lifetime_kind: 'Заувек',
    plan_lifetime_billing: 'Једнократна куповина · заувек ваше',
    plan_lifetime_price: '$14.99',
    plan_lifetime_per: 'једном',
    plan_lifetime_badge: 'Најисплативије',
    plan_annual_kind: 'Годишње',
    plan_annual_billing: 'Наплата једном годишње · ≈ $0.83 месечно',
    plan_annual_price: '$9.99',
    plan_annual_per: '/ год.',
    plan_monthly_kind: 'Месечно',
    plan_monthly_billing: 'Откажите кад год желите',
    plan_monthly_price: '$1.99',
    plan_monthly_per: '/ мес.',
    pricing_note: 'Цене су у америчким доларима; App Store и Google Play приказују их у вашој валути. Куповина се обавља у апликацији.',
    pricing_table_heading: 'Шта добијате',
    pricing_col_free: 'Бесплатно',
    pricing_col_plus: 'Plus',
    pricing_trial_chip: 'првих 14 дана',
    pf_search: 'Претрага по било ком облику речи — латиницом или ћирилицом, са дијакритицима или без',
    pf_meanings: 'Значења на енглеском и руском',
    pf_examples: 'Примери употребе с преводом',
    pf_audio: 'Изговор 2.500 најважнијих речи',
    pf_labels: 'Акценат, род, вид, регистар и регионалне ознаке',
    pf_scripts: 'Латиница ⇄ ћирилица — пребацује се цела апликација',
    pf_favorites: 'Омиљене речи, историја претраге, извоз као слика или текст',
    pf_offline: 'Потпуно офлајн, без реклама и без налога',
    pf_declension: 'Табеле деклинације именица и придева',
    pf_conjugation: 'Табеле коњугације глагола — сва времена',
    pf_other: 'Заменице, бројеви и све остале табеле облика',
    pf_new: 'Нове функције чим изађу',

    footer_faq: 'Честа питања',
    footer_faq_href: 'faq.html',
    footer_privacy: 'Политика приватности',
    footer_terms: 'Услови коришћења',
    footer_contact: 'Контакт',
    footer_made: 'Направљено у Београду',
    footer_built: 'За iOS 16+ и Android 8+',

    priv_title: 'Политика приватности',
    priv_updated: 'Последње ажурирање: 17. август 2026.',
    priv_collect_h: 'Шта прикупљамо',
    priv_collect_site: 'Овај сајт не прикупља ништа. Нема форме за пријаву, налога ни мејлинг листе.',
    priv_collect_app: 'Апликација Говори не захтева налог и ради потпуно офлајн. Ради побољшања стабилности и употребљивости, прикупља анонимне извештаје о грешкама и дијагностику перформанси (Firebase Crashlytics), као и анонимну статистику коришћења (Firebase Analytics): које се функције користе и које се речи траже — укључујући и претраге без резултата, од којих настаје списак речи које недостају. Све је везано за насумични идентификатор инсталације, никада за налог нити за ваше име, и чита се као збирни тренд. Ако пошаљете повратне информације из апликације, уз њих се чувају верзија апликације и тај исти насумични идентификатор. Ови подаци нису повезани са вашим идентитетом нити се користе за оглашавање; користе се искључиво за исправку грешака и побољшање апликације.',
    priv_teacher_p: 'Ако нам се обратите путем форме „Ја сам предавач“ у апликацији, подаци које наведете (име, имејл, институција, величина групе, порука) дају се добровољно и користе се искључиво за одговор на ваш упит.',
    priv_use_h: 'Како користимо податке',
    priv_use_p: 'Дијагностика и статистика коришћења служе да се отклоне падови и одлучи шта следеће побољшати. Повратне информације послате из апликације користе се за исправку речничких одредница и за одговор вама, ако сте нешто питали. То је све — ништа се не користи за оглашавање и ништа се не продаје.',
    priv_access_h: 'Ко има приступ',
    priv_access_p: 'Само програмер (то сам ја) и Google-ови Firebase сервиси, који у моје име примају извештаје о грешкама, анонимну статистику коришћења и повратне информације из апликације. Ништа се не продаје, не дели ради оглашавања нити користи за прављење вашег профила.',
    priv_retention_h: 'Чување података',
    priv_retention_p: 'Дијагностика и повратне информације чувају се само док су корисне за исправку апликације. Да бисте обрисали оно што сте послали, пишите на <a href="mailto:support@govoridictionaries.com">support@govoridictionaries.com</a>.',
    priv_cookies_h: 'Колачићи и праћење',
    priv_cookies_p: 'Овај сајт не користи колачиће, аналитику ни скрипте за праћење.',
    priv_contact_h: 'Контакт',
    priv_contact_p: 'Питања? Пишите на <a href="mailto:support@govoridictionaries.com">support@govoridictionaries.com</a>.',
    priv_back: '← Назад на почетну',
  },

  // Montenegrin (ijekavian; the app pages' local language on /mne/)
  cnr: {
    lang: 'cnr',

    app_srb: 'Srpski',
    app_mne: 'Crnogorski',
    app_hrv: 'Hrvatski',
    app_slv: 'Slovenački',
    app_soon: 'uskoro',

    pricing_heading: 'Cijene',
    pricing_intro: 'Prvih 14 dana sve je otključano. Poslije toga pretraga, značenja i primjeri ostaju zauvijek besplatni, a gramatičke tabele su dio Govori Plus-a.',
    pricing_plans_heading: 'Tri načina da dobijete Plus',
    plan_lifetime_kind: 'Zauvijek',
    plan_lifetime_billing: 'Jednokratna kupovina · zauvijek vaše',
    plan_lifetime_price: '$14.99',
    plan_lifetime_per: 'jednom',
    plan_lifetime_badge: 'Najisplativije',
    plan_annual_kind: 'Godišnje',
    plan_annual_billing: 'Naplata jednom godišnje · ≈ $0.83 mjesečno',
    plan_annual_price: '$9.99',
    plan_annual_per: '/ god.',
    plan_monthly_kind: 'Mjesečno',
    plan_monthly_billing: 'Otkažite kad god želite',
    plan_monthly_price: '$1.99',
    plan_monthly_per: '/ mjes.',
    pricing_note: 'Cijene su u američkim dolarima; App Store i Google Play prikazuju ih u vašoj valuti. Kupovina se obavlja u aplikaciji.',
    pricing_table_heading: 'Šta dobijate',
    pricing_col_free: 'Besplatno',
    pricing_col_plus: 'Plus',
    pricing_trial_chip: 'prvih 14 dana',
    pf_search: 'Pretraga po bilo kom obliku riječi — latinicom ili ćirilicom, sa dijakriticima ili bez',
    pf_meanings: 'Značenja na engleskom i ruskom',
    pf_examples: 'Primjeri upotrebe s prevodom',
    pf_audio: 'Izgovor 2.500 najvažnijih riječi',
    pf_labels: 'Akcenat, rod, vid, registar i regionalne oznake',
    pf_scripts: 'Latinica ⇄ ćirilica — prebacuje se cijela aplikacija',
    pf_favorites: 'Omiljene riječi, istorija pretrage, izvoz kao slika ili tekst',
    pf_offline: 'Potpuno oflajn, bez reklama i bez naloga',
    pf_declension: 'Tabele deklinacije imenica i pridjeva',
    pf_conjugation: 'Tabele konjugacije glagola — sva vremena',
    pf_other: 'Zamjenice, brojevi i sve ostale tabele oblika',
    pf_new: 'Nove funkcije čim izađu',

    footer_faq: 'Česta pitanja',
    footer_faq_href: 'faq.html',
    footer_privacy: 'Politika privatnosti',
    footer_terms: 'Uslovi korišćenja',
    footer_contact: 'Kontakt',
    footer_made: 'Napravljeno u Beogradu',
    footer_built: 'Za iOS 16+ i Android 8+',
  },

  // Croatian (ijekavian; the local language on /hrv/)
  hr: {
    lang: 'hr',

    app_srb: 'Srpski',
    app_mne: 'Crnogorski',
    app_hrv: 'Hrvatski',
    app_slv: 'Slovenski',
    app_soon: 'uskoro',

    pricing_heading: 'Cijene',
    pricing_intro: 'Prvih 14 dana sve je otključano. Nakon toga pretraživanje, značenja i primjeri ostaju zauvijek besplatni, a gramatičke tablice dio su Govori Plusa.',
    pricing_plans_heading: 'Tri načina da dobijete Plus',
    plan_lifetime_kind: 'Zauvijek',
    plan_lifetime_billing: 'Jednokratna kupnja · zauvijek vaše',
    plan_lifetime_price: '$14.99',
    plan_lifetime_per: 'jednom',
    plan_lifetime_badge: 'Najisplativije',
    plan_annual_kind: 'Godišnje',
    plan_annual_billing: 'Naplata jednom godišnje · ≈ $0.83 mjesečno',
    plan_annual_price: '$9.99',
    plan_annual_per: '/ god.',
    plan_monthly_kind: 'Mjesečno',
    plan_monthly_billing: 'Otkažite kad god želite',
    plan_monthly_price: '$1.99',
    plan_monthly_per: '/ mj.',
    pricing_note: 'Cijene su u američkim dolarima; App Store i Google Play prikazuju ih u vašoj valuti. Kupnja se obavlja u aplikaciji.',
    pricing_table_heading: 'Što dobivate',
    pricing_col_free: 'Besplatno',
    pricing_col_plus: 'Plus',
    pricing_trial_chip: 'prvih 14 dana',
    pf_search: 'Pretraživanje po bilo kojem obliku riječi — latinicom ili ćirilicom, s dijakritičkim znakovima ili bez njih',
    pf_meanings: 'Značenja na engleskom i ruskom',
    pf_examples: 'Primjeri uporabe s prijevodom',
    pf_audio: 'Izgovor 2.500 najvažnijih riječi',
    pf_labels: 'Naglasak, rod, vid, registar i regionalne oznake',
    pf_scripts: 'Latinica ⇄ ćirilica — prebacuje se cijela aplikacija',
    pf_favorites: 'Omiljene riječi, povijest pretraživanja, izvoz kao slika ili tekst',
    pf_offline: 'Potpuno offline, bez oglasa i bez računa',
    pf_declension: 'Tablice sklonidbe imenica i pridjeva',
    pf_conjugation: 'Tablice sprezanja glagola — sva vremena',
    pf_other: 'Zamjenice, brojevi i sve ostale tablice oblika',
    pf_new: 'Nove značajke čim izađu',

    footer_faq: 'Česta pitanja',
    footer_faq_href: 'faq.html',
    footer_privacy: 'Pravila privatnosti',
    footer_terms: 'Uvjeti korištenja',
    footer_contact: 'Kontakt',
    footer_made: 'Napravljeno u Beogradu',
    footer_built: 'Za iOS 16+ i Android 8+',
  },
};

const LANG_LABELS = {
  en: 'EN',
  ru: 'RU',
  'sr-latn': 'SR',
  'sr-cyrl': 'СР',
  cnr: 'MNE',
  hr: 'HR',
};

// The site root, relative to the current page — pages in a subdirectory
// (mne/) reach shared assets through it. Set by the page via
// <html data-site-root="../">; defaults to the page's own directory.
function siteRoot() {
  return document.documentElement.getAttribute('data-site-root') || '';
}

function stringsFor(lang) {
  const app = window.APP_STRINGS || {};
  return Object.assign({}, translations[lang], app[lang]);
}

function setLang(lang) {
  if (!translations[lang]) return;
  const t = stringsFor(lang);
  const root = siteRoot();

  // Update all data-i18n text nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] != null) el.textContent = t[key];
  });

  // Update all data-i18n-html nodes (allow HTML content)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] != null) el.innerHTML = t[key];
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] != null) el.placeholder = t[key];
  });

  // Update hrefs (standalone pages that exist per language, e.g. the FAQ);
  // the value is site-root relative.
  document.querySelectorAll('[data-i18n-href]').forEach(el => {
    const key = el.getAttribute('data-i18n-href');
    if (t[key] != null) el.href = root + t[key];
  });

  // Update page title and meta
  document.title = t.title || document.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && t.description) metaDesc.content = t.description;

  // Update html lang
  document.documentElement.lang = t.lang || lang;

  // Mark active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Persist choice
  localStorage.setItem('govori-lang', lang);

  // Swap the store badge artwork to the locale the stores provide
  // (only EN and RU exist for our language set; Serbian falls back to EN)
  document.querySelectorAll('.appstore-badge').forEach(img => {
    img.src = root + (lang === 'ru' ? 'img/appstore-badge-ru.svg' : 'img/appstore-badge-en.svg');
  });
  document.querySelectorAll('.playstore-badge').forEach(img => {
    img.src = root + (lang === 'ru' ? 'img/playstore-badge-ru.png' : 'img/playstore-badge-en.png');
  });

  // Screenshots come in two UI languages (the app itself speaks EN and RU);
  // the Serbian/Montenegrin site copy shows the English UI. Each <img
  // data-shot="…"> resolves to img/screens/<app>/<en|ru>/<shot>.webp, with
  // <app> taken from the <html data-app> attribute of the page.
  const app = document.documentElement.getAttribute('data-app');
  if (app) {
    const ui = lang === 'ru' ? 'ru' : 'en';
    document.querySelectorAll('img[data-shot]').forEach(img => {
      const name = img.getAttribute('data-shot');
      const src = `${root}img/screens/${app}/${ui}/${name}.webp`;
      if (img.getAttribute('src') !== src) img.setAttribute('src', src);
      const cap = t['shot_' + name];
      if (cap != null) img.alt = cap;
    });
  }

  // App-selector links keep the chosen language in the URL so the other page
  // opens in the same language even before localStorage is read.
  document.querySelectorAll('a[data-app-link]').forEach(a => {
    const base = a.getAttribute('data-app-link');
    a.href = base + (base.includes('?') ? '&' : '?') + 'lang=' + lang;
  });
}

// The languages this page offers = its switcher buttons.
function availableLangs() {
  const langs = [];
  document.querySelectorAll('.lang-btn[data-lang]').forEach(btn => {
    const l = btn.getAttribute('data-lang');
    if (!langs.includes(l)) langs.push(l);
  });
  return langs;
}

// Map a wanted language onto what this page offers: a local language the
// page lacks becomes the page's own local language (Cyrillic → Cyrillic when
// there is one), anything else falls back to English.
function resolveLang(wanted, available) {
  if (available.includes(wanted)) return wanted;
  if (LOCAL_LANGS.includes(wanted)) {
    const locals = available.filter(l => LOCAL_LANGS.includes(l));
    if (wanted.endsWith('cyrl')) {
      const cyr = locals.find(l => l.endsWith('cyrl'));
      if (cyr) return cyr;
    }
    if (locals.length) return locals[0];
  }
  return 'en';
}

function initI18n() {
  // Detect language: URL param > localStorage > browser
  const params = new URLSearchParams(window.location.search);
  let lang = params.get('lang');
  if (!lang) lang = localStorage.getItem('govori-lang');
  if (!lang) {
    const bl = navigator.language.toLowerCase();
    if (bl.startsWith('ru')) lang = 'ru';
    else if (bl === 'sr' || bl.startsWith('sr-cyrl')) lang = 'sr-cyrl';
    else if (bl.startsWith('sr')) lang = 'sr-latn';
    else if (bl.startsWith('cnr')) lang = 'cnr';
    else if (bl.startsWith('hr') || bl.startsWith('bs')) lang = 'hr';
    else lang = 'en';
  }
  if (!translations[lang]) lang = 'en';
  const available = availableLangs();
  if (available.length) lang = resolveLang(lang, available);

  // Bind switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setLang(btn.getAttribute('data-lang'));
    });
  });

  setLang(lang);
}

document.addEventListener('DOMContentLoaded', initI18n);
