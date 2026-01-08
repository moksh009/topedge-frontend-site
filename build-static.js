import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define paths for ES Module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Metadata for the Community Page
const META = {
  title: "Community | TopEdge AI",
  description: "Join the TopEdge AI Community! Connect with builders, share automation workflows, access exclusive resources, and collaborate on the future of AI agents.",
  image: "https://topedgeai.com/community-og-image.jpg"
};

const distPath = path.resolve(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');
const communityPath = path.join(distPath, 'community.html');

console.log("🏗️  Generating Static Community Entry Point...");

try {
  // 1. Read the main index.html (which has default metadata)
  let html = fs.readFileSync(indexPath, 'utf8');

  // 2. Replace Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${META.title}</title>`);

  // 3. Replace Description (Global replace)
  html = html.replace(/name="description" content=".*?"/g, `name="description" content="${META.description}"`);

  // 4. Replace Open Graph Tags
  html = html.replace(/property="og:title" content=".*?"/g, `property="og:title" content="${META.title}"`);
  html = html.replace(/property="og:description" content=".*?"/g, `property="og:description" content="${META.description}"`);
  html = html.replace(/property="og:image" content=".*?"/g, `property="og:image" content="${META.image}"`);

  // 5. Replace Twitter Tags
  html = html.replace(/name="twitter:title" content=".*?"/g, `name="twitter:title" content="${META.title}"`);
  html = html.replace(/name="twitter:description" content=".*?"/g, `name="twitter:description" content="${META.description}"`);
  html = html.replace(/name="twitter:image" content=".*?"/g, `name="twitter:image" content="${META.image}"`);

  // 6. Write the new file
  fs.writeFileSync(communityPath, html);
  
  console.log("✅ Successfully created dist/community.html");

} catch (err) {
  console.error("❌ Error generating community.html:", err);
  process.exit(1);
}