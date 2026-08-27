export interface NewsItem {
  slug: string;
  title: string;
  link: string;
  date: string;
  excerpt: string;
  contentHtml: string;
}

export const FALLBACK_NEWS: NewsItem[] = [
  {
    slug: 'asotsiatsiya-energoaudytoriv-velyka-termomodernizatsiya',
    title: 'Не з утеплення мала б розпочатися Велика термомодернізація',
    link: '/novyny/asotsiatsiya-energoaudytoriv-velyka-termomodernizatsiya/',
    date: '17.02.2022',
    excerpt: 'З огляду на свій досвід спеціалісти Асоціації енергоаудиторів України проаналізували презентовану програму "Велика термомодернізація".',
    contentHtml: '<p>З огляду на свій досвід спеціалісти Асоціації енергоаудиторів України проаналізували презентовану програму "Велика термомодернізація".</p><p>Головний акцент програми має бути зроблено на комплексних заходах з енергоефективності, оптимізації систем опалення та встановленні індивідуальних теплових пунктів з погодним регулюванням.</p>',
  },
  {
    slug: 'rezultaty-konkursu-2022-programy-70-30',
    title: 'Оголошено результати конкурсу 2022 року за програмою “70/30”',
    link: '/novyny/rezultaty-konkursu-2022-programy-70-30/',
    date: '16.02.2022',
    excerpt: 'Оголошено результати Конкурсу проектів з реалізації у 2022 році енергоефективних заходів у житлових будинках ОСББ та ЖБК за програмою "70/30".',
    contentHtml: '<p>Оголошено результати Конкурсу проектів з реалізації у 2022 році енергоефективних заходів у житлових будинках ОСББ та ЖБК за програмою "70/30".</p><p>Переможці конкурсу отримають співфінансування з міського бюджету на термомодернізацію, заміну вікон та модернізацію інженерних мереж.</p>',
  },
  {
    slug: 'velyka-termomodernizatsiya-zvernennya-osbb',
    title: 'Велика термомодернізація: звернення спільноти ОСББ і ЖБК до влади',
    link: '/novyny/velyka-termomodernizatsiya-zvernennya-osbb/',
    date: '16.02.2022',
    excerpt: 'Звернення спільноти ОСББ І ЖБК до представників влади щодо ризиків анонсованої програми “Великої термомодернізації”.',
    contentHtml: '<p>Звернення спільноти ОСББ І ЖБК до представників влади щодо ризиків анонсованої програми “Великої термомодернізації”.</p><p>Спільнота закликає врахувати реальні потреби багатоквартирних будинків та забезпечити прозорі механізми фінансування та аудиту робіт.</p>',
  },
  {
    slug: 'teplovi-nasosy-energomodernizatsiya-budynkiv',
    title: 'Теплові насоси – ключова технологія енергомодернізації будинків',
    link: '/novyny/teplovi-nasosy-energomodernizatsiya-budynkiv/',
    date: '14.02.2022',
    excerpt: 'Теплові насоси - рентабельна технологія, яка вже сьогодні може замінити системи опалення на основі викопного палива у великих масштабах.',
    contentHtml: '<p>Теплові насоси - рентабельна технологія, яка вже сьогодні може замінити системи опалення на основі викопного палива у великих масштабах.</p><p>У доповіді American Council for Energy-Efficient Economy зазначається, що модернізація систем опалення із застосуванням теплових насосів призведе до значної економії енергії.</p>',
  },
  {
    slug: 'prezentatsiya-programy-velykoyi-termomodernizatsiyi-11-02-22',
    title: 'Держава інвестує у велику термомодернізацію 140 млрд грн',
    link: '/novyny/prezentatsiya-programy-velykoyi-termomodernizatsiyi-11-02-22/',
    date: '12.02.2022',
    excerpt: 'Держава планує інвестувати 140 млрд грн у велику термомоденізацію. Перша хвиля термомодернізації у 2022 році охопить 6437 будинків.',
    contentHtml: '<p>Держава планує інвестувати 140 млрд грн у велику термомоденізацію. Перша хвиля термомодернізації у 2022 році охопить 6437 будинків.</p><p>Програма передбачає масштабне утеплення фасадів, модернізацію котелень та терморегуляцію багатоквартирних будинків.</p>',
  },
  {
    slug: 'memorandum-kmda-fond-energoefektyvnosti',
    title: 'Київ планує підписати меморандум з Фондом енергоефективності',
    link: '/novyny/memorandum-kmda-fond-energoefektyvnosti/',
    date: '11.02.2022',
    excerpt: 'КМДА та Фонд енергоефективності обговорили можливості співпраці у напрямку енергомодернізації житлового фонду Києва.',
    contentHtml: '<p>КМДА та Фонд енергоефективності обговорили можливості співпраці у напрямку енергомодернізації житлового фонду Києва.</p><p>Співпраця дозволить залучити додаткові грантові ресурси для столичних ОСББ та ЖБК.</p>',
  },
];

function decodeEntities(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#8220;|&ldquo;/g, '“')
    .replace(/&#8221;|&rdquo;/g, '”')
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function formatDate(pubDate: string): string {
  const d = new Date(pubDate);
  if (isNaN(d.getTime())) return pubDate;
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()}`;
}

function slugify(text: string): string {
  const map: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ye', ж: 'zh',
    з: 'z', и: 'y', і: 'i', ї: 'yi', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n',
    о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts',
    ч: 'ch', ш: 'sh', щ: 'shch', ь: '', ю: 'yu', я: 'ya'
  };
  return text
    .toLowerCase()
    .replace(/[«»“”"']/g, '')
    .replace(/[а-яіїєґ0-9a-z]+/gi, (w) =>
      w.split('').map((c) => map[c] || c).join('')
    )
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function extractSlug(url: string, title: string): string {
  const m = url.match(/aosbb\.kiev\.ua\/([^/]+)\/?$/);
  return (m && m[1]) ? m[1] : slugify(title);
}

const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; synevyr-site-build)' };

async function fetchPostDetails(link: string): Promise<{ excerpt: string; contentHtml: string }> {
  try {
    const res = await fetch(link, { headers: UA });
    if (!res.ok) return { excerpt: '', contentHtml: '' };
    const html = await res.text();
    const og =
      html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i) ??
      html.match(/<meta\s+content=["']([^"']*)["']\s+property=["']og:description["']/i);
    const excerpt = og ? decodeEntities(og[1]).replace(/\s+/g, ' ').trim() : '';

    const articleMatch = html.match(/<article[\s\S]*?<\/article>/i);
    const art = articleMatch ? articleMatch[0] : html;

    const cleaned = art
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<header class="entry-header"[\s\S]*?<\/header>/gi, '')
      .replace(/<footer class="entry-footer"[\s\S]*?<\/footer>/gi, '')
      .replace(/<div class="[^"]*hustle-[^"]*"[\s\S]*?<\/div>/gi, '')
      .replace(/<div class="[^"]*sharedaddy[^"]*"[\s\S]*?<\/div>/gi, '');

    const blocks = [...cleaned.matchAll(/<(p|ul|ol|blockquote|h2|h3|h4|figure|table)\b[^>]*>([\s\S]*?)<\/\1>/gi)]
      .map((m) => m[0].trim())
      .filter((b) => !b.includes('hustle-') && !b.includes('sharedaddy') && !b.includes('wp-block-uagb'));

    const contentHtml = blocks.join('\n');
    return { excerpt, contentHtml };
  } catch {
    return { excerpt: '', contentHtml: '' };
  }
}

function truncate(s: string, max = 160): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const sp = cut.lastIndexOf(' ');
  return `${(sp > 40 ? cut.slice(0, sp) : cut).replace(/[\s,;:.]+$/, '')}…`;
}

export async function fetchNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch('https://aosbb.kiev.ua/feed/', { headers: UA });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const items: Array<{ title: string; sourceLink: string; date: string; slug: string }> = [];
    for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
      const chunk = m[1];
      const pick = (tag: string): string => {
        const r = chunk.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
        return r ? decodeEntities(r[1]) : '';
      };
      const title = pick('title');
      const sourceLink = pick('link');
      if (!title || !sourceLink) continue;
      const slug = extractSlug(sourceLink, title);
      items.push({
        title,
        sourceLink,
        date: formatDate(pick('pubDate')),
        slug,
      });
      if (items.length >= 6) break;
    }

    const newsItems: NewsItem[] = await Promise.all(
      items.map(async (it) => {
        const details = await fetchPostDetails(it.sourceLink);
        const excerpt = truncate(details.excerpt) || `Сообщение ${it.title} появились сначала на АОСББ.`;
        return {
          slug: it.slug,
          title: it.title,
          link: `/novyny/${it.slug}/`,
          date: it.date,
          excerpt,
          contentHtml: details.contentHtml || `<p>${excerpt}</p>`,
        };
      })
    );

    return newsItems.length ? newsItems : FALLBACK_NEWS;
  } catch {
    return FALLBACK_NEWS;
  }
}
