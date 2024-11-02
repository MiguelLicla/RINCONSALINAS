import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { OpcionService, RolService } from '../../../services';
import { IReturn } from '../../../models';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { FieldFilterPipe } from '../../../core/pipes/field-filter.pipe';
import { IOpcion } from '../../../models/rol.interface';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule , CommonModule, FieldFilterPipe],
  templateUrl: './rol.component.html'
})
export class RolComponent {

  public IdRol!: number;
  event: EventEmitter<any> = new EventEmitter();
  titulo: string = "Nuevo Rol"
  formGroup!: FormGroup;
  listaOpciones!: IOpcion[];
 

  loadinGuardar: boolean = false;
  constructor(public modalRef: BsModalRef, private formBuilder: FormBuilder,
    private notification: NotificationService,
    private rolService: RolService, private opcionService: OpcionService
  ) {
    this.crearformGroup();
  }

  ngOnInit(): void {
    console.log(this.IdRol)
    if (this.IdRol > 0) {
      this.titulo = "Editar Rol"
      this.obtenerRol();
    } else {
      this.cargarDataInicial();
    }
  }
 
  obtenerRol() {
    this.rolService.getId(this.IdRol).subscribe(result => {
      this.formGroup.patchValue(result);
      this.listaOpciones = result.opciones;
    });
  }

  onCheckOpcion(item : IOpcion){

    console.log(item.flagActivo);

    if(item.flagActivo && item.idPadre > 0){      
      this.listaOpciones.filter(p => p.idOpcion == item.idPadre)[0].flagActivo = true;
    }else if (!item.flagActivo){

      this.listaOpciones.forEach(element => {
        if(element.idPadre == item.idOpcion){
          element.flagActivo = false;
        }
      });
    }
    this.formGroup.markAsDirty();
  }



  onGuardar() {
    if (this.formGroup.valid) {
      this.loadinGuardar = true;
      let item = this.formGroup.getRawValue();
      item.Opciones = this.listaOpciones;
      if (this.IdRol == 0) {
        this.rolService.post(item).subscribe((result: IReturn) => {
          if (result.success) {
            this.event.emit(result);
            this.modalRef.hide();
          }
          this.notification.Return(result);
          this.loadinGuardar = false;
        });
      } else {
        this.rolService.put(item).subscribe((result: IReturn) => {
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

  cargarDataInicial() {
    this.rolService.getId(this.IdRol).subscribe(result => {
      this.listaOpciones = result.opciones;
    });
  }

  crearformGroup() {
    this.formGroup = this.formBuilder.group({
      idRol: new FormControl(0),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      descripcion: new FormControl('', [Validators.maxLength(100)]),
      flagActivo: new FormControl(true),
    });
  }
}
