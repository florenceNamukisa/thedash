import * as fs from "fs";
import * as path from "path";

const srcDir = path.join(__dirname);

fs.readdirSync(srcDir).forEach((file) => {
  if (file.endsWith(".ts") && file !== "run-all.ts") {
    require(path.join(srcDir, file));
  }
});
