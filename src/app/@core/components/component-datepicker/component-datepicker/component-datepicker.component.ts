import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { AbstractValueAccessor } from '../../../shared/abstract-value-accessor';

export const _DAY_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@Component({
  selector: 'component-datepicker',
  templateUrl: './component-datepicker.component.html',
  styleUrls: ['./component-datepicker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ComponentDatepickerComponent),
    multi: true
  },
  { provide: MAT_DATE_FORMATS, useValue: _DAY_FORMAT },
  ]
})
export class ComponentDatepickerComponent extends AbstractValueAccessor implements OnInit {

  constructor() {
    super();
  }

  @Input() label = 'Selecione a data';
  @Input() readonly = false;
  @Input() required!:boolean;
  @Input() hint = '';

  public formatedDate!: string;

  public dateControl = new FormControl({
    disabled: this.readonly
  });

  public inputControl = new FormControl({
    disabled: this.readonly
  });

  // @ts-ignore
  public override
  ngOnInit(): void {
    this.dateControl.valueChanges.subscribe(date => {
      this.value = (date && date !== null && date.toString() !== 'Invalid Date' )? (date as Date).toISOString().slice(0,10) : null;
      this._value = this.value
      this.formatedDate = this.reformatDate(this.value);
      this.inputControl.setValue(this.reformatDate(this.value))
    });
  }

  reset() {
    this.value = null;
    this.dateControl.reset();
    this.dateControl.markAsUntouched();
  }

  writeValue(value: any) {
    if (value === 'Invalid date')
      return;

    if (!value) {
      this.reset();
    }
    if (value !== this._value) {
      this._value = value;
      this.dateControl.setValue(new Date(value));
      this.inputControl.markAsUntouched();
    }
  }
  onDateSelect(event: any) {
    let formatedDate = ''
    if (event.target.value != ''){
      let parts = event.target.value.split('/');

      if ( !parts[2] || parts[2] == 0) {
        parts[2] = new Date().getFullYear()
      }

      if ( !parts[1] || parts[1] == 0) {
        parts[1] = new Date().getMonth()
      }

      formatedDate = `${ parts[2] }-${parts[1]}-${parts[0]}`
    };
    
    this.writeValue(formatedDate);
  }


  reformatDate(value:any)
  {
    if ( value && value.length > 0 ) {
      let dArr = value.split('-');
      return dArr[2] + '-' + dArr[1] + '-' + dArr[0];
    } else
      return '';
  }
}
