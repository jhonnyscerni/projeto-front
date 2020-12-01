import { UsuariosComponent } from './usuarios.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';

export const usuarioRoutes: Routes = [

  //{
  //   path: "",
  //   children: [
  //     {
  //       path: "",
  //       component: UsuariosComponent
  //     }
  //   ]
  // }

  {
    path: "",
    children: [
      { path: "adicionar" , component: UsuarioFormComponent },
      { path: "editar/:id", component: UsuarioFormComponent },
      { path: "lista", component: UsuarioListaComponent },
      { path: "", redirectTo : '/usuarios/lista', pathMatch: 'full' }
    ]
  }
];
