import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/components/base.component';
import { CoreListService } from 'src/app/core/services';

@Component({
  selector: 'app-indices',
  templateUrl: './indices.component.html',
  styleUrls: ['./indices.component.scss']
})
export class IndicesComponent extends BaseComponent implements OnInit {
  constructor(private service: CoreListService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.handleData(this.service);
  }
}
