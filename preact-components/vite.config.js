import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.jsx"),
      name: "PreactComponents",
      formats: ["es"],
      fileName: (format) => `preact-components.${format}.js`,
    },
    rollupOptions: {
      // Make sure Preact is not bundled into your component library
      external: ["preact", "preact/compat"],
      output: {
        // Provide global variables to use in the UMD build
        globals: {
          preact: "preact",
          "preact/compat": "preactCompat",
        },
      },
    },
    // Output directory relative to the 'preact-components' directory
    outDir: "../assets/js/dist", // Adjust this path to your Jekyll output directory for assets
    emptyOutDir: false, // Prevent Vite from deleting Jekyll's output directory
    sourcemap: "inline",
  },
});
