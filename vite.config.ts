import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // Ignore the mock database so it doesn't trigger full-page reloads
      ignored: ["**/db.json"],
    },
  },
});
