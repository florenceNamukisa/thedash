const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const src = path.join(root, "rss_feed.xml");
const destDir = path.join(root, "public");
const dest = path.join(destDir, "rss_feed.xml");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  // eslint-disable-next-line no-console
  console.log("Copied rss_feed.xml to public/");
} else {
  // eslint-disable-next-line no-console
  console.warn("rss_feed.xml not found. Skipping copy.");
}
