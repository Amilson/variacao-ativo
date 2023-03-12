import { Directive } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonsService } from '../services';

@Directive({
  selector: '[baseComponent]'
})
export abstract class BaseComponent {
  __data$?: Observable<any>;

  __control$?: Observable<any>;

  handleData(service: CommonsService) {
    this.__data$ = service.__data$;
    this.__control$ = service.__control$;
  }
}
