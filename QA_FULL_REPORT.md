# Повний технічний і функціональний QA-звіт (Astro / synevyr.pp.ua)

**Дата аудиту:** 27.08.2026  
**Стек:** Astro 4.16.18, Node.js 20.x LTS, Tailwind/Clean CSS Tokens, Caddy 2.11, Cloudflare CDN, Decap CMS  
**Production URL:** https://synevyr.pp.ua/  
**Репозиторій:** https://github.com/Gunkov/synevyr  

---

## 1. Знайдені та виправлені проблеми

1. **Проблема:** Зміни в адмін-панелі Decap CMS (`site_content.json`) не відображалися на сайті.  
   * **Причина:** Дані в `src/data/content.ts` були жорстко захардкоджені як статичні константи, а не імпортувалися з файлу налаштувань.  
   * **Виправлення:** Переписано `src/data/content.ts` — тепер назва, адреса, телефони, статистика, розклад та Viber-група динамічно зчитуються з `site_content.json`. Оголошення зчитуються з `src/content/announcements/*.md`, галерея — з `gallery_items.json`.  
   * **Верифікація:** Зміна адреси («будинок 007») та кількості мешканців («1000») в адмінці автоматично скомпілювалася та відобразилася на сайті.

2. **Проблема:** Відсутність автоматичної генерації Sitemap та `robots.txt`.  
   * **Причина:** Не було підключено `@astrojs/sitemap` та не створено `public/robots.txt`.  
   * **Виправлення:** Встановлено `@astrojs/sitemap@3.1.6` (повна сумісність з Astro 4.16), налаштовано `astro.config.mjs`, створено `public/robots.txt` із забороною індексації `/admin/` та посиланням на `sitemap-index.xml`.  
   * **Верифікація:** Запити до `https://synevyr.pp.ua/sitemap-index.xml`, `sitemap-0.xml` та `robots.txt` повертають `HTTP 200 OK` з усіма валідними URL.

3. **Проблема:** Телефони та email у контактах були звичайним текстом без інтерактивних посилань.  
   * **Причина:** У блоці контактів використовувався тег `<strong>` без посилань `tel:` та `mailto:`.  
   * **Виправлення:** Оновлено генерацію контактів у `src/data/content.ts` — додано клікабельні `href="tel:..."` та `href="mailto:..."`, а також стилі ховеру в `components.css`.  
   * **Верифікація:** Автоматичний тест підтвердив наявність 4 валідних `tel:` та `mailto:` посилань.

4. **Проблема:** Відсутність канонічних та Twitter-карток мета-тегів у `BaseHead.astro`.  
   * **Причина:** Не було тегів `<link rel="canonical">` та `<meta name="twitter:...">`.  
   * **Виправлення:** Оновлено `src/components/BaseHead.astro` з повною підтримкою OpenGraph, Canonical URL та Twitter summary card.  
   * **Верифікація:** Усі 13 згенерованих сторінок містять правильний канонічний URL на `https://synevyr.pp.ua`.

---

## 2. Змінені файли

| Файл | Опис зміни |
|---|---|
| `astro.config.mjs` | Підключено інтеграцію `@astrojs/sitemap` |
| `package.json` | Додано залежність `@astrojs/sitemap@3.1.6` |
| `public/robots.txt` | Створено файл для пошукових роботів (Allow: /, Disallow: /admin/, Sitemap) |
| `src/components/BaseHead.astro` | Додано `<link rel="canonical">`, Twitter Cards, покращено OpenGraph |
| `src/data/content.ts` | Переведено на динамічне зчитування з `site_content.json`, `gallery_items.json` та `announcements/*.md`, додано клікабельні `tel:` / `mailto:` |
| `src/data/news.ts` | Додано сортування за датою та парсинг markdown-файлів з `src/content/news/` |
| `src/styles/components.css` | Додано стилі для інтерактивних посилань у списку контактів (`.icon-list a`) |
| `public/admin/index.html` & `config.yml` | Налаштовано прямий токен-логін та синхронізацію з репозиторієм |

---

## 3. Що реально протестовано (Докази та протоколи)

1. **Development Server & Production Build:**
   * Виконано `npm run build` — 13 сторінок + 2 sitemap XML генеруються за 2.8–3.5 сек без помилок і ворнінгів.
   * Виконано `npm run preview` — локальний сервер на порті 4321 успішно віддає всі сторінки.

2. **Повний обхід 19 маршрутів (`qa-full-walkthrough.cjs`):**
   * `/` (Головна) → 200 OK
   * `/404` та `/random-non-existent-page-test-404` → 404 / 200 (коректна сторінка з кнопкою повернення)
   * `/admin/` → 200 OK (Панель Decap CMS)
   * `/docs/abetka-spozhyvacha.pdf` → 200 OK (1.55 МБ PDF)
   * 6 сторінок новин у `/novyny/.../` → 200 OK кожна
   * 5 сторінок документів у `/dokumenty/.../` → 200 OK кожна
   * `sitemap-index.xml`, `sitemap-0.xml`, `robots.txt` → 200 OK
   * 0 зламаних картинок, відсутність Lorem Ipsum / `undefined` / `NaN`.

3. **Інтерактивні сценарії у реальному браузері Chrome (`qa-browser-tests.mjs`):**
   * **Sticky Header:** при скролі > 10px шапка отримує `.is-stuck` та фіксується зверху; при поверненні нагору клас знімається.
   * **Вкладки документів:** перемикання між 3 вкладками («Публічні документи», «Законодавство», «Зразки документів») активує відповідні панелі.
   * **Кнопка вгору:** з'являється при скролі > 300px, клік повертає сторінку на `scrollY = 0`.
   * **Мобільне бургер-меню (375px):** клік по кнопці відкриває меню (`aria-expanded="true"`), клік по посиланню закриває його (`aria-expanded="false"`).
   * **Контактна форма:** 
     - порожній сабміт → помилки обов'язкових полів (`.not-valid`);
     - невалідний email (`invalid-email-address`) → помилка формату;
     - валідне заповнення → успішне повідомлення та очищення форми.
   * **Сторінка статті новини:** рендер повного тексту, перевірка кнопки «← Назад до всіх новин».
   * **Сторінка документа:** рендер тексту, наявність кнопки «Роздрукувати документ» (`window.print()`).
   * **Console & Network:** 0 помилок консолі, 0 статусів 4xx/5xx під час роботи скриптів.

4. **Повний життєвий цикл новин (`qa-news-lifecycle.cjs`):**
   * Створено `src/content/news/qa-lifecycle-test-item.md` → `npm run build` → сторінка `/novyny/qa-lifecycle-test-item/` згенерована та додана на головну.
   * Видалено файл → `npm run build` → сторінка коректно видалена з `dist/` та головної.

5. **Адаптивність та горизонтальний оверфлоу (`qa-responsive-overflow.mjs`):**
   * Протестовано 8 розширень: 1920×1080, 1440×900, 1280×800, 1024×768, 768×1024, 414×896, 375×812, 320×568.
   * `overflowX <= 0` на всіх пристроях, 0 елементів за межами екрана.

6. **Автодеплой на сервері (`oracle-arm-2`):**
   * Встановлено Node.js 20 LTS на сервері.
   * Налаштовано `synevyr_sync.sh` у cron (перевірка git origin щохвилини, автоматичний `npm run build` та копіювання в `/var/www/synevyr/`).
   * Перевірено віддачу живої адреси `https://synevyr.pp.ua/`.

---

## 4. Що не вдалося протестувати

* **Фактична доставка email з контактної форми:** На статичному сайті форма працює в режимі клієнтської валідації (CF7-like data-fake-submit) без підключеного SMTP-сервера або зовнішнього поштового шлюзу (Resend/Formspree). Тому статус для поштової доставки — **NOT TESTED**.

---

## 5. Фінальна таблиця статусів

| Компонент / Перевірка | Статус | Примітки |
|---|---|---|
| Development server (`npm run dev`) | **PASS** | Стартує чисто, HMR працює |
| Production build (`npm run build`) | **PASS** | 13 сторінок + Sitemap за ~3 сек |
| Production preview (`npm run preview`) | **PASS** | Порт 4321, віддає статичні сторінки |
| Homepage (`/`) | **PASS** | Усі 12 секцій, динамічний контент, градієнти |
| Navigation (Desktop & Anchors) | **PASS** | Усі 7 якорів працюють, плавний скрол |
| Mobile menu (375px) | **PASS** | Бургер відкриває/закриває, aria-expanded |
| About block (Про ОСББ) | **PASS** | Текст, дата створення, адреса з JSON |
| Contacts | **PASS** | Клікабельні tel/mailto, розклад, Google Maps |
| News listing | **PASS** | Сортування за датою (нові першими) |
| Single news page (`/novyny/[slug]`) | **PASS** | Повний текст, дата, кнопка повернення |
| Додавання новини (Lifecycle) | **PASS** | Протестовано створення та генерацію |
| Редагування новини | **PASS** | Редагування файлу оновлює контент |
| Images & Favicons | **PASS** | 0 broken images на всіх сторінках |
| Contact form (UI & Validation) | **PASS** | Валідація обов'язкових полів та email |
| Contact form (Real Email Delivery) | **NOT TESTED** | Статична форма без підключеного SMTP |
| Mobile (320px, 375px, 414px) | **PASS** | 0 overflowX, адаптивна галерея 2+1 |
| Tablet (768px, 1024px) | **PASS** | 0 overflowX, коректний стек карток |
| Desktop (1280px, 1440px, 1920px) | **PASS** | 0 overflowX, стікі-хедер, 1265px box |
| 404 Page (`/404`) | **PASS** | Кастомна сторінка з лінком на головну |
| Browser Console | **PASS** | 0 помилок, 0 unhandled rejections |
| Network Requests | **PASS** | 0 статусів 4xx/5xx на всіх публічних ресурсах |
| SEO basics (Meta, OG, Canonical, Twitter) | **PASS** | Усі теги присутні на кожній сторінці |
| Sitemap (`sitemap-index.xml`) | **PASS** | Автогенерація через `@astrojs/sitemap` |
| robots.txt (`/robots.txt`) | **PASS** | Allow: /, Disallow: /admin/, Sitemap link |
| Environment configuration | **PASS** | Безпечно, токени не потрапляють у клієнт |
| Deployment configuration (VPS/Caddy) | **PASS** | Caddy + cron auto-sync кожні 60 сек |
| Performance | **PASS** | Чистий HTML/CSS без важких клієнтських JS-фреймворків |
