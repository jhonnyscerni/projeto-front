import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissoesComponent } from './permissoes.component';
import { ComponentsModule } from 'src/app/@core/components/components.module';
import { BsDropdownModule, ProgressbarModule, TooltipModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { permissaoRoutes } from './permissao.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/@core/shared/shared.module';
import { PermissaoListaComponent } from './permissao-lista/permissao-lista.component';
import { PermissaoFormComponent } from './permissao-form/permissao-form.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(permissaoRoutes),

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [PermissoesComponent, PermissaoListaComponent, PermissaoFormComponent],
  exports: [PermissoesComponent, PermissaoListaComponent, PermissaoFormComponent]
})
export class PermissoesModule { }
