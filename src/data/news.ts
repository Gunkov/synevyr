import fs from 'node:fs';
import path from 'node:path';

export interface NewsItem {
  slug: string;
  title: string;
  link: string;
  date: string;
  excerpt: string;
  contentHtml: string;
}

function parseMarkdownFile(filePath: string): NewsItem | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const rawSlug = path.basename(filePath, path.extname(filePath)).trim();

    let frontmatter: Record<string, string> = {};
    let body = raw;

    const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (fmMatch) {
      const lines = fmMatch[1].split('\n');
      for (const line of lines) {
        const colonIdx = line.indexOf(':');
        if (colonIdx !== -1) {
          const key = line.slice(0, colonIdx).trim();
          let val = line.slice(colonIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          frontmatter[key] = val;
        }
      }
      body = fmMatch[2].trim();
    }

    const title = frontmatter.title || rawSlug;
    const date = frontmatter.date || '';
    const excerpt = frontmatter.excerpt || body.slice(0, 160).replace(/\\/g, ' ');

    // Markdown paragraphs & line breaks
    const paragraphs = body
      .split(/\r?\n\r?\n/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => {
        if (p.startsWith('# ')) return `<h2>${p.slice(2)}</h2>`;
        if (p.startsWith('## ')) return `<h3>${p.slice(3)}</h3>`;
        if (p.startsWith('### ')) return `<h4>${p.slice(4)}</h4>`;
        if (p.startsWith('<') && p.endsWith('>')) return p;
        return `<p>${p.replace(/\\/g, '<br/>').replace(/\n/g, '<br/>')}</p>`;
      })
      .join('\n');

    return {
      slug: rawSlug,
      title,
      link: `/novyny/${encodeURIComponent(rawSlug)}/`,
      date,
      excerpt,
      contentHtml: paragraphs || `<p>${excerpt}</p>`,
    };
  } catch (e) {
    return null;
  }
}

function parseDate(dateStr: string): number {
  if (!dateStr) return 0;
  const parts = dateStr.split('.');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day).getTime();
  }
  const t = new Date(dateStr).getTime();
  return isNaN(t) ? 0 : t;
}

export async function fetchNews(): Promise<NewsItem[]> {
  try {
    const dir = path.resolve(process.cwd(), 'src/content/news');
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
      const items: NewsItem[] = [];
      for (const f of files) {
        const item = parseMarkdownFile(path.join(dir, f));
        if (item) items.push(item);
      }
      if (items.length > 0) {
        items.sort((a, b) => parseDate(b.date) - parseDate(a.date));
        return items;
      }
    }
  } catch (e) {}

  return [];
}
