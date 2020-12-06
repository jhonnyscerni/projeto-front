import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GruposComponent } from './grupos.component';
import { GrupoFormComponent } from './grupo-form/grupo-form.component';
import { GrupoListaComponent } from './grupo-lista/grupo-lista.component';
import { ComponentsModule } from 'src/app/@core/components/components.module';
import { BsDropdownModule, ProgressbarModule, TooltipModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { grupoRoutes } from './grupo.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/@core/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(grupoRoutes),

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [GruposComponent, GrupoFormComponent, GrupoListaComponent],
  exports: [GruposComponent, GrupoFormComponent, GrupoListaComponent] 
})
export class GruposModule { }
