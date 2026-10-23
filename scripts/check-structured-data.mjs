/**
 * Validate every JSON-LD block in dist/ against the schema.org vocabulary.
 *
 * Why this exists. The October 2026 crawl reported a schema.org validation
 * error on 68 pages — every indexable page on the site. One node caused all of
 * them: the Organization emitted in MarketingSEO carried `priceRange` and
 * `openingHoursSpecification`, which schema.org defines on LocalBusiness and
 * Place, not on Organization. Both were sensible things to publish and both
 * were in the wrong place, and nothing in the build could tell.
 *
 * It checks the two things a vocabulary can decide on its own:
 *   - every `@type` is a class schema.org actually defines, and
 *   - every property is defined, and is in the domain of at least one of the
 *     types on the node it sits on (walking up rdfs:subClassOf, so a `name` on
 *     an Offer resolves through Intangible to Thing).
 *
 * It does not check Google's rich-result requirements — those are Google's
 * rules, not schema.org's, and they move. Use the Rich Results Test for those.
 *
 * The vocabulary is vendored at scripts/data/schemaorg-vocabulary.json so the
 * build never depends on schema.org being reachable.
 *
 * Runs in build:netlify / build:firebase / build:static, after check-dist.
 *
 * Usage: node scripts/check-structured-data.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const VOCAB = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'schemaorg-vocabulary.json'), 'utf8'),
);

/**
 * JSON-LD keywords, plus `query-input`: Google's sitelinks-searchbox syntax,
 * which it documents and schema.org does not define.
 */
const NOT_PROPERTIES = new Set([
  '@context', '@type', '@id', '@graph', '@value', '@language', '@list', '@set', '@reverse',
  'query-input',
]);

const ancestorCache = new Map();
function ancestors(cls) {
  if (ancestorCache.has(cls)) return ancestorCache.get(cls);
  const seen = new Set();
  const stack = [cls];
  while (stack.length) {
    const c = stack.pop();
    if (seen.has(c) || !(c in VOCAB.classes)) continue;
    seen.add(c);
    stack.push(...VOCAB.classes[c]);
  }
  ancestorCache.set(cls, seen);
  return seen;
}

const typesOf = (node) => {
  const t = node['@type'];
  return (Array.isArray(t) ? t : t ? [t] : []).filter((x) => typeof x === 'string');
};

function validate(node, where, problems) {
  if (Array.isArray(node)) {
    node.forEach((v, i) => validate(v, `${where}[${i}]`, problems));
    return;
  }
  if (!node || typeof node !== 'object') return;

  const types = typesOf(node);
  for (const t of types) {
    if (!(t in VOCAB.classes)) problems.push(`${where}: "${t}" is not a schema.org type`);
  }

  const allowed = new Set();
  for (const t of types) for (const a of ancestors(t)) allowed.add(a);

  for (const [key, value] of Object.entries(node)) {
    if (!NOT_PROPERTIES.has(key)) {
      const domains = VOCAB.properties[key];
      if (!domains) {
        problems.push(`${where}: "${key}" is not a schema.org property`);
      } else if (types.length && allowed.size && !domains.some((d) => allowed.has(d))) {
        problems.push(
          `${where}: "${key}" is not valid on ${types.join('+')} ` +
            `(schema.org defines it on ${domains.join(', ')})`,
        );
      }
    }
    validate(value, `${where}.${key}`, problems);
  }
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

if (!fs.existsSync(dist)) {
  console.error('✖ dist/ does not exist — run the build first');
  process.exit(1);
}

/** problem text -> pages it appears on, so one bad shared node reports once. */
const byProblem = new Map();
let pages = 0;
let blocks = 0;

for (const file of walk(dist)) {
  const rel = `/${path.relative(dist, file)}`;
  const html = fs.readFileSync(file, 'utf8');
  pages += 1;
  for (const m of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    blocks += 1;
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch (err) {
      const problem = `unparseable JSON-LD: ${err.message}`;
      if (!byProblem.has(problem)) byProblem.set(problem, []);
      byProblem.get(problem).push(rel);
      continue;
    }
    const problems = [];
    validate(data, typesOf(data)[0] || 'node', problems);
    for (const problem of problems) {
      if (!byProblem.has(problem)) byProblem.set(problem, []);
      byProblem.get(problem).push(rel);
    }
  }
}

if (byProblem.size) {
  const affected = new Set([...byProblem.values()].flat());
  console.error(
    `\n✖ structured data invalid — ${byProblem.size} distinct problem(s) across ` +
      `${affected.size} page(s):\n`,
  );
  for (const [problem, where] of [...byProblem].sort((a, b) => b[1].length - a[1].length)) {
    console.error(`  ${problem}`);
    console.error(`      on ${where.length} page(s), e.g. ${where.slice(0, 3).join(', ')}`);
  }
  console.error('');
  process.exit(1);
}

console.log(
  `✓ structured data check passed — ${blocks} JSON-LD blocks on ${pages} pages, ` +
    'every type and property defined by schema.org',
);
