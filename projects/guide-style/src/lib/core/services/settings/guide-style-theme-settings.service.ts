import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { GuideStyleFontSettings, GuideStyleSettings } from '../../interfaces';

@Injectable()
export class GuideStyleGuideThemeSettingsService {
  constructor(@Inject(DOCUMENT) private doc: any) {
    // not to do
  }

  private applyColors(settings: GuideStyleSettings): any {
    const { colors } = settings;

    let bucketColors: any = null;

    ['primary', 'error', 'warning', 'success'].forEach((color: string) => {
      Object.entries(colors[color] as any).forEach(([paletteKey, paletteValue]) => {
        if (paletteKey === 'contrast') {
          if (!paletteValue) return;
          Object.entries(paletteValue).forEach(([paletteContrastKey, paletteContrastValue]) => {
            document.documentElement.style.setProperty(
              `--gd-color-${color}-contrast-${paletteContrastKey}`,
              `${paletteContrastValue}`
            );
            bucketColors = {
              ...bucketColors,
              [`--gd-color-${color}-contrast-${paletteContrastKey}`]: `${paletteContrastValue}`
            };
          });
        } else {
          document.documentElement.style.setProperty(
            `--gd-color-${color}-${paletteKey}`,
            `${paletteValue}`
          );
          bucketColors = {
            ...bucketColors,
            [`--gd-color-${color}-${paletteKey}`]: `${paletteValue}`
          };
        }
      });
    });

    return bucketColors;
  }

  private applyFonts(settings: GuideStyleSettings) {
    const font: GuideStyleFontSettings = {
      url: 'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
      name: 'Work Sans',
      ...settings.font
    };

    document.documentElement.style.setProperty(`--gd-font-name`, `${font.name}`);

    const link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', `${font.url}`);
    this.doc.head.appendChild(link);
  }

  private applyTheme(settings: GuideStyleSettings) {
    const { theme } = settings;
    document.title = `${theme?.title}`;

    const link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'icon');
    link.setAttribute('type', 'image/x-icon');
    link.setAttribute('href', `${theme?.favicon}`);
    this.doc.head.appendChild(link);
  }

  public apply(config: GuideStyleSettings, callback?: Function) {
    const bucketColors = this.applyColors(config);
    this.applyFonts(config);
    this.applyTheme(config);
    setTimeout(() => {
      if (callback)
        callback({
          bucketColors
        });
    }, 500);
  }
}
