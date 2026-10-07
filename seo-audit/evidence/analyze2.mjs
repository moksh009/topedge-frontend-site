import { readFileSync } from 'node:fs';
const P = JSON.parse(readFileSync('crawl/pages.json','utf8'));
const byPath = Object.fromEntries(P.map(p=>[p.path,p]));
const line=s=>console.log(s); const hdr=s=>console.log('\n===== '+s+' =====');

const nodes = p => { const out=[]; const w=n=>{ if(Array.isArray(n))return n.forEach(w);
  if(n&&typeof n==='object'){ if(n['@type'])out.push(n); if(n['@graph'])w(n['@graph']);
    for(const k of Object.keys(n)) if(k!=='@graph'&&n[k]&&typeof n[k]==='object') w(n[k]); } };
  (p.ld||[]).forEach(w); return out; };

hdr('AGGREGATE RATING / REVIEW / PRODUCT-OFFER AUDIT (visible-content compliance risk)');
P.forEach(p=>{
  const ns=nodes(p);
  const risky=ns.filter(n=>n.aggregateRating||n.review||n.ratingValue);
  if(risky.length) risky.forEach(n=>line(`  ${p.path}  @type=${JSON.stringify(n['@type'])}  aggregateRating=${JSON.stringify(n.aggregateRating)} review=${n.review?'YES':'-'}`));
});
line('(empty above = no rating/review markup anywhere)');

hdr('PRODUCT / OFFER NODES');
P.forEach(p=>{ nodes(p).filter(n=>[].concat(n['@type']).some(t=>['Product','Offer','AggregateOffer','SoftwareApplication'].includes(t)))
  .forEach(n=>line(`  ${p.path} ${JSON.stringify(n['@type'])} name=${JSON.stringify(n.name)} offers=${JSON.stringify(n.offers)?.slice(0,260)}`)); });

hdr('ORGANIZATION NODE (entity signals) — unique variants');
const orgs={}; P.forEach(p=>nodes(p).filter(n=>[].concat(n['@type']).includes('Organization')).forEach(n=>{
  const k=JSON.stringify(n); (orgs[k] ||= []).push(p.path); }));
Object.entries(orgs).forEach(([k,paths])=>{ line(`-- on ${paths.length} pages (e.g. ${paths[0]})`); line(JSON.stringify(JSON.parse(k),null,1)); });

hdr('BLOGPOSTING author / dates / publisher');
P.filter(p=>p.path.startsWith('/blog/')).forEach(p=>{
  const bp=nodes(p).find(n=>[].concat(n['@type']).includes('BlogPosting'))||{};
  line(`  ${p.path}\n     author=${JSON.stringify(bp.author)} pub=${bp.datePublished} mod=${bp.dateModified} image=${JSON.stringify(bp.image)?.slice(0,90)}`);
});

hdr('PUBLISHER LOGO + OG IMAGE REACHABILITY');
const urls=new Set();
P.forEach(p=>{ if(p.ogImage)urls.add(p.ogImage); if(p.twImage)urls.add(p.twImage);
  nodes(p).forEach(n=>{ const L=n.logo||n.publisher?.logo; if(L) urls.add(typeof L==='string'?L:L.url); }); });
for(const u of [...urls].filter(Boolean)){
  try{ const r=await fetch(u,{method:'HEAD'}); line(`  ${r.status} ${r.headers.get('content-length')||'?'}b ${r.headers.get('content-type')} ${u}`);}catch(e){line(`  ERR ${u}`);}
}

hdr('INTERNAL LINK GRAPH');
const inbound={}; P.forEach(p=>inbound[p.path]=new Set());
const outCount={};
P.forEach(p=>{
  const seen=new Set();
  (p.anchors||[]).forEach(a=>{
    let t; try{ t=new URL(a.href,'https://topedgeai.com'+p.path); }catch{ return; }
    if(t.host!=='topedgeai.com') return;
    let pa=t.pathname.replace(/\/$/,'')||'/';
    if(!(pa in inbound)) return;
    seen.add(pa);
    if(pa!==p.path) inbound[pa].add(p.path);
  });
  outCount[p.path]=seen.size;
});
const orphans=Object.entries(inbound).filter(([pa,s])=>s.size===0);
line(`ORPHANS (in sitemap, zero inbound internal links from other sitemap pages): ${orphans.length}`);
orphans.forEach(([pa])=>line(`  ${pa}`));
line('\nWEAKEST inbound (bottom 20):');
Object.entries(inbound).map(([pa,s])=>[pa,s.size]).sort((a,b)=>a[1]-b[1]).slice(0,20)
  .forEach(([pa,n])=>line(`  ${String(n).padStart(3)} in  ${String(outCount[pa]).padStart(3)} out  ${pa}`));
line('\nSTRONGEST inbound (top 10):');
Object.entries(inbound).map(([pa,s])=>[pa,s.size]).sort((a,b)=>b[1]-a[1]).slice(0,10)
  .forEach(([pa,n])=>line(`  ${String(n).padStart(3)} in  ${pa}`));

hdr('OFF-SITEMAP INTERNAL LINK TARGETS (candidates for missing-from-sitemap / broken)');
const offs={};
P.forEach(p=>(p.anchors||[]).forEach(a=>{ let t; try{t=new URL(a.href,'https://topedgeai.com'+p.path);}catch{return;}
  if(t.host!=='topedgeai.com')return; const pa=t.pathname.replace(/\/$/,'')||'/';
  if(pa in inbound) return; (offs[pa] ||= new Set()).add(p.path); }));
Object.entries(offs).sort((a,b)=>b[1].size-a[1].size).forEach(([pa,s])=>line(`  (${s.size} linkers) ${pa}`));

hdr('EXTERNAL LINK TARGETS (unique hosts)');
const ext={};
P.forEach(p=>(p.anchors||[]).forEach(a=>{ let t; try{t=new URL(a.href,'https://topedgeai.com'+p.path);}catch{return;}
  if(!/^https?:/.test(t.protocol))return; if(t.host==='topedgeai.com')return;
  (ext[t.host] ||= new Set()).add(t.toString()); }));
Object.entries(ext).sort((a,b)=>b[1].size-a[1].size).forEach(([h,s])=>line(`  ${String(s.size).padStart(3)} urls  ${h}`));

hdr('NOFOLLOW USAGE');
P.forEach(p=>{ const nf=(p.anchors||[]).filter(a=>/nofollow/i.test(a.rel||'')); if(nf.length) line(`  ${p.path}: ${nf.length} -> ${[...new Set(nf.map(a=>a.href))].slice(0,5).join(', ')}`); });
