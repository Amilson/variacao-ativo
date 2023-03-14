import { Directive } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CoreCommonsService } from '../services';

@Directive({
  selector: '[baseComponent]'
})
export abstract class BaseComponent {
  __unsubscribeAll: Subject<any> = new Subject();

  __data$?: Observable<any>;

  __control$?: Observable<any>;

  __search$?: Observable<any>;

  __onDataChanged$?: Observable<any>;

  handleData(service: CoreCommonsService) {
    this.__onDataChanged$ = service.__onDataChanged$;
    this.__onDataChanged$.pipe(takeUntil(this.__unsubscribeAll)).subscribe(() => {
      this.__data$ = service.__data$;
      this.__control$ = service.__control$;
      this.__search$ = service.__search$;
    });
  }

  handleDestroy() {
    this.__unsubscribeAll?.next(null);
    this.__unsubscribeAll?.complete();
  }
}
