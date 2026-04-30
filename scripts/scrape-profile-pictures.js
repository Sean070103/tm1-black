import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const DATA_FILE = path.join(process.cwd(), 'lib', 'events-data.ts');
const OUTPUT_FILE = path.join(process.cwd(), 'lib', 'profile-pictures.generated.ts');
const LOCAL_CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function extractProfileUrls(source) {
  const regex = /profileUrl:\s*'([^']+)'/g;
  const urls = [];
  let match;
  while ((match = regex.exec(source)) !== null) {
    urls.push(match[1]);
  }
  return Array.from(new Set(urls));
}

function toTsMap(mapEntries) {
  const body = mapEntries
    .map(({ profileUrl, imageUrl }) => `  '${profileUrl}': '${String(imageUrl).replace(/'/g, "\\'")}'`)
    .join(',\n');

  return `export const profilePicturesByUrl: Record<string, string> = {\n${body}\n};\n`;
}

async function getProfileImage(page, profileUrl) {
  try {
    await page.goto(profileUrl, { waitUntil: 'commit', timeout: 60000 });
    await page.waitForTimeout(2500);
  } catch {
    return '';
  }

  const html = await page.content();
  const patterns = [
    /<meta[^>]+property=["']og:image:secure_url["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+name=["']twitter:image:src["'][^>]+content=["']([^"']+)["']/i,
    /(https:\/\/pbs\.twimg\.com\/profile_images\/[^"'\\\s<]+)/i
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1] && match[1].startsWith('http')) {
      return match[1];
    }
  }

  return '';
}

async function run() {
  const source = fs.readFileSync(DATA_FILE, 'utf8');
  const profileUrls = extractProfileUrls(source);

  if (!profileUrls.length) {
    throw new Error('No profileUrl entries found in lib/events-data.ts');
  }

  const launchOptions = { headless: true };
  if (fs.existsSync(LOCAL_CHROME)) {
    launchOptions.executablePath = LOCAL_CHROME;
  }

  const browser = await chromium.launch(launchOptions);
  const page = await browser.newPage();

  const results = [];
  for (const profileUrl of profileUrls) {
    const imageUrl = await getProfileImage(page, profileUrl);
    results.push({ profileUrl, imageUrl });
    console.log(`${imageUrl ? 'OK' : 'MISS'} ${profileUrl}`);
  }

  await browser.close();

  fs.writeFileSync(OUTPUT_FILE, toTsMap(results), 'utf8');
  console.log(`Saved ${results.length} profile image mappings to ${OUTPUT_FILE}`);
}

run().catch((error) => {
  console.error('Profile picture scrape failed:', error.message);
  process.exitCode = 1;
});
