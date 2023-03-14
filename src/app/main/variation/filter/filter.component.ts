/* eslint-disable dot-notation */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VariationSearchModel } from '../providers';

@Component({
  selector: 'app-variation-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class VariationFilterComponent implements OnInit, OnChanges {
  @Input() search: any;

  @Output() onSearch = new EventEmitter<any>();

  public _form?: FormGroup;

  public _groups = ['5D', '1M', '3M', '6M'];

  private handledSearch: VariationSearchModel | null = null;

  constructor(private fb: FormBuilder) {
    // not to do
  }

  private handleForm() {
    const { fb, search } = this;
    const handle = new VariationSearchModel(search);

    if (!this._form) {
      const form: FormGroup = fb.group({
        startDate: [handle?.handledStartDate],
        endDate: [handle.handledEndDate],
        type: [handle.type],
        group: [handle.group]
      });

      this._form = form;
    } else {
      this._form.controls['startDate'].setValue(handle.handledStartDate);
      this._form.controls['endDate'].setValue(handle.handledEndDate);
      this._form.controls['type'].setValue(handle.type);
      this._form.controls['group'].setValue(handle.group);
    }
  }

  ngOnInit() {
    this.handleForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { handledSearch } = this;
    const search = changes?.['search'] as any;
    if (search) {
      const { currentValue } = search;
      if (currentValue && handledSearch !== currentValue) {
        this.handledSearch = currentValue;
        this.handleForm();
      }
    }
  }

  onChangeData(type: string) {
    this._form?.controls['group'].setValue('');
    if (type === 'start') {
      this._form?.controls['endDate'].setValue(null);
    }
  }

  onChangeGroup(type: string) {
    this._form?.controls['startDate'].setValue(null);
    this._form?.controls['endDate'].setValue(null);
    this._form?.controls['group'].setValue(type);
    this.onSubmit();
  }

  onSubmit() {
    const value = this._form?.value;
    this.onSearch.next(value);
  }
}
