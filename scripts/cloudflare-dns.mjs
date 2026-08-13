/**
 * Dodaje do Cloudflare rekordy DNS wymagane przez Resend do weryfikacji
 * domeny lapchwile.com (nadawca maili z formularzy).
 *
 * Wymaga tokenu API Cloudflare z uprawnieniem Zone -> DNS -> Edit,
 * ograniczonego do strefy lapchwile.com. Token wklej do .env.local jako:
 *   CLOUDFLARE_API_TOKEN=...
 *
 * Uruchomienie:  node scripts/cloudflare-dns.mjs          (podglad, nic nie zmienia)
 *                node scripts/cloudflare-dns.mjs --apply  (dodaje rekordy)
 *
 * Skrypt jest idempotentny: rekordy, ktore juz istnieja z ta sama wartoscia,
 * sa pomijane. Rekordu _dmarc CELOWO nie dodajemy - domena ma juz wlasny
 * (v=DMARC1;p=none), a druga kopia uniewaznilaby polityke DMARC.
 */
import { readFileSync } from "node:fs";

const ZONE = "lapchwile.com";
const API = "https://api.cloudflare.com/client/v4";

const RECORDS = [
  {
    type: "MX",
    name: `send.${ZONE}`,
    content: "feedback-smtp.eu-west-1.amazonses.com",
    priority: 10,
    comment: "Resend: bounce/feedback",
  },
  {
    type: "TXT",
    name: `send.${ZONE}`,
    content: "v=spf1 include:amazonses.com ~all",
    comment: "Resend: SPF (subdomena send, nie koliduje z SPF Zoho w rootcie)",
  },
  {
    type: "TXT",
    name: `resend._domainkey.${ZONE}`,
    content:
      "p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBihII7CUZGUbwPr0UnQWALYu1TrqFNCkDl+KbthMXlUX9+dLVVS/XTgW1KiaNQze5458Vicu+syqVN1HoOPwrj/df5Tb4IiJyiQwbIv2TcjUbMKOquoELwDZW708hsbg/bZU9ULJDARWBGlR0Um3FFKP+2teU6Vx8RQ+0v72fSQIDAQAB",
    comment: "Resend: DKIM",
  },
];

function readToken() {
  if (process.env.CLOUDFLARE_API_TOKEN) return process.env.CLOUDFLARE_API_TOKEN;
  try {
    const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    const line = env.split("\n").find((l) => l.startsWith("CLOUDFLARE_API_TOKEN="));
    if (line) return line.slice("CLOUDFLARE_API_TOKEN=".length).trim().replace(/^"|"$/g, "");
  } catch {
    // brak pliku .env.local
  }
  return null;
}

async function cf(token, path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
  const body = await response.json();
  if (!body.success) {
    const message = (body.errors ?? []).map((e) => `${e.code}: ${e.message}`).join("; ");
    throw new Error(message || `HTTP ${response.status}`);
  }
  return body.result;
}

const apply = process.argv.includes("--apply");
const token = readToken();

if (!token) {
  console.error(
    "Brak CLOUDFLARE_API_TOKEN.\n" +
      "Utworz token: dash.cloudflare.com -> My Profile -> API Tokens -> Create Token\n" +
      "  szablon: Edit zone DNS,  Zone Resources: Include -> Specific zone -> lapchwile.com\n" +
      "Nastepnie wklej go do .env.local jako CLOUDFLARE_API_TOKEN=..."
  );
  process.exit(1);
}

const zones = await cf(token, `/zones?name=${ZONE}`);
if (zones.length === 0) {
  console.error(`Token nie widzi strefy ${ZONE}. Sprawdz uprawnienia tokenu.`);
  process.exit(1);
}
const zoneId = zones[0].id;
console.log(`Strefa ${ZONE} (${zoneId})\n`);

const existing = await cf(token, `/zones/${zoneId}/dns_records?per_page=200`);

for (const record of RECORDS) {
  const match = existing.find((e) => e.name === record.name && e.type === record.type);
  const label = `${record.type.padEnd(3)} ${record.name}`;

  if (match && match.content.replace(/^"|"$/g, "") === record.content) {
    console.log(`= ${label} — juz istnieje, pomijam`);
    continue;
  }
  if (match) {
    console.log(`! ${label} — istnieje z INNA wartoscia:`);
    console.log(`    obecnie: ${match.content.slice(0, 60)}...`);
    console.log(`    docelowo: ${record.content.slice(0, 60)}...`);
    if (!apply) continue;
    await cf(token, `/zones/${zoneId}/dns_records/${match.id}`, {
      method: "PATCH",
      body: JSON.stringify(record),
    });
    console.log(`  -> zaktualizowano`);
    continue;
  }
  if (!apply) {
    console.log(`+ ${label} — do dodania`);
    continue;
  }
  await cf(token, `/zones/${zoneId}/dns_records`, {
    method: "POST",
    body: JSON.stringify({ ...record, ttl: 1, proxied: false }),
  });
  console.log(`+ ${label} — dodano`);
}

console.log(
  apply
    ? "\nGotowe. Wroc do resend.com/domains i kliknij Verify DNS Records."
    : "\nTo byl podglad. Uruchom z flaga --apply, aby faktycznie dodac rekordy."
);
