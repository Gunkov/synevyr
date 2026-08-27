# DESIGN_SPEC — prydniprovske.aosbb.kiev.ua (відтворення)

Усі значення виміряні з reference (CSS/HTML/скріншоти). Одиниці — px, якщо не вказано інше.
Root font-size: 93.75% → 1rem = 15px.

---

## 1. Colors

| Token | Hex / значення | Використання |
|---|---|---|
| page-bg | `#ebebeb` | body (поля навколо box-layout) |
| brand-blue | `#3e88b3` | site-title, sticky title |
| link | `#3276b1` | посилання, RSS-тайтли; selection bg |
| link-hover / accent-orange | `#ff7e65` | hover лінків/меню/кнопок-тексту, hamburger, scroll-top hover |
| btn-orange | `#ff7e65` bg+border; hover `#e6735c` | усі кнопки (pill) |
| grad-blue | `linear-gradient(90deg, #3e88b3 0%, #285773 100%)` | фон синіх секцій-заголовків |
| dark-blue | `#234d65` | hero-секція, контакти, footer |
| grad-light | `180deg, #e5ebee 0% → #ffffff 100%` | новини-секція |
| grad-light-inv | `180deg, #ffffff 0% → #e5ebee 100%` | стат-картки |
| section-lightblue | `#e6f0f6` | секція «Місія/будинок» |
| section-gray | `#e5ebee` | оголошення, галерея |
| section-tabs | `#eff2f5` | документи |
| heading-teal | `#00637f` | H2/H3 заголовки на світлих фонах, CTA title |
| accent-green | `#78bca1` | separator-лінії, стат-числа, focus-бордери |
| steel | `#7799ad` | footer border-top, separator «Контакти», іконки контактів, таб-текст |
| text-body | `rgba(1,22,39,0.75)` | основний текст, меню |
| text-heading | `#3a3a3a` | h1–h6 за замовч. |
| text-muted | `#929aa3` | підписи статів, desc документ-карток, текст форм |
| card-white | `#ffffff` (bg + border 1px) | усі картки |
| header-border | `#eae9e9` 1px | низ header |
| input-bg | `#fafafa`; border `#e6f0f6`; focus `#78bca1` | форма |
| error | `#ff0000` | CF7 not-valid |
| scrolltop-bg | `rgba(51,51,51,0.9)`; hover `#ff7e65` | scroll-top |
| footer-text | `rgba(255,255,255,0.85)`; лінки `#ffffff` | footer |

## 2. Typography

| Елемент | Family / weight / size / інші |
|---|---|
| body / inputs / buttons base | Roboto 400, 15px |
| headings h1–h6 | Roboto 500; колір `#3a3a3a` (на синьому — white) |
| h1 default | 48px (mobile 44); **welcome h1 = 40px, mobile 34px**, white, mb 20 |
| h2 default | 34px (mobile 25) |
| h3 default | 24px (mobile 20) |
| site-title | Roboto Condensed 700, 32px (≤544: 20px), `#3e88b3` |
| main menu | Roboto 500, 15px |
| section h2 на синьому | 34px white, mb 15–20 + desc 18px white |
| section h3 teal | 24px `#00637f` mb 15 + separator |
| separator під заголовком | лінія `4px solid #78bca1`, width 100%, mb 10–40; «Контакти»: `#7799ad` |
| стат-число | 54px bold `#78bca1`, center |
| стат-підпис | bold `#929aa3`, center |
| CTA title | 30px `#00637f` mb 20; CTA desc 18px mb 20 |
| doc-card title | 20px, mb 40; desc 15px `#929aa3` mb 40 |
| tabs title | Roboto 500, 16px (≥768: 18px), `#929aa3` |
| form label | Roboto 700, 13px, `#7799ad` |
| footer | Roboto 500, 14px, center |
| rss date | .8125em (≈12px), `#555`, display:block |
| hero caption | italic, 1.25em (≈19px), white, right |

## 3. Layout / dimensions

- Box: `#page` max-width **1265**, margin auto; body bg `#ebebeb`.
- Header/footer `.ast-container`: max 1265, padding `0 40` (≥922).
- Контент-секції: full-bleed у межах 1265; `.uagb-section__inner-wrap` max **1200**, auto.
- Картки: radius **10**, border `1px solid #fff`, bg `#fff`.
- «Наїзд» карток на попередню синю секцію: `margin-top:-50`.
- Кнопка (pill): radius **50**, padding **15 30** (CF7 submit: 15 25), Roboto 700 15px, line-height 1, bg/border `#ff7e65`, white; hover `#e6735c`; transition .2s.

## 4. Header / nav

- Bar: white, `border-bottom:1px #eae9e9`; inner height ≈ 64–70 (line-height 4 навігації + identity padding 1em 0).
- Лого-текст зліва; меню справа, gap = padding лінків `0 1em`.
- Menu colors: normal/current `rgba(1,22,39,.75)`; hover `#ff7e65`.
- Sticky (desktop only): fixed; shrink → identity padding `.5em 0`, transition `all .2s linear`.
- ≤921: hamburger minimal (`#ff7e65`), bar padding `1.5em 0`; ≤544: `1em 0`; dropdown: white, лінки `0 20px`, line-height 3.

## 5. Секції — padding (top/bottom/left-right) та фон

| # | Секція | Desktop | Tablet ≤976 | Mobile ≤767 | Фон |
|---|---|---|---|---|---|
| S1 | hero | 40 / 20 / 40 | 40/20/40 | 20/20/20 | `#234d65` |
| S2 | welcome | 75 / 120 / 50 | 75/100/50 | 50/50/20 | grad-blue |
| S3 | #novyny | 0 / 50 / 50 | 100/50/50 | 50/20/10 | grad-light |
| S4 | #pro-osbb | 75 / 100 / 50 | same | 50/40/20 | grad-blue |
| S5 | місія | 0 / 100 / 50 | 100/100/50 | 50/50/20 | `#e6f0f6` |
| S6 | #informatsiya | 75 / 100 / 50 | same | 50/50/20 | grad-blue |
| S7 | оголошення | 100 / 100 / 100 | 100/100/50 | 50/50/20 | `#e5ebee` |
| S8 | #dokumenty | 75 / 100 / 50 | same | 50/50/20 | grad-blue |
| S9 | таби | 100 / 100 / 100 | 100/100/50 | 50/50/20 | `#eff2f5` |
| S10 | #galereya | 75 / 100 / 50 | same | 50/50/20 | grad-blue |
| S11 | галерея | 0 / 100 / 50 | 100/100/50 | 50/50/10 | `#e5ebee` |
| S12 | #kontakty | 100 / 20 / 50 | same | 60/20/20 | `#234d65` |

## 6. Компоненти

### Біла картка-обгортка (новини/місія/галерея)
padding: новини `50 50 0`; місія `50 75 40` (mobile 40/50/20); галерея `50` (mobile top50/20 sides); radius 10; border 1px #fff; `margin-top:-50`.

### Новини (RSS)
2-col flex: item `width:calc(50% - 1em)`, margin `0 1em 1em 0`; title-лінк `#3276b1`; date block 12px `#555`; excerpt 15px body-color. Mobile: 1 колонка (width 100%).

### Інфобокси
- «Місія»: center; img 200px; title `#00637f` mb15.
- «Оголошення»: icon-left; img 60px (margin-right 15); title bold; desc 15px mb10.
- «Документи»: center; img 120px (mt10 mb20); title 20px mb40; desc `#929aa3` mb40; button pill.

### Стат-картки
3 × 33.33% (gap: margin-right 20); padding `100 40`; radius 10; grad-light-inv; tablet/mobile: стовпчик, mb 40–50, padding 50 20.

### CTA
flex: content 70% / button 30% (valign middle); tablet+mobile: stack, button center, width 100%.

### Tabs (Gutentor-подібні)
nav center; item: inline-block, bg `#eff2f5`, border `2px #e5ebee`, padding `10 20` (≥992: `10 40 10 20`), cursor pointer; text 16/18px 500 `#929aa3`; hover/active bg+border `#e6f0f6`; body padding-top 40; контент — 3 картки 33.33% (gap margin-right 50; tablet mb 50; mobile mb 40).

### Icon-list (контакти)
vertical; item mb 10; icon 20px `#7799ad` (FA5 svg), margin-right 15; label white bold 15px.

### Форма
label 13/700 `#7799ad`; input/textarea: width 100%, bg `#fafafa`, border `1px #e6f0f6`, radius 0, padding 10, mt 5, color `#929aa3`; focus border `#78bca1`; textarea 150px; submit pill `#ff7e65` (hover `#e6735c`), padding 15 25.

### Галерея
3-col: item `width:calc(33.33% - .66667em)`, margin-right 1em (кожен 3-й без margin), img 100%/100% crop; gap row 1em. Mobile: 1–2 col за WP-дефолтом (columns-3 → на <600px WP ставить 1col).

### Footer
bg `#234d65`; border-top `2px #7799ad`; padding `2em 0`; center; 14px 500 `rgba(255,255,255,.85)`.

### Scroll-top
fixed right/bottom; 20px icon; bg `rgba(51,51,51,.9)`; radius 4; hover `#ff7e65`.

## 7. Responsive summary

- **>1265**: сірі поля body.
- **≤976 (UAGB tablet)**: секції-паддинги за таблицею; колонки 2→1 (`stack-tablet`); картки-ряди у стовпчик; CTA stack; місійна картка без наїзду (mt 0, mb 75).
- **≤921 (Astra)**: header → hamburger+dropdown; `.ast-container` без 40px padding; h2 25/h3 20.
- **≤767 (UAGB mobile)**: секції padding 20 sides; стат-картки 50/20; tabs-картки mb 40; галерея-картка padding 20 sides; контакти-колонки stack.
- **≤544 (Astra mobile)**: header 1em; site-title 20px; h1 44.

## 8. Навігація / сторінки

Одна сторінка; 7 пунктів меню (якорі, див. REFERENCE_ANALYSIS §2). Smooth-scroll дефолтний. Sticky-header offset враховувати при anchor-scroll (scroll-margin-top ≈ 70px рекомендовано).

## 9. Контент-копія (для верстки)

- Title: `Офіційний сайт ОСББ "ПРИДНІПРОВСЬКЕ"`.
- Hero caption: `…учасник Асоціації ОСББ Дарницького району міста Києва`.
- Welcome: `Вітаємо на офіційному сайті ОСББ "ПРИДНІПРОВСЬКЕ"` + `Тут ви можете знайти інформацію про наш будинок, переглянути новини та оголошення, ознайомитись з публічними документами, знайти контакти адміністрації та виконавців.`
- Про ОСББ: `ОСББ "ПРИДНІПРОВСЬКЕ" було створено 21 серпня 1999 року з метою управління багатоквартирним житловим будинком, розташованим за адресою: Київ, вулиця Бориса Гмирі, 1/2.`
- Місія: `Утримувати будинок у належному технічному та санітарному стані, забезпечити надання якісних комунальних послуг та комфортне проживання.`
- Будинок: текст про 4 секції, 16 поверхів, метро Позняки 500 м, озеро Срібний кіл тощо (повний у REFERENCE_ANALYSIS / знятому HTML).
- Стати: 13540 / 650 / 294.
- CTA: `Група у Viber` + опис + `ПРИЄДНАТИСЬ ДО ГРУПИ`.
- Оголошення desc: `Не пропустіть важливі оголошення, анонси подій та наші вакансії`.
- Документи desc: `Нормативно-правові та публічні документи, а також зразки документів`.
- Галерея desc: `Фото і відео про життя нашого будинку і про те, що важливо для нас`.
- Контакти: адреса/email/телефони/графік (див. §5 S12).
- Footer: `Copyright © {рік} | ОСББ "ПРИДНІПРОВСЬКЕ"`.
