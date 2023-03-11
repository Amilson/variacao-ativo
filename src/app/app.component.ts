import { Component } from '@angular/core';
import { GuideStyleGuideSettingsService } from '@guide-style';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'variacao-ativo';

  constructor(private stylesService: GuideStyleGuideSettingsService) {
    this.stylesService.bootstrap('');
  }
}
