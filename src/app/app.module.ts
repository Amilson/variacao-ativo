import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuideButtonModule, GuideStyleModule } from '@guide-style';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GuideStyleModule,
    GuideButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
