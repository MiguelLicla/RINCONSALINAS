import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MesaService } from '../../../services/mesa.service';
import { IMesa } from '../../../models/mesa.interface';
import { MesaMantenimientoModalComponent } from '../mesa-mantenimiento-modal/mesa-mantenimiento-modal.component';
import { IReturn } from '../../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mesa-mantenimiento',
  standalone: true,
  imports :[CommonModule],
  templateUrl: './mesa-mantenimiento.component.html',
  styleUrls: ['./mesa-mantenimiento.component.scss']
})
export class MesaMantenimientoComponent {
  mesas!: IMesa[];
  modalRef!: BsModalRef;
  loadin = false;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private mesaService: MesaService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMesas();
  }

  onNuevaMesa() {
    MesaMantenimientoModalComponent.prototype.mesaId = 0;
    this.modalRef = this.modalService.show(MesaMantenimientoModalComponent, {
      ignoreBackdropClick: true,
      class: "modal-md"
    });
    this.modalRef.content.event.subscribe((result: IReturn) => {
      if (result.success) {
        this.cargarMesas();  // Refresca la lista
      }
    });
  }

  onEditarMesa(id: number) {
    MesaMantenimientoModalComponent.prototype.mesaId = id;
    this.modalRef = this.modalService.show(MesaMantenimientoModalComponent, {
      ignoreBackdropClick: true,
      class: "modal-md"
    });
    this.modalRef.content.event.subscribe((result: IReturn) => {
      if (result.success) {
        this.cargarMesas();  // Refresca la lista
      }
    });
  }

  cargarMesas() {
    this.loadin = true;
    this.mesaService.getMantenimiento().subscribe(result => {
      this.mesas = result;
      this.loadin = false;
      this.cd.detectChanges(); // Forzar actualización de cambios
    });
  }
}
