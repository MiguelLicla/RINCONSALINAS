import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMaestra, IMaestraArgu } from '../../models';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MaestraService } from '../../services';
import { NotificationService } from '../../core/services';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../../core/directives/directives.module';

@Component({
  selector: 'app-maestra',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DirectivesModule],
  templateUrl: './maestra.component.html',
})
export class MaestraComponent {

  public id!: number;
  public Maestra!: IMaestra;
  event: EventEmitter<any> = new EventEmitter();

  titulo = 'Nuevo Maestra Argu';
  formGroup!: FormGroup;
  maestraArgu = {} as IMaestraArgu;
  listaPadre!: IMaestraArgu[];

  flagMantenible = false;
  loadinGuardar = false;
  constructor(
    public modalRef: BsModalRef, private formBuilder: FormBuilder,
    private maestraService: MaestraService, private notification: NotificationService) {
    this.crearformGroup();
    this.flagMantenible = this.Maestra.flagMantenible;

  }

  ngOnInit() {
   // this.loadin = false;
    if (this.id > 0) {
      this.titulo = 'Modificar ' + this.Maestra.nombre;
      this.obtenerMaestraArgu(this.id);
    } else {
      this.titulo = 'Nuevo ' + this.Maestra.nombre;
    }

    this.cargarListas();
  }

  private obtenerMaestraArgu(id: number) {
   // this.loadin = true;
    console.log(id);
    this.maestraService.getArguId(id).subscribe(result => {
      this.formGroup.patchValue(result);
    //  this.loadin = false;
    });
  }

  guardarMaestraArgu() {
    if (this.formGroup.valid) {
      this.loadinGuardar = true;
      this.maestraArgu = this.formGroup.getRawValue();
      if (this.id === 0) { // nuevo proveedor
        this.maestraArgu.idMaestra = this.Maestra.idMaestra;
        this.maestraService.postargu(this.maestraArgu).subscribe(result => {
          if (result.success) {
            this.modalRef.hide();
            this.event.emit(result);
          }
          this.loadinGuardar = false;
          this.notification.Return(result);
        });
      } else { // editar cliente
        this.maestraService.putArgu(this.maestraArgu).subscribe(result => {
          if (result.success) {
            this.modalRef.hide();
            this.event.emit(result);
          }
          this.loadinGuardar = false;
          this.notification.Return(result);
        });
      }
    }
  }

  cargarListas() {
    if (this.Maestra.idPadre > 0) {
      this.maestraService.getArgu(this.Maestra.idPadre, 0).subscribe(result => {
        this.listaPadre = result;
      });
    }
  }

  crearformGroup() {
    this.formGroup = this.formBuilder.group({
      idArgu: new FormControl(0),
      idMaestra: new FormControl(''),
      idPadre: new FormControl('0'),
      codigo: new FormControl(''),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      abreviado: new FormControl(''),
      descripcion: new FormControl(''),
      flagActivo: new FormControl(true)
    });

    // validacion condicional
    // if (this.Maestra.IdPadre > 0) {
    //  // this.formGroup.controls['IdPadre'].setValue('');
    //   this.formGroup.controls['IdPadre'].setValidators(Validators.required);
    // }
  }

}
