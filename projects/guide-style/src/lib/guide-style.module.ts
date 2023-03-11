import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GuideStyleGuideSettingsService } from './core/services/settings/guide-style-settings.service';
import { GuideStyleGuideThemeSettingsService } from './core/services/settings/guide-style-theme-settings.service';

@NgModule({
  imports: [HttpClientModule, CommonModule],
  providers: [GuideStyleGuideSettingsService, GuideStyleGuideThemeSettingsService]
})
export class GuideStyleModule {}
