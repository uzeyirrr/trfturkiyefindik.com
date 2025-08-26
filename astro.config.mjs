import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  site: "https://trfturkiyefindik.com",
  output: 'server',
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Inter",
        cssVariable: "--font-sans",
        weights: [400, 500],
      }
    ],
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
