import { CommonModule } from '@angular/common';
import { ComponentDatepickerComponent } from './component-datepicker/component-datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ComponentDatepickerComponent,
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,    
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    ComponentDatepickerComponent
  ]
})
export class ComponentDatepickerModule { }
