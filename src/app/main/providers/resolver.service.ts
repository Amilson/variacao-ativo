import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from './main.service';

@Injectable()
export class MainResolver {
  constructor(
    private mainService: MainService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // not to do
  }

  resolve() {
    this.mainService.resolve(this.activatedRoute.snapshot, this.router.routerState.snapshot);
  }
}
