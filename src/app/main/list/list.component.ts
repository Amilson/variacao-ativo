import { Component, OnInit } from '@angular/core';
import { CoreListService } from 'src/app/core/services';
import { BaseComponent } from '../../core/components/base.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(private service: CoreListService) {
    super();
  }

  ngOnInit() {
    this.handleData(this.service);
  }
}
