import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Keep defaults for maximum compatibility.
  // (No R2 incremental cache until you intentionally set up an R2 binding.)
});
