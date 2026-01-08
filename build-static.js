import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMMUNITY_META = {
  title: "Community | TopEdge AI",
  description: "Join the TopEdge AI Community! Connect with builders, share automation workflows, access exclusive resources, and collaborate on the future of AI agents.",
  image: "https://topedgeai.com/community-og-image.jpg"
};

const distPath = path.resolve(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');
const communityPath = path.join(distPath, 'community.html');

console.log("🏗️  Generating Static Community Entry Point...");

try {
  let html = fs.readFileSync(indexPath, 'utf8');

  // Replace Title
  html = html.replace(
    /<title>.*?<\/title>/, 
    `<title>${COMMUNITY_META.title}</title>`
  );

  // Replace Description
  html = html.replace(
    /name="description" content=".*?"/, 
    `name="description" content="${COMMUNITY_META.description}"`
  );
  
  // Replace OG Tags (Global replace for title/desc/image)
  html = html.replace(
    /property="og:title" content=".*?"/, 
    `property="og:title" content="${COMMUNITY_META.title}"`
  );
  html = html.replace(
    /property="og:description" content=".*?"/, 
    `property="og:description" content="${COMMUNITY_META.description}"`
  );
  html = html.replace(
    /property="og:image" content=".*?"/, 
    `property="og:image" content="${COMMUNITY_META.image}"`
  );

  // Replace Twitter Tags
  html = html.replace(
    /name="twitter:title" content=".*?"/, 
    `name="twitter:title" content="${COMMUNITY_META.title}"`
  );
  html = html.replace(
    /name="twitter:description" content=".*?"/, 
    `name="twitter:description" content="${COMMUNITY_META.description}"`
  );
  html = html.replace(
    /name="twitter:image" content=".*?"/, 
    `name="twitter:image" content="${COMMUNITY_META.image}"`
  );

  fs.writeFileSync(communityPath, html);
  console.log("✅ Successfully created dist/community.html");

} catch (err) {
  console.error("❌ Error generating community.html:", err);
  process.exit(1);
}