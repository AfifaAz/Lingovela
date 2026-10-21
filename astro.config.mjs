// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Production domain used to generate canonical URLs and the sitemap.
  site: 'https://ki-einfach-verstehen.de',
  integrations: [sitemap()],
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:4322',
          changeOrigin: true,
        },
      },
    },
  },
  build: {
    // GitHub Pages caps Cache-Control at max-age=600, so a separate
    // stylesheet buys almost no caching but costs one render-blocking round
    // trip before first paint (Lighthouse: ~450 ms on slow 4G). Inlining the
    // ~18 KB (gzipped ~5 KB) into every page removes that hop.
    inlineStylesheets: 'always',
  },
});
