import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../core/components/base.component';
import { MainService } from './providers';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent implements OnInit {
  constructor(private mainService: MainService) {
    super();
  }

  ngOnInit() {
    this.handleData(this.mainService);
  }
}
