import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../core/components/base.component';
import { VariationService } from './providers';

@Component({
  selector: 'app-variation',
  templateUrl: './variation.component.html',
  styleUrls: ['./variation.component.scss']
})
export class VariationComponent extends BaseComponent implements OnInit {
  constructor(private service: VariationService) {
    super();
  }

  ngOnInit() {
    this.handleData(this.service);
  }

  onHandleSearch(event: any) {
    this.service.doSearch(event);
  }
}
