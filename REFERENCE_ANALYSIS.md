# REFERENCE_ANALYSIS — prydniprovske.aosbb.kiev.ua

Reverse-engineering report. Мета: відтворити appearance + behavior без копіювання WP-коду.
Досліджено: сирі HTML/CSS (завантажені), headless-Chrome скріншоти (desktop 1920, tablet 768, mobile 375) — у `reference/screenshots/`.

---

## 1. Стек (фактичні дані з HTML)

| Компонент | Версія / факт |
|---|---|
| CMS | WordPress 5.8.15 |
| Тема | Astra 3.7.3 (free) + Astra Pro addon 3.6.1 |
| Блок-білдер | Gutenberg + **UAGB (Ultimate Addons for Gutenberg / Spectra)** — секції/колонки/infobox/CTA/icon-list/CF7-styler; стилі блоків — інлайн `<style id="uagb-style-frontend-8">` (100 KB, per-page) |
| Таби «Документи» | **Gutentor 3.1.5** (module tabs, id 473776) |
| Форми | Contact Form 7 5.4.2 (форма id 35) |
| SEO | Yoast (sitemap.xml) |
| Шрифти | Google Fonts: `Roboto:400,500,700` + `Roboto Condensed:700` |
| RSS | зовнішня стрічка `aosbb.kiev.ua` (wp-block-rss, 6 items, 2 колонки) |
| Карта | Google Maps embed iframe (height 248px) |

JS-змінні (фактичні): `astra.break_point = 921`, `astraAddon.tablet_break_point = 921`, `mobile_break_point = 544`, `site_layout = "ast-box-layout"`, `site_content_width = 1240`, `site_layout_box_width = 1265`, sticky: `header_main_stick=1`, `sticky_header_on_devices="desktop"`, `header_main_shrink=1` (стиль "none", не ховається при скролі).

## 2. Структура сайту

**Односторінковик.** Sitemap містить ЛИШЕ головну (`/`, page-id 8); постів немає. Меню — якірні посилання на секції головної:

| Пункт меню | href | Секція |
|---|---|---|
| Головна | `/` | — |
| Новини | `#novyny` | НОВИНИ |
| Про ОСББ | `#pro-osbb` | Про ОСББ |
| Оголошення | `#informatsiya` | Оголошення |
| Документи | `#dokumenty` | Документи (таби) |
| Галерея | `#galereya` | Галерея |
| Контакти | `#kontakty` | Контакти |

Підменю немає. Сторінок 404/блогу у навігації немає.

## 3. Каркас сторінки (Astra box layout)

- `body` фон `#ebebeb`; `#page` (весь сайт) — `max-width:1265px; margin:0 auto` (білі/кольорові смуги сайту по центру, сірі поля з боків).
- Header-бари (`.main-header-bar`) теж `max-width:1265px`.
- `.ast-container` (header/footer): `max-width:1265px; padding:0 40px` при ≥922px.
- Контент (`.ast-page-builder-template .site-content > .ast-container`): `max-width:100%; padding:0` → **секції тягнуться на всю ширину #page (1265px)**, внутрішній `.uagb-section__inner-wrap { max-width:1200px; margin:auto }`.
- Sidebar: немає (`ast-no-sidebar`).

## 4. Header (desktop)

- Біла смуга, `border-bottom:1px solid #eae9e9`, висота ≈ 64–70px (line-height 4 у навігації + `.ast-site-identity{padding:1em 0}`).
- Layout-1: лого/назва зліва, меню справа (`ast-justify-content-flex-end`).
- **Логотипа-зображення НЕМАЄ** (`<span class="site-logo-img"></span>` порожній) — текстовий site-title: `ОСББ "ПРИДНІПРОВСЬКЕ"`, Roboto Condensed 700, 32px, колір `#3e88b3` (hover той самий). На ≤544px — 20px.
- Меню: Roboto 500, 15px, колір `rgba(1,22,39,0.75)`; hover `#ff7e65`; current — той самий сірий; padding лінка `0 1em`; transition all .2s.
- **Sticky**: на desktop header фіксується при скролі; при закріпленні «shrink»: `.ast-site-identity` padding → `0.5em 0` (transition 0.2s).
- Favicon: `cropped-osbb-prydniprovske-favikon-32x32.jpg` / `-192x192.jpg`.

### Mobile header (≤921px — клас `ast-header-break-point` додає JS)
- Hamburger справа (стиль *minimal*: прозорий фон, іконка-бар `#ff7e65`, font-size 1.5em).
- Header padding `1.5em 0` (≤544: `1em 0`); title + burger в один рядок (`ast-mobile-header-inline`).
- Dropdown-меню: білий фон, вертикальний список, лінки `padding:0 20px`, line-height 3, border-bottom `#eae9e9` між рядками (Astra default dropdown), hover `#ff7e65`.
- При відкритому меню `padding-bottom:0` у бара.

## 5. Секції головної (зверху вниз)

Кольори/паддинги див. у DESIGN_SPEC.md. Тут — структура і компоненти.

### S1 Hero (dark-blue `#234d65`)
- `wp-block-image alignwide`: фото `osbb-prydniprovske.jpg` 1200×540 (світло-блакитна рамка **впечена у файл зображення**, не CSS).
- Spacer 20px.
- Підпис праворуч, italic, white, `has-medium-font-size` (1.25em ≈ 18.75px): «…учасник Асоціації ОСББ Дарницького району міста Києва».

### S2 Welcome (gradient 90deg `#3e88b3→#285773`)
- 2 колонки 70/30 (права порожня).
- H1 40px white «Вітаємо на офіційному сайті ОСББ “ПРИДНІПРОВСЬКЕ”» (mb 20) + опис 18px white.

### S3 #novyny (light gradient 180deg `#e5ebee→#fff`)
- **Біла картка** (radius 10, border 1px #fff) з `margin-top:-50px` — наїжджає на синю секцію S2 зверху.
- Заголовок H3 «НОВИНИ» `#00637f` + separator: лінія 4px `#78bca1` на всю ширину, mb 40.
- RSS-стрічка: `is-grid columns-2` (flex, items `width:calc(50% - 1em)`, margin `0 1em 1em 0`): title-лінк `#3276b1`, дата `display:block; color:#555; font-size:.8125em`, excerpt — звичайний текст. 6 items (зовнішній фіт aosbb.kiev.ua).

### S4 #pro-osbb (gradient blue)
- 2 колонки 50/50 (ліва margin-right 50): H2 white «Про ОСББ “ПРИДНІПРОВСЬКЕ”»; права — текст 18px white (створено 21.08.1999, адреса Київ, вул. Бориса Гмирі, 1/2).

### S5 Місія/будинок/статистика/CTA (фон `#e6f0f6`)
- Ряд 1: картка «НАША МІСІЯ» (40%, біла, radius 10, `margin-top:-50px`, margin-right 50, padding 50/75/40/40; infobox center: іконка-фото `meta-osbb.jpg` 200px, title `#00637f`) + права колонка 60%: H3 «НАШ БУДИНОК» `#00637f` + separator 4px `#78bca1` + текст 15px.
- Ряд 2: **3 стат-картки** (33.33%, margin-right 20 у перших двох, padding 100/40, radius 10, gradient 180deg `#fff→#e5ebee`): число 54px bold `#78bca1` (13540 / 650 / 294) + підпис bold `#929aa3` (ЗАГАЛЬНА ЖИТЛОВА ПЛОЩА / КІЛЬКІСТЬ МЕШКАНЦІВ / КІЛЬКІСТЬ КВАРТИР).
- Ряд 3: **CTA «Група у Viber»**: title 30px `#00637f`, desc 18px, контент 70% + кнопка 30% справа — orange pill «ПРИЄДНАТИСЬ ДО ГРУПИ» (href `#kontakty`). На tablet кнопка стає по центру, обидві частини 100%.

### S6 #informatsiya header (gradient blue) — H2 34px white «Оголошення» + desc 18px white.

### S7 Оголошення-картки (фон `#e5ebee`, padding 100 по боках)
- 2 колонки 50/50 (ліва margin-right 20).
- Ліва: 1 картка (біла, radius 10, padding 30) — infobox «icon-left-title»: фото-іконка `informatsiya-ikonka-red.jpg` 60px, title «ОГОЛОШЕННЯ» bold, текст 15px (карантинні правила).
- Права: 2 картки вертикально (mb 20): іконка `informatsiya-ikonka.jpg` 60px; теми — сплата внесків; реклама на фасаді.

### S8 #dokumenty header (gradient blue) — H2 34px white «Документи» + desc 18px.

### S9 Документи-таби (фон `#eff2f5`, padding 100)
- **Gutentor tabs** (horizontal, pos-top, nav center): 3 таби — «Публічні документи» (active), «Законодавство», «Зразки документів».
- Кнопки табів: bg `#eff2f5`, border 2px `#e5ebee`, padding 10px 20px (≥992px: 10px 40px 10px 20px); текст Roboto 500 16px (≥768: 18px) `#929aa3`; hover/active: bg+border `#e6f0f6`.
- Контент таба: padding-top 40px; 3 білі картки 33.33% (margin-right 50 у перших двох; на tablet/mobile — стовпчик з mb 40–50): infobox center — іконка `dokumenty-ikonka.jpg` 120px, title 20px (mb 40), desc `#929aa3` (mb 40), кнопка «ПЕРЕГЛЯНУТИ» orange pill.
- Контент табів: (1) Абетка споживача (PDF), Статут, Протокол зборів; (2) 3 закони України (посилання на zakon.rada.gov.ua, target _blank); (3) Зразок 1/2/3.

### S10 #galereya header (gradient blue) — H2 34px white «Галерея» + desc 18px.

### S11 Галерея (фон `#e5ebee`)
- Біла картка `margin-top:-50px`, radius 10, padding 50: H3 «ФОТОГАЛЕРЕЯ» `#00637f` + separator 4px `#78bca1` (mb 10) + `wp-block-gallery columns-3 is-cropped` (3 фото: osbb-prydniprovske-1.jpg 1024×768, -2.png 961×622, -3.jpg 1024×768; items `width:calc(33.33% - .66667em)`, margin-right 1em, img width:100% height:100% object cropped).

### S12 #kontakty (фон `#234d65`)
- H2 34px white «Контакти» + separator 4px `#7799ad` на всю ширину.
- 2 колонки (ліва margin-right 50):
  - Ліва: H3 white «Контакти адміністрації та виконавців»; spacer 20; **icon-list** (5 рядків: FA-svg 20px `#7799ad` + label white bold 15px; gap 15px; mb 10): адреса 02140 Київ, вул. Бориса Гмирі 1/2; osbb-kiev@ukr.net; 044 573 16 23 / 067 306 14 78; 044 587 86 40 – Аварійна служба; 044 573 17 48 – Ліфтова служба. Іконки: map-marker-alt, envelope, phone, phone, phone. Spacer 37; текст 18px white «Графік роботи: Пн – Пт з 09:00 до 18:00, перерва з 13:00 до 14:00»; spacer 20; **Google Maps iframe** (100% × 248px, embed/v1/place q=Київ, Бориса Гмирі 1/2, zoom 15, lang uk).
  - Права: H3 white «Надіслати повідомлення або запитання»; spacer 20; **CF7 форма**: поля «Ваше ім’я (обов’язково)» text, «Ваш email (обов’язково)» email, «Ваш телефон» tel, «Ваше повідомлення чи запитання (обов’язково)» textarea; label bold 13px `#7799ad`; input: bg `#fafafa`, border 1px `#e6f0f6`, radius 0, padding 10, margin-top 5, width 100%; focus border `#78bca1`; textarea height 150px (custom CSS); submit «ВІДПРАВИТИ» orange pill (padding 15/25, radius 50, hover `#e6735c`).

## 6. Footer

- Small-footer layout-1, 1 секція по центру: `Copyright © 2026 | ОСББ "ПРИДНІПРОВСЬКЕ"` (рік — динамічний у WP; на момент зняття 2026).
- bg `#234d65`, `border-top:2px solid #7799ad`, padding 2em 0, текст 14px Roboto 500 `rgba(255,255,255,0.85)`, лінки white.
- **Scroll-top кнопка**: fixed right-bottom, bg `rgba(51,51,51,0.9)`, white стрілка вгору (Astra icon, rotate 180), radius 4, font 20px; hover bg `#ff7e65`; на всіх пристроях.

## 7. Зображення (всі з `/wp-content/uploads/2020/…`)

| Файл | Використання | Розмір |
|---|---|---|
| 09/osbb-prydniprovske.jpg | hero | 1200×540, рамка у файлі |
| 09/kobzar-nad-dniprom.jpg | лише og:image | — |
| 09/cropped-osbb-prydniprovske-favikon-32x32.jpg / -192x192.jpg | favicon | 32/192 |
| 09/meta-osbb.jpg | іконка «НАША МІСІЯ» | ≈200px |
| 11/informatsiya-ikonka-red.jpg | оголошення (червона) | 60px |
| 11/informatsiya-ikonka.jpg | оголошення ×2 | 60px |
| 11/dokumenty-ikonka.jpg | документи ×9 | 120px |
| 09/osbb-prydniprovske-1.jpg / -2.png / -3.jpg | галерея | 1024×768 / 961×622 / 1024×768 |

## 8. Іконки

- Hamburger, стрілки меню/scroll-top — шрифт **Astra** (icon-font, content-коди e5d2/e900…).
- Контактний список — **Font Awesome 5 solid** inline-SVG: map-marker-alt (viewBox 0 0 384 512), envelope (512), phone (512).
- Іконки секцій — фото (jpg/png), не шрифтові.

## 9. Breakpoints (фактичні, з CSS/JS)

| Джерело | Breakpoint | Що перемикає |
|---|---|---|
| Astra JS/CSS | **921px** | desktop ↔ mobile header (hamburger, dropdown), контейнер-паддинги |
| Astra | **544px** | дрібна типографіка, header padding 1em, site-title 20px |
| UAGB | **976px** | tablet-паддинги секцій, stack колонок (`uagb-columns__stack-tablet`), CTA stack |
| UAGB | **767px** | mobile-паддинги, колонки в 1 стовпчик |
| Gutentor tabs | 768 / 992 | розмір/padding таб-кнопок |
| UAGB hide-класи | 1024/767 | uag-hide-tab/mob (не використано) |

## 10. Поведінка (JS)

1. Sticky-header (desktop): фіксується, shrink-анімація 0.2s.
2. Mobile: hamburger toggle dropdown-меню (клас `ast-main-header-nav-open`), іконка → close.
3. Gutentor tabs: click по табу → `gutentor-tabs-nav-active` + `gutentor-tabs-content-active` (display none/block).
4. Anchor-навігація з плавним скролом стандартна браузера (hashchange-фокус у WP).
5. Scroll-top: з’являється при скролі, клік — вгору.
6. CF7: AJAX-сабміт, not-valid tip `#ff0000`.
7. RSS-блок — серверний рендер (кеш), не JS.

## 11. Скріншоти

`reference/screenshots/`: shot-desktop-top.png (1920×1080), shot-desktop-full.png (1920×10000), shot-tablet-full.png (768), shot-mobile-top.png / shot-mobile-full.png (375).
Примітка: у headless-mobile без виконання JS клас `ast-header-break-point` не додається — реальний mobile-header описаний у §4 (підтверджено tablet-скріншотом, де JS відпрацював: hamburger видимий).

## 12. Висновки для реімплементації

- Відтворювати як **статичний/власний** односторінковик: box-layout 1265, секції на всю ширину, inner 1200.
- Кольорова система: сині градієнти + dark-blue + світло-сірі фони + orange accent + teal/green акценти (див. DESIGN_SPEC).
- Компоненти: білі картки radius 10 з «наїздом» -50px; orange pill-кнопки; tabs; icon-list; RSS-2-col; gallery-3-col; CF7-подібна форма.
- Жодних sidebar/додаткових сторінок.

---

## Додаток A. Повні тексти контенту (копія для верстки)

**НАШ БУДИНОК:** Житловий будинок розташований на відстані 500 м від станції метро «Позняки», навпроти – озеро Срібний кіл. Будинок складається з чотирьох секцій та має 16 поверхів, в плані нагадує латинську букву S з внутрішнім двором. На першому поверсі розміщені продовольчий магазин, аптека, салон краси і банк. З другого поверху починаються одно, двох, трьох і чотирьохкімнатні квартири. У кожну квартиру проведено лінії телефонного зв’язку, кабельного інтернету і телебачення. Прилегла до будинку територія огороджена, тротуари вимощені плиткою, навколо будинку облаштована паркова зона. Також на прибудинковій території розміщені автостоянка, спортивний і дитячий майданчики.

**НАША МІСІЯ:** Утримувати будинок у належному технічному та санітарному стані, забезпечити надання якісних комунальних послуг та комфортне проживання.

**ОГОЛОШЕННЯ 1 (карантин):** **Шановні мешканці будинку!** У зв’язку зі зростанням захворюваності на коронавірус рекомендуємо дотримуватись наступних правил карантину: – за межами квартири користуйтесь масками та рукавичками, не торкайтеся руками обличчя; – тримайте дистанцію між людьми не менше 1,5 метра; – уникайте скупчення людей, не збирайтесь у групи; – не торкайтесь голими руками ручок вхідних дверей, перил, кнопок та стін у ліфті; – намагайтеся ходити сходами і не користуватися ліфтом; – обмежте контакти з людьми, які не проживають разом з вами; – періодично протирайте дезінфекуючими засобами ручки вхідних дверей у своїй квартирі; – помийте руки з милом щойно зайдете до квартири; – не відкладайте звернення до лікаря у разі високої температури і утрудненого дихання. **Бережіть себе і своїх близьких!**

**ОГОЛОШЕННЯ 2 (внески):** **Шановні співвласники!** Утримання нашого будинку і приведення його в належний санітарний і технічний стан вимагає постійних витрат. Основне джерело коштів на проведення всіх необхідних робіт та заходів – це внески співвласників будинку. Просимо своєчасно сплачувати внески і не допускати заборгованості. Щиро сподіваємось на Ваше розуміння.

**ОГОЛОШЕННЯ 3 (реклама):** **Шановні підприємці!** Пропонуємо розміщення реклами на фасадах нашого будинку. Звертаємо увагу на привабливе розташування будинку, який знаходиться поблизу метро та на перетині пішохідних маршрутів, а по проспекту Бажана щодня проїжджають тисячі автомобілів і пасажирів. Поруч розташовані супермаркети BILLA, NOVUS, METRO, навпроти ресторан McDonald’s. Вашу рекламу побачать тисячі клієнтів.

**VIBER CTA:** З метою організації спілкування між співвласниками та правлінням; обговорення проблем, ініціатив та порядку денного загальних зборів; оперативного повідомлення важливої інформації та пересилання документів створена група у Viber «Актив Гмирі 1/2».

**Новини (RSS, 6 items, дата — заголовок — url):**
1. 17.02.2022 — Не з утеплення мала б розпочатися Велика термомодернізація — aosbb.kiev.ua/asotsiatsiya-energoaudytoriv-velyka-termomodernizatsiya/
2. 16.02.2022 — Оголошено результати конкурсу 2022 року за програмою “70/30” — …/rezultaty-konkursu-2022-programy-70-30/
3. 16.02.2022 — Велика термомодернізація: звернення спільноти ОСББ і ЖБК до влади — …/velyka-termomodernizatsiya-zvernennya-osbb/
4. 14.02.2022 — Теплові насоси – ключова технологія енергомодернізації будинків — …/teplovi-nasosy-energomodernizatsiya-budynkiv/
5. 12.02.2022 — Держава інвестує у велику термомодернізацію 140 млрд грн — …/prezentatsiya-programy-velykoyi-termomodernizatsiyi-11-02-22/
6. 11.02.2022 — Київ планує підписати меморандум з Фондом енергоефективності — …/memorandum-kmda-fond-energoefektyvnosti/
