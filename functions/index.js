const functions = require("firebase-functions");
const fs = require("fs");
const path = require("path");

// Define metadata configuration
const defaultMetadata = {
  title: "TopEdge AI",
  description: "Automate your business with TopEdge AI's intelligent voice agents, WhatsApp automation, and Instagram chatbots. Boost leads, reduce manual work by 85%, and enhance customer satisfaction with 24/7 smart support.",
  image: "https://topedgeai.com/logo.png"
};

const communityMetadata = {
  title: "Community | TopEdge AI",
  description: "Join the TopEdge AI Community! Connect with builders, share automation workflows, access exclusive resources, and collaborate on the future of AI agents.",
  image: "https://topedgeai.com/community-og-image.jpg"
};

// Cloud Function to handle SSR metadata injection
exports.app = functions.https.onRequest((req, res) => {
  // CRITICAL CHANGE: Read 'app.html' instead of 'index.html'
  // This prevents Firebase Hosting from serving the file statically
  const filePath = path.resolve(__dirname, "./app.html");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading app.html:", err);
      return res.status(500).send("<h1>Internal Server Error</h1><p>Could not load application. Ensure app.html exists in functions folder.</p>");
    }

    let title = defaultMetadata.title;
    let description = defaultMetadata.description;
    let image = defaultMetadata.image;

    // Determine metadata based on path
    if (req.path && req.path.startsWith("/community")) {
      title = communityMetadata.title;
      description = communityMetadata.description;
      image = communityMetadata.image;
    }

    // Replace placeholders in the HTML
    const result = data
      .replace(/__PAGE_TITLE__/g, title)
      .replace(/__PAGE_DESCRIPTION__/g, description)
      .replace(/__OG_IMAGE__/g, image);

    // Set Cache-Control header
    // CDN: 10 minutes, Browser: 0 seconds (to ensure they always check for latest metadata)
    res.set("Cache-Control", "public, max-age=600, s-maxage=1200");

    res.send(result);
  });
});