import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';  // Import BsModalRef
import { MesaService } from '../../../services/mesa.service';
import { IReturn } from '../../../models';
import { NotificationService } from '../../../core/services';
import { IMesa } from '../../../models/mesa.interface';
import { MesaMantenimientoComponent } from '../mesa-mantenimiento/mesa-mantenimiento.component';

@Component({
  selector: 'app-mesa-mantenimiento-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mesa-mantenimiento-modal.component.html',
  styleUrls: ['./mesa-mantenimiento-modal.component.scss']
})
export class MesaMantenimientoModalComponent implements OnInit {
  mesaForm!: FormGroup;
  mesaId! :number;
  mesa!: IMesa; 
  event: EventEmitter<any> = new EventEmitter();
 numeromesa!: string;
  constructor(private fb: FormBuilder, private bsModalRef: BsModalRef, private mesaService: MesaService,private notificacion: NotificationService) {
  }  // Inject BsModalRef

  ngOnInit(): void { 
    console.log(this.mesaId);
    if(this.mesaId == 0){
      this.crearFormgroup();

    }else{
      this.crearFormgroup();
      this.cargarmesa();

    }
  }

  onSubmit(): void {
    if (this.mesaForm.valid) {
      let item = this.mesaForm.getRawValue();
      if (this.mesaId == 0) {
        this.mesaService.post(item).subscribe((result: IReturn) => {
          if (result.success) {
            this.event.emit(result);
            this.bsModalRef.hide();
          }
          this.notificacion.Return(result);
        });
      } if(this.mesaId > 0) {
        
        this.mesaService.put(item).subscribe((result: IReturn) => {
          if (result.success) {
            this.event.emit(result);
            this.bsModalRef.hide();
          }
          this.notificacion.Return(result);
        });
      }
  
    }
  }
  
 cargarmesa(){
    this.mesaService.getIdmantenimiento(this.mesaId).subscribe(result =>{
      this.mesaForm.patchValue(result);
      this.mesa = result;
      this.numeromesa = result.numeroMesa;
    });
  }

  closeModal(): void {
    this.bsModalRef.hide();  // Correctly closes the modal
  }
  crearFormgroup(){
    this.mesaForm = this.fb.group({
      mesaId: [this.mesaId],
      numeroMesa: ['', Validators.required],
      descripcion: ['', Validators.required],
      flagActivo: [false]
    });
  }
}
