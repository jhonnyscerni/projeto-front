import { Component, OnInit } from '@angular/core';
import { Permission } from 'src/app/models/permission';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/@core/shared/services/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormComponent } from 'src/app/@core/shared/base-form/base-form.component';
import { PermissionService } from 'src/app/services/permission.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss']
})
export class PermissionFormComponent extends BaseFormComponent implements OnInit {

  permission: Permission;
  permissionId: number;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private permissionService: PermissionService,
    private toastr: ToastrService,
  ) { 
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      const permissionId = params['permissionId'];
      if (permissionId) {
        console.log(permissionId);
        const permissionObservable$ = this.permissionService.loadByID(permissionId);
        permissionObservable$.subscribe(permission => {
          this.updateForm(permission);
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
      ],
      description: ['', [Validators.required]]
    });
  }

  updateForm(permission) {
    this.cadastroForm.patchValue({
      id: permission.id,
      name: permission.name,
      description: permission.description
    });
  }

  submit() {
    console.log('submit');

    let msgSuccess = 'Permissão criada com sucesso!';
    let msgError = 'Erro ao criar permissão, tente novamente!';
    if (this.cadastroForm.value.id) {
      console.log(this.cadastroForm.value);
      msgSuccess = 'Permissão atualizado com sucesso!';
      msgError = 'Erro ao atualizar permissão, tente novamente!';
    }

    this.permissionService.save(this.cadastroForm.value).subscribe(
      success => {
        //this.toastr.success(msgSuccess, 'Sucesso'),
        //this.alertService.showAlertSuccess(msgSuccess);
        this.toastr.success(msgSuccess, 'Informação :)')
        this.location.back();
      },
      error => 
      //this.alertService.showAlertDanger(msgError),
      this.toastr.error(msgError, 'Opa :(')
    );
  }

  canecelar(){
    this.router.navigate(['/permissoes/lista'], { relativeTo: this.route });
  }

}
