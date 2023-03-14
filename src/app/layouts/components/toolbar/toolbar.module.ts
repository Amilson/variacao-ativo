import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GuideButtonModule } from '@guide-style';
import { ToolbarLayoutComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarLayoutComponent],
  exports: [ToolbarLayoutComponent],
  imports: [CommonModule, RouterModule, GuideButtonModule]
})
export class ToolbarLayoutModule {}
