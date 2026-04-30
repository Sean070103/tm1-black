import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const LUMA_PAST_EVENTS_URL = 'https://luma.com/Team1Philippines?period=past';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop';

function escapeTsString(value) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

function formatAsTs(events) {
  const items = events
    .map((event) => `  {
    id: ${event.id},
    title: \`${escapeTsString(event.title)}\`,
    date: \`${escapeTsString(event.date)}\`,
    time: \`${escapeTsString(event.time)}\`,
    location: \`${escapeTsString(event.location)}\`,
    description: \`${escapeTsString(event.description)}\`,
    image: \`${escapeTsString(event.image)}\`,
    attendees: ${event.attendees},
    status: 'past',
    link: \`${escapeTsString(event.link)}\`
  }`)
    .join(',\n');

  return `export const scrapedLumaEvents = [\n${items}\n];\n`;
}

async function scrapeLumaEvents() {
  let browser;
  try {
    console.log('Starting browser...');
    const chromeExecutablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const launchOptions = {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    };
    if (fs.existsSync(chromeExecutablePath)) {
      launchOptions.executablePath = chromeExecutablePath;
    }

    browser = await puppeteer.launch(launchOptions);

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1800 });
    console.log('Navigating to Luma past events page...');
    await page.goto(LUMA_PAST_EVENTS_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    });

    const calendarApiId = await page.evaluate(() => {
      const nextData = document.querySelector('#__NEXT_DATA__')?.textContent;
      if (!nextData) return null;
      const parsed = JSON.parse(nextData);
      return parsed?.props?.pageProps?.initialData?.data?.calendar?.api_id || null;
    });

    if (!calendarApiId) {
      throw new Error('Could not resolve calendar_api_id from page data.');
    }

    const scraped = await page.evaluate(async ({ calendarApiId, fallbackImage }) => {
      const allEntries = [];
      let cursor = null;
      let hasMore = true;
      let pageCount = 0;

      while (hasMore && pageCount < 20) {
        const params = new URLSearchParams({
          calendar_api_id: calendarApiId,
          pagination_limit: '20',
          period: 'past'
        });
        if (cursor) params.set('pagination_cursor', cursor);

        const response = await fetch(`https://api2.luma.com/calendar/get-items?${params.toString()}`);
        if (!response.ok) break;

        const payload = await response.json();
        const entries = Array.isArray(payload.entries) ? payload.entries : [];
        allEntries.push(...entries);

        hasMore = Boolean(payload.has_more);
        cursor = payload.next_cursor || null;
        pageCount += 1;
        if (!hasMore || !cursor) break;
      }

      return allEntries.map((entry) => {
        const event = entry.event || {};
        const city = event?.geo_address_info?.city_state || event?.geo_address_info?.city || '';
        return {
          title: event.name || 'Untitled event',
          date: event.start_at || '',
          time: '',
          location: city,
          description: entry?.calendar?.description_short || '',
          image: event.cover_url || fallbackImage,
          attendees: entry.guest_count || 0,
          status: 'past',
          link: event.url ? `https://luma.com/${event.url}` : 'https://luma.com/Team1Philippines'
        };
      });
    }, { calendarApiId, fallbackImage: FALLBACK_IMAGE });

    const events = scraped
      .filter((event) => event.title && event.link)
      .map((event, index) => ({ id: index + 1, ...event }));

    if (!events.length) {
      throw new Error('No events were scraped from the page.');
    }

    const publicOutputPath = path.join(process.cwd(), 'public', 'luma-events.json');
    const generatedTsPath = path.join(process.cwd(), 'lib', 'luma-events.generated.ts');

    fs.writeFileSync(publicOutputPath, JSON.stringify(events, null, 2), 'utf8');
    fs.writeFileSync(generatedTsPath, formatAsTs(events), 'utf8');

    console.log(`Saved ${events.length} events to ${publicOutputPath}`);
    console.log(`Saved generated TypeScript data to ${generatedTsPath}`);
    return events;
  } finally {
    if (browser) await browser.close();
  }
}

scrapeLumaEvents().catch((error) => {
  console.error('Error scraping Luma events:', error.message);
  process.exitCode = 1;
});
