// @ts-check
import { defineConfig } from 'astro/config';
import { SITE } from './src/consts';
import sitemap from '@astrojs/sitemap';
import { shield } from '@kindspells/astro-shield';
import { resolve } from 'node:path';

const rootDir = new URL('.', import.meta.url).pathname;
const modulePath = resolve(rootDir, 'src', 'generated', 'sriHashes.mjs');

// https://astro.build/config
export default defineConfig({
  site: SITE.CANONICAL_URL,
  integrations: [
    sitemap(),
    shield({
      sri: { hashesModule: modulePath },
    }),
  ],
});
