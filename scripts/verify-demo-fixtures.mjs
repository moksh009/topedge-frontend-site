import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const fixtures = await import(
  pathToFileURL(path.join(root, '../src/marketing/components/home/demo/demoFixtures.ts')).href
);
const nav = await import(
  pathToFileURL(path.join(root, '../src/marketing/components/home/demo/demoNav.ts')).href
);

assert.ok(fixtures.demoLiveChatThreads.length >= 3);
assert.ok(fixtures.demoLiveChatThreads.every((t) => t.channel === 'whatsapp'));
assert.ok(!nav.DEMO_NAV_ITEMS.some((i) => i.id === 'ig' || /instagram/i.test(i.label)));
assert.equal(nav.DEMO_DEFAULT_PANEL, 'home');
console.log('demo fixtures OK');
