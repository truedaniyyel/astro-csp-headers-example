import type { Site } from './types';

export const SITE: Site = {
  TITLE: 'My Amazing Blog',
  DESCRIPTION: 'Welcome to my amazing blog.',
  AUTHOR: 'John Doe',
  CANONICAL_URL: import.meta.env.DEV
    ? 'http://localhost:4321'
    : 'https://johnsblog.com',
  LOCALE: 'en',
  OG_IMAGE: '/og-image.webp',

  TWITTER: {
    CREATOR: '@john_doe',
    CARD: 'summary_large_image',
  },
};
