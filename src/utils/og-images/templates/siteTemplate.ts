import { SITE } from '@consts';
import satori from 'satori';
import type { Font } from 'satori';
import { html } from 'satori-html';
import type { SvgConfig } from '../types';

export async function generateSiteOgSvg(
  svgConfig: SvgConfig,
  fontsConfig: Font[]
) {
  const markup = html(`
<div style="height: 100%; width: 100%; display: flex; background-color: white; background-image: radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 50% -250%, #374151, #111827, #000); background-size: 1200px 630px;">
  <div style="padding: 20px; display: flex; width: 100%; height: 100%; justify-content: center; align-items: stretch;">
    <div style="display: flex; flex-direction: column; justify-content: space-between; border: 1px solid #374151; box-shadow: 5px 5px 0px #374151; width: 100%; height: 100%; padding: 64px 24px 24px;">
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; color: #fafafa;">
        <div style="font-size: 64px; font-weight: 900; line-height: 1.2; padding: 0 0 20px 6px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-clamp: 2;">
          ${SITE.TITLE}
        </div>
        <div style="font-size: 48px; line-height: 1.2; padding: 10px 0 20px 6px; 
                    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-clamp: 2;">
          ${SITE.DESCRIPTION}
        </div>
      </div>
      <div style="font-size: 24px; font-weight: 900; color: #fafafa; display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center;">
          <span>${SITE.AUTHOR}</span>
        </div>
      </div>
    </div>
  </div>
</div>
`);

  return await satori(markup, {
    ...svgConfig,
    fonts: fontsConfig,
  });
}
