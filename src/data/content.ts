import fs from 'node:fs';
import path from 'node:path';
import siteSettings from './site_content.json';
import galleryData from './gallery_items.json';

const siteName = siteSettings.name || 'ОСББ "Синевирій"';
const siteAddress = siteSettings.address || '02140, Київ, вулиця Бориса Гмирі, будинок 777';
const siteEmail = siteSettings.email || 'sin@ukr.net';
const sitePhones = siteSettings.phones || '044 000 11 22, 067 000 11 22';
const siteEmergency = siteSettings.phone_emergency || '044 587 86 40';
const siteElevator = siteSettings.phone_elevator || '044 573 17 48';
const siteSchedule = siteSettings.schedule || 'Графік роботи: Пн – Пт з 09:00 до 18:00, перерва з 13:00 до 14:00';
const siteViber = siteSettings.viber_group || 'Актив Гмирі 777';
const siteFoundation = siteSettings.foundation_date || '24 серпня 2024 року';

export const SITE = {
  title: `Офіційний сайт ${siteName}`,
  description: `Вітаємо на офіційному сайті ${siteName}. Тут ви можете знайти інформацію про наш будинок, контакти адміністрації та інше.`,
  name: siteName,
};

export const MENU = [
  { label: 'Головна', href: '/' },
  { label: 'Новини', href: '/#novyny' },
  { label: 'Про ОСББ', href: '/#pro-osbb' },
  { label: 'Оголошення', href: '/#informatsiya' },
  { label: 'Документи', href: '/#dokumenty' },
  { label: 'Галерея', href: '/#galereya' },
  { label: 'Контакти', href: '/#kontakty' },
];

export const HERO = {
  image: '/img/image.jpg',
  alt: siteName,
  caption: '',
};

export const WELCOME = {
  titleLines: ['Вітаємо на офіційному сайті ', siteName],
  text: 'Тут ви можете знайти інформацію про наш будинок, переглянути новини та оголошення, ознайомитись з публічними документами, знайти контакти адміністрації та виконавців.',
};

export const ABOUT_OSBB = {
  title: `Про ${siteName}`,
  text: `${siteName} було створено ${siteFoundation} з метою управління багатоквартирним житловим будинком, розташованим за адресою: ${siteAddress}.`,
};

export const MISSION = {
  title: 'НАША МІСІЯ',
  text: 'Утримувати будинок у належному технічному та санітарному стані, забезпечити надання якісних комунальних послуг та комфортне проживання.',
};

export const HOUSE = {
  title: 'НАШ БУДИНОК',
  html: 'Житловий будинок розташований на відстані 500 м від станції метро “Позняки”, навпроти – озеро Срібний кіл. Будинок складається з чотирьох секцій та має 16 поверхів, в плані нагадує латинську букву S з внутрішнім двором. На першому поверсі розміщені продовольчий магазин, аптека, салон краси і банк. З другого поверху починаються одно, двох, трьох і чотирьохкімнатні квартири. У кожну квартиру проведено лінії телефонного зв’язку, кабельного інтернету і телебачення. Прилегла до будинку територія огороджена, тротуари вимощені плиткою, навколо будинку облаштована паркова зона. Також на прибудинковій території розміщені автостоянка, спортивний і дитячий майданчики.',
};

export const STATS = [
  { number: String(siteSettings.stat_area || '13540'), label: 'ЗАГАЛЬНА ЖИТЛОВА ПЛОЩА' },
  { number: String(siteSettings.stat_residents || '650'), label: 'КІЛЬКІСТЬ МЕШКАНЦІВ' },
  { number: String(siteSettings.stat_apartments || '294'), label: 'КІЛЬКІСТЬ КВАРТИР' },
];

export const CTA = {
  title: 'Група у Viber',
  text: `З метою організації спілкування між співвласниками та правлінням; обговорення проблем, ініціатив та порядку денного загальних зборів; оперативного повідомлення важливої інформації та пересилання документів створена група у Viber “${siteViber}”. `,
  button: 'ПРИЄДНАТИСЬ ДО ГРУПИ',
  href: '#kontakty',
};

export const BAND_INFORMATSIYA = {
  id: 'informatsiya',
  title: 'Оголошення',
  desc: 'Не пропустіть важливі оголошення, анонси подій та наші вакансії',
};

const DEFAULT_ANNOUNCEMENTS = [
  {
    icon: '/img/informatsiya-ikonka-red.jpg',
    title: 'ОГОЛОШЕННЯ',
    html: '<strong>Шановні мешканці будинку!</strong> У зв’язку зі зростанням захворюваності на коронавірус рекомендуємо дотримуватись наступних правил карантину:<br/>– за межами квартири користуйтесь масками та рукавичками, не торкайтеся руками обличчя;<br/>– тримайте дистанцію між людьми не менше 1,5 метра;<br/>– уникайте скупчення людей, не збирайтесь у групи;<br/>– не торкайтесь голими руками&nbsp;ручок&nbsp;вхідних дверей, перил, кнопок та стін у ліфті;<br/>– намагайтеся ходити сходами і не користуватися ліфтом;<br/>– обмежте контакти з людьми, які не проживають разом з вами;<br/>– періодично протирайте дезінфекуючими засобами ручки вхідних дверей у своїй квартирі;<br/>– помийте руки з милом щойно зайдете до квартири;<br/>– не відкладайте звернення до лікаря у разі високої температури і утрудненого дихання.<br/><strong>Бережіть себе і своїх близьких!</strong>',
  },
  {
    icon: '/img/informatsiya-ikonka.jpg',
    title: 'ОГОЛОШЕННЯ',
    html: '<strong>Шановні співвласники!</strong> Утримання нашого будинку і приведення його в належний санітарний і технічний стан вимагає постійних витрат. Основне джерело коштів на проведення всіх необхідних робіт та заходів – це внески співвласників будинку. Просимо своєчасно сплачувати внески і не допускати заборгованості. Щиро сподіваємось на Ваше розуміння.',
  },
  {
    icon: '/img/informatsiya-ikonka.jpg',
    title: 'ОГОЛОШЕННЯ',
    html: '<strong>Шановні підприємці!</strong> Пропонуємо розміщення реклами на фасадах нашого будинку. Звертаємо увагу на привабливе розташування будинку, який знаходиться поблизу метро та на перетині пішохідних маршрутів, а по проспекту Бажана щодня проїжджають тисячі автомобілів і пасажирів. Поруч розташовані супермаркети BILLA, NOVUS, METRO, навпроти ресторан McDonald’s. Вашу рекламу побачать тисячі клієнтів.',
  },
];

function getAnnouncements() {
  try {
    const dir = path.resolve(process.cwd(), 'src/content/announcements');
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
      if (files.length > 0) {
        return files.map((f) => {
          const raw = fs.readFileSync(path.join(dir, f), 'utf8');
          let title = 'ОГОЛОШЕННЯ';
          let icon = '/img/informatsiya-ikonka.jpg';
          let html = raw;
          const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
          if (fmMatch) {
            const lines = fmMatch[1].split('\n');
            for (const line of lines) {
              const colonIdx = line.indexOf(':');
              if (colonIdx !== -1) {
                const key = line.slice(0, colonIdx).trim();
                const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
                if (key === 'title') title = val;
                if (key === 'icon_type' && val === 'red') icon = '/img/informatsiya-ikonka-red.jpg';
              }
            }
            html = fmMatch[2].trim().replace(/\r?\n/g, '<br/>');
          }
          return { icon, title, html };
        });
      }
    }
  } catch (e) {}
  return DEFAULT_ANNOUNCEMENTS;
}

export const ANNOUNCEMENTS = getAnnouncements();

export const BAND_DOKUMENTY = {
  id: 'dokumenty',
  title: 'Документи',
  desc: 'Нормативно-правові та публічні документи, а також зразки документів',
};

export const BAND_GALEREYA = {
  id: 'galereya',
  title: 'Галерея',
  desc: 'Фото і відео про життя нашого будинку і про те, що важливо для нас',
};

export type DocCard = { title: string; href: string; target?: string };
export type DocTab = { label: string; cards: DocCard[] };

export const DOC_TABS: DocTab[] = [
  {
    label: 'Публічні документи',
    cards: [
      {
        title: 'Абетка споживача комунальних послуг',
        href: '/docs/abetka-spozhyvacha.pdf',
        target: '_blank',
      },
      { title: `Статут ОСББ<br/>“${siteName.replace(/^ОСББ\s*["“]?|["”]?$/g, '')}”`, href: '/dokumenty/statut/' },
      { title: `Протокол загальних зборів ${siteName}`, href: '/dokumenty/protokol-zboriv/' },
    ],
  },
  {
    label: 'Законодавство',
    cards: [
      {
        title: 'Закон України “Про об’єднання співвласників багатоквартирного будинку”',
        href: 'https://zakon.rada.gov.ua/laws/show/2866-14#Text',
        target: '_blank',
      },
      {
        title: 'Закон України “Про житлово-комунальні послуги”',
        href: 'https://zakon.rada.gov.ua/laws/show/2189-19#Text',
        target: '_blank',
      },
      {
        title: 'Закон України “Про енергозбереження”',
        href: 'https://zakon.rada.gov.ua/laws/show/74/94-%D0%B2%D1%80#Text',
        target: '_blank',
      },
    ],
  },
  {
    label: 'Зразки документів',
    cards: [
      { title: 'Зразок заяви співвласника', href: '/dokumenty/zayava-spivvlasnyka/' },
      { title: 'Зразок акту-претензії', href: '/dokumenty/akt-pretenziya/' },
      { title: 'Зразок звернення до правління', href: '/dokumenty/zvernennya-pravlinnya/' },
    ],
  },
];

export const GALLERY = (galleryData && galleryData.items && galleryData.items.length > 0)
  ? galleryData.items.map((it: { src: string; alt?: string }) => ({
      src: it.src,
      alt: it.alt || '',
      width: 1024,
      height: 768,
    }))
  : [
      { src: '/img/01.jpg', alt: '', width: 1024, height: 768 },
      { src: '/img/02.jpg', alt: '', width: 961, height: 622 },
      { src: '/img/03.jpg', alt: '', width: 1024, height: 768 },
    ];

export const CONTACTS = {
  heading: 'Контакти',
  listTitle: 'Контакти адміністрації та виконавців',
  scheduleText: siteSchedule,
  items: [
    { icon: 'map-marker-alt', html: `<strong>${siteAddress}</strong>` },
    { icon: 'envelope', html: `<strong>${siteEmail}</strong>` },
    { icon: 'phone-alt', html: `<strong> ${sitePhones}</strong>` },
    { icon: 'phone-alt', html: `<strong>${siteEmergency} – Аварійна служба</strong>` },
    { icon: 'phone-alt', html: `<strong>${siteElevator} – Ліфтова служба</strong>` },
  ],
  mapSrc: `https://www.google.com/maps?q=${encodeURIComponent(siteAddress)}&hl=uk&z=15&output=embed`,
  mapHeight: 248,
};

export const FORM = {
  fields: {
    name: 'Ваше ім’я (обов’язково)',
    email: 'Ваш email (обов’язково)',
    phone: 'Ваш телефон',
    message: 'Ваше повідомлення чи запитання (обов’язково)',
  },
  submit: 'ВІДПРАВИТИ',
  messages: {
    success: 'Дякуємо за ваше повідомлення. Воно було успішно відправлене.',
    error: 'Виникла помилка під час відправлення форми. Перевірте заповнені поля та спробуйте ще раз.',
    required: 'Поле обов’язкове.',
    invalidEmail: 'Адреса електронної пошти, вказана у формі, недійсна.',
  },
};
