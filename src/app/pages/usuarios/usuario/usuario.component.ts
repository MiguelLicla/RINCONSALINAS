import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../../../core/directives/directives.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { IUsuario } from '../../../models/usuario.interface';
import { IRol } from '../../../models/rol.interface';
import { RolService } from '../../../services';
import { IReturn } from '../../../models';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DirectivesModule, NgSelectModule],
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent {
  //Variables de entrada
  public IdUsuario!: number;

  event: EventEmitter<any> = new EventEmitter();

  idRol!: number;
  mostrarempresa!: boolean;

  //Variables del Formulario
  formGroup!: FormGroup;
  usuario = {} as IUsuario;
  listaRol!: IRol[];


  titulo = "Nuevo Usuario"
  // <div *ngIf="formGroup.value.IdPerfil == helpCodigo.Perfil.ReservaStand" class="col-lg-4">
  // auth! :IAuth;
  // fileToUpload!: File;
  // imgURL = WebConfig.imagen.default;
  // helpCodigo = WebConfig.codigo;
  loadinGuardar: boolean = false;
  // bsConfig = WebConfig.bootstrap_bsConfig;
  loadin = true;
  constructor(public modalRef: BsModalRef, private formBuilder: FormBuilder,
    private usuarioService: UsuarioService, private rolService: RolService,
    private notification: NotificationService) {
    this.crearformGroup();
    // this.auth = this.storageService.leerAuth();
  }

  ngOnInit(): void {
    if (this.IdUsuario > 0) {
      this.titulo = "Editar Usuario";
      this.ObtenerUsuario();
    }
    this.cargarListas();
  }


  ObtenerUsuario() {
    this.usuarioService.getId(this.IdUsuario).subscribe(result => {
      this.formGroup.patchValue(result);
      this.loadin = false;
    });
  }
  onGuardar() {

    if (this.formGroup.valid) {
      this.loadinGuardar = true;
      this.usuario = this.formGroup.getRawValue();
      if (this.IdUsuario == 0) {
        this.usuarioService.post(this.usuario).subscribe((result: IReturn) => {
          if (result.success) {
            this.event.emit(result);
            this.modalRef.hide();
          }
          this.notification.Return(result);
          this.loadinGuardar = false;
        });
      } else {
        this.usuarioService.put(this.usuario).subscribe((result: IReturn) => {
          if (result.success) {
            this.event.emit(result);
            this.modalRef.hide();
          }
          this.notification.Return(result);
          this.loadinGuardar = false;
        });
      }

    }
  }


  cargarListas() {
    this.rolService.get().subscribe(result => {
      this.listaRol = result;
    });
  }


  

  crearformGroup() {
    this.formGroup = this.formBuilder.group({
      idUsuario: new FormControl(0),
      userName: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
      passwordHash: new FormControl(''),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      idRol: new FormControl('', [Validators.required]),
      flagActivo: new FormControl(true),
    });
  }

}
