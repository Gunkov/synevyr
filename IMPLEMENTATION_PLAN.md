# IMPLEMENTATION_PLAN — відтворення prydniprovske.aosbb.kiev.ua

Обов’язкове попереднє читання для виконавця: `REFERENCE_ANALYSIS.md` + `DESIGN_SPEC.md` (у цій папці) — вони є джерелом ВСІХ значень (кольори, паддинги, breakpoint’и, тексти). Скріншоти-еталони: `reference/screenshots/`.

---

## 1. Який framework уже використовується (в workspace)

| Проєкт | Стек |
|---|---|
| `sites/gunkov_pp_ua` | **Astro 4 + Tailwind 3 + DaisyUI**, static build → `scp dist` → Oracle ARM (Caddy, авто-HTTPS). Єдиний JS-фреймворк у workspace. |
| `kroszilla/`, `plugins/ua-direct-shipping` | WordPress + WooCommerce, PHP 8.1 |
| `TelegaMag/` | Python (aiogram 3 + SQLite) |

Локально: Node v22.14.0, npm 10.9.2 — є.

**Рішення для цього сайту: Astro (static output), БЕЗ Tailwind.**
- Чому Astro: єдина вже-використовувана в workspace технологія статичних сайтів; готова схема деплою (build → dist → Caddy на Oracle Always Free); компоненти/layouts природно мапляться на секції; build-time fetch RSS.
- Чому без Tailwind: дизайн — точні px-метрики Astra/UAGB (DESIGN_SPEC); Tailwind дасть лавину arbitrary-values і неточності. Пишемо **власний CSS** з токенами (CSS custom properties). DaisyUI не використовуємо.
- JS: vanilla ES-модуль (sticky/shrink, hamburger, таби, scroll-top, валідація форми). Без React/Vue.

## 2. Структура проєкту (нова, у `sites/prydniprovske/`)

```
sites/prydniprovske/
├── REFERENCE_ANALYSIS.md / DESIGN_SPEC.md / IMPLEMENTATION_PLAN.md
├── reference/screenshots/…            (вже є — еталони)
├── package.json                       (лише astro; scripts: dev/build/preview)
├── astro.config.mjs                   (site: тимчасово локальний URL; без інтеграцій)
├── public/
│   ├── favicon-32x32.jpg, favicon-192x192.jpg
│   └── img/
│       ├── hero.jpg  mission.jpg  ann-red.jpg  ann.jpg  doc.jpg
│       └── gallery-1.jpg  gallery-2.png  gallery-3.jpg
└── src/
    ├── layouts/BaseLayout.astro       (html lang="uk", head, шрифти, favicon, import css, <slot/>)
    ├── components/
    │   ├── BaseHead.astro             (title/meta/OG/шрифти Google Fonts)
    │   ├── Header.astro               (лого-текст + меню + hamburger + dropdown)
    │   ├── Footer.astro
    │   ├── ScrollTop.astro
    │   ├── sections/                  (S1–S12 з REFERENCE_ANALYSIS §5)
    │   │   ├── Hero.astro  Welcome.astro  News.astro  About.astro
    │   │   ├── Mission.astro (місія+будинок+стати+CTA)  Announcements.astro
    │   │   ├── Documents.astro (таби)  Gallery.astro  Contacts.astro
    │   ├── ui/
    │   │   ├── SectionBand.astro      (синя градієнтна смуга: h2 + desc, props: id,title,desc)
    │   │   ├── PillButton.astro       (a-кнопка pill; props: href, target)
    │   │   ├── InfoBox.astro          (variations: center | left; img, title, desc, button?)
    │   │   ├── StatCard.astro         (number, label)
    │   │   ├── Tabs.astro             (3 таби + 3 панелі; vanilla JS)
    │   │   ├── IconList.astro         (5 рядків контактів; inline FA5 SVG)
    │   │   ├── NewsGrid.astro         (2-col стрічка; props: items[])
    │   │   └── GalleryGrid.astro      (3-col cropped)
    │   └── ContactForm.astro          (4 поля + submit; client-side валідація)
    ├── pages/
    │   ├── index.astro                (композиція секцій S1–S12)
    │   └── 404.astro                  (мінімальна, у тому ж layout)
    ├── data/
    │   ├── content.ts                 (УСІ тексти — копія з Додатку A REFERENCE_ANALYSIS)
    │   └── news-fallback.ts           (6 hardcoded items з датами/URL)
    ├── styles/
    │   ├── tokens.css  base.css  header.css  sections.css
    │   ├── components.css  forms.css  footer.css
    └── scripts/main.js                (усі behavior-фічі)
```

## 3. Файли, які потрібно створити

Повний перелік — у дереві вище (~35 файлів). Ключові деталі:

1. `package.json` — dependencies: `astro ^4`; scripts `dev/build/preview`. Без інших залежностей.
2. `astro.config.mjs` — `defineConfig({ site: 'https://prydniprovske.example' , integrations: [] })` (замінити при деплої).
3. `src/data/content.ts` — всі тексти (welcome, про ОСББ, місія, будинок, 3 оголошення, Viber, контакти, графік, статі, footer, меню-пункти з href-якорями).
4. `News.astro` — у frontmatter: `try { fetch('https://aosbb.kiev.ua/feed/') → parse <item> (title, link, pubDate→dd.mm.yyyy) } catch → news-fallback.ts`; рендер 6 items у 2 колонки.
5. `Tabs.astro` — кнопки + панелі; active-класи як у reference (`nav-active`, `content-active`); JS у `main.js`.
6. `ContactForm.astro` — поля name/email/tel/message; required: name, email, message; на submit: client-side валідація, помилки — червоні tip’и `#ff0000` під полем + border `#ff0000`; success — повідомлення у стилі форми. **Без бекенду** (хук для майбутнього endpoint — окремим data-атрибутом, не коментувати).
7. `main.js` — фічі (§8 нижче), усі з guard’ами по matchMedia/наявності елементів.
8. CSS (§7).
9. `public/img/*` — завантажити з reference (§9).

## 4. Файли, які потрібно змінити

**Жодного існуючого файлу workspace не чіпаємо.** Опціонально (після реалізації, окремо узгодити): додати рядок про новий субпроєкт у кореневий `AGENTS.md`.

## 5. Компоненти (поведінка/props)

| Компонент | Відповідає | Ключове |
|---|---|---|
| Header | §4 REF | лого-текст 32px RobotoCond700 `#3e88b3`; меню 7 пунктів right; sticky+shrink (desktop); ≤921 hamburger+dropdown |
| SectionBand | сині смуги S2/S4/S6/S8/S10 | grad-blue; h2 34 white + desc 18 white; колонки 70/30 (права порожня) |
| Біла картка | новини/місія/галерея | radius 10, border 1px #fff, `margin-top:-50` (desktop; на ≤976 — 0 і mb за SPEC) |
| NewsGrid | RSS | flex 2-col; на ≤767 — 1 col |
| InfoBox | місія/оголошення/документи | варіанти center (img 200/120) та left (img 60) |
| StatCard | 3 картки | grad-light-inv; число 54 `#78bca1`; на ≤976 стовпчик |
| CTA | Viber | 70/30; ≤976 stack+center |
| Tabs | документи | 3 таби; контент — 3 InfoBox-center + PillButton «ПЕРЕГЛЯНУТИ» |
| GalleryGrid | галерея | 3-col cropped; img object-fit:cover; height 100% |
| IconList | контакти | inline SVG (FA5): map-marker-alt/envelope/phone; 20px `#7799ad` |
| ContactForm | CF7-подоб | §3.6 |
| Footer / ScrollTop | §6 REF | center 14px; fixed кнопка вгору |

## 6. Routing

- **Одна сторінка**: `src/pages/index.astro` → `/`.
- Якорі-секції з `id`: `novyny, pro-osbb, informatsiya, dokumenty, galereya, kontakty`; у CSS `scroll-margin-top: 80px` (компенсація sticky).
- `404.astro` — проста (layout + повідомлення), у меню не входить.
- Інших маршрутів НЕМАЄ (sitemap reference = 1 сторінка).

## 7. Організація CSS

Desktop-first, як у reference. Файли імпортяться в `BaseLayout.astro` у порядку: tokens → base → header → sections → components → forms → footer.

- `tokens.css` — `:root` custom properties для ВСІХ кольорів/розмірів з DESIGN_SPEC §1–3 (`--c-page-bg:#ebebeb; --c-brand:#3e88b3; --c-accent:#ff7e65; --grad-blue:linear-gradient(90deg,#3e88b3,#285773); --r-card:10px; --r-pill:50px; --w-box:1265px; --w-inner:1200px;` тощо). Breakpoints у media-queries константами: **976 / 921 / 767 / 544** (max-width).
- `base.css` — reset-light; `html{font-size:93.75%}`; body Roboto 400 15px `rgba(1,22,39,.75)` bg `--c-page-bg`; `#page{max-width:1265;margin:auto}`; h1–h6 Roboto 500; link `#3276b1`/hover `#ff7e65`; selection; `.container{padding:0 40px}` (≥922).
- `header.css` — bar white + border `#eae9e9`; identity padding `1em 0` (shrink `.5em`); menu `0 1em`, 500/15; sticky `.is-stuck{position:fixed;top:0;left:0;right:0;max-width:1265;margin:auto}` + shrink-клас; ≤921: hamburger, dropdown (block, лінки `0 20px`, line-height 3, border-bottom `#eae9e9`), bar padding `1.5em 0` (≤544 `1em`).
- `sections.css` — S1–S12: фони/градієнти + паддинги за таблицею DESIGN_SPEC §5 (3 стани); inner-wrap `max-width:1200;margin:auto`; колонки flex з width% і margin-right за SPEC; «наїзди» `-50px` і їх tablet/mobile-заміни.
- `components.css` — картки, infobox, stat, cta, tabs, icon-list, gallery, news-grid, scroll-top, separator (`4px solid var(--c-green)` width 100%).
- `forms.css` — за DESIGN_SPEC §6 «Форма».
- `footer.css` — за SPEC.

## 8. Responsive behavior (реалізація)

Media-queries (max-width), desktop-first — дзеркалять SPEC §7:
- **976**: секції-паддинги (таблиця §5), колонки→стовпчик, картки без «наїзду» (mt 0 + mb), CTA stack, стати стовпчиком (mb 40–50, padding 50/20), tabs-картки mb 50.
- **921**: header→hamburger+dropdown; `.container` без 40px; h2 25/h3 20.
- **767**: секції padding 20 sides; новини 1 col; tabs-картки mb 40; галерея-картка 20 sides; контакти-колонки stack; gallery 1–2 col.
- **544**: header 1em; site-title 20px; h1 44.

JS-behavior (`main.js`):
1. Sticky+shrink: `matchMedia('(min-width:922px)')`; scroll>0 → класи на header; transition `.2s`.
2. Hamburger: toggle класу `nav-open` на header; aria-expanded; іконка bars↔close (два inline-SVG/span).
3. Таби: click → active-класи (buttons + panels).
4. ScrollTop: show при scrollY>300; click → smooth top.
5. Форма: validate on submit; email-regex; tel optional; error-tip `#ff0000`; success-стан.
6. Anchor-посилання — нативні (href="#…") + `scroll-margin-top`.

## 9. Assets

Завантажити у `public/` (джерела — з reference, `/wp-content/uploads/2020/…`):

| Локально | Джерело |
|---|---|
| img/hero.jpg | 09/osbb-prydniprovske.jpg (1200×540, рамка у файлі) |
| img/mission.jpg | 09/meta-osbb.jpg |
| img/ann-red.jpg | 11/informatsiya-ikonka-red.jpg |
| img/ann.jpg | 11/informatsiya-ikonka.jpg |
| img/doc.jpg | 11/dokumenty-ikonka.jpg |
| img/gallery-1.jpg / gallery-2.png / gallery-3.jpg | 09/osbb-prydniprovske-1.jpg / -2.png / -3.jpg |
| favicon-32x32.jpg / favicon-192x192.jpg | 09/cropped-osbb-prydniprovske-favikon-*.jpg |

- Шрифти: Google Fonts `<link>` — `Roboto:400,500,700` + `Roboto Condensed:700` (display=swap).
- Іконки контактів: inline SVG (FA5 solid path’и — viewBox 384×512 marker; 512×512 envelope/phone) — взяти з публічних FA5-шляхів, відтворити візуально ідентичні.
- Hamburger/стрілки: власні inline-SVG (3 смуги / стрілка вгору), без icon-font.
- Карта: iframe `https://www.google.com/maps?q=Київ,+Бориса+Гмирі+1/2&output=embed&hl=uk` (без API-ключа), height 248, width 100%.

## 10. Сторінки для реалізації

1. `/` (index.astro) — секції S1–S12 у порядку REFERENCE_ANALYSIS §5.
2. `/404` — мінімальна.

## 11. Порядок робіт (для виконавця)

1. Scaffold: `npm create astro@latest` (порожній, без tailwind) у `sites/prydniprovske/` (файли package.json/astro.config миттєво приведені до §2).
2. Завантажити assets (§9).
3. `tokens.css`+`base.css` → layout+header+footer.
4. Секції S1–S12 + ui-компоненти (з `content.ts`).
5. `main.js`-behavior.
6. `npm run build`; `npm run preview`.
7. Верифікація: headless-Chrome скріншоти 1920/768/375 (як у reference) і порівняння з `reference/screenshots/*`; чек-поінти: box 1265 по центру на `#ebebeb`; header ≈64–70px, меню справа; картки з наїзом −50; таби перемикаються; форма валідується; scroll-top працює; на 375 — hamburger+dropdown.
8. Деплой (окремо узгодити): за схемою gunkov_pp_ua — `scp dist/*` на наявний Oracle Always Free інстанс + Caddy-subdomain; нових платних ресурсів не створювати.

## 12. Out of scope

- Копіювання WP/Astra/UAGB-коду і класів — лише візуальна/поведінкова відповідність.
- Бекенд форми, адмінка, CMS, blog, інші сторінки, SEO-плагіни.
- og:image kobzar-nad-dniprom.jpg — опціонально (можна вказати у BaseHead).
