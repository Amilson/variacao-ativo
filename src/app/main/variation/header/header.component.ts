import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/components/base.component';
import { IndiceService } from '../providers';

@Component({
  selector: 'app-variation-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class VariationHeaderComponent extends BaseComponent implements OnInit {
  constructor(private service: IndiceService) {
    super();
  }

  ngOnInit() {
    this.handleData(this.service);
  }
}
