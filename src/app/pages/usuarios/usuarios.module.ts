import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { RouterModule } from "@angular/router";
import { ProgressbarModule, CollapseModule, TooltipModule, BsDropdownModule } from 'ngx-bootstrap';
import { usuarioRoutes } from './usuario.routing';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { ComponentsModule } from 'src/app/@core/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/@core/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(usuarioRoutes),

    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
    
  ],
  declarations: [UsuariosComponent, UsuarioListaComponent, UsuarioFormComponent],
  exports:[UsuariosComponent, UsuarioListaComponent, UsuarioFormComponent]
})
export class UsuariosModule { }

