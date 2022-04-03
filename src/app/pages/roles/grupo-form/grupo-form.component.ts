import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/@core/shared/services/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from 'src/app/@core/shared/base-form/base-form.component';
import { Location } from '@angular/common';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.scss']
})
export class GrupoFormComponent extends BaseFormComponent implements OnInit {
  
  role: Role;
  roleId: number;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private grupoService: RoleService,
    private toastr: ToastrService,
  ) { 
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      const idGrupo = params['roleId'];
      if (idGrupo) {
        console.log(idGrupo);
        const grupo$ = this.grupoService.loadByID(idGrupo);
        grupo$.subscribe(grupo => {
          this.updateForm(grupo);
          // this.cadastroForm.setValue(evento)
        });
      }
    });

    this.cadastroForm = this.fb.group({
      id: [''],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ]
    });
  }

  updateForm(role) {
    this.cadastroForm.patchValue({
      id: role.id,
      name: role.name
    });
  }

  submit() {
    console.log('submit');

    let msgSuccess = 'Role criado com sucesso!';
    let msgError = 'Erro ao criar grupo, tente novamente!';
    if (this.cadastroForm.value.id) {
      console.log(this.cadastroForm.value);
      msgSuccess = 'Role atualizado com sucesso!';
      msgError = 'Erro ao atualizar grupo, tente novamente!';
    }

    this.grupoService.save(this.cadastroForm.value).subscribe(
      success => {
        //this.toastr.success(msgSuccess, 'Sucesso'),
        // this.alertService.showAlertSuccess(msgSuccess);
        this.toastr.success(msgSuccess, 'Informação :)')
        this.location.back();
      },
      error => 
      //this.alertService.showAlertDanger(msgError),
      this.toastr.error(msgError, 'Opa :(')
    );
  }

  canecelar(){
    this.router.navigate(['/grupos/lista'], { relativeTo: this.route });
  }

}
