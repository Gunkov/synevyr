# VISUAL_AUDIT_01 — prydniprovske.aosbb.kiev.ua vs локальна реалізація

**Дата:** 2026-08-23
**Метод:** CDP (Chrome DevTools Protocol), computed styles + getBoundingClientRect на обох сайтах у viewport 1920×1080 та 375×812; повносторінкові скріншоти.
**Джерела:** `metrics-ref.json`, `metrics-ref2.json` (reference), `metrics-mine.json` (local), скріншоти `audit/ref-*.png`, `audit/mine-*.png`.

**Загальна оцінка:** базова типографіка (root 15px, Roboto), палітра, контейнер 1265px, header 69px, логотип, кнопки, радіуси 10px/50px, тіні (відсутні) — збігаються. Головні розбіжності — **зламана багатостовпчикова сітка** (flex-wrap + % ширини + фіксовані margin-right), **нересетнуті UA-маржини заголовків**, **line-height** та **мобільні паддинги контейнера**.

Сторінка без сайдбару (односторінковик) — пункт «Sidebar width» N/A.

---

## CRITICAL

### 1. Desktop: усі багатостовпчикові рядки переносяться (flex-wrap overflow)
- **Element:** `.mission-row`, `.stats-row`, `.ann-row`, `.row-docs` (tabs), `.contacts-row`
- **Reference:** місія+будинок в один ряд (448px + 667px, gap 50); статистика 3×375px gap 20; оголошення 2 колонки 461+461 (gap ~81, інсет ~80); документи 3 картки в ряд (~322–373px); контакти 2 колонки 558+558.
- **Current:** місія над будинком (стовпчики); статистика 2+1; оголошення 3 картки в один стовпчик; документи 2+1; контакти інфо над формою.
- **Відмінність:** сума ширин дітей `.cols` = 100% + фіксовані `margin-right` (20/50px) > 100% → wrap. Reference використовує ширини з урахуванням gap (Gutentor columns).
- **Suggested fix:** замінити `% + margin-right` на `gap` у `.cols` та `width: calc(...)` (напр. `calc((100% - 40px)/3)` для 3-х колонок, `calc(50% - 25px)` для двох); або flex-basis з `box-sizing` і gap. Перевірити всі 5 рядків на 1920.
- **Priority:** CRITICAL

### 2. Mobile: статистика не стає в стовпчик
- **Element:** `.stat-card` @375
- **Reference:** 3 картки full-width 335px, вертикальний gap 40px.
- **Current:** картки лишаються ~33% (112px) у 2+1; число «13540» переноситься по рядках («13 / 54 / 0»).
- **Відмінність:** немає mobile-правила `width:100%` для `.stat-card`; gap 50 замість 40.
- **Suggested fix:** @max-width 767: `.stat-card{width:100%; margin-right:0}` + `margin-bottom:40px` (останній 0).
- **Priority:** CRITICAL

---

## HIGH

### 3. Mobile: контейнер без бокових паддингів (контент впритул до країв)
- **Element:** `.container` / секції @375
- **Reference:** `.ast-container` padding 0 20px на мобільному; заголовок сайту x=20; картки 335px; doc-картки 335px.
- **Current:** padding 0 → site-title x=10 (лише від padding branding), doc-картки full-bleed 375px, hero/секції впритул.
- **Suggested fix:** @max-width 921: `.container{padding-left:20px;padding-right:20px}` (або секційні паддинги 20px, як у ref); прибрати компенсаторні padding у branding.
- **Priority:** HIGH

### 4. UA margin-top заголовків не обнулений
- **Element:** `h1, h2, h3` (welcome h1, band h2, contacts h2, house h3)
- **Reference:** margin-top 0 скрізь (Astra reset): h2 band `0 0 20px` (informatsiya/dokumenty/galereya) / `0 0 15px` (pro-osbb, kontakty); h1 `…mb 20px`.
- **Current:** h2 margin `22.78px 0 15px`; h1 має ~27px top; house h3 `16.08 0 15`.
- **Suggested fix:** `h1,h2,h3{margin-top:0}`; band h2 margin-bottom 20px (15 для pro-osbb/kontakty).
- **Priority:** HIGH

### 5. Body line-height: normal замість 1.857
- **Element:** `body`, `p` (desc, about-text, infobox-desc, ann text, excerpt)
- **Reference:** body lh 27.857px (1.857); усі абзаци 27.857 (18px-тексти — 33.43).
- **Current:** `line-height: normal` → абзаци щільніші (excerpt 24.75, desc normal).
- **Suggested fix:** `body{line-height:1.8571}`; перевірити, що `.welcome-desc/.band-desc/.about-text/.cta-text` успадковують (18px → 33.43).
- **Priority:** HIGH

### 6. Line-height заголовків
- **Element:** h1/h2/h3
- **Reference:** h1 48px (1.2), h2 44.2 (1.3), h3 33.6 (1.4), mobile h1 40.8.
- **Current:** 53.2 / 45.22 / 31.92 (≈1.33 скрізь).
- **Suggested fix:** h1{line-height:1.2} h2{1.3} h3{1.4}.
- **Priority:** HIGH

### 7. Статистика: вага та line-height чисел/міток
- **Element:** `.stat-number`, `.stat-label`
- **Reference:** число 54px **weight 400**, lh 100.29px; мітка 15px **weight 400**.
- **Current:** weight 700, lh 59.4; мітка 700.
- **Suggested fix:** `font-weight:400` обом; `.stat-number{line-height:1.857}`; картка тоді ≈378px, як у ref.
- **Priority:** HIGH

### 8. Menu links: font-weight 400 замість 500
- **Element:** `.menu-link` (desktop + mobile)
- **Reference:** 15px/500.
- **Current:** 15px/400.
- **Suggested fix:** `font-weight:500`.
- **Priority:** HIGH

### 9. Mobile header: висота 55px замість 85px
- **Element:** `.main-header-bar` @375
- **Reference:** 85px (padding 15px 0 + branding 54px + border).
- **Current:** 55px (padding 0; 15px зашиті всередині branding).
- **Suggested fix:** @max-width 921: `.main-header-bar{padding:15px 0}`; branding padding прибрати.
- **Priority:** HIGH

### 10. Форма: розмір інпутів
- **Element:** `.cform input`, `label`
- **Reference:** input 15px, h=40; label 13px lh 24.14.
- **Current:** input 13px, h=37; label lh 18.2.
- **Suggested fix:** input{font-size:15px}; label{line-height:1.857}.
- **Priority:** HIGH

### 11. Новини: підкреслення посилань
- **Element:** `.rss-title a`
- **Reference:** text-decoration none.
- **Current:** underline.
- **Suggested fix:** `text-decoration:none` (+ hover underline опційно, як у WP).
- **Priority:** HIGH

### 12. Оголошення: вертикальний ритм секції
- **Element:** `.sec-ann`, gap карток
- **Reference:** секція padding 0 (картки йдуть одразу після band, візуальний відступ ~80 за рахунок band pb 100); gap між картками ≈82px; інсет ряду ≈80px з обох боків.
- **Current:** `.sec-ann{padding:100px}` (+200px зайвої висоти); gap 20px; інсет 50px.
- **Suggested fix:** padding 0; колонки з інсетом 80px і gap ~80px (у mobile gap ~82 теж).
- **Priority:** HIGH

### 13. Footer: висота та кегль
- **Element:** `.site-footer`
- **Reference:** h=103 (desktop) / 84 (mobile), текст 15px, вертикальні паддинги ≈38px.
- **Current:** h=79 / 55, текст 14px.
- **Suggested fix:** `.footer-text{font-size:15px}`; паддинги контейнера ≈38px 0.
- **Priority:** HIGH

---

## MEDIUM

### 14. Hero: паддинги секції та ширина картинки
- **Reference:** padding 40/40/20/40; img 1185×533.
- **Current:** 40/20/40/40; img 1200×540 (inner 1200 ширший за ref-контент 1185).
- **Fix:** right 40, bottom 20; `.inner` у hero = 100% контейнера (1185).
- **Priority:** MEDIUM

### 15. Hero caption кегль
- **Reference:** 20px (desktop і mobile).
- **Current:** 18.75px / 16px.
- **Fix:** 20px.
- **Priority:** MEDIUM

### 16. Band desc: UA-маржини абзацу
- **Reference:** `.uagb-desc-text` margin 0.
- **Current:** margin 18px 0 12.96px.
- **Fix:** `.band-desc{margin:0}`.
- **Priority:** MEDIUM

### 17. Новини: сепаратор
- **Reference:** border-top 4px #78bca1.
- **Current:** 3px #00637f.
- **Fix:** 4px; колір #78bca1.
- **Priority:** MEDIUM

### 18. Новини: вага заголовка НОВИНИ
- **Reference:** `<h3><strong>` → візуально 700.
- **Current:** 500, без strong.
- **Fix:** обгорнути в `<strong>` (як у mission/house).
- **Priority:** MEDIUM

### 19. Оголошення: іконки та колір заголовків карток
- **Reference:** іконка 60×73 (рідні пропорції); заголовок #3a3a3a.
- **Current:** 60×60 (сплющена); заголовок rgba(1,22,39,.75).
- **Fix:** height auto (60×73); колір #3a3a3a.
- **Priority:** MEDIUM

### 20. Документи: іконка та колір заголовка картки
- **Reference:** іконка 120×96; заголовок 20px #3a3a3a lh 28.
- **Current:** 120×120; #00637f lh 26.6.
- **Fix:** висота auto; колір #3a3a3a; lh 1.4.
- **Priority:** MEDIUM

### 21. Таби: висота item та колір title
- **Reference:** item h=57 (desktop); title колір rgba(1,22,39,.75).
- **Current:** h=43; title #929aa3 (--c-muted), 16px base.
- **Fix:** title color rgba(1,22,39,.75); збільшити lh/padding до h≈57 (title 18px lh ~1.83 або padding 14/16).
- **Priority:** MEDIUM

### 22. НАШ БУДИНОК: зайвий сепаратор
- **Reference:** після h3 одразу текст (сепаратора немає).
- **Current:** `.house-sep` 4px teal.
- **Fix:** прибрати елемент.
- **Priority:** MEDIUM

### 23. Mobile: кегль band h2
- **Reference:** 34px на 375 (окрім «Про ОСББ» = 25px).
- **Current:** 25px скрізь.
- **Fix:** @max-width 921: band h2 34px; pro-osbb 25px.
- **Priority:** MEDIUM

### 24. Місія: пропорції колонок
- **Reference:** 448/667 (≈38.6%/57.7%) gap 50.
- **Current:** 40%/60% + 50 → 466/649.
- **Fix:** width calc(38.6%…) або flex 0 0 448px-подібні пропорції.
- **Priority:** MEDIUM (вплив невеликий)

### 25. Mobile footer висота — див. #13 (частина того ж фіксу).

---

## LOW

### 26. Загальна висота сторінки
- **Reference:** 7223px (desktop) / 11572 (mobile).
- **Current:** 8541 / 10086.
- **Причина:** наслідки #1, #4, #12, #2. Після фіксів має збігтись ±100px.
- **Priority:** LOW (контрольний метричний чек)

### 27. Welcome h1: пробіл перед `<br>`
- **Reference:** `сайті <br>ОСББ` (текст копіюється з пробілом).
- **Current:** без пробілу.
- **Fix:** додати пробіл у перший рядок titleLines.
- **Priority:** LOW

---

## Збігається (перевірено, фікси не потрібні)

- Wrapper 1265px, body bg #ebebeb, текст rgba(1,22,39,.75), Roboto.
- Header 69px desktop, border-bottom 1px #eae9e9, логотип 32px Roboto Condensed 700 @x368.
- Menu padding 0 15px, lh 60px, gap 0; mobile lh 45px pad 0 20px.
- Band паддинги 75/50/100/50; kontakty 100/50/20/50; novyny 0/50/50/50.
- Кольори градієнтів секцій (#3e88b3→#285773, #e5ebee→#fff, #e6f0f6, #234d65).
- Кнопки: 15px/700, pad 15/30 (submit 15/25), radius 50, #ff7e65, border 1px.
- Радіуси карток 10px; тіні відсутні; таби bg #e6f0f6/#eff2f5, border 2px, panel pt 40.
- Галерея: біла картка + «ФОТОГАЛЕРЕЯ» + teal-сепаратор + 3 зображення 344×258.
- Контакти: іконки #7799ad 20px, gap 10px, label 15px bold white; графік 18px; iframe h248.
- Форма: bg #fafafa, border 1px #e6f0f6, radius 0, textarea h150, submit 146×47.
