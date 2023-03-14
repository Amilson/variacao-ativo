import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'guide-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class GuideHeaderComponent implements OnInit {
  @Input() title?: string;

  @Input() subTitle?: string;

  @Input() description?: string;

  @Input() linkToGoBack?: string;

  constructor() {
    // not to do
  }

  ngOnInit() {
    // not to do
  }
}
