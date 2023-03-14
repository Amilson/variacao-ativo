import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GuideButtonModule, GuideHeaderModule } from '@guide-style';
import { ComponentsComponent } from './components.component';

@NgModule({
  declarations: [ComponentsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentsComponent
      }
    ]),
    GuideButtonModule,
    GuideHeaderModule
  ]
})
export class ComponentsModule {}
