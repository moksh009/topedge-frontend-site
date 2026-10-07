import { readFileSync } from 'node:fs';
const P = JSON.parse(readFileSync('crawl/pages.json', 'utf8'));
const line = s => console.log(s);
const hdr = s => console.log('\n===== ' + s + ' =====');

hdr('STATUS / REDIRECTS / HEADERS');
const bad = P.filter(p => p.error || p.status !== 200);
line(`non-200 or errored: ${bad.length}`);
bad.forEach(p => line(`  ${p.status || 'ERR'} ${p.path} ${p.error || ''}`));
const chains = P.filter(p => (p.redirectChain || []).length);
line(`sitemap URLs that redirect: ${chains.length}`);
chains.forEach(p => line(`  ${p.path} -> ${p.redirectChain.map(c=>c.status+' '+c.to).join(' -> ')}`));
line(`missing HSTS: ${P.filter(p=>!p.hsts).length}`);
line(`X-Robots-Tag present: ${P.filter(p=>p.xRobotsTag).length}`);
line(`lang values: ${JSON.stringify([...new Set(P.map(p=>p.lang))])}`);

hdr('TITLE BUDGET (15-65)');
const tLong = P.filter(p=>p.titleLen>65), tShort = P.filter(p=>p.titleLen<15);
line(`over 65: ${tLong.length}`); tLong.forEach(p=>line(`  ${p.titleLen} ${p.path} :: ${p.title}`));
line(`under 15: ${tShort.length}`); tShort.forEach(p=>line(`  ${p.titleLen} ${p.path} :: ${p.title}`));

hdr('DESCRIPTION BUDGET (70-165)');
const dLong=P.filter(p=>p.descLen>165), dShort=P.filter(p=>p.descLen<70);
line(`over 165: ${dLong.length}`); dLong.forEach(p=>line(`  ${p.descLen} ${p.path} :: ${p.desc.slice(0,180)}`));
line(`under 70: ${dShort.length}`); dShort.forEach(p=>line(`  ${p.descLen} ${p.path} :: ${p.desc}`));

hdr('DUPLICATES');
const dupe = (key, label) => {
  const m = {};
  P.forEach(p => { const v=(p[key]||'').trim(); if(!v) return; (m[v] ||= []).push(p.path); });
  const d = Object.entries(m).filter(([,v])=>v.length>1);
  line(`${label}: ${d.length} duplicated values`);
  d.forEach(([v,paths])=>line(`  (${paths.length}) "${v.slice(0,100)}"\n      ${paths.join('\n      ')}`));
};
dupe('title','duplicate <title>'); dupe('desc','duplicate meta description'); dupe('h1','duplicate H1');

hdr('MISSING / EMPTY FIELDS');
['title','desc','canonical','h1','ogTitle','ogDesc','ogImage','twCard','twImage','ogUrl'].forEach(k=>{
  const miss = P.filter(p=>!p[k]);
  if (miss.length) line(`${k} missing on ${miss.length}: ${miss.map(p=>p.path).slice(0,12).join(', ')}${miss.length>12?' …':''}`);
});
const h1bad = P.filter(p=>p.h1Count!==1);
line(`pages without exactly one H1: ${h1bad.length}`); h1bad.forEach(p=>line(`  h1=${p.h1Count} ${p.path}`));

hdr('CANONICAL');
const cBad = P.filter(p=>!p.canonicalSelf);
line(`non-self canonical: ${cBad.length}`); cBad.forEach(p=>line(`  ${p.path}\n     canonical=${p.canonical}`));
line(`relative canonicals: ${P.filter(p=>p.canonical && !/^https?:/.test(p.canonical)).length}`);
const ogUrlMismatch = P.filter(p=>p.ogUrl && p.ogUrl!==p.url);
line(`og:url != page url: ${ogUrlMismatch.length}`); ogUrlMismatch.slice(0,10).forEach(p=>line(`  ${p.path} og:url=${p.ogUrl}`));

hdr('OG IMAGE REUSE');
const ogm={}; P.forEach(p=>{ if(p.ogImage) (ogm[p.ogImage] ||= []).push(p.path); });
Object.entries(ogm).sort((a,b)=>b[1].length-a[1].length).forEach(([img,paths])=>{
  line(`(${paths.length}) ${img}`);
  if (paths.length>1) line(`      ${paths.join('\n      ')}`);
});

hdr('WORD COUNT (raw HTML, JS off)');
P.slice().sort((a,b)=>(a.words||0)-(b.words||0)).slice(0,20).forEach(p=>line(`  ${String(p.words).padStart(5)} ${p.path}`));
line(`-- thinnest 20 shown; median=${(()=>{const w=P.map(p=>p.words||0).sort((a,b)=>a-b);return w[Math.floor(w.length/2)];})()}`);

hdr('JSON-LD TYPES BY PAGE TYPE');
const typeFor = r => r==='/404'?'notFound': r==='/'?'home': r==='/pricing'?'pricing':
  (r==='/privacy'||r==='/terms')?'legal': (r==='/docs'||r.startsWith('/docs/'))?'docs':
  (r.startsWith('/blog/'))?'blog': (r.startsWith('/features'))?'feature':
  (r.startsWith('/compare'))?'compare':'hub';
const REQ={home:['Organization','SoftwareApplication'],pricing:['SoftwareApplication','FAQPage'],
  feature:['WebPage','BreadcrumbList'],compare:['WebPage','BreadcrumbList'],blog:['BlogPosting'],
  docs:['TechArticle','BreadcrumbList'],legal:[],hub:[],notFound:[]};
const byType={}; P.forEach(p=>{const t=typeFor(p.path); (byType[t] ||= []).push(p);});
Object.entries(byType).forEach(([t,ps])=>{
  line(`${t} (${ps.length} pages) required=${JSON.stringify(REQ[t]||[])}`);
  const combos={}; ps.forEach(p=>{const k=(p.ldTypes||[]).slice().sort().join('+'); (combos[k] ||= []).push(p.path);});
  Object.entries(combos).forEach(([k,paths])=>line(`   [${paths.length}] ${k||'(none)'}  e.g. ${paths[0]}`));
  const violations = ps.filter(p=>(REQ[t]||[]).some(r=>!(p.ldTypes||[]).includes(r)));
  if (violations.length) line(`   !! missing required schema: ${violations.map(p=>p.path).join(', ')}`);
});
line(`\nJSON-LD parse errors: ${P.filter(p=>(p.ldErrors||[]).length).map(p=>p.path+':'+p.ldErrors.join(';')).join(' | ')||'none'}`);

hdr('IMAGE ALT');
const altBad=P.filter(p=>p.imgsNoAlt>0);
line(`pages with <img> lacking alt attribute: ${altBad.length}`);
altBad.sort((a,b)=>b.imgsNoAlt-a.imgsNoAlt).slice(0,15).forEach(p=>line(`  ${p.imgsNoAlt}/${p.imgCount} ${p.path}`));
line(`total imgs=${P.reduce((s,p)=>s+(p.imgCount||0),0)} noAlt=${P.reduce((s,p)=>s+(p.imgsNoAlt||0),0)} emptyAlt=${P.reduce((s,p)=>s+(p.imgsEmptyAlt||0),0)}`);
