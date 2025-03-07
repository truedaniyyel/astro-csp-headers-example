export type Site = {
  TITLE: string;
  DESCRIPTION: string;
  AUTHOR: string;
  CANONICAL_URL: string;
  LOCALE?: string; // default en
  OG_IMAGE: string;

  TWITTER?: {
    CREATOR?: string; // twitter handle
    CARD?: 'summary' | 'summary_large_image' | 'app' | 'player';
  };
};
